/**
 * With no filter chosen, every lot on offer must show, whatever its weight, process,
 * score or location looks like. This is the check that would have caught the
 * quantity slider hiding 8 of Juan's 10 lots.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { buildNewLot, parseLotCsvText, prepareRows } from '@/sanity/lib/lot-csv';
import { emptyFilters, facetOptions, matchesFilters, type FilterContext } from '@/lib/offer-filters';
import { canonicalProceso, procesoColor, NEUTRAL_PROCESO_COLOR } from '@/lib/lot-values';
import type { GreenLot } from '@/types/content';

const ctx: FilterContext = {
  locale: 'es',
  statusLabels: { colombia: 'En Colombia', en_transito: 'En Tránsito', landed_us: 'Landed US' },
};

/** Lots as the site sees them after importing the fixture (same shape the fetch layer builds). */
function lotsFromFixture(): GreenLot[] {
  const csv = readFileSync(join(__dirname, 'fixtures/lotes-variados.csv'), 'utf8');
  return prepareRows(parseLotCsvText(csv)).prepared.map((row) => {
    const doc = buildNewLot(row) as Record<string, unknown>;
    const proceso = canonicalProceso(String(doc.proceso ?? ''));
    return {
      name: String(doc.name),
      ref: String(doc.ref),
      img: '',
      photos: [],
      weight: String(doc.weight ?? ''),
      price: String(doc.price ?? ''),
      proceso,
      color: procesoColor(proceso),
      variedad: String(doc.variedad ?? ''),
      finca: String(doc.finca ?? ''),
      altura: String(doc.altura ?? ''),
      puntaje: String(doc.puntaje ?? ''),
      region: String(doc.region ?? ''),
      ubicacion: doc.ubicacion as GreenLot['ubicacion'],
      bodega: doc.bodega as string | undefined,
      disponible: doc.disponible !== false,
      humedad: '',
      actividadAgua: '',
      densidad: '',
      criba: '',
      trilla: '',
      recomendaciones: '',
      notaFinca: '',
    };
  });
}

test('with no filter chosen, every lot shows', () => {
  const lots = lotsFromFixture();
  const shown = lots.filter((l) => matchesFilters(l, emptyFilters(lots), ctx));
  assert.equal(shown.length, lots.length);
});

test('the quantity slider spans lbs, kg and bags, and starts fully open', () => {
  const lots = lotsFromFixture();
  const { weight } = emptyFilters(lots);
  assert.equal(weight[0], 132);
  assert.equal(weight[1], 3080); // 20 bags × 154 lbs
});

test('new processes and cities appear as filter options of their own', () => {
  const lots = lotsFromFixture();
  const options = facetOptions(lots, emptyFilters(lots), ctx);
  assert.ok(options.proceso.includes('Thermal Shock'));
  assert.ok(options.proceso.includes('Carbonic Maceration'));
  assert.ok(options.ubicacion.includes('Houston'));
  assert.ok(options.ubicacion.includes('Landed US'));
});

test('choosing a new city shows that lot', () => {
  const lots = lotsFromFixture();
  const filters = { ...emptyFilters(lots), ubicacion: ['Houston'] };
  assert.deepEqual(lots.filter((l) => matchesFilters(l, filters, ctx)).map((l) => l.ref), ['HS-0103']);
});

test('a score like "UGQ" is not put in a score bucket', () => {
  const lots = lotsFromFixture();
  const filters = { ...emptyFilters(lots), puntaje: ['83–85'] };
  const refs = lots.filter((l) => matchesFilters(l, filters, ctx)).map((l) => l.ref);
  assert.ok(!refs.includes('GE-12'));
  assert.ok(refs.includes('RG-201'));
});

test('a new process gets the neutral colour, known ones keep theirs', () => {
  assert.equal(procesoColor('Thermal Shock'), NEUTRAL_PROCESO_COLOR);
  assert.notEqual(procesoColor('washed'), NEUTRAL_PROCESO_COLOR);
  assert.equal(procesoColor('washed'), procesoColor('Lavado'));
});

test('a card colour picked in the Studio wins over the process colour', async () => {
  const { lotCardColor, procesoColor } = await import('../src/lib/lot-values');
  assert.equal(lotCardColor('verde', 'Lavado'), '#0D7C47');
  assert.equal(lotCardColor(undefined, 'Lavado'), procesoColor('Lavado'));
  assert.equal(lotCardColor('proceso', 'Natural'), procesoColor('Natural'));
  assert.equal(lotCardColor('something-old', 'Honey'), procesoColor('Honey'));
});
