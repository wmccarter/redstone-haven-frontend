import Link from 'next/link';
import SectionPageLayout from '../../components/layout/SectionPageLayout';

const FAQ_ITEMS = [
  {
    question: 'How long do order responses and support replies take?',
    answer: 'We aim to reply to support messages within 24 business hours, Monday through Friday.',
  },
  {
    question: 'Where should I ask about products or readiness gear?',
    answer: 'Use the contact page and choose Product Inquiry for gear questions, compatibility checks, and stock-related requests.',
  },
  {
    question: 'Do you accept partnership, creator, or press outreach?',
    answer: 'Yes. Choose Partnership / Press so those requests can be triaged separately from customer support.',
  },
  {
    question: 'What if I need an answer faster than email?',
    answer: 'Use the direct support email on the contact page and include the reason for contact plus any order details to reduce back-and-forth.',
  },
];

export default function FaqPage() {
  return (
    <SectionPageLayout
      title="FAQ"
      subtitle="Quick answers for support, ordering, product questions, and outreach"
    >
      <div className="relative space-y-6 overflow-hidden rounded-3xl about-living-network network-faq px-1 py-1">
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-3xl">
          <div className="absolute inset-0 about-energy-ribbon" />
          <div className="absolute inset-x-8 top-[18%] h-px about-energy-conduit" />
          <div className="absolute inset-x-8 top-[50%] h-px about-energy-conduit" style={{ animationDelay: '1200ms' }} />
          <div className="absolute inset-x-8 top-[82%] h-px about-energy-conduit" style={{ animationDelay: '2400ms' }} />
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 about-network-spine" />
          <span className="absolute left-[12%] top-[18%] h-2.5 w-2.5 rounded-full bg-cyan-300/90 about-node-pulse" />
          <span className="absolute left-1/2 top-[18%] h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-cyan-300/90 about-node-pulse" style={{ animationDelay: '300ms' }} />
          <span className="absolute right-[12%] top-[18%] h-2.5 w-2.5 rounded-full bg-cyan-300/90 about-node-pulse" style={{ animationDelay: '600ms' }} />
          <span className="absolute left-[16%] top-[50%] h-2.5 w-2.5 rounded-full bg-emerald-300/90 about-node-pulse" style={{ animationDelay: '900ms' }} />
          <span className="absolute left-1/2 top-[50%] h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-emerald-300/90 about-node-pulse" style={{ animationDelay: '1200ms' }} />
          <span className="absolute right-[16%] top-[50%] h-2.5 w-2.5 rounded-full bg-emerald-300/90 about-node-pulse" style={{ animationDelay: '1500ms' }} />
          <span className="absolute left-[22%] top-[82%] h-2.5 w-2.5 rounded-full bg-amber-300/90 about-node-pulse" style={{ animationDelay: '1800ms' }} />
          <span className="absolute left-1/2 top-[82%] h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-amber-300/90 about-node-pulse" style={{ animationDelay: '2100ms' }} />
          <span className="absolute right-[22%] top-[82%] h-2.5 w-2.5 rounded-full bg-amber-300/90 about-node-pulse" style={{ animationDelay: '2400ms' }} />
        </div>

        <section className="relative z-10 rounded-2xl border border-slate-700/70 bg-slate-950/90 p-6 shadow-[0_16px_36px_rgba(0,0,0,0.28)] animate-about-section about-live-card about-hover-card">
          <div className="border-b border-slate-800/80 pb-4">
            <p className="text-[10px] uppercase tracking-[0.35em] text-slate-500">Fast Answers</p>
            <h2 className="mt-2 text-2xl font-bold uppercase tracking-[0.24em] text-slate-100">Frequently Asked Questions</h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-300">
              Start here for the questions customers most commonly ask before reaching out directly.
            </p>
          </div>

          <div className="mt-5 space-y-4">
            {FAQ_ITEMS.map((item, index) => (
              <article key={item.question} className="rounded-xl border border-slate-800/80 bg-slate-900/65 p-4 animate-about-value-card about-hover-card" style={{ animationDelay: `${index * 90 + 220}ms` }}>
                <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-slate-100">{item.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="relative z-10 rounded-2xl border border-slate-700/70 bg-slate-950/90 p-6 shadow-[0_16px_36px_rgba(0,0,0,0.28)] animate-about-section about-live-card about-hover-card" style={{ animationDelay: '150ms' }}>
          <h3 className="text-lg font-bold uppercase tracking-[0.2em] text-slate-100">Still Need Help?</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">
            If your question is specific to an order, a product, or a partnership conversation, use the contact form so we can route it correctly.
          </p>
          <Link
            href="/contact"
            className="mt-4 inline-flex items-center rounded-lg bg-[#E67E22] px-5 py-3 text-xs font-bold uppercase tracking-[0.22em] text-white transition-colors hover:bg-[#d35400]"
          >
            Open Contact Page
          </Link>
        </section>
      </div>
    </SectionPageLayout>
  );
}