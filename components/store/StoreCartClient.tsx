'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { STORE_PRODUCTS, formatUsd } from './catalog';
import { useStore } from './StoreProvider';
import { TAX_JURISDICTION_LABELS, type TaxJurisdiction } from './pricing';

export default function StoreCartClient() {
  const {
    items,
    pricing,
    taxJurisdiction,
    couponCode,
    couponError,
    updateQuantity,
    removeFromCart,
    setTaxJurisdiction,
    applyCoupon,
    clearCoupon,
  } = useStore();
  const byId = new Map(STORE_PRODUCTS.map((product) => [product.id, product]));
  const [couponDraft, setCouponDraft] = useState(couponCode);

  useEffect(() => {
    setCouponDraft(couponCode);
  }, [couponCode]);

  if (items.length === 0) {
    return (
      <section className="rounded-2xl border border-slate-700/70 bg-slate-950/90 p-6 shadow-[0_16px_36px_rgba(0,0,0,0.28)]">
        <h2 className="text-xl font-bold uppercase tracking-[0.2em] text-slate-100">Cart is Empty</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-300">
          Add products from the store catalog to start a checkout request.
        </p>
        <Link
          href="/store"
          className="mt-4 inline-flex items-center rounded-lg bg-[#E67E22] px-5 py-3 text-xs font-bold uppercase tracking-[0.22em] text-white transition-colors hover:bg-[#d35400]"
        >
          Return to Catalog
        </Link>
      </section>
    );
  }

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-700/70 bg-slate-950/90 p-6 shadow-[0_16px_36px_rgba(0,0,0,0.28)]">
        <h2 className="text-xl font-bold uppercase tracking-[0.2em] text-slate-100">Cart Manifest</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-300">Review quantities and proceed to checkout request.</p>

        <div className="mt-5 space-y-3">
          {items.map((item) => {
            const product = byId.get(item.productId);
            if (!product) {
              return null;
            }

            return (
              <article key={item.productId} className="rounded-lg border border-slate-800/80 bg-slate-900/65 px-4 py-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.15em] text-slate-100">{product.name}</p>
                    <p className="mt-1 text-xs text-slate-400">{formatUsd(product.priceCents)} each</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="h-8 w-8 rounded border border-slate-700/80 bg-slate-950/75 text-slate-200"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="min-w-8 text-center text-sm font-bold text-slate-100">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="h-8 w-8 rounded border border-slate-700/80 bg-slate-950/75 text-slate-200"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.productId)}
                      className="ml-2 rounded border border-rose-300/35 bg-rose-900/20 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-rose-100 transition-colors hover:border-rose-200/60"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-6 grid gap-4 rounded-lg border border-slate-800/80 bg-slate-900/65 px-4 py-4 md:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">Tax Jurisdiction</span>
            <select
              value={taxJurisdiction}
              onChange={(event) => setTaxJurisdiction(event.target.value as TaxJurisdiction)}
              className="w-full rounded-lg border border-slate-700/80 bg-slate-950/80 px-3 py-2 text-sm text-slate-100 outline-none focus:border-cyan-300/60"
            >
              {Object.entries(TAX_JURISDICTION_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <p className="mt-2 text-xs text-slate-400">
              Tax shown here is an estimate and may change at checkout based on the shipping address.
            </p>
          </label>

          <form
            className="block"
            onSubmit={(event) => {
              event.preventDefault();
              applyCoupon(couponDraft);
            }}
          >
            <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">Coupon Code</span>
            <div className="flex gap-2">
              <input
                value={couponDraft}
                onChange={(event) => setCouponDraft(event.target.value.toUpperCase())}
                className="w-full rounded-lg border border-slate-700/80 bg-slate-950/80 px-3 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-cyan-300/60"
                placeholder="HAVEN10"
              />
              <button
                type="submit"
                className="rounded-lg border border-cyan-300/35 bg-slate-950/70 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-cyan-100"
              >
                Apply
              </button>
              {couponCode ? (
                <button
                  type="button"
                  onClick={() => {
                    clearCoupon();
                    setCouponDraft('');
                  }}
                  className="rounded-lg border border-slate-600/70 bg-slate-950/70 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-200"
                >
                  Clear
                </button>
              ) : null}
            </div>
            {couponError ? <p className="mt-2 text-xs text-amber-300">{couponError}</p> : null}
            {pricing.appliedCoupon ? (
              <p className="mt-2 text-xs text-emerald-300">
                Applied {pricing.appliedCoupon.code}: {pricing.appliedCoupon.discountPercent}% off subtotal.
              </p>
            ) : null}
          </form>
        </div>

        <div className="mt-4 rounded-lg border border-slate-800/80 bg-slate-900/65 px-4 py-4">
          <div className="flex items-center justify-between gap-3 text-sm text-slate-300">
            <p>Subtotal</p>
            <p>{formatUsd(pricing.subtotalCents)}</p>
          </div>
          <div className="mt-2 flex items-center justify-between gap-3 text-sm text-slate-300">
            <p>Discount</p>
            <p>-{formatUsd(pricing.discountCents)}</p>
          </div>
          <div className="mt-2 flex items-center justify-between gap-3 text-sm text-slate-300">
            <p>Shipping</p>
            <p>{formatUsd(pricing.shippingCents)}</p>
          </div>
          <div className="mt-2 flex items-center justify-between gap-3 text-sm text-slate-300">
            <p>Estimated Tax ({(pricing.taxRate * 100).toFixed(2)}%)</p>
            <p>{formatUsd(pricing.taxCents)}</p>
          </div>
          <div className="mt-3 border-t border-slate-800/80 pt-3 flex items-center justify-between gap-3">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Estimated Total</p>
            <p className="text-xl font-bold text-slate-100">{formatUsd(pricing.totalCents)}</p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/store/checkout"
            className="inline-flex items-center rounded-lg bg-[#E67E22] px-5 py-3 text-xs font-bold uppercase tracking-[0.22em] text-white transition-colors hover:bg-[#d35400]"
          >
            Proceed to Checkout
          </Link>
          <Link
            href="/store"
            className="inline-flex items-center rounded-lg border border-slate-700/80 bg-slate-950/65 px-5 py-3 text-xs font-bold uppercase tracking-[0.22em] text-slate-200 transition-colors hover:border-slate-500 hover:text-white"
          >
            Continue Shopping
          </Link>
        </div>
      </section>
    </div>
  );
}
