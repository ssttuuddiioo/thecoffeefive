import type { Locale } from '@/config/i18n';
import type { GreenLot } from '@/types/content';
import { procesoLabel, weightInLbs } from './lot-values';

/**
 * Filtering for the green coffee offer list.
 *
 * Rule: with no filter chosen, every lot shows. A lot whose value we cannot read
 * (no number in the weight, a score like "UGQ") is only left out when someone picks
 * a filter it cannot match, never by default.
 */

export const PUNTAJE_RANGES = ['83–85', '86–88', '89–91', '92+'];
export const ALTURA_RANGES = ['< 1,700', '1,700–1,899', '1,900–2,099', '2,100+'];

function firstNumber(text: string): number | null {
  const match = text.replace(/,/g, '').match(/\d+(\.\d+)?/);
  return match ? parseFloat(match[0]) : null;
}

/** Cupping score bucket, or null for grades like "UGQ" that are not a score. */
export function getPuntajeRange(score: string): string | null {
  const n = firstNumber(score);
  if (n === null || n < 80 || n > 100) return null;
  if (n >= 92) return '92+';
  if (n >= 89) return '89–91';
  if (n >= 86) return '86–88';
  return '83–85';
}

/** Altitude bucket from the first number ("1,800 – 2,100" counts as 1,800). */
export function getAlturaRange(altura: string): string | null {
  const n = firstNumber(altura);
  if (n === null) return null;
  if (n >= 2100) return '2,100+';
  if (n >= 1900) return '1,900–2,099';
  if (n >= 1700) return '1,700–1,899';
  return '< 1,700';
}

export const FACETS = ['proceso', 'variedad', 'region', 'ubicacion', 'puntaje', 'altura', 'finca'] as const;
export type Facet = (typeof FACETS)[number];

export type OfferFilters = Record<Facet, string[]> & {
  keyword: string;
  /** Weight range in lbs. */
  weight: [number, number];
};

export interface FilterContext {
  locale: Locale;
  /** Label for each location group, e.g. { colombia: 'En Colombia' }. */
  statusLabels: Record<string, string>;
}

/** The location a buyer filters by: the group when known, otherwise the city as typed. */
export function placeLabel(lot: Pick<GreenLot, 'ubicacion' | 'bodega'>, statusLabels: Record<string, string>): string {
  if (lot.ubicacion && statusLabels[lot.ubicacion]) return statusLabels[lot.ubicacion];
  return lot.bodega?.trim() ?? '';
}

export function facetValue(lot: GreenLot, facet: Facet, ctx: FilterContext): string | null {
  switch (facet) {
    case 'proceso':
      return procesoLabel(lot.proceso, ctx.locale) || null;
    case 'ubicacion':
      return placeLabel(lot, ctx.statusLabels) || null;
    case 'puntaje':
      return getPuntajeRange(lot.puntaje);
    case 'altura':
      return getAlturaRange(lot.altura);
    default:
      return lot[facet]?.trim() || null;
  }
}

/** Smallest and largest weight on offer, in lbs. */
export function weightBounds(lots: GreenLot[]): [number, number] {
  const weights = lots.map((l) => weightInLbs(l.weight)).filter((w): w is number => w !== null);
  if (weights.length === 0) return [0, 0];
  return [Math.floor(Math.min(...weights)), Math.ceil(Math.max(...weights))];
}

/** Nothing chosen: every lot shows. */
export function emptyFilters(lots: GreenLot[]): OfferFilters {
  return {
    keyword: '',
    weight: weightBounds(lots),
    ...(Object.fromEntries(FACETS.map((f) => [f, []])) as unknown as Record<Facet, string[]>),
  };
}

/** Does the lot pass every chosen filter? `exclude` skips one, to work out its options. */
export function matchesFilters(lot: GreenLot, filters: OfferFilters, ctx: FilterContext, exclude?: Facet): boolean {
  if (filters.keyword && !lot.name.toLowerCase().includes(filters.keyword.toLowerCase())) return false;
  for (const facet of FACETS) {
    if (facet === exclude || filters[facet].length === 0) continue;
    const value = facetValue(lot, facet, ctx);
    if (value === null || !filters[facet].includes(value)) return false;
  }
  const w = weightInLbs(lot.weight);
  if (w !== null && (w < filters.weight[0] || w > filters.weight[1])) return false;
  return true;
}

/** Options each filter can offer, given the other filters already chosen. */
export function facetOptions(lots: GreenLot[], filters: OfferFilters, ctx: FilterContext): Record<Facet, string[]> {
  const options = {} as Record<Facet, string[]>;
  for (const facet of FACETS) {
    const values = new Set<string>();
    for (const lot of lots) {
      if (!matchesFilters(lot, filters, ctx, facet)) continue;
      const value = facetValue(lot, facet, ctx);
      if (value) values.add(value);
    }
    if (facet === 'puntaje') options[facet] = PUNTAJE_RANGES.filter((r) => values.has(r));
    else if (facet === 'altura') options[facet] = ALTURA_RANGES.filter((r) => values.has(r));
    else options[facet] = Array.from(values).sort((a, b) => a.localeCompare(b));
  }
  return options;
}
