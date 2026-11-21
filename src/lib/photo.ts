/**
 * An editable photo. `src` starts as a file in /public; Sanity can replace it.
 * `position` is a CSS object-position from the crop focus set in the Studio.
 * `edit` makes it click-to-edit in the Studio preview (a `data-sanity` value).
 */
export type Photo = { src: string; alt: string; position?: string; edit?: string };

export function photo(src: string, alt: string): Photo {
  return { src, alt };
}

/** Spread onto next/image, alongside an explicit `alt`. */
export function photoProps({ src, position, edit }: Photo) {
  return { src, style: position ? { objectPosition: position } : undefined, 'data-sanity': edit };
}
