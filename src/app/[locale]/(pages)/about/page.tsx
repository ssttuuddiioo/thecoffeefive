import Image from 'next/image';
import { ProcessSection } from '@/app/_components/sections/ProcessSection';
import { FaqAccordion } from '@/app/_components/FaqAccordion';
import type { Locale } from '@/config/i18n';

const CONTENT = {
  es: {
    heroEyebrow: 'Sobre Juan Medina',
    heroHeading: 'Desde la semilla hasta la taza — cada paso con intención.',
    heroBody:
      'Juan Medina es productor, catador, tostador, barista y exportador. Un profesional del café de especialidad que opera en toda la cadena, desde el cultivo en las montañas de Colombia hasta la taza final.',
    heroAlt: 'Juan Medina',
    storyEyebrow: 'La historia',
    storyHeading: 'La finca es la base del conocimiento.',
    storyParagraphs: [
      'Coffee Five nació de la convicción de que la calidad del café empieza mucho antes de la taza. Empieza en el suelo, en la semilla, en las decisiones de cada etapa del proceso.',
      'Juan trabaja directamente con productores en Nariño, Huila, Cauca, Santander y Tolima. No solo compra su café — los asesora en nutrición de suelos, manejo de plagas, diseño de procesos de fermentación y secado.',
      'El resultado: cafés con trazabilidad completa, calidad medible, y una historia real detrás de cada lote.',
    ],
    storyAlt1: 'Cucharas de catación',
    storyAlt2: 'Tostadora Roest en el laboratorio',
    storyAlt3: 'Recolección en finca',
    faqTitle: 'Preguntas Frecuentes',
    faqSubtitle: 'Lo que nos preguntan con más frecuencia sobre Coffee Five y nuestro modelo.',
    faqs: [
      {
        question: '¿Qué significa "desde la semilla hasta la taza"?',
        answer:
          'Significa que participamos en cada etapa del proceso: desde la selección de semillas y el manejo agronómico en finca, pasando por la fermentación, secado, catación, tueste, hasta la preparación final. No somos intermediarios — somos operadores en toda la cadena.',
      },
      {
        question: '¿En qué regiones de Colombia trabajan?',
        answer:
          'Trabajamos con productores en Nariño, Huila, Cauca, Santander y Tolima. Cada región tiene perfiles de taza distintos que seleccionamos según las necesidades de nuestros clientes.',
      },
      {
        question: '¿Coffee Five es un exportador o un tostador?',
        answer:
          'Ambos. Exportamos café verde para compradores B2B internacionales y también tostamos lotes seleccionados para venta directa al consumidor. El modelo nos permite controlar la calidad de principio a fin.',
      },
      {
        question: '¿Cómo garantizan la calidad de cada lote?',
        answer:
          'Cada lote pasa por nuestro laboratorio en Medellín: análisis físico del grano verde, tueste de muestra, catación bajo protocolo SCA, y medición de humedad y actividad de agua. Solo ofrecemos lotes que cumplen nuestro estándar mínimo de 84 puntos.',
      },
      {
        question: '¿Puedo visitar las fincas con las que trabajan?',
        answer:
          'Sí. Organizamos visitas de origen para compradores y profesionales del café. Es la mejor manera de entender el trabajo detrás de cada lote. Contáctanos para coordinar fechas y logística.',
      },
      {
        question: '¿Ofrecen muestras antes de comprar?',
        answer:
          'Sí, enviamos muestras de café verde o tostado para evaluación. Para café verde, el costo de la muestra se descuenta del pedido final. Escríbenos por WhatsApp o correo para solicitarlas.',
      },
    ],
    awardsEyebrow: 'Reconocimientos',
    awardFirstPlace: 'Primer lugar — Colombia',
    awardSecondPlace: 'Segundo lugar — Colombia',
  },
  en: {
    heroEyebrow: 'About Juan Medina',
    heroHeading: 'From seed to cup — every step with intention.',
    heroBody:
      'Juan Medina is a producer, cupper, roaster, barista and exporter. A specialty coffee professional who operates across the entire chain, from cultivation in the mountains of Colombia to the final cup.',
    heroAlt: 'Juan Medina',
    storyEyebrow: 'The story',
    storyHeading: 'The farm is the foundation of knowledge.',
    storyParagraphs: [
      'Coffee Five was born from the conviction that coffee quality begins long before the cup. It begins in the soil, in the seed, in the decisions made at every stage of the process.',
      'Juan works directly with producers in Nariño, Huila, Cauca, Santander and Tolima. He does not just buy their coffee — he advises them on soil nutrition, pest management, and the design of fermentation and drying processes.',
      'The result: coffees with full traceability, measurable quality, and a real story behind every lot.',
    ],
    storyAlt1: 'Cupping spoons',
    storyAlt2: 'Roest roaster in the lab',
    storyAlt3: 'Harvesting on the farm',
    faqTitle: 'Frequently Asked Questions',
    faqSubtitle: 'The questions we get most often about Coffee Five and how we work.',
    faqs: [
      {
        question: 'What does "from seed to cup" mean?',
        answer:
          'It means we take part in every stage of the process: from seed selection and agronomic management on the farm, through fermentation, drying, cupping and roasting, all the way to the final brew. We are not middlemen — we are operators across the entire chain.',
      },
      {
        question: 'Which regions of Colombia do you work in?',
        answer:
          'We work with producers in Nariño, Huila, Cauca, Santander and Tolima. Each region has distinct cup profiles that we select according to our clients’ needs.',
      },
      {
        question: 'Is Coffee Five an exporter or a roaster?',
        answer:
          'Both. We export green coffee for international B2B buyers and we also roast selected lots for direct-to-consumer sales. This model lets us control quality from start to finish.',
      },
      {
        question: 'How do you guarantee the quality of each lot?',
        answer:
          'Every lot passes through our lab in Medellín: physical analysis of the green bean, sample roasting, cupping under SCA protocol, and measurement of moisture and water activity. We only offer lots that meet our minimum standard of 84 points.',
      },
      {
        question: 'Can I visit the farms you work with?',
        answer:
          'Yes. We organize origin trips for buyers and coffee professionals. It is the best way to understand the work behind every lot. Contact us to coordinate dates and logistics.',
      },
      {
        question: 'Do you offer samples before buying?',
        answer:
          'Yes, we send green or roasted coffee samples for evaluation. For green coffee, the cost of the sample is deducted from the final order. Reach out on WhatsApp or by email to request them.',
      },
    ],
    awardsEyebrow: 'Recognition',
    awardFirstPlace: 'First place — Colombia',
    awardSecondPlace: 'Second place — Colombia',
  },
} as const;

