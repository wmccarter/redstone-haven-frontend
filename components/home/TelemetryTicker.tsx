export default function TelemetryTicker() {
  return (
    <div className="relative z-10 bg-slate-950/80 border-b border-slate-900 py-2.5 text-[10px] tracking-widest text-slate-400 uppercase overflow-hidden whitespace-nowrap">
      <div className="animate-ticker space-x-8 inline-block pl-[100%]">
        <span><span className="text-[#E67E22]">{'//'}</span> CASTAIC BASE STATUS: <span className="text-emerald-400 font-bold animate-pulse">ACTIVE</span></span>
        <span><span className="text-[#E67E22]">{'//'}</span> CURRENT REDSTONE OPERATIONS: <span className="text-white font-bold">OPTIMIZING</span></span>
        <span><span className="text-[#E67E22]">{'//'}</span> COMS CHECK: <span className="text-emerald-400">NOMINAL</span></span>
        <span><span className="text-[#E67E22]">{'//'}</span> MARS ARRIVAL: <span className="text-[#E67E22] font-bold">T-MINUS 12 DAYS</span></span>
        <span><span className="text-[#E67E22]">{'//'}</span> CASTAIC BASE STATUS: <span className="text-emerald-400 font-bold animate-pulse">ACTIVE</span></span>
        <span><span className="text-[#E67E22]">{'//'}</span> CURRENT REDSTONE OPERATIONS: <span className="text-white font-bold">OPTIMIZING</span></span>
      </div>
    </div>
  );
}
