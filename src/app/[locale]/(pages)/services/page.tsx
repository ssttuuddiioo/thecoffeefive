import Image from 'next/image';
import { FaqAccordion } from '@/app/_components/FaqAccordion';
import { getDictionary } from '@/config/dictionaries';
import { photoProps } from '@/lib/photo';

export default function ServicesPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as import('@/config/i18n').Locale;
  const c = getDictionary(locale).services;

  return (
    <main className="pt-20 md:pt-24">
      {/* Hero with background photo */}
      <section className="relative h-[60vh] md:h-[70vh] lg:h-[80vh] flex items-end">
        <Image
          {...photoProps(c.heroPhoto)} alt={c.heroPhoto.alt}
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
            <Image {...photoProps(c.farmPhoto)} alt={c.farmPhoto.alt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
        </div>

        <div id="laboratorio" className="scroll-mt-20 md:scroll-mt-24 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-16">
          <div className="relative aspect-[4/3] rounded-md overflow-hidden order-2 lg:order-1">
            <Image {...photoProps(c.labPhoto)} alt={c.labPhoto.alt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
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
            <Image {...photoProps(c.trainingPhoto)} alt={c.trainingPhoto.alt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
        </div>
      </section>

      {/* Barista Pro */}
      <section id="barista-pro" className="scroll-mt-20 md:scroll-mt-24 border-y border-coffee-800 bg-coffee-900">
        <div className="container-site section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative aspect-[4/5] rounded-md overflow-hidden order-2 lg:order-1">
              <Image
                {...photoProps(c.baristaPro.photo)} alt={c.baristaPro.photo.alt}
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
