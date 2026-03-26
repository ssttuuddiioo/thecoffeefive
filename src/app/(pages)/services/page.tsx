import Image from 'next/image';
import { FaqAccordion } from '@/app/_components/FaqAccordion';

const servicesFaqs = [
  {
    question: '¿Cuánto tiempo toma ver resultados en la calidad del café?',
    answer: 'Típicamente entre una y dos cosechas. Los ajustes en fermentación y secado pueden mostrar mejoras inmediatas, mientras que cambios en nutrición de suelos y manejo agronómico se reflejan en la siguiente cosecha. En promedio logramos 1–2 puntos de mejora en puntaje de taza.',
  },
  {
    question: '¿Necesito una inversión grande para empezar?',
    answer: 'No. Nuestro enfoque se basa en optimizar los recursos que ya tienes — ajustes en procesos, tiempos de fermentación, métodos de secado. No requiere infraestructura nueva ni equipos costosos para comenzar a ver mejoras.',
  },
  {
    question: '¿Cómo funciona la asesoría a fincas?',
    answer: 'Empezamos con una visita de diagnóstico para evaluar suelos, infraestructura, y procesos actuales. Luego diseñamos un plan personalizado con metas claras y medibles. Hacemos seguimiento periódico — presencial y remoto — hasta alcanzar los objetivos.',
  },
  {
    question: '¿Los cursos de formación son presenciales o virtuales?',
    answer: 'Ambos. Los cursos prácticos de catación y tueste son presenciales en nuestro laboratorio en Medellín. También ofrecemos sesiones virtuales de consultoría y formación teórica para productores en zonas remotas.',
  },
  {
    question: '¿Trabajan solo con productores colombianos?',
    answer: 'Nuestro enfoque principal es Colombia, pero hemos asesorado productores en otros países de la región. Si tienes un proyecto fuera de Colombia, contáctanos para evaluar cómo podemos ayudarte.',
  },
  {
    question: '¿Cuál es el costo de una consulta inicial?',
    answer: 'La primera conversación es sin costo — queremos entender tu situación antes de proponer un plan. Los costos dependen del alcance del proyecto. Completa el formulario de contacto y te enviaremos una propuesta detallada.',
  },
];

