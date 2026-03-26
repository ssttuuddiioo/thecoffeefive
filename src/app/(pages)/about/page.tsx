import Image from 'next/image';
import { ProcessSection } from '@/app/_components/sections/ProcessSection';
import { FaqAccordion } from '@/app/_components/FaqAccordion';

const aboutFaqs = [
  {
    question: '¿Qué significa "desde la semilla hasta la taza"?',
    answer: 'Significa que participamos en cada etapa del proceso: desde la selección de semillas y el manejo agronómico en finca, pasando por la fermentación, secado, catación, tueste, hasta la preparación final. No somos intermediarios — somos operadores en toda la cadena.',
  },
  {
    question: '¿En qué regiones de Colombia trabajan?',
    answer: 'Trabajamos con productores en Nariño, Huila, Cauca, Santander y Tolima. Cada región tiene perfiles de taza distintos que seleccionamos según las necesidades de nuestros clientes.',
  },
  {
    question: '¿Coffee Five es un exportador o un tostador?',
    answer: 'Ambos. Exportamos café verde para compradores B2B internacionales y también tostamos lotes seleccionados para venta directa al consumidor. El modelo nos permite controlar la calidad de principio a fin.',
  },
  {
    question: '¿Cómo garantizan la calidad de cada lote?',
    answer: 'Cada lote pasa por nuestro laboratorio en Medellín: análisis físico del grano verde, tueste de muestra, catación bajo protocolo SCA, y medición de humedad y actividad de agua. Solo ofrecemos lotes que cumplen nuestro estándar mínimo de 84 puntos.',
  },
  {
    question: '¿Puedo visitar las fincas con las que trabajan?',
    answer: 'Sí. Organizamos visitas de origen para compradores y profesionales del café. Es la mejor manera de entender el trabajo detrás de cada lote. Contáctanos para coordinar fechas y logística.',
  },
  {
    question: '¿Ofrecen muestras antes de comprar?',
    answer: 'Sí, enviamos muestras de café verde o tostado para evaluación. Para café verde, el costo de la muestra se descuenta del pedido final. Escríbenos por WhatsApp o correo para solicitarlas.',
  },
];

export default function AboutPage() {
  return (
    <main className="pt-20 md:pt-24">
      {/* Hero */}
      <section className="container-site section-padding">
        <p className="text-[10px] tracking-[0.15em] uppercase text-coffee-400 mb-4">Sobre Juan Medina</p>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-coffee-white max-w-3xl mb-6 leading-tight">
          Desde la semilla hasta la taza — cada paso con intención.
        </h1>
        <p className="text-sm md:text-base text-coffee-400 max-w-xl leading-relaxed">
          Juan Medina es productor, catador, tostador, barista y exportador. Un profesional del café de especialidad que opera en toda la cadena, desde el cultivo en las montañas de Colombia hasta la taza final.
        </p>
      </section>

      <section className="container-site pb-16 md:pb-24">
        <div className="relative aspect-[16/9] rounded-md overflow-hidden">
          <Image src="/about-hero.jpg" alt="Juan Medina" fill className="object-cover" sizes="(max-width: 768px) 100vw, 1200px" />
        </div>
      </section>

      {/* Story */}
      <section className="bg-coffee-cream text-coffee-black">
        <div className="container-site section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            <div>
              <p className="text-[10px] tracking-[0.15em] uppercase text-coffee-400 mb-4">La historia</p>
              <h2 className="text-2xl md:text-3xl font-bold text-coffee-black mb-6">
                La finca es la base del conocimiento.
              </h2>
              <div className="space-y-4 text-sm text-coffee-400 leading-relaxed">
                <p>
                  Coffee Five nació de la convicción de que la calidad del café empieza mucho antes de la taza. Empieza en el suelo, en la semilla, en las decisiones de cada etapa del proceso.
                </p>
                <p>
                  Juan trabaja directamente con productores en Nariño, Huila, Cauca, Santander y Tolima. No solo compra su café — los asesora en nutrición de suelos, manejo de plagas, diseño de procesos de fermentación y secado.
                </p>
                <p>
                  El resultado: cafés con trazabilidad completa, calidad medible, y una historia real detrás de cada lote.
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="relative aspect-[4/3] rounded-sm overflow-hidden">
                <Image src="/about1.jpg" alt="Cucharas de catación" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative aspect-square rounded-sm overflow-hidden">
                  <Image src="/about3.jpg" alt="Tostadora Roest en el laboratorio" fill className="object-cover" sizes="(max-width: 1024px) 50vw, 25vw" />
                </div>
                <div className="relative aspect-square rounded-sm overflow-hidden">
                  <Image src="/about2.jpg" alt="Recolección en finca" fill className="object-cover" sizes="(max-width: 1024px) 50vw, 25vw" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProcessSection />

      <FaqAccordion items={aboutFaqs} subtitle="Lo que nos preguntan con más frecuencia sobre Coffee Five y nuestro modelo." />

      {/* Awards */}
      <section className="bg-coffee-cream text-coffee-black">
        <div className="container-site section-padding">
          <p className="text-[10px] tracking-[0.15em] uppercase text-coffee-400 mb-4">Reconocimientos</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border-l-2 border-coffee-black pl-6">
              <h3 className="text-lg font-bold text-coffee-black mb-1">Roasted Regional 2025</h3>
              <p className="text-sm text-coffee-400">Primer lugar — Colombia</p>
            </div>
            <div className="border-l-2 border-coffee-black pl-6">
              <h3 className="text-lg font-bold text-coffee-black mb-1">V60 Regional 2024</h3>
              <p className="text-sm text-coffee-400">Segundo lugar — Colombia</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
