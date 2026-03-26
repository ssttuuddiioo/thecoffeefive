'use client';

import Image from 'next/image';
import { useHoverLift } from '@/lib/gsap';

type RoastedCardProps = {
  variedad: string;
  img: string;
  origin: string;
  proceso: string;
  tueste: string;
  fermentacion: string;
  perfil: string;
  price: string;
  weight: string;
};

export function RoastedCard({ variedad, img, origin, proceso, tueste, fermentacion, perfil, price, weight }: RoastedCardProps) {
  const { ref, onMouseEnter, onMouseLeave } = useHoverLift<HTMLDivElement>({
    childSelector: '.roasted-card-hover-reveal',
  });

  return (
    <div
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="rounded-xl overflow-hidden border border-transparent p-5 will-change-transform cursor-pointer"
      style={{ backgroundColor: '#000000' }}
    >
      <div className="relative aspect-square rounded-md overflow-hidden">
        <Image src={img} alt={variedad} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" />
      </div>
      <div className="pt-4">
        <h4 className="text-lg font-medium mb-2 text-white">{variedad}</h4>
        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="tag-pill">{origin}</span>
          <span className="tag-pill">{proceso}</span>
          <span className="tag-pill">{tueste}</span>
        </div>
        <p className="text-[13px] text-white/60 mb-1">{fermentacion}</p>
        <p className="text-[13px] text-white/60 mb-3 italic">{perfil}</p>
        <p className="text-sm text-white font-medium tracking-wide">
          {price} · {weight}
        </p>
        <span className="roasted-card-hover-reveal mt-4 w-full py-2 border border-white/60 text-white text-[10px] tracking-[0.1em] uppercase rounded-sm text-center opacity-0 translate-y-2.5 hover:bg-white/10 transition-colors block">
          Ver más
        </span>
      </div>
    </div>
  );
}
