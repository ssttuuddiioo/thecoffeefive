import type { Image } from 'sanity';
import { stegaClean } from '@sanity/client/stega';
import type { Locale } from '@/config/i18n';
import type { Photo } from '@/lib/photo';
import { urlForImage } from './image';
import { editAttr } from './edit-attr';

/** Where a value lives in the Studio, so photos can be click-to-edit in the preview. */
export type CopyLocation = { id: string; path: string };

type Rec = Record<string, unknown>;

const isRecord = (value: unknown): value is Rec =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isPhotoSlot = (value: unknown): value is Photo =>
  isRecord(value) && typeof value.src === 'string' && typeof value.alt === 'string';

const nonBlank = (value: unknown): string | undefined =>
  typeof value === 'string' && value.trim() !== '' ? value : undefined;

/** The value for this locale only. Fixed fields fall back to bundled text, never to the other language. */
function localeValue(field: unknown, locale: Locale): string | undefined {
  return isRecord(field) ? nonBlank(field[locale]) : undefined;
}

/** List items have no bundled counterpart, so a missing translation shows Spanish. */
function listItemValue(field: unknown, locale: Locale): string | undefined {
  return localeValue(field, locale) ?? localeValue(field, 'es');
}

function mergePhoto(base: Photo, field: unknown, locale: Locale, at?: CopyLocation): Photo {
  // Tagged even when the Studio has no photo here yet, so clicking it is how you add one.
  // Copy documents are singletons whose type name is their id.
  const edit = at ? editAttr(at.id, at.id, at.path) : undefined;
  return { ...mergePhotoValue(base, field, locale), edit };
}

function mergePhotoValue(base: Photo, field: unknown, locale: Locale): Photo {
  if (!isRecord(field)) return base;
  const alt = localeValue(field.alt, locale) ?? base.alt;
  // Asset references must reach the URL builder without preview markers.
  const image = stegaClean(field.image) as (Image & { hotspot?: { x?: number; y?: number } }) | undefined;
  const src = isRecord(image) && image.asset ? urlForImage(image) : '';
  if (!src) return { ...base, alt };
  const { x, y } = image?.hotspot ?? {};
  const position =
    typeof x === 'number' && typeof y === 'number'
      ? `${Math.round(x * 100)}% ${Math.round(y * 100)}%`
      : undefined;
  return { src, alt, position };
}

function mergeList(base: unknown[], field: unknown, locale: Locale): unknown[] {
  if (!Array.isArray(field) || base.length === 0) return base;
  const template = base[0];

  const items = field.flatMap((item): unknown[] => {
    if (typeof template === 'string') {
      const text = listItemValue(item, locale);
      return text ? [text] : [];
    }
    if (!isRecord(template) || !isRecord(item)) return [];
    const entries = Object.keys(template).map((key) => [key, listItemValue(item[key], locale)]);
    // A half-filled row would render with holes, so it only counts once complete.
    return entries.every(([, text]) => text) ? [Object.fromEntries(entries)] : [];
  });

  return items.length > 0 ? items : base;
}

/**
 * Overlay a Sanity section on its bundled copy. Walks the bundled shape, so unknown
 * keys and wrong types are ignored and the result always matches the dictionary type:
 * a blank field or a malformed document can never blank the site.
 */
export function mergeCopy<T>(base: T, sanity: unknown, locale: Locale, at?: CopyLocation): T {
  if (typeof base === 'string') return (localeValue(sanity, locale) ?? base) as T;
  if (Array.isArray(base)) return mergeList(base, sanity, locale) as T;
  if (isPhotoSlot(base)) return mergePhoto(base, sanity, locale, at) as T;
  if (!isRecord(base)) return base;

  const source = isRecord(sanity) ? sanity : {};
  const merged: Rec = {};
  for (const key of Object.keys(base)) {
    merged[key] = mergeCopy(base[key], source[key], locale, at && { id: at.id, path: `${at.path}.${key}` });
  }
  return merged as T;
}
