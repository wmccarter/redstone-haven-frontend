'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const HERO_VIDEO = {
  primary: '/videos/hero-main.mp4',
  fallbackImage: '/hero-mars-v2.jpg',
};

export default function HomeHero() {
  const [showVideo, setShowVideo] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hasDispatchedHeroEndRef = useRef(false);

  const dispatchHeroVideoEnded = () => {
    if (hasDispatchedHeroEndRef.current) {
      return;
    }

    hasDispatchedHeroEndRef.current = true;
    window.dispatchEvent(new CustomEvent('hero-video-ended'));
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    video.muted = true;
    const playPromise = video.play();
    if (playPromise) {
      void playPromise.catch(() => {
        // Browser blocked autoplay with audio; fall back to muted autoplay.
        video.muted = true;
        setIsMuted(true);
        void video.play().catch(() => setShowVideo(false));
      });
    }
  }, []);

  const handleToggleMute = () => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);

    if (video.paused) {
      void video.play().catch(() => setShowVideo(false));
    }
  };

  return (
    <section className="relative rounded border border-[#E67E22]/20 bg-slate-950/60 p-1 overflow-hidden group shadow-[0_0_30px_rgba(230,126,34,0.03)] transition-all duration-300 hover:border-[#E67E22]/40">
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#E67E22] z-20" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#E67E22] z-20" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#E67E22] z-20" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#E67E22] z-20" />
      <div className="absolute inset-x-0 h-0.5 bg-[#E67E22]/50 shadow-[0_0_8px_#E67E22] pointer-events-none z-20 animate-scanline" />

      <div className="relative h-96 md:h-[500px] w-full rounded overflow-hidden flex flex-col justify-end p-8 md:p-12">
        <div className="absolute inset-0 z-0 bg-slate-950">
          {showVideo ? (
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover object-center"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              poster={HERO_VIDEO.fallbackImage}
              onEnded={dispatchHeroVideoEnded}
              onTimeUpdate={() => {
                const video = videoRef.current;
                if (!video || !Number.isFinite(video.duration)) {
                  return;
                }

                if (video.currentTime >= video.duration - 0.2) {
                  dispatchHeroVideoEnded();
                }
              }}
              onLoadedData={() => {
                const video = videoRef.current;
                if (!video) {
                  return;
                }

                video.muted = isMuted;
                void video.play().catch(() => {
                  video.muted = true;
                  setIsMuted(true);
                  void video.play().catch(() => setShowVideo(false));
                });
              }}
              onError={() => setShowVideo(false)}
            >
              <source src={HERO_VIDEO.primary} type="video/mp4" />
            </video>
          ) : null}

          {showVideo ? (
            <button
              type="button"
              onClick={handleToggleMute}
              className="absolute right-4 top-4 z-30 rounded border border-[#E67E22]/70 bg-slate-950/80 px-3 py-2 text-[11px] font-bold uppercase tracking-widest text-[#E67E22] hover:bg-slate-900"
            >
              {isMuted ? 'Hero Audio: Off' : 'Hero Audio: On'}
            </button>
          ) : null}

          <Image
            src={HERO_VIDEO.fallbackImage}
            alt="Frontier Exploration Target"
            width={1200}
            height={420}
            className={`h-full w-full object-cover object-center transition-opacity duration-500 ${showVideo ? 'opacity-0' : 'opacity-100'}`}
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent z-10 pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white uppercase leading-none selection:bg-[#E67E22]/30">
            EMBARK ON <br />THE FRONTIER.
          </h2>
          <p className="text-xs md:text-sm text-slate-200 font-sans tracking-wide max-w-lg leading-relaxed shadow-sm">
            Welcome to Redstone Haven LLC. We build resilient infrastructure for harsh environments,
            high-noise operations, and mission-critical uptime.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <Link href="/secure-portal" className="inline-flex items-center space-x-2 bg-[#E67E22] hover:bg-[#d35400] text-white px-5 py-3 rounded text-xs font-bold uppercase tracking-widest transition-all duration-150 shadow-[0_4px_15px_rgba(230,126,34,0.3)] active:scale-95">
              <span>[ INITIATE MISSION ]</span>
              <span className="text-sm">↗</span>
            </Link>
            <Link href="/mission-briefing" className="inline-flex items-center space-x-2 border border-slate-700 hover:border-[#E67E22]/60 text-slate-100 hover:text-white px-5 py-3 rounded text-xs font-bold uppercase tracking-widest transition-all duration-150 bg-slate-950/40">
              <span>[ MISSION BRIEFING ]</span>
              <span className="text-sm">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
