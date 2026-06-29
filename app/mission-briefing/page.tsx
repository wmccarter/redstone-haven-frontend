import Link from 'next/link';
import SectionPageLayout from '../../components/layout/SectionPageLayout';

const MISSION_STEPS = [
  {
    title: 'Stage Your Payload',
    detail:
      'Open Secure Transmission and add your mission label, subject, destination, and optional payload files before you begin the uplink sequence.',
  },
  {
    title: 'Complete the Control Chain in Order',
    detail:
      'Follow the activation order exactly: Telemetry Stack, System Telemetry, Channel Readiness, then Protected Access. Out-of-order clicks will reset the stack.',
  },
  {
    title: 'Initiate Uplink Sequence',
    detail:
      'Once the chain is complete, initiate transmission and monitor telemetry states as packetizing, encryption, and uplink handshakes finish.',
  },
  {
    title: 'Access Mission Modules',
    detail:
      'After completion, mission modules unlock so you can navigate archives, private downloads, partner lanes, and early-access routes.',
  },
];

const PERFORMANCE_TIPS = [
  'Do not click modules out of order during the gate sequence.',
  'Stage files before uplink so payload metadata is included in telemetry.',
  'Use concise labels and subject lines for cleaner mission tracking.',
  'If sequence status resets, restart from Telemetry Stack and continue in order.',
];

export default function MissionBriefingPage() {
  return (
    <SectionPageLayout
      title="Mission Briefing"
      subtitle="How to play Secure Transmission and complete a full mission cycle"
    >
      <div className="relative space-y-6 overflow-hidden rounded-3xl about-living-network network-mission px-1 py-1">
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
          <p className="text-[10px] uppercase tracking-[0.35em] text-cyan-300/80">How to Play</p>
          <h2 className="mt-2 text-2xl font-bold uppercase tracking-[0.2em] text-slate-100">Secure Transmission Walkthrough</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-300">
            This mission mode rewards sequence discipline. Follow the chain, complete the uplink cleanly, and unlock the secured module network.
          </p>

          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            {MISSION_STEPS.map((step, index) => (
              <article key={step.title} className="rounded-xl border border-slate-800/80 bg-slate-900/65 p-4 animate-about-value-card about-hover-card" style={{ animationDelay: `${index * 90 + 220}ms` }}>
                <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500">Step {index + 1}</p>
                <h3 className="mt-2 text-sm font-bold uppercase tracking-[0.17em] text-slate-100">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{step.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="relative z-10 rounded-2xl border border-slate-700/70 bg-slate-950/90 p-6 shadow-[0_16px_36px_rgba(0,0,0,0.28)] animate-about-section about-live-card about-hover-card" style={{ animationDelay: '160ms' }}>
          <p className="text-[10px] uppercase tracking-[0.35em] text-slate-500">Operator Tips</p>
          <h3 className="mt-2 text-xl font-bold uppercase tracking-[0.2em] text-slate-100">Mission Performance Notes</h3>

          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-300">
            {PERFORMANCE_TIPS.map((tip, index) => (
              <li key={tip} className="rounded-lg border border-slate-800/80 bg-slate-900/65 px-4 py-3 animate-about-list-item about-hover-card" style={{ animationDelay: `${index * 90 + 280}ms` }}>
                {tip}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/secure-portal"
              className="inline-flex items-center rounded-lg bg-[#E67E22] px-5 py-3 text-xs font-bold uppercase tracking-[0.22em] text-white transition-colors hover:bg-[#d35400]"
            >
              Launch Secure Transmission
            </Link>
            <Link
              href="/"
              className="inline-flex items-center rounded-lg border border-slate-700/80 bg-slate-950/65 px-5 py-3 text-xs font-bold uppercase tracking-[0.22em] text-slate-200 transition-colors hover:border-slate-500 hover:text-white"
            >
              Return to Mission Control
            </Link>
          </div>
        </section>
      </div>
    </SectionPageLayout>
  );
}