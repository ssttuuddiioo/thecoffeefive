'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { withLocale } from '@/config/i18n';
import { useHoverLift } from '@/lib/gsap';
import { useTranslation } from '@/app/_components/LanguageProvider';

type RoastedCardProps = {
  slug: string;
  variedad: string;
  img: string;
  imgBack: string;
  origin: string;
  proceso: string;
  tueste: string;
  fermentacion: string;
  perfil: string;
  price: string;
  weight: string;
};

export function RoastedCard({ slug, variedad, img, imgBack, origin, proceso, tueste, fermentacion, perfil, price, weight }: RoastedCardProps) {
  const { t, locale } = useTranslation();
  const [hovered, setHovered] = useState(false);
  const { ref, onMouseEnter, onMouseLeave } = useHoverLift<HTMLAnchorElement>({
    childSelector: '.roasted-card-hover-reveal',
  });

  const handleMouseEnter = () => {
    setHovered(true);
    onMouseEnter();
  };

  const handleMouseLeave = () => {
    setHovered(false);
    onMouseLeave();
  };

  return (
    <Link
      href={withLocale(locale, `/tostado/${slug}`)}
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="block rounded-xl overflow-hidden border border-transparent p-5 will-change-transform cursor-pointer"
      style={{ backgroundColor: '#000000' }}
    >
      <div className="relative aspect-square rounded-md overflow-hidden">
        <Image
          src={img}
          alt={variedad}
          fill
          className={`object-cover transition-opacity duration-500 ${hovered ? 'opacity-0' : 'opacity-100'}`}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <Image
          src={imgBack}
          alt={`${variedad} — back`}
          fill
          className={`object-cover transition-opacity duration-500 ${hovered ? 'opacity-100' : 'opacity-0'}`}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="pt-4">
        <h4 className="text-lg font-medium mb-2 text-white">{variedad}</h4>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {[origin, proceso, tueste].filter(Boolean).map((tag) => (
            <span key={tag} className="tag-pill">{tag}</span>
          ))}
        </div>
        <p className="text-[13px] text-white/60 mb-1">{fermentacion}</p>
        <p className="text-[13px] text-white/60 mb-3 italic">{perfil}</p>
        <p className="text-sm text-white font-medium tracking-wide">
          {price} · {weight}
        </p>
        <span className="roasted-card-hover-reveal mt-4 w-full py-2 border border-white/60 text-white text-[10px] tracking-[0.1em] uppercase rounded-sm text-center opacity-0 translate-y-2.5 hover:bg-white/10 transition-colors block">
          {t.tostado.verMas}
        </span>
      </div>
    </Link>
  );
}
