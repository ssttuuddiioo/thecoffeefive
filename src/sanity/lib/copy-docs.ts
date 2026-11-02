import type { Dictionary } from '@/config/dictionaries';

/**
 * Which singleton document in the Studio owns which dictionary section. Each
 * document stores its sections under the same keys as the dictionary, so the
 * overlay in `merge-copy.ts` can walk them together.
 */
export const COPY_DOCS = {
  copyGlobal: ['nav', 'common', 'footer', 'notFound', 'acceso'],
  copyHome: ['hero', 'signup', 'identity', 'process', 'consulting'],
  copyServicios: ['services'],
  copyNosotros: ['about'],
  copyProceso: ['processPage'],
  copyContacto: ['contact'],
  copyCafeVerde: ['cafeVerde', 'lotDetail'],
  copyBlog: ['blog'],
} as const satisfies Record<string, readonly (keyof Dictionary)[]>;

export type CopyDocId = keyof typeof COPY_DOCS;

export const COPY_DOC_IDS = Object.keys(COPY_DOCS) as CopyDocId[];
