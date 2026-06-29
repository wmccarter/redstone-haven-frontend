'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function StoreAdminLoginClient() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/store/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const payload = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(payload.error || 'Login failed.');
      }

      router.push('/store/admin/orders');
      router.refresh();
    } catch (loginError) {
      const message = loginError instanceof Error ? loginError.message : 'Login failed.';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="rounded-2xl border border-slate-700/70 bg-slate-950/90 p-6 shadow-[0_16px_36px_rgba(0,0,0,0.28)]">
      <h2 className="text-xl font-bold uppercase tracking-[0.2em] text-slate-100">Admin Login</h2>
      <p className="mt-2 text-sm text-slate-300">Sign in to access order operations.</p>

      <form onSubmit={onSubmit} className="mt-5 space-y-3">
        <label className="block">
          <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">Username</span>
          <input
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            autoComplete="username"
            required
            className="w-full rounded-lg border border-slate-700/80 bg-slate-950/80 px-3 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-cyan-300/60"
            placeholder="admin"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">Password</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
            className="w-full rounded-lg border border-slate-700/80 bg-slate-950/80 px-3 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-cyan-300/60"
            placeholder="••••••••"
          />
        </label>

        {error ? <p className="text-sm text-amber-300">{error}</p> : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-[#E67E22] px-4 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#d35400] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
    </section>
  );
}
