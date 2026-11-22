import { defineField, defineType } from 'sanity';
import { slugifyLot } from '@/lib/slug';
import { PROCESO_VALUES, UBICACION_VALUES } from '@/lib/lot-values';

export { PROCESO_VALUES, UBICACION_VALUES };

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
      description: 'Clave única del lote, por ejemplo HS-001 o RG-002. No la cambies después de publicar: el CSV empareja los lotes por este campo.',
      type: 'string',
      group: 'basics',
      validation: (Rule) =>
        Rule.required()
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
      title: 'URL (sin uso)',
      // Unused: the page URL is the current name (src/lib/lot-urls.ts). Kept hidden so
      // existing documents don't show an unknown-field warning.
      type: 'slug',
      group: 'basics',
      hidden: true,
      options: { source: 'name', slugify: slugifyLot, maxLength: 96 },
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
      description: `Escribe el proceso. ${PROCESO_VALUES.join(', ')} tienen color propio en la tarjeta; cualquier otro (Thermal Shock, Carbonic…) se muestra tal cual, en gris.`,
      type: 'string',
      group: 'basics',
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
      description: 'Grupo del filtro de ubicación. Si la bodega es una ciudad nueva y no encaja, déjalo vacío: la ciudad sale como opción propia.',
      options: { list: UBICACION_VALUES.map((u) => ({ title: u.title, value: u.value })) },
      initialValue: 'colombia',
    }),
    defineField({
      name: 'bodega',
      title: 'Bodega',
      description: 'Lo que ve el comprador: "Medellín", "Miami", "Miami/Douglas". Vacío muestra Colombia / EE.UU.',
      type: 'string',
      group: 'comercial',
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
    defineField({ name: 'puntaje', title: 'SCA', type: 'string', group: 'origen' }),

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
      group: ['basics', 'contenido'],
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
      name: 'procesoDescripcion',
      title: 'Descripción del proceso',
      description: 'Fermentación, secado y demás. Si está vacío se muestra el texto general.',
      type: 'localeText',
      group: 'contenido',
    }),
    defineField({
      name: 'notasCata',
      title: 'Notas de cata',
      description: 'Separadas por comas: Frutas tropicales, Cítrico brillante, Final limpio.',
      type: 'localeString',
      group: 'contenido',
    }),
    defineField({
      name: 'perfilDescripcion',
      title: 'Descripción del perfil',
      description: 'Si está vacío se muestra el texto general.',
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
      bodega: 'bodega',
      media: 'images.0',
      disponible: 'disponible',
    },
    prepare: ({ title, ref, proceso, price, weight, ubicacion, bodega, media, disponible }) => {
      const place = bodega || (UBICACION_VALUES.find((u) => u.value === ubicacion)?.title ?? '');
      const facts = [proceso, price, weight, place].filter(Boolean).join('  ·  ');
      return {
        title: `${disponible === false ? '⏸ ' : ''}${ref} · ${title}`,
        subtitle: disponible === false ? `OCULTO — ${facts}` : facts,
        media,
      };
    },
  },
});
