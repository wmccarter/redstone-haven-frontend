'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const currentPath = usePathname();

  const menuItems = [
    { name: 'MISSION CONTROL', path: '/' },
    { name: 'INFRASTRUCTURE', path: '/infrastructure' },
    { name: 'TRANSMISSIONS', path: '/transmission-archive' },
    { name: 'SECURE PORTAL', path: '/secure-portal' },
  ];

  return (
    <aside className="w-64 min-h-screen bg-[#0B0B0B] border-r border-[#1F1F1F] p-6 flex flex-col justify-between shrink-0">
      <div>
        {/* Brand Node */}
        <div className="flex items-center space-x-3 mb-10">
          <div className="w-3 h-3 bg-[#E67E22] rounded-sm animate-pulse" />
          <span className="text-sm font-mono tracking-widest text-neutral-400 font-bold">REDSTONE HAVEN</span>
        </div>

        {/* Navigation Map */}
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <Link
                key={item.name}
                href={item.path}
                className={`flex items-center px-4 py-3 rounded text-xs font-mono tracking-wider transition-all duration-150 ${
                  isActive
                    ? 'bg-[#1A1A1A] text-[#E67E22] border-l-2 border-[#E67E22]'
                    : 'text-neutral-500 hover:text-neutral-300 hover:bg-[#121212]'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* System Authorization State */}
      <div className="border-t border-[#1F1F1F] pt-4">
        <div className="text-[10px] font-mono text-neutral-600 uppercase tracking-wider">Node Authority</div>
        <div className="text-xs font-mono text-emerald-500 flex items-center space-x-1.5 mt-1">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
          <span>SECURE_LOCAL_HOST</span>
        </div>
      </div>
    </aside>
  );
}