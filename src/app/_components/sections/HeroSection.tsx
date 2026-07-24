'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslation } from '../LanguageProvider';
import { LocaleLink } from '../LocaleLink';

export function HeroSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.bottom > 0) {
        setOffset(window.scrollY * 0.15);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col items-center justify-center bg-coffee-900 overflow-hidden">
      {/* Background image with parallax */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{ transform: `translateY(${offset}px) scale(1.1)` }}
      >
        <Image
          src="/header.jpg"
          alt=""
          fill
          priority
          className="object-cover object-center opacity-60"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-coffee-black/40" />

      <span className="absolute top-8 right-5 md:right-10 lg:right-20 text-6xl font-medium text-white/10 leading-none z-10">
        01
      </span>

      <div className="flex flex-col items-center mb-8 relative z-10">
        <Image src="/logo.svg" alt="Coffee Five" width={120} height={190} className="brightness-0 invert w-[92px] md:w-[120px] h-auto" />
        <span
          className="text-xl md:text-2xl tracking-tight mt-2 text-white"
          style={{ fontFamily: "'salted', cursive" }}
        >
          The Coffee Five
        </span>
      </div>

      <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-coffee-white text-center max-w-3xl px-5 leading-tight mb-8 relative z-10">
        {t.hero.title}
      </h1>

      <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10">
        <LocaleLink
          href="/tostado"
          className="px-8 py-3 border border-coffee-white text-coffee-white text-[12px] tracking-[0.1em] uppercase rounded-sm hover:bg-coffee-white hover:text-coffee-black transition-colors min-h-[44px] flex items-center"
        >
          {t.hero.ctaPrimary}
        </LocaleLink>
        <LocaleLink
          href="/services"
          className="text-coffee-400 text-[12px] tracking-[0.1em] uppercase hover:text-coffee-white transition-colors min-h-[44px] flex items-center"
        >
          {t.hero.ctaSecondary}
        </LocaleLink>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-[10px] tracking-[0.2em] uppercase text-coffee-400">{t.hero.scroll}</span>
        <div className="w-px h-8 bg-coffee-400 animate-pulse-line" />
      </div>
    </section>
  );
}
