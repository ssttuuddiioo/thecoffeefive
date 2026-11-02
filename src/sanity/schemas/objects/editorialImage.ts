import { defineField, defineType } from 'sanity';

/** A page photo. Removing the image brings back the original bundled photo. */
export const editorialImage = defineType({
  name: 'editorialImage',
  title: 'Foto',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Imagen',
      description: 'Si la quitas, vuelve la foto original. Haz clic en el lápiz para elegir el punto de enfoque.',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'alt',
      title: 'Descripción de la foto',
      description: 'Para personas con lector de pantalla y para Google.',
      type: 'localeString',
    }),
  ],
});
