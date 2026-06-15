interface DataModuleProps {
  title: string;
  metric: string;
  subtext: string;
  status: 'operational' | 'alert' | 'standby';
}

export default function DataModule({ title, metric, subtext, status }: DataModuleProps) {
  const statusColors = {
    operational: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
    alert: 'text-[#E67E22] bg-[#E67E22]/10 border-[#E67E22]/20',
    standby: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
  };

  return (
    <div className="bg-[#0B0B0B] border border-[#1F1F1F] rounded p-5 flex flex-col justify-between transform-gpu transition-all duration-200 hover:border-neutral-700">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">{title}</span>
        <span className={`px-2 py-0.5 rounded text-[9px] font-mono border uppercase tracking-wider ${statusColors[status]}`}>
          {status}
        </span>
      </div>
      <div>
        <div className="text-2xl font-mono tracking-tight text-neutral-200 font-bold mb-1">{metric}</div>
        <p className="text-xs font-sans text-neutral-500 leading-relaxed">{subtext}</p>
      </div>
    </div>
  );
}