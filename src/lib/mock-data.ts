import { siteConfig } from '@/config/site';

export const mockGreenLots = [
  // ── RG (Regular Grade) ─────────────────────────────────────────────
  { name: 'Plus Washed Inza', ref: 'RG-001', img: '/lots/rg-001.jpg', photos: ['/lots/rg-001.jpg', '/lots/rg-001-b.jpg'], weight: '140 Bags', price: '$5.85/lb', proceso: 'Lavado', color: siteConfig.procesoColors.lavado, variedad: 'Caturra / Castillo', finca: 'Varios — Inza', altura: '1,800 – 2,100', puntaje: 'UGQ', region: 'Cauca', ubicacion: 'landed_us' as const, disponible: true, humedad: '10.8%', actividadAgua: '0.55', densidad: '710 g/L', criba: '15/16', trilla: 'UGQ', recomendaciones: 'Lavado clásico de Inza — perfil limpio, chocolate y cítricos suaves. Tueste medio, desarrollo 15–18%. Funciona bien como base de blend o single origin.', notaFinca: 'Lotes seleccionados de productores en Inza, Cauca. Café lavado de altura con trazabilidad regional.' },
  { name: 'Standard Washed', ref: 'RG-002', img: '/lots/rg-002.jpg', photos: ['/lots/rg-002.jpg', '/lots/rg-002-b.jpg'], weight: '280 Bags', price: 'NYSE +$1.20/lb', proceso: 'Lavado', color: siteConfig.procesoColors.lavado, variedad: 'Castillo / Colombia', finca: 'Varios — Tolima', altura: '1,800 – 2,100', puntaje: 'UGQ/EP 10', region: 'Tolima', ubicacion: 'colombia' as const, disponible: true, humedad: '11.0%', actividadAgua: '0.56', densidad: '700 g/L', criba: '15/16', trilla: 'UGQ/EP 10', recomendaciones: 'Café de volumen con buena consistencia. Tueste medio a medio-oscuro. Ideal para espresso blends y café de servicio.', notaFinca: 'Lotes de productores en Tolima. Disponible FOB Colombia, mínimo 7 sacos. Precio indexado a bolsa de Nueva York.' },
  { name: 'Organic Washed', ref: 'RG-003', img: '/lots/rg-003.jpg', photos: ['/lots/rg-003.jpg'], weight: '8 Bags', price: '$5.70/lb', proceso: 'Lavado', color: siteConfig.procesoColors.lavado, variedad: 'Castillo / Caturra', finca: 'Varios — Cesar', altura: '1,200 – 1,400', puntaje: 'UGQ', region: 'Cesar', ubicacion: 'landed_us' as const, disponible: true, humedad: '10.9%', actividadAgua: '0.55', densidad: '695 g/L', criba: '15/16', trilla: 'UGQ', recomendaciones: 'Orgánico certificado. Perfil suave, cuerpo medio, notas de nuez y panela. Tueste medio recomendado.', notaFinca: 'Café orgánico del Cesar, zona baja de la Sierra Nevada. Últimos 8 sacos disponibles en bodega Douglas.' },

  // ── HS (High Score / Specialty) ────────────────────────────────────
  { name: 'Pink Bourbon Washed', ref: 'HS-001', img: '/lots/hs-001.jpg', photos: ['/lots/hs-001.jpg', '/lots/hs-001-b.jpg'], weight: '700 lbs', price: '$11/lb', proceso: 'Lavado', color: siteConfig.procesoColors.lavado, variedad: 'Pink Bourbon', finca: 'Ibagué', municipio: 'Ibagué', altura: '2,200', puntaje: 'O2-22', region: 'Tolima', ubicacion: 'colombia' as const, disponible: true, humedad: '10.5%', actividadAgua: '0.53', densidad: '730 g/L', criba: '16/17', trilla: 'EP', recomendaciones: 'Pink Bourbon lavado de altura — acidez brillante, floral, dulzor complejo. Tueste claro, desarrollo corto (12–15%). Excelente para filtro.', notaFinca: 'Finca [Nombre de la finca], administrada por la familia [Apellido], se esmera en cuidar cada detalle del cultivo y proceso para ofrecer siempre lo mejor de su producción cafetera.' },
  { name: 'Chiroso Natural', ref: 'HS-002', img: '/lots/hs-002.jpg', photos: ['/lots/hs-002.jpg', '/lots/hs-002-b.jpg'], weight: '220 lbs', price: '$13/lb', proceso: 'Natural', color: siteConfig.procesoColors.natural, variedad: 'Chiroso', finca: 'Urrao', municipio: 'Urrao', altura: '2,300', puntaje: 'O2-22', region: 'Antioquia', ubicacion: 'colombia' as const, disponible: true, humedad: '11.0%', actividadAgua: '0.55', densidad: '705 g/L', criba: '16/17', trilla: 'EP', recomendaciones: 'Chiroso natural de altura extrema — notas de fruta tropical, fermentación limpia. Carga baja (190°C), desarrollo 14–16%.', notaFinca: 'Chiroso de Urrao, Antioquia, a 2,300 msnm. Secado natural. EWX Medellín.' },
  { name: 'Chiroso Washed', ref: 'HS-003', img: '/lots/hs-003.jpg', photos: ['/lots/hs-003.jpg', '/lots/hs-003-b.jpg'], weight: '120 lbs', price: '$11/lb', proceso: 'Lavado', color: siteConfig.procesoColors.lavado, variedad: 'Chiroso', finca: 'Urrao', municipio: 'Urrao', altura: '2,300', puntaje: 'O2-22', region: 'Antioquia', ubicacion: 'colombia' as const, disponible: true, humedad: '10.6%', actividadAgua: '0.54', densidad: '720 g/L', criba: '16/17', trilla: 'EP', recomendaciones: 'Chiroso lavado — perfil limpio, acidez cítrica, cuerpo sedoso. Tueste claro a medio. Desarrollo 15–17%.', notaFinca: 'Chiroso lavado de Urrao, Antioquia. Lote limitado de 120 lbs. EWX Medellín.' },
  { name: 'Chiroso Washed Ibagué', ref: 'HS-004', img: '/lots/hs-004.jpg', photos: ['/lots/hs-004.jpg', '/lots/hs-004-b.jpg'], weight: '440 lbs', price: '$12/lb', proceso: 'Lavado', color: siteConfig.procesoColors.lavado, variedad: 'Chiroso', finca: 'Ibagué', municipio: 'Ibagué', altura: '2,200', puntaje: 'O2-22', region: 'Tolima', ubicacion: 'colombia' as const, disponible: true, humedad: '10.7%', actividadAgua: '0.54', densidad: '715 g/L', criba: '16/17', trilla: 'EP', recomendaciones: 'Chiroso lavado de Tolima — perfil más dulce que el de Antioquia. Notas de caramelo y fruta de hueso. Desarrollo 14–16%.', notaFinca: 'Chiroso de Ibagué, Tolima, a 2,200 msnm. EWX Medellín, 440 lbs disponibles.' },
  { name: 'Java Natural', ref: 'HS-005', img: '/lots/hs-005.jpg', photos: ['/lots/hs-005.jpg', '/lots/hs-005-b.jpg'], weight: '700 lbs', price: '$12/lb', proceso: 'Natural', color: siteConfig.procesoColors.natural, variedad: 'Java', finca: 'Ibagué', municipio: 'Ibagué', altura: '2,200', puntaje: 'O2-22', region: 'Tolima', ubicacion: 'colombia' as const, disponible: true, humedad: '11.1%', actividadAgua: '0.56', densidad: '700 g/L', criba: '16/17', trilla: 'EP', recomendaciones: 'Java natural — cuerpo pesado, fruta oscura, chocolate. Tueste medio, desarrollo 15–18%. Bueno para espresso y filtro.', notaFinca: 'Variedad Java de Ibagué, Tolima. Proceso natural, 700 lbs disponibles EWX Medellín.' },
  { name: 'Wush Wush Washed', ref: 'HS-006', img: '/lots/hs-006.jpg', photos: ['/lots/hs-006.jpg', '/lots/hs-006-b.jpg'], weight: '700 lbs', price: '$13/lb', proceso: 'Lavado', color: siteConfig.procesoColors.lavado, variedad: 'Wush Wush', finca: 'Ibagué', municipio: 'Ibagué', altura: '2,200', puntaje: 'O2-22', region: 'Tolima', ubicacion: 'colombia' as const, disponible: true, humedad: '10.4%', actividadAgua: '0.53', densidad: '735 g/L', criba: '16/17', trilla: 'EP', recomendaciones: 'Wush Wush — variedad etíope adaptada en Colombia. Perfil floral y cítrico brillante. Tueste claro, desarrollo corto (12–14%).', notaFinca: 'Wush Wush de Ibagué, Tolima. Variedad rara, lavado. 700 lbs EWX Medellín.' },
  { name: 'Geisha Honey', ref: 'HS-007', img: '/lots/hs-007.jpg', photos: ['/lots/hs-007.jpg', '/lots/hs-007-b.jpg'], weight: '700 lbs', price: '$14/lb', proceso: 'Honey', color: siteConfig.procesoColors.honey, variedad: 'Geisha', finca: 'Ibagué', municipio: 'Ibagué', altura: '2,200', puntaje: 'O2-22', region: 'Tolima', ubicacion: 'colombia' as const, disponible: true, humedad: '10.5%', actividadAgua: '0.53', densidad: '740 g/L', criba: '17/18', trilla: 'EP', recomendaciones: 'Geisha honey — complejidad floral con dulzor de mucílago. Café denso, carga alta. Desarrollo corto (12–15%) para preservar jazmín y bergamota.', notaFinca: 'Geisha de Ibagué, Tolima. Proceso honey. 700 lbs disponibles EWX Medellín.' },
  { name: 'Geisha Washed', ref: 'HS-008', img: '/lots/hs-008.jpg', photos: ['/lots/hs-008.jpg', '/lots/hs-008-b.jpg'], weight: '120 lbs', price: '$14/lb', proceso: 'Lavado', color: siteConfig.procesoColors.lavado, variedad: 'Geisha', finca: 'Urrao', municipio: 'Urrao', altura: '2,300', puntaje: 'O2-22', region: 'Antioquia', ubicacion: 'colombia' as const, disponible: true, humedad: '10.3%', actividadAgua: '0.52', densidad: '745 g/L', criba: '17/18', trilla: 'EP', recomendaciones: 'Geisha lavado de Antioquia — perfil limpio, floral, té de jazmín. Muy denso, carga alta (205°C). Desarrollo mínimo (10–12%).', notaFinca: 'Geisha de Urrao, Antioquia, a 2,300 msnm. Lote limitado de 120 lbs. EWX Medellín.' },
];

