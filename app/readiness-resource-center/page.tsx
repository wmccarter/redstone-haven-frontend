import SectionPageLayout from '../../components/layout/SectionPageLayout';

const READINESS_PILLARS = [
  {
    label: 'Water',
    title: 'Water Security',
    body: 'Storage, purification, transport, and fallback sanitation planning for short disruptions and long-duration grid failures.',
  },
  {
    label: 'Power',
    title: 'Power Continuity',
    body: 'Battery strategy, solar recovery, backup generation, low-draw lighting, and practical energy budgeting for austere operations.',
  },
  {
    label: 'Comms',
    title: 'Communications',
    body: 'RF basics, off-grid contact plans, local coordination, and hardening information flow when normal networks degrade.',
  },
  {
    label: 'Shelter',
    title: 'Shelter and Heat',
    body: 'Weatherproofing, thermal retention, emergency heating, and space prioritization when conditions turn hostile.',
  },
];

const RESOURCE_MODULES = [
  {
    title: '72-Hour Readiness Track',
    body: 'A practical quick-start path for food, water, lighting, med, and communication essentials for new visitors.',
    status: 'High priority launch candidate',
  },
  {
    title: 'Family Loadout Planner',
    body: 'A planning tool for household size, storage duration, and scenario-based supply calculations.',
    status: 'Strong interactive feature candidate',
  },
  {
    title: 'Field-Tested Gear Matrix',
    body: 'A side-by-side evaluation area for radios, power options, storage solutions, and shelter systems.',
    status: 'Commerce and trust driver',
  },
];

export default function ReadinessResourceCenterPage() {
  return (
    <SectionPageLayout
      title="Readiness Resource Center"
      subtitle="Command hub for practical resilience planning, off-grid capability, and household readiness"
    >
      <div className="relative space-y-6 overflow-hidden rounded-3xl about-living-network network-readiness px-1 py-1">
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
          <div className="max-w-4xl border-b border-slate-800/80 pb-4">
            <p className="text-[10px] uppercase tracking-[0.35em] text-slate-500">Overview</p>
            <h2 className="mt-2 text-2xl font-bold uppercase tracking-[0.24em] text-slate-100">Built for Real-World Readiness</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              This page is the staging ground for preparedness content that is immediately useful: actionable checklists,
              system planning, supply logic, communications guidance, and scenario-based decision support rather than site history.
            </p>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {READINESS_PILLARS.map((pillar, index) => (
              <article key={pillar.title} className="rounded-xl border border-slate-800/80 bg-slate-900/65 p-4 animate-about-value-card about-hover-card" style={{ animationDelay: `${index * 90 + 220}ms` }}>
                <p className="text-[10px] uppercase tracking-[0.3em] text-cyan-300/80">{pillar.label}</p>
                <h3 className="mt-2 text-sm font-bold uppercase tracking-[0.2em] text-slate-100">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{pillar.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="relative z-10 rounded-2xl border border-slate-700/70 bg-slate-950/90 p-6 shadow-[0_16px_36px_rgba(0,0,0,0.28)] animate-about-section about-live-card about-hover-card" style={{ animationDelay: '160ms' }}>
          <div className="border-b border-slate-800/80 pb-4">
            <p className="text-[10px] uppercase tracking-[0.35em] text-slate-500">Launch Modules</p>
            <h3 className="mt-2 text-xl font-bold uppercase tracking-[0.24em] text-slate-100">Recommended First Features</h3>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            {RESOURCE_MODULES.map((module, index) => (
              <article key={module.title} className="rounded-xl border border-slate-800/80 bg-slate-900/65 p-4 animate-about-value-card about-hover-card" style={{ animationDelay: `${index * 110 + 260}ms` }}>
                <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-100">{module.title}</h4>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{module.body}</p>
                <div className="mt-4 rounded-lg border border-dashed border-cyan-400/30 bg-slate-950/60 px-3 py-2 text-xs uppercase tracking-[0.18em] text-cyan-200/80">
                  {module.status}
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </SectionPageLayout>
  );
}