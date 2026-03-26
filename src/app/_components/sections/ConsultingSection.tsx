'use client';

import Image from 'next/image';
import { useScrollReveal } from '@/lib/gsap';
import { SectionTag } from '../SectionTag';
import { consultingServices } from '@/lib/mock-data';

const serviceColors = ['#ECCD3E', '#4592DB', '#0D7C47'];

export function ConsultingSection() {
  const sectionRef = useScrollReveal();

  return (
    <section ref={sectionRef} className="relative bg-coffee-black">
      {/* Accent top bar */}
      <div className="h-3" style={{ backgroundColor: '#4592DB' }} />

      <div className="container-site py-16 md:py-24">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <SectionTag number="06" label="Consultorio" />
          <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Consultorio
          </h3>
          <p className="text-sm md:text-base text-white/50 max-w-xl leading-relaxed">
            Típicamente 1–2 puntos de mejora en puntaje de taza a través de optimización de procesos, sin inversión de capital importante. Bonificaciones reales para el productor: mejor pago por carga, mejor factor en la cooperativa.
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <div>
            <div className="space-y-3">
              {consultingServices.map((service, i) => (
                <div
                  key={service.title}
                  className="p-5 rounded-md border border-white/10"
                  style={{ backgroundColor: serviceColors[i] }}
                >
                  <h4 className="text-sm font-bold text-black mb-1.5">{service.title} →</h4>
                  <p className="text-xs text-black/70 leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="relative aspect-square rounded-md overflow-hidden">
              <Image src="/consulting-1.jpg" alt="Lab — Medellín" fill className="object-cover" sizes="(max-width: 1024px) 50vw, 25vw" />
            </div>
            <div className="relative aspect-square rounded-md overflow-hidden">
              <Image src="/consulting-2.jpg" alt="Cupping table" fill className="object-cover" sizes="(max-width: 1024px) 50vw, 25vw" />
            </div>
            <div className="relative aspect-[2/1] rounded-md overflow-hidden col-span-2">
              <Image src="/consulting-3.jpg" alt="Field work — finca consulting" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
