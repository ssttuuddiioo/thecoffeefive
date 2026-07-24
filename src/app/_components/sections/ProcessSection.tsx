'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useStaggerReveal, useHoverLift } from '@/lib/gsap';
import { withLocale } from '@/config/i18n';
import { SectionTag } from '../SectionTag';
import { useTranslation } from '../LanguageProvider';
import { processSteps } from '@/lib/mock-data';

const stepColors = ['#000000', '#000000', '#000000', '#000000'];

function ProcessCard({
  title,
  description,
  img,
  color,
}: {
  title: string;
  description: string;
  img: string;
  color: string;
}) {
  const { t, locale } = useTranslation();
  const { ref, onMouseEnter, onMouseLeave } = useHoverLift<HTMLAnchorElement>({
    childSelector: '.process-card-hover-reveal',
  });

  return (
    <Link
      href={withLocale(locale, '/process')}
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      data-reveal
      className="rounded-xl overflow-hidden border border-white/10 p-5 will-change-transform cursor-pointer block"
      style={{ backgroundColor: color }}
    >
      <div className="relative aspect-square rounded-md overflow-hidden">
        <Image
          src={img}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>
      <div className="pt-4">
        <h4 className="text-lg font-medium mb-2 text-white">{title}</h4>
        <p className="text-[13px] text-white/70 leading-relaxed">{description}</p>
        <span className="process-card-hover-reveal mt-4 w-full py-2 border border-white/60 text-white text-[10px] tracking-[0.1em] uppercase rounded-sm text-center opacity-0 translate-y-2.5 hover:bg-white/10 transition-colors block">
          {t.process.cardCta}
        </span>
      </div>
    </Link>
  );
}

export function ProcessSection() {
  const { t, locale } = useTranslation();
  const gridRef = useStaggerReveal();

  return (
    <section className="relative bg-coffee-black">
      {/* Accent top bar */}
      <div className="h-3" style={{ backgroundColor: '#ECCD3E' }} />

      <div className="container-site py-16 md:py-24">
        {/* Header row */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-end mb-12 md:mb-16">
          <div>
            <SectionTag number="03" label={t.process.tag} />
            <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {t.process.heading}
            </h3>
            <p className="text-sm md:text-base text-white/50 max-w-xl leading-relaxed">
              {t.process.body}
            </p>
          </div>
          <Link
            href={withLocale(locale, '/process')}
            className="inline-block px-8 py-3 text-[11px] tracking-[0.15em] uppercase font-semibold rounded-sm transition-colors self-start lg:self-end hover:opacity-90"
            style={{ backgroundColor: '#ECCD3E', color: '#000' }}
          >
            {t.process.ctaFull}
          </Link>
        </div>

        {/* Cards */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {t.process.steps.map((step, i) => (
            <ProcessCard
              key={step.title}
              title={step.title}
              description={step.description}
              img={processSteps[i]?.img ?? ''}
              color={stepColors[i % stepColors.length]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
