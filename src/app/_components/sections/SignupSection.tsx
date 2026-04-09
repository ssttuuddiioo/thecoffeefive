'use client';

import { useState, useRef, FormEvent } from 'react';
import { useScrollReveal } from '@/lib/gsap';

export function SignupSection() {
  const sectionRef = useScrollReveal();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const [sending, setSending] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email || sending) return;
    setSending(true);
    try {
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setSubmitted(true);
    } catch {
      setSending(false);
    }
  }

  return (
    <section
      ref={sectionRef}
      className="relative bg-coffee-black border-t border-coffee-800"
    >
      <div className="max-w-2xl mx-auto px-5 md:px-8 py-20 md:py-28 text-center">
        <p className="text-[10px] tracking-[0.25em] uppercase text-coffee-400 mb-6">
          Próximamente
        </p>

        <h2
          className="text-2xl md:text-3xl lg:text-4xl font-bold text-coffee-white mb-4 leading-tight"
        >
          Estamos construyendo algo especial.
        </h2>

        <p className="text-base md:text-lg text-coffee-400 leading-relaxed mb-10 max-w-lg mx-auto">
          Déjanos tu correo y te avisamos cuando lancemos. Lotes nuevos,
          historias de finca, y todo lo que viene.
        </p>

        {submitted ? (
          <div className="flex flex-col items-center gap-3">
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
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              ref={inputRef}
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className="flex-1 min-h-[48px] bg-transparent border border-coffee-700 rounded-sm px-4 text-sm text-coffee-white placeholder:text-coffee-600 focus:outline-none focus:border-coffee-400 transition-colors"
            />
            <button
              type="submit"
              disabled={sending}
              className="min-h-[48px] px-8 text-[11px] tracking-[0.15em] uppercase font-bold rounded-sm transition-colors disabled:opacity-50"
              style={{ backgroundColor: '#0D7C47', color: '#fff' }}
            >
              {sending ? '...' : 'Suscribirme'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
