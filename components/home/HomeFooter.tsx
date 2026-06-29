import Link from 'next/link';
import SocialLinkButton, { InstagramIcon, YouTubeIcon } from './SocialLinkButton';

export default function HomeFooter() {
  return (
    <footer className="relative z-10 max-w-7xl mx-auto px-6 mt-12 py-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500">
      <div className="flex space-x-4 mb-3 sm:mb-0">
        <Link href="/faq" className="hover:text-slate-400 transition-colors">FREQUENTLY ASKED QUESTIONS</Link>
        <span>•</span>
        <Link href="/privacy" className="hover:text-slate-400 transition-colors">PRIVACY</Link>
        <span>•</span>
        <Link href="/contact" className="hover:text-slate-400 transition-colors">CONTACT</Link>
        <span>•</span>
        <span className="text-slate-700">SYSTEM V4.2</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="bg-slate-950/90 border border-slate-800/60 px-4 py-1.5 rounded-full flex items-center space-x-2">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-slate-400 text-[10px] tracking-wider uppercase">SYSTEM HEALTHY</span>
        </div>
        <div className="bg-slate-950/90 border border-slate-800/60 px-3 py-1.5 rounded-full flex items-center gap-2 text-[10px] tracking-wider uppercase">
          <span className="text-slate-500">FOLLOW</span>
          <SocialLinkButton href="https://youtube.com/@redstonehavenllc?si=vkGle1KZKAPjlYBv" label="YouTube" icon={<YouTubeIcon />} compact />
          <SocialLinkButton href="https://www.instagram.com/redstonehavenllc?igsh=NTc4MTIwNjQ2YQ%3D%3D&utm_source=qr" label="Instagram" icon={<InstagramIcon />} compact />
        </div>
      </div>
    </footer>
  );
}
