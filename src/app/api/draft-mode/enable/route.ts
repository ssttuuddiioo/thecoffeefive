import { NextResponse } from 'next/server';
import { defineEnableDraftMode } from 'next-sanity/draft-mode';
import { client } from '@/sanity/lib/client';
import { readToken } from '@/sanity/lib/token';

/**
 * Called by the Studio's Presentation tool. It verifies a secret the Studio just
 * created, then turns on draft mode so the preview shows unpublished changes.
 */
const enable = client && readToken ? defineEnableDraftMode({ client: client.withConfig({ token: readToken }) }) : null;

export const GET =
  enable?.GET ??
  (() => NextResponse.json({ error: 'Preview is not configured: set SANITY_API_READ_TOKEN' }, { status: 500 }));
