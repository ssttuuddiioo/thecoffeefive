'use client';

import { useState, FormEvent } from 'react';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
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

  if (submitted) {
    return (
      <p className="text-sm text-coffee-400">
        Listo — te escribimos pronto.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="tu@email.com"
        className="flex-1 min-h-[44px] bg-transparent border border-coffee-700 rounded-l-sm px-3 text-sm text-coffee-white placeholder:text-coffee-600 focus:outline-none focus:border-coffee-400"
      />
      <button
        type="submit"
        disabled={sending}
        className="min-h-[44px] px-5 bg-coffee-white text-coffee-black text-[11px] tracking-[0.1em] uppercase rounded-r-sm font-bold hover:bg-coffee-200 transition-colors disabled:opacity-50"
      >
        {sending ? '...' : '→'}
      </button>
    </form>
  );
}
