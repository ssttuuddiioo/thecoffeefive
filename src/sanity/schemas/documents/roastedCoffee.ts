import { defineField, defineType } from 'sanity';
import { PROCESO_VALUES } from './greenLot';

/** A retail bag sold through the Shopify-style cart flow on `/tostado`. */
export const roastedCoffee = defineType({
  name: 'roastedCoffee',
  title: 'Café tostado',
  type: 'document',
  groups: [
    { name: 'basics', title: 'General', default: true },
    { name: 'perfil', title: 'Perfil' },
    { name: 'brew', title: 'Preparación' },
  ],
  fields: [
    defineField({
      name: 'variedad',
      title: 'Variedad',
      type: 'string',
      group: 'basics',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL',
      type: 'slug',
      group: 'basics',
      options: { source: 'variedad', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'origin', title: 'Origen', type: 'string', group: 'basics' }),
    defineField({
      name: 'image',
      title: 'Foto',
      type: 'image',
      group: 'basics',
      options: { hotspot: true },
    }),
    defineField({
      name: 'price',
      title: 'Precio',
      type: 'string',
      group: 'basics',
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'weight', title: 'Presentación', type: 'string', group: 'basics' }),
    defineField({
      name: 'order',
      title: 'Orden',
      description: 'Menor número aparece primero.',
      type: 'number',
      group: 'basics',
    }),

    defineField({
      name: 'proceso',
      title: 'Proceso',
      type: 'string',
      group: 'perfil',
      options: { list: PROCESO_VALUES.map((v) => ({ title: v, value: v })), layout: 'radio' },
    }),
    defineField({ name: 'tueste', title: 'Tueste', type: 'string', group: 'perfil' }),
    defineField({ name: 'fermentacion', title: 'Fermentación', type: 'string', group: 'perfil' }),
    defineField({ name: 'perfil', title: 'Perfil sensorial', type: 'localeString', group: 'perfil' }),

    defineField({ name: 'brewRatio', title: 'Ratio', type: 'string', group: 'brew' }),
    defineField({ name: 'brewTemperatura', title: 'Temperatura', type: 'string', group: 'brew' }),
    defineField({
      name: 'brewMetodos',
      title: 'Métodos',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      group: 'brew',
    }),
    defineField({
      name: 'brewTip',
      title: 'Tip de barista',
      type: 'localeText',
      group: 'brew',
    }),
  ],
  orderings: [
    { title: 'Orden manual', name: 'manual', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'variedad', subtitle: 'origin', media: 'image' },
  },
});
