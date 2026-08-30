import Image from 'next/image';
import { FaqAccordion } from '@/app/_components/FaqAccordion';

const CONTENT = {
  es: {
    heroEyebrow: 'Consultoría y Servicios',
    heroTitle: 'Ayudamos a los productores a mejorar la calidad — con resultados medibles.',
    heroBody:
      'Típicamente 1–2 puntos de mejora en puntaje de taza a través de optimización de procesos, sin inversión de capital mayor.',
    heroCta: 'Agenda una Consulta',
    farm: {
      title: 'Asesoría a Fincas',
      paragraphs: [
        'Trabajamos directamente con productores en sus fincas. Análisis de suelos, planes de nutrición, diseño de procesos de fermentación y secado adaptados a las condiciones específicas de cada finca.',
        'Adaptación al cambio climático, manejo integrado de plagas, y selección de variedades para maximizar calidad y productividad.',
      ],
      cta: 'Consultar',
      knowMore: 'Quiero Saber Más',
      mailSubject: 'Asesoría a Fincas — Quiero saber más',
    },
    lab: {
      title: 'Laboratorio — Medellín',
      paragraphs: [
        'Lab propio equipado con tostadora de muestra, trilladora, máquina de espresso, medición de humedad, color, granulometría, y mesa de catación profesional.',
        'Control de calidad completo: análisis físico del grano verde, tueste de muestra, catación bajo protocolo SCA, y retroalimentación directa al productor.',
      ],
      cta: 'Agendar Visita',
      knowMore: 'Quiero Saber Más',
      mailSubject: 'Laboratorio — Quiero saber más',
    },
    training: {
      title: 'Formación',
      paragraphs: [
        'Curso semilla a taza — catación, tueste, compra de verde. Herramientas prácticas para que productores, tostadores y compradores tomen mejores decisiones.',
        'Formación personalizada según necesidades: desde productores que quieren entender mejor la calidad de su café, hasta tostadores que buscan mejorar su sourcing.',
      ],
      cta: 'Inscribirse',
      knowMore: 'Quiero Saber Más',
      mailSubject: 'Formación — Quiero saber más',
    },
    baristaPro: {
      eyebrow: 'Formación Avanzada',
      title: 'Barista Pro',
      paragraphs: [
        'En Barista Pro, vamos a aprender a identificar todas las variables que se involucran en la extracción del café, y además las vamos a explorar a fondo hasta entender el papel que juega cada una de ellas en el precolado. Vamos a volvernos unos maestros en la interpretación del café tostado, vamos a entender el agua, vamos a saber interpretar los métodos y los filtros, aprenderemos técnicas de vertido y sus implicaciones en la extracción.',
        'Todo un mundo alrededor de la física y la química, además de la dinámica de fluidos y la termodinámica que se involucran al preparar una taza de café.',
      ],
      cta: 'Quiero Saber Más',
      mailSubject: 'Barista Pro — Quiero saber más',
      imageAlt: 'Juan Medina preparando café en el brew bar',
    },
    faqTitle: 'Preguntas Frecuentes',
    faqSubtitle: 'Resolvemos las dudas más comunes sobre nuestros servicios de consultoría.',
    faqs: [
      {
        question: '¿Cuánto tiempo toma ver resultados en la calidad del café?',
        answer:
          'Típicamente entre una y dos cosechas. Los ajustes en fermentación y secado pueden mostrar mejoras inmediatas, mientras que cambios en nutrición de suelos y manejo agronómico se reflejan en la siguiente cosecha. En promedio logramos 1–2 puntos de mejora en puntaje de taza.',
      },
      {
        question: '¿Necesito una inversión grande para empezar?',
        answer:
          'No. Nuestro enfoque se basa en optimizar los recursos que ya tienes — ajustes en procesos, tiempos de fermentación, métodos de secado. No requiere infraestructura nueva ni equipos costosos para comenzar a ver mejoras.',
      },
      {
        question: '¿Cómo funciona la asesoría a fincas?',
        answer:
          'Empezamos con una visita de diagnóstico para evaluar suelos, infraestructura, y procesos actuales. Luego diseñamos un plan personalizado con metas claras y medibles. Hacemos seguimiento periódico — presencial y remoto — hasta alcanzar los objetivos.',
      },
      {
        question: '¿Los cursos de formación son presenciales o virtuales?',
        answer:
          'Ambos. Los cursos prácticos de catación y tueste son presenciales en nuestro laboratorio en Medellín. También ofrecemos sesiones virtuales de consultoría y formación teórica para productores en zonas remotas.',
      },
      {
        question: '¿Trabajan solo con productores colombianos?',
        answer:
          'Nuestro enfoque principal es Colombia, pero hemos asesorado productores en otros países de la región. Si tienes un proyecto fuera de Colombia, contáctanos para evaluar cómo podemos ayudarte.',
      },
      {
        question: '¿Cuál es el costo de una consulta inicial?',
        answer:
          'La primera conversación es sin costo — queremos entender tu situación antes de proponer un plan. Los costos dependen del alcance del proyecto. Completa el formulario de contacto y te enviaremos una propuesta detallada.',
      },
    ],
    heroImageAlt: 'Juan Medina en consultoría de café',
    farmImageAlt: 'Bultos de café verde en costal de fique',
    labImageAlt: 'Muestras de café verde para análisis de calidad',
    trainingImageAlt: 'Juan en la tostadora Diedrich',
    formTitle: 'Agenda una Consulta',
    formBody: 'Cuéntanos sobre tu proyecto y te responderemos en menos de 24 horas.',
    labelName: 'Nombre',
    labelEmail: 'Email',
    labelService: 'Servicio de Interés',
    labelMessage: 'Mensaje',
    optionSelect: 'Seleccionar...',
    optionFarm: 'Asesoría a Fincas',
    optionLab: 'Laboratorio',
    optionTraining: 'Formación',
    optionBaristaPro: 'Barista Pro',
    optionOther: 'Otro',
    submit: 'Enviar',
  },
  en: {
    heroEyebrow: 'Consulting & Services',
    heroTitle: 'Helping producers improve quality — with measurable results.',
    heroBody:
      'Typically a 1–2 point improvement in cup score through process optimization, with no major capital investment.',
    heroCta: 'Book a Consultation',
    farm: {
      title: 'Farm Consulting',
      paragraphs: [
        'We work directly with producers on their farms. Soil analysis, nutrition plans, and fermentation and drying process design tailored to each farm’s specific conditions.',
        'Climate change adaptation, integrated pest management, and variety selection to maximize quality and productivity.',
      ],
      cta: 'Get in Touch',
      knowMore: 'I Want to Know More',
      mailSubject: 'Farm Consulting — I want to know more',
    },
    lab: {
      title: 'Lab — Medellín',
      paragraphs: [
        'Our own lab equipped with a sample roaster, huller, espresso machine, and measurement of moisture, color, and particle size, plus a professional cupping table.',
        'Complete quality control: physical analysis of the green bean, sample roasting, cupping under SCA protocol, and direct feedback to the producer.',
      ],
      cta: 'Book a Visit',
      knowMore: 'I Want to Know More',
      mailSubject: 'Lab — I want to know more',
    },
    training: {
      title: 'Training',
      paragraphs: [
        'Seed-to-cup course — cupping, roasting, green buying. Practical tools that help producers, roasters, and buyers make better decisions.',
        'Personalized training tailored to your needs: from producers who want to better understand their coffee’s quality to roasters looking to improve their sourcing.',
      ],
      cta: 'Enroll',
      knowMore: 'I Want to Know More',
      mailSubject: 'Training — I want to know more',
    },
    baristaPro: {
      eyebrow: 'Advanced Training',
      title: 'Barista Pro',
      paragraphs: [
        'In Barista Pro we learn to identify every variable involved in coffee extraction, and we explore each one in depth until we understand the role it plays in the brew. We become masters at reading roasted coffee, we come to understand water, we learn to interpret brewing methods and filters, and we work through pouring techniques and their implications for extraction.',
        'A whole world of physics and chemistry, plus the fluid dynamics and thermodynamics involved in brewing a cup of coffee.',
      ],
      cta: 'I Want to Know More',
      mailSubject: 'Barista Pro — I want to know more',
      imageAlt: 'Juan Medina brewing coffee at the brew bar',
    },
    faqTitle: 'Frequently Asked Questions',
    faqSubtitle: 'We answer the most common questions about our consulting services.',
    faqs: [
      {
        question: 'How long does it take to see results in coffee quality?',
        answer:
          'Typically between one and two harvests. Adjustments to fermentation and drying can show immediate improvements, while changes to soil nutrition and agronomic management show up in the next harvest. On average we achieve a 1–2 point improvement in cup score.',
      },
      {
        question: 'Do I need a large investment to get started?',
        answer:
          'No. Our approach is based on optimizing the resources you already have — process adjustments, fermentation times, drying methods. It requires no new infrastructure or expensive equipment to start seeing improvements.',
      },
      {
        question: 'How does farm consulting work?',
        answer:
          'We start with a diagnostic visit to assess soils, infrastructure, and current processes. Then we design a personalized plan with clear, measurable goals. We follow up regularly — in person and remotely — until the objectives are reached.',
      },
      {
        question: 'Are the training courses in person or online?',
        answer:
          'Both. The hands-on cupping and roasting courses are held in person at our lab in Medellín. We also offer virtual consulting sessions and theoretical training for producers in remote areas.',
      },
      {
        question: 'Do you only work with Colombian producers?',
        answer:
          'Our main focus is Colombia, but we have advised producers in other countries in the region. If you have a project outside Colombia, reach out so we can assess how we can help.',
      },
      {
        question: 'What is the cost of an initial consultation?',
        answer:
          'The first conversation is free — we want to understand your situation before proposing a plan. Costs depend on the scope of the project. Fill out the contact form and we will send you a detailed proposal.',
      },
    ],
    heroImageAlt: 'Juan Medina en consultoría de café',
    farmImageAlt: 'Bultos de café verde en costal de fique',
    labImageAlt: 'Muestras de café verde para análisis de calidad',
    trainingImageAlt: 'Juan en la tostadora Diedrich',
    formTitle: 'Book a Consultation',
    formBody: 'Tell us about your project and we will get back to you within 24 hours.',
    labelName: 'Name',
    labelEmail: 'Email',
    labelService: 'Service of Interest',
    labelMessage: 'Message',
    optionSelect: 'Select...',
    optionFarm: 'Farm Consulting',
    optionLab: 'Lab',
    optionTraining: 'Training',
    optionBaristaPro: 'Barista Pro',
    optionOther: 'Other',
    submit: 'Send',
  },
} as const;

