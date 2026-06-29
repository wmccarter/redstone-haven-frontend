import type { ReactNode } from 'react';

interface SocialLinkButtonProps {
  href: string;
  label: string;
  icon: ReactNode;
  compact?: boolean;
  className?: string;
}

function SocialButtonBase({ href, label, icon, compact = false, className = '' }: SocialLinkButtonProps) {
  const sizeClass = compact ? 'px-3 py-2 text-[10px]' : 'px-4 py-2.5 text-[11px]';

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className={`${sizeClass} inline-flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-950/80 text-slate-200 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#E67E22]/50 hover:bg-slate-900 hover:shadow-[0_0_18px_rgba(230,126,34,0.2)] ${className}`}
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900/80 text-white ring-1 ring-slate-700/70">
        {icon}
      </span>
      <span className="font-bold uppercase tracking-widest">{label}</span>
    </a>
  );
}

export function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path
        fill="currentColor"
        d="M21.8 8.2s-.2-1.6-.8-2.3c-.8-.9-1.7-1-2.1-1.1C16.1 4.5 12 4.5 12 4.5h0s-4.1 0-6.9.3c-.4.1-1.3.2-2.1 1.1-.6.7-.8 2.3-.8 2.3S2 10 2 11.8v.4c0 1.8.2 3.6.2 3.6s.2 1.6.8 2.3c.8.9 1.9.9 2.4 1C7.1 19.5 12 19.5 12 19.5s4.1 0 6.9-.3c.4-.1 1.3-.2 2.1-1.1.6-.7.8-2.3.8-2.3s.2-1.8.2-3.6v-.4c0-1.8-.2-3.6-.2-3.6ZM10 15.1V8.9l5.8 3.1-5.8 3.1Z"
      />
    </svg>
  );
}

export function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path
        fill="currentColor"
        d="M7.5 2h9C19.1 2 22 4.9 22 8.5v7c0 3.6-2.9 6.5-6.5 6.5h-9C3.9 22 1 19.1 1 15.5v-7C1 4.9 3.9 2 7.5 2Zm9 2H7.5C5 4 3 6 3 8.5v7C3 18 5 20 7.5 20h9c2.5 0 4.5-2 4.5-4.5v-7C21 6 19 4 16.5 4Zm-4.5 2.5A5.5 5.5 0 1 1 6.5 12 5.51 5.51 0 0 1 12 6.5Zm0 2A3.5 3.5 0 1 0 15.5 12 3.5 3.5 0 0 0 12 8.5ZM18 5.4a1.1 1.1 0 1 1-1.1 1.1A1.1 1.1 0 0 1 18 5.4Z"
      />
    </svg>
  );
}

export default SocialButtonBase;
