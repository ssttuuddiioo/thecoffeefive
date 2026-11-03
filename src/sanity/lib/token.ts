/**
 * Viewer-role token for reading drafts in the Studio's live preview. Server only:
 * it has no NEXT_PUBLIC_ prefix, so Next never ships it to the browser.
 */
export const readToken = process.env.SANITY_API_READ_TOKEN ?? '';
