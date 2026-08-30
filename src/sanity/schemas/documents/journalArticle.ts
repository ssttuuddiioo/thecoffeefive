import { defineField, defineType } from 'sanity';

/** A post on `/blog`, bilingual, written in Portable Text. */
export const journalArticle = defineType({
  name: 'journalArticle',
  title: 'Artículo del blog',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL',
      description: 'Compartida por ambos idiomas. Cambiarla rompe enlaces existentes.',
      type: 'slug',
      options: { source: 'title.es', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'category', title: 'Categoría', type: 'localeString' }),
    defineField({ name: 'description', title: 'Descripción', type: 'localeText' }),
    defineField({
      name: 'readMinutes',
      title: 'Minutos de lectura',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(60),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Fecha de publicación',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Imagen de portada',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({ name: 'body', title: 'Contenido', type: 'localeBlockContent' }),
  ],
  orderings: [
    { title: 'Más reciente', name: 'newest', by: [{ field: 'publishedAt', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'title.es', subtitle: 'category.es', media: 'coverImage' },
  },
});
