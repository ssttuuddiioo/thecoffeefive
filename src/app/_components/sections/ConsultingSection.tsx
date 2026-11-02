'use client';

import Image from 'next/image';
import { useScrollReveal } from '@/lib/gsap';
import { photoProps } from '@/lib/photo';
import { SectionTag } from '../SectionTag';
import { useTranslation } from '../LanguageProvider';
import { LocaleLink } from '../LocaleLink';

// One entry per card, keyed into `t.consulting.services`. Barista Pro leads on the
// dark red, which needs white text; the lighter accents keep black. The anchors are
// the section ids on /services (same slugs as the consultation form's service <select>).
const serviceCards = [
  { id: 'baristaPro', bg: '#91171F', fg: '#FFFFFF', href: '/services#barista-pro' },
  { id: 'fincas', bg: '#ECCD3E', fg: '#000000', href: '/services#asesoria-fincas' },
  { id: 'laboratorio', bg: '#4592DB', fg: '#000000', href: '/services#laboratorio' },
  { id: 'formacion', bg: '#0D7C47', fg: '#000000', href: '/services#formacion' },
] as const;

export function ConsultingSection() {
  const { t } = useTranslation();
  const sectionRef = useScrollReveal();

  return (
    <section ref={sectionRef} className="relative bg-coffee-black">
      {/* Accent top bar */}
      <div className="h-3" style={{ backgroundColor: '#4592DB' }} />

      <div className="container-site py-16 md:py-24">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <SectionTag number="06" label={t.consulting.tag} />
          <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {t.consulting.heading}
          </h3>
          <p className="text-sm md:text-base text-white/50 max-w-xl leading-relaxed">
            {t.consulting.body}
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <div>
            <div className="space-y-3">
              {serviceCards.map((card) => {
                const service = t.consulting.services[card.id];
                return (
                  <LocaleLink
                    key={card.id}
                    href={card.href}
                    className="block p-5 rounded-md border border-white/10 hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: card.bg, color: card.fg }}
                  >
                    <h4 className="text-sm font-bold mb-1.5">{service.title} →</h4>
                    <p className="text-xs leading-relaxed opacity-70">{service.description}</p>
                  </LocaleLink>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="relative aspect-square rounded-md overflow-hidden">
              <Image {...photoProps(t.consulting.photo1)} alt={t.consulting.photo1.alt} fill className="object-cover" sizes="(max-width: 1024px) 50vw, 25vw" />
            </div>
            <div className="relative aspect-square rounded-md overflow-hidden">
              <Image {...photoProps(t.consulting.photo2)} alt={t.consulting.photo2.alt} fill className="object-cover" sizes="(max-width: 1024px) 50vw, 25vw" />
            </div>
            <div className="relative aspect-[2/1] rounded-md overflow-hidden col-span-2">
              <Image {...photoProps(t.consulting.photo3)} alt={t.consulting.photo3.alt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
