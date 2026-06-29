'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState, type DragEvent } from 'react';
import SectionPageLayout from '../../components/layout/SectionPageLayout';

type PortalState = 'idle' | 'arming' | 'packetizing' | 'encrypting' | 'uplink' | 'complete';

type GateStepId = 'power' | 'guidance' | 'encryption' | 'uplink';
type ContentPageId = 'mission-archives' | 'private-downloads' | 'partner-access' | 'early-access';

type PayloadFile = {
  name: string;
  size: number;
  type: string;
};

type GateStep = {
  id: GateStepId;
  label: string;
  hint: string;
  boxLabel: string;
  route: string;
};

type AccessPage = {
  id: ContentPageId;
  eyebrow: string;
  title: string;
  summary: string;
  narrative: string;
  metrics: Array<{
    label: string;
    value: string;
  }>;
  cues: string[];
  cta: string;
  route: string;
};

type IntroBeat = {
  label: string;
  detail: string;
};

const SEQUENCE_STEPS = [
  'Telemetry burst captured. Packet lattice is spooling for launch.',
  'Encryption core engaged. Payload shielding is climbing.',
  'Channel aperture narrowing. Guidance rails are locking.',
  'Uplink established. Secure relay is now live.',
];

const INTRO_BEATS: IntroBeat[] = [
  {
    label: 'AUTH LINK',
    detail: 'Validating mission token and scanning the secure control lattice.',
  },
  {
    label: 'SCANLINE SYNC',
    detail: 'Aligning the faux-auth visual sweep with the incoming telemetry stream.',
  },
  {
    label: 'PORTAL SEAL',
    detail: 'Unsealing the protected console and loading the orbital session.',
  },
];

const GATE_STEPS: GateStep[] = [
  {
    id: 'power',
    label: 'Telemetry Stack',
    boxLabel: 'Telemetry Stack',
    hint: 'Start with the Telemetry Stack box. It powers the rest of the sequence.',
    route: '/secure-portal/modules/telemetry-stack',
  },
  {
    id: 'guidance',
    label: 'System Telemetry',
    boxLabel: 'System Telemetry',
    hint: 'Next, click the System Telemetry box after Telemetry Stack is active.',
    route: '/secure-portal/modules/system-telemetry',
  },
  {
    id: 'encryption',
    label: 'Channel Readiness',
    boxLabel: 'Channel Readiness',
    hint: 'Then move to Channel Readiness. That is the third module in the chain.',
    route: '/secure-portal/modules/channel-readiness',
  },
  {
    id: 'uplink',
    label: 'Protected Access',
    boxLabel: 'Protected Access',
    hint: 'Finish on Protected Access to release the uplink trigger.',
    route: '/secure-portal/modules/protected-access',
  },
];

const ACCESS_PAGES: AccessPage[] = [
  {
    id: 'mission-archives',
    eyebrow: 'Archive Console',
    title: 'Mission Archives',
    summary: 'Internal logs, build records, transmission notes, and mission history for operational review.',
    narrative:
      'A hardened archive page for mission traces, launch notes, and recovered telemetry that operators can inspect without leaving the secure console.',
    metrics: [
      { label: 'Records', value: '12.4K' },
      { label: 'Retention', value: '99.98%' },
      { label: 'Revision State', value: 'Signed' },
      { label: 'Access Path', value: 'Read-Only' },
    ],
    cues: ['Launch audit trails', 'Recovery snapshots', 'Operator transcripts'],
    cta: 'Open mission archive feed',
    route: '/secure-portal/modules/mission-archives',
  },
  {
    id: 'private-downloads',
    eyebrow: 'Asset Depot',
    title: 'Private Downloads',
    summary: 'Product sheets, media kits, spec docs, logos, and reference files intended for secure access.',
    narrative:
      'A secure asset depot designed like a mini-page, with guarded downloads and quick-read content for verified operators.',
    metrics: [
      { label: 'Bundles', value: '28' },
      { label: 'Formats', value: 'PDF / PNG / ZIP' },
      { label: 'Checksum', value: 'Verified' },
      { label: 'Route', value: 'Encrypted' },
    ],
    cues: ['Spec sheets', 'Brand assets', 'Reference packets'],
    cta: 'Inspect download stack',
    route: '/secure-portal/modules/private-downloads',
  },
  {
    id: 'partner-access',
    eyebrow: 'Partner Channel',
    title: 'Partner Access',
    summary: 'Collaboration folders, vendor resources, and coordination files for trusted external operators.',
    narrative:
      'A partner-facing mini-page for secure coordination, vendor handoffs, and mission-critical collaboration routes.',
    metrics: [
      { label: 'Active Lanes', value: '07' },
      { label: 'Clearance', value: 'Trusted' },
      { label: 'Latency', value: 'Low' },
      { label: 'Relay', value: 'Live' },
    ],
    cues: ['Vendor coordination', 'Shared logistics', 'Handshake packets'],
    cta: 'Open partner relay',
    route: '/secure-portal/modules/partner-access',
  },
  {
    id: 'early-access',
    eyebrow: 'Preview Bay',
    title: 'Early Access',
    summary: 'Pre-release previews, experimental modules, and upcoming mission content under controlled release.',
    narrative:
      'A preview mini-page for experimental modules, staged rollouts, and future-facing content kept behind the secure gate.',
    metrics: [
      { label: 'Builds', value: 'Alpha' },
      { label: 'Release Window', value: 'Staged' },
      { label: 'Signals', value: 'Experimental' },
      { label: 'Review', value: 'Operator Only' },
    ],
    cues: ['Pre-release previews', 'Experimental modules', 'Scheduled reveals'],
    cta: 'Inspect preview bay',
    route: '/secure-portal/modules/early-access',
  },
];

