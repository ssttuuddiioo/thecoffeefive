'use client';

import Image from 'next/image';
import { useStaggerReveal } from '@/lib/gsap';
import { SectionTag } from '../SectionTag';
import { processSteps } from '@/lib/mock-data';

export function ProcessSection() {
  const gridRef = useStaggerReveal();

  return (
    <section className="section-padding relative bg-coffee-white text-coffee-black">
      <span className="absolute top-8 right-5 md:right-10 lg:right-20 text-6xl font-medium text-coffee-black/10 leading-none">
        03
      </span>
      <div className="container-site">
        <SectionTag number="03" label="El Proceso" />
        <div className="max-w-xl mb-10">
          <h3 className="text-xl md:text-2xl font-normal text-coffee-black">
            Quality is intentional work at every stage.
          </h3>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0.5 rounded-md overflow-hidden"
        >
          {processSteps.map((step, i) => (
            <div key={step.title} data-reveal className="bg-coffee-cream relative">
              <div className="relative aspect-square md:aspect-square aspect-[2/1]">
                <Image
                  src={step.img}
                  alt={step.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="p-4 md:p-5 text-center">
                <h4 className="text-sm font-bold mb-1 text-coffee-black">{step.title}</h4>
                <p className="text-xs text-coffee-400 leading-relaxed">{step.description}</p>
              </div>
              {i < processSteps.length - 1 && (
                <span className="hidden lg:block absolute right-[-14px] top-1/2 -translate-y-1/2 z-10 text-lg text-coffee-400">
                  →
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
