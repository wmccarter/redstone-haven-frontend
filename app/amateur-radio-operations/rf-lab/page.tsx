'use client';

import { useMemo, useState } from 'react';
import SectionPageLayout from '../../../components/layout/SectionPageLayout';

const TARGET_FREQUENCY = 14.243;

function formatMhz(value: number) {
  return `${value.toFixed(3)} MHz`;
}

export default function RfLabPage() {
  const [dial, setDial] = useState(14.0);
  const [mode, setMode] = useState('USB');
  const [signalBoost, setSignalBoost] = useState(12);

  const delta = Math.abs(dial - TARGET_FREQUENCY);
  const lockPercentage = Math.max(0, Math.round(100 - delta * 1000));

  const status = useMemo(() => {
    if (delta < 0.005) {
      return 'Target signal acquired. Relay lock is stable.';
    }

    if (delta < 0.02) {
      return 'Near-lock detected. Fine tune the dial to stabilize beacon sync.';
    }

    return 'No stable lock. Sweep the band and tune toward beacon chatter.';
  }, [delta]);

  return (
    <SectionPageLayout
      title="RF & Amateur Radio Lab"
      subtitle="Interactive tuning module for signal hunt, lock state, and operational rehearsal"
    >
      <section className="rounded-2xl border border-slate-700/70 bg-slate-950/90 p-6 shadow-[0_16px_36px_rgba(0,0,0,0.28)]">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.34em] text-slate-500">Interactive Module</p>
            <h2 className="mt-2 text-2xl font-bold uppercase tracking-[0.24em] text-slate-100">Signal Hunt Simulator</h2>
          </div>
          <div className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-cyan-100">
            Target: {formatMhz(TARGET_FREQUENCY)}
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-5 rounded-xl border border-slate-800/80 bg-slate-900/65 p-5">
            <div>
              <label htmlFor="rf-dial" className="text-[10px] uppercase tracking-[0.3em] text-slate-500">
                Frequency Dial
              </label>
              <div className="mt-2 text-lg font-mono text-slate-100">{formatMhz(dial)}</div>
              <input
                id="rf-dial"
                type="range"
                min={14.0}
                max={14.5}
                step={0.001}
                value={dial}
                onChange={(event) => setDial(Number(event.target.value))}
                className="mt-3 w-full"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="rounded-lg border border-slate-800/80 bg-slate-950/70 p-3">
                <span className="text-[10px] uppercase tracking-[0.28em] text-slate-500">Mode</span>
                <select
                  value={mode}
                  onChange={(event) => setMode(event.target.value)}
                  className="mt-2 w-full border-0 bg-transparent text-sm text-slate-100 outline-none"
                >
                  <option>USB</option>
                  <option>LSB</option>
                  <option>CW</option>
                  <option>FT8</option>
                </select>
              </label>

              <label className="rounded-lg border border-slate-800/80 bg-slate-950/70 p-3">
                <span className="text-[10px] uppercase tracking-[0.28em] text-slate-500">Signal Boost</span>
                <input
                  type="number"
                  min={0}
                  max={30}
                  value={signalBoost}
                  onChange={(event) => setSignalBoost(Number(event.target.value))}
                  className="mt-2 w-full border-0 bg-transparent text-sm text-slate-100 outline-none"
                />
              </label>
            </div>
          </div>

          <div className="space-y-4 rounded-xl border border-slate-800/80 bg-slate-900/65 p-5">
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-slate-500">Lock Quality</div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-800">
                <div className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-emerald-300 transition-all duration-200" style={{ width: `${lockPercentage}%` }} />
              </div>
              <div className="mt-2 text-sm text-slate-200">{lockPercentage}%</div>
            </div>

            <div className="rounded-lg border border-slate-800/80 bg-slate-950/70 p-4">
              <div className="text-[10px] uppercase tracking-[0.3em] text-slate-500">Telemetry Status</div>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{status}</p>
            </div>

            <div className="rounded-lg border border-slate-800/80 bg-slate-950/70 p-4 text-sm text-slate-300">
              Mode: <span className="font-mono text-slate-100">{mode}</span> · Boost: <span className="font-mono text-slate-100">{signalBoost} dB</span>
            </div>
          </div>
        </div>
      </section>
    </SectionPageLayout>
  );
}
