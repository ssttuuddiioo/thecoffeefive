'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { slideRightVariants, springSmooth } from '@/lib/framer';
import { buildWhatsAppUrl, buildEnquiryEmailUrl } from '@/lib/whatsapp';
import { procesoColorMap } from '@/lib/mock-data';

type LotData = {
  name: string;
  weight: string;
  price: string;
  proceso: string;
  variedad: string;
  finca: string;
  altura: string;
  puntaje: string;
  region: string;
  ubicacion: string;
  color: string;
};

type LotDrawerProps = {
  lot: LotData;
  onClose: () => void;
  onAddToList: () => void;
};

export function LotDrawer({ lot, onClose, onAddToList }: LotDrawerProps) {
  const lotInfo = {
    name: lot.name,
    variedad: lot.variedad,
    proceso: lot.proceso,
    finca: lot.finca,
    altura: lot.altura,
    puntaje: lot.puntaje,
    price: lot.price,
    quantity: lot.weight,
    ubicacion: lot.ubicacion,
  };

  const ubicacionLabel: Record<string, string> = {
    colombia: '📍 Colombia',
    en_transito: '🚢 En tránsito',
    landed_us: '📦 EE.UU.',
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 z-40"
        onClick={onClose}
      />
      <motion.div
        variants={slideRightVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={springSmooth}
        className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-coffee-900 z-50 flex flex-col"
      >
        <div className="flex items-center justify-between p-6 border-b border-coffee-800">
          <div>
            <span
              className="inline-block text-[10px] tracking-[0.1em] uppercase px-2.5 py-0.5 rounded-full text-white font-medium mb-1"
              style={{ backgroundColor: procesoColorMap[lot.proceso] || lot.color }}
            >
              {lot.proceso}
            </span>
            <h2 className="text-lg font-bold text-coffee-white">{lot.name}</h2>
          </div>
          <button onClick={onClose} className="text-coffee-400 hover:text-coffee-white min-h-[44px] min-w-[44px] flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 mb-6">
            {[
              ['Variedad', lot.variedad],
              ['Proceso', lot.proceso],
              ['Finca', lot.finca],
              ['Región', lot.region],
              ['Altura', `${lot.altura} msnm`],
              ['Puntaje', `${lot.puntaje} pts`],
              ['Disponible', lot.weight],
              ['Precio', lot.price],
            ].map(([label, value]) => (
              <div key={label}>
                <p className="text-[10px] tracking-[0.1em] uppercase text-coffee-400 mb-0.5">{label}</p>
                <p className="text-sm text-coffee-white">{value}</p>
              </div>
            ))}
          </div>

          <p className="text-xs text-coffee-400 mb-1">
            {ubicacionLabel[lot.ubicacion] || lot.ubicacion}
          </p>
        </div>

        <div className="p-6 border-t border-coffee-800 space-y-3">
          <a
            href={buildWhatsAppUrl(lotInfo)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] text-white text-[12px] tracking-[0.1em] uppercase rounded-sm hover:bg-[#20bd5a] transition-colors min-h-[44px]"
          >
            WhatsApp
          </a>
          <a
            href={buildEnquiryEmailUrl(lotInfo)}
            className="flex items-center justify-center gap-2 w-full py-3 border border-coffee-700 text-coffee-white text-[12px] tracking-[0.1em] uppercase rounded-sm hover:border-coffee-white transition-colors min-h-[44px]"
          >
            Email
          </a>
          <button
            onClick={onAddToList}
            className="w-full py-3 bg-coffee-800 text-coffee-white text-[12px] tracking-[0.1em] uppercase rounded-sm hover:bg-coffee-700 transition-colors min-h-[44px]"
          >
            + Agregar a lista
          </button>
          <Link
            href={`/cafe-verde/${lot.name.toLowerCase().replace(/\s+/g, '-')}`}
            className="block text-center text-[11px] tracking-wide text-coffee-400 hover:text-coffee-white transition-colors pt-2 min-h-[44px] flex items-center justify-center"
          >
            Ver detalles completos →
          </Link>
        </div>
      </motion.div>
    </>
  );
}
