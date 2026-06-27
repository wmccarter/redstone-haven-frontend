import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 relative overflow-x-hidden font-mono tracking-wide">
      
      {/* Background Matrix Grid - Subtle dark slate indicator lines */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900/30 via-[#020617] to-[#020617] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b08_1px,transparent_1px),linear-gradient(to_bottom,#1e293b08_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0" />

      {/* ----------------- TOP NAV HEADER ----------------- */}
      <header className="relative z-10 max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between border-b border-slate-800/60 backdrop-blur-sm bg-[#020617]/40">
        <div className="flex items-center space-x-3 mb-4 md:mb-0 group cursor-pointer">
          <div className="relative w-10 h-10 shrink-0 transition-transform duration-500 group-hover:rotate-12">
            <Image src="/logo_v2.png" alt="Redstone Haven Logo" width={40} height={40} className="object-contain" priority />
          </div>
          <div>
            <span className="text-base font-bold tracking-widest text-white block transition-colors group-hover:text-[#E67E22]">REDSTONE HAVEN</span>
            <span className="text-[10px] block tracking-widest text-slate-400 -mt-1 uppercase">Infrastructure Systems</span>
          </div>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-1 text-[11px] text-slate-400">
          <span className="text-slate-600">[</span>
          <Link href="/" className="text-[#E67E22] hover:text-[#d35400] px-2 font-bold transition-colors">HOME</Link>
          <span className="text-slate-600">|</span>
          <Link href="/transmission-archive" className="hover:text-slate-100 px-2 transition-colors">MISSION LOG</Link>
          <span className="text-slate-600">|</span>
          <Link href="/infrastructure" className="hover:text-slate-100 px-2 transition-colors">INFRASTRUCTURE SYSTEMS</Link>
          <span className="text-slate-600">|</span>
          <span className="text-slate-500 opacity-50 px-2 cursor-not-allowed">AMATEUR RADIO OPERATIONS</span>
          <span className="text-slate-600">|</span>
          <Link href="/secure-portal" className="hover:text-slate-100 px-2 transition-colors">SECURE TRANSMISSION</Link>
          <span className="text-slate-600">]</span>
        </nav>
      </header>

      {/* ----------------- TELEMETRY TICKER TAPE ----------------- */}
      <div className="relative z-10 bg-slate-950/80 border-b border-slate-900 py-2.5 text-[10px] tracking-widest text-slate-400 uppercase overflow-hidden whitespace-nowrap">
        <div className="animate-ticker space-x-8 inline-block pl-[100%]">
          <span><span className="text-[#E67E22]">//</span> CASTAIC BASE STATUS: <span className="text-emerald-400 font-bold animate-pulse">ACTIVE</span></span>
          <span><span className="text-[#E67E22]">//</span> CURRENT REDSTONE OPERATIONS: <span className="text-white font-bold">OPTIMIZING</span></span>
          <span><span className="text-[#E67E22]">//</span> COMS CHECK: <span className="text-emerald-400">NOMINAL</span></span>
          <span><span className="text-[#E67E22]">//</span> MARS ARRIVAL: <span className="text-[#E67E22] font-bold">T-MINUS 12 DAYS</span></span>
          <span><span className="text-[#E67E22]">//</span> CASTAIC BASE STATUS: <span className="text-emerald-400 font-bold animate-pulse">ACTIVE</span></span>
          <span><span className="text-[#E67E22]">//</span> CURRENT REDSTONE OPERATIONS: <span className="text-white font-bold">OPTIMIZING</span></span>
        </div>
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8 space-y-8">
        
        {/* ----------------- CENTER CINEMATIC HERO BOX ----------------- */}
        {/* Border altered to a precise Mars theme accent color */}
        <section className="relative rounded border border-[#E67E22]/20 bg-slate-950/60 p-1 overflow-hidden group shadow-[0_0_30px_rgba(230,126,34,0.03)] transition-all duration-300 hover:border-[#E67E22]/40">
          
          {/* Aerospace HUD Corner Accents - Shifted to Mars Red-Orange */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#E67E22] z-20" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#E67E22] z-20" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#E67E22] z-20" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#E67E22] z-20" />

          {/* Laser Scanner Sweep Line - Shifted to a sharp Mars Red light track */}
          <div className="absolute inset-x-0 h-0.5 bg-[#E67E22]/50 shadow-[0_0_8px_#E67E22] pointer-events-none z-20 animate-scanline" />

          <div className="relative h-80 md:h-[420px] w-full rounded overflow-hidden flex flex-col justify-end p-8 md:p-12">
            
            {/* IMAGE WRAPPER: Removed 'mix-blend-screen' so your image renders in raw, beautiful True Color */}
            <div className="absolute inset-0 z-0">
              <Image 
                src="/hero-mars-v2.jpg" 
                alt="Frontier Exploration Target" 
                width={1200}
                height={420}
                className="w-full h-full object-cover object-center opacity-85 transition-transform duration-700 group-hover:scale-[1.01]"
                priority
              />
            </div>
            {/* Linear overlay block to ensure crisp reading accessibility over the bright planet image */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent联合 z-10" />

            <div className="relative z-10 max-w-2xl space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white uppercase leading-none selection:bg-[#E67E22]/30">
                EMBARK ON <br />THE FRONTIER.
              </h2>
              <p className="text-xs md:text-sm text-slate-200 font-sans tracking-wide max-w-lg leading-relaxed shadow-sm">
                Welcome to Redstone Haven LLC. Your mission to build resilient infrastructure starts here. 
                Monitoring localized node metrics, dynamic payloads, and orbital routing patterns.
              </p>
              
              <div className="pt-2">
                <Link href="/infrastructure" className="inline-flex items-center space-x-2 bg-[#E67E22] hover:bg-[#d35400] text-white px-5 py-3 rounded text-xs font-bold uppercase tracking-widest transition-all duration-150 shadow-[0_4px_15px_rgba(230,126,34,0.3)] active:scale-95">
                  <span>[ INITIATE MISSION ]</span>
                  <span className="text-sm">↗</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ----------------- INTERFACE CARD MATRIX ----------------- */}
        <section className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            
            {/* Card 1 */}
            <div className="bg-slate-950/40 border border-slate-800/80 rounded p-5 flex flex-col justify-between space-y-6 transition-all duration-300 hover:border-[#E67E22]/40 hover:bg-slate-950/70 hover:-translate-y-0.5 group/card shadow-sm">
              <div className="space-y-3">
                <div className="w-10 h-10 border border-slate-800 rounded flex items-center justify-center text-slate-500 text-lg transition-colors group-hover/card:text-[#E67E22] group-hover/card:border-[#E67E22]/30 bg-slate-900/20">⬢</div>
                <h3 className="text-sm font-bold tracking-wider text-slate-100 uppercase transition-colors group-hover/card:text-[#E67E22]">OFF-GRID INFRASTRUCTURE</h3>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  A modular hex-habitat grid system built with automated structural configurations and resilient infrastructure templates.
                </p>
              </div>
              <span className="text-[10px] text-slate-500 group-hover/card:text-[#E67E22]/70 tracking-widest uppercase transition-colors">SYS_REF // GRID_A</span>
            </div>

            {/* Card 2 */}
            <div className="bg-slate-950/40 border border-slate-800/80 rounded p-5 flex flex-col justify-between space-y-6 transition-all duration-300 hover:border-[#E67E22]/40 hover:bg-slate-950/70 hover:-translate-y-0.5 group/card shadow-sm">
              <div className="space-y-3">
                <div className="w-10 h-10 border border-slate-800 rounded flex items-center justify-center text-slate-500 text-lg transition-colors group-hover/card:text-[#E67E22] group-hover/card:border-[#E67E22]/30 bg-slate-900/20">📡</div>
                <h3 className="text-sm font-bold tracking-wider text-slate-100 uppercase transition-colors group-hover/card:text-[#E67E22]">RF & AMATEUR RADIO</h3>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  High-frequency orbital monitoring, packet radio deployment workflows, and decentralized communication infrastructure logs.
                </p>
              </div>
              <span className="text-[10px] text-slate-500 group-hover/card:text-[#E67E22]/70 tracking-widest uppercase transition-colors">SYS_REF // FREQ_HF</span>
            </div>

            {/* Card 3 */}
            <div className="bg-slate-950/40 border border-slate-800/80 rounded p-5 flex flex-col justify-between space-y-6 transition-all duration-300 hover:border-[#E67E22]/40 hover:bg-slate-950/70 hover:-translate-y-0.5 group/card shadow-sm">
              <div className="space-y-3">
                <div className="w-10 h-10 border border-slate-800 rounded flex items-center justify-center text-slate-500 text-lg transition-colors group-hover/card:text-[#E67E22] group-hover/card:border-[#E67E22]/30 bg-slate-900/20">⬡</div>
                <h3 className="text-sm font-bold tracking-wider text-slate-100 uppercase transition-colors group-hover/card:text-[#E67E22]">MODULAR 3D DESIGN</h3>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  Rapid generative modeling blueprints for remote deployment environments, parts manifest integration, and telemetry tracking.
                </p>
              </div>
              <span className="text-[10px] text-slate-500 group-hover/card:text-[#E67E22]/70 tracking-widest uppercase transition-colors">SYS_REF // CAD_V4</span>
            </div>

          </div>

          {/* Right Metrics Tracker */}
          <div className="bg-slate-950/60 border border-slate-800 p-5 rounded space-y-5 shadow-inner">
            <h3 className="text-xs font-bold text-slate-400 tracking-widest uppercase pb-2 border-b border-slate-800 flex justify-between items-center">
              <span>MISSION PROGRESS</span>
              <span className="w-1.5 h-1.5 bg-[#E67E22] rounded-full animate-ping" />
            </h3>
            <div className="space-y-4 text-[11px]">
              
              {/* Telemetry Bar 1 */}
              <div className="space-y-1">
                <div className="flex justify-between text-slate-400">
                  <span>[ HABITAT DEPLOYMENT ]</span>
                  <span className="text-[#E67E22] font-bold">84%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-950 rounded-sm overflow-hidden p-0.5 border border-slate-800/80">
                  <div className="h-full bg-[#E67E22] animate-pulse rounded-xs" style={{ width: '84%' }} />
                </div>
              </div>

              {/* Telemetry Bar 2 */}
              <div className="space-y-1">
                <div className="flex justify-between text-slate-400">
                  <span>[ POWER GRID STABILITY ]</span>
                  <span className="text-[#E67E22] font-bold">91%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-950 rounded-sm overflow-hidden p-0.5 border border-slate-800/80">
                  <div className="h-full bg-[#E67E22] animate-pulse rounded-xs" style={{ width: '91%' }} />
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      {/* ----------------- FOOTER ----------------- */}
      <footer className="relative z-10 max-w-7xl mx-auto px-6 mt-12 py-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500">
        <div className="flex space-x-4 mb-3 sm:mb-0">
          <Link href="/transmission-archive" className="hover:text-slate-400 transition-colors">MISSION LOGS</Link>
          <span>•</span>
          <span className="hover:text-slate-400 cursor-pointer transition-colors">PRIVACY</span>
          <span>•</span>
          <span className="hover:text-slate-400 cursor-pointer transition-colors">CONTACT</span>
          <span>•</span>
          <span className="text-slate-700">SYSTEM V4.2</span>
        </div>
        <div className="bg-slate-950/90 border border-slate-800/60 px-4 py-1.5 rounded-full flex items-center space-x-2">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-slate-400 text-[10px] tracking-wider uppercase">SYSTEM HEALTHY</span>
        </div>
      </footer>

    </div>
  );
}