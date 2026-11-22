import { siteConfig } from '@/config/site';
import type { Locale } from '@/config/i18n';

/**
 * How lot values are read, everywhere: the CSV importer, the Studio and the site.
 *
 * The rule is fail open. Juan's offer changes every harvest, so a value we have not
 * seen before (a new process, a new warehouse city, a new weight unit) is kept and
 * shown as he typed it. Known values get extra treatment (a colour, a translation,
 * a filter group); unknown ones never block an import or hide a lot.
 */

/** Processes with their own card colour and translation. */
export const PROCESO_VALUES = ['Lavado', 'Natural', 'Honey', 'Anaeróbico', 'Fermentado'] as const;

/** Where the coffee is, for the location filter. */
export const UBICACION_VALUES = [
  { title: '📍 En Colombia', value: 'colombia' },
  { title: '🚢 En tránsito', value: 'en_transito' },
  { title: '📦 Landed in US', value: 'landed_us' },
] as const;

export type UbicacionKey = (typeof UBICACION_VALUES)[number]['value'];

export const UBICACION_ICON: Record<UbicacionKey, string> = {
  colombia: '📍',
  en_transito: '🚢',
  landed_us: '📦',
};

/** Lowercase, strip accents, and treat _ - / and runs of spaces as one space. */
export function normalizeText(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[\s_\-/]+/g, ' ')
    .trim();
}

const PROCESO_ALIASES: Record<string, (typeof PROCESO_VALUES)[number]> = {
  lavado: 'Lavado',
  washed: 'Lavado',
  natural: 'Natural',
  honey: 'Honey',
  miel: 'Honey',
  anaerobico: 'Anaeróbico',
  anaerobic: 'Anaeróbico',
  fermentado: 'Fermentado',
  fermented: 'Fermentado',
};

/** The standard spelling of a known process, or the text as typed. */
export function canonicalProceso(text: string): string {
  const trimmed = text.trim();
  return PROCESO_ALIASES[normalizeText(trimmed)] ?? trimmed;
}

export function isKnownProceso(text: string): boolean {
  return normalizeText(text) in PROCESO_ALIASES;
}

/** Card colour for a process nobody has given a colour yet. */
export const NEUTRAL_PROCESO_COLOR = '#8A8A8A';

export const procesoColorMap: Record<string, string> = {
  Lavado: siteConfig.procesoColors.lavado,
  Natural: siteConfig.procesoColors.natural,
  Honey: siteConfig.procesoColors.honey,
  'Anaeróbico': siteConfig.procesoColors.anaerobico,
  Fermentado: siteConfig.procesoColors.fermentado,
};

export function procesoColor(proceso: string): string {
  return procesoColorMap[canonicalProceso(proceso)] ?? NEUTRAL_PROCESO_COLOR;
}

/**
 * Card colours Juan can pick per lot in the Studio. Stored by name, not hex, so the
 * palette can be retuned without touching every lot. 'proceso' (or nothing) means
 * the colour of the lot's process.
 */
export const CARD_COLORS = [
  { value: 'proceso', title: 'Según el proceso', hex: undefined },
  { value: 'verde', title: '🟩 Verde', hex: '#0D7C47' },
  { value: 'azul', title: '🟦 Azul', hex: siteConfig.procesoColors.lavado },
  { value: 'amarillo', title: '🟨 Amarillo', hex: siteConfig.procesoColors.honey },
  { value: 'rojo-oscuro', title: '🟥 Rojo oscuro', hex: siteConfig.procesoColors.natural },
  { value: 'rojo', title: '🟧 Rojo', hex: siteConfig.procesoColors.fermentado },
] as const;

/** The lot's card colour: Juan's pick, else its process colour. */
export function lotCardColor(choice: string | undefined, proceso: string): string {
  return CARD_COLORS.find((c) => c.value === choice)?.hex ?? procesoColor(proceso);
}

const procesoLabels: Record<Locale, Record<string, string>> = {
  es: { Lavado: 'Lavado', Natural: 'Natural', Honey: 'Honey', 'Anaeróbico': 'Anaeróbico', Fermentado: 'Fermentado' },
  en: { Lavado: 'Washed', Natural: 'Natural', Honey: 'Honey', 'Anaeróbico': 'Anaerobic', Fermentado: 'Fermented' },
};

/** Localized label for a process; an unknown one is shown as typed. */
export function procesoLabel(proceso: string, locale: Locale): string {
  const canonical = canonicalProceso(proceso);
  return procesoLabels[locale]?.[canonical] ?? canonical;
}

const UBICACION_STATUS_ALIASES: Record<string, UbicacionKey> = {
  colombia: 'colombia',
  'en colombia': 'colombia',
  'en transito': 'en_transito',
  transito: 'en_transito',
  'in transit': 'en_transito',
  transit: 'en_transito',
  'landed us': 'landed_us',
  'landed in us': 'landed_us',
  landed: 'landed_us',
  us: 'landed_us',
  usa: 'landed_us',
  eeuu: 'landed_us',
  'estados unidos': 'landed_us',
};

/** Warehouse cities we know the country of. Add one here to put it in a filter group. */
const UBICACION_CITIES: Record<string, UbicacionKey> = {
  medellin: 'colombia',
  miami: 'landed_us',
  douglas: 'landed_us',
  'miami douglas': 'landed_us',
};

export interface ResolvedUbicacion {
  /** Filter group, when we know it. */
  status?: UbicacionKey;
  /** City to show buyers, as typed. */
  bodega?: string;
  /** False for a place we have not seen before. */
  known: boolean;
}

/**
 * Read what someone typed as the location. A status word sets only the status; a city
 * is kept as the bodega, with its status when we know which country it is in.
 */
export function resolveUbicacion(text: string): ResolvedUbicacion {
  const trimmed = text.trim();
  if (!trimmed) return { known: true };
  if ((UBICACION_VALUES as readonly { value: string }[]).some((u) => u.value === trimmed)) {
    return { status: trimmed as UbicacionKey, known: true };
  }
  const key = normalizeText(trimmed);
  if (UBICACION_STATUS_ALIASES[key]) return { status: UBICACION_STATUS_ALIASES[key], known: true };
  if (UBICACION_CITIES[key]) return { status: UBICACION_CITIES[key], bodega: trimmed, known: true };
  return { bodega: trimmed, known: false };
}

/** A Colombian export bag is 70 kg. */
export const LBS_PER_BAG = 154;

/** Weight is free text ("132 lbs", "120 Bags", "60 kg"); null when it has no number. */
export function weightInLbs(weight: string): number | null {
  const n = parseFloat(weight.replace(/,/g, ''));
  if (Number.isNaN(n)) return null;
  if (/bag|saco/i.test(weight)) return Math.round(n * LBS_PER_BAG);
  if (/\bkg|kilo/i.test(weight)) return Math.round(n * 2.20462);
  return n;
}
