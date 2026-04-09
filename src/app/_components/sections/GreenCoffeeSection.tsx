'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence } from 'framer-motion';
import { useScrollReveal } from '@/lib/gsap';
import { SectionTag } from '../SectionTag';
import { LotCard } from '../LotCard';
import { LotDrawer } from '../LotDrawer';
import { mockGreenLots } from '@/lib/mock-data';

type GreenLot = typeof mockGreenLots[number];

export function GreenCoffeeSection() {
  const sectionRef = useScrollReveal();
  const [drawerLot, setDrawerLot] = useState<GreenLot | null>(null);

  return (
    <section ref={sectionRef} className="relative bg-coffee-black">
      {/* Accent top bar */}
      <div className="h-3" style={{ backgroundColor: '#0D7C47' }} />

      <div className="container-site py-16 md:py-24">
        {/* Header row */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-end mb-12 md:mb-16">
          <div>
            <SectionTag number="04" label="Café Verde" />
            <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold text-coffee-white mb-4">
              Café Verde
            </h3>
            <p className="text-sm md:text-base text-white/50 max-w-xl leading-relaxed">
              Lotes de café verde de especialidad, trazables desde la finca hasta tu tostadora. Origen único, perfiles verificados en laboratorio, listos para exportar o disponibles en EE.UU.
            </p>
          </div>
          <Link
            href="/cafe-verde"
            className="inline-block px-8 py-3 text-[11px] tracking-[0.15em] uppercase font-semibold rounded-sm transition-colors self-start lg:self-end hover:opacity-90"
            style={{ backgroundColor: '#0D7C47', color: '#fff' }}
          >
            Ver todos los lotes →
          </Link>
        </div>

        {/* Cards — featured lots on homepage */}
        <div className="flex gap-6 overflow-x-auto pt-4 pb-2 snap-x snap-mandatory scrollbar-hide -mx-5 px-5 md:mx-0 md:px-0">
          {mockGreenLots.filter((lot) => ['HS-001', 'HS-002', 'HS-007'].includes(lot.ref)).map((lot, i) => (
            <LotCard
              key={`${lot.name}-${i}`}
              name={lot.name}
              weight={lot.weight}
              price={lot.price}
              color={lot.color}
              proceso={lot.proceso}
              productor={lot.finca}
              img={lot.img}
              className="flex-none w-[65vw] md:w-[calc(33.333%-16px)]"
              onOverview={() => setDrawerLot(lot)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {drawerLot && (
          <LotDrawer
            lot={drawerLot}
            onClose={() => setDrawerLot(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
