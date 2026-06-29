import Link from 'next/link';
import HoverHint from './HoverHint';
import type { QuickRoute } from './data';

interface QuickRouteGridProps {
  routes: QuickRoute[];
}

export default function QuickRouteGrid({ routes }: QuickRouteGridProps) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {routes.map((route) => {
        const isExternal = route.href.startsWith('http://') || route.href.startsWith('https://');

        if (isExternal) {
          return (
            <a
              key={route.href}
              href={route.href}
              target="_blank"
              rel="noreferrer noopener"
              className="group relative rounded border border-slate-800/80 bg-slate-950/50 px-4 py-4 hover:border-[#E67E22]/40 transition-colors"
            >
              <p className="text-[10px] tracking-widest text-slate-500 uppercase">{route.label}</p>
              <p className="text-sm font-bold text-slate-100 mt-1">{route.title}</p>
              {route.hoverText ? <HoverHint text={route.hoverText} className="left-1/2 top-full mt-2 w-max max-w-[18rem] -translate-x-1/2 -translate-y-1 text-center" /> : null}
            </a>
          );
        }

        return (
          <Link
            key={route.href}
            href={route.href}
            className="group relative rounded border border-slate-800/80 bg-slate-950/50 px-4 py-4 hover:border-[#E67E22]/40 transition-colors"
          >
            <p className="text-[10px] tracking-widest text-slate-500 uppercase">{route.label}</p>
            <p className="text-sm font-bold text-slate-100 mt-1">{route.title}</p>
            {route.hoverText ? <HoverHint text={route.hoverText} className="left-1/2 top-full mt-2 w-max max-w-[18rem] -translate-x-1/2 -translate-y-1 text-center" /> : null}
          </Link>
        );
      })}
    </section>
  );
}
