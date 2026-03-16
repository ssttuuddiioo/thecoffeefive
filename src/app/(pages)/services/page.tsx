import { ImagePlaceholder } from '@/app/_components/ImagePlaceholder';
import { consultingServices } from '@/lib/mock-data';

export default function ServicesPage() {
  return (
    <main className="pt-20 md:pt-24">
      <section className="container-site section-padding">
        <p className="text-[10px] tracking-[0.15em] uppercase text-coffee-400 mb-4">Consultoría y Servicios</p>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-coffee-white max-w-3xl mb-6 leading-tight">
          Helping producers improve quality — with measurable results.
        </h1>
        <p className="text-sm md:text-base text-coffee-400 max-w-xl leading-relaxed">
          Típicamente 1–2 puntos de mejora en puntaje de taza a través de optimización de procesos, sin inversión de capital mayor.
        </p>
      </section>

      {/* Service cards */}
      <section className="bg-coffee-cream text-coffee-black">
        <div className="container-site section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {consultingServices.map((service, i) => (
              <div key={service.title} className="bg-white rounded-md overflow-hidden">
                <ImagePlaceholder
                  aspectRatio="16/9"
                  label={['Finca consulting', 'Lab Medellín', 'Workshop'][i]}
                />
                <div className="p-6 md:p-8">
                  <h3 className="text-lg font-bold text-coffee-black mb-3">{service.title}</h3>
                  <p className="text-sm text-coffee-400 leading-relaxed">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
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
          </div>
          <ImagePlaceholder aspectRatio="4/3" label="Finca consulting" className="rounded-md" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-16">
          <ImagePlaceholder aspectRatio="4/3" label="Lab Medellín" className="rounded-md order-2 lg:order-1" />
          <div className="order-1 lg:order-2">
            <h2 className="text-2xl font-bold text-coffee-white mb-4">Laboratorio — Medellín</h2>
            <div className="space-y-4 text-sm text-coffee-400 leading-relaxed">
              <p>Lab propio equipado con tostadora de muestra, trilladora, máquina de espresso, medición de humedad, color, granulometría, y mesa de catación profesional.</p>
              <p>Control de calidad completo: análisis físico del grano verde, tueste de muestra, catación bajo protocolo SCA, y retroalimentación directa al productor.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <div>
            <h2 className="text-2xl font-bold text-coffee-white mb-4">Formación</h2>
            <div className="space-y-4 text-sm text-coffee-400 leading-relaxed">
              <p>Curso semilla a taza — catación, tueste, compra de verde. Herramientas prácticas para que productores, tostadores y compradores tomen mejores decisiones.</p>
              <p>Formación personalizada según necesidades: desde productores que quieren entender mejor la calidad de su café, hasta tostadores que buscan mejorar su sourcing.</p>
            </div>
          </div>
          <ImagePlaceholder aspectRatio="4/3" label="Workshop / formación" className="rounded-md" />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-coffee-cream text-coffee-black">
        <div className="container-site section-padding text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-coffee-black mb-4">¿Listo para mejorar tu café?</h2>
          <p className="text-sm text-coffee-400 mb-8 max-w-md mx-auto">
            Conversemos sobre cómo podemos ayudarte a mejorar la calidad de tu café, optimizar tus procesos, o conectar con productores de confianza.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-3 bg-coffee-black text-coffee-white text-[12px] tracking-[0.1em] uppercase rounded-sm hover:bg-coffee-800 transition-colors min-h-[44px]"
          >
            Contacto
          </a>
        </div>
      </section>
    </main>
  );
}
