'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { useScrollReveal } from '@/lib/gsap';
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
          <p className="text-[10px] tracking-[0.2em] uppercase text-black/60 mb-6">02 — Quién es Juan</p>

          <h2 className="text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-black mb-4" style={{ fontWeight: 900 }}>
            Entendemos el café desde su raíz.
          </h2>
          <p className="text-xl md:text-2xl lg:text-3xl leading-snug text-black/80 mb-8" style={{ fontWeight: 600 }}>
            Garantizamos la calidad en cada taza.
          </p>

          <p className="text-base md:text-lg text-black/80 leading-relaxed max-w-[85%] mb-10">
            Cuarta generación de caficultores — con presencia en cada paso de la cadena del café.
          </p>

          {/* Roles */}
          <div className="flex flex-wrap gap-2 mb-10">
            {['Productor', 'Catador', 'Tostador', 'Barista', 'Exportador'].map(role => (
              <span
                key={role}
                className="px-4 py-2 bg-black text-white text-[11px] tracking-[0.1em] uppercase font-semibold rounded-sm"
              >
                {role}
              </span>
            ))}
          </div>

          {/* Achievements */}
          <div className="bg-black/10 backdrop-blur-sm rounded-md p-6 mb-10">
            <p className="text-[10px] tracking-[0.15em] uppercase text-black/50 mb-5">Competencias</p>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-black flex-shrink-0">
                  <circle cx="12" cy="8" r="6" />
                  <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
                  <path d="M12 5v2M10 7.5h4" />
                </svg>
                <div>
                  <p className="text-sm font-bold text-black">Roasted Regional 2025</p>
                  <p className="text-xs text-black/50">1er lugar — Colombia</p>
                </div>
              </div>
              <div className="w-full h-px bg-black/10" />
              <div className="flex items-center gap-4">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-black flex-shrink-0">
                  <circle cx="12" cy="8" r="6" />
                  <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
                  <path d="M10.5 7h3" />
                </svg>
                <div>
                  <p className="text-sm font-bold text-black">V60 Regional 2024</p>
                  <p className="text-xs text-black/50">2do lugar — Colombia</p>
                </div>
              </div>
            </div>
          </div>

          <a
            href="/coming-soon"
            className="inline-block px-8 py-3 bg-black text-white text-[11px] tracking-[0.15em] uppercase font-semibold rounded-sm hover:bg-black/85 transition-colors w-fit"
          >
            Conocer más →
          </a>
        </div>
      </div>
    </section>
  );
}
