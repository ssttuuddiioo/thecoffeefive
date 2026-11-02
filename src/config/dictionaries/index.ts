import type { Locale } from '@/config/i18n';
import type { Dictionary } from './dictionary';
import { es } from './es';
import { en } from './en';

const dictionaries: Record<Locale, Dictionary> = { es, en };

/** Get the full translation dictionary for a locale (server-side). */
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/** Page copy read only by server components, kept out of the client payload. */
export type ClientDictionary = Omit<
  Dictionary,
  'services' | 'about' | 'contact' | 'processPage' | 'blog' | 'lotDetail'
>;

export function toClientDictionary(dict: Dictionary): ClientDictionary {
  const { services, about, contact, processPage, blog, lotDetail, ...client } = dict;
  return client;
}

export type { Dictionary };
