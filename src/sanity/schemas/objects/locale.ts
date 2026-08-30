import { defineField, defineType } from 'sanity';

/**
 * Field-level bilingual content. The site has exactly two locales, so a simple
 * `{ es, en }` object beats document-level translation: one document per lot or
 * article, both languages edited side by side, no plugin required.
 *
 * Spanish is the source of truth — `en` falling back to `es` is handled by the
 * `pickLocale` reader in `src/sanity/lib/locale.ts`.
 */
export const localeString = defineType({
  name: 'localeString',
  title: 'Texto (ES / EN)',
  type: 'object',
  options: { columns: 2 },
  fields: [
    defineField({ name: 'es', title: 'Español', type: 'string' }),
    defineField({ name: 'en', title: 'English', type: 'string' }),
  ],
});

export const localeText = defineType({
  name: 'localeText',
  title: 'Párrafo (ES / EN)',
  type: 'object',
  fields: [
    defineField({ name: 'es', title: 'Español', type: 'text', rows: 4 }),
    defineField({ name: 'en', title: 'English', type: 'text', rows: 4 }),
  ],
});

/** Rich bilingual body copy, used by journal articles. */
export const localeBlockContent = defineType({
  name: 'localeBlockContent',
  title: 'Contenido (ES / EN)',
  type: 'object',
  fields: [
    defineField({ name: 'es', title: 'Español', type: 'blockContent' }),
    defineField({ name: 'en', title: 'English', type: 'blockContent' }),
  ],
});