/** Slug for `/cafe-verde/[handle]` — keep in sync with LotCard & LotDrawer links */
export function greenLotDetailSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export const mockRoastedCoffee = [
  {
    variedad: 'Caturra', img: '/bag1.jpg', origin: 'Bellavista', proceso: 'Honey', tueste: 'Light–medium',
    fermentacion: '48 horas cherry oxidation', perfil: 'Perfil frutal', price: '$18', weight: '250g',
    brew: {
      ratio: '1:15',
      temperatura: '92 °C',
      metodos: ['V60', 'Kalita Wave', 'Batch brew'],
      tip: 'Dale tiempo al bloom — este honey necesita unos 40 segundos para desgasificar bien. Vas a notar cómo se expande la cama de café. Mantené vertidos suaves y circulares para extraer ese dulzor de panela sin sobre-extraer.',
    },
  },
  {
    variedad: 'Gesha', img: '/bag2.jpg', origin: 'El Paraíso', proceso: 'Natural', tueste: 'Light',
    fermentacion: '72 horas anaerobic', perfil: 'Perfil floral', price: '$24', weight: '250g',
    brew: {
      ratio: '1:16',
      temperatura: '90 °C',
      metodos: ['V60', 'Chemex'],
      tip: 'Con este Gesha, menos es más. Usá agua un poco más fría que lo habitual — 90 °C máximo — para no quemar las notas florales. Molienda media-gruesa y extracción lenta. Si lo hacés bien, vas a sentir jazmín en la taza.',
    },
  },
  {
    variedad: 'Castillo', img: '/bag3.jpg', origin: 'La Esperanza', proceso: 'Lavado', tueste: 'Espresso',
    fermentacion: '36 horas semicarbonic', perfil: 'Perfil chocolate', price: '$16', weight: '250g',
    brew: {
      ratio: '1:2 (espresso) · 1:15 (filtro)',
      temperatura: '93 °C',
      metodos: ['Espresso', 'Moka', 'AeroPress'],
      tip: 'Diseñado para espresso — apuntá a 25–30 segundos de extracción con 18g in, 36g out. Si lo querés en filtro, subí la temperatura a 94 °C y usá ratio 1:15. En AeroPress invertido queda brutal: 2 minutos, press lento.',
    },
  },
];

