import type { Locale } from '@/config/i18n';

/** Bilingual field as stored in Sanity. Spanish is the source of truth. */
export type LocaleField = { es?: string; en?: string } | undefined;

/** Read a bilingual field, falling back to Spanish then to an empty string. */
export function pickLocale(field: LocaleField, locale: Locale): string {
  if (!field) return '';
  return (locale === 'en' ? field.en || field.es : field.es) ?? '';
}

/**
 * A green coffee lot, in the shape the offer-list components already consume.
 * Both the bundled mock data and the Sanity fetchers produce this, so swapping
 * the source is a one-line import change in each page.
 */
export interface GreenLot {
  /** Sanity document id, for click-to-edit in the Studio preview. Absent for bundled lots. */
  sanityId?: string;
  name: string;
  ref: string;
  /** URL handle for `/cafe-verde/[handle]`, from the current name. See src/lib/lot-urls.ts. */
  slug?: string;
  img: string;
  photos: string[];
  weight: string;
  price: string;
  proceso: string;
  color: string;
  variedad: string;
  finca: string;
  municipio?: string;
  altura: string;
  puntaje: string;
  region: string;
  /** Filter group; absent for a warehouse city we do not know the country of. */
  ubicacion?: 'colombia' | 'en_transito' | 'landed_us';
  /** Warehouse city as Juan writes it ("Miami/Douglas"). Shown instead of the generic place. */
  bodega?: string;
  disponible: boolean;
  humedad: string;
  actividadAgua: string;
  densidad: string;
  criba: string;
  trilla: string;
  recomendaciones: string;
  notaFinca: string;
  notaFincaEn?: string;
  /** Per-lot tasting copy. When absent the page shows the general text. */
  procesoDescripcion?: string;
  notasCata?: string[];
  perfilDescripcion?: string;
}

export interface RoastedCoffee {
  /** Sanity document id, for click-to-edit in the Studio preview. */
  sanityId?: string;
  slug: string;
  variedad: string;
  img: string;
  imgBack: string;
  descripcion?: string;
  origin: string;
  proceso: string;
  tueste: string;
  fermentacion: string;
  perfil: string;
  price: string;
  weight: string;
  brew: {
    ratio: string;
    temperatura: string;
    metodos: string[];
    tip: string;
  };
}
