import { createClient, type SanityClient } from 'next-sanity';
import { apiVersion, dataset, projectId, isSanityConfigured } from '../env';

/**
 * Read-only client. Returns `null` when Sanity has not been configured yet so
 * callers can fall back to bundled content instead of throwing at import time.
 */
export const client: SanityClient | null = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      perspective: 'published',
    })
  : null;

/** Default ISR window for content fetched from Sanity. */
export const REVALIDATE_SECONDS = 60;
