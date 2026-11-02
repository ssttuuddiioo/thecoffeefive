import { cache } from 'react';
import { getDictionary, type Dictionary } from '@/config/dictionaries';
import type { Locale } from '@/config/i18n';
import { query } from './fetch';
import { COPY_DOCS, COPY_DOC_IDS, type CopyDocId } from './lib/copy-docs';
import { mergeCopy } from './lib/merge-copy';

type CopyDoc = { _id: CopyDocId } & Record<string, unknown>;

const copyDocsQuery = `*[_id in $ids]`;

/**
 * The site's copy for one locale: bundled text with whatever the Studio has
 * published laid over it, field by field. If Sanity is empty or unreachable this
 * is simply the bundled dictionary.
 */
export const getSiteCopy = cache(async (locale: Locale): Promise<Dictionary> => {
  const base = getDictionary(locale);
  const docs = await query<CopyDoc[]>(copyDocsQuery, { ids: COPY_DOC_IDS });
  if (!Array.isArray(docs) || docs.length === 0) return base;

  const merged: Record<string, unknown> = { ...base };
  for (const doc of docs) {
    for (const section of COPY_DOCS[doc._id] ?? []) {
      merged[section] = mergeCopy(base[section], doc[section], locale);
    }
  }
  return merged as Dictionary;
});