export default function AboutPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const c = CONTENT[locale];

  return (
    <main className="pt-20 md:pt-24">
      {/* Hero */}
      <section className="container-site section-padding">
        <p className="text-[10px] tracking-[0.15em] uppercase text-coffee-400 mb-4">{c.heroEyebrow}</p>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-coffee-white max-w-3xl mb-6 leading-tight">
          {c.heroHeading}
        </h1>
        <p className="text-sm md:text-base text-coffee-400 max-w-xl leading-relaxed">
          {c.heroBody}
        </p>
      </section>

      <section className="container-site pb-16 md:pb-24">
        <div className="relative aspect-[16/9] rounded-md overflow-hidden">
          <Image src="/about-hero.jpg" alt={c.heroAlt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 1200px" />
        </div>
      </section>

      {/* Story */}
      <section className="bg-coffee-cream text-coffee-black">
        <div className="container-site section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            <div>
              <p className="text-[10px] tracking-[0.15em] uppercase text-coffee-400 mb-4">{c.storyEyebrow}</p>
              <h2 className="text-2xl md:text-3xl font-bold text-coffee-black mb-6">
                {c.storyHeading}
              </h2>
              <div className="space-y-4 text-sm text-coffee-400 leading-relaxed">
                {c.storyParagraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <div className="relative aspect-[4/3] rounded-sm overflow-hidden">
                <Image src="/about1.jpg" alt={c.storyAlt1} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative aspect-square rounded-sm overflow-hidden">
                  <Image src="/about3.jpg" alt={c.storyAlt2} fill className="object-cover" sizes="(max-width: 1024px) 50vw, 25vw" />
                </div>
                <div className="relative aspect-square rounded-sm overflow-hidden">
                  <Image src="/about2.jpg" alt={c.storyAlt3} fill className="object-cover" sizes="(max-width: 1024px) 50vw, 25vw" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProcessSection />

      <FaqAccordion items={c.faqs} title={c.faqTitle} subtitle={c.faqSubtitle} />

      {/* Awards */}
      <section className="bg-coffee-cream text-coffee-black">
        <div className="container-site section-padding">
          <p className="text-[10px] tracking-[0.15em] uppercase text-coffee-400 mb-4">{c.awardsEyebrow}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border-l-2 border-coffee-black pl-6">
              <h3 className="text-lg font-bold text-coffee-black mb-1">Roasted Regional 2025</h3>
              <p className="text-sm text-coffee-400">{c.awardFirstPlace}</p>
            </div>
            <div className="border-l-2 border-coffee-black pl-6">
              <h3 className="text-lg font-bold text-coffee-black mb-1">V60 Regional 2024</h3>
              <p className="text-sm text-coffee-400">{c.awardSecondPlace}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
