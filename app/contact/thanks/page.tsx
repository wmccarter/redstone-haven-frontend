import Link from 'next/link';
import SectionPageLayout from '../../../components/layout/SectionPageLayout';

export default function ContactThanksPage() {
  return (
    <SectionPageLayout
      title="Message Received"
      subtitle="Your contact request has been transmitted to the Redstone Haven support desk"
    >
      <div className="mx-auto max-w-3xl space-y-6">
        <section className="rounded-2xl border border-slate-700/70 bg-slate-950/90 p-6 shadow-[0_16px_36px_rgba(0,0,0,0.28)]">
          <p className="text-[10px] uppercase tracking-[0.35em] text-cyan-300/80">Transmission Complete</p>
          <h2 className="mt-2 text-2xl font-bold uppercase tracking-[0.2em] text-slate-100">Thank You for Reaching Out</h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-300">
            Your message has been delivered. Our team reviews support, product, and partnership inquiries during business hours and aims to reply within 24 business hours.
          </p>

          <div className="mt-5 rounded-xl border border-slate-800/80 bg-slate-900/65 p-4 text-sm leading-relaxed text-slate-300">
            If this was your first live FormSubmit message, the routing is now confirmed and future submissions should continue flowing directly into the support inbox.
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-lg bg-[#E67E22] px-5 py-3 text-xs font-bold uppercase tracking-[0.22em] text-white transition-colors hover:bg-[#d35400]"
            >
              Send Another Message
            </Link>
            <Link
              href="/"
              className="inline-flex items-center rounded-lg border border-slate-700/80 bg-slate-950/65 px-5 py-3 text-xs font-bold uppercase tracking-[0.22em] text-slate-200 transition-colors hover:border-slate-500 hover:text-white"
            >
              Return Home
            </Link>
          </div>
        </section>
      </div>
    </SectionPageLayout>
  );
}