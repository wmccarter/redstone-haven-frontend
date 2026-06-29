import Link from 'next/link';
import SectionPageLayout from '../../components/layout/SectionPageLayout';

const OPERATIONAL_LANES = [
  {
    title: 'Band Conditions Snapshot',
    summary: 'Solar flux, A/K index, noise floor trend, and MUF confidence for rapid operating decisions.',
    state: 'Live stream pending',
  },
  {
    title: 'Live Operations Status',
    summary: 'Operator availability, current mode, station temperature, and active frequency windows.',
    state: 'Control feed active',
  },
  {
    title: 'Station Queue',
    summary: 'Planned sessions, net windows, experimentation blocks, and relay assignments.',
    state: 'Queue in buildout',
  },
  {
    title: 'Emergency Playbooks',
    summary: 'Rapid-response comms procedures, fallback checklists, and escalation runbooks.',
    state: 'Drafted',
  },
];

const RECENT_LOGS = [
  'HF propagation sweep complete on 20m and 40m windows.',
  'Packet relay test channel validated for low-bandwidth burst mode.',
  'Mesh fallback node reconnected after staged outage simulation.',
  'Operator briefing deck queued for weekend net support block.',
];

export default function AmateurRadioOperationsPage() {
  return (
    <SectionPageLayout
      title="Amateur Radio Operations"
      subtitle="Mission-control hub for RF status, station workflows, and future comms modules"
    >
      <div className="space-y-6">
        <section className="rounded-2xl border border-slate-700/70 bg-slate-950/90 p-6 shadow-[0_16px_36px_rgba(0,0,0,0.28)]">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.35em] text-slate-500">Operations Hub</p>
              <h2 className="mt-2 text-2xl font-bold uppercase tracking-[0.24em] text-slate-100">Radio Command Center</h2>
            </div>
            <Link
              href="/amateur-radio-operations/rf-lab"
              className="rounded-xl border border-cyan-300/35 bg-cyan-300/10 px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-cyan-100 transition-colors hover:border-cyan-300/60 hover:bg-cyan-300/15"
            >
              Open RF Lab Module
            </Link>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {OPERATIONAL_LANES.map((lane) => (
              <article key={lane.title} className="rounded-xl border border-slate-800/80 bg-slate-900/65 p-4">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-100">{lane.title}</h3>
                  <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-1 text-[10px] uppercase tracking-[0.24em] text-emerald-300">
                    {lane.state}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{lane.summary}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-700/70 bg-slate-950/90 p-6 shadow-[0_16px_36px_rgba(0,0,0,0.28)]">
          <div className="border-b border-slate-800/80 pb-3">
            <h3 className="text-sm font-bold uppercase tracking-[0.28em] text-slate-100">Recent Radio Logs</h3>
          </div>
          <div className="mt-4 space-y-2">
            {RECENT_LOGS.map((log) => (
              <div key={log} className="rounded-lg border border-slate-800/80 bg-slate-900/60 px-4 py-3 text-sm text-slate-300">
                {log}
              </div>
            ))}
          </div>
        </section>
      </div>
    </SectionPageLayout>
  );
}
