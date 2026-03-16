'use client';

import Link from 'next/link';
import { useStaggerReveal } from '@/lib/gsap';
import { SectionTag } from '../SectionTag';
import { RoastedCard } from '../RoastedCard';
import { mockRoastedCoffee } from '@/lib/mock-data';

export function RoastedCoffeeSection() {
  const gridRef = useStaggerReveal();

  return (
    <section className="section-padding relative bg-coffee-cream text-coffee-black">
      <span className="absolute top-8 right-5 md:right-10 lg:right-20 text-6xl font-medium text-coffee-black/10 leading-none">
        05
      </span>
      <div className="container-site">
        <SectionTag number="05" label="Café Tostado" />
        <div className="flex justify-between items-baseline mb-8">
          <h3 className="text-xl md:text-2xl font-normal text-coffee-black">
            Roasted coffee
          </h3>
          <Link
            href="/tostado"
            className="hidden md:inline text-[11px] tracking-wide text-coffee-400 hover:text-coffee-black transition-colors"
          >
            Ver colección →
          </Link>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {mockRoastedCoffee.map((coffee) => (
            <div key={coffee.name} data-reveal>
              <RoastedCard {...coffee} />
            </div>
          ))}
        </div>

        <Link
          href="/tostado"
          className="md:hidden block text-center text-[11px] tracking-wide text-coffee-400 mt-6 hover:text-coffee-black transition-colors"
        >
          Ver colección →
        </Link>
      </div>
    </section>
  );
}
