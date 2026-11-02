import { defineField, defineType } from 'sanity';
import type { CopyDocId } from '../../lib/copy-docs';

/**
 * The site's text and photos, one singleton per page. Field names mirror
 * `src/config/dictionaries/es.ts`; `npm run sanity:check-copy` reports any drift.
 * Blank fields show the original bundled text.
 */

type Field = ReturnType<typeof defineField>;

const text = (name: string, title: string) => defineField({ name, title, type: 'localeString' });
const para = (name: string, title: string) => defineField({ name, title, type: 'localeText' });
const foto = (name: string, title: string) => defineField({ name, title, type: 'editorialImage' });

/** A list of short texts, such as tags. */
const texts = (name: string, title: string) =>
  defineField({ name, title, type: 'array', of: [{ type: 'localeString' }] });

/** A list of paragraphs. */
const paras = (name: string, title: string) =>
  defineField({ name, title, type: 'array', of: [{ type: 'localeText' }] });

/** A list of rows, such as FAQs. */
const rows = (name: string, title: string, itemTitle: string, fields: Field[]) =>
  defineField({
    name,
    title,
    type: 'array',
    of: [
      {
        type: 'object',
        title: itemTitle,
        fields,
        preview: { select: { title: `${fields[0].name}.es` } },
      },
    ],
  });

const group = (name: string, title: string, fields: Field[]) =>
  defineField({ name, title, type: 'object', options: { collapsible: true, collapsed: true }, fields });

/** A document whose top-level sections each get a tab. */
function page(name: CopyDocId, title: string, sections: { name: string; title: string; fields: Field[] }[]) {
  return defineType({
    name,
    title,
    type: 'document',
    groups: sections.map((s, i) => ({ name: s.name, title: s.title, default: i === 0 })),
    fields: sections.map((s) =>
      defineField({ name: s.name, title: s.title, type: 'object', group: s.name, fields: s.fields }),
    ),
    preview: { prepare: () => ({ title }) },
  });
}

const faqFields = () => [text('question', 'Pregunta'), para('answer', 'Respuesta')];

export const copyGlobal = page('copyGlobal', 'General', [
  {
    name: 'nav',
    title: 'Menú',
    fields: [
      text('roasted', 'Tostado'),
      text('services', 'Consultorio'),
      text('about', 'Nosotros'),
      text('contact', 'Contacto'),
      text('journal', 'Blog'),
    ],
  },
  {
    name: 'footer',
    title: 'Pie de página',
    fields: [
      text('peaceOfMind', 'Frase principal'),
      text('colCafe', 'Columna: Café'),
      text('cafeVerde', 'Enlace: Café verde'),
      text('cafeTostado', 'Enlace: Café tostado'),
      text('merch', 'Enlace: Merch'),
      text('colServices', 'Columna: Servicios'),
      text('fincas', 'Enlace: Asesoría a fincas'),
      text('lab', 'Enlace: Laboratorio'),
      text('formacion', 'Enlace: Formación'),
      text('colCompany', 'Columna: Compañía'),
      text('aboutJuan', 'Enlace: Sobre Juan'),
      text('journal', 'Enlace: Journal'),
      text('contact', 'Enlace: Contacto'),
      text('colNewsletter', 'Columna: Newsletter'),
      text('newsletterBlurb', 'Texto del newsletter'),
      text('location', 'Ubicación'),
    ],
  },
  {
    name: 'common',
    title: 'Botones y formularios',
    fields: [
      text('switchLanguage', 'Cambiar idioma (lector de pantalla)'),
      text('backHome', 'Volver al inicio, con flecha'),
      text('backHomeShort', 'Volver al inicio'),
      text('subscribe', 'Botón de suscripción'),
      text('emailPlaceholder', 'Ejemplo de correo en el campo'),
      text('newsletterSuccess', 'Mensaje al suscribirse'),
    ],
  },
  {
    name: 'notFound',
    title: 'Página no encontrada',
    fields: [text('heading', 'Título'), para('body', 'Texto')],
  },
  {
    name: 'acceso',
    title: 'Acceso con contraseña',
    fields: [
      text('metaTitle', 'Título de la pestaña'),
      text('eyebrow', 'Etiqueta superior'),
      text('heading', 'Título'),
      para('body', 'Texto'),
      text('passwordPlaceholder', 'Campo de contraseña'),
      text('submit', 'Botón'),
      text('error', 'Mensaje de error'),
    ],
  },
]);

const step = (name: string, title: string) =>
  group(name, title, [text('title', 'Título'), para('description', 'Descripción'), foto('photo', 'Foto')]);

