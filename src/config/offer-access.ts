/**
 * Access control for the green-coffee offer list (`/cafe-verde`).
 * The list is "hidden" — reachable only with the password below, either via a
 * shared link (`/cafe-verde?key=<password>`) or the `/acceso` gate page.
 */
export const OFFER_PASSWORD = 'coffeefive2026';

/** Cookie that marks a visitor as unlocked. */
export const OFFER_ACCESS_COOKIE = 'cf_offer_access';

/** Opaque value stored in the cookie once the password is accepted. */
export const OFFER_ACCESS_TOKEN = 'cf-offer-2026';

/** Cookie lifetime — 30 days. */
export const OFFER_ACCESS_MAX_AGE = 60 * 60 * 24 * 30;
