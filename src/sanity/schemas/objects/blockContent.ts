import { defineArrayMember, defineType } from 'sanity';

/**
 * Portable Text for journal articles. Deliberately narrow: the current articles
 * only use paragraphs, H2s, bullet lists and tables, so the toolbar stays small
 * and the output keeps rendering predictably.
 */
export const blockContent = defineType({
  name: 'blockContent',
  title: 'Contenido',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Párrafo', value: 'normal' },
        { title: 'Título', value: 'h2' },
        { title: 'Subtítulo', value: 'h3' },
        { title: 'Cita', value: 'blockquote' },
      ],
      lists: [
        { title: 'Viñetas', value: 'bullet' },
        { title: 'Numerada', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Negrita', value: 'strong' },
          { title: 'Cursiva', value: 'em' },
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Enlace',
            fields: [{ name: 'href', type: 'url', title: 'URL' }],
          },
        ],
      },
    }),
    defineArrayMember({ type: 'image', options: { hotspot: true } }),
    defineArrayMember({
      type: 'object',
      name: 'table',
      title: 'Tabla',
      fields: [
        { name: 'headers', title: 'Encabezados', type: 'array', of: [{ type: 'string' }] },
        {
          name: 'rows',
          title: 'Filas',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'row',
              fields: [{ name: 'cells', title: 'Celdas', type: 'array', of: [{ type: 'string' }] }],
              preview: {
                select: { cells: 'cells' },
                prepare: ({ cells }: { cells?: string[] }) => ({
                  title: (cells ?? []).join(' · ') || 'Fila vacía',
                }),
              },
            },
          ],
        },
      ],
      preview: {
        select: { headers: 'headers', rows: 'rows' },
        prepare: ({ headers, rows }: { headers?: string[]; rows?: unknown[] }) => ({
          title: 'Tabla',
          subtitle: `${(headers ?? []).length} columnas · ${(rows ?? []).length} filas`,
        }),
      },
    }),
  ],
});
