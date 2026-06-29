'use client';

import { useEffect, useMemo, useState } from 'react';
import { formatUsd } from './catalog';

const FULFILLMENT_STATUSES = [
  'pending',
  'processing',
  'packed',
  'shipped',
  'delivered',
  'canceled',
  'refunded',
] as const;

type FulfillmentStatus = (typeof FULFILLMENT_STATUSES)[number];

const FULFILLMENT_BADGE_CLASS: Record<FulfillmentStatus, string> = {
  pending: 'border-amber-400/40 bg-amber-500/15 text-amber-300',
  processing: 'border-sky-400/40 bg-sky-500/15 text-sky-300',
  packed: 'border-indigo-400/40 bg-indigo-500/15 text-indigo-300',
  shipped: 'border-cyan-400/40 bg-cyan-500/15 text-cyan-300',
  delivered: 'border-emerald-400/40 bg-emerald-500/15 text-emerald-300',
  canceled: 'border-rose-400/40 bg-rose-500/15 text-rose-300',
  refunded: 'border-slate-300/30 bg-slate-400/15 text-slate-200',
};

type FulfillmentHistoryEntry = {
  updatedAt: string;
  fromStatus: FulfillmentStatus;
  toStatus: FulfillmentStatus;
  note: string;
  source: 'admin';
};

type StoreOrderRecord = {
  createdAt: string;
  eventType: string;
  orderIntentId: string;
  stripeSessionId: string;
  paymentStatus: string;
  customerEmail: string;
  customerName: string;
  amountTotalCents: number;
  currency: string;
  shippingRegion: string;
  taxJurisdiction: string;
  couponCode: string;
  subtotalCents: number;
  discountCents: number;
  shippingCents: number;
  taxCents: number;
  totalCents: number;
  fulfillmentStatus: FulfillmentStatus;
  fulfillmentUpdatedAt: string;
  fulfillmentNotes: string;
  fulfillmentHistory: FulfillmentHistoryEntry[];
};

