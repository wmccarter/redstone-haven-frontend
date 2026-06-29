import Link from 'next/link';
import SectionPageLayout from '../../components/layout/SectionPageLayout';

const COMPANY_VALUES = [
  {
    title: 'Preparedness Through Practical Systems',
    detail:
      'We build resilient tools and training paths that help individuals, teams, and communities operate confidently when conditions are uncertain.',
  },
  {
    title: 'Field-Tested Over Theoretical',
    detail:
      'Our guidance and product decisions prioritize reliability in real-world scenarios: communications discipline, repeatable workflows, and usable infrastructure.',
  },
  {
    title: 'Education + Execution',
    detail:
      'We blend instruction with hands-on utility so customers can learn, deploy, and improve without needing a large operations team.',
  },
];

const MISSION_POINTS = [
  'Deliver dependable systems that remain useful under pressure.',
  'Demystify operational readiness for everyday operators.',
  'Connect preparedness, communications, and supply continuity in one ecosystem.',
  'Serve customers with integrity, clarity, and measurable outcomes.',
];

export default function AboutUsPage() {
  return (
    <SectionPageLayout
      title="About Us"
      subtitle="Who we are, what we build, and why Redstone Haven exists"
    >
      <div className="relative space-y-6 overflow-hidden rounded-3xl about-living-network px-1 py-1">
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

        <section className="relative z-10 rounded-2xl border border-slate-700/70 bg-slate-950/88 p-6 shadow-[0_16px_36px_rgba(0,0,0,0.28)] animate-about-section about-live-card about-hover-card">
          <p className="text-[10px] uppercase tracking-[0.35em] text-cyan-300/80">Company Overview</p>
          <h2 className="mt-2 text-2xl font-bold uppercase tracking-[0.2em] text-slate-100">Redstone Haven</h2>
          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-slate-300">
            Redstone Haven is focused on readiness systems, communications capability, and practical mission support for people who need reliable tools.
            Our work spans operational education, equipment pathways, and structured workflows designed to help users move from uncertainty to disciplined execution.
          </p>
        </section>

        <section className="relative z-10 rounded-2xl border border-slate-700/70 bg-slate-950/88 p-6 shadow-[0_16px_36px_rgba(0,0,0,0.28)] animate-about-section about-live-card about-hover-card" style={{ animationDelay: '140ms' }}>
          <p className="text-[10px] uppercase tracking-[0.35em] text-slate-500">Mission Statement</p>
          <h3 className="mt-2 text-xl font-bold uppercase tracking-[0.2em] text-slate-100">Our Mission</h3>
          <p className="mt-3 max-w-4xl text-sm leading-relaxed text-slate-300">
            Our mission is to equip operators with dependable systems, actionable knowledge, and trusted support so they can communicate, adapt, and sustain operations when it matters most.
          </p>

          <ul className="mt-5 space-y-3 text-sm leading-relaxed text-slate-300">
            {MISSION_POINTS.map((point, index) => (
              <li
                key={point}
                className="rounded-lg border border-slate-800/80 bg-slate-900/65 px-4 py-3 animate-about-list-item about-hover-card"
                style={{ animationDelay: `${index * 90 + 230}ms` }}
              >
                {point}
              </li>
            ))}
          </ul>
        </section>

        <section className="relative z-10 rounded-2xl border border-slate-700/70 bg-slate-950/88 p-6 shadow-[0_16px_36px_rgba(0,0,0,0.28)] animate-about-section about-live-card about-hover-card" style={{ animationDelay: '280ms' }}>
          <p className="text-[10px] uppercase tracking-[0.35em] text-slate-500">How We Work</p>
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            {COMPANY_VALUES.map((value, index) => (
              <article
                key={value.title}
                className="rounded-xl border border-slate-800/80 bg-slate-900/65 p-4 animate-about-value-card about-hover-card"
                style={{ animationDelay: `${index * 120 + 360}ms` }}
              >
                <h4 className="text-sm font-bold uppercase tracking-[0.17em] text-slate-100">{value.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{value.detail}</p>
              </article>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/store"
              className="inline-flex items-center rounded-lg bg-[#E67E22] px-5 py-3 text-xs font-bold uppercase tracking-[0.22em] text-white transition-colors hover:bg-[#d35400]"
            >
              Explore The Store
            </Link>
            <Link
              href="/"
              className="inline-flex items-center rounded-lg border border-slate-700/80 bg-slate-950/65 px-5 py-3 text-xs font-bold uppercase tracking-[0.22em] text-slate-200 transition-colors hover:border-slate-500 hover:text-white"
            >
              Return To Home
            </Link>
          </div>
        </section>
      </div>
    </SectionPageLayout>
  );
}
