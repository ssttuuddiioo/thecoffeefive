import { slugifyLot } from './slug';

/**
 * URLs for green lot pages (`/cafe-verde/[handle]`).
 *
 * The URL is the lot's current name: "Sidra Honey" lives at `/sidra-honey`.
 * Old URLs are never redirected to another lot: refs get reused for new coffees
 * from one offer to the next, so an old address may belong to a coffee that is gone.
 * Two available lots with the same name get their ref appended so neither is lost.
 */
export type LotUrlSource = { ref: string; name: string };

export function nameHandle(name: string, ref: string): string {
  return slugifyLot(name) || slugifyLot(ref);
}

/** Current URL handle for each lot, keyed by ref. */
export function lotHandles(lots: LotUrlSource[]): Map<string, string> {
  const counts = new Map<string, number>();
  for (const lot of lots) {
    const handle = nameHandle(lot.name, lot.ref);
    counts.set(handle, (counts.get(handle) ?? 0) + 1);
  }
  const handles = new Map<string, string>();
  for (const lot of lots) {
    const handle = nameHandle(lot.name, lot.ref);
    handles.set(lot.ref, (counts.get(handle) ?? 0) > 1 ? `${handle}-${slugifyLot(lot.ref)}` : handle);
  }
  return handles;
}

/** The lot whose current URL is `handle`, if any. */
export function findLotByHandle<T extends LotUrlSource>(lots: T[], handle: string): T | undefined {
  const handles = lotHandles(lots);
  return lots.find((lot) => handles.get(lot.ref) === handle);
}
