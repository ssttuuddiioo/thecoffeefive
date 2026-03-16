'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { LotCard } from '@/app/_components/LotCard';
import { LotDrawer } from '@/app/_components/LotDrawer';
import { mockGreenLots } from '@/lib/mock-data';
import { buildMultiLotWhatsAppUrl, buildMultiLotEmailUrl } from '@/lib/whatsapp';

type GreenLot = typeof mockGreenLots[number];

export default function CafeVerdePage() {
  const [filter, setFilter] = useState('Todos');
  const [drawerLot, setDrawerLot] = useState<GreenLot | null>(null);
  const [enquiryList, setEnquiryList] = useState<GreenLot[]>([]);

  const procesos = ['Todos', ...Array.from(new Set(mockGreenLots.map(l => l.proceso)))];

  const filtered = filter === 'Todos'
    ? mockGreenLots
    : mockGreenLots.filter(l => l.proceso === filter);

  const addToList = (lot: GreenLot) => {
    if (!enquiryList.find(l => l.name === lot.name)) {
      setEnquiryList(prev => [...prev, lot]);
    }
  };

  return (
    <main className="pt-20 md:pt-24">
      <div className="container-site section-padding">
        <p className="text-[10px] tracking-[0.15em] uppercase text-coffee-400 mb-4">Café Verde</p>
        <h1 className="text-3xl md:text-4xl font-bold text-coffee-white mb-4">Offer List</h1>
        <p className="text-sm text-coffee-400 mb-8 max-w-lg">
          Lotes disponibles de café verde de especialidad. Contacta directamente para consultar disponibilidad y precios.
        </p>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {procesos.map(p => (
            <button
              key={p}
              onClick={() => setFilter(p)}
              className={`tab-pill ${filter === p ? 'tab-pill-active' : ''}`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Lot grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((lot, i) => (
            <LotCard
              key={`${lot.name}-${i}`}
              name={lot.name}
              weight={lot.weight}
              price={lot.price}
              color={lot.color}
              proceso={lot.proceso}
              onClick={() => setDrawerLot(lot)}
            />
          ))}
        </div>
      </div>

      {/* Enquiry list bar */}
      {enquiryList.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-coffee-900 border-t border-coffee-700 z-30 p-4">
          <div className="container-site flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-sm text-coffee-white">
              {enquiryList.length} lote{enquiryList.length > 1 ? 's' : ''} en tu lista
            </span>
            <div className="flex gap-3">
              <a
                href={buildMultiLotWhatsAppUrl(enquiryList)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 bg-[#25D366] text-white text-[11px] tracking-[0.1em] uppercase rounded-sm min-h-[44px] flex items-center"
              >
                WhatsApp
              </a>
              <a
                href={buildMultiLotEmailUrl(enquiryList)}
                className="px-5 py-2 border border-coffee-700 text-coffee-white text-[11px] tracking-[0.1em] uppercase rounded-sm min-h-[44px] flex items-center"
              >
                Email
              </a>
              <button
                onClick={() => setEnquiryList([])}
                className="px-3 py-2 text-coffee-400 text-[11px] uppercase min-h-[44px]"
              >
                Limpiar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Drawer */}
      <AnimatePresence>
        {drawerLot && (
          <LotDrawer
            lot={drawerLot}
            onClose={() => setDrawerLot(null)}
            onAddToList={() => {
              addToList(drawerLot);
              setDrawerLot(null);
            }}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
