'use client';

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
  humedad: string;
  actividadAgua: string;
  densidad: string;
  criba: string;
  trilla: string;
  notaFinca: string;
};

type LotDrawerProps = {
  lot: LotData;
  onClose: () => void;
};

export function LotDrawer({ lot, onClose }: LotDrawerProps) {
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

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Quick specs */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-3">
            {[
              ['Variedad', lot.variedad],
              ['Proceso', lot.proceso],
              ['Finca', lot.finca],
              ['Región', lot.region],
              ['Altura', `${lot.altura} msnm`],
              ['Puntaje', lot.puntaje],
              ['Disponible', lot.weight],
              ['Precio', lot.price],
            ].map(([label, value]) => (
              <div key={label}>
                <p className="text-[10px] tracking-[0.1em] uppercase text-coffee-400 mb-0.5">{label}</p>
                <p className="text-sm text-coffee-white">{value}</p>
              </div>
            ))}
          </div>

          <p className="text-xs text-coffee-400">
            {ubicacionLabel[lot.ubicacion] || lot.ubicacion}
          </p>

          {lot.notaFinca && (
            <p className="text-xs text-coffee-400/80 italic leading-relaxed">
              {lot.notaFinca}
            </p>
          )}

          <div className="border-t border-coffee-800" />
        </div>

        <div className="p-6 border-t border-coffee-800 space-y-3">
          <a
            href={buildWhatsAppUrl(lotInfo)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] text-white text-[12px] tracking-[0.1em] uppercase rounded-sm hover:bg-[#20bd5a] transition-colors min-h-[44px]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Enquire
          </a>
          <a
            href={buildEnquiryEmailUrl(lotInfo)}
            className="flex items-center justify-center gap-2 w-full py-3 border border-coffee-700 text-coffee-white text-[12px] tracking-[0.1em] uppercase rounded-sm hover:border-coffee-white transition-colors min-h-[44px]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M22 4L12 13 2 4" />
            </svg>
            Enquire
          </a>
        </div>
      </motion.div>
    </>
  );
}
