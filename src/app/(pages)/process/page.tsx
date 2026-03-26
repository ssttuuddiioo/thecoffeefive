'use client';

import Image from 'next/image';
import { useScrollReveal, useStaggerReveal } from '@/lib/gsap';

const stepColors = ['#4592DB', '#0D7C47', '#ED4035', '#91171F'];

const pillars = [
  {
    title: 'Cultivo',
    img: '/grow.jpg',
    color: stepColors[0],
    intro: 'Todo empieza en la tierra. Acompañamos al productor desde la selección de semilla hasta la cosecha.',
    details: [
      'Selección de semillas y variedades adaptadas al terroir',
      'Diseño de viveros y planes de renovación',
      'Nutrición del suelo y manejo orgánico',
      'Control integrado de plagas y enfermedades',
      'Protocolos de cosecha selectiva en punto óptimo de maduración',
      'Diseño de procesos de fermentación y secado en finca',
      'Control de calidad en cereza, pergamino y trilla',
    ],
  },
  {
    title: 'Origen',
    img: '/source.jpg',
    color: stepColors[1],
    intro: 'Construimos relaciones directas con productores que comparten nuestra obsesión por la calidad.',
    details: [
      'Red de productores en Nariño, Huila, Cauca, Tolima, Antioquia y Santander',
      'Consultoría en buenas prácticas agrícolas y de beneficio',
      'Precios justos basados en calidad, no en mercado C',
      'Trazabilidad completa: finca, lote, variedad, proceso',
      'Visitas periódicas a finca para retroalimentación directa',
      'Sourcing ético con compromiso a largo plazo',
    ],
  },
  {
    title: 'Laboratorio',
    img: '/lab.jpg',
    color: stepColors[2],
    intro: 'Nuestro laboratorio en Medellín es donde la calidad se mide, se entiende y se mejora.',
    details: [
      'Análisis sensorial con protocolo SCA',
      'Mesa de catación calibrada semanalmente',
      'Medición de humedad, actividad de agua y densidad',
      'Análisis de color y granulometría del tueste',
      'Perfilado de tueste con curvas documentadas',
      'Retroalimentación con productores: cada lote tiene reporte',
      'Mejora continua — cada cosecha mejor que la anterior',
    ],
  },
  {
    title: 'Logística',
    img: '/logistics.jpg',
    color: stepColors[3],
    intro: '"No vendemos café, vendemos frescura." Cada día cuenta desde que el café sale de la finca.',
    details: [
      'Exportación directa desde Colombia',
      'Importación y almacenamiento en EE.UU.',
      'Transporte terrestre con cadena de frío cuando aplica',
      'Seguimiento de cada lote desde origen hasta destino',
      'Tiempos de tránsito optimizados para preservar frescura',
      'Documentación y logística aduanera incluida',
      'Entrega puerta a puerta para tostadores y compradores',
    ],
  },
];

function PillarSection({ pillar, index }: { pillar: typeof pillars[number]; index: number }) {
  const sectionRef = useScrollReveal();
  const isEven = index % 2 === 0;

  return (
    <div ref={sectionRef} className="border-t border-white/10 py-16 md:py-24">
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${!isEven ? 'lg:[direction:rtl] lg:[&>*]:[direction:ltr]' : ''}`}>
        {/* Image */}
        <div
          className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/10"
          style={{ backgroundColor: pillar.color }}
        >
          <Image
            src={pillar.img}
            alt={pillar.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        {/* Content */}
        <div>
          <span
            className="inline-block text-[10px] tracking-[0.15em] uppercase font-semibold px-3 py-1 rounded-sm mb-4"
            style={{ backgroundColor: pillar.color, color: '#fff' }}
          >
            0{index + 1}
          </span>
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">{pillar.title}</h2>
          <p className="text-sm md:text-base text-white/60 leading-relaxed mb-6">{pillar.intro}</p>
          <ul className="space-y-2.5">
            {pillar.details.map((detail) => (
              <li key={detail} className="flex items-start gap-3 text-sm text-white/80 leading-relaxed">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: pillar.color }} />
                {detail}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function ProcessPage() {
  const heroRef = useStaggerReveal();

  return (
    <main className="pt-20 md:pt-24 bg-black text-white">
      <div className="container-site section-padding">
        {/* Header */}
        <div ref={heroRef}>
          <p data-reveal className="text-[10px] tracking-[0.15em] uppercase text-white/40 mb-4">El Proceso</p>
          <h1 data-reveal className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            De la Semilla a la Taza
          </h1>
          <p data-reveal className="text-sm md:text-base text-white/60 max-w-2xl mb-6 leading-relaxed">
            Cuatro pilares que definen cómo trabajamos. Cada uno existe para proteger la calidad del café y garantizar que lo que llega a tu taza refleje el trabajo de origen.
          </p>

          {/* Pillar quick nav */}
          <div data-reveal className="flex flex-wrap gap-3 mb-16">
            {pillars.map((p, i) => (
              <a
                key={p.title}
                href={`#${p.title.toLowerCase()}`}
                className="px-4 py-2 rounded-sm text-[11px] tracking-[0.1em] uppercase font-medium text-white border border-white/20 hover:border-white/50 transition-colors"
              >
                {p.title}
              </a>
            ))}
          </div>
        </div>

        {/* Pillar sections */}
        {pillars.map((pillar, i) => (
          <div key={pillar.title} id={pillar.title.toLowerCase()}>
            <PillarSection pillar={pillar} index={i} />
          </div>
        ))}
      </div>
    </main>
  );
}