export type JournalArticleSummary = {
  slug: string;
  category: string;
  title: string;
  description: string;
};

export type JournalContentBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'ul'; items: string[] };

export type JournalArticleDetail = JournalArticleSummary & {
  readMinutes: number;
  blocks: JournalContentBlock[];
};

/** Placeholder posts — replace with Shopify blog when the store is live. */
export const mockArticles: JournalArticleSummary[] = [
  {
    slug: 'especialidad-o-tradicional-en-la-finca',
    category: 'Finca',
    title: 'Café de especialidad o café tradicional: cuándo moverse y cuándo no',
    description:
      'Cómo decidir si tiene sentido dar el salto a especialidad o seguir en comercial, según el tipo y tamaño de tu finca — sin romanticismo innecesario.',
  },
  {
    slug: 'sit-to-cup',
    category: 'Consultorio',
    title: 'Sit to cup',
    description:
      'Qué significa acompañar el café desde el origen hasta la taza, por qué ese recorrido importa para tomar mejores decisiones — y cómo el consultorio puede ayudarte.',
  },
  {
    slug: 'mis-primeros-pasos-hacia-la-especialidad',
    category: 'Guía',
    title: 'Mis primeros pasos hacia la especialidad',
    description:
      'Para el productor curioso: primeros experimentos en lote pequeño, qué observar y cómo saber si tu finca puede jugar en especialidad.',
  },
];

