/**
 * Sanity environment configuration.
 *
 * The site is designed to run WITHOUT Sanity configured — every fetcher falls
 * back to the bundled content in `src/lib/mock-data.ts` when `isSanityConfigured`
 * is false. That keeps local dev and previews working before the dataset is
 * populated, and means a missing env var degrades to the old behaviour rather
 * than crashing the build.
 */

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';

/** Pinned API date — bump deliberately, never to "latest". */
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-10-01';

/** Studio lives at this path, mounted inside the Next app. */
export const studioBasePath = '/studio';

/** A Sanity projectId is 8+ alphanumeric chars; anything else means "not set up yet". */
export const isSanityConfigured = /^[a-z0-9]{8,}$/i.test(projectId);

/** Server-only token, used by the CSV scripts and seeding. Never exposed to the client. */
export const writeToken = process.env.SANITY_API_WRITE_TOKEN ?? '';
