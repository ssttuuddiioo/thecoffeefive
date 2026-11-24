import { FALLBACK_OFFER_PASSWORD, OFFER_SECRET_ID } from '@/config/offer-access';

/**
 * The café verde password, read from the Studio. Runs in middleware (edge) and in
 * route handlers, so it uses plain fetch rather than the Sanity client.
 */

const CACHE_MS = 30_000;
let cached: { password: string; at: number } | null = null;

async function fetchStudioPassword(): Promise<string | null> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';
  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-10-01';
  const token = process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_WRITE_TOKEN;
  if (!projectId || !token) return null;

  const query = encodeURIComponent(`*[_id == "${OFFER_SECRET_ID}"][0].password`);
  const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${query}&perspective=published`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
    signal: AbortSignal.timeout(2500),
  });
  if (!res.ok) throw new Error(`Sanity ${res.status}`);
  const { result } = (await res.json()) as { result?: unknown };
  return typeof result === 'string' && result.trim() ? result.trim() : null;
}

export async function getOfferPassword(): Promise<string> {
  if (cached && Date.now() - cached.at < CACHE_MS) return cached.password;
  try {
    const password = (await fetchStudioPassword()) ?? FALLBACK_OFFER_PASSWORD;
    cached = { password, at: Date.now() };
    return password;
  } catch {
    // Sanity unreachable: keep the last known password rather than reviving the fallback.
    return cached?.password ?? FALLBACK_OFFER_PASSWORD;
  }
}

/** Cookie value for a visitor who typed `password`. Changes whenever the password does. */
export async function offerAccessToken(password: string): Promise<string> {
  const bytes = new TextEncoder().encode(`coffee-five-offer:${password}`);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, '0')).join('');
}

export async function isOfferPassword(input: string): Promise<boolean> {
  return input.trim() !== '' && input.trim() === (await getOfferPassword());
}

export async function hasOfferAccess(cookieValue: string | undefined): Promise<boolean> {
  if (!cookieValue) return false;
  return cookieValue === (await offerAccessToken(await getOfferPassword()));
}

/** Session cookie: no maxAge, so closing the browser forgets it. */
export function offerCookieOptions(sameSite: 'lax' | 'none' = 'lax') {
  return {
    httpOnly: true,
    path: '/',
    sameSite,
    secure: sameSite === 'none' || process.env.NODE_ENV === 'production',
  } as const;
}
