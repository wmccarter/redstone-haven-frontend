// components/StatusWidget.tsx
export default function StatusWidget() {
  return (
    <div className="bg-[#121212] border border-slate-800 p-6 rounded-sm shadow-lg w-full max-w-sm">
      <h3 className="text-slate-400 text-xs uppercase tracking-widest mb-4">System Status</h3>
      <div className="flex items-center space-x-3">
        <div className="w-3 h-3 bg-[#E67E22] rounded-full animate-pulse"></div>
        <span className="text-white font-mono text-lg">OPERATIONAL</span>
      </div>
    </div>
  );
}