import type { Image } from 'sanity';
import { client, REVALIDATE_SECONDS } from './lib/client';
import { urlForImage } from './lib/image';
import { isSanityConfigured } from './env';
import {
  greenLotsQuery,
  greenLotBySlugQuery,
  greenLotSlugsQuery,
  roastedCoffeeQuery,
} from './queries';
import { mockGreenLots, mockRoastedCoffee, procesoColorMap } from '@/lib/mock-data';
import { slugifyLot } from '@/lib/slug';
import type { GreenLot, RoastedCoffee, LocaleField } from '@/types/content';

/**
 * Fallback policy
 * ---------------
 * - Sanity not configured        → bundled mock data (local dev before setup).
 * - Sanity errors / unreachable  → bundled mock data, with a loud warning, so an
 *                                  outage degrades instead of taking the site down.
 * - Sanity configured but empty  → mock data in development only. In production an
 *                                  empty dataset returns empty, because silently
 *                                  serving stale prices to buyers is worse than an
 *                                  obviously empty page.
 */
const isDev = process.env.NODE_ENV !== 'production';

async function query<T>(q: string, params: Record<string, unknown> = {}): Promise<T | null> {
  if (!client) return null;
  try {
    return await client.fetch<T>(q, params, { next: { revalidate: REVALIDATE_SECONDS } });
  } catch (error) {
    console.warn('[sanity] query failed, falling back to bundled content:', error);
    return null;
  }
}

/** Empty results only fall back to mock data outside production. */
function shouldFallback(list: unknown[] | null): boolean {
  if (list === null) return true;
  return list.length === 0 && (isDev || !isSanityConfigured);
}

type SanityGreenLot = {
  ref: string;
  name: string;
  slug?: string;
  price?: string;
  weight?: string;
  proceso?: string;
  ubicacion?: GreenLot['ubicacion'];
  disponible?: boolean;
  variedad?: string;
  finca?: string;
  municipio?: string;
  region?: string;
  altura?: string;
  puntaje?: string;
  humedad?: string;
  actividadAgua?: string;
  densidad?: string;
  criba?: string;
  trilla?: string;
  images?: Image[];
  recomendaciones?: LocaleField;
  notaFinca?: LocaleField;
};

/** Photos fall back to the bundled `/lots/<ref>.jpg` files when none are uploaded. */
function resolvePhotos(doc: SanityGreenLot): string[] {
  const uploaded = (doc.images ?? []).map((img) => urlForImage(img)).filter(Boolean);
  if (uploaded.length > 0) return uploaded;
  const local = `/lots/${doc.ref.toLowerCase()}.jpg`;
  return [local];
}

function toGreenLot(doc: SanityGreenLot): GreenLot {
  const photos = resolvePhotos(doc);
  const proceso = doc.proceso ?? 'Lavado';
  return {
    name: doc.name,
    ref: doc.ref,
    img: photos[0],
    photos,
    weight: doc.weight ?? '',
    price: doc.price ?? '',
    proceso,
    color: procesoColorMap[proceso] ?? procesoColorMap.Lavado,
    variedad: doc.variedad ?? '',
    finca: doc.finca ?? '',
    municipio: doc.municipio,
    altura: doc.altura ?? '',
    puntaje: doc.puntaje ?? '',
    region: doc.region ?? '',
    ubicacion: doc.ubicacion ?? 'colombia',
    disponible: doc.disponible !== false,
    humedad: doc.humedad ?? '',
    actividadAgua: doc.actividadAgua ?? '',
    densidad: doc.densidad ?? '',
    criba: doc.criba ?? '',
    trilla: doc.trilla ?? '',
    recomendaciones: doc.recomendaciones?.es ?? '',
    notaFinca: doc.notaFinca?.es ?? '',
    notaFincaEn: doc.notaFinca?.en,
  };
}

export async function getGreenLots(): Promise<GreenLot[]> {
  const docs = await query<SanityGreenLot[]>(greenLotsQuery);
  if (shouldFallback(docs)) return mockGreenLots as GreenLot[];
  return docs!.map(toGreenLot);
}

export async function getGreenLotBySlug(slug: string): Promise<GreenLot | undefined> {
  const doc = await query<SanityGreenLot | null>(greenLotBySlugQuery, { slug });
  if (doc) return toGreenLot(doc);
  if (isSanityConfigured && !isDev) return undefined;
  return (mockGreenLots as GreenLot[]).find((lot) => slugifyLot(lot.name) === slug);
}

export async function getGreenLotSlugs(): Promise<string[]> {
  const slugs = await query<string[]>(greenLotSlugsQuery);
  if (shouldFallback(slugs)) return mockGreenLots.map((lot) => slugifyLot(lot.name));
  return slugs!.filter(Boolean);
}

type SanityRoasted = {
  variedad: string;
  origin?: string;
  image?: Image;
  price?: string;
  weight?: string;
  proceso?: string;
  tueste?: string;
  fermentacion?: string;
  perfil?: LocaleField;
  brewRatio?: string;
  brewTemperatura?: string;
  brewMetodos?: string[];
  brewTip?: LocaleField;
};

function toRoasted(doc: SanityRoasted): RoastedCoffee {
  return {
    variedad: doc.variedad,
    img: urlForImage(doc.image, '/bag-front.jpg'),
    origin: doc.origin ?? '',
    proceso: doc.proceso ?? '',
    tueste: doc.tueste ?? '',
    fermentacion: doc.fermentacion ?? '',
    perfil: doc.perfil?.es ?? '',
    price: doc.price ?? '',
    weight: doc.weight ?? '',
    brew: {
      ratio: doc.brewRatio ?? '',
      temperatura: doc.brewTemperatura ?? '',
      metodos: doc.brewMetodos ?? [],
      tip: doc.brewTip?.es ?? '',
    },
  };
}

export async function getRoastedCoffee(): Promise<RoastedCoffee[]> {
  const docs = await query<SanityRoasted[]>(roastedCoffeeQuery);
  if (shouldFallback(docs)) return mockRoastedCoffee as RoastedCoffee[];
  return docs!.map(toRoasted);
}
