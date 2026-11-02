import type { Image } from 'sanity';
import { client, QUERY_TIMEOUT_MS, REVALIDATE_SECONDS, SANITY_CACHE_TAG } from './lib/client';
import { urlForImage } from './lib/image';
import { isSanityConfigured } from './env';
import {
  greenLotsQuery,
  greenLotBySlugQuery,
  greenLotSlugsQuery,
  journalArticleBySlugQuery,
  journalArticlesQuery,
  journalSlugsQuery,
  catalogOpenQuery,
  roastedCoffeeBySlugQuery,
  roastedCoffeeQuery,
} from './queries';
import {
  getAllJournalSlugs,
  getJournalArticleBySlug as getBundledArticle,
  getJournalArticles as getBundledArticles,
  mockGreenLots,
  procesoColorMap,
} from '@/lib/mock-data';
import { toPortableText } from '@/lib/journal-portable-text';
import { slugifyLot } from '@/lib/slug';
import type { Locale } from '@/config/i18n';
import { pickLocale, type GreenLot, type RoastedCoffee, type LocaleField } from '@/types/content';

/**
 * Fallback policy for lots
 * -------------------------------------
 * - Sanity not configured          → bundled mock data (local dev before setup).
 * - Development, error or empty    → bundled mock data.
 * - Production, error or empty     → empty, because serving stale prices to buyers
 *                                    is worse than an obviously empty page.
 */
const isDev = process.env.NODE_ENV !== 'production';

function rejectAfter(ms: number): { promise: Promise<never>; clear: () => void } {
  let timer: ReturnType<typeof setTimeout>;
  const promise = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error(`timed out after ${ms}ms`)), ms);
  });
  return { promise, clear: () => clearTimeout(timer) };
}

export async function query<T>(q: string, params: Record<string, unknown> = {}): Promise<T | null> {
  if (!client) return null;
  const timeout = rejectAfter(QUERY_TIMEOUT_MS);
  try {
    return await Promise.race([
      client.fetch<T>(q, params, {
        next: { revalidate: REVALIDATE_SECONDS, tags: [SANITY_CACHE_TAG] },
      }),
      timeout.promise,
    ]);
  } catch (error) {
    console.warn('[sanity] query failed:', error);
    return null;
  } finally {
    timeout.clear();
  }
}

function shouldFallback(list: unknown[] | null): boolean {
  if (!isSanityConfigured) return true;
  return isDev && (list === null || list.length === 0);
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
  procesoDescripcion?: LocaleField;
  notasCata?: LocaleField;
  perfilDescripcion?: LocaleField;
};

/** Photos fall back to the bundled `/lots/<ref>.jpg` files when none are uploaded. */
function resolvePhotos(doc: SanityGreenLot): string[] {
  const uploaded = (doc.images ?? []).map((img) => urlForImage(img)).filter(Boolean);
  if (uploaded.length > 0) return uploaded;
  const local = `/lots/${doc.ref.toLowerCase()}.jpg`;
  return [local];
}

function toGreenLot(doc: SanityGreenLot, locale: Locale): GreenLot {
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
    recomendaciones: pickLocale(doc.recomendaciones, locale),
    notaFinca: doc.notaFinca?.es ?? '',
    notaFincaEn: doc.notaFinca?.en,
    procesoDescripcion: pickLocale(doc.procesoDescripcion, locale),
    notasCata: pickLocale(doc.notasCata, locale).split(',').map((note) => note.trim()).filter(Boolean),
    perfilDescripcion: pickLocale(doc.perfilDescripcion, locale),
  };
}

export async function getGreenLots(locale: Locale): Promise<GreenLot[]> {
  const docs = await query<SanityGreenLot[]>(greenLotsQuery);
  if (shouldFallback(docs)) return mockGreenLots as GreenLot[];
  return (docs ?? []).map((doc) => toGreenLot(doc, locale));
}

export async function getGreenLotBySlug(slug: string, locale: Locale): Promise<GreenLot | undefined> {
  const doc = await query<SanityGreenLot | null>(greenLotBySlugQuery, { slug });
  if (doc) return toGreenLot(doc, locale);
  if (isSanityConfigured && !isDev) return undefined;
  return (mockGreenLots as GreenLot[]).find((lot) => slugifyLot(lot.name) === slug);
}

export async function getGreenLotSlugs(): Promise<string[]> {
  const slugs = await query<string[]>(greenLotSlugsQuery);
  if (shouldFallback(slugs)) return mockGreenLots.map((lot) => slugifyLot(lot.name));
  return (slugs ?? []).filter(Boolean);
}

