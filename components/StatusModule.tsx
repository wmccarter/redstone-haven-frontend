// components/StatusModule.tsx

interface StatusModuleProps {
  title: string;
  status: string;
  value: string;
}

export default function StatusModule({ title, status, value }: StatusModuleProps) {
  return (
    <div className="bg-[#121212] border border-slate-800 p-6 rounded-sm hover:border-[#E67E22] transition-colors">
      <h3 className="text-slate-400 text-xs uppercase tracking-widest">{title}</h3>
      <div className="mt-4 flex justify-between items-end">
        <span className="text-white text-2xl font-mono">{value}</span>
        <span className="text-[#E67E22] text-xs font-bold">{status}</span>
      </div>
    </div>
  );
}