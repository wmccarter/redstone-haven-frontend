'use client';

import { useEffect, useRef, useState } from 'react';

interface AmbientAudioControlProps {
  src: string;
  startDelayMs?: number;
}

export default function AmbientAudioControl({ src, startDelayMs = 30000 }: AmbientAudioControlProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const delayTimerRef = useRef<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    audio.volume = 0.165;

    const onHeroVideoEnded = () => {
      if (delayTimerRef.current) {
        window.clearTimeout(delayTimerRef.current);
      }

      delayTimerRef.current = window.setTimeout(() => {
        void audio.play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }, startDelayMs);
    };

    window.addEventListener('hero-video-ended', onHeroVideoEnded);

    return () => {
      window.removeEventListener('hero-video-ended', onHeroVideoEnded);
      if (delayTimerRef.current) {
        window.clearTimeout(delayTimerRef.current);
      }
    };
  }, [startDelayMs]);

  const toggleAudio = async () => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    if (audio.paused) {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
      return;
    }

    audio.pause();
    setIsPlaying(false);
  };

  if (!isAvailable) {
    return null;
  }

  return (
    <>
      <audio
        ref={audioRef}
        loop
        preload="auto"
        onError={() => setIsAvailable(false)}
      >
        <source src={src} type="audio/mpeg" />
      </audio>

      <button
        type="button"
        onClick={toggleAudio}
        className="fixed bottom-4 right-4 z-40 rounded border border-[#E67E22]/70 bg-slate-950/85 px-3 py-2 text-[11px] font-bold uppercase tracking-widest text-[#E67E22] hover:bg-slate-900"
      >
        {isPlaying ? 'Ambient Audio: On' : 'Ambient Audio: Off (Tap)'}
      </button>
    </>
  );
}
