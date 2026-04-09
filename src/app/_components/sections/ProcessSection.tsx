'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useStaggerReveal, useHoverLift } from '@/lib/gsap';
import { SectionTag } from '../SectionTag';
import { processSteps } from '@/lib/mock-data';

const stepColors = ['#000000', '#000000', '#000000', '#000000'];

function ProcessCard({ step, color }: { step: typeof processSteps[number]; color: string }) {
  const { ref, onMouseEnter, onMouseLeave } = useHoverLift<HTMLAnchorElement>({
    childSelector: '.process-card-hover-reveal',
  });

  return (
    <Link
      href="/coming-soon"
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      data-reveal
      className="rounded-xl overflow-hidden border border-white/10 p-5 will-change-transform cursor-pointer block"
      style={{ backgroundColor: color }}
    >
      <div className="relative aspect-square rounded-md overflow-hidden">
        <Image
          src={step.img}
          alt={step.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>
      <div className="pt-4">
        <h4 className="text-lg font-medium mb-2 text-white">{step.title}</h4>
        <p className="text-[13px] text-white/70 leading-relaxed">{step.description}</p>
        <span className="process-card-hover-reveal mt-4 w-full py-2 border border-white/60 text-white text-[10px] tracking-[0.1em] uppercase rounded-sm text-center opacity-0 translate-y-2.5 hover:bg-white/10 transition-colors block">
          Ver más
        </span>
      </div>
    </Link>
  );
}

export function ProcessSection() {
  const gridRef = useStaggerReveal();

  return (
    <section className="relative bg-coffee-black">
      {/* Accent top bar */}
      <div className="h-3" style={{ backgroundColor: '#ECCD3E' }} />

      <div className="container-site py-16 md:py-24">
        {/* Header row */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-end mb-12 md:mb-16">
          <div>
            <SectionTag number="03" label="El Proceso" />
            <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              El Proceso
            </h3>
            <p className="text-sm md:text-base text-white/50 max-w-xl leading-relaxed">
              La calidad es trabajo intencional en cada etapa. Desde la selección de semilla hasta la taza final, cada paso está diseñado para proteger y revelar lo que hace único a cada lote.
            </p>
          </div>
          <Link
            href="/coming-soon"
            className="inline-block px-8 py-3 text-[11px] tracking-[0.15em] uppercase font-semibold rounded-sm transition-colors self-start lg:self-end hover:opacity-90"
            style={{ backgroundColor: '#ECCD3E', color: '#000' }}
          >
            Ver el proceso completo →
          </Link>
        </div>

        {/* Cards */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {processSteps.map((step, i) => (
            <ProcessCard key={step.title} step={step} color={stepColors[i % stepColors.length]} />
          ))}
        </div>
      </div>
    </section>
  );
}
