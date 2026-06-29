'use client';

import Link from 'next/link';
import { STORE_PRODUCTS, formatUsd } from './catalog';
import { useStore } from './StoreProvider';

export default function StoreCatalogClient() {
  const { addToCart, cartCount } = useStore();

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-700/70 bg-slate-950/90 p-6 shadow-[0_16px_36px_rgba(0,0,0,0.28)]">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.35em] text-slate-500">Catalog</p>
            <h2 className="mt-2 text-2xl font-bold uppercase tracking-[0.2em] text-slate-100">Operational Storefront</h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-300">
              Shop mission-ready systems and preparedness modules directly from the on-domain Redstone Haven store.
            </p>
          </div>
          <Link
            href="/store/cart"
            className="inline-flex items-center rounded-lg border border-cyan-300/40 bg-slate-900/70 px-4 py-3 text-xs font-bold uppercase tracking-[0.2em] text-cyan-100 transition-colors hover:border-cyan-200/70 hover:text-white"
          >
            Cart ({cartCount})
          </Link>
        </div>

        <div className="mt-4 flex justify-end">
          <Link
            href="/store/admin/orders"
            className="inline-flex items-center rounded-lg border border-slate-700/80 bg-slate-950/65 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-200 transition-colors hover:border-slate-500 hover:text-white"
          >
            Orders Console
          </Link>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {STORE_PRODUCTS.map((product) => (
            <article key={product.id} className="rounded-xl border border-slate-800/80 bg-slate-900/65 p-4">
              <p className="text-[10px] uppercase tracking-[0.25em] text-cyan-300/75">{product.category}</p>
              <h3 className="mt-2 text-sm font-bold uppercase tracking-[0.16em] text-slate-100">{product.name}</h3>
              <p className="mt-2 text-xs uppercase tracking-[0.16em] text-slate-400">{product.tagline}</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">{product.description}</p>

              <div className="mt-4 flex items-center justify-between gap-3 rounded-lg border border-slate-800/80 bg-slate-950/70 px-3 py-2">
                <div>
                  <p className="text-lg font-bold text-slate-100">{formatUsd(product.priceCents)}</p>
                  <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">{product.stock}</p>
                </div>
                <button
                  type="button"
                  onClick={() => addToCart(product.id)}
                  className="rounded-lg bg-[#E67E22] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#d35400]"
                >
                  Add
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
