import Link from 'next/link';
import SectionPageLayout from '../../components/layout/SectionPageLayout';

const NARRATIVE_EXPECTATIONS =
  'Expect a single command center for your survival-book universe: chapter rollouts, social channel access, RF operations tools, and embedded web-series episodes as the story world expands.';

const CHANNELS = [
  {
    label: 'YouTube',
    href: 'https://youtube.com/@redstonehavenllc?si=vkGle1KZKAPjlYBv',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/redstonehavenllc?igsh=NTc4MTIwNjQ2YQ%3D%3D&utm_source=qr',
  },
];

const VIDEO_SLOTS = [
  {
    title: 'Episode 01 // Collapse Protocol',
    src: '/videos/hero-main.mp4',
  },
  {
    title: 'Episode 02 // Orbital Debris Window',
    src: '/videos/mars-orbit-intro.mp4',
  },
  {
    title: 'Episode 03 // Station Interior Log',
    src: '/videos/station-interior-load.mp4',
  },
];

export default function NarrativeHubPage() {
  return (
    <SectionPageLayout
      title="Narrative HUB"
      subtitle="Story-world command center for media transmissions, survival systems, and operational channels"
    >
      <div className="space-y-6">
        <section className="rounded-2xl border border-slate-700/70 bg-slate-950/90 p-6 shadow-[0_16px_36px_rgba(0,0,0,0.28)]">
          <div className="border-b border-slate-800/80 pb-4">
            <p className="text-[10px] uppercase tracking-[0.35em] text-slate-500">Summary</p>
            <h2 className="mt-2 text-2xl font-bold uppercase tracking-[0.24em] text-slate-100">What to Expect</h2>
            <p className="mt-3 max-w-4xl text-sm leading-relaxed text-slate-300">{NARRATIVE_EXPECTATIONS}</p>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            <article className="rounded-xl border border-slate-800/80 bg-slate-900/65 p-4">
              <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500">Book Briefing</p>
              <h3 className="mt-2 text-sm font-bold uppercase tracking-[0.2em] text-slate-100">Restarting Civilization Survival Book</h3>
              <p className="mt-2 text-sm text-slate-300">Publishing hub for chapter drops, lore references, and companion survival frameworks.</p>
              <div className="mt-3 rounded-lg border border-dashed border-slate-700/80 bg-slate-950/60 px-3 py-2 text-xs text-slate-400">
                Book shelf module staging here.
              </div>
            </article>

            <article className="rounded-xl border border-slate-800/80 bg-slate-900/65 p-4">
              <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500">Channel Array</p>
              <h3 className="mt-2 text-sm font-bold uppercase tracking-[0.2em] text-slate-100">Social Media Links</h3>
              <div className="mt-3 space-y-2">
                {CHANNELS.map((channel) => (
                  <a
                    key={channel.label}
                    href={channel.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="block rounded-lg border border-slate-700/80 bg-slate-950/60 px-3 py-2 text-sm text-slate-200 transition-colors hover:border-cyan-300/50"
                  >
                    {channel.label}
                  </a>
                ))}
              </div>
            </article>

            <article className="rounded-xl border border-slate-800/80 bg-slate-900/65 p-4">
              <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500">Radio Stack</p>
              <h3 className="mt-2 text-sm font-bold uppercase tracking-[0.2em] text-slate-100">RF Operations</h3>
              <div className="mt-3 space-y-2">
                <Link
                  href="/amateur-radio-operations"
                  className="block rounded-lg border border-slate-700/80 bg-slate-950/60 px-3 py-2 text-sm text-slate-200 transition-colors hover:border-cyan-300/50"
                >
                  Amateur Radio Operations
                </Link>
                <Link
                  href="/amateur-radio-operations/rf-lab"
                  className="block rounded-lg border border-slate-700/80 bg-slate-950/60 px-3 py-2 text-sm text-slate-200 transition-colors hover:border-cyan-300/50"
                >
                  RF Lab Signal Hunt Simulator
                </Link>
              </div>
            </article>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-700/70 bg-slate-950/90 p-6 shadow-[0_16px_36px_rgba(0,0,0,0.28)]">
          <div className="border-b border-slate-800/80 pb-4">
            <p className="text-[10px] uppercase tracking-[0.35em] text-slate-500">Embedded Matrix</p>
            <h3 className="mt-2 text-xl font-bold uppercase tracking-[0.24em] text-slate-100">Web Series Video Grid</h3>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {VIDEO_SLOTS.map((slot) => (
              <article key={slot.title} className="rounded-xl border border-slate-800/80 bg-slate-900/65 p-3">
                <video
                  className="h-44 w-full rounded-lg object-cover"
                  controls
                  preload="metadata"
                >
                  <source src={slot.src} type="video/mp4" />
                </video>
                <p className="mt-3 text-sm font-bold uppercase tracking-[0.18em] text-slate-100">{slot.title}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </SectionPageLayout>
  );
}