export default function SecurePortalPage() {
  const [portalState, setPortalState] = useState<PortalState>('idle');
  const [sequenceLine, setSequenceLine] = useState('Channel standing by.');
  const [gateIndex, setGateIndex] = useState(0);
  const [gateStatus, setGateStatus] = useState('Control stack armed. Begin with Telemetry Stack.');
  const [gateComplete, setGateComplete] = useState(false);
  const [missionId, setMissionId] = useState('RSH-');
  const [subject, setSubject] = useState('');
  const [priority, setPriority] = useState('High');
  const [destination, setDestination] = useState('Orbital Asset');
  const [notes, setNotes] = useState('');
  const [transmissionLabel, setTransmissionLabel] = useState('');
  const [introVisible, setIntroVisible] = useState(true);
  const [introClosing, setIntroClosing] = useState(false);
  const [introBeatIndex, setIntroBeatIndex] = useState(0);
  const [payloadFiles, setPayloadFiles] = useState<PayloadFile[]>([]);
  const [activePageId, setActivePageId] = useState<ContentPageId>(ACCESS_PAGES[0].id);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const canRevealContent = portalState === 'complete';
  const activeGateStep = GATE_STEPS[gateIndex];
  const selectedPage = ACCESS_PAGES.find((page) => page.id === activePageId) ?? ACCESS_PAGES[0];
  const payloadSummary = payloadFiles.length === 0 ? 'No payload files staged.' : `${payloadFiles.length} file${payloadFiles.length === 1 ? '' : 's'} staged.`;

  const telemetryRows = useMemo(
    () => [
      { label: 'Channel Status', value: portalState === 'idle' ? 'Armed / Waiting' : portalState === 'complete' ? 'Green / Confirmed' : 'Handshake Active' },
      { label: 'Telemetry Link', value: portalState === 'complete' ? 'Stable / Hot' : 'Awaiting Uplink' },
      { label: 'Encryption', value: 'AES-256 / Mission Grade' },
      { label: 'Payload Load', value: payloadFiles.length ? `${payloadFiles.length} attachment${payloadFiles.length === 1 ? '' : 's'}` : 'Idle' },
      { label: 'Node Target', value: destination },
    ],
    [destination, payloadFiles.length, portalState],
  );

  useEffect(() => {
    const timers = [
      window.setTimeout(() => setIntroBeatIndex(1), 900),
      window.setTimeout(() => setIntroBeatIndex(2), 2100),
      window.setTimeout(() => {
        setIntroClosing(true);
        window.setTimeout(() => setIntroVisible(false), 700);
      }, 4200),
    ];

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  const dismissIntro = () => {
    if (!introVisible || introClosing) {
      return;
    }

    setIntroClosing(true);
    window.setTimeout(() => setIntroVisible(false), 700);
  };

  const stagePayloadFiles = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) {
      return;
    }

    const files = Array.from(fileList).map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type || 'application/octet-stream',
    }));

    setPayloadFiles(files);
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const clearPayloadFiles = () => {
    setPayloadFiles([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const resetGate = (message: string) => {
    setGateIndex(0);
    setGateComplete(false);
    setGateStatus(message);
    setSequenceLine('Sequence aborted. Resetting control stack.');
    setPortalState('idle');
    setTransmissionLabel('');
  };

  const handleGateStep = (stepId: GateStepId) => {
    if (portalState !== 'idle') {
      return;
    }

    const expected = GATE_STEPS[gateIndex];

    if (!expected || stepId !== expected.id) {
      resetGate('Wrong order detected. Sequence reset to Telemetry Stack.');
      return;
    }

    const nextIndex = gateIndex + 1;

    if (nextIndex >= GATE_STEPS.length) {
      setGateIndex(nextIndex);
      setGateComplete(true);
      setGateStatus('Sequence confirmed. Initialize uplink is now unlocked.');
      setSequenceLine('Control stack authorized. Ready for transmission burst.');
      return;
    }

    setGateIndex(nextIndex);
    setGateStatus(GATE_STEPS[nextIndex].hint);
    setSequenceLine(`Step ${nextIndex} locked. ${GATE_STEPS[nextIndex].label} is now awaiting confirmation.`);
  };

  const handlePayloadDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    stagePayloadFiles(event.dataTransfer.files);
  };

  const handlePayloadDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const renderGateStamp = (index: number) => {
    const step = GATE_STEPS[index];
    const isActive = index === gateIndex && !gateComplete;
    const isComplete = index < gateIndex || gateComplete;

    return (
      <div className="absolute right-3 top-3 z-20 flex items-center gap-2">
        <button
          type="button"
          onClick={() => handleGateStep(step.id)}
          className={`rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.3em] transition-all duration-200 ${
            isComplete
              ? 'border-emerald-400/40 bg-emerald-400/10 text-emerald-200'
              : isActive
                ? 'border-cyan-300/60 bg-cyan-300/10 text-cyan-100 animate-telemetry-beat'
                : 'border-slate-600/70 bg-slate-950/80 text-slate-400 hover:border-slate-400/80 hover:text-slate-200'
          }`}
        >
          {step.boxLabel}
        </button>
        <Link
          href={step.route}
          className="rounded-full border border-slate-700/70 bg-slate-950/90 px-2 py-1 text-[9px] uppercase tracking-[0.28em] text-slate-300 transition-colors hover:border-cyan-300/60 hover:text-cyan-100"
        >
          Page
        </Link>
      </div>
    );
  };

  const runSequence = async () => {
    if (!gateComplete) {
      setSequenceLine('Lock the ordered control stack before uplink.');
      setGateStatus(activeGateStep.hint);
      return;
    }

    setPortalState('arming');
    setSequenceLine('Flight readiness confirmed. Commencing telemetry surge.');
    setTransmissionLabel('');

    const steps: Array<[PortalState, string, number]> = [
      ['packetizing', `01 / ${SEQUENCE_STEPS[0]}`, 1100],
      ['encrypting', `02 / ${SEQUENCE_STEPS[1]}`, 1200],
      ['uplink', `03 / ${SEQUENCE_STEPS[2]}`, 1300],
      ['complete', `04 / ${SEQUENCE_STEPS[3]}`, 900],
    ];

    for (const [state, label, delay] of steps) {
      setPortalState(state);
      setSequenceLine(label);
      await new Promise((resolve) => window.setTimeout(resolve, delay));
    }

    setTransmissionLabel(`${missionId || 'RSH-000'} / ${destination} / ${priority} / ${payloadSummary}`);
  };

  return (
    <SectionPageLayout
      title="Secure Transmission"
      subtitle="Mission Control uplink to orbital asset and protected server array"
    >
      {introVisible ? (
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-slate-950/96 px-4 transition-opacity duration-700 ${introClosing ? 'opacity-0' : 'opacity-100'}`}>
          <div className="absolute inset-0 overflow-hidden">
            <video
              className="h-full w-full object-cover object-center opacity-35"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster="/hero-mars-v2.jpg"
            >
              <source src="/videos/station-interior-load.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(125,211,252,0.16),transparent_32%),linear-gradient(180deg,rgba(2,6,23,0.26),rgba(2,6,23,0.96))]" />
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-cyan-300 to-transparent animate-intro-scanline" />
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0,rgba(148,163,184,0.08)_1px,transparent_2px)] bg-[size:100%_6px] opacity-30" />
          </div>

          <div className="relative z-10 w-full max-w-4xl">
            <div className="overflow-hidden rounded-[28px] border border-cyan-300/20 bg-slate-950/90 shadow-[0_30px_90px_rgba(0,0,0,0.55)] animate-panel-rise">
              <div className="flex items-center justify-between gap-4 border-b border-slate-800/80 px-5 py-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.45em] text-cyan-200/70">Faux Auth / Mission Entry</p>
                  <h2 className="mt-2 text-lg font-bold uppercase tracking-[0.3em] text-slate-100">Secure portal initializing</h2>
                </div>
                <button
                  type="button"
                  onClick={dismissIntro}
                  className="rounded-full border border-slate-700/80 bg-slate-900/80 px-3 py-2 text-[10px] uppercase tracking-[0.28em] text-slate-300 transition-colors hover:border-cyan-300/60 hover:text-cyan-100"
                >
                  Bypass
                </button>
              </div>

              <div className="grid gap-6 px-5 py-5 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="space-y-4">
                  <div className="rounded-2xl border border-slate-800/80 bg-slate-900/70 p-4">
                    <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.34em] text-slate-500">
                      <span>Auth Channel</span>
                      <span className="animate-telemetry-beat text-cyan-200">Live</span>
                    </div>
                    <div className="mt-3 flex items-center gap-3">
                      <div className="h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(125,211,252,0.9)] animate-pulse" />
                      <div>
                        <div className="text-lg font-bold uppercase tracking-[0.26em] text-slate-100">{INTRO_BEATS[introBeatIndex].label}</div>
                        <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-300">{INTRO_BEATS[introBeatIndex].detail}</p>
                      </div>
                    </div>
                    <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-800">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-emerald-300 to-[#E67E22] transition-all duration-700"
                        style={{ width: `${Math.min(((introBeatIndex + 1) / INTRO_BEATS.length) * 100, 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4">
                      <div className="text-[10px] uppercase tracking-[0.34em] text-slate-500">Scanline</div>
                      <div className="mt-2 text-sm text-slate-200 animate-telemetry-beat">Visual sweep synchronizing with control lattice.</div>
                    </div>
                    <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4">
                      <div className="text-[10px] uppercase tracking-[0.34em] text-slate-500">Handshake</div>
                      <div className="mt-2 text-sm text-slate-200 animate-telemetry-beat">Mission token accepted. Console will unseal automatically.</div>
                    </div>
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-2xl border border-cyan-300/20 bg-[linear-gradient(180deg,rgba(15,23,42,0.96),rgba(2,6,23,0.98))] p-5">
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.04)_0,rgba(255,255,255,0.00)_2px)] bg-[size:100%_8px] opacity-50 animate-scanline" />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                      <div className="text-[10px] uppercase tracking-[0.34em] text-slate-500">Auth Telemetry</div>
                      <div className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-2 py-1 text-[10px] uppercase tracking-[0.28em] text-cyan-200 animate-portal-flicker">
                        scanning
                      </div>
                    </div>
                    <div className="mt-4 space-y-3">
                      <div className="rounded-xl border border-slate-800/80 bg-slate-900/70 p-4">
                        <div className="text-[10px] uppercase tracking-[0.34em] text-slate-500">Phase</div>
                        <div className="mt-2 text-sm text-slate-100">{INTRO_BEATS[introBeatIndex].label}</div>
                      </div>
                      <div className="rounded-xl border border-slate-800/80 bg-slate-900/70 p-4">
                        <div className="text-[10px] uppercase tracking-[0.34em] text-slate-500">Signal</div>
                        <div className="mt-2 text-sm text-slate-200">{INTRO_BEATS[introBeatIndex].detail}</div>
                      </div>
                      <div className="rounded-xl border border-slate-800/80 bg-slate-900/70 p-4">
                        <div className="text-[10px] uppercase tracking-[0.34em] text-slate-500">Boot Window</div>
                        <div className="mt-2 text-sm text-slate-200">The secure control room is loading in layers. Stand by for reveal.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div className="relative space-y-6 overflow-hidden rounded-[28px] border border-slate-700/70 bg-[linear-gradient(180deg,rgba(15,23,42,0.86),rgba(2,6,23,0.96))] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(110,231,255,0.10),transparent_30%),radial-gradient(circle_at_top_right,rgba(230,126,34,0.12),transparent_28%),linear-gradient(to_right,rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.06)_1px,transparent_1px)] bg-[size:auto,auto,22px_22px,22px_22px] opacity-60" />
        <div className="pointer-events-none absolute inset-x-6 top-4 h-1 rounded-full bg-gradient-to-r from-emerald-400/0 via-emerald-300/80 to-cyan-300/0 animate-portal-flicker" />
        <div className="pointer-events-none absolute inset-y-10 left-0 w-1 bg-gradient-to-b from-emerald-400/20 via-emerald-300/80 to-emerald-400/20 shadow-[0_0_18px_rgba(74,222,128,0.45)] animate-portal-flicker" />
        <div className="pointer-events-none absolute inset-y-10 right-0 w-1 bg-gradient-to-b from-cyan-300/20 via-cyan-300/80 to-cyan-300/20 shadow-[0_0_18px_rgba(125,211,252,0.45)] animate-portal-flicker" />

        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <section className="relative overflow-hidden rounded-2xl border border-slate-700/70 bg-gradient-to-b from-slate-900/95 via-slate-950 to-slate-950 p-6 shadow-[0_16px_36px_rgba(0,0,0,0.35)] animate-panel-rise">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.06)_1px,transparent_1px)] bg-[size:22px_22px] opacity-40" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(110,231,255,0.08),transparent_36%),radial-gradient(circle_at_top_right,rgba(230,126,34,0.10),transparent_32%)]" />
            {renderGateStamp(0)}

            <div className="relative z-10 flex items-center justify-between gap-4 border-b border-slate-700/70 pb-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.35em] text-slate-500">Flight Readiness / System Telemetry</p>
                <h2 className="mt-2 text-2xl font-bold uppercase tracking-[0.22em] text-slate-100">Telemetry Uplink Console</h2>
              </div>
              <div className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.28em] text-emerald-300 animate-portal-flicker">
                {portalState === 'complete' ? 'Link Confirmed' : 'Channel Armed'}
              </div>
            </div>

            <div className="relative z-10 mt-6 rounded-2xl border border-slate-700/70 bg-slate-950/80 p-5 shadow-[inset_0_0_0_1px_rgba(148,163,184,0.06)]">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.34em] text-slate-500">Mission Routing Hints</p>
                  <h3 className="mt-1 text-sm font-bold uppercase tracking-[0.28em] text-slate-100">Click the named box sections in sequence to unlock uplink</h3>
                </div>
                <div className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-cyan-200 animate-portal-flicker">
                  Stage {Math.min(gateIndex + 1, GATE_STEPS.length)} / {GATE_STEPS.length}
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-slate-800/80 bg-slate-900/80 p-4">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.32em] text-slate-500">
                  <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(125,211,252,0.9)] animate-pulse" />
                  <span className="animate-telemetry-beat">Telemetry Hint</span>
                </div>
                <div className="mt-2 text-sm text-slate-200 animate-telemetry-beat">{gateStatus}</div>
                <div className="mt-2 text-[10px] uppercase tracking-[0.28em] text-slate-500">
                  Activation must happen in order to prevent shorting the connection. Current target: {activeGateStep?.boxLabel ?? 'Sequence complete'}
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-6 grid gap-4 md:grid-cols-2">
              <label className="group rounded-xl border border-slate-700/70 bg-slate-950/80 p-4 transition-colors hover:border-cyan-300/60 focus-within:border-cyan-300/80">
                <span className="mb-2 block text-[10px] uppercase tracking-[0.32em] text-slate-500">Transmission Subject</span>
                <input
                  value={subject}
                  onChange={(event) => setSubject(event.target.value)}
                  placeholder="Mission update / payload summary"
                  className="w-full border-0 bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-600"
                />
              </label>

              <label className="group rounded-xl border border-slate-700/70 bg-slate-950/80 p-4 transition-colors hover:border-cyan-300/60 focus-within:border-cyan-300/80">
                <span className="mb-2 block text-[10px] uppercase tracking-[0.32em] text-slate-500">Mission ID</span>
                <input
                  value={missionId}
                  onChange={(event) => setMissionId(event.target.value)}
                  placeholder="RSH-###"
                  className="w-full border-0 bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-600"
                />
              </label>

              <label className="group rounded-xl border border-slate-700/70 bg-slate-950/80 p-4 transition-colors hover:border-cyan-300/60 focus-within:border-cyan-300/80">
                <span className="mb-2 block text-[10px] uppercase tracking-[0.32em] text-slate-500">Clearance Level</span>
                <select
                  value={priority}
                  onChange={(event) => setPriority(event.target.value)}
                  className="w-full border-0 bg-transparent text-sm text-slate-100 outline-none"
                >
                  <option>High</option>
                  <option>Priority</option>
                  <option>Restricted</option>
                  <option>Partner</option>
                </select>
              </label>

              <label className="group rounded-xl border border-slate-700/70 bg-slate-950/80 p-4 transition-colors hover:border-cyan-300/60 focus-within:border-cyan-300/80">
                <span className="mb-2 block text-[10px] uppercase tracking-[0.32em] text-slate-500">Destination Node</span>
                <select
                  value={destination}
                  onChange={(event) => setDestination(event.target.value)}
                  className="w-full border-0 bg-transparent text-sm text-slate-100 outline-none"
                >
                  <option>Orbital Asset</option>
                  <option>Deep-Tech Server Array</option>
                  <option>Partner Relay</option>
                  <option>Archive Node</option>
                </select>
              </label>
            </div>

            <div
              className="relative z-10 mt-4 rounded-xl border border-slate-700/70 bg-slate-950/80 p-4 transition-colors hover:border-cyan-300/60"
              onDrop={handlePayloadDrop}
              onDragOver={handlePayloadDragOver}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                className="sr-only"
                onChange={(event) => stagePayloadFiles(event.target.files)}
              />
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-800/80 pb-4">
                <div>
                  <span className="block text-[10px] uppercase tracking-[0.32em] text-slate-500">Data Payload Module</span>
                  <p className="mt-2 max-w-2xl text-sm text-slate-300">Drop files or browse to stage mission cargo before uplink. The console keeps each attachment visible as part of the transmission bundle.</p>
                  <Link
                    href="/secure-portal/modules/data-payload"
                    className="mt-2 inline-flex rounded-full border border-slate-700/70 bg-slate-950/80 px-3 py-1 text-[9px] uppercase tracking-[0.28em] text-slate-300 transition-colors hover:border-cyan-300/60 hover:text-cyan-100"
                  >
                    Open payload module page
                  </Link>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={openFilePicker}
                    className="rounded-xl border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-cyan-100 transition-colors hover:border-cyan-300/60 hover:bg-cyan-300/15"
                  >
                    Browse Files
                  </button>
                  <button
                    type="button"
                    onClick={clearPayloadFiles}
                    className="rounded-xl border border-slate-700/70 bg-slate-900/70 px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-slate-300 transition-colors hover:border-slate-500 hover:text-slate-100"
                  >
                    Clear
                  </button>
                </div>
              </div>

              <div className="mt-4 grid gap-3 lg:grid-cols-[0.95fr_1.05fr]">
                <div className="rounded-xl border border-dashed border-slate-700/80 bg-slate-900/60 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.34em] text-slate-500">Staging Bay</div>
                      <div className="mt-2 text-sm text-slate-200">{payloadSummary}</div>
                    </div>
                    <div className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-1 text-[10px] uppercase tracking-[0.28em] text-emerald-300 animate-telemetry-beat">
                      {payloadFiles.length ? 'Attached' : 'Open'}
                    </div>
                  </div>
                  <div className="mt-4 text-xs uppercase tracking-[0.28em] text-slate-500">Drag files directly into this panel for rapid staging.</div>
                </div>

                <div className="space-y-2">
                  {payloadFiles.length ? (
                    payloadFiles.map((file) => (
                      <div key={`${file.name}-${file.size}`} className="flex items-center justify-between gap-4 rounded-xl border border-slate-800/80 bg-slate-900/70 px-3 py-3">
                        <div>
                          <div className="text-sm text-slate-100">{file.name}</div>
                          <div className="mt-1 text-[10px] uppercase tracking-[0.28em] text-slate-500">{file.type}</div>
                        </div>
                        <div className="font-mono text-xs text-slate-300">{(file.size / 1024).toFixed(1)} KB</div>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-xl border border-slate-800/80 bg-slate-900/70 px-3 py-4 text-sm text-slate-300">
                      No attachments staged yet. Use browse or drag files into the payload module.
                    </div>
                  )}
                </div>
              </div>

              <label className="mt-4 block rounded-xl border border-slate-700/70 bg-slate-950/80 p-4 transition-colors hover:border-cyan-300/60 focus-within:border-cyan-300/80">
                <span className="mb-2 block text-[10px] uppercase tracking-[0.32em] text-slate-500">Payload Notes</span>
                <textarea
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  rows={4}
                  placeholder="Attach transmission notes, payload summary, or mission context..."
                  className="w-full resize-none border-0 bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-600"
                />
              </label>
            </div>

            <div className="relative z-10 mt-4 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={runSequence}
                className={`inline-flex items-center gap-2 rounded-xl border px-5 py-3 text-xs font-bold uppercase tracking-[0.28em] transition-all ${gateComplete ? 'border-[#E67E22]/60 bg-[#E67E22]/15 text-[#f4b06a] hover:border-[#E67E22] hover:bg-[#E67E22]/25' : 'cursor-not-allowed border-slate-700/70 bg-slate-900/70 text-slate-500'}`}
                disabled={!gateComplete}
              >
                Initialize Uplink
              </button>
              <Link
                href="/secure-portal/modules/uplink-sequence"
                className="inline-flex items-center rounded-xl border border-slate-700/70 bg-slate-900/70 px-4 py-3 text-[10px] uppercase tracking-[0.28em] text-slate-300 transition-colors hover:border-cyan-300/60 hover:text-cyan-100"
              >
                Uplink module page
              </Link>
              <span className="text-[11px] uppercase tracking-[0.3em] text-slate-500">Status: {gateComplete ? sequenceLine : 'Ordered gate required to proceed.'}</span>
            </div>

            {portalState !== 'idle' ? (
              <div className="relative z-10 mt-5 rounded-xl border border-cyan-300/20 bg-cyan-300/5 p-4 animate-panel-rise">
                <div className="text-[10px] uppercase tracking-[0.32em] text-cyan-200/80">Transmission Status</div>
                <div className="mt-2 font-mono text-sm text-slate-100 animate-telemetry-beat">{sequenceLine}</div>
                <div className="mt-2 text-xs text-slate-400">
                  {subject || 'Mission payload ready'} · {priority} · {destination}
                </div>
                {transmissionLabel ? (
                  <div className="mt-2 text-[10px] uppercase tracking-[0.3em] text-emerald-300">{transmissionLabel}</div>
                ) : null}
              </div>
            ) : null}
          </section>

          <aside className="space-y-6">
            <section className="relative rounded-2xl border border-slate-700/70 bg-slate-950/90 p-5 shadow-[0_12px_30px_rgba(0,0,0,0.28)] animate-panel-rise">
              {renderGateStamp(1)}
              <div className="flex items-center justify-between border-b border-slate-700/70 pb-3">
                <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-200">System Telemetry</h3>
                <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-1 text-[10px] uppercase tracking-[0.28em] text-emerald-300 animate-telemetry-beat">Live</span>
              </div>

              <div className="mt-4 space-y-3">
                {telemetryRows.map((row) => (
                  <div key={row.label} className="flex items-center justify-between gap-4 rounded-lg border border-slate-800/80 bg-slate-900/60 px-3 py-2 text-xs">
                    <span className="uppercase tracking-[0.24em] text-slate-500">{row.label}</span>
                    <span className="font-mono text-slate-100">{row.value}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="relative rounded-2xl border border-slate-700/70 bg-slate-950/90 p-5 shadow-[0_12px_30px_rgba(0,0,0,0.28)] animate-panel-rise">
              {renderGateStamp(2)}
              <div className="flex items-center justify-between border-b border-slate-700/70 pb-3">
                <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-200">Channel Readiness</h3>
                <span className="text-[10px] uppercase tracking-[0.28em] text-slate-500">Payload Module</span>
              </div>

              <div className="mt-4 space-y-3">
                <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-4 transition-colors hover:border-cyan-300/60">
                  <div className="text-[10px] uppercase tracking-[0.32em] text-slate-500">Hover Response</div>
                  <div className="mt-2 text-sm text-slate-200">Input fields respond with telemetry borders and a mission-console feel.</div>
                </div>
                <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-4 transition-colors hover:border-cyan-300/60">
                  <div className="text-[10px] uppercase tracking-[0.32em] text-slate-500">Payload Module</div>
                  <div className="mt-2 text-sm text-slate-200">File uploads and attachments are staged like mission cargo before uplink.</div>
                </div>
                <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-4 transition-colors hover:border-cyan-300/60">
                  <div className="text-[10px] uppercase tracking-[0.32em] text-slate-500">Submit Sequence</div>
                  <div className="mt-2 text-sm text-slate-200">Packet lattice spool, key injection, aperture lock, secure relay confirmation.</div>
                </div>
              </div>
            </section>
          </aside>
        </div>

        <section className={`relative rounded-2xl border border-slate-700/70 bg-slate-950/90 p-6 shadow-[0_16px_36px_rgba(0,0,0,0.28)] transition-all duration-300 animate-panel-rise ${canRevealContent ? 'opacity-100' : 'opacity-95'}`}>
          {renderGateStamp(3)}
          <div className="flex items-center justify-between border-b border-slate-700/70 pb-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.35em] text-slate-500">Secure Access</p>
              <h3 className="mt-1 text-xl font-bold uppercase tracking-[0.24em] text-slate-100">Protected Mission Content</h3>
            </div>
            <div className="rounded-full border border-[#E67E22]/30 bg-[#E67E22]/10 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-[#f4b06a] animate-portal-flicker">
              {canRevealContent ? 'Access Granted' : 'Awaiting Uplink'}
            </div>
          </div>

          <div className="mt-5 grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-1">
              {ACCESS_PAGES.map((page) => {
                const isActive = selectedPage.id === page.id;

                const cardClass = `text-left rounded-xl border p-4 transition-all duration-300 ${canRevealContent ? isActive ? 'border-[#E67E22]/60 bg-[#E67E22]/10 shadow-[0_0_0_1px_rgba(230,126,34,0.18)]' : 'border-slate-700/70 bg-slate-900/70 hover:border-[#E67E22]/40 hover:bg-slate-900/90' : 'border-slate-800/80 bg-slate-900/35 opacity-70 cursor-not-allowed'}`;

                if (!canRevealContent) {
                  return (
                    <div key={page.id} className={cardClass}>
                      <div className="flex items-center justify-between gap-3">
                        <div className="text-[10px] uppercase tracking-[0.32em] text-slate-500">{page.eyebrow}</div>
                        <div className={`text-[10px] uppercase tracking-[0.28em] ${isActive ? 'text-[#f4b06a]' : 'text-slate-600'}`}>{isActive ? 'Open' : 'Mini-page'}</div>
                      </div>
                      <h4 className="mt-2 text-lg font-bold uppercase tracking-[0.18em] text-slate-100">{page.title}</h4>
                      <p className="mt-3 text-sm leading-relaxed text-slate-300">{page.summary}</p>
                    </div>
                  );
                }

                return (
                  <Link
                    key={page.id}
                    href={page.route}
                    onMouseEnter={() => setActivePageId(page.id)}
                    className={cardClass}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-[10px] uppercase tracking-[0.32em] text-slate-500">{page.eyebrow}</div>
                      <div className={`text-[10px] uppercase tracking-[0.28em] ${isActive ? 'text-[#f4b06a]' : 'text-slate-600'}`}>{isActive ? 'Open' : 'Mini-page'}</div>
                    </div>
                    <h4 className="mt-2 text-lg font-bold uppercase tracking-[0.18em] text-slate-100">{page.title}</h4>
                    <p className="mt-3 text-sm leading-relaxed text-slate-300">{page.summary}</p>
                  </Link>
                );
              })}
            </div>

            <article className={`relative overflow-hidden rounded-2xl border p-5 transition-all duration-300 ${canRevealContent ? 'border-slate-700/70 bg-slate-900/80' : 'border-slate-800/80 bg-slate-900/40 opacity-75'}`}>
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(230,126,34,0.12),transparent_28%),linear-gradient(to_bottom,rgba(148,163,184,0.04),transparent)]" />
              <div className="relative z-10">
                <div className="flex items-center justify-between gap-3 border-b border-slate-700/70 pb-3">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.34em] text-slate-500">Mini-Page</div>
                    <h4 className="mt-2 text-xl font-bold uppercase tracking-[0.2em] text-slate-100">{selectedPage.title}</h4>
                  </div>
                  <div className="rounded-full border border-[#E67E22]/30 bg-[#E67E22]/10 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-[#f4b06a] animate-telemetry-beat">
                    {canRevealContent ? 'Unlocked' : 'Locked'}
                  </div>
                </div>

                {canRevealContent ? (
                  <>
                    <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-300">{selectedPage.narrative}</p>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      {selectedPage.metrics.map((metric) => (
                        <div key={metric.label} className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-4">
                          <div className="text-[10px] uppercase tracking-[0.34em] text-slate-500">{metric.label}</div>
                          <div className="mt-2 text-sm font-mono text-slate-100">{metric.value}</div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 space-y-2">
                      {selectedPage.cues.map((cue) => (
                        <div key={cue} className="rounded-xl border border-slate-800/80 bg-slate-950/60 px-4 py-3 text-sm text-slate-200 animate-telemetry-beat">
                          {cue}
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 flex flex-wrap items-center gap-3">
                      <Link
                        href={selectedPage.route}
                        className="rounded-xl border border-[#E67E22]/40 bg-[#E67E22]/10 px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-[#f4b06a] transition-colors hover:border-[#E67E22]/60 hover:bg-[#E67E22]/15"
                      >
                        {selectedPage.cta}
                      </Link>
                      <div className="text-[10px] uppercase tracking-[0.3em] text-slate-500">
                        Mini-page mode active. Tap another card to swap the content pane.
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="mt-4 rounded-xl border border-dashed border-slate-700/80 bg-slate-950/50 p-5 text-sm text-slate-300">
                    The secure content pages are locked until the ordered gate is complete.
                  </div>
                )}
              </div>
            </article>
          </div>
        </section>
      </div>
    </SectionPageLayout>
  );
}
