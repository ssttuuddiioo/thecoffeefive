import Image from 'next/image';
import { ProcessSection } from '@/app/_components/sections/ProcessSection';
import { FaqAccordion } from '@/app/_components/FaqAccordion';
import { getSiteCopy } from '@/sanity/copy';
import type { Locale } from '@/config/i18n';
import { photoProps } from '@/lib/photo';

export default async function AboutPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const c = (await getSiteCopy(locale)).about;

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
          <Image {...photoProps(c.heroPhoto)} alt={c.heroPhoto.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 1200px" />
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
                <Image {...photoProps(c.storyPhoto1)} alt={c.storyPhoto1.alt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative aspect-square rounded-sm overflow-hidden">
                  <Image {...photoProps(c.storyPhoto2)} alt={c.storyPhoto2.alt} fill className="object-cover" sizes="(max-width: 1024px) 50vw, 25vw" />
                </div>
                <div className="relative aspect-square rounded-sm overflow-hidden">
                  <Image {...photoProps(c.storyPhoto3)} alt={c.storyPhoto3.alt} fill className="object-cover" sizes="(max-width: 1024px) 50vw, 25vw" />
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
            {c.awards.map((award) => (
              <div key={award.title} className="border-l-2 border-coffee-black pl-6">
                <h3 className="text-lg font-bold text-coffee-black mb-1">{award.title}</h3>
                <p className="text-sm text-coffee-400">{award.place}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
