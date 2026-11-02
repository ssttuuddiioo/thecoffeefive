import { createClient, type SanityClient } from 'next-sanity';
import { apiVersion, dataset, projectId, isSanityConfigured } from '../env';

/**
 * Read-only client. Returns `null` when Sanity has not been configured yet so
 * callers can fall back to bundled content instead of throwing at import time.
 *
 * `useCdn` is off because Next's Data Cache sits in front of these requests: a
 * webhook purge must refetch fresh content, not re-cache a stale CDN response.
 * Retries are capped because pages wait on this client while rendering.
 */
export const client: SanityClient | null = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      perspective: 'published',
      maxRetries: 1,
    })
  : null;

/** Backstop only. Publishing purges this tag through /api/revalidate. */
export const REVALIDATE_SECONDS = 300;

/** Next Data Cache tag on every Sanity fetch. */
export const SANITY_CACHE_TAG = 'sanity';

/** A slow Sanity must not hold up a page render; callers fall back instead. */
export const QUERY_TIMEOUT_MS = 2500;
