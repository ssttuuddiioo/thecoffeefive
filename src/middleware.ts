import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  defaultLocale,
  isLocale,
  localeFromCountry,
  localeFromAcceptLanguage,
  splitLocale,
  withLocale,
  LOCALE_COOKIE,
  LOCALE_COOKIE_MAX_AGE,
  type Locale,
} from '@/config/i18n';
import {
  OFFER_PASSWORD,
  OFFER_ACCESS_COOKIE,
  OFFER_ACCESS_TOKEN,
  OFFER_ACCESS_MAX_AGE,
} from '@/config/offer-access';

// Files with an extension (e.g. /logo.svg) skip all locale handling.
const PUBLIC_FILE = /\.[^/]+$/;

function isOfferPath(rest: string) {
  return rest === '/cafe-verde' || rest.startsWith('/cafe-verde/');
}

/** Best-effort language for a visitor with no locale in the URL. */
function detectLocale(request: NextRequest): Locale {
  const cookie = request.cookies.get(LOCALE_COOKIE)?.value;
  if (isLocale(cookie)) return cookie;

  const byCountry = localeFromCountry(request.headers.get('x-vercel-ip-country'));
  if (byCountry) return byCountry;

  const byLanguage = localeFromAcceptLanguage(request.headers.get('accept-language'));
  if (byLanguage) return byLanguage;

  return defaultLocale;
}

function setLocaleCookie(response: NextResponse, locale: Locale) {
  response.cookies.set(LOCALE_COOKIE, locale, {
    path: '/',
    maxAge: LOCALE_COOKIE_MAX_AGE,
    sameSite: 'lax',
  });
  return response;
}

/**
 * Pass the request through, forwarding the resolved locale to the app as an
 * `x-locale` request header (read by the root layout for <html lang>) and
 * remembering it in a cookie.
 */
function passThrough(request: NextRequest, locale: Locale) {
  const headers = new Headers(request.headers);
  headers.set('x-locale', locale);
  return setLocaleCookie(NextResponse.next({ request: { headers } }), locale);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Never touch API routes, the Sanity Studio, Next internals, or static files.
  // The Studio is mounted outside the [locale] segment, so locale prefixing
  // would send /studio to a non-existent /es/studio and 404.
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/studio') ||
    pathname.startsWith('/_next') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const { locale: pathLocale, rest } = splitLocale(pathname);

  // 1. No locale in the URL → detect one and redirect to the prefixed path.
  if (!pathLocale) {
    const locale = detectLocale(request);
    const url = request.nextUrl.clone();
    url.pathname = withLocale(locale, pathname);
    return setLocaleCookie(NextResponse.redirect(url), locale);
  }

  const locale = pathLocale;

  // 2. Green-coffee offer list — password protected, hidden from public nav.
  if (isOfferPath(rest)) {
    const hasAccess =
      request.cookies.get(OFFER_ACCESS_COOKIE)?.value === OFFER_ACCESS_TOKEN;
    if (hasAccess) {
      return passThrough(request, locale);
    }

    // Unlock directly from a shared link, e.g. /es/cafe-verde?key=coffeefive2026
    const providedKey =
      request.nextUrl.searchParams.get('key') ??
      request.nextUrl.searchParams.get('password');
    if (providedKey === OFFER_PASSWORD) {
      const cleanUrl = request.nextUrl.clone();
      cleanUrl.searchParams.delete('key');
      cleanUrl.searchParams.delete('password');
      const response = setLocaleCookie(NextResponse.redirect(cleanUrl), locale);
      response.cookies.set(OFFER_ACCESS_COOKIE, OFFER_ACCESS_TOKEN, {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        maxAge: OFFER_ACCESS_MAX_AGE,
        secure: process.env.NODE_ENV === 'production',
      });
      return response;
    }

    // No access → send to the password gate, remembering the destination.
    const gate = request.nextUrl.clone();
    gate.pathname = withLocale(locale, '/acceso');
    gate.search = '';
    gate.searchParams.set('next', pathname);
    return setLocaleCookie(NextResponse.redirect(gate), locale);
  }

  // 3. Every other page is live → pass through.
  return passThrough(request, locale);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
