'use client';

import { useState, FormEvent } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { withLocale } from '@/config/i18n';
import { useTranslation } from '@/app/_components/LanguageProvider';
import { LocaleLink } from '@/app/_components/LocaleLink';

function safeNext(next: string | null, fallback: string): string {
  if (next && next.startsWith('/') && !next.startsWith('//')) return next;
  return fallback;
}

export function AccesoContent() {
  const { t, locale } = useTranslation();
  const searchParams = useSearchParams();
  const next = safeNext(searchParams.get('next'), withLocale(locale, '/cafe-verde'));

  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [checking, setChecking] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!password || checking) return;
    setChecking(true);
    setError(false);
    try {
      const res = await fetch('/api/offer-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        // Full navigation so middleware re-runs with the new cookie.
        window.location.assign(next);
        return;
      }
      setError(true);
      setChecking(false);
    } catch {
      setError(true);
      setChecking(false);
    }
  }

  return (
    <main className="min-h-screen bg-coffee-black flex flex-col items-center justify-center px-5 text-center">
      <Image
        src="/logo.svg"
        alt="Coffee Five"
        width={48}
        height={76}
        className="brightness-0 invert mb-8"
      />

      <p className="text-[10px] tracking-[0.2em] uppercase text-coffee-400 mb-3">
        {t.acceso.eyebrow}
      </p>

      <h1 className="text-3xl md:text-4xl font-bold text-coffee-white mb-4 leading-tight">
        {t.acceso.heading}
      </h1>

      <p className="text-base text-coffee-400 max-w-md mb-8 leading-relaxed">
        {t.acceso.body}
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-3 max-w-md w-full mb-4"
      >
        <input
          type="password"
          required
          autoFocus
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (error) setError(false);
          }}
          placeholder={t.acceso.passwordPlaceholder}
          aria-label={t.acceso.passwordPlaceholder}
          aria-invalid={error}
          className="flex-1 min-h-[48px] bg-transparent border border-coffee-700 rounded-sm px-4 text-sm text-coffee-white placeholder:text-coffee-600 focus:outline-none focus:border-coffee-400 transition-colors"
        />
        <button
          type="submit"
          disabled={checking}
          className="min-h-[48px] px-8 text-[11px] tracking-[0.15em] uppercase font-bold rounded-sm transition-colors disabled:opacity-50"
          style={{ backgroundColor: '#0D7C47', color: '#fff' }}
        >
          {checking ? '...' : t.acceso.submit}
        </button>
      </form>

      <p
        className={`text-[12px] min-h-[18px] mb-10 transition-opacity ${
          error ? 'opacity-100 text-[#ED4035]' : 'opacity-0'
        }`}
      >
        {t.acceso.error}
      </p>

      <LocaleLink
        href="/"
        className="text-coffee-400 text-[12px] tracking-[0.1em] uppercase hover:text-coffee-white transition-colors min-h-[44px] flex items-center"
      >
        {t.common.backHome}
      </LocaleLink>
    </main>
  );
}
