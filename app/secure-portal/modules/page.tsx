import Link from 'next/link';
import SectionPageLayout from '../../../components/layout/SectionPageLayout';
import { MISSION_MODULES, missionModuleHref } from '../module-map';

export default function SecurePortalModulesPage() {
  return (
    <SectionPageLayout
      title="Mission Control Route Map"
      subtitle="Clickable inventory for mission-control board modules and actions"
    >
      <section className="rounded-2xl border border-slate-700/70 bg-slate-950/90 p-6 shadow-[0_16px_36px_rgba(0,0,0,0.28)]">
        <div className="border-b border-slate-800/80 pb-4">
          <h2 className="text-xl font-bold uppercase tracking-[0.24em] text-slate-100">Mapped clickable modules</h2>
          <p className="mt-2 max-w-3xl text-sm text-slate-300">This index ensures each mission-control interaction can resolve to a real destination page, even before final feature implementation.</p>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {MISSION_MODULES.map((module) => (
            <Link
              key={module.id}
              href={missionModuleHref(module.id)}
              className="rounded-xl border border-slate-800/80 bg-slate-900/65 p-4 transition-colors hover:border-cyan-300/50"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500">{module.category}</span>
                <span className="rounded-full border border-slate-700/70 bg-slate-900 px-2 py-1 text-[10px] uppercase tracking-[0.26em] text-slate-300">{module.status}</span>
              </div>
              <h3 className="mt-2 text-base font-bold uppercase tracking-[0.16em] text-slate-100">{module.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{module.summary}</p>
            </Link>
          ))}
        </div>
      </section>
    </SectionPageLayout>
  );
}
