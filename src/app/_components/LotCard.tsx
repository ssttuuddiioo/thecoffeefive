'use client';

import { useHoverLift } from '@/lib/gsap';

type LotCardProps = {
  name: string;
  weight: string;
  price: string;
  color: string;
  proceso?: string;
  productor?: string;
  className?: string;
  onClick?: () => void;
  onAddToList?: () => void;
};

export function LotCard({ name, weight, price, color, proceso, productor, className = '', onClick, onAddToList }: LotCardProps) {
  const { ref, onMouseEnter, onMouseLeave } = useHoverLift<HTMLDivElement>({
    childSelector: '.learn-more',
  });

  return (
    <div
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className={`rounded-xl overflow-hidden relative cursor-pointer snap-start will-change-transform aspect-[4/5] md:aspect-[3/4] ${className}`}
      style={{ backgroundColor: color }}
    >
      {/* Productor at top */}
      {productor && (
        <div className="absolute top-5 left-5 right-5">
          <p className="text-[10px] tracking-[0.1em] uppercase text-white/70">{productor}</p>
        </div>
      )}

      {/* Content at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h4 className="text-[17px] font-medium text-white mb-3">{name}</h4>
        <div className="w-8 h-px bg-white/40 mb-3" />
        <div className="flex justify-between text-[11px] tracking-[0.05em] text-white/80">
          <span>{weight}</span>
          <span>{price}</span>
        </div>

        {/* Hover buttons */}
        <button className="learn-more mt-4 w-full py-2 border border-white/60 text-white text-[10px] tracking-[0.1em] uppercase rounded-sm opacity-0 translate-y-2.5">
          Learn More
        </button>
        {onAddToList && (
          <button
            onClick={(e) => { e.stopPropagation(); onAddToList(); }}
            className="learn-more mt-2 w-full py-2 bg-white/20 border border-white/40 text-white text-[10px] tracking-[0.1em] uppercase rounded-sm opacity-0 translate-y-2.5 hover:bg-white/30 transition-colors"
          >
            + Agregar a Lista
          </button>
        )}
      </div>
    </div>
  );
}
