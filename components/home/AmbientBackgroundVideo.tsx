'use client';

import { useEffect, useState } from 'react';

interface AmbientBackgroundVideoProps {
  src: string;
}

export default function AmbientBackgroundVideo({ src }: AmbientBackgroundVideoProps) {
  const [showVideo, setShowVideo] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setShowVideo(false);
    }
  }, []);

  if (!showVideo) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <video
        className="h-full w-full object-cover object-center opacity-25"
        autoPlay
        muted
        playsInline
        loop
        preload="metadata"
        onError={() => setShowVideo(false)}
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[#020617]/70" />
    </div>
  );
}
