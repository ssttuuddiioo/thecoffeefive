'use client';

import Image from 'next/image';
import { useScrollReveal } from '@/lib/gsap';
import { SectionTag } from '../SectionTag';
import { consultingServices } from '@/lib/mock-data';

export function ConsultingSection() {
  const sectionRef = useScrollReveal();

  return (
    <section ref={sectionRef} className="section-padding relative bg-coffee-white text-coffee-black">
      <span className="absolute top-8 right-5 md:right-10 lg:right-20 text-6xl font-medium text-coffee-black/10 leading-none">
        06
      </span>
      <div className="container-site">
        <SectionTag number="06" label="Consultoría y Servicios" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <div>
            <h3 className="text-xl md:text-2xl font-normal text-coffee-black mb-4">
              Helping producers improve quality — with measurable results.
            </h3>
            <p className="text-sm text-coffee-400 leading-relaxed mb-8">
              Typically 1–2 points of improvement in cup score through process optimization, without major capital investment. Real bonificaciones for the producer: better payment per carga, stronger factor at the cooperativa.
            </p>

            <div className="space-y-0.5">
              {consultingServices.map((service) => (
                <div key={service.title} className="bg-coffee-cream p-5 rounded-sm">
                  <h4 className="text-sm font-bold text-coffee-black mb-1.5">{service.title} →</h4>
                  <p className="text-xs text-coffee-400 leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="relative aspect-square rounded-sm overflow-hidden">
              <Image src="/helping1.png" alt="Lab — Medellín" fill className="object-cover" sizes="(max-width: 1024px) 50vw, 25vw" />
            </div>
            <div className="relative aspect-square rounded-sm overflow-hidden">
              <Image src="/helping2.png" alt="Cupping table" fill className="object-cover" sizes="(max-width: 1024px) 50vw, 25vw" />
            </div>
            <div className="relative aspect-[2/1] rounded-sm overflow-hidden col-span-2">
              <Image src="/helping3.png" alt="Field work — finca consulting" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
