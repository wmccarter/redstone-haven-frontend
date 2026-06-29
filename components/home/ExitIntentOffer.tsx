'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'redstone-exit-offer-state';
const COUPON_CODE = 'HAVEN10';

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function ExitIntentOffer() {
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isClaimed, setIsClaimed] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const isForcedOpen = searchParams.get('offer') === 'coupon';
    const savedState = window.localStorage.getItem(STORAGE_KEY);
    setIsClaimed(savedState === 'claimed');

    if (isForcedOpen) {
      setIsOpen(true);
      setIsHydrated(true);
      return;
    }

    if (savedState === 'dismissed' || savedState === 'claimed') {
      setIsHydrated(true);
      return;
    }

    const handleMouseOut = (event: MouseEvent) => {
      if (event.relatedTarget || event.clientY > 24 || isOpen) {
        return;
      }

      setIsOpen(true);
    };

    document.addEventListener('mouseout', handleMouseOut);
    setIsHydrated(true);

    return () => {
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [isOpen, searchParams]);

  const clearCouponQuery = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete('offer');
    window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        window.localStorage.setItem(STORAGE_KEY, 'dismissed');
        clearCouponQuery();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  const closeOffer = () => {
    setIsOpen(false);
    if (!isClaimed) {
      window.localStorage.setItem(STORAGE_KEY, 'dismissed');
    }
    clearCouponQuery();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isValidEmail(email)) {
      setEmailError('Enter a valid email to unlock the offer.');
      return;
    }

    setEmailError('');
    setIsClaimed(true);
    window.localStorage.setItem(STORAGE_KEY, 'claimed');
    clearCouponQuery();
  };

  if (!isHydrated || !isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/78 px-4 backdrop-blur-sm">
      <div className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-[#E67E22]/35 bg-[#06101c] shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E67E22] to-transparent shadow-[0_0_14px_rgba(230,126,34,0.7)]" />

        <button
          type="button"
          onClick={closeOffer}
          className="absolute right-4 top-4 rounded border border-slate-700/80 bg-slate-950/65 px-2 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-300 transition-colors hover:border-slate-500 hover:text-white"
          aria-label="Close offer"
        >
          X
        </button>

        <div className="p-6 md:p-8">
          <p className="text-[10px] uppercase tracking-[0.38em] text-cyan-300/80">Before You Exit</p>
          <p className="mt-3 text-sm font-bold uppercase tracking-[0.26em] text-amber-200">
            WHO DOESN&apos;T LIKE TO SAVE MONEY?
          </p>
          <h2 className="mt-3 text-2xl font-bold uppercase tracking-[0.18em] text-slate-100 md:text-3xl">
            Claim a Store Coupon
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-slate-300">
            If you are about to head out, grab a quick discount first. Enter your email and unlock a coupon for your next order.
          </p>

          {!isClaimed ? (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <label className="block">
                <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">
                  Email Address
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="operator@domain.com"
                  className="w-full rounded-lg border border-slate-700/80 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 outline-none transition-colors placeholder:text-slate-500 focus:border-cyan-300/60"
                />
              </label>

              {emailError ? <p className="text-sm text-amber-300">{emailError}</p> : null}

              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  className="inline-flex items-center rounded-lg bg-[#E67E22] px-5 py-3 text-xs font-bold uppercase tracking-[0.22em] text-white transition-colors hover:bg-[#d35400]"
                >
                  Unlock Coupon
                </button>
                <button
                  type="button"
                  onClick={closeOffer}
                  className="inline-flex items-center rounded-lg border border-slate-700/80 bg-slate-950/65 px-5 py-3 text-xs font-bold uppercase tracking-[0.22em] text-slate-200 transition-colors hover:border-slate-500 hover:text-white"
                >
                  No Thanks
                </button>
              </div>

              <p className="text-xs leading-relaxed text-slate-500">
                If you change your mind later, use COUPONS in the top navigation. You can wire this email capture flow to your real email platform later.
              </p>
            </form>
          ) : (
            <div className="mt-6 space-y-4">
              <div className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-4">
                <p className="text-[11px] uppercase tracking-[0.24em] text-emerald-200/80">Coupon Unlocked</p>
                <p className="mt-2 text-3xl font-bold uppercase tracking-[0.3em] text-emerald-300">{COUPON_CODE}</p>
                <p className="mt-2 text-sm text-slate-200">
                  Use this as your launch discount code once your store-side coupon logic is connected.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/store"
                  className="inline-flex items-center rounded-lg bg-[#E67E22] px-5 py-3 text-xs font-bold uppercase tracking-[0.22em] text-white transition-colors hover:bg-[#d35400]"
                >
                  Open Store
                </Link>
                <button
                  type="button"
                  onClick={closeOffer}
                  className="inline-flex items-center rounded-lg border border-slate-700/80 bg-slate-950/65 px-5 py-3 text-xs font-bold uppercase tracking-[0.22em] text-slate-200 transition-colors hover:border-slate-500 hover:text-white"
                >
                  Continue Browsing
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}