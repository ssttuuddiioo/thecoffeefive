'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { useScrollReveal } from '@/lib/gsap';
import { useTranslation } from '../LanguageProvider';
import { LocaleLink } from '../LocaleLink';
export function IdentitySection() {
  const { t } = useTranslation();
  const sectionRef = useScrollReveal();
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      if (rect.top < windowH && rect.bottom > 0) {
        const progress = (windowH - rect.top) / (windowH + rect.height);
        setOffset((progress - 0.5) * 40);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative text-coffee-black" style={{ backgroundColor: 'rgb(236, 205, 62)' }}>
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Photo with parallax */}
        <div ref={containerRef} className="relative min-h-[60vh] md:min-h-[90vh] overflow-hidden">
          <div
            className="absolute inset-0 will-change-transform"
            style={{ transform: `translateY(${offset}px) scale(1.08)` }}
          >
            <Image
              src="/identity-juan.jpg"
              alt="Juan Medina"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Text */}
        <div className="flex flex-col justify-center px-8 md:px-16 lg:px-20 py-20 md:py-28">
          <p className="text-[10px] tracking-[0.2em] uppercase text-black/60 mb-6">{t.identity.eyebrow}</p>

          <h2 className="text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-black mb-4" style={{ fontWeight: 900 }}>
            {t.identity.heading}
          </h2>
          <p className="text-xl md:text-2xl lg:text-3xl leading-snug text-black/80 mb-8" style={{ fontWeight: 600 }}>
            {t.identity.subheading}
          </p>

          <p className="text-base md:text-lg text-black/80 leading-relaxed max-w-[85%] mb-10">
            {t.identity.body}
          </p>

          {/* Roles */}
          <div className="flex flex-wrap gap-2 mb-10">
            {t.identity.roles.map(role => (
              <span
                key={role}
                className="px-4 py-2 bg-black text-white text-[11px] tracking-[0.1em] uppercase font-semibold rounded-sm"
              >
                {role}
              </span>
            ))}
          </div>

          {/* Reassurance */}
          <div className="border-l-2 border-black/30 pl-6 mb-10">
            <p className="text-lg md:text-xl leading-snug text-black/80" style={{ fontWeight: 600 }}>
              {t.identity.reassurance}
            </p>
          </div>

          <LocaleLink
            href="/about"
            className="inline-block px-8 py-3 bg-black text-white text-[11px] tracking-[0.15em] uppercase font-semibold rounded-sm hover:bg-black/85 transition-colors w-fit"
          >
            {t.identity.cta}
          </LocaleLink>
        </div>
      </div>
    </section>
  );
}
