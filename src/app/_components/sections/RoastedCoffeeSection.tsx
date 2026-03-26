'use client';

import Link from 'next/link';
import { useStaggerReveal } from '@/lib/gsap';
import { SectionTag } from '../SectionTag';
import { RoastedCard } from '../RoastedCard';
import { mockRoastedCoffee } from '@/lib/mock-data';

export function RoastedCoffeeSection() {
  const gridRef = useStaggerReveal();

  return (
    <section className="relative bg-coffee-black">
      {/* Accent top bar */}
      <div className="h-3" style={{ backgroundColor: '#91171F' }} />

      <div className="container-site py-16 md:py-24">
        {/* Header row */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-end mb-12 md:mb-16">
          <div>
            <SectionTag number="05" label="Café Tostado" />
            <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Café Tostado
            </h3>
            <p className="text-sm md:text-base text-white/50 max-w-xl leading-relaxed">
              Café tostado de especialidad, perfiles únicos desarrollados en nuestro laboratorio. Frescura garantizada, del tueste a tu taza.
            </p>
          </div>
          <Link
            href="/tostado"
            className="inline-block px-8 py-3 text-[11px] tracking-[0.15em] uppercase font-semibold rounded-sm transition-colors self-start lg:self-end hover:opacity-90"
            style={{ backgroundColor: '#91171F', color: '#fff' }}
          >
            Ver colección →
          </Link>
        </div>

        {/* Cards */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {mockRoastedCoffee.map((coffee) => (
            <div key={coffee.variedad} data-reveal>
              <RoastedCard {...coffee} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
