'use client';

import { useEffect, useState } from 'react';

const FORMSUBMIT_ENDPOINT = '74677a481641afbec02b658ad8ffaa04';

const CONTACT_REASONS = [
  'Order Question',
  'Product Inquiry',
  'Partnership / Press',
  'General Question',
] as const;

export default function ContactFormCard() {
  const [nextUrl, setNextUrl] = useState('');

  useEffect(() => {
    setNextUrl(`${window.location.origin}/contact/thanks`);
  }, []);

  return (
    <section className="contact-simplified-card">
      <div className="border-b border-slate-800/80 pb-4">
        <p className="text-[10px] uppercase tracking-[0.35em] text-slate-500">Support Desk</p>
        <h2 className="mt-2 text-2xl font-bold uppercase tracking-[0.16em] text-slate-100">Get in Touch</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300">
          We are here to help. Whether you have a question about the Readiness Guide, need help with an order, or want to discuss gear and partnerships,
          send us a message below.
        </p>
      </div>

      <div className="mt-5 rounded-xl border border-cyan-400/20 bg-cyan-400/5 px-4 py-3 text-sm leading-relaxed text-cyan-100/85">
        Looking for shipping times, returns, or quick answers first? Check the FAQ before sending a message and you may get what you need instantly.
      </div>

      <div className="mt-4 rounded-xl border border-slate-800/80 bg-slate-900/60 px-4 py-3 text-sm leading-relaxed text-slate-300">
        Our support team is available Monday through Friday, 9 AM to 5 PM, and we aim to reply within 24 business hours.
      </div>
      <form action={`https://formsubmit.co/${FORMSUBMIT_ENDPOINT}`} method="POST" className="mt-6 space-y-5">
        <input type="hidden" name="_subject" value="New Redstone Haven contact request" />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="_blacklist" value="viagra,casino,crypto,loan" />
        {nextUrl ? <input type="hidden" name="_next" value={nextUrl} /> : null}

        <div className="grid gap-5 md:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">Name</span>
            <input
              type="text"
              name="name"
              className="w-full rounded-lg border border-slate-700/80 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 outline-none transition-colors placeholder:text-slate-500 focus:border-cyan-300/60"
              placeholder="Your name"
              autoComplete="name"
              required
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">Email Address</span>
            <input
              type="email"
              name="email"
              className="w-full rounded-lg border border-slate-700/80 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 outline-none transition-colors placeholder:text-slate-500 focus:border-cyan-300/60"
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
          </label>
        </div>

        <label className="block">
          <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">Reason for Contacting</span>
          <select
            name="reason"
            defaultValue="General Question"
            className="w-full rounded-lg border border-slate-700/80 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 outline-none transition-colors focus:border-cyan-300/60"
          >
            {CONTACT_REASONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="hidden" aria-hidden="true">
          <span>Leave this field empty</span>
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            name="_honey"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">Message</span>
          <textarea
            name="message"
            rows={7}
            className="w-full rounded-lg border border-slate-700/80 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 outline-none transition-colors placeholder:text-slate-500 focus:border-cyan-300/60"
            placeholder="Tell us what you need help with."
            required
          />
        </label>

        <div className="flex flex-wrap items-center gap-4">
          <button
            type="submit"
            className="inline-flex items-center rounded-lg bg-[#E67E22] px-5 py-3 text-xs font-bold uppercase tracking-[0.22em] text-white transition-colors hover:bg-[#d35400]"
          >
            [ Send Message ]
          </button>
          <p className="text-xs leading-relaxed text-slate-500">
            This form now submits through FormSubmit with a hidden honeypot field and FormSubmit spam filtering. Your first live submission will trigger an inbox confirmation step.
          </p>
        </div>
      </form>
    </section>
  );
}