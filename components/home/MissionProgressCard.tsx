import type { MissionMetric } from './data';

interface MissionProgressCardProps {
  metrics: MissionMetric[];
}

export default function MissionProgressCard({ metrics }: MissionProgressCardProps) {
  return (
    <div className="relative aspect-square overflow-hidden rounded-[12px] border border-slate-500/35 bg-[#11161d] p-5 animate-mission-card-load">
      <div className="pointer-events-none absolute inset-0 rounded-[14px] border border-white/5" />
      <div className="pointer-events-none absolute left-3 top-3 h-2.5 w-2.5 rounded-full border border-white/20 bg-white/5 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]" />
      <div className="pointer-events-none absolute right-3 top-3 h-2.5 w-2.5 rounded-full border border-white/20 bg-white/5 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]" />
      <div className="pointer-events-none absolute left-3 bottom-3 h-2.5 w-2.5 rounded-full border border-white/20 bg-white/5 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]" />
      <div className="pointer-events-none absolute right-3 bottom-3 h-2.5 w-2.5 rounded-full border border-white/20 bg-white/5 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]" />

      <h3 className="relative text-xs font-bold text-slate-300 tracking-widest uppercase pb-2 border-b border-slate-700/70 flex justify-between items-center">
        <span>MISSION PROGRESS</span>
        <span className="w-1.5 h-1.5 bg-emerald-300 rounded-full animate-ping" />
      </h3>

      <div className="relative mt-5 space-y-4 text-[11px]">
        {metrics.map((metric, index) => (
          <div
            key={metric.label}
            className="space-y-1 animate-mission-row-reveal"
            style={{ animationDelay: `${index * 120 + 120}ms` }}
          >
            <div className="flex justify-between text-slate-400">
              <span>{metric.label}</span>
              <span className="text-emerald-300 font-bold">{metric.value}%</span>
            </div>
            <div className="h-3 w-full bg-slate-900 rounded-sm overflow-hidden border border-slate-700/80">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-emerald-300 rounded-sm shadow-[0_0_10px_rgba(110,231,183,0.7)] animate-mission-bar-grow"
                style={{ width: `${metric.value}%`, animationDelay: `${index * 120 + 200}ms` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