type SanityRoasted = {
  variedad: string;
  slug: string;
  // Plain strings until the migration has made these bilingual.
  origin?: LocaleField | string;
  tueste?: LocaleField | string;
  fermentacion?: LocaleField | string;
  image?: Image;
  imageBack?: Image;
  price?: string;
  weight?: string;
  proceso?: string;
  perfil?: LocaleField;
  descripcion?: LocaleField;
  brewRatio?: string;
  brewTemperatura?: string;
  brewMetodos?: string[];
  brewTip?: LocaleField;
};

function localeOrPlain(field: LocaleField | string, locale: Locale): string {
  return typeof field === 'string' ? field : pickLocale(field, locale);
}

function toRoasted(doc: SanityRoasted, locale: Locale): RoastedCoffee {
  return {
    slug: doc.slug,
    variedad: doc.variedad,
    img: urlForImage(doc.image, '/bag-front.jpg'),
    imgBack: urlForImage(doc.imageBack, '/bag-back.jpg'),
    origin: localeOrPlain(doc.origin, locale),
    proceso: doc.proceso ?? '',
    tueste: localeOrPlain(doc.tueste, locale),
    fermentacion: localeOrPlain(doc.fermentacion, locale),
    perfil: pickLocale(doc.perfil, locale),
    descripcion: pickLocale(doc.descripcion, locale),
    price: doc.price ?? '',
    weight: doc.weight ?? '',
    brew: {
      ratio: doc.brewRatio ?? '',
      temperatura: doc.brewTemperatura ?? '',
      metodos: doc.brewMetodos ?? [],
      tip: pickLocale(doc.brewTip, locale),
    },
  };
}

/** The Studio switch. A failed read counts as closed, so a Sanity outage shows Próximamente. */
export async function isCatalogOpen(): Promise<boolean> {
  return (await query<boolean | null>(catalogOpenQuery)) === true;
}

/** Empty when Sanity fails: mock products must never reach the catalog. */
export async function getRoastedCoffee(locale: Locale): Promise<RoastedCoffee[]> {
  const docs = await query<SanityRoasted[]>(roastedCoffeeQuery);
  return (docs ?? []).map((doc) => toRoasted(doc, locale));
}

export async function getRoastedCoffeeBySlug(slug: string, locale: Locale): Promise<RoastedCoffee | undefined> {
  const result = await query<{ product: SanityRoasted | null }>(roastedCoffeeBySlugQuery, { slug });
  return result?.product ? toRoasted(result.product, locale) : undefined;
}

export type JournalSummary = {
  slug: string;
  category: string;
  title: string;
  description: string;
  /** Sanity image URL. Absent for articles with no cover. */
  cover?: string;
  publishedAt?: string;
};

export type JournalArticle = JournalSummary & {
  readMinutes?: number;
  body: unknown[];
};

type SanityArticle = {
  slug: string;
  category?: LocaleField;
  title?: LocaleField;
  description?: LocaleField;
  readMinutes?: number;
  publishedAt?: string;
  coverImage?: Image;
  body?: { es?: unknown[]; en?: unknown[] };
};

function toSummary(doc: SanityArticle, locale: Locale): JournalSummary {
  return {
    slug: doc.slug,
    category: pickLocale(doc.category, locale),
    title: pickLocale(doc.title, locale),
    description: pickLocale(doc.description, locale),
    cover: urlForImage(doc.coverImage) || undefined,
    publishedAt: doc.publishedAt,
  };
}

/** Bundled articles stand in only when Sanity fails or holds no articles. */
export async function getJournalArticles(locale: Locale): Promise<JournalSummary[]> {
  const docs = await query<SanityArticle[]>(journalArticlesQuery);
  if (!docs || docs.length === 0) return getBundledArticles(locale);
  return docs.map((doc) => toSummary(doc, locale));
}

export async function getJournalArticleBySlug(slug: string, locale: Locale): Promise<JournalArticle | undefined> {
  // The query wraps the article, so null means Sanity failed and { article: null } means no such post.
  const result = await query<{ article: SanityArticle | null }>(journalArticleBySlugQuery, { slug });
  if (result?.article) {
    const { body } = result.article;
    return {
      ...toSummary(result.article, locale),
      readMinutes: result.article.readMinutes,
      body: (locale === 'en' && body?.en?.length ? body.en : body?.es) ?? [],
    };
  }
  const hasSanityArticles = result !== null && (await query<string[]>(journalSlugsQuery))?.length;
  if (hasSanityArticles) return undefined;
  const bundled = getBundledArticle(slug, locale);
  return bundled && { ...bundled, body: toPortableText(bundled.blocks) };
}

export async function getJournalSlugs(): Promise<string[]> {
  const slugs = await query<string[]>(journalSlugsQuery);
  return slugs && slugs.length > 0 ? slugs.filter(Boolean) : getAllJournalSlugs();
}
