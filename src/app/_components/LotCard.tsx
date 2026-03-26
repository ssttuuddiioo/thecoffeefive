'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useHoverLift } from '@/lib/gsap';

type LotCardProps = {
  name: string;
  weight: string;
  price: string;
  color: string;
  proceso?: string;
  productor?: string;
  img?: string;
  detailHref: string;
  className?: string;
  onOverview?: () => void;
};

export function LotCard({
  name,
  weight,
  price,
  color,
  proceso,
  productor,
  img,
  detailHref,
  className = '',
  onOverview,
}: LotCardProps) {
  const { ref, onMouseEnter, onMouseLeave } = useHoverLift<HTMLDivElement>({
    childSelector: '.lot-card-hover-reveal',
  });

  return (
    <Link
      href={detailHref}
      ref={ref as React.Ref<HTMLAnchorElement>}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`rounded-xl overflow-hidden snap-start will-change-transform flex flex-col cursor-pointer ${className}`}
      style={{ backgroundColor: color }}
    >
      {/* Productor at top */}
      {productor && (
        <div className="px-5 pt-5">
          <p className="text-[10px] tracking-[0.1em] uppercase text-white/70">{productor}</p>
        </div>
      )}

      {/* Lot photo */}
      <div className="mx-5 mt-3 aspect-[3/2] bg-black/20 rounded-md overflow-hidden relative">
        {img ? (
          <Image src={img} alt={name} fill className="object-cover" sizes="(max-width: 768px) 65vw, 33vw" />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center text-[10px] tracking-[0.15em] uppercase text-white/40">
            Foto del lote
          </span>
        )}
      </div>

      {/* Content at bottom */}
      <div className="mt-auto p-5">
        <h4 className="text-[17px] font-medium text-white mb-3">{name}</h4>
        <div className="w-8 h-px bg-white/40 mb-3" />
        <div className="flex justify-between text-[11px] tracking-[0.05em] text-white/80">
          <span>{weight}</span>
          <span>{price}</span>
        </div>

        {onOverview && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onOverview();
            }}
            className="lot-card-hover-reveal mt-4 w-full py-2 border border-white/60 text-white text-[10px] tracking-[0.1em] uppercase rounded-sm opacity-0 translate-y-2.5 hover:bg-white/10 transition-colors"
          >
            Resumen
          </button>
        )}
        <span
          className={`lot-card-hover-reveal w-full py-2 border border-white/60 text-white text-[10px] tracking-[0.1em] uppercase rounded-sm text-center opacity-0 translate-y-2.5 hover:bg-white/10 transition-colors block ${onOverview ? 'mt-2' : 'mt-4'}`}
        >
          Ver más
        </span>
      </div>
    </Link>
  );
}
