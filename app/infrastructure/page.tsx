import SectionPageLayout from '../../components/layout/SectionPageLayout';

const SURVIVAL_PILLARS = [
  {
    title: 'Shelter + Thermal Protection',
    detail:
      'A survivable envelope that protects occupants from weather, temperature swings, and environmental exposure in both short and extended operations.',
  },
  {
    title: 'Water + Sanitation',
    detail:
      'Safe water sourcing, purification, storage, and waste handling that maintain health when municipal infrastructure is unavailable.',
  },
  {
    title: 'Power + Energy Continuity',
    detail:
      'Reliable power generation, storage, and distribution to sustain lighting, communications gear, sensors, refrigeration, and mission equipment.',
  },
  {
    title: 'Food + Supply Resilience',
    detail:
      'Protected storage, rotation, and preparation systems that keep calories, nutrition, and critical consumables available through disruptions.',
  },
  {
    title: 'Communications + Situational Awareness',
    detail:
      'Redundant comms and monitoring pathways that preserve command-and-control, coordination, and informed decision-making under stress.',
  },
  {
    title: 'Security + Human Factors',
    detail:
      'Physical security, access control, medical readiness, and ergonomic living/working space to protect people over prolonged operations.',
  },
];

const NECESSITY_MATRIX = [
  {
    necessity: 'Air and Breathing Safety',
    requirement: 'Clean air exchange, contamination control, and safe occupancy conditions.',
    dropHab: 'Filtered intake strategy, sealed envelope design, and controlled internal airflow planning.',
  },
  {
    necessity: 'Potable Water',
    requirement: 'Collection, purification, storage, and disciplined consumption controls.',
    dropHab: 'Integrated water storage zones and treatment-ready utility interfaces for rapid setup.',
  },
  {
    necessity: 'Food Access',
    requirement: 'Protected inventory with prep capability and spoilage risk reduction.',
    dropHab: 'Storage-first interior zoning with power-ready support for preservation and meal operations.',
  },
  {
    necessity: 'Safe Shelter',
    requirement: 'Weather protection, thermal control, and structural reliability.',
    dropHab: 'Self-deployable structure engineered for rapid protection in varied environments.',
  },
  {
    necessity: 'Energy',
    requirement: 'Primary and backup electrical continuity for critical loads.',
    dropHab: 'Power distribution architecture that supports staged generation and battery integration.',
  },
  {
    necessity: 'Comms',
    requirement: 'Reliable local and long-range communication channels.',
    dropHab: 'Equipment-ready routing and operator workspace designed for radio and digital comm stacks.',
  },
  {
    necessity: 'Medical and Safety',
    requirement: 'Immediate response capabilities and hazard mitigation workflows.',
    dropHab: 'Dedicated storage and access design for first-aid, trauma, and safety toolkits.',
  },
  {
    necessity: 'Security',
    requirement: 'Layered deterrence, controlled entry, and operational privacy.',
    dropHab: 'Hardened enclosure strategy with configurable ingress control points.',
  },
];

const DROP_HAB_DESIGN_PRIORITIES = [
  'Rapid self-deployment with minimal crew and reduced setup complexity.',
  'Modular internal zones for command, utility, storage, and rest.',
  'Scalable utility ports for water, power, and comms expansion.',
  'Cross-environment adaptability for urban outages, severe weather, and remote support operations.',
  'Maintainability-focused layout so operators can sustain function without specialized contractors.',
];

export default function InfrastructurePage() {
  return (
    <SectionPageLayout
      title="DROP HAB MATRIX"
      subtitle="Pillars of survival and how the self-deployable Drop Habitat meets essential life requirements"
    >
      <div className="relative space-y-6 overflow-hidden rounded-3xl about-living-network network-drophab px-1 py-1">
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
          <p className="text-[10px] uppercase tracking-[0.35em] text-cyan-300/80">System Intent</p>
          <h2 className="mt-2 text-2xl font-bold uppercase tracking-[0.2em] text-slate-100">Full Survival System Overview</h2>
          <p className="mt-3 max-w-4xl text-sm leading-relaxed text-slate-300">
            DROP HAB MATRIX defines the baseline requirements for sustaining human life and operational continuity in unstable conditions.
            The Drop Habitat system is designed as a self-deployable platform that consolidates shelter, utilities, logistics, and communications
            into one cohesive operating footprint.
          </p>
        </section>

        <section className="relative z-10 rounded-2xl border border-slate-700/70 bg-slate-950/90 p-6 shadow-[0_16px_36px_rgba(0,0,0,0.28)] animate-about-section about-live-card about-hover-card" style={{ animationDelay: '140ms' }}>
          <p className="text-[10px] uppercase tracking-[0.35em] text-slate-500">Pillars of Survival</p>
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            {SURVIVAL_PILLARS.map((pillar, index) => (
              <article key={pillar.title} className="rounded-xl border border-slate-800/80 bg-slate-900/65 p-4 animate-about-value-card about-hover-card" style={{ animationDelay: `${index * 80 + 220}ms` }}>
                <h3 className="text-sm font-bold uppercase tracking-[0.17em] text-slate-100">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{pillar.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="relative z-10 rounded-2xl border border-slate-700/70 bg-slate-950/90 p-6 shadow-[0_16px_36px_rgba(0,0,0,0.28)] animate-about-section about-live-card about-hover-card" style={{ animationDelay: '240ms' }}>
          <p className="text-[10px] uppercase tracking-[0.35em] text-slate-500">Necessities of Life Mapping</p>
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            {NECESSITY_MATRIX.map((item, index) => (
              <article key={item.necessity} className="rounded-xl border border-slate-800/80 bg-slate-900/65 p-4 animate-about-value-card about-hover-card" style={{ animationDelay: `${index * 60 + 280}ms` }}>
                <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500">{item.necessity}</p>
                <p className="mt-2 text-sm font-semibold text-slate-100">Requirement</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-300">{item.requirement}</p>
                <p className="mt-3 text-sm font-semibold text-cyan-200">Drop Habitat Response</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-300">{item.dropHab}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="relative z-10 rounded-2xl border border-slate-700/70 bg-slate-950/90 p-6 shadow-[0_16px_36px_rgba(0,0,0,0.28)] animate-about-section about-live-card about-hover-card" style={{ animationDelay: '320ms' }}>
          <p className="text-[10px] uppercase tracking-[0.35em] text-slate-500">Drop Habitat Engineering Intent</p>
          <h3 className="mt-2 text-xl font-bold uppercase tracking-[0.2em] text-slate-100">Design Priorities</h3>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-300">
            {DROP_HAB_DESIGN_PRIORITIES.map((item, index) => (
              <li key={item} className="rounded-lg border border-slate-800/80 bg-slate-900/65 px-4 py-3 animate-about-list-item about-hover-card" style={{ animationDelay: `${index * 90 + 360}ms` }}>
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </SectionPageLayout>
  );
}