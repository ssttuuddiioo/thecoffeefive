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
    <section ref={sectionRef} className="relative bg-coffee-cream text-coffee-black">
      <span className="absolute top-8 right-5 md:right-10 lg:right-20 text-6xl font-medium text-coffee-black/10 leading-none z-10">
        02
      </span>

      <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr]">
        {/* Photo with parallax */}
        <div ref={containerRef} className="relative min-h-[50vh] md:min-h-[80vh] overflow-hidden">
          <div
            className="absolute inset-0 will-change-transform"
            style={{ transform: `translateY(${offset}px) scale(1.08)` }}
          >
            <Image
              src="/juan.png"
              alt="Juan Medina"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Text */}
        <div className="flex flex-col justify-center px-8 md:px-12 py-16 md:py-22">
          <SectionTag number="02" label="Quién es Juan" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal leading-[1.15] text-coffee-black mb-8">
            Café que entendemos desde la raíz. Calidad que garantizamos hasta la taza.
          </h2>
          <p className="text-[13px] tracking-[0.15em] uppercase text-coffee-400 mb-4">
            Productor · Catador · Tostador · Barista · Exportador
          </p>
          <p className="text-sm md:text-base text-coffee-400 leading-relaxed max-w-md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
          </p>
        </div>
      </div>
    </section>
  );
}
