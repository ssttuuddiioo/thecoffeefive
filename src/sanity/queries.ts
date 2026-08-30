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
  notaFinca
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
  *[_type == "greenLot" && slug.current == $slug][0] { ${GREEN_LOT_FIELDS} }
`;

export const greenLotSlugsQuery = groq`
  *[_type == "greenLot" && disponible != false].slug.current
`;

export const roastedCoffeeQuery = groq`
  *[_type == "roastedCoffee"] | order(order asc) {
    variedad, "slug": slug.current, origin, image, price, weight,
    proceso, tueste, fermentacion, perfil,
    brewRatio, brewTemperatura, brewMetodos, brewTip
  }
`;

export const journalArticlesQuery = groq`
  *[_type == "journalArticle"] | order(publishedAt desc) {
    "slug": slug.current, category, title, description, readMinutes, publishedAt, coverImage
  }
`;

export const journalArticleBySlugQuery = groq`
  *[_type == "journalArticle" && slug.current == $slug][0] {
    "slug": slug.current, category, title, description, readMinutes, publishedAt, coverImage, body
  }
`;

export const journalSlugsQuery = groq`*[_type == "journalArticle"].slug.current`;

export const siteCopyQuery = groq`*[_type == "siteCopy"][0]`;
