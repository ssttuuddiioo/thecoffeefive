import { defineField, defineType } from 'sanity';
import { slugifyLot } from '@/lib/slug';

/** Process values double as logic keys — they drive the lot card colour. */
export const PROCESO_VALUES = ['Lavado', 'Natural', 'Honey', 'Anaeróbico', 'Fermentado'] as const;

/** Where the coffee physically is. Buyers filter on this. */
export const UBICACION_VALUES = [
  { title: '📍 En Colombia', value: 'colombia' },
  { title: '🚢 En tránsito', value: 'en_transito' },
  { title: '📦 Landed in US', value: 'landed_us' },
] as const;

/**
 * A green coffee lot on the offer list (`/cafe-verde`).
 *
 * `ref` is the stable business key: the CSV importer matches on it, so renaming
 * a lot is safe but changing its ref creates a new document.
 */
export const greenLot = defineType({
  name: 'greenLot',
  title: 'Lote de café verde',
  type: 'document',
  groups: [
    { name: 'basics', title: 'General', default: true },
    { name: 'comercial', title: 'Comercial' },
    { name: 'origen', title: 'Origen' },
    { name: 'analisis', title: 'Análisis' },
    { name: 'contenido', title: 'Contenido' },
  ],
  fields: [
    defineField({
      name: 'ref',
      title: 'Referencia',
      description: 'Clave única del lote: HS- para especialidad, RG- para comercial (HS-001, RG-002). No la cambies después de publicar — el CSV empareja los lotes por este campo y una URL ya compartida dejaría de funcionar.',
      type: 'string',
      group: 'basics',
      validation: (Rule) =>
        Rule.required()
          .regex(/^[A-Z]{2}-\d{3}$/, { name: 'formato XX-000' })
          .error('Usa el formato HS-001 o RG-002 (dos letras en mayúscula, guion, tres números).')
          .custom(async (value, context) => {
            if (!value) return true;
            const id = (context.document?._id ?? '').replace(/^drafts\./, '');
            const client = context.getClient({ apiVersion: '2024-10-01' });
            const duplicate = await client.fetch<string | null>(
              `*[_type == "greenLot" && ref == $ref && !(_id in [$id, "drafts." + $id])][0].name`,
              { ref: value, id },
            );
            return duplicate
              ? `La referencia ${value} ya la usa "${duplicate}". Cada lote necesita una única.`
              : true;
          }),
    }),
    defineField({
      name: 'name',
      title: 'Nombre',
      type: 'string',
      group: 'basics',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL',
      description: 'Se genera solo a partir del nombre. Si ya compartiste el enlace del lote con un comprador, no lo cambies.',
      type: 'slug',
      group: 'basics',
      options: { source: 'name', slugify: slugifyLot, maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'disponible',
      title: 'Disponible',
      description: 'Así se marca un lote agotado: desmárcalo y desaparece de la lista, pero el lote y sus fotos se conservan. Siempre preferible a borrarlo — es reversible.',
      type: 'boolean',
      group: 'basics',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Orden',
      description: 'Posición en la lista: 0 aparece primero, luego 1, 2… Déjalo vacío si no te importa el orden.',
      type: 'number',
      group: 'basics',
    }),
    defineField({
      name: 'proceso',
      title: 'Proceso',
      description: 'Define el color de la tarjeta en la lista.',
      type: 'string',
      group: 'basics',
      options: { list: PROCESO_VALUES.map((v) => ({ title: v, value: v })), layout: 'radio' },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'price',
      title: 'Precio',
      description: 'Texto libre — "$5.85/lb" o "NYSE +$1.20/lb".',
      type: 'string',
      group: 'comercial',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'weight',
      title: 'Cantidad disponible',
      description: 'Texto libre — "140 Bags" o "700 lbs".',
      type: 'string',
      group: 'comercial',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ubicacion',
      title: 'Ubicación',
      type: 'string',
      group: 'comercial',
      options: { list: UBICACION_VALUES.map((u) => ({ title: u.title, value: u.value })) },
      initialValue: 'colombia',
      validation: (Rule) => Rule.required(),
    }),

    defineField({ name: 'variedad', title: 'Variedad', type: 'string', group: 'origen' }),
    defineField({ name: 'finca', title: 'Finca', type: 'string', group: 'origen' }),
    defineField({ name: 'municipio', title: 'Municipio', type: 'string', group: 'origen' }),
    defineField({ name: 'region', title: 'Región / Departamento', type: 'string', group: 'origen' }),
    defineField({
      name: 'altura',
      title: 'Altura (msnm)',
      description: 'Texto libre — "2,200" o "1,800 – 2,100".',
      type: 'string',
      group: 'origen',
    }),
    defineField({ name: 'puntaje', title: 'Puntaje / Grado', type: 'string', group: 'origen' }),

    defineField({ name: 'humedad', title: 'Humedad', type: 'string', group: 'analisis' }),
    defineField({ name: 'actividadAgua', title: 'Actividad de agua', type: 'string', group: 'analisis' }),
    defineField({ name: 'densidad', title: 'Densidad', type: 'string', group: 'analisis' }),
    defineField({ name: 'criba', title: 'Criba', type: 'string', group: 'analisis' }),
    defineField({ name: 'trilla', title: 'Trilla', type: 'string', group: 'analisis' }),

    defineField({
      name: 'images',
      title: 'Fotos',
      description: 'La primera foto es la que se ve en la tarjeta de la lista. Arrastra para reordenarlas.',
      type: 'array',
      group: 'contenido',
      of: [{ type: 'image', options: { hotspot: true } }],
      options: { layout: 'grid' },
    }),
    defineField({
      name: 'recomendaciones',
      title: 'Recomendaciones de tueste',
      type: 'localeText',
      group: 'contenido',
    }),
    defineField({
      name: 'notaFinca',
      title: 'Nota de finca',
      type: 'localeText',
      group: 'contenido',
    }),
  ],
  orderings: [
    {
      title: 'Orden manual',
      name: 'manual',
      by: [
        { field: 'order', direction: 'asc' },
        { field: 'ref', direction: 'asc' },
      ],
    },
    { title: 'Referencia', name: 'ref', by: [{ field: 'ref', direction: 'asc' }] },
  ],
  preview: {
    select: {
      title: 'name',
      ref: 'ref',
      proceso: 'proceso',
      price: 'price',
      weight: 'weight',
      ubicacion: 'ubicacion',
      media: 'images.0',
      disponible: 'disponible',
    },
    prepare: ({ title, ref, proceso, price, weight, ubicacion, media, disponible }) => {
      const place = UBICACION_VALUES.find((u) => u.value === ubicacion)?.title ?? '';
      const facts = [proceso, price, weight, place].filter(Boolean).join('  ·  ');
      return {
        title: `${disponible === false ? '⏸ ' : ''}${ref} · ${title}`,
        subtitle: disponible === false ? `OCULTO — ${facts}` : facts,
        media,
      };
    },
  },
});
