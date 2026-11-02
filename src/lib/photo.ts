/**
 * An editable photo. `src` starts as a file in /public; Sanity can replace it.
 * `position` is a CSS object-position from the crop focus set in the Studio.
 */
export type Photo = { src: string; alt: string; position?: string };

export function photo(src: string, alt: string): Photo {
  return { src, alt };
}

/** Spread onto next/image, alongside an explicit `alt`. */
export function photoProps({ src, position }: Photo) {
  return { src, style: position ? { objectPosition: position } : undefined };
}