const card = (name: string, title: string) =>
  group(name, title, [text('title', 'Título'), para('description', 'Descripción')]);

export const copyHome = page('copyHome', 'Inicio', [
  {
    name: 'hero',
    title: 'Portada',
    fields: [
      text('title', 'Titular'),
      text('ctaPrimary', 'Botón principal'),
      text('ctaSecondary', 'Botón secundario'),
      text('scroll', 'Indicador de scroll'),
      foto('photo', 'Foto de fondo'),
    ],
  },
  {
    name: 'signup',
    title: 'Próximamente',
    fields: [text('eyebrow', 'Etiqueta superior'), text('heading', 'Titular'), para('body', 'Texto')],
  },
  {
    name: 'identity',
    title: 'Sección amarilla',
    fields: [
      text('eyebrow', 'Etiqueta superior'),
      text('heading', 'Titular'),
      text('subheading', 'Subtítulo'),
      para('body', 'Texto'),
      texts('roles', 'Etiquetas'),
      para('reassurance', 'Frase destacada'),
      text('cta', 'Botón'),
      foto('photo', 'Foto'),
    ],
  },
  {
    name: 'process',
    title: 'El Proceso',
    fields: [
      text('tag', 'Etiqueta superior'),
      text('heading', 'Titular'),
      para('body', 'Texto'),
      text('ctaFull', 'Botón'),
      text('cardCta', 'Botón de cada tarjeta'),
      group('steps', 'Tarjetas', [
        step('cultivo', 'Cultivo'),
        step('origen', 'Origen'),
        step('laboratorio', 'Laboratorio'),
        step('logistica', 'Logística'),
      ]),
    ],
  },
  {
    name: 'consulting',
    title: 'Consultorio',
    fields: [
      text('tag', 'Etiqueta superior'),
      text('heading', 'Titular'),
      para('body', 'Texto'),
      group('services', 'Tarjetas', [
        card('baristaPro', 'Barista Pro'),
        card('fincas', 'Asesoría a fincas'),
        card('laboratorio', 'Laboratorio'),
        card('formacion', 'Formación'),
      ]),
      foto('photo1', 'Foto 1'),
      foto('photo2', 'Foto 2'),
      foto('photo3', 'Foto 3'),
    ],
  },
]);

const serviceBlock = (name: string, title: string) =>
  group(name, title, [
    text('title', 'Título'),
    paras('paragraphs', 'Párrafos'),
    text('cta', 'Botón principal'),
    text('knowMore', 'Botón secundario'),
    text('mailSubject', 'Asunto del correo'),
  ]);

export const copyServicios = page('copyServicios', 'Consultorio', [
  {
    name: 'services',
    title: 'Consultorio',
    fields: [
      text('heroEyebrow', 'Portada: etiqueta superior'),
      text('heroTitle', 'Portada: titular'),
      para('heroBody', 'Portada: texto'),
      text('heroCta', 'Portada: botón'),
      foto('heroPhoto', 'Portada: foto'),
      serviceBlock('farm', 'Asesoría a fincas'),
      foto('farmPhoto', 'Asesoría a fincas: foto'),
      serviceBlock('lab', 'Laboratorio'),
      foto('labPhoto', 'Laboratorio: foto'),
      serviceBlock('training', 'Formación'),
      foto('trainingPhoto', 'Formación: foto'),
      group('baristaPro', 'Barista Pro', [
        text('eyebrow', 'Etiqueta superior'),
        text('title', 'Título'),
        paras('paragraphs', 'Párrafos'),
        text('cta', 'Botón'),
        text('mailSubject', 'Asunto del correo'),
        foto('photo', 'Foto'),
      ]),
      text('faqTitle', 'Preguntas: título'),
      text('faqSubtitle', 'Preguntas: subtítulo'),
      rows('faqs', 'Preguntas frecuentes', 'Pregunta', faqFields()),
      text('formTitle', 'Formulario: título'),
      para('formBody', 'Formulario: texto'),
      text('labelName', 'Formulario: nombre'),
      text('labelEmail', 'Formulario: email'),
      text('labelService', 'Formulario: servicio'),
      text('labelMessage', 'Formulario: mensaje'),
      text('optionSelect', 'Opción: seleccionar'),
      text('optionFarm', 'Opción: asesoría a fincas'),
      text('optionLab', 'Opción: laboratorio'),
      text('optionTraining', 'Opción: formación'),
      text('optionBaristaPro', 'Opción: Barista Pro'),
      text('optionOther', 'Opción: otro'),
      text('submit', 'Formulario: botón'),
    ],
  },
]);

