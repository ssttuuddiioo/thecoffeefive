'use client';

import { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LotCard } from '@/app/_components/LotCard';
import { LotDrawer } from '@/app/_components/LotDrawer';
import { FilterSidebar } from '@/app/_components/FilterSidebar';
import { useTranslation } from '@/app/_components/LanguageProvider';
import { procesoLabel } from '@/lib/mock-data';
import type { GreenLot } from '@/types/content';

const PUNTAJE_RANGES = ['83–85', '86–88', '89–91', '92+'];
const ALTURA_RANGES = ['< 1,700', '1,700–1,899', '1,900–2,099', '2,100+'];

function getPuntajeRange(score: string): string {
  const n = parseInt(score.replace(/[^0-9]/g, ''), 10);
  if (n >= 92) return '92+';
  if (n >= 89) return '89–91';
  if (n >= 86) return '86–88';
  return '83–85';
}

function getAlturaRange(altura: string): string {
  const n = parseInt(altura.replace(/,/g, ''), 10);
  if (n >= 2100) return '2,100+';
  if (n >= 1900) return '1,900–2,099';
  if (n >= 1700) return '1,700–1,899';
  return '< 1,700';
}

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

  const [weightRange, setWeightRange] = useState<[number, number]>([200, 1000]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const UBICACION_LABELS = useMemo<Record<string, string>>(
    () => ({
      colombia: t.cafeVerde.ubicacionColombia,
      en_transito: t.cafeVerde.ubicacionTransito,
      landed_us: t.cafeVerde.ubicacionLandedUs,
    }),
    [t],
  );

  // Filter lots
  const filtered = useMemo(() => {
    return lots.filter(l => {
      if (keyword && !l.name.toLowerCase().includes(keyword.toLowerCase())) return false;
      if (selProceso.length && !selProceso.includes(procesoLabel(l.proceso, locale))) return false;
      if (selVariedad.length && !selVariedad.includes(l.variedad)) return false;
      if (selRegion.length && !selRegion.includes(l.region)) return false;
      if (selUbicacion.length && !selUbicacion.includes(UBICACION_LABELS[l.ubicacion])) return false;
      if (selPuntaje.length && !selPuntaje.includes(getPuntajeRange(l.puntaje))) return false;
      if (selAltura.length && !selAltura.includes(getAlturaRange(l.altura))) return false;
      if (selFinca.length && !selFinca.includes(l.finca)) return false;
      const w = parseInt(l.weight.replace(/,/g, ''), 10);
      if (w < weightRange[0] || w > weightRange[1]) return false;
      return true;
    });
  }, [lots, keyword, selProceso, selVariedad, selRegion, selUbicacion, selPuntaje, selAltura, selFinca, weightRange, UBICACION_LABELS, locale]);

  // Cross-check: available options per filter (exclude own filter)
  const availableFor = useMemo(() => {
    const check = (exclude: string) => {
      return lots.filter(l => {
        if (keyword && !l.name.toLowerCase().includes(keyword.toLowerCase())) return false;
        if (exclude !== 'proceso' && selProceso.length && !selProceso.includes(procesoLabel(l.proceso, locale))) return false;
        if (exclude !== 'variedad' && selVariedad.length && !selVariedad.includes(l.variedad)) return false;
        if (exclude !== 'region' && selRegion.length && !selRegion.includes(l.region)) return false;
        if (exclude !== 'ubicacion' && selUbicacion.length && !selUbicacion.includes(UBICACION_LABELS[l.ubicacion])) return false;
        if (exclude !== 'puntaje' && selPuntaje.length && !selPuntaje.includes(getPuntajeRange(l.puntaje))) return false;
        if (exclude !== 'altura' && selAltura.length && !selAltura.includes(getAlturaRange(l.altura))) return false;
        if (exclude !== 'finca' && selFinca.length && !selFinca.includes(l.finca)) return false;
        return true;
      });
    };

    return {
      proceso: Array.from(new Set(check('proceso').map(l => procesoLabel(l.proceso, locale)))).sort(),
      variedad: Array.from(new Set(check('variedad').map(l => l.variedad))).sort(),
      region: Array.from(new Set(check('region').map(l => l.region))).sort(),
      ubicacion: Array.from(new Set(check('ubicacion').map(l => UBICACION_LABELS[l.ubicacion]))).sort(),
      puntaje: PUNTAJE_RANGES.filter(r => check('puntaje').some(l => getPuntajeRange(l.puntaje) === r)),
      altura: ALTURA_RANGES.filter(r => check('altura').some(l => getAlturaRange(l.altura) === r)),
      finca: Array.from(new Set(check('finca').map(l => l.finca))).sort(),
    };
  }, [lots, keyword, selProceso, selVariedad, selRegion, selUbicacion, selPuntaje, selAltura, selFinca, UBICACION_LABELS, locale]);

  const clearAll = () => {
    setKeyword('');
    setSelProceso([]);
    setSelVariedad([]);
    setSelRegion([]);
    setSelUbicacion([]);
    setSelPuntaje([]);
    setSelAltura([]);
    setSelFinca([]);
    setWeightRange([200, 1000]);
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
      sliders={[
        { label: t.cafeVerde.sliderCantidad, min: 200, max: 1000, value: weightRange, onChange: setWeightRange, unit: ' lbs', defaultOpen: false },
      ]}
      onClear={clearAll}
    />
  );

  return (
    <main className="pt-20 md:pt-24">
      <div className="container-site section-padding">
        <p className="text-[10px] tracking-[0.15em] uppercase text-coffee-400 mb-4">{t.cafeVerde.eyebrow}</p>
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
