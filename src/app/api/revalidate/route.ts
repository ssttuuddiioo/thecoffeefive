import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';
import { SANITY_CACHE_TAG } from '@/sanity/lib/client';

/**
 * Sanity webhook: purges cached content the moment something is published.
 *
 * Configure at sanity.io/manage → API → Webhooks:
 * - URL: https://thecoffeefive.com/api/revalidate
 * - Trigger on: create, update, delete. Dataset: production.
 * - Secret: the same value as SANITY_REVALIDATE_SECRET in Vercel.
 */
export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
  }

  const { isValidSignature } = await parseBody(req, secret);
  if (!isValidSignature) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  revalidateTag(SANITY_CACHE_TAG);
  return NextResponse.json({ revalidated: true, timestamp: new Date().toISOString() });
}