export const copyNosotros = page('copyNosotros', 'Nosotros', [
  {
    name: 'about',
    title: 'Nosotros',
    fields: [
      text('heroEyebrow', 'Portada: etiqueta superior'),
      text('heroHeading', 'Portada: titular'),
      para('heroBody', 'Portada: texto'),
      foto('heroPhoto', 'Portada: foto'),
      text('storyEyebrow', 'Historia: etiqueta superior'),
      text('storyHeading', 'Historia: titular'),
      paras('storyParagraphs', 'Historia: párrafos'),
      foto('storyPhoto1', 'Historia: foto grande'),
      foto('storyPhoto2', 'Historia: foto izquierda'),
      foto('storyPhoto3', 'Historia: foto derecha'),
      text('faqTitle', 'Preguntas: título'),
      text('faqSubtitle', 'Preguntas: subtítulo'),
      rows('faqs', 'Preguntas frecuentes', 'Pregunta', faqFields()),
      text('awardsEyebrow', 'Reconocimientos: etiqueta superior'),
      rows('awards', 'Reconocimientos', 'Reconocimiento', [text('title', 'Competencia'), text('place', 'Lugar')]),
    ],
  },
]);

const pillar = (name: string, title: string) =>
  group(name, title, [
    text('title', 'Título'),
    foto('photo', 'Foto'),
    para('intro', 'Introducción'),
    texts('details', 'Puntos'),
  ]);

export const copyProceso = page('copyProceso', 'Proceso', [
  {
    name: 'processPage',
    title: 'Proceso',
    fields: [
      text('eyebrow', 'Etiqueta superior'),
      text('h1', 'Titular'),
      para('intro', 'Texto'),
      group('pillars', 'Pilares', [
        pillar('cultivo', 'Cultivo'),
        pillar('origen', 'Origen'),
        pillar('laboratorio', 'Laboratorio'),
        pillar('logistica', 'Logística'),
      ]),
    ],
  },
]);

export const copyContacto = page('copyContacto', 'Contacto', [
  {
    name: 'contact',
    title: 'Contacto',
    fields: [
      text('eyebrow', 'Etiqueta superior'),
      text('heading', 'Titular'),
      para('intro', 'Texto'),
      text('emailLabel', 'Etiqueta: email'),
      text('whatsappLabel', 'Etiqueta: WhatsApp'),
      text('labLabel', 'Etiqueta: laboratorio'),
      text('labValue', 'Ubicación del laboratorio'),
      text('instagramLabel', 'Etiqueta: Instagram'),
      text('formHeading', 'Formulario: título'),
      text('nameLabel', 'Formulario: nombre'),
      text('namePlaceholder', 'Formulario: ejemplo de nombre'),
      text('emailPlaceholder', 'Formulario: ejemplo de correo'),
      text('subjectLabel', 'Formulario: asunto'),
      text('messageLabel', 'Formulario: mensaje'),
      text('messagePlaceholder', 'Formulario: ejemplo de mensaje'),
      group('options', 'Opciones de asunto', [
        text('empty', 'Seleccionar'),
        text('green', 'Café verde'),
        text('roasted', 'Café tostado'),
        text('consulting', 'Consultoría'),
        text('training', 'Formación'),
        text('other', 'Otro'),
      ]),
      text('submit', 'Formulario: botón'),
    ],
  },
]);

