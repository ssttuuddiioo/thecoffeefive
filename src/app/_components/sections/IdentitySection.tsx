'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { useScrollReveal } from '@/lib/gsap';
import { SectionTag } from '../SectionTag';

export function IdentitySection() {
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
              src="/helping1.png"
              alt="Juan Medina"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Text */}
        <div className="flex flex-col justify-center px-8 md:px-16 lg:px-20 py-20 md:py-28">
          <p className="text-[10px] tracking-[0.2em] uppercase text-black/60 mb-6">02 — Quién es Juan</p>

          <h2 className="text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-black mb-6 max-w-lg" style={{ fontWeight: 900 }}>
            Café que entendemos desde la raíz.
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl leading-snug text-black/80 mb-10 max-w-md" style={{ fontWeight: 500 }}>
            Calidad que garantizamos hasta la taza.
          </p>

          <div className="w-12 h-[2px] bg-black/20 mb-10" />

          <p className="text-[11px] tracking-[0.2em] uppercase text-black/70 mb-6">
            Productor · Catador · Tostador · Barista · Exportador
          </p>

          <p className="text-sm md:text-base text-black/80 leading-relaxed max-w-sm mb-10">
            Juan Medina opera en toda la cadena del café de especialidad — desde el cultivo en finca hasta la taza final. Agrónomo, catador Q, tostador y exportador.
          </p>

          {/* Achievements */}
          <div className="flex flex-col gap-2 mb-10">
            <div className="flex items-center gap-3">
              <span className="text-lg">🥇</span>
              <span className="text-sm text-black/80">Roasted Regional 2025 — Colombia</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-lg">🥈</span>
              <span className="text-sm text-black/80">V60 Regional 2024 — Colombia</span>
            </div>
          </div>

          <a
            href="/about"
            className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-black border-b border-black/40 pb-1 hover:border-black transition-colors w-fit"
          >
            Conocer más
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
