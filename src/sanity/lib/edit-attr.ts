import { createDataAttribute } from 'next-sanity';
import { dataset, projectId, studioBasePath } from '../env';

/**
 * `data-sanity` value that makes an element click-to-edit in the Studio's Vista previa:
 * clicking it opens that document with `path` focused (e.g. 'images' for the photos).
 *
 * Page copy gets this automatically from hidden markers in its text. Documents like
 * lots are fetched without markers, because their values drive colours, filters and
 * WhatsApp messages, so their elements are tagged explicitly with this instead.
 * Outside the Studio the attribute does nothing.
 */
export function editAttr(id: string | undefined, type: string, path: string): string | undefined {
  if (!id) return undefined;
  return createDataAttribute({ projectId, dataset, baseUrl: studioBasePath, id, type, path }).toString();
}

/** Bound to one document: `const edit = lotEdit(lot.sanityId); <img data-sanity={edit('images')} />`. */
export function documentEdit(id: string | undefined, type: string) {
  return (path: string) => editAttr(id, type, path);
}
