'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { RoastedCard } from '@/app/_components/RoastedCard';
import { FilterSidebar } from '@/app/_components/FilterSidebar';
import { mockRoastedCoffee } from '@/lib/mock-data';

export default function TiendaPage() {
  const allProducts = [...mockRoastedCoffee, ...mockRoastedCoffee];

  const [keyword, setKeyword] = useState('');
  const [selVariedad, setSelVariedad] = useState<string[]>([]);
  const [selProceso, setSelProceso] = useState<string[]>([]);
  const [selTueste, setSelTueste] = useState<string[]>([]);
  const [selOrigin, setSelOrigin] = useState<string[]>([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    return allProducts.filter(c => {
      if (keyword && !c.variedad.toLowerCase().includes(keyword.toLowerCase()) && !c.origin.toLowerCase().includes(keyword.toLowerCase())) return false;
      if (selVariedad.length && !selVariedad.includes(c.variedad)) return false;
      if (selProceso.length && !selProceso.includes(c.proceso)) return false;
      if (selTueste.length && !selTueste.includes(c.tueste)) return false;
      if (selOrigin.length && !selOrigin.includes(c.origin)) return false;
      return true;
    });
  }, [keyword, selVariedad, selProceso, selTueste, selOrigin]);

  const availableFor = useMemo(() => {
    const check = (exclude: string) => {
      return allProducts.filter(c => {
        if (keyword && !c.variedad.toLowerCase().includes(keyword.toLowerCase()) && !c.origin.toLowerCase().includes(keyword.toLowerCase())) return false;
        if (exclude !== 'variedad' && selVariedad.length && !selVariedad.includes(c.variedad)) return false;
        if (exclude !== 'proceso' && selProceso.length && !selProceso.includes(c.proceso)) return false;
        if (exclude !== 'tueste' && selTueste.length && !selTueste.includes(c.tueste)) return false;
        if (exclude !== 'origin' && selOrigin.length && !selOrigin.includes(c.origin)) return false;
        return true;
      });
    };

    return {
      variedad: Array.from(new Set(check('variedad').map(c => c.variedad))).sort(),
      proceso: Array.from(new Set(check('proceso').map(c => c.proceso))).sort(),
      tueste: Array.from(new Set(check('tueste').map(c => c.tueste))).sort(),
      origin: Array.from(new Set(check('origin').map(c => c.origin))).sort(),
    };
  }, [keyword, selVariedad, selProceso, selTueste, selOrigin]);

  const clearAll = () => {
    setKeyword('');
    setSelVariedad([]);
    setSelProceso([]);
    setSelTueste([]);
    setSelOrigin([]);
  };

  const filterSections = [
    { key: 'variedad', label: 'Variedad', options: availableFor.variedad, selected: selVariedad, onChange: setSelVariedad },
    { key: 'proceso', label: 'Proceso', options: availableFor.proceso, selected: selProceso, onChange: setSelProceso },
    { key: 'tueste', label: 'Tueste', options: availableFor.tueste, selected: selTueste, onChange: setSelTueste },
    { key: 'origin', label: 'Origen', options: availableFor.origin, selected: selOrigin, onChange: setSelOrigin },
  ];

  const sidebarContent = (
    <FilterSidebar
      keyword={keyword}
      onKeywordChange={setKeyword}
      sections={filterSections}
      onClear={clearAll}
    />
  );

  return (
    <main className="pt-20 md:pt-24">
      <div className="container-site section-padding">
        <p className="text-[10px] tracking-[0.15em] uppercase text-coffee-400 mb-4">Tostado</p>
        <h1 className="text-3xl md:text-4xl font-bold text-coffee-white mb-4">Café Tostado</h1>
        <p className="text-sm text-coffee-400 mb-8 max-w-lg">
          Café de especialidad tostado por Juan. Frescura garantizada — tostamos sobre pedido.
        </p>

        {/* Mobile filter toggle */}
        <button
          onClick={() => setMobileFiltersOpen(true)}
          className="lg:hidden mb-6 px-5 py-2.5 border border-coffee-700 text-coffee-white text-[11px] tracking-[0.1em] uppercase rounded-sm"
        >
          Filtrar
        </button>

        {/* Sidebar + Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-10">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block sticky top-28 self-start max-h-[calc(100vh-8rem)] overflow-y-auto pr-4 scrollbar-thin">
            {sidebarContent}
          </aside>

          {/* Product grid */}
          <div>
            <p className="text-xs text-coffee-400 mb-4">{filtered.length} cafés</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((coffee, i) => (
                <Link key={`${coffee.variedad}-${i}`} href={`/tostado/${coffee.variedad.toLowerCase().replace(/\s+/g, '-')}`}>
                  <RoastedCard {...coffee} />
                </Link>
              ))}
            </div>
            {filtered.length === 0 && (
              <p className="text-coffee-400 text-sm py-20 text-center">No se encontraron cafés con estos filtros.</p>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
              onClick={() => setMobileFiltersOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[300px] bg-coffee-900 z-50 p-6 overflow-y-auto lg:hidden"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm font-bold text-coffee-white">Filtros</span>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="text-coffee-400 hover:text-coffee-white text-lg"
                >
                  ✕
                </button>
              </div>
              {sidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