export default function ServicesPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as import('@/config/i18n').Locale;
  const c = CONTENT[locale];

  return (
    <main className="pt-20 md:pt-24">
      {/* Hero with background photo */}
      <section className="relative h-[60vh] md:h-[70vh] lg:h-[80vh] flex items-end">
        <Image
          src="/process-1.jpg"
          alt={c.heroImageAlt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-coffee-black/80 via-coffee-black/30 to-transparent" />
        <div className="container-site relative z-10 pb-12 md:pb-16 lg:pb-20">
          <p className="text-[10px] tracking-[0.15em] uppercase text-coffee-400 mb-4">{c.heroEyebrow}</p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-coffee-white max-w-3xl mb-6 leading-tight">
            {c.heroTitle}
          </h1>
          <p className="text-sm md:text-base text-coffee-300 max-w-xl leading-relaxed mb-8">
            {c.heroBody}
          </p>
          <a
            href="#consulta"
            className="inline-block px-8 py-3 border border-coffee-white text-coffee-white text-[12px] tracking-[0.1em] uppercase rounded-full hover:bg-coffee-white/10 transition-colors min-h-[44px] font-semibold"
          >
            {c.heroCta}
          </a>
        </div>
      </section>

      {/* Detail sections */}
      <section className="container-site section-padding">
        <div id="asesoria-fincas" className="scroll-mt-20 md:scroll-mt-24 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-16">
          <div>
            <h2 className="text-2xl font-bold text-coffee-white mb-4">{c.farm.title}</h2>
            <div className="space-y-4 text-sm text-coffee-400 leading-relaxed">
              {c.farm.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#consulta" className="inline-flex items-center px-6 py-3 bg-coffee-orange text-coffee-black text-[12px] tracking-[0.1em] uppercase rounded-sm hover:bg-coffee-orange/90 transition-colors min-h-[44px]">
                {c.farm.cta}
              </a>
              <a
                href={`mailto:hello@thecoffeefive.com?subject=${encodeURIComponent(c.farm.mailSubject)}`}
                className="inline-flex items-center px-6 py-3 border border-coffee-white/40 text-coffee-white text-[12px] tracking-[0.1em] uppercase rounded-sm hover:bg-coffee-white/10 transition-colors min-h-[44px]"
              >
                {c.farm.knowMore}
              </a>
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-md overflow-hidden">
            <Image src="/consulting-9.jpg" alt={c.farmImageAlt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
        </div>

        <div id="laboratorio" className="scroll-mt-20 md:scroll-mt-24 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-16">
          <div className="relative aspect-[4/3] rounded-md overflow-hidden order-2 lg:order-1">
            <Image src="/consulting-10.jpg" alt={c.labImageAlt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-2xl font-bold text-coffee-white mb-4">{c.lab.title}</h2>
            <div className="space-y-4 text-sm text-coffee-400 leading-relaxed">
              {c.lab.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#consulta" className="inline-flex items-center px-6 py-3 bg-coffee-orange text-coffee-black text-[12px] tracking-[0.1em] uppercase rounded-sm hover:bg-coffee-orange/90 transition-colors min-h-[44px]">
                {c.lab.cta}
              </a>
              <a
                href={`mailto:hello@thecoffeefive.com?subject=${encodeURIComponent(c.lab.mailSubject)}`}
                className="inline-flex items-center px-6 py-3 border border-coffee-white/40 text-coffee-white text-[12px] tracking-[0.1em] uppercase rounded-sm hover:bg-coffee-white/10 transition-colors min-h-[44px]"
              >
                {c.lab.knowMore}
              </a>
            </div>
          </div>
        </div>

        <div id="formacion" className="scroll-mt-20 md:scroll-mt-24 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <div>
            <h2 className="text-2xl font-bold text-coffee-white mb-4">{c.training.title}</h2>
            <div className="space-y-4 text-sm text-coffee-400 leading-relaxed">
              {c.training.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#consulta" className="inline-flex items-center px-6 py-3 bg-coffee-orange text-coffee-black text-[12px] tracking-[0.1em] uppercase rounded-sm hover:bg-coffee-orange/90 transition-colors min-h-[44px]">
                {c.training.cta}
              </a>
              <a
                href={`mailto:hello@thecoffeefive.com?subject=${encodeURIComponent(c.training.mailSubject)}`}
                className="inline-flex items-center px-6 py-3 border border-coffee-white/40 text-coffee-white text-[12px] tracking-[0.1em] uppercase rounded-sm hover:bg-coffee-white/10 transition-colors min-h-[44px]"
              >
                {c.training.knowMore}
              </a>
            </div>
          </div>
          <div className="relative aspect-[4/3] lg:aspect-[3/4] rounded-md overflow-hidden">
            <Image src="/consulting-11.jpg" alt={c.trainingImageAlt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
        </div>
      </section>

      {/* Barista Pro */}
      <section id="barista-pro" className="scroll-mt-20 md:scroll-mt-24 border-y border-coffee-800 bg-coffee-900">
        <div className="container-site section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative aspect-[4/5] rounded-md overflow-hidden order-2 lg:order-1">
              <Image
                src="/baristapro.jpeg"
                alt={c.baristaPro.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="order-1 lg:order-2">
              <p className="text-[10px] tracking-[0.15em] uppercase text-coffee-400 mb-4">
                {c.baristaPro.eyebrow}
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-coffee-white mb-4">
                {c.baristaPro.title}
              </h2>
              <div className="space-y-4 text-sm text-coffee-400 leading-relaxed">
                {c.baristaPro.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <a
                href={`mailto:hello@thecoffeefive.com?subject=${encodeURIComponent(c.baristaPro.mailSubject)}`}
                className="inline-flex items-center mt-8 px-8 py-3 bg-coffee-cream text-coffee-black text-[12px] tracking-[0.1em] uppercase rounded-sm hover:bg-coffee-white transition-colors min-h-[44px] font-semibold"
              >
                {c.baristaPro.cta}
              </a>
            </div>
          </div>
        </div>
      </section>

      <FaqAccordion items={c.faqs} title={c.faqTitle} subtitle={c.faqSubtitle} />

      {/* Consultation Form */}
      <section id="consulta" className="bg-coffee-cream text-coffee-black">
        <div className="container-site py-24 md:py-32 lg:py-40">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-coffee-black mb-2 text-center">{c.formTitle}</h2>
            <p className="text-sm text-coffee-400 mb-10 text-center">
              {c.formBody}
            </p>
            <form action="https://formsubmit.co/your-email@example.com" method="POST" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-[11px] tracking-[0.1em] uppercase text-coffee-400 mb-2">{c.labelName}</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 bg-white border border-coffee-200 rounded-sm text-sm text-coffee-black focus:outline-none focus:border-coffee-orange transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-[11px] tracking-[0.1em] uppercase text-coffee-400 mb-2">{c.labelEmail}</label>
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
                <label htmlFor="service" className="block text-[11px] tracking-[0.1em] uppercase text-coffee-400 mb-2">{c.labelService}</label>
                <select
                  id="service"
                  name="service"
                  required
                  className="w-full px-4 py-3 bg-white border border-coffee-200 rounded-sm text-sm text-coffee-black focus:outline-none focus:border-coffee-orange transition-colors"
                >
                  <option value="">{c.optionSelect}</option>
                  <option value="asesoria-fincas">{c.optionFarm}</option>
                  <option value="laboratorio">{c.optionLab}</option>
                  <option value="formacion">{c.optionTraining}</option>
                  <option value="barista-pro">{c.optionBaristaPro}</option>
                  <option value="otro">{c.optionOther}</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-[11px] tracking-[0.1em] uppercase text-coffee-400 mb-2">{c.labelMessage}</label>
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
                  {c.submit}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
