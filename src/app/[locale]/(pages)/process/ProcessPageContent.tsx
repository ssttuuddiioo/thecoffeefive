'use client';

import Image from 'next/image';
import { useScrollReveal, useStaggerReveal } from '@/lib/gsap';
import { photoProps } from '@/lib/photo';
import type { Dictionary } from '@/config/dictionaries';

type Copy = Dictionary['processPage'];
type PillarKey = keyof Copy['pillars'];
type Pillar = Copy['pillars'][PillarKey];

const PILLARS: { id: PillarKey; color: string }[] = [
  { id: 'cultivo', color: '#4592DB' },
  { id: 'origen', color: '#0D7C47' },
  { id: 'laboratorio', color: '#ED4035' },
  { id: 'logistica', color: '#91171F' },
];

function PillarSection({ pillar, color, index }: { pillar: Pillar; color: string; index: number }) {
  const sectionRef = useScrollReveal();
  const isEven = index % 2 === 0;

  return (
    <div ref={sectionRef} className="border-t border-white/10 py-16 md:py-24">
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${!isEven ? 'lg:[direction:rtl] lg:[&>*]:[direction:ltr]' : ''}`}>
        {/* Image */}
        <div
          className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/10"
          style={{ backgroundColor: color }}
        >
          <Image
            {...photoProps(pillar.photo)} alt={pillar.photo.alt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        {/* Content */}
        <div>
          <span
            className="inline-block text-[10px] tracking-[0.15em] uppercase font-semibold px-3 py-1 rounded-sm mb-4"
            style={{ backgroundColor: color, color: '#fff' }}
          >
            0{index + 1}
          </span>
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">{pillar.title}</h2>
          <p className="text-sm md:text-base text-white/60 leading-relaxed mb-6">{pillar.intro}</p>
          <ul className="space-y-2.5">
            {pillar.details.map((detail) => (
              <li key={detail} className="flex items-start gap-3 text-sm text-white/80 leading-relaxed">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                {detail}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function ProcessPageContent({ c }: { c: Copy }) {
  const heroRef = useStaggerReveal();

  return (
    <main className="pt-20 md:pt-24 bg-black text-white">
      <div className="container-site section-padding">
        {/* Header */}
        <div ref={heroRef}>
          <p data-reveal className="text-[10px] tracking-[0.15em] uppercase text-white/40 mb-4">{c.eyebrow}</p>
          <h1 data-reveal className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {c.h1}
          </h1>
          <p data-reveal className="text-sm md:text-base text-white/60 max-w-2xl mb-6 leading-relaxed">
            {c.intro}
          </p>

          {/* Pillar quick nav */}
          <div data-reveal className="flex flex-wrap gap-3 mb-16">
            {PILLARS.map(({ id }) => (
              <a
                key={id}
                href={`#${id}`}
                className="px-4 py-2 rounded-sm text-[11px] tracking-[0.1em] uppercase font-medium text-white border border-white/20 hover:border-white/50 transition-colors"
              >
                {c.pillars[id].title}
              </a>
            ))}
          </div>
        </div>

        {/* Pillar sections */}
        {PILLARS.map(({ id, color }, i) => (
          <div key={id} id={id}>
            <PillarSection pillar={c.pillars[id]} color={color} index={i} />
          </div>
        ))}
      </div>
    </main>
  );
}
