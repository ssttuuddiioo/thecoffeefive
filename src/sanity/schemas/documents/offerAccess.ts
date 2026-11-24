import { defineField, defineType } from 'sanity';

/**
 * The café verde password. Stored as `secrets.cafeVerde`: the dot keeps it out of
 * the public API, so only the site's server can read it. See src/config/offer-access.ts.
 */
export const offerAccess = defineType({
  name: 'offerAccess',
  title: 'Contraseña de café verde',
  type: 'document',
  fields: [
    defineField({
      name: 'password',
      title: 'Contraseña',
      description:
        'La que piden para ver la lista de café verde. Al publicar una nueva, todos tienen que escribirla otra vez. Tarda hasta un minuto en aplicarse.',
      type: 'string',
      validation: (rule) => rule.required().min(4),
    }),
  ],
  preview: { prepare: () => ({ title: 'Contraseña de café verde' }) },
});
