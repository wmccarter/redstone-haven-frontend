'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { STORE_PRODUCTS, formatUsd } from './catalog';
import { useStore } from './StoreProvider';

export default function StoreCheckoutClient() {
  const searchParams = useSearchParams();
  const { items, taxJurisdiction, couponCode, pricing, clearCart } = useStore();
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [isStartingCheckout, setIsStartingCheckout] = useState(false);
  const hasClearedRef = useRef(false);

  const isSubmitted = searchParams.get('status') === 'success';
  const isCanceled = searchParams.get('status') === 'canceled';
  const byId = useMemo(() => new Map(STORE_PRODUCTS.map((product) => [product.id, product])), []);

  const orderSummary = useMemo(() => {
    if (items.length === 0) {
      return 'No items in cart.';
    }

    const lines = items
      .map((item) => {
        const product = byId.get(item.productId);
        if (!product) {
          return null;
        }

        return `${product.name} x${item.quantity} (${formatUsd(product.priceCents)} each)`;
      })
      .filter(Boolean);

    return `${lines.join('\n')}\n\nSubtotal: ${formatUsd(pricing.subtotalCents)}\nDiscount: -${formatUsd(pricing.discountCents)}\nShipping: ${formatUsd(pricing.shippingCents)}\nEstimated Tax: ${formatUsd(pricing.taxCents)}\nEstimated Total: ${formatUsd(pricing.totalCents)}`;
  }, [byId, items, pricing.discountCents, pricing.shippingCents, pricing.subtotalCents, pricing.taxCents, pricing.totalCents]);

  useEffect(() => {
    if (isSubmitted && !hasClearedRef.current) {
      clearCart();
      hasClearedRef.current = true;
    }
  }, [clearCart, isSubmitted]);

  const handleStripeCheckout = async () => {
    if (items.length === 0) {
      return;
    }

    setIsStartingCheckout(true);
    setCheckoutError(null);

    try {
      const response = await fetch('/api/store/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items,
          taxJurisdiction,
          couponCode,
        }),
      });

      const payload = (await response.json()) as { url?: string; error?: string };
      if (!response.ok || !payload.url) {
        throw new Error(payload.error || 'Failed to initialize Stripe checkout.');
      }

      window.location.assign(payload.url);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to initialize Stripe checkout.';
      setCheckoutError(message);
      setIsStartingCheckout(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-6 shadow-[0_16px_36px_rgba(0,0,0,0.28)]">
        <h2 className="text-xl font-bold uppercase tracking-[0.2em] text-emerald-100">Payment Confirmed</h2>
        <p className="mt-3 text-sm leading-relaxed text-emerald-100/90">
          Your Stripe checkout completed successfully. Cart has been cleared and your mission order is now processing.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/store"
            className="inline-flex items-center rounded-lg bg-[#E67E22] px-5 py-3 text-xs font-bold uppercase tracking-[0.22em] text-white transition-colors hover:bg-[#d35400]"
          >
            Return to Store
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center rounded-lg border border-slate-700/80 bg-slate-950/65 px-5 py-3 text-xs font-bold uppercase tracking-[0.22em] text-slate-200 transition-colors hover:border-slate-500 hover:text-white"
          >
            Need Assistance
          </Link>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="rounded-2xl border border-slate-700/70 bg-slate-950/90 p-6 shadow-[0_16px_36px_rgba(0,0,0,0.28)]">
        <h2 className="text-xl font-bold uppercase tracking-[0.2em] text-slate-100">Checkout Queue Empty</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-300">Add products to your cart before creating a checkout request.</p>
        <Link
          href="/store"
          className="mt-4 inline-flex items-center rounded-lg bg-[#E67E22] px-5 py-3 text-xs font-bold uppercase tracking-[0.22em] text-white transition-colors hover:bg-[#d35400]"
        >
          Browse Store
        </Link>
      </section>
    );
  }

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-700/70 bg-slate-950/90 p-6 shadow-[0_16px_36px_rgba(0,0,0,0.28)]">
        <h2 className="text-xl font-bold uppercase tracking-[0.2em] text-slate-100">Checkout Request</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-300">
          Launch secure Stripe checkout for instant payment processing.
        </p>

        {isCanceled ? (
          <div className="mt-4 rounded-lg border border-amber-400/30 bg-amber-400/10 p-4 text-sm text-amber-100">
            Stripe checkout was canceled. Your cart is still intact.
          </div>
        ) : null}

        <div className="mt-5 rounded-lg border border-slate-800/80 bg-slate-900/65 p-4">
          <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Order Summary</p>
          <pre className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-slate-200">{orderSummary}</pre>
        </div>

        <div className="mt-5 rounded-lg border border-slate-800/80 bg-slate-900/65 px-4 py-4">
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
          <div className="mt-3 flex items-center justify-between gap-3 border-t border-slate-800/80 pt-3">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Estimated Total</p>
            <p className="text-xl font-bold text-slate-100">{formatUsd(pricing.totalCents)}</p>
          </div>
        </div>

        {checkoutError ? (
          <p className="mt-4 text-sm text-amber-300">{checkoutError}</p>
        ) : null}

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleStripeCheckout}
            disabled={isStartingCheckout}
            className="inline-flex items-center rounded-lg bg-[#E67E22] px-5 py-3 text-xs font-bold uppercase tracking-[0.22em] text-white transition-colors hover:bg-[#d35400] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isStartingCheckout ? 'Launching Stripe...' : 'Pay Securely with Stripe'}
          </button>
          <Link
            href="/store/cart"
            className="inline-flex items-center rounded-lg border border-slate-700/80 bg-slate-950/65 px-5 py-3 text-xs font-bold uppercase tracking-[0.22em] text-slate-200 transition-colors hover:border-slate-500 hover:text-white"
          >
            Back to Cart
          </Link>
        </div>
      </section>
    </div>
  );
}
