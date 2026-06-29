import Image from 'next/image';
import Link from 'next/link';
import type { FeatureCardData } from './data';

interface FeatureGridProps {
  cards: FeatureCardData[];
}

type FeatureIcon = 'hab' | 'satellite' | 'cart';

const ICON_IMAGE_BY_TYPE: Record<FeatureIcon, { src: string; alt: string }> = {
  hab: {
    src: '/drophab-button.PNG',
    alt: 'Drop Hab Matrix icon',
  },
  satellite: {
    src: '/media-button.PNG',
    alt: 'Media Transmissions icon',
  },
  cart: {
    src: '/supplychain-button.png',
    alt: 'Supply Chain Manifest icon',
  },
};

function FeatureCard({ href, icon }: { href?: string; icon: FeatureIcon }) {
  const iconAsset = ICON_IMAGE_BY_TYPE[icon];
  const haloClass =
    icon === 'hab'
      ? 'bg-sky-300/24 shadow-[0_0_52px_rgba(125,211,252,0.55),0_0_95px_rgba(56,189,248,0.38)]'
      : icon === 'satellite'
        ? 'bg-sky-300/22 shadow-[0_0_48px_rgba(125,211,252,0.5),0_0_90px_rgba(56,189,248,0.35)]'
        : 'bg-sky-300/22 shadow-[0_0_48px_rgba(125,211,252,0.5),0_0_90px_rgba(56,189,248,0.35)]';

  const cardContent = (
    <>
      <div className="pointer-events-none absolute inset-0 rounded-[14px] border border-white/5" />
      <div className="pointer-events-none absolute left-3 top-3 h-2.5 w-2.5 rounded-full border border-white/20 bg-white/5 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]" />
      <div className="pointer-events-none absolute right-3 top-3 h-2.5 w-2.5 rounded-full border border-white/20 bg-white/5 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]" />
      <div className="pointer-events-none absolute left-3 bottom-3 h-2.5 w-2.5 rounded-full border border-white/20 bg-white/5 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]" />
      <div className="pointer-events-none absolute right-3 bottom-3 h-2.5 w-2.5 rounded-full border border-white/20 bg-white/5 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]" />

      <div className="pointer-events-none absolute left-0 top-1/2 h-28 w-1 -translate-y-1/2 rounded-r bg-gradient-to-b from-emerald-300/0 via-emerald-300/70 to-emerald-300/0 shadow-[0_0_12px_rgba(74,222,128,0.35)]" />
      <div className="pointer-events-none absolute right-0 top-1/2 h-28 w-1 -translate-y-1/2 rounded-l bg-gradient-to-b from-sky-300/0 via-sky-300/70 to-sky-300/0 shadow-[0_0_12px_rgba(125,211,252,0.35)]" />
      <div className="pointer-events-none absolute inset-x-8 top-4 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="flex h-full items-center justify-center">
        <div className="relative flex h-full w-full items-center justify-center p-8">
          <div className={`absolute h-36 w-36 rounded-full blur-2xl opacity-80 transition-all duration-500 ease-out group-hover/card:scale-[1.35] group-hover/card:opacity-100 ${haloClass}`} />
          <div className="relative h-[13.2rem] w-[13.2rem] transition-transform duration-500 ease-out group-hover/card:-translate-y-2 group-hover/card:scale-110">
            <Image
              src={iconAsset.src}
              alt={iconAsset.alt}
              fill
              sizes="176px"
              className="object-contain drop-shadow-[0_0_18px_rgba(125,211,252,0.62)]"
            />
          </div>
        </div>
      </div>
    </>
  );

  const baseClassName = 'relative aspect-square overflow-hidden rounded-[12px] border border-slate-500/35 bg-[#11161d] transform-gpu transition-all duration-500 ease-out hover:border-slate-300/60 hover:shadow-[0_18px_45px_rgba(0,0,0,0.45)] group/card';

  if (href) {
    return (
      <Link href={href} className={baseClassName}>
        {cardContent}
      </Link>
    );
  }

  return <article className={baseClassName}>{cardContent}</article>;
}

export default function FeatureGrid({ cards }: FeatureGridProps) {
  return (
    <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card) => (
        <FeatureCard
          key={card.ref}
          href={card.href}
          icon={card.icon as FeatureIcon}
        />
      ))}
    </div>
  );
}
