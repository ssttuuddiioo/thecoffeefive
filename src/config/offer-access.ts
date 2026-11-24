/**
 * Access control for the green-coffee offer list (`/cafe-verde`).
 *
 * The password is set in the Studio (Café verde → Contraseña). It lives in a
 * document whose id has a dot (`secrets.cafeVerde`): Sanity keeps those private
 * even in a public dataset, so only the server, with a token, can read it.
 * `FALLBACK_OFFER_PASSWORD` is used until that document is published.
 *
 * The unlock cookie has no expiry, so the browser forgets it when it closes and
 * the next visit asks for the password again. Its value is a hash of the
 * password, so changing the password in the Studio locks everyone out at once.
 */
export const FALLBACK_OFFER_PASSWORD = 'coffeefive2026';

/** Cookie that marks a visitor as unlocked. */
export const OFFER_ACCESS_COOKIE = 'cf_offer_access';

/** Sanity document holding the password. */
export const OFFER_SECRET_ID = 'secrets.cafeVerde';
