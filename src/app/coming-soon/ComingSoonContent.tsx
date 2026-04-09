'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export function ComingSoonContent() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
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

      <h1 className="text-3xl md:text-4xl font-bold text-coffee-white mb-4 leading-tight">
        Próximamente
      </h1>

      <p className="text-base text-coffee-400 max-w-md mb-8 leading-relaxed">
        Estamos trabajando en esta sección. Déjanos tu correo y te avisamos
        cuando lancemos.
      </p>

      {submitted ? (
        <div className="flex flex-col items-center gap-3 mb-10">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#0D7C47"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
          <p className="text-coffee-white text-sm font-medium">
            Listo — te escribimos pronto.
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-md w-full mb-10"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            className="flex-1 min-h-[48px] bg-transparent border border-coffee-700 rounded-sm px-4 text-sm text-coffee-white placeholder:text-coffee-600 focus:outline-none focus:border-coffee-400 transition-colors"
          />
          <button
            type="submit"
            className="min-h-[48px] px-8 text-[11px] tracking-[0.15em] uppercase font-bold rounded-sm transition-colors"
            style={{ backgroundColor: '#0D7C47', color: '#fff' }}
          >
            Suscribirme
          </button>
        </form>
      )}

      <Link
        href="/"
        className="text-coffee-400 text-[12px] tracking-[0.1em] uppercase hover:text-coffee-white transition-colors min-h-[44px] flex items-center"
      >
        ← Volver al inicio
      </Link>
    </main>
  );
}