export const copyCafeVerde = page('copyCafeVerde', 'Textos de café verde', [
  {
    name: 'cafeVerde',
    title: 'Lista y filtros',
    fields: [
      text('eyebrow', 'Etiqueta superior'),
      text('title', 'Título'),
      para('intro', 'Texto'),
      text('filterButton', 'Botón de filtros'),
      text('filtersTitle', 'Título de filtros'),
      text('lotsCount', 'Palabra "lotes"'),
      text('empty', 'Sin resultados'),
      text('clear', 'Limpiar filtros'),
      text('searchPlaceholder', 'Campo de búsqueda'),
      text('filterProceso', 'Filtro: proceso'),
      text('filterVariedad', 'Filtro: variedad'),
      text('filterOrigen', 'Filtro: origen'),
      text('filterUbicacion', 'Filtro: ubicación'),
      text('filterAltura', 'Filtro: altura'),
      text('filterFinca', 'Filtro: finca'),
      text('sliderCantidad', 'Filtro: cantidad'),
      text('ubicacionColombia', 'Ubicación: Colombia'),
      text('ubicacionTransito', 'Ubicación: en tránsito'),
      text('ubicacionLandedUs', 'Ubicación: EE.UU.'),
      text('photoPlaceholder', 'Lote sin foto'),
      text('overview', 'Panel: resumen'),
      text('specVariedad', 'Panel: variedad'),
      text('specProceso', 'Panel: proceso'),
      text('specFinca', 'Panel: finca'),
      text('specRegion', 'Panel: región'),
      text('specAltura', 'Panel: altura'),
      text('specNorma', 'Panel: norma'),
      text('specDisponible', 'Panel: disponible'),
      text('specPrecio', 'Panel: precio'),
      text('analisisVerde', 'Panel: análisis verde'),
      text('specHumedad', 'Panel: humedad'),
      text('specActividadAgua', 'Panel: actividad de agua'),
      text('specDensidad', 'Panel: densidad'),
      text('specCriba', 'Panel: criba'),
      text('specTrilla', 'Panel: trilla'),
      text('learnMore', 'Panel: ver detalles'),
      text('enquire', 'Panel: consultar'),
      text('drawerColombia', 'Panel: en Colombia'),
      text('drawerTransito', 'Panel: en tránsito'),
      text('drawerLandedUs', 'Panel: en EE.UU.'),
      text('msnm', 'Unidad de altura'),
    ],
  },
  {
    name: 'lotDetail',
    title: 'Página de cada lote',
    fields: [
      text('proceso', 'Título: proceso'),
      text('perfil', 'Título: perfil'),
      text('recomendaciones', 'Título: recomendaciones'),
      text('metodo', 'Etiqueta: método'),
      para('procesoDescripcion', 'Texto de proceso, si el lote no tiene uno'),
      texts('notasCata', 'Notas de cata, si el lote no tiene'),
      para('perfilDescripcion', 'Texto de perfil, si el lote no tiene uno'),
      text('masl', 'Unidad de altura'),
      text('breadcrumbOrigen', 'Ruta: origen'),
      text('factVarietal', 'Dato: variedad'),
      text('factProceso', 'Dato: proceso'),
      text('factRegion', 'Dato: región'),
      text('factMunicipio', 'Dato: municipio'),
      text('factFinca', 'Dato: finca'),
      text('factAltitude', 'Dato: altura'),
      text('factNorma', 'Dato: norma'),
      text('factAvailable', 'Dato: disponible'),
      text('factPrice', 'Dato: precio'),
      text('enquiryTitle', 'Contacto: título'),
      para('enquiryBody', 'Contacto: texto'),
      text('enquire', 'Botón: consultar'),
      text('email', 'Botón: email'),
      text('whatsapp', 'Botón: WhatsApp'),
    ],
  },
]);

export const copyBlog = page('copyBlog', 'Textos del blog', [
  {
    name: 'blog',
    title: 'Blog',
    fields: [
      text('eyebrow', 'Etiqueta superior'),
      text('heading', 'Titular'),
      para('intro', 'Texto'),
      text('back', 'Volver al blog'),
      text('readMinutes', 'Minutos de lectura'),
      text('role', 'Cargo del autor'),
      text('featuredImage', 'Artículo sin foto'),
      text('author', 'Autor'),
    ],
  },
]);

const copyTostadoPage = page('copyTostado', 'Apertura y textos', [
  {
    name: 'tostado',
    title: 'Textos',
    fields: [
      text('eyebrow', 'Etiqueta superior'),
      text('heading', 'Titular'),
      para('intro', 'Texto'),
      text('verMas', 'Tarjeta: ver más'),
      text('buy', 'Botón de pedido'),
      text('aboutTitle', 'Título: sobre este café'),
      para('aboutBody', 'Texto general: sobre este café'),
      text('prep', 'Título: preparación'),
      text('ratio', 'Dato: ratio'),
      text('temperatura', 'Dato: temperatura'),
      text('metodos', 'Dato: métodos'),
      text('baristaTip', 'Título: tip de barista'),
    ],
  },
]);

export const copyTostado = defineType({
  ...copyTostadoPage,
  groups: [{ name: 'apertura', title: 'Apertura', default: true }, { name: 'tostado', title: 'Textos' }],
  fields: [
    defineField({
      name: 'catalogoActivo',
      title: 'Abrir la tienda',
      description:
        'Apagado: /tostado muestra Próximamente. Encendido: muestra los cafés disponibles. Si no hay ninguno disponible, sigue mostrando Próximamente.',
      type: 'boolean',
      group: 'apertura',
      initialValue: false,
    }),
    ...copyTostadoPage.fields,
  ],
});

export const copyDocuments = [
  copyGlobal,
  copyHome,
  copyServicios,
  copyNosotros,
  copyProceso,
  copyContacto,
  copyCafeVerde,
  copyBlog,
  copyTostado,
];
