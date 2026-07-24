import type { Locale } from '@/config/i18n';
import type { Dictionary } from './dictionary';
import { es } from './es';
import { en } from './en';

const dictionaries: Record<Locale, Dictionary> = { es, en };

/** Get the full translation dictionary for a locale (server-side). */
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
