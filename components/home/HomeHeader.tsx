import Image from 'next/image';
import Link from 'next/link';
import HoverHint from './HoverHint';
import SocialLinkButton, { InstagramIcon, YouTubeIcon } from './SocialLinkButton';

const ON_DOMAIN_STORE_HREF = '/store';

export default function HomeHeader() {
  return (
    <header className="relative z-10 max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between border-b border-slate-800/60 backdrop-blur-sm bg-[#020617]/40">
      <Link href={ON_DOMAIN_STORE_HREF} aria-label="Redstone Haven store" className="relative flex items-center space-x-3 mb-4 md:mb-0 group">
        <div className="relative mt-10 w-20 h-20 shrink-0 transition-all duration-300 group-hover:scale-[1.25]">
          <Image src="/logo_v2.jpg" alt="Redstone Haven Logo" width={80} height={80} className="object-contain transition-all duration-300 group-hover:drop-shadow-[0_0_18px_rgba(110,231,255,0.72)]" priority />
        </div>
        <div>
          <span className="text-base font-bold tracking-widest text-white block transition-colors group-hover:text-[#E67E22]">REDSTONE HAVEN</span>
          <span className="text-[10px] block tracking-widest text-slate-400 -mt-1 uppercase">Redstone Haven Systems Store</span>
        </div>
        <HoverHint text="Let's go shopping" className="right-full top-1/2 mr-3 w-max max-w-[16rem] -translate-y-1/2 -translate-x-1 text-center" />
      </Link>

      <nav className="flex flex-wrap items-center justify-center gap-1 text-[11px] text-slate-400">
        <span className="text-slate-600">[</span>
        <Link href="/" className="text-[#E67E22] hover:text-[#d35400] px-2 font-bold transition-colors">HOME</Link>
        <span className="text-slate-600">|</span>
        <Link href="/?offer=coupon" className="px-2 text-red-300 transition-colors hover:text-red-100 animate-pulse">COUPONS</Link>
        <span className="text-slate-600">|</span>
        <Link href={ON_DOMAIN_STORE_HREF} className="hover:text-slate-100 px-2 transition-colors">REDSTONE HAVEN SYSTEMS STORE</Link>
        <span className="text-slate-600">|</span>
        <Link href="/amateur-radio-operations" className="hover:text-slate-100 px-2 transition-colors">AMATEUR RADIO OPERATIONS</Link>
        <span className="text-slate-600">|</span>
        <Link href="/about-us" className="hover:text-slate-100 px-2 transition-colors">ABOUT US</Link>
        <span className="text-slate-600">|</span>
        <SocialLinkButton href="https://youtube.com/@redstonehavenllc?si=vkGle1KZKAPjlYBv" label="YouTube" icon={<YouTubeIcon />} compact className="ml-1" />
        <SocialLinkButton href="https://www.instagram.com/redstonehavenllc?igsh=NTc4MTIwNjQ2YQ%3D%3D&utm_source=qr" label="Instagram" icon={<InstagramIcon />} compact />
        <span className="text-slate-600">]</span>
      </nav>
    </header>
  );
}
