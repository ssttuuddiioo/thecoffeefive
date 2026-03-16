'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useScrollReveal } from '@/lib/gsap';
import { SectionTag } from '../SectionTag';
import { LotCard } from '../LotCard';
import { mockGreenLots } from '@/lib/mock-data';

export function GreenCoffeeSection() {
  const sectionRef = useScrollReveal();
  const router = useRouter();

  return (
    <section ref={sectionRef} className="section-padding border-b border-coffee-800 relative">
      <span className="absolute top-8 right-5 md:right-10 lg:right-20 text-6xl font-medium text-coffee-800/40 leading-none">
        04
      </span>
      <div className="container-site">
        <SectionTag number="04" label="Café Verde" />
        <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold text-coffee-white mb-4">
          Offer List
        </h3>
        <p className="text-sm md:text-base text-coffee-400 max-w-xl mb-8 leading-relaxed">
          Lotes de café verde de especialidad, trazables desde la finca hasta tu tostadora. Origen único, perfiles verificados en laboratorio, listos para exportar o disponibles en EE.UU.
        </p>

        <Link
          href="/cafe-verde"
          className="inline-block mb-10 px-8 py-3 bg-coffee-white text-coffee-black text-[11px] tracking-[0.15em] uppercase font-semibold rounded-sm hover:bg-coffee-cream transition-colors"
        >
          Ver todos los lotes →
        </Link>

        <div className="flex gap-6 overflow-x-auto pt-4 pb-2 -mt-4 snap-x snap-mandatory scrollbar-hide -mx-5 px-5 md:mx-0 md:px-0">
          {mockGreenLots.map((lot, i) => (
            <LotCard
              key={`${lot.name}-${i}`}
              name={lot.name}
              weight={lot.weight}
              price={lot.price}
              color={lot.color}
              proceso={lot.proceso}
              productor={lot.finca}
              className="flex-none w-[65vw] md:w-[calc(33.333%-16px)]"
              onClick={() => router.push(`/cafe-verde/${lot.name.toLowerCase().replace(/\s+/g, '-')}`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
