import { defineDocuments, defineLocations, type PresentationPluginOptions } from 'sanity/presentation';

/**
 * Wires the Studio's side-by-side preview to the site. `mainDocuments` opens the
 * right document when you browse to a page in the preview; `locations` lists the
 * pages a document appears on. Previews open in Spanish, the source language.
 */

const page = (title: string, href: string) => defineLocations({ locations: [{ title, href }] });

const pages: Record<string, { title: string; href: string }> = {
  copyHome: { title: 'Inicio', href: '/es' },
  copyServicios: { title: 'Consultorio', href: '/es/services' },
  copyNosotros: { title: 'Nosotros', href: '/es/about' },
  copyProceso: { title: 'Proceso', href: '/es/process' },
  copyContacto: { title: 'Contacto', href: '/es/contact' },
  copyCafeVerde: { title: 'Café verde', href: '/es/cafe-verde' },
  copyBlog: { title: 'Blog', href: '/es/blog' },
  copyTostado: { title: 'Café tostado', href: '/es/tostado' },
};

const singleton = (route: string, id: string) => ({ route, filter: `_id == "${id}"` });

export const presentationResolve: PresentationPluginOptions['resolve'] = {
  mainDocuments: defineDocuments([
    singleton('/:locale', 'copyHome'),
    singleton('/:locale/services', 'copyServicios'),
    singleton('/:locale/about', 'copyNosotros'),
    singleton('/:locale/process', 'copyProceso'),
    singleton('/:locale/contact', 'copyContacto'),
    singleton('/:locale/cafe-verde', 'copyCafeVerde'),
    singleton('/:locale/blog', 'copyBlog'),
    singleton('/:locale/tostado', 'copyTostado'),
    { route: '/:locale/cafe-verde/:slug', filter: `_type == "greenLot" && slug.current == $slug` },
    { route: '/:locale/blog/:slug', filter: `_type == "journalArticle" && slug.current == $slug` },
    { route: '/:locale/tostado/:slug', filter: `_type == "roastedCoffee" && slug.current == $slug` },
  ]),
  locations: {
    ...Object.fromEntries(Object.entries(pages).map(([id, { title, href }]) => [id, page(title, href)])),
    copyGlobal: page('Todas las páginas', '/es'),
    greenLot: defineLocations({
      select: { title: 'name', slug: 'slug.current' },
      resolve: (doc) => ({
        locations: doc?.slug ? [{ title: doc.title ?? 'Lote', href: `/es/cafe-verde/${doc.slug}` }] : [],
      }),
    }),
    journalArticle: defineLocations({
      select: { title: 'title.es', slug: 'slug.current' },
      resolve: (doc) => ({
        locations: doc?.slug ? [{ title: doc.title ?? 'Artículo', href: `/es/blog/${doc.slug}` }] : [],
      }),
    }),
    roastedCoffee: defineLocations({
      select: { title: 'variedad', slug: 'slug.current' },
      resolve: (doc) => ({
        locations: doc?.slug ? [{ title: doc.title ?? 'Café', href: `/es/tostado/${doc.slug}` }] : [],
      }),
    }),
  },
};