const journalDetailBySlug: Record<string, JournalArticleDetail> = {
  'especialidad-o-tradicional-en-la-finca': {
    slug: 'especialidad-o-tradicional-en-la-finca',
    category: 'Finca',
    title: 'Café de especialidad o café tradicional: cuándo moverse y cuándo no',
    description:
      'Cómo decidir si tiene sentido dar el salto a especialidad o seguir en comercial, según el tipo y tamaño de tu finca — sin romanticismo innecesario.',
    readMinutes: 8,
    blocks: [
      {
        type: 'p',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      },
      {
        type: 'h2',
        text: 'Duis aute irure dolor',
      },
      {
        type: 'p',
        text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
      {
        type: 'h2',
        text: 'Sed ut perspiciatis unde',
      },
      {
        type: 'p',
        text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
      },
      {
        type: 'ul',
        items: [
          'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.',
          'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.',
          'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis.',
        ],
      },
      {
        type: 'p',
        text: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
      },
    ],
  },
  'sit-to-cup': {
    slug: 'sit-to-cup',
    category: 'Consultorio',
    title: 'Sit to cup',
    description:
      'Qué significa acompañar el café desde el origen hasta la taza, por qué ese recorrido importa para tomar mejores decisiones — y cómo el consultorio puede ayudarte.',
    readMinutes: 6,
    blocks: [
      {
        type: 'p',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida dictum fusce ut placerat orci nulla.',
      },
      {
        type: 'h2',
        text: 'Risus commodo viverra',
      },
      {
        type: 'p',
        text: 'Risus commodo viverra maecenas accumsan lacus vel facilisis volutpat. Massa tempor nec feugiat pretium fusce id velit ut tortor pretium viverra accumsan in nisl nisi scelerisque eu.',
      },
      {
        type: 'h2',
        text: 'Mauris rhoncus aenean vel',
      },
      {
        type: 'p',
        text: 'Mauris rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
      },
      {
        type: 'p',
        text: 'Egestas integer eget aliquet nibh praesent tristique magna sit amet purus gravida quis blandit turpis cursus in hac habitasse platea dictumst quisque sagittis purus sit.',
      },
    ],
  },
  'mis-primeros-pasos-hacia-la-especialidad': {
    slug: 'mis-primeros-pasos-hacia-la-especialidad',
    category: 'Guía',
    title: 'Mis primeros pasos hacia la especialidad',
    description:
      'Para el productor curioso: primeros experimentos en lote pequeño, qué observar y cómo saber si tu finca puede jugar en especialidad.',
    readMinutes: 7,
    blocks: [
      {
        type: 'p',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
      },
      {
        type: 'h2',
        text: 'Aliquet bibendum enim facilisis',
      },
      {
        type: 'p',
        text: 'Aliquet bibendum enim facilisis gravida neque convallis a cras semper. Vel fringilla est ullamcorper eget nulla facilisi etiam dignissim diam quis enim lobortis scelerisque.',
      },
      {
        type: 'h2',
        text: 'Fermentum posuere urna nec',
      },
      {
        type: 'ul',
        items: [
          'Pharetra convallis posuere morbi leo urna molestie at elementum eu facilisis.',
          'Volutpat consequat mauris nunc congue nisi vitae suscipit tellus mauris a.',
          'Ullamcorper sit amet risus nullam eget felis eget nunc lobortis mattis.',
        ],
      },
      {
        type: 'h2',
        text: 'Ridiculus mus mauris vitae',
      },
      {
        type: 'p',
        text: 'Ridiculus mus mauris vitae ultricies leo integer malesuada nunc vel risus commodo viverra maecenas accumsan lacus vel facilisis volutpat est velit egestas dui id ornare arcu odio ut sem nulla pharetra diam sit.',
      },
    ],
  },
};

export function getJournalArticleBySlug(slug: string): JournalArticleDetail | undefined {
  return journalDetailBySlug[slug];
}

export function getAllJournalSlugs(): string[] {
  return mockArticles.map((a) => a.slug);
}

export const processSteps = [
  { title: 'Cultivo', label: 'CULTIVO', img: '/process-0.jpg', description: 'Semilla, vivero, cultivo, nutrición, control de plagas y enfermedades, procesamiento, control de calidad.' },
  { title: 'Origen', label: 'ORIGEN', img: '/process-1.jpg', description: 'Red de productores, consultoría, buenas prácticas, sourcing ético y relaciones directas.' },
  { title: 'Laboratorio', label: 'LABORATORIO', img: '/process-2.png', description: 'Análisis sensorial, control de calidad, retroalimentación y ajustes, mejora continua de prácticas.' },
  { title: 'Logística', label: 'LOGÍSTICA', img: '/process-3.jpg', description: 'Exportación, importación en EE.UU., transporte terrestre. No vendemos café, vendemos frescura.' },
];

export const consultingServices = [
  { title: 'Asesoría a Fincas', description: 'Nutrición, manejo de plagas, adaptación al cambio climático, diseño de procesos de fermentación y secado.' },
  { title: 'Laboratorio — Medellín', description: 'Lab propio con tostadora, trilladora, espresso, medición de humedad, color, granulometría, mesa de catación. Control de calidad completo.' },
  { title: 'Formación', description: 'Curso "semilla a taza" — catación, tueste, compra de verde. Herramientas para que productores, tostadores y compradores tomen mejores decisiones.' },
];

export const procesoColorMap: Record<string, string> = {
  Lavado: siteConfig.procesoColors.lavado,
  Natural: siteConfig.procesoColors.natural,
  Honey: siteConfig.procesoColors.honey,
  'Anaeróbico': siteConfig.procesoColors.anaerobico,
  Fermentado: siteConfig.procesoColors.fermentado,
};
