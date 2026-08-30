/**
 * Canonical slug for a green lot detail URL (`/cafe-verde/[handle]`).
 *
 * Shared by the Sanity schema, the CSV importer and the bundled mock data so a
 * lot keeps the same URL no matter which source it came from. Changing this
 * function changes live URLs.
 */

/** Unicode combining marks, stripped after NFD normalisation. */
const COMBINING_MARKS = new RegExp('[\\u0300-\\u036f]', 'g');

export function slugifyLot(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(COMBINING_MARKS, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
