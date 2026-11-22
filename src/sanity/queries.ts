import { groq } from 'next-sanity';

/** Fields shared by the offer list and the lot detail page. */
const GREEN_LOT_FIELDS = groq`
  _id,
  ref,
  name,
  "slug": slug.current,
  price,
  weight,
  proceso,
  colorTarjeta,
  ubicacion,
  bodega,
  disponible,
  variedad,
  finca,
  municipio,
  region,
  altura,
  puntaje,
  humedad,
  actividadAgua,
  densidad,
  criba,
  trilla,
  images,
  recomendaciones,
  notaFinca,
  procesoDescripcion,
  notasCata,
  perfilDescripcion
`;

export const greenLotsQuery = groq`
  *[_type == "greenLot" && disponible != false]
    | order(order asc, ref asc) { ${GREEN_LOT_FIELDS} }
`;

/** Includes hidden lots — used by the CSV exporter so nothing is silently dropped. */
export const allGreenLotsQuery = groq`
  *[_type == "greenLot"] | order(order asc, ref asc) { ${GREEN_LOT_FIELDS}, order }
`;

const ROASTED_FIELDS = groq`
  _id, variedad, "slug": slug.current, origin, image, imageBack, price, weight,
  proceso, tueste, fermentacion, perfil, descripcion,
  brewRatio, brewTemperatura, brewMetodos, brewTip
`;

export const roastedCoffeeQuery = groq`
  *[_type == "roastedCoffee" && disponible != false] | order(order asc) { ${ROASTED_FIELDS} }
`;

export const roastedCoffeeBySlugQuery = groq`
  { "product": *[_type == "roastedCoffee" && slug.current == $slug && disponible != false][0] { ${ROASTED_FIELDS} } }
`;

export const catalogOpenQuery = groq`*[_id == "copyTostado"][0].catalogoActivo`;

export const journalArticlesQuery = groq`
  *[_type == "journalArticle"] | order(publishedAt desc) {
    _id, "slug": slug.current, category, title, description, readMinutes, publishedAt, coverImage
  }
`;

export const journalArticleBySlugQuery = groq`
  {
    "article": *[_type == "journalArticle" && slug.current == $slug][0] {
      _id, "slug": slug.current, category, title, description, readMinutes, publishedAt, coverImage, body
    }
  }
`;

export const journalSlugsQuery = groq`*[_type == "journalArticle"].slug.current`;
