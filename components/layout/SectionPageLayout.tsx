import type { ReactNode } from 'react';
import Sidebar from '../navigation/Sidebar';

interface SectionPageLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export default function SectionPageLayout({ title, subtitle, children }: SectionPageLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-[#050505] text-neutral-300 antialiased lg:flex-row">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-5 lg:p-8">
        <header className="mb-6 flex items-center justify-between border-b border-[#1F1F1F] pb-5 lg:mb-8 lg:pb-6">
          <div>
            <h1 className="text-xl font-mono tracking-wider font-bold text-neutral-200 uppercase">{title}</h1>
            <p className="text-xs text-neutral-500 font-sans mt-1">{subtitle}</p>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}
