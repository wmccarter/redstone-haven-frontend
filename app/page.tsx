import { Suspense } from 'react';
import HomeFooter from '../components/home/HomeFooter';
import HomeHeader from '../components/home/HomeHeader';
import HomeHero from '../components/home/HomeHero';
import AmbientBackgroundVideo from '../components/home/AmbientBackgroundVideo';
import AmbientAudioControl from '../components/home/AmbientAudioControl';
import ExitIntentOffer from '../components/home/ExitIntentOffer';
import TelemetryTicker from '../components/home/TelemetryTicker';
import QuickRouteGrid from '../components/home/QuickRouteGrid';
import FeatureGrid from '../components/home/FeatureGrid';
import MissionProgressCard from '../components/home/MissionProgressCard';
import { FEATURE_CARDS, MISSION_METRICS, QUICK_ROUTES } from '../components/home/data';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 relative overflow-x-hidden font-mono tracking-wide">
      <AmbientBackgroundVideo src="/videos/ambient-background-loop.mp4" />
      <AmbientAudioControl src="/audio/ambient-loop.mp3" startDelayMs={30000} />
      <Suspense fallback={null}>
        <ExitIntentOffer />
      </Suspense>
      
      {/* Background Matrix Grid - Subtle dark slate indicator lines */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900/30 via-[#020617] to-[#020617] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b08_1px,transparent_1px),linear-gradient(to_bottom,#1e293b08_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0" />

      <HomeHeader />
      <TelemetryTicker />

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8 space-y-8">
        
        <HomeHero />
        <QuickRouteGrid routes={QUICK_ROUTES} />

        {/* ----------------- INTERFACE CARD MATRIX ----------------- */}
        <section className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <FeatureGrid cards={FEATURE_CARDS} />
          <MissionProgressCard metrics={MISSION_METRICS} />
        </section>
      </main>
      <HomeFooter />

    </div>
  );
}