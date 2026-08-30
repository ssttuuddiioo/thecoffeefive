import { getGreenLots } from '@/sanity/fetch';
import { OfferList } from './OfferList';

/**
 * Green coffee offer list. Password-gated in middleware and hidden from the
 * public nav — see `src/config/offer-access.ts`.
 *
 * Lots are fetched on the server so the list is indexable and fast; all the
 * filtering UI runs client-side in `OfferList`.
 */
export const revalidate = 60;

export default async function CafeVerdePage() {
  const lots = await getGreenLots();
  return <OfferList lots={lots} />;
}
