import Link from 'next/link';
import SectionPageLayout from '../../components/layout/SectionPageLayout';

const EXPECTATION_SUMMARY =
  'Expect a product command hub with direct store links, launch previews, demo videos, and support routes for every item carrying the Redstone banner.';

const STORE_LINKS = [
  {
    label: 'On-Domain Store',
    href: '/store',
    description: 'Primary Redstone Haven Systems Store for future ecommerce launches.',
  },
  {
    label: 'Amazon FBA Store',
    href: 'https://www.amazon.com/shops/redstonehaven',
    description: 'Marketplace storefront for the Amazon fulfillment path.',
  },
  {
    label: 'Narrative HUB',
    href: '/narrative-hub',
    description: 'Book, social channels, RF operations, and series media reference hub.',
  },
];

const PRODUCT_LANES = [
  'Habitat systems and survival shell components',
  'Field gear, branded products, and mission accessories',
  'Book companion material and launch-media packs',
  'Web-series teaser reels and product demo cuts',
];

const VIDEO_DEMOS = [
  {
    title: 'Product Walkthrough // Habitat Shell',
    src: '/videos/hero-main.mp4',
  },
  {
    title: 'Assembly Reel // Station Interior',
    src: '/videos/station-interior-load.mp4',
  },
  {
    title: 'Launch Teaser // Orbital Motion',
    src: '/videos/mars-orbit-intro.mp4',
  },
];

export default function SupplyChainManifestPage() {
  return (
    <SectionPageLayout
      title="Supply Chain Manifest"
      subtitle="Central launch point for Redstone products, storefronts, and media demos"
    >
      <div className="space-y-6">
        <section className="rounded-2xl border border-slate-700/70 bg-slate-950/90 p-6 shadow-[0_16px_36px_rgba(0,0,0,0.28)]">
          <div className="border-b border-slate-800/80 pb-4">
            <p className="text-[10px] uppercase tracking-[0.35em] text-slate-500">Summary</p>
            <h2 className="mt-2 text-2xl font-bold uppercase tracking-[0.24em] text-slate-100">What to Expect</h2>
            <p className="mt-3 max-w-4xl text-sm leading-relaxed text-slate-300">{EXPECTATION_SUMMARY}</p>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            {STORE_LINKS.map((item) => (
              <article key={item.label} className="rounded-xl border border-slate-800/80 bg-slate-900/65 p-4">
                <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500">Link</p>
                <h3 className="mt-2 text-sm font-bold uppercase tracking-[0.2em] text-slate-100">{item.label}</h3>
                <p className="mt-2 text-sm text-slate-300">{item.description}</p>
                <Link
                  href={item.href}
                  className="mt-4 inline-flex rounded-lg border border-slate-700/80 bg-slate-950/60 px-3 py-2 text-xs uppercase tracking-[0.26em] text-slate-200 transition-colors hover:border-cyan-300/50 hover:text-cyan-100"
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noreferrer noopener' : undefined}
                >
                  Open
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-700/70 bg-slate-950/90 p-6 shadow-[0_16px_36px_rgba(0,0,0,0.28)]">
          <div className="border-b border-slate-800/80 pb-4">
            <p className="text-[10px] uppercase tracking-[0.35em] text-slate-500">Catalog</p>
            <h3 className="mt-2 text-xl font-bold uppercase tracking-[0.24em] text-slate-100">What lives here</h3>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {PRODUCT_LANES.map((lane) => (
              <div key={lane} className="rounded-xl border border-slate-800/80 bg-slate-900/65 p-4 text-sm text-slate-300">
                {lane}
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-700/70 bg-slate-950/90 p-6 shadow-[0_16px_36px_rgba(0,0,0,0.28)]">
          <div className="border-b border-slate-800/80 pb-4">
            <p className="text-[10px] uppercase tracking-[0.35em] text-slate-500">Demo Matrix</p>
            <h3 className="mt-2 text-xl font-bold uppercase tracking-[0.24em] text-slate-100">Embedded product and series videos</h3>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {VIDEO_DEMOS.map((demo) => (
              <article key={demo.title} className="rounded-xl border border-slate-800/80 bg-slate-900/65 p-3">
                <video className="h-44 w-full rounded-lg object-cover" controls preload="metadata">
                  <source src={demo.src} type="video/mp4" />
                </video>
                <p className="mt-3 text-sm font-bold uppercase tracking-[0.18em] text-slate-100">{demo.title}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </SectionPageLayout>
  );
}
