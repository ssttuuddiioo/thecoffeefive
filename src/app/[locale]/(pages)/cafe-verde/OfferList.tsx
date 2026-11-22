'use client';

import { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LotCard } from '@/app/_components/LotCard';
import { LotDrawer } from '@/app/_components/LotDrawer';
import { FilterSidebar } from '@/app/_components/FilterSidebar';
import { useTranslation } from '@/app/_components/LanguageProvider';
import { emptyFilters, facetOptions, matchesFilters, type OfferFilters } from '@/lib/offer-filters';
import type { GreenLot } from '@/types/content';

export function OfferList({ lots }: { lots: GreenLot[] }) {
  const { t, locale } = useTranslation();
  const [keyword, setKeyword] = useState('');
  const [selProceso, setSelProceso] = useState<string[]>([]);
  const [selVariedad, setSelVariedad] = useState<string[]>([]);
  const [selRegion, setSelRegion] = useState<string[]>([]);
  const [selUbicacion, setSelUbicacion] = useState<string[]>([]);
  const [selPuntaje, setSelPuntaje] = useState<string[]>([]);
  const [selAltura, setSelAltura] = useState<string[]>([]);
  const [selFinca, setSelFinca] = useState<string[]>([]);
  const [drawerLot, setDrawerLot] = useState<GreenLot | null>(null);

  // Slider spans the lots on offer and starts fully open, so no lot is hidden by default.
  const initialFilters = useMemo(() => emptyFilters(lots), [lots]);
  const weightBounds = initialFilters.weight;
  const [weightRange, setWeightRange] = useState<[number, number]>(weightBounds);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const ctx = useMemo(
    () => ({
      locale,
      statusLabels: {
        colombia: t.cafeVerde.ubicacionColombia,
        en_transito: t.cafeVerde.ubicacionTransito,
        landed_us: t.cafeVerde.ubicacionLandedUs,
      },
    }),
    [t, locale],
  );

  const filters = useMemo<OfferFilters>(
    () => ({
      keyword,
      weight: weightRange,
      proceso: selProceso,
      variedad: selVariedad,
      region: selRegion,
      ubicacion: selUbicacion,
      puntaje: selPuntaje,
      altura: selAltura,
      finca: selFinca,
    }),
    [keyword, weightRange, selProceso, selVariedad, selRegion, selUbicacion, selPuntaje, selAltura, selFinca],
  );

  const filtered = useMemo(() => lots.filter((l) => matchesFilters(l, filters, ctx)), [lots, filters, ctx]);
  const availableFor = useMemo(() => facetOptions(lots, filters, ctx), [lots, filters, ctx]);

  const clearAll = () => {
    setKeyword('');
    setSelProceso([]);
    setSelVariedad([]);
    setSelRegion([]);
    setSelUbicacion([]);
    setSelPuntaje([]);
    setSelAltura([]);
    setSelFinca([]);
    setWeightRange(weightBounds);
  };

  const filterSections = [
    { key: 'proceso', label: t.cafeVerde.filterProceso, options: availableFor.proceso, selected: selProceso, onChange: setSelProceso },
    { key: 'variedad', label: t.cafeVerde.filterVariedad, options: availableFor.variedad, selected: selVariedad, onChange: setSelVariedad },
    { key: 'region', label: t.cafeVerde.filterOrigen, options: availableFor.region, selected: selRegion, onChange: setSelRegion },
    { key: 'ubicacion', label: t.cafeVerde.filterUbicacion, options: availableFor.ubicacion, selected: selUbicacion, onChange: setSelUbicacion, defaultOpen: false },
    { key: 'altura', label: t.cafeVerde.filterAltura, options: availableFor.altura, selected: selAltura, onChange: setSelAltura, defaultOpen: false },
    { key: 'finca', label: t.cafeVerde.filterFinca, options: availableFor.finca, selected: selFinca, onChange: setSelFinca, defaultOpen: false },
  ];

  const sidebarContent = (
    <FilterSidebar
      keyword={keyword}
      onKeywordChange={setKeyword}
      sections={filterSections}
      sliders={
        weightBounds[1] > weightBounds[0]
          ? [{ label: t.cafeVerde.sliderCantidad, min: weightBounds[0], max: weightBounds[1], value: weightRange, onChange: setWeightRange, unit: ' lbs', defaultOpen: false }]
          : []
      }
      onClear={clearAll}
    />
  );

  return (
    <main>
      <div className="container-site below-logo pb-16 md:pb-22 lg:pb-30">
        <h1 className="text-3xl md:text-4xl font-bold text-coffee-white mb-4">{t.cafeVerde.title}</h1>
        <p className="text-sm text-coffee-400 mb-8 max-w-lg">
          {t.cafeVerde.intro}
        </p>

        {/* Mobile filter toggle */}
        <button
          onClick={() => setMobileFiltersOpen(true)}
          className="lg:hidden mb-6 px-5 py-2.5 border border-coffee-700 text-coffee-white text-[11px] tracking-[0.1em] uppercase rounded-sm"
        >
          {t.cafeVerde.filterButton}
        </button>

        {/* Sidebar + Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-10">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block sticky top-28 self-start max-h-[calc(100vh-8rem)] overflow-y-auto pr-4 scrollbar-thin">
            {sidebarContent}
          </aside>

          {/* Lot grid */}
          <div>
            <p className="text-xs text-coffee-400 mb-4">{filtered.length} {t.cafeVerde.lotsCount}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((lot, i) => (
                <LotCard
                  key={`${lot.name}-${i}`}
                  name={lot.name}
                  weight={lot.weight}
                  price={lot.price}
                  color={lot.color}
                  sanityId={lot.sanityId}
                  proceso={lot.proceso}
                  productor={lot.finca}
                  img={lot.img}
                  onOverview={() => setDrawerLot(lot)}
                />
              ))}
            </div>
            {filtered.length === 0 && (
              <p className="text-coffee-400 text-sm py-20 text-center">{t.cafeVerde.empty}</p>
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
                <span className="text-sm font-bold text-coffee-white">{t.cafeVerde.filtersTitle}</span>
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

      {/* Drawer */}
      <AnimatePresence>
        {drawerLot && (
          <LotDrawer
            lot={drawerLot}
            onClose={() => setDrawerLot(null)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