export default function StoreOrdersAdminClient() {
  const [query, setQuery] = useState('');
  const [activeQuery, setActiveQuery] = useState('');
  const [adminKey, setAdminKey] = useState('');
  const [activeAdminKey, setActiveAdminKey] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | FulfillmentStatus>('all');
  const [activeStatusFilter, setActiveStatusFilter] = useState<'all' | FulfillmentStatus>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orders, setOrders] = useState<StoreOrderRecord[]>([]);
  const [statusDrafts, setStatusDrafts] = useState<Record<string, FulfillmentStatus>>({});
  const [noteDrafts, setNoteDrafts] = useState<Record<string, string>>({});
  const [savingBySession, setSavingBySession] = useState<Record<string, boolean>>({});
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function loadOrders() {
      setIsLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams();
        if (activeQuery) {
          params.set('q', activeQuery);
        }
        if (activeStatusFilter !== 'all') {
          params.set('status', activeStatusFilter);
        }

        const response = await fetch(`/api/store/orders?${params.toString()}`, {
          signal: controller.signal,
          headers: activeAdminKey
            ? {
                'x-admin-key': activeAdminKey,
              }
            : undefined,
        });

        const payload = (await response.json()) as { error?: string; items?: StoreOrderRecord[] };
        if (!response.ok) {
          throw new Error(payload.error || 'Failed to load orders.');
        }

        setOrders(payload.items ?? []);
        setStatusDrafts((prev) => {
          const next = { ...prev };
          for (const item of payload.items ?? []) {
            next[item.stripeSessionId] = next[item.stripeSessionId] ?? item.fulfillmentStatus;
          }

          return next;
        });
        setNoteDrafts((prev) => {
          const next = { ...prev };
          for (const item of payload.items ?? []) {
            next[item.stripeSessionId] = next[item.stripeSessionId] ?? (item.fulfillmentNotes ?? '');
          }

          return next;
        });
      } catch (loadError) {
        if ((loadError as Error).name === 'AbortError') {
          return;
        }

        const message = loadError instanceof Error ? loadError.message : 'Failed to load orders.';
        setError(message);
      } finally {
        setIsLoading(false);
      }
    }

    void loadOrders();

    return () => controller.abort();
  }, [activeAdminKey, activeQuery, activeStatusFilter]);

  const updateFulfillment = async (order: StoreOrderRecord) => {
    const stripeSessionId = order.stripeSessionId;
    const fulfillmentStatus = statusDrafts[stripeSessionId] ?? order.fulfillmentStatus;
    const fulfillmentNotes = noteDrafts[stripeSessionId] ?? order.fulfillmentNotes;

    setSavingBySession((prev) => ({ ...prev, [stripeSessionId]: true }));
    setError(null);

    try {
      const response = await fetch('/api/store/orders', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(activeAdminKey
            ? {
                'x-admin-key': activeAdminKey,
              }
            : {}),
        },
        body: JSON.stringify({
          stripeSessionId,
          fulfillmentStatus,
          fulfillmentNotes,
        }),
      });

      const payload = (await response.json()) as { error?: string; item?: StoreOrderRecord };
      if (!response.ok || !payload.item) {
        throw new Error(payload.error || 'Failed to update fulfillment status.');
      }

      setOrders((prev) =>
        prev.map((item) => (item.stripeSessionId === stripeSessionId ? payload.item! : item)),
      );
    } catch (updateError) {
      const message = updateError instanceof Error ? updateError.message : 'Failed to update fulfillment status.';
      setError(message);
    } finally {
      setSavingBySession((prev) => ({ ...prev, [stripeSessionId]: false }));
    }
  };

  const grossRevenue = useMemo(
    () => orders.reduce((sum, order) => sum + order.totalCents, 0),
    [orders],
  );

  const logout = async () => {
    setIsLoggingOut(true);

    try {
      await fetch('/api/store/admin/logout', {
        method: 'POST',
      });
    } finally {
      window.location.href = '/store/admin/login';
    }
  };

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-700/70 bg-slate-950/90 p-6 shadow-[0_16px_36px_rgba(0,0,0,0.28)]">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.35em] text-slate-500">Operations</p>
            <h2 className="mt-2 text-2xl font-bold uppercase tracking-[0.2em] text-slate-100">Order Intake Log</h2>
          </div>
          <div className="flex items-center gap-2">
            <div className="rounded-lg border border-slate-800/80 bg-slate-900/65 px-4 py-3 text-right">
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Visible Revenue</p>
              <p className="mt-1 text-lg font-bold text-slate-100">{formatUsd(grossRevenue)}</p>
            </div>
            <button
              type="button"
              onClick={() => {
                void logout();
              }}
              disabled={isLoggingOut}
              className="rounded-lg border border-slate-700/80 bg-slate-950/65 px-4 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-200 transition-colors hover:border-slate-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoggingOut ? 'Signing Out...' : 'Sign Out'}
            </button>
          </div>
        </div>

        <form
          className="mt-5 flex flex-wrap gap-3"
          onSubmit={(event) => {
            event.preventDefault();
            setActiveQuery(query.trim());
            setActiveAdminKey(adminKey.trim());
            setActiveStatusFilter(statusFilter);
          }}
        >
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by email, session id, order intent, coupon"
            className="min-w-[18rem] flex-1 rounded-lg border border-slate-700/80 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-cyan-300/60"
          />
          <input
            value={adminKey}
            onChange={(event) => setAdminKey(event.target.value)}
            placeholder="Optional admin key"
            className="min-w-[14rem] flex-1 rounded-lg border border-slate-700/80 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-cyan-300/60"
          />
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value as 'all' | FulfillmentStatus)}
            className="min-w-[14rem] flex-1 rounded-lg border border-slate-700/80 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 outline-none focus:border-cyan-300/60"
          >
            <option value="all">All fulfillment states</option>
            {FULFILLMENT_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="rounded-lg bg-[#E67E22] px-4 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#d35400]"
          >
            Search
          </button>
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setActiveQuery('');
              setAdminKey('');
              setActiveAdminKey('');
              setStatusFilter('all');
              setActiveStatusFilter('all');
            }}
            className="rounded-lg border border-slate-700/80 bg-slate-950/65 px-4 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-200 transition-colors hover:border-slate-500 hover:text-white"
          >
            Reset
          </button>
        </form>

        {error ? <p className="mt-4 text-sm text-amber-300">{error}</p> : null}

        <div className="mt-5 space-y-3">
          {isLoading ? <p className="text-sm text-slate-400">Loading orders...</p> : null}

          {!isLoading && orders.length === 0 ? (
            <div className="rounded-lg border border-slate-800/80 bg-slate-900/65 px-4 py-4 text-sm text-slate-300">
              No orders found for the current query.
            </div>
          ) : null}

          {!isLoading
            ? orders.map((order) => (
                <article key={order.stripeSessionId} className="rounded-lg border border-slate-800/80 bg-slate-900/65 p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">{new Date(order.createdAt).toLocaleString()}</p>
                      <h3 className="mt-1 text-sm font-bold uppercase tracking-[0.16em] text-slate-100">{order.orderIntentId}</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Paid Total</p>
                      <p className="mt-1 text-base font-bold text-slate-100">{formatUsd(order.totalCents)}</p>
                    </div>
                  </div>

                  <div className="mt-3 grid gap-2 text-xs text-slate-300 md:grid-cols-2 xl:grid-cols-4">
                    <p>Email: {order.customerEmail || 'n/a'}</p>
                    <p>Status: {order.paymentStatus}</p>
                    <p>
                      Fulfillment:{' '}
                      <span
                        className={`rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] ${FULFILLMENT_BADGE_CLASS[order.fulfillmentStatus]}`}
                      >
                        {order.fulfillmentStatus}
                      </span>
                    </p>
                    <p>Jurisdiction: {order.taxJurisdiction || 'n/a'}</p>
                    <p>Coupon: {order.couponCode || 'none'}</p>
                    <p>Session: {order.stripeSessionId}</p>
                    <p>Shipping Region: {order.shippingRegion || 'n/a'}</p>
                    <p>Subtotal: {formatUsd(order.subtotalCents)}</p>
                    <p>Tax: {formatUsd(order.taxCents)}</p>
                  </div>

                  <div className="mt-4 rounded-lg border border-slate-800/80 bg-slate-950/60 p-3">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Fulfillment Workflow</p>
                    <div className="mt-2 grid gap-2 md:grid-cols-[1fr_2fr_auto]">
                      <select
                        value={statusDrafts[order.stripeSessionId] ?? order.fulfillmentStatus}
                        onChange={(event) =>
                          setStatusDrafts((prev) => ({
                            ...prev,
                            [order.stripeSessionId]: event.target.value as FulfillmentStatus,
                          }))
                        }
                        className="rounded-lg border border-slate-700/80 bg-slate-950/80 px-3 py-2 text-xs text-slate-100 outline-none focus:border-cyan-300/60"
                      >
                        {FULFILLMENT_STATUSES.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>

                      <input
                        value={noteDrafts[order.stripeSessionId] ?? order.fulfillmentNotes ?? ''}
                        onChange={(event) =>
                          setNoteDrafts((prev) => ({
                            ...prev,
                            [order.stripeSessionId]: event.target.value,
                          }))
                        }
                        placeholder="Fulfillment note (tracking id, carrier, internal comment)"
                        className="rounded-lg border border-slate-700/80 bg-slate-950/80 px-3 py-2 text-xs text-slate-100 outline-none placeholder:text-slate-500 focus:border-cyan-300/60"
                      />

                      <button
                        type="button"
                        onClick={() => {
                          void updateFulfillment(order);
                        }}
                        disabled={Boolean(savingBySession[order.stripeSessionId])}
                        className="rounded-lg bg-[#E67E22] px-3 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#d35400] disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {savingBySession[order.stripeSessionId] ? 'Saving...' : 'Save'}
                      </button>
                    </div>
                    <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-slate-500">
                      Updated: {new Date(order.fulfillmentUpdatedAt).toLocaleString()}
                    </p>
                    {order.fulfillmentHistory.length > 0 ? (
                      <p className="mt-1 text-[10px] text-slate-400">
                        Last change: {order.fulfillmentHistory[order.fulfillmentHistory.length - 1].fromStatus} to{' '}
                        {order.fulfillmentHistory[order.fulfillmentHistory.length - 1].toStatus}
                      </p>
                    ) : null}
                  </div>
                </article>
              ))
            : null}
        </div>
      </section>
    </div>
  );
}
