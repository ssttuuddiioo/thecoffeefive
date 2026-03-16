import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Shopify webhook handler for ISR revalidation.
 *
 * Configure in Shopify admin → Settings → Notifications → Webhooks:
 * - Product creation → POST https://yourdomain.com/api/revalidate
 * - Product update → POST https://yourdomain.com/api/revalidate
 * - Product deletion → POST https://yourdomain.com/api/revalidate
 *
 * TODO: Verify Shopify webhook HMAC signature in production.
 */
export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-revalidation-secret');

  // Basic auth check (upgrade to HMAC verification for production)
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Revalidate all product-related cached data
    revalidateTag('products');
    revalidateTag('blog');

    return NextResponse.json({
      revalidated: true,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Revalidation failed' },
      { status: 500 }
    );
  }
}
