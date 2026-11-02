import { groq } from 'next-sanity';

/** Fields shared by the offer list and the lot detail page. */
const GREEN_LOT_FIELDS = groq`
  ref,
  name,
  "slug": slug.current,
  price,
  weight,
  proceso,
  ubicacion,
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

export const greenLotBySlugQuery = groq`
  *[_type == "greenLot" && slug.current == $slug && disponible != false][0] { ${GREEN_LOT_FIELDS} }
`;

export const greenLotSlugsQuery = groq`
  *[_type == "greenLot" && disponible != false].slug.current
`;

const ROASTED_FIELDS = groq`
  variedad, "slug": slug.current, origin, image, imageBack, price, weight,
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
    "slug": slug.current, category, title, description, readMinutes, publishedAt, coverImage
  }
`;

export const journalArticleBySlugQuery = groq`
  {
    "article": *[_type == "journalArticle" && slug.current == $slug][0] {
      "slug": slug.current, category, title, description, readMinutes, publishedAt, coverImage, body
    }
  }
`;

export const journalSlugsQuery = groq`*[_type == "journalArticle"].slug.current`;

export const siteCopyQuery = groq`*[_type == "siteCopy"][0]`;
