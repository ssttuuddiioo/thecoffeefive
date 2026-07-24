import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  OFFER_PASSWORD,
  OFFER_ACCESS_COOKIE,
  OFFER_ACCESS_TOKEN,
  OFFER_ACCESS_MAX_AGE,
} from '@/config/offer-access';

export async function POST(request: NextRequest) {
  let password = '';
  try {
    const body = await request.json();
    if (typeof body?.password === 'string') password = body.password;
  } catch {
    // ignore malformed body
  }

  if (password !== OFFER_PASSWORD) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(OFFER_ACCESS_COOKIE, OFFER_ACCESS_TOKEN, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: OFFER_ACCESS_MAX_AGE,
    secure: process.env.NODE_ENV === 'production',
  });
  return response;
}
