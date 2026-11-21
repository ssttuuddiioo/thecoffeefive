import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { defineEnableDraftMode } from 'next-sanity/draft-mode';
import { client } from '@/sanity/lib/client';
import { readToken } from '@/sanity/lib/token';
import { OFFER_ACCESS_COOKIE, OFFER_ACCESS_MAX_AGE, OFFER_ACCESS_TOKEN } from '@/config/offer-access';

/**
 * Called by the Studio's Presentation tool. It verifies a secret the Studio just
 * created, then turns on draft mode so the preview shows unpublished changes.
 *
 * A verified preview also unlocks the password-gated café verde pages, so editors
 * can see the offer list in the Studio without typing the password. Buyers are not
 * affected: without the Studio's secret this route grants nothing.
 */
const enable = client && readToken ? defineEnableDraftMode({ client: client.withConfig({ token: readToken }) }) : null;

/** next-sanity answers a valid secret by throwing Next's redirect; an invalid one returns 401. */
function isRedirect(error: unknown): boolean {
  const digest = typeof error === 'object' && error !== null ? (error as { digest?: unknown }).digest : undefined;
  return typeof digest === 'string' && digest.startsWith('NEXT_REDIRECT');
}

export async function GET(request: NextRequest) {
  if (!enable) {
    return NextResponse.json({ error: 'Preview is not configured: set SANITY_API_READ_TOKEN' }, { status: 500 });
  }
  try {
    return await enable.GET(request);
  } catch (error) {
    if (isRedirect(error)) {
      const dev = process.env.NODE_ENV !== 'production';
      cookies().set({
        name: OFFER_ACCESS_COOKIE,
        value: OFFER_ACCESS_TOKEN,
        httpOnly: true,
        path: '/',
        maxAge: OFFER_ACCESS_MAX_AGE,
        // Same settings next-sanity uses for the preview cookie, so it works inside the Studio's frame.
        secure: !dev,
        sameSite: dev ? 'lax' : 'none',
      });
    }
    throw error;
  }
}