export default function ServicesPage() {
  return (
    <main className="pt-20 md:pt-24">
      {/* Hero with background photo */}
      <section className="relative h-[60vh] md:h-[70vh] lg:h-[80vh] flex items-end">
        <Image
          src="/process-1.jpg"
          alt="Juan Medina en consultoría de café"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-coffee-black/80 via-coffee-black/30 to-transparent" />
        <div className="container-site relative z-10 pb-12 md:pb-16 lg:pb-20">
          <p className="text-[10px] tracking-[0.15em] uppercase text-coffee-400 mb-4">Consultoría y Servicios</p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-coffee-white max-w-3xl mb-6 leading-tight">
            Helping producers improve quality — with measurable results.
          </h1>
          <p className="text-sm md:text-base text-coffee-300 max-w-xl leading-relaxed mb-8">
            Típicamente 1–2 puntos de mejora en puntaje de taza a través de optimización de procesos, sin inversión de capital mayor.
          </p>
          <a
            href="#consulta"
            className="inline-block px-8 py-3 border border-coffee-white text-coffee-white text-[12px] tracking-[0.1em] uppercase rounded-full hover:bg-coffee-white/10 transition-colors min-h-[44px] font-semibold"
          >
            Book a Consultation
          </a>
        </div>
      </section>

      {/* Detail sections */}
      <section className="container-site section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-16">
          <div>
            <h2 className="text-2xl font-bold text-coffee-white mb-4">Asesoría a Fincas</h2>
            <div className="space-y-4 text-sm text-coffee-400 leading-relaxed">
              <p>Trabajamos directamente con productores en sus fincas. Análisis de suelos, planes de nutrición, diseño de procesos de fermentación y secado adaptados a las condiciones específicas de cada finca.</p>
              <p>Adaptación al cambio climático, manejo integrado de plagas, y selección de variedades para maximizar calidad y productividad.</p>
            </div>
            <a href="#consulta" className="inline-block mt-6 px-6 py-3 bg-coffee-orange text-coffee-black text-[12px] tracking-[0.1em] uppercase rounded-sm hover:bg-coffee-orange/90 transition-colors min-h-[44px]">
              Consultar
            </a>
          </div>
          <div className="relative aspect-[4/3] rounded-md overflow-hidden">
            <Image src="/consulting-9.jpg" alt="Bultos de café verde en costal de fique" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-16">
          <div className="relative aspect-[4/3] rounded-md overflow-hidden order-2 lg:order-1">
            <Image src="/consulting-10.jpg" alt="Muestras de café verde para análisis de calidad" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-2xl font-bold text-coffee-white mb-4">Laboratorio — Medellín</h2>
            <div className="space-y-4 text-sm text-coffee-400 leading-relaxed">
              <p>Lab propio equipado con tostadora de muestra, trilladora, máquina de espresso, medición de humedad, color, granulometría, y mesa de catación profesional.</p>
              <p>Control de calidad completo: análisis físico del grano verde, tueste de muestra, catación bajo protocolo SCA, y retroalimentación directa al productor.</p>
            </div>
            <a href="#consulta" className="inline-block mt-6 px-6 py-3 bg-coffee-orange text-coffee-black text-[12px] tracking-[0.1em] uppercase rounded-sm hover:bg-coffee-orange/90 transition-colors min-h-[44px]">
              Agendar Visita
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <div>
            <h2 className="text-2xl font-bold text-coffee-white mb-4">Formación</h2>
            <div className="space-y-4 text-sm text-coffee-400 leading-relaxed">
              <p>Curso semilla a taza — catación, tueste, compra de verde. Herramientas prácticas para que productores, tostadores y compradores tomen mejores decisiones.</p>
              <p>Formación personalizada según necesidades: desde productores que quieren entender mejor la calidad de su café, hasta tostadores que buscan mejorar su sourcing.</p>
            </div>
            <a href="#consulta" className="inline-block mt-6 px-6 py-3 bg-coffee-orange text-coffee-black text-[12px] tracking-[0.1em] uppercase rounded-sm hover:bg-coffee-orange/90 transition-colors min-h-[44px]">
              Inscribirse
            </a>
          </div>
          <div className="relative aspect-[4/3] rounded-md overflow-hidden">
            <Image src="/consulting-11.jpg" alt="Juan en la tostadora Diedrich" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
        </div>
      </section>

      <FaqAccordion items={servicesFaqs} subtitle="Resolvemos las dudas más comunes sobre nuestros servicios de consultoría." />

      {/* Consultation Form */}
      <section id="consulta" className="bg-coffee-cream text-coffee-black">
        <div className="container-site py-24 md:py-32 lg:py-40">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-coffee-black mb-2 text-center">Agenda una Consulta</h2>
            <p className="text-sm text-coffee-400 mb-10 text-center">
              Cuéntanos sobre tu proyecto y te responderemos en menos de 24 horas.
            </p>
            <form action="https://formsubmit.co/your-email@example.com" method="POST" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-[11px] tracking-[0.1em] uppercase text-coffee-400 mb-2">Nombre</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 bg-white border border-coffee-200 rounded-sm text-sm text-coffee-black focus:outline-none focus:border-coffee-orange transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-[11px] tracking-[0.1em] uppercase text-coffee-400 mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 bg-white border border-coffee-200 rounded-sm text-sm text-coffee-black focus:outline-none focus:border-coffee-orange transition-colors"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="service" className="block text-[11px] tracking-[0.1em] uppercase text-coffee-400 mb-2">Servicio de Interés</label>
                <select
                  id="service"
                  name="service"
                  required
                  className="w-full px-4 py-3 bg-white border border-coffee-200 rounded-sm text-sm text-coffee-black focus:outline-none focus:border-coffee-orange transition-colors"
                >
                  <option value="">Seleccionar...</option>
                  <option value="asesoria-fincas">Asesoría a Fincas</option>
                  <option value="laboratorio">Laboratorio</option>
                  <option value="formacion">Formación</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-[11px] tracking-[0.1em] uppercase text-coffee-400 mb-2">Mensaje</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full px-4 py-3 bg-white border border-coffee-200 rounded-sm text-sm text-coffee-black focus:outline-none focus:border-coffee-orange transition-colors resize-none"
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="inline-block px-10 py-3 bg-coffee-black text-coffee-white text-[12px] tracking-[0.1em] uppercase rounded-sm hover:bg-coffee-800 transition-colors min-h-[44px] font-semibold"
                >
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
