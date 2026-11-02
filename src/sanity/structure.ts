import type { StructureResolver } from 'sanity/structure';
import type { CopyDocId } from './lib/copy-docs';

/**
 * Studio sidebar, organised around how Juan actually works: find a lot, change
 * it, publish. The green coffee list is split by the two questions he asks most
 * — is it still available, and where is it — so he never scrolls a flat list.
 *
 * Each page's text is a singleton: one document, opened directly, with no "create
 * new" affordance, so the site's text can't end up with two competing copies.
 */

/** A fixed document opened directly from the sidebar. */
function singleton(S: Parameters<StructureResolver>[0], id: CopyDocId, title: string) {
  return S.listItem()
    .title(title)
    .id(id)
    .child(S.document().schemaType(id).documentId(id).title(title));
}

/** A filtered list of green lots that still creates new lots correctly. */
function lotList(S: Parameters<StructureResolver>[0], title: string, filter?: string) {
  const list = S.documentTypeList('greenLot')
    .title(title)
    .defaultOrdering([
      { field: 'order', direction: 'asc' },
      { field: 'ref', direction: 'asc' },
    ]);

  if (filter) {
    list.filter(`_type == "greenLot" && ${filter}`);
  }

  return list;
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Coffee Five')
    .items([
      singleton(S, 'copyGlobal', 'General'),
      singleton(S, 'copyHome', 'Inicio'),
      singleton(S, 'copyServicios', 'Consultorio'),
      singleton(S, 'copyNosotros', 'Nosotros'),
      singleton(S, 'copyProceso', 'Proceso'),
      singleton(S, 'copyContacto', 'Contacto'),
      S.divider(),
      S.listItem()
        .title('Café verde')
        .child(
          S.list()
            .title('Café verde')
            .items([
              S.listItem().title('Todos los lotes').child(lotList(S, 'Todos los lotes')),
              S.listItem()
                .title('Disponibles')
                .child(lotList(S, 'Disponibles', 'disponible != false')),
              S.listItem()
                .title('Ocultos')
                .child(lotList(S, 'Ocultos', 'disponible == false')),
              S.divider(),
              S.listItem()
                .title('En Colombia')
                .child(lotList(S, 'En Colombia', 'ubicacion == "colombia"')),
              S.listItem()
                .title('En tránsito')
                .child(lotList(S, 'En tránsito', 'ubicacion == "en_transito"')),
              S.listItem()
                .title('Landed in US')
                .child(lotList(S, 'Landed in US', 'ubicacion == "landed_us"')),
              S.divider(),
              singleton(S, 'copyCafeVerde', 'Textos de café verde'),
            ]),
        ),
      S.listItem()
        .title('Café tostado')
        .child(
          S.list()
            .title('Café tostado')
            .items([
              singleton(S, 'copyTostado', 'Apertura y textos'),
              S.documentTypeListItem('roastedCoffee').title('Cafés'),
            ]),
        ),
      S.listItem()
        .title('Blog')
        .child(
          S.list()
            .title('Blog')
            .items([
              S.documentTypeListItem('journalArticle').title('Artículos'),
              singleton(S, 'copyBlog', 'Textos del blog'),
            ]),
        ),
    ]);
