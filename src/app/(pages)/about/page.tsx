import Image from 'next/image';

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
          <Image src="/about-hero.png" alt="Juan Medina" fill className="object-cover" sizes="(max-width: 768px) 100vw, 1200px" />
        </div>
      </section>

      {/* Story */}
      <section className="bg-coffee-cream text-coffee-black">
        <div className="container-site section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            <div>
              <p className="text-[10px] tracking-[0.15em] uppercase text-coffee-400 mb-4">La historia</p>
              <h2 className="text-2xl md:text-3xl font-bold text-coffee-black mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
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
                <Image src="/about1.png" alt="Cucharas de catación" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative aspect-square rounded-sm overflow-hidden">
                  <Image src="/about3.png" alt="Tostadora Roest en el laboratorio" fill className="object-cover" sizes="(max-width: 1024px) 50vw, 25vw" />
                </div>
                <div className="relative aspect-square rounded-sm overflow-hidden">
                  <Image src="/about2.png" alt="Recolección en finca" fill className="object-cover" sizes="(max-width: 1024px) 50vw, 25vw" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="container-site section-padding">
        <p className="text-[10px] tracking-[0.15em] uppercase text-coffee-400 mb-4">Los cuatro pilares</p>
        <h2 className="text-2xl md:text-3xl font-bold text-coffee-white mb-10">
          Grow · Source · Lab · Logistics
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'Grow', img: '/grow.png', desc: 'Semilla, vivero, cultivo, nutrición, control de plagas, procesamiento, control de calidad.' },
            { title: 'Source', img: '/source.png', desc: 'Red de productores, consultoría, mejores prácticas, sourcing ético y transparente.' },
            { title: 'Lab', img: '/lab.png', desc: 'Análisis sensorial, control de calidad, retroalimentación, mejora continua de prácticas.' },
            { title: 'Logistics', img: '/logistics.png', desc: 'Exportación, importación en EE.UU., transporte terrestre. No vendemos café, vendemos frescura.' },
          ].map((pillar) => (
            <div key={pillar.title} className="bg-coffee-900 rounded-md overflow-hidden">
              <div className="relative aspect-[4/3]">
                <Image src={pillar.img} alt={pillar.title} fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-coffee-white mb-2">{pillar.title}</h3>
                <p className="text-xs text-coffee-400 leading-relaxed">{pillar.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

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
