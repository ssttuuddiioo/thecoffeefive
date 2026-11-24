import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { OFFER_ACCESS_COOKIE } from '@/config/offer-access';
import { isOfferPassword, offerAccessToken, offerCookieOptions } from '@/lib/offer-password';

export async function POST(request: NextRequest) {
  let password = '';
  try {
    const body = await request.json();
    if (typeof body?.password === 'string') password = body.password;
  } catch {
    // ignore malformed body
  }

  if (!(await isOfferPassword(password))) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(OFFER_ACCESS_COOKIE, await offerAccessToken(password.trim()), offerCookieOptions());
  return response;
}
