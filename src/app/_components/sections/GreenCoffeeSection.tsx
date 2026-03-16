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
        <div className="flex justify-between items-baseline mb-8">
          <h3 className="text-xl md:text-2xl font-normal text-coffee-white">
            Green coffee — current offerings
          </h3>
          <Link
            href="/cafe-verde"
            className="hidden md:inline text-[11px] tracking-wide text-coffee-400 hover:text-coffee-white transition-colors"
          >
            Ver todos los lotes →
          </Link>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide -mx-5 px-5 md:mx-0 md:px-0">
          {mockGreenLots.map((lot, i) => (
            <LotCard
              key={`${lot.name}-${i}`}
              name={lot.name}
              weight={lot.weight}
              price={lot.price}
              color={lot.color}
              proceso={lot.proceso}
              className="flex-none w-[65vw] md:w-[calc(33.333%-16px)]"
              onClick={() => router.push(`/cafe-verde/${lot.name.toLowerCase().replace(/\s+/g, '-')}`)}
            />
          ))}
        </div>

        <Link
          href="/cafe-verde"
          className="md:hidden block text-center text-[11px] tracking-wide text-coffee-400 mt-6 hover:text-coffee-white transition-colors"
        >
          Ver todos los lotes →
        </Link>
      </div>
    </section>
  );
}
