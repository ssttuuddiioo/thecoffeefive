import createImageUrlBuilder from '@sanity/image-url';
import type { Image } from 'sanity';
import { dataset, projectId, isSanityConfigured } from '../env';

const builder = isSanityConfigured
  ? createImageUrlBuilder({ projectId, dataset })
  : null;

/**
 * Resolve a Sanity image to a URL. Returns `fallback` when Sanity is not
 * configured or the image is missing, so components always get a usable src.
 */
export function urlForImage(source: Image | undefined | null, fallback = ''): string {
  if (!source || !builder) return fallback;
  try {
    return builder.image(source).auto('format').fit('max').url();
  } catch {
    return fallback;
  }
}

/** Sized variant — use for cards and thumbnails to avoid shipping full-res files. */
export function urlForImageSized(
  source: Image | undefined | null,
  width: number,
  fallback = '',
): string {
  if (!source || !builder) return fallback;
  try {
    return builder.image(source).width(width).auto('format').fit('max').url();
  } catch {
    return fallback;
  }
}
