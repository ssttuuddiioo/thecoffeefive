/**
 * Locale configuration + detection helpers.
 *
 * Kept dependency-free (no dictionary imports) so it is safe to import from
 * `middleware.ts` without bloating the middleware bundle. The actual
 * translation strings live in `@/config/dictionaries`.
 */

export const locales = ['es', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'es';

/** Cookie that remembers the visitor's language choice (Next.js convention). */
export const LOCALE_COOKIE = 'NEXT_LOCALE';

/** Cookie lifetime — 1 year. */
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export function isLocale(value: string | undefined | null): value is Locale {
  return value != null && (locales as readonly string[]).includes(value);
}

/**
 * ISO-3166-1 alpha-2 country codes where Spanish is the primary language.
 * Visitors from these countries default to `es`; everyone else to `en`.
 * (US is intentionally excluded — it defaults to English.)
 */
const SPANISH_SPEAKING_COUNTRIES = new Set([
  'AR', 'BO', 'CL', 'CO', 'CR', 'CU', 'DO', 'EC', 'ES', 'GQ', 'GT',
  'HN', 'MX', 'NI', 'PA', 'PE', 'PR', 'PY', 'SV', 'UY', 'VE',
]);

/** Map a Vercel `x-vercel-ip-country` value to a locale, or null if unknown. */
export function localeFromCountry(country: string | null | undefined): Locale | null {
  if (!country) return null;
  return SPANISH_SPEAKING_COUNTRIES.has(country.toUpperCase()) ? 'es' : 'en';
}

/**
 * Pick a locale from an `Accept-Language` header. Returns the first supported
 * language tag by quality order, or null if none match.
 */
export function localeFromAcceptLanguage(header: string | null | undefined): Locale | null {
  if (!header) return null;
  const ranked = header
    .split(',')
    .map((part) => {
      const [tag, q] = part.trim().split(';q=');
      return { tag: tag.toLowerCase(), q: q ? parseFloat(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of ranked) {
    const base = tag.split('-')[0];
    if (isLocale(base)) return base;
  }
  return null;
}

/** Prefix an internal path with a locale, e.g. ('en', '/cafe-verde') → '/en/cafe-verde'. */
export function withLocale(locale: Locale, path: string): string {
  if (!path.startsWith('/')) path = `/${path}`;
  return path === '/' ? `/${locale}` : `/${locale}${path}`;
}

/** Split a locale prefix off a pathname, e.g. '/en/cafe-verde' → { locale:'en', rest:'/cafe-verde' }. */
export function splitLocale(pathname: string): { locale: Locale | null; rest: string } {
  const segment = pathname.split('/')[1];
  if (isLocale(segment)) {
    const rest = pathname.slice(segment.length + 1) || '/';
    return { locale: segment, rest };
  }
  return { locale: null, rest: pathname };
}
