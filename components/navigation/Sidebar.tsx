'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const MENU_ITEMS = [
  { name: 'MISSION CONTROL', path: '/', hint: 'Primary console' },
  { name: 'ABOUT US', path: '/about-us', hint: 'Company + mission' },
  { name: 'MISSION BRIEFING', path: '/mission-briefing', hint: 'How to play' },
  { name: 'DROP HAB MATRIX', path: '/infrastructure', hint: 'CORE SYSTEMS' },
  { name: 'SECURE PORTAL', path: '/secure-portal', hint: 'Transmission stack' },
  { name: 'READINESS CENTER', path: '/readiness-resource-center', hint: 'Preparedness hub' },
  { name: 'FAQ', path: '/faq', hint: 'Fast answers' },
  { name: 'CONTACT', path: '/contact', hint: 'Support relay' },
];

export default function Sidebar() {
  const currentPath = usePathname();

  const isRouteActive = (path: string) => {
    if (path === '/') {
      return currentPath === '/';
    }

    return currentPath === path || currentPath.startsWith(`${path}/`);
  };

  return (
    <aside className="relative w-full shrink-0 overflow-hidden border-b border-slate-800/70 bg-[radial-gradient(ellipse_at_top,_rgba(30,41,59,0.36),_rgba(2,6,23,0.98)_55%)] px-4 py-4 lg:w-72 lg:min-h-screen lg:border-b-0 lg:border-r lg:px-5 lg:py-6">
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-px bg-gradient-to-b from-transparent via-cyan-300/20 to-transparent lg:block" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E67E22]/70 to-transparent shadow-[0_0_12px_rgba(230,126,34,0.55)]" />

      <div className="relative flex flex-col gap-4 lg:h-full lg:justify-between lg:gap-6">
        <div>
          <div className="mb-4 rounded-xl border border-slate-800/80 bg-slate-950/75 px-4 py-4 shadow-[0_16px_34px_rgba(0,0,0,0.35)] lg:mb-8">
            <div className="flex items-center gap-3">
              <span className="relative inline-flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E67E22]/55" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-[#E67E22]" />
              </span>
              <span className="text-sm font-bold tracking-[0.2em] text-slate-200">REDSTONE HAVEN</span>
            </div>
            <p className="mt-3 text-[10px] uppercase tracking-[0.28em] text-slate-500">Mission Navigation Node</p>
          </div>

          <nav className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1">
            {MENU_ITEMS.map((item) => {
              const isActive = isRouteActive(item.path);
              return (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`group relative block overflow-hidden rounded-lg border px-3 py-3 transition-all duration-200 ${
                    isActive
                      ? 'border-[#E67E22]/60 bg-[#1a202b] text-[#f7b267] shadow-[0_0_0_1px_rgba(230,126,34,0.2),0_10px_24px_rgba(0,0,0,0.25)]'
                      : 'border-slate-800/80 bg-slate-950/55 text-slate-400 hover:border-cyan-300/35 hover:bg-slate-900/70 hover:text-slate-100'
                  }`}
                >
                  <span className="pointer-events-none absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-[#E67E22] via-amber-300 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-70" />
                  <span className="block text-[11px] font-bold tracking-[0.18em]">{item.name}</span>
                  <span className={`mt-1 block text-[10px] uppercase tracking-[0.16em] ${isActive ? 'text-amber-100/70' : 'text-slate-500'}`}>
                    {item.hint}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="space-y-3 rounded-xl border border-slate-800/80 bg-slate-950/75 p-4 shadow-[0_16px_34px_rgba(0,0,0,0.35)]">
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-slate-500">Node Authority</p>
            <p className="mt-1 text-xs uppercase tracking-[0.16em] text-emerald-300">Secure Local Host</p>
          </div>
          <div className="rounded-lg border border-slate-800/80 bg-slate-900/60 px-3 py-2">
            <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500">Operational State</p>
            <div className="mt-1 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-cyan-200">
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(125,211,252,0.8)]" />
              Routing stable
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
