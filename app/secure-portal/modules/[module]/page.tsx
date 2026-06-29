import Link from 'next/link';
import { notFound } from 'next/navigation';
import SectionPageLayout from '../../../../components/layout/SectionPageLayout';
import { MISSION_MODULES, missionModuleById, missionModuleHref } from '../../module-map';

type ModulePageProps = {
  params: Promise<{
    module: string;
  }>;
};

export default async function SecurePortalModulePage({ params }: ModulePageProps) {
  const { module } = await params;
  const data = missionModuleById[module];

  if (!data) {
    notFound();
  }

  return (
    <SectionPageLayout
      title={data.title}
      subtitle="Mission control module planning page"
    >
      <section className="rounded-2xl border border-slate-700/70 bg-slate-950/90 p-6 shadow-[0_16px_36px_rgba(0,0,0,0.28)]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
          <div>
            <div className="text-[10px] uppercase tracking-[0.34em] text-slate-500">{data.category}</div>
            <h2 className="mt-2 text-2xl font-bold uppercase tracking-[0.22em] text-slate-100">{data.title}</h2>
          </div>
          <div className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-cyan-200">Status: {data.status}</div>
        </div>

        <p className="mt-5 max-w-3xl text-sm leading-relaxed text-slate-300">{data.summary}</p>

        <div className="mt-6 rounded-xl border border-dashed border-slate-700/80 bg-slate-900/60 p-5 text-sm text-slate-300">
          This page is mapped and ready for future implementation details. Use this route as the target for the matching mission-control click behavior.
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {MISSION_MODULES.map((item) => (
            <Link
              key={item.id}
              href={missionModuleHref(item.id)}
              className={`rounded-xl border p-4 text-sm transition-colors ${item.id === data.id ? 'border-[#E67E22]/50 bg-[#E67E22]/10 text-[#f4b06a]' : 'border-slate-800/80 bg-slate-900/65 text-slate-300 hover:border-cyan-300/50'}`}
            >
              <div className="text-[10px] uppercase tracking-[0.3em] text-slate-500">{item.category}</div>
              <div className="mt-2 font-semibold uppercase tracking-[0.14em]">{item.title}</div>
            </Link>
          ))}
        </div>

        <div className="mt-6">
          <Link
            href="/secure-portal"
            className="inline-flex items-center rounded-xl border border-slate-700/70 bg-slate-900/80 px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-slate-300 transition-colors hover:border-cyan-300/50 hover:text-cyan-200"
          >
            Return to mission control
          </Link>
        </div>
      </section>
    </SectionPageLayout>
  );
}
