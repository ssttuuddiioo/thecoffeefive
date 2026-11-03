import { draftMode } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

/** Leaves preview mode and returns to the page, showing published content again. */
export function GET(request: NextRequest) {
  draftMode().disable();
  const back = request.nextUrl.searchParams.get('redirect');
  const path = back && back.startsWith('/') && !back.startsWith('//') ? back : '/';
  return NextResponse.redirect(new URL(path, request.url));
}
