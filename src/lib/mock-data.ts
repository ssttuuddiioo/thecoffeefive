import { siteConfig } from '@/config/site';
import type { Locale } from '@/config/i18n';

export const mockGreenLots = [
  // ── RG (Regular Grade) ─────────────────────────────────────────────
  { name: 'Plus Washed Inza', ref: 'RG-001', img: '/lots/rg-001.jpg', photos: ['/lots/rg-001.jpg', '/lots/rg-001-b.jpg'], weight: '140 Bags', price: '$5.85/lb', proceso: 'Lavado', color: siteConfig.procesoColors.lavado, variedad: 'Caturra / Castillo', finca: 'Varios — Inza', altura: '1,800 – 2,100', puntaje: 'UGQ', region: 'Cauca', ubicacion: 'landed_us' as const, disponible: true, humedad: '10.8%', actividadAgua: '0.55', densidad: '710 g/L', criba: '15/16', trilla: 'UGQ', recomendaciones: 'Lavado clásico de Inza — perfil limpio, chocolate y cítricos suaves. Tueste medio, desarrollo 15–18%. Funciona bien como base de blend o single origin.', notaFinca: 'Lotes seleccionados de productores en Inza, Cauca. Café lavado de altura con trazabilidad regional.', notaFincaEn: 'Selected lots from producers in Inza, Cauca. High-altitude washed coffee with regional traceability.' },
  { name: 'Standard Washed', ref: 'RG-002', img: '/lots/rg-002.jpg', photos: ['/lots/rg-002.jpg', '/lots/rg-002-b.jpg'], weight: '280 Bags', price: 'NYSE +$1.20/lb', proceso: 'Lavado', color: siteConfig.procesoColors.lavado, variedad: 'Castillo / Colombia', finca: 'Varios — Tolima', altura: '1,800 – 2,100', puntaje: 'UGQ/EP 10', region: 'Tolima', ubicacion: 'colombia' as const, disponible: true, humedad: '11.0%', actividadAgua: '0.56', densidad: '700 g/L', criba: '15/16', trilla: 'UGQ/EP 10', recomendaciones: 'Café de volumen con buena consistencia. Tueste medio a medio-oscuro. Ideal para espresso blends y café de servicio.', notaFinca: 'Lotes de productores en Tolima. Disponible FOB Colombia, mínimo 7 sacos. Precio indexado a bolsa de Nueva York.', notaFincaEn: 'Lots from producers in Tolima. Available FOB Colombia, 7-bag minimum. Price indexed to the New York exchange.' },
  { name: 'Organic Washed', ref: 'RG-003', img: '/lots/rg-003.jpg', photos: ['/lots/rg-003.jpg'], weight: '8 Bags', price: '$5.70/lb', proceso: 'Lavado', color: siteConfig.procesoColors.lavado, variedad: 'Castillo / Caturra', finca: 'Varios — Cesar', altura: '1,200 – 1,400', puntaje: 'UGQ', region: 'Cesar', ubicacion: 'landed_us' as const, disponible: true, humedad: '10.9%', actividadAgua: '0.55', densidad: '695 g/L', criba: '15/16', trilla: 'UGQ', recomendaciones: 'Orgánico certificado. Perfil suave, cuerpo medio, notas de nuez y panela. Tueste medio recomendado.', notaFinca: 'Café orgánico del Cesar, zona baja de la Sierra Nevada. Últimos 8 sacos disponibles en bodega Douglas.', notaFincaEn: 'Organic coffee from Cesar, the lower slopes of the Sierra Nevada. Last 8 bags available at the Douglas warehouse.' },

  // ── HS (High Score / Specialty) ────────────────────────────────────
  { name: 'Pink Bourbon Washed', ref: 'HS-001', img: '/lots/hs-001.jpg', photos: ['/lots/hs-001.jpg', '/lots/hs-001-b.jpg'], weight: '700 lbs', price: '$11/lb', proceso: 'Lavado', color: siteConfig.procesoColors.lavado, variedad: 'Pink Bourbon', finca: 'Ibagué', municipio: 'Ibagué', altura: '2,200', puntaje: 'O2-22', region: 'Tolima', ubicacion: 'colombia' as const, disponible: true, humedad: '10.5%', actividadAgua: '0.53', densidad: '730 g/L', criba: '16/17', trilla: 'EP', recomendaciones: 'Pink Bourbon lavado de altura — acidez brillante, floral, dulzor complejo. Tueste claro, desarrollo corto (12–15%). Excelente para filtro.', notaFinca: 'Finca [Nombre de la finca], administrada por la familia [Apellido], se esmera en cuidar cada detalle del cultivo y proceso para ofrecer siempre lo mejor de su producción cafetera.', notaFincaEn: 'Finca [Farm name], run by the [Surname] family, takes care of every detail of cultivation and processing to always deliver the best of its harvest.' },
  { name: 'Chiroso Natural', ref: 'HS-002', img: '/lots/hs-002.jpg', photos: ['/lots/hs-002.jpg', '/lots/hs-002-b.jpg'], weight: '220 lbs', price: '$13/lb', proceso: 'Natural', color: siteConfig.procesoColors.natural, variedad: 'Chiroso', finca: 'Urrao', municipio: 'Urrao', altura: '2,300', puntaje: 'O2-22', region: 'Antioquia', ubicacion: 'colombia' as const, disponible: true, humedad: '11.0%', actividadAgua: '0.55', densidad: '705 g/L', criba: '16/17', trilla: 'EP', recomendaciones: 'Chiroso natural de altura extrema — notas de fruta tropical, fermentación limpia. Carga baja (190°C), desarrollo 14–16%.', notaFinca: 'Chiroso de Urrao, Antioquia, a 2,300 msnm. Secado natural. EWX Medellín.', notaFincaEn: 'Chiroso from Urrao, Antioquia, at 2,300 masl. Natural dried. EWX Medellín.' },
  { name: 'Chiroso Washed', ref: 'HS-003', img: '/lots/hs-003.jpg', photos: ['/lots/hs-003.jpg', '/lots/hs-003-b.jpg'], weight: '120 lbs', price: '$11/lb', proceso: 'Lavado', color: siteConfig.procesoColors.lavado, variedad: 'Chiroso', finca: 'Urrao', municipio: 'Urrao', altura: '2,300', puntaje: 'O2-22', region: 'Antioquia', ubicacion: 'colombia' as const, disponible: true, humedad: '10.6%', actividadAgua: '0.54', densidad: '720 g/L', criba: '16/17', trilla: 'EP', recomendaciones: 'Chiroso lavado — perfil limpio, acidez cítrica, cuerpo sedoso. Tueste claro a medio. Desarrollo 15–17%.', notaFinca: 'Chiroso lavado de Urrao, Antioquia. Lote limitado de 120 lbs. EWX Medellín.', notaFincaEn: 'Washed Chiroso from Urrao, Antioquia. Limited 120 lb lot. EWX Medellín.' },
  { name: 'Chiroso Washed Ibagué', ref: 'HS-004', img: '/lots/hs-004.jpg', photos: ['/lots/hs-004.jpg', '/lots/hs-004-b.jpg'], weight: '440 lbs', price: '$12/lb', proceso: 'Lavado', color: siteConfig.procesoColors.lavado, variedad: 'Chiroso', finca: 'Ibagué', municipio: 'Ibagué', altura: '2,200', puntaje: 'O2-22', region: 'Tolima', ubicacion: 'colombia' as const, disponible: true, humedad: '10.7%', actividadAgua: '0.54', densidad: '715 g/L', criba: '16/17', trilla: 'EP', recomendaciones: 'Chiroso lavado de Tolima — perfil más dulce que el de Antioquia. Notas de caramelo y fruta de hueso. Desarrollo 14–16%.', notaFinca: 'Chiroso de Ibagué, Tolima, a 2,200 msnm. EWX Medellín, 440 lbs disponibles.', notaFincaEn: 'Chiroso from Ibagué, Tolima, at 2,200 masl. EWX Medellín, 440 lbs available.' },
  { name: 'Java Natural', ref: 'HS-005', img: '/lots/hs-005.jpg', photos: ['/lots/hs-005.jpg', '/lots/hs-005-b.jpg'], weight: '700 lbs', price: '$12/lb', proceso: 'Natural', color: siteConfig.procesoColors.natural, variedad: 'Java', finca: 'Ibagué', municipio: 'Ibagué', altura: '2,200', puntaje: 'O2-22', region: 'Tolima', ubicacion: 'colombia' as const, disponible: true, humedad: '11.1%', actividadAgua: '0.56', densidad: '700 g/L', criba: '16/17', trilla: 'EP', recomendaciones: 'Java natural — cuerpo pesado, fruta oscura, chocolate. Tueste medio, desarrollo 15–18%. Bueno para espresso y filtro.', notaFinca: 'Variedad Java de Ibagué, Tolima. Proceso natural, 700 lbs disponibles EWX Medellín.', notaFincaEn: 'Java variety from Ibagué, Tolima. Natural process, 700 lbs available at EWX Medellín.' },
  { name: 'Wush Wush Washed', ref: 'HS-006', img: '/lots/hs-006.jpg', photos: ['/lots/hs-006.jpg', '/lots/hs-006-b.jpg'], weight: '700 lbs', price: '$13/lb', proceso: 'Lavado', color: siteConfig.procesoColors.lavado, variedad: 'Wush Wush', finca: 'Ibagué', municipio: 'Ibagué', altura: '2,200', puntaje: 'O2-22', region: 'Tolima', ubicacion: 'colombia' as const, disponible: true, humedad: '10.4%', actividadAgua: '0.53', densidad: '735 g/L', criba: '16/17', trilla: 'EP', recomendaciones: 'Wush Wush — variedad etíope adaptada en Colombia. Perfil floral y cítrico brillante. Tueste claro, desarrollo corto (12–14%).', notaFinca: 'Wush Wush de Ibagué, Tolima. Variedad rara, lavado. 700 lbs EWX Medellín.', notaFincaEn: 'Wush Wush from Ibagué, Tolima. Rare variety, washed. 700 lbs at EWX Medellín.' },
  { name: 'Geisha Honey', ref: 'HS-007', img: '/lots/hs-007.jpg', photos: ['/lots/hs-007.jpg', '/lots/hs-007-b.jpg'], weight: '700 lbs', price: '$14/lb', proceso: 'Honey', color: siteConfig.procesoColors.honey, variedad: 'Geisha', finca: 'Ibagué', municipio: 'Ibagué', altura: '2,200', puntaje: 'O2-22', region: 'Tolima', ubicacion: 'colombia' as const, disponible: true, humedad: '10.5%', actividadAgua: '0.53', densidad: '740 g/L', criba: '17/18', trilla: 'EP', recomendaciones: 'Geisha honey — complejidad floral con dulzor de mucílago. Café denso, carga alta. Desarrollo corto (12–15%) para preservar jazmín y bergamota.', notaFinca: 'Geisha de Ibagué, Tolima. Proceso honey. 700 lbs disponibles EWX Medellín.', notaFincaEn: 'Geisha from Ibagué, Tolima. Honey process. 700 lbs available at EWX Medellín.' },
  { name: 'Geisha Washed', ref: 'HS-008', img: '/lots/hs-008.jpg', photos: ['/lots/hs-008.jpg', '/lots/hs-008-b.jpg'], weight: '120 lbs', price: '$14/lb', proceso: 'Lavado', color: siteConfig.procesoColors.lavado, variedad: 'Geisha', finca: 'Urrao', municipio: 'Urrao', altura: '2,300', puntaje: 'O2-22', region: 'Antioquia', ubicacion: 'colombia' as const, disponible: true, humedad: '10.3%', actividadAgua: '0.52', densidad: '745 g/L', criba: '17/18', trilla: 'EP', recomendaciones: 'Geisha lavado de Antioquia — perfil limpio, floral, té de jazmín. Muy denso, carga alta (205°C). Desarrollo mínimo (10–12%).', notaFinca: 'Geisha de Urrao, Antioquia, a 2,300 msnm. Lote limitado de 120 lbs. EWX Medellín.', notaFincaEn: 'Geisha from Urrao, Antioquia, at 2,300 masl. Limited 120 lb lot. EWX Medellín.' },
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
    variedad: 'Caturra', img: '/bag-front.jpg', origin: 'Bellavista', proceso: 'Honey', tueste: 'Light–medium',
    fermentacion: '48 horas cherry oxidation', perfil: 'Perfil frutal', price: '$18', weight: '250g',
    brew: {
      ratio: '1:15',
      temperatura: '92 °C',
      metodos: ['V60', 'Kalita Wave', 'Batch brew'],
      tip: 'Dale tiempo al bloom — este honey necesita unos 40 segundos para desgasificar bien. Vas a notar cómo se expande la cama de café. Mantené vertidos suaves y circulares para extraer ese dulzor de panela sin sobre-extraer.',
    },
  },
  {
    variedad: 'Gesha', img: '/bag-front.jpg', origin: 'El Paraíso', proceso: 'Natural', tueste: 'Light',
    fermentacion: '72 horas anaerobic', perfil: 'Perfil floral', price: '$24', weight: '250g',
    brew: {
      ratio: '1:16',
      temperatura: '90 °C',
      metodos: ['V60', 'Chemex'],
      tip: 'Con este Gesha, menos es más. Usá agua un poco más fría que lo habitual — 90 °C máximo — para no quemar las notas florales. Molienda media-gruesa y extracción lenta. Si lo hacés bien, vas a sentir jazmín en la taza.',
    },
  },
  {
    variedad: 'Castillo', img: '/bag-front.jpg', origin: 'La Esperanza', proceso: 'Lavado', tueste: 'Espresso',
    fermentacion: '36 horas semicarbonic', perfil: 'Perfil chocolate', price: '$16', weight: '250g',
    brew: {
      ratio: '1:2 (espresso) · 1:15 (filtro)',
      temperatura: '93 °C',
      metodos: ['Espresso', 'Moka', 'AeroPress'],
      tip: 'Diseñado para espresso — apuntá a 25–30 segundos de extracción con 18g in, 36g out. Si lo querés en filtro, subí la temperatura a 94 °C y usá ratio 1:15. En AeroPress invertido queda brutal: 2 minutos, press lento.',
    },
  },
];

export type JournalContentBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'table'; headers: string[]; rows: string[][] };

export type JournalArticleSummary = {
  slug: string;
  category: string;
  title: string;
  description: string;
};

export type JournalArticleDetail = JournalArticleSummary & {
  readMinutes: number;
  blocks: JournalContentBlock[];
};

type Localized<T> = Record<Locale, T>;

type JournalSource = {
  slug: string;
  readMinutes: number;
  category: Localized<string>;
  title: Localized<string>;
  description: Localized<string>;
  blocks: Localized<JournalContentBlock[]>;
};

/**
 * Bilingual journal sources. Real content lives here until the Shopify blog is
 * live; each article carries full ES + EN copy so the site can render either
 * locale. Migrate one-to-one into Shopify articles (ES + EN) when the store
 * goes live — see getJournalArticles / getJournalArticleBySlug below.
 */
const journalSources: JournalSource[] = [
  {
    slug: 'especialidad-o-tradicional-en-la-finca',
    readMinutes: 9,
    category: { es: 'Finca', en: 'Farm' },
    title: {
      es: 'Caficultura de especialidad o tradicional: ¿debo atreverme?',
      en: 'Specialty vs. traditional coffee farming: should I dare?',
    },
    description: {
      es: 'La guía para innovar en la finca sin arriesgar el patrimonio familiar: ciencia, laboratorio casero, calendario de cosecha y la matemática del microlote.',
      en: 'The guide to innovating on the farm without risking family capital: science, a home lab, harvest scheduling, and the math of the micro-lot.',
    },
    blocks: {
      es: [
        { type: 'h2', text: 'Introducción: el dilema en el cafetal y el desafío generacional' },
        { type: 'p', text: 'Para miles de jóvenes en familias caficultoras tradicionales, el acceso a las redes sociales ha abierto una ventana fascinante al mundo del café de especialidad. A través de las pantallas vemos procesos innovadores, perfiles sensoriales exóticos y la promesa tentadora de precios diferenciados. Sin embargo, al apagar el teléfono y enfrentar la realidad del hogar, intentar convencer a nuestros padres y abuelos no es tarea fácil.' },
        { type: 'p', text: 'Para las generaciones mayores, que han dedicado décadas o siglos a consolidar un conocimiento empírico, la especialidad genera dudas razonables: ¿vale la pena invertir más tiempo, más trabajo y más dinero en algo que no conocemos a fondo? La resistencia al cambio es un mecanismo natural de defensa para proteger el sustento familiar. El secreto para dar el salto no está en imponer ideas, sino en demostrar viabilidad con respeto, técnica y una gestión de riesgo impecable.' },
        { type: 'h2', text: '1. Ciencia antes que tendencias: ¿por qué el contenido de redes no es suficiente?' },
        { type: 'p', text: 'El primer error común es basar la estrategia productiva de la finca en videos cortos o publicaciones virales. Aunque existen creadores honestos, la información digital suele estar fragmentada, incompleta o diseñada para geografías distintas a la tuya.' },
        { type: 'p', text: 'Para argumentar con solidez frente a tu familia, el punto de partida debe ser académico. En Colombia contamos con la biblioteca virtual de Cenicafé, un recurso técnico gratuito que contiene décadas de investigación rigurosa. Estudiar los fundamentos de la microbiología y el procesamiento te permitirá hablar con propiedad y evitar errores costosos. Pero aquí surge la primera pregunta clave: ¿sabes cómo interpretar y adaptar esos manuales científicos al microclima y las variedades específicas de tu finca?' },
        { type: 'h2', text: '2. El laboratorio casero: experimenta sin empeñar la finca' },
        { type: 'p', text: 'Probar si la especialidad es para ti no exige construir infraestructuras millonarias ni comprar maquinaria importada. Puedes montar un prototipo de experimentación sumamente riguroso con elementos de bajo costo:' },
        { type: 'ul', items: [
          'El contenedor: bolsas plásticas herméticas de alta densidad (tipo GrainPro), ideales para controlar procesos anaeróbicos.',
          'La trampa de agua artesanal: una manguera delgada de acuario conectada a la bolsa y sumergida en una botella plástica de 600 ml con agua, que permite liberar los gases (CO₂) sin dejar entrar oxígeno.',
        ] },
        { type: 'p', text: 'Con este montaje básico puedes controlar variables como tiempo y temperatura. Sin embargo, medir la fermentación es solo la mitad del trabajo: ¿tienes claros los límites microbiológicos para evitar que tu lote desarrolle notas acéticas, fenólicas o sobrefermentadas?' },
        { type: 'h2', text: '3. Calendario estratégico: proteger el pico de cosecha' },
        { type: 'p', text: 'El manejo del tiempo y la mano de obra es lo que más preocupa a los caficultores experimentados. Por eso, los experimentos deben planificarse estratégicamente según la maduración de tus cafetales:' },
        { type: 'table',
          headers: ['Comportamiento de la finca', 'Momento ideal para especialidad', 'Fundamento operativo'],
          rows: [
            ['Fincas con cosecha concentrada y pareja', 'Dejar la experimentación únicamente para el final de la cosecha.', 'Procesas remanentes sin entorpecer el flujo masivo de café ni saturar la recolección.'],
            ['Fincas en zonas altas (maduración lenta)', 'Trabajar en las etapas lentas: inicio, final de cosecha, graneos o «re-re».', 'Proteges el «pico» para volumen tradicional y aprovechas los flujos bajos para cuidar el microlote.'],
          ] },
        { type: 'p', text: 'El riesgo oculto de los procesos naturales: si planeas procesar cafés por la vía natural (secado en cereza entera), ten en cuenta que estos lotes requieren mucho más tiempo y pueden colapsar tus marquesinas o secadores solares. Nunca trabajes naturales en el pico de cosecha; restríngelos al final de la temporada o entre graneos. Aún así: ¿sabes con precisión cuál es la capacidad máxima de secado de tu finca sin arriesgar la calidad del café tradicional?' },
        { type: 'h2', text: '4. La matemática del microlote: evita pérdidas innecesarias' },
        { type: 'p', text: 'Para evaluar si el experimento es rentable, los números deben ser exactos. En la caficultura aplicamos la relación estándar 5 a 1 (5 kg de cereza equivalen a 1 kg de pergamino seco limpio).' },
        { type: 'p', text: 'Si tu meta es producir un microlote de una carga de pergamino seco (125 kg), debes proyectar la recolección de unos 700 kilos de cereza bruta. Este margen absorbe la pérdida natural por flotes y pasillas en el tanque. Además, la regla de oro es cosechar 100 % granos maduros; la presencia de pintones destruye el perfil de taza con astringencias. La pregunta matemática es: ¿el sobreprecio que obtendrás por esa carga compensa realmente el costo adicional de la recolección selectiva en tu zona?' },
        { type: 'h2', text: '5. Validación comercial: romper la ceguera de taza' },
        { type: 'p', text: 'Una vez secado y reposado el café, el proceso no termina en la bodega. Para saber si el esfuerzo valió la pena no basta con tu opinión ni la de tus amigos; necesitas retroalimentación objetiva:' },
        { type: 'ul', items: [
          'Lleva muestras a un laboratorio de catación certificado (SCA).',
          'Pide el respaldo del área de calidades de tu cooperativa local.',
          'Aprovecha las redes sociales para conectar con tostadores o compradores dispuestos a evaluar tus muestras.',
        ] },
        { type: 'h2', text: 'Conclusión: el balance inteligente y la producción escalonada' },
        { type: 'p', text: 'La decisión de migrar a la especialidad no tiene por qué ser un «todo o nada». La estrategia más inteligente es escalonada: procesar un pequeño lote de prueba —por ejemplo, una sola carga— y aprender a balancear la producción.' },
        { type: 'p', text: 'Puedes mantener la cosecha principal en el canal tradicional para asegurar la tranquilidad y los ingresos de la finca, mientras utilizas las épocas lentas para desarrollar especialidad. Con los datos reales en la mano, sabrás con certeza si lo ideal para tu negocio es mantener un modelo híbrido, retornar 100 % a lo tradicional o hacer la transición completa.' },
        { type: 'h2', text: '¿Quieres diseñar la estrategia exacta para tu finca sin poner en riesgo tu capital?' },
        { type: 'p', text: 'Cada finca es un universo diferente: la altitud, las variedades, el clima y la capacidad de secado cambian las reglas del juego. Pasar de la teoría a la práctica sin cometer errores costosos requiere acompañamiento técnico personalizado.' },
        { type: 'p', text: 'En The Coffee Five ayudamos a familias caficultoras a diseñar protocolos de procesamiento a medida, calcular costos de producción reales y estructurar ofertas comerciales atractivas para el mercado internacional. Agenda una sesión de consultoría técnica con nuestro equipo y transformemos el potencial de tu finca con seguridad y rigor.' },
      ],
      en: [
        { type: 'h2', text: 'Introduction: the coffee-field dilemma and the generational challenge' },
        { type: 'p', text: 'For thousands of young people in traditional coffee-farming families, social media has opened a fascinating window into the specialty coffee world. Through our screens we see innovative processing, exotic sensory profiles, and the tempting promise of premium prices. However, when the screen turns off and we face the reality of the family home, convincing our parents and grandparents is no easy task.' },
        { type: 'p', text: 'For older generations who have spent decades or centuries building empirical knowledge, specialty coffee raises valid questions: is it worth investing more time, labor, and money into something we don’t fully understand? Resistance to change is a natural defense mechanism to protect the family livelihood. The secret to taking the leap is not imposing new ideas, but demonstrating operational viability with respect, sound technique, and flawless risk management.' },
        { type: 'h2', text: '1. Science over trends: why social media content isn’t enough' },
        { type: 'p', text: 'A common mistake is basing your farm’s production strategy on short videos or viral posts. While honest content creators exist, digital information is often fragmented, incomplete, or tailored to geographies completely different from your own.' },
        { type: 'p', text: 'To build a solid argument for your family, your starting point must be academic. In Colombia, Cenicafé offers a free virtual library containing decades of rigorous research. Studying the fundamentals of microbiology and processing lets you speak with technical authority and avoid costly errors. But here arises the first key question: do you know how to interpret and adapt those scientific manuals to your farm’s specific microclimate and coffee varieties?' },
        { type: 'h2', text: '2. The home laboratory: experiment without mortgaging the farm' },
        { type: 'p', text: 'Testing whether specialty coffee is right for you doesn’t require building million-dollar infrastructure or buying imported machinery. You can set up a rigorous experimental prototype using low-cost items:' },
        { type: 'ul', items: [
          'The container: high-density airtight plastic liners (such as GrainPro bags), ideal for controlling anaerobic processes.',
          'The DIY water trap: a thin aquarium hose attached to the bag and submerged in a clean 600 ml plastic bottle filled with water, letting fermentation gases (CO₂) escape without letting oxygen in.',
        ] },
        { type: 'p', text: 'With this basic setup you can control variables like time and temperature. However, measuring fermentation is only half the battle: do you know the exact microbiological thresholds to prevent your batch from developing acetic, phenolic, or over-fermented notes?' },
        { type: 'h2', text: '3. Strategic scheduling: protect the peak harvest' },
        { type: 'p', text: 'Labor and time management are top concerns for experienced farmers. Therefore, experimental processing must be strategically planned around your coffee harvest dynamics:' },
        { type: 'table',
          headers: ['Farm harvesting pattern', 'Ideal window for specialty', 'Operational rationale'],
          rows: [
            ['Farms with concentrated, uniform ripening', 'Restrict experimental processing exclusively to the end of the harvest.', 'You process remaining yields without disrupting the bulk coffee flow or overloading harvesting operations.'],
            ['High-altitude farms (slow ripening)', 'Work during slow phases: start/end of harvest, early pickings (graneos), or late gleanings (re-re).', 'You protect the peak harvest for traditional bulk volume and use low-flow periods to manage micro-lots carefully.'],
          ] },
        { type: 'p', text: 'The hidden risk of natural processing: if you plan to process coffees using the natural method (drying intact cherries), keep in mind that these lots require significantly more drying time and can clog your solar dryers or raised beds. Never process natural coffees during peak harvest; restrict them to the end of the season or between pickings. Still: do you know your farm’s exact drying capacity limit without endangering the quality of your traditional coffee?' },
        { type: 'h2', text: '4. Micro-lot math: avoid unnecessary losses' },
        { type: 'p', text: 'To evaluate whether an experiment is profitable, the numbers must be precise. In coffee farming we apply the standard 5-to-1 ratio (5 kg of fresh cherry yields 1 kg of clean dry parchment).' },
        { type: 'p', text: 'If your goal is to produce a micro-lot equivalent to one load of dry parchment (125 kg), you must plan to harvest approximately 700 kilograms of raw cherry. This buffer absorbs natural losses from float sorting in the tank. Furthermore, the golden rule is picking 100% ripe cherries; under-ripe cherries destroy cup quality with harsh astringency. The financial question is: does the premium price for that micro-lot truly offset the extra labor cost of selective picking in your region?' },
        { type: 'h2', text: '5. Commercial validation: overcoming cup blindness' },
        { type: 'p', text: 'Once dried and rested, the process doesn’t end in the warehouse. To know if the effort was worth it, your opinion or that of your friends isn’t enough; you need objective external feedback:' },
        { type: 'ul', items: [
          'Take samples to a certified cupping laboratory (SCA).',
          'Request support from the quality department at your local cooperative.',
          'Leverage social media to connect with roasters or green coffee buyers willing to evaluate physical samples.',
        ] },
        { type: 'h2', text: 'Conclusion: smart balance and phased farm evolution' },
        { type: 'p', text: 'The decision to transition into specialty coffee doesn’t have to be an all-or-nothing choice. The smartest approach is phased: process a small test lot —such as a single load— and learn to balance your production.' },
        { type: 'p', text: 'You can keep your main harvest in the traditional market to secure family income and peace of mind, while using slower periods to develop specialty batches. Backed by real data, you will know with certainty whether a hybrid model, a 100% return to traditional farming, or a complete transition to specialty coffee makes the most sense for your business.' },
        { type: 'h2', text: 'Want to design the exact strategy for your farm without risking your capital?' },
        { type: 'p', text: 'Every coffee farm is unique: altitude, varieties, climate, and drying capacity change the rules of the game. Moving from theory to practice without making costly mistakes requires personalized technical guidance.' },
        { type: 'p', text: 'At The Coffee Five we help coffee-farming families design custom processing protocols, calculate real production costs, and build attractive commercial offers for international buyers. Book a technical consulting session with our team today and let’s unlock your farm’s full potential — safely and rigorously. We can guide your producer partner in any corner of the globe.' },
      ],
    },
  },
  {
    slug: 'tostion-un-punto-de-vista',
    readMinutes: 7,
    category: { es: 'Tostión', en: 'Roasting' },
    title: {
      es: 'Tostión… un punto de vista',
      en: 'Roasting… a point of view',
    },
    description: {
      es: 'El arte de revelar el negocio detrás del grano: cómo el grado de tueste transforma la materia prima, redefine el negocio y moldea la percepción sensorial.',
      en: 'The art of unlocking the business behind the bean: how the roast degree transforms the raw material, redefines the business, and shapes sensory perception.',
    },
    blocks: {
      es: [
        { type: 'h2', text: 'Introducción: la decisión científica y filosófica en el tambor' },
        { type: 'p', text: 'El tueste del café no es solo aplicar calor; es el puente definitivo entre el esfuerzo en la finca y la experiencia en la taza. Para un empresario de la industria, un tostador o un caficultor que busca dar el salto al mercado premium, la tostión deja de ser un simple paso operativo y se convierte en una decisión tanto científica como filosófica. Es la herramienta comercial que dicta la identidad del producto y el retorno de inversión.' },
        { type: 'p', text: 'En este espacio exploramos cómo el grado de tostión transforma la materia prima, redefine el negocio y moldea nuestra percepción sensorial.' },
        { type: 'h2', text: '1. De súper claro a súper oscuro: ¿espejo o velo?' },
        { type: 'p', text: 'El espectro del tueste es un juego de balance químico entre los ácidos orgánicos, los azúcares y los compuestos de la degradación térmica. Dependiendo del perfil que elijas, estarás tomando una posición comercial radical:' },
        { type: 'ul', items: [
          'Hacia lo claro (light roasts): preservamos la integridad de los ácidos clorogénicos, cítricos y málicos. Esto permite resaltar el terroir: la variedad, la altura, el suelo y el microclima se expresan con nitidez a través de notas florales, frutales y una acidez vibrante. El tueste claro es un espejo del origen.',
          'Hacia lo oscuro (dark roasts): los compuestos aromáticos del origen se destruyen por pirólisis, dando paso a la caramelización avanzada y a la carbonización. Este proceso funciona como un velo: oculta los defectos de cafés de menor calidad al uniformar el sabor bajo notas genéricas a ceniza, humo, chocolate amargo y carbón.',
        ] },
        { type: 'p', text: 'La pregunta comercial: si has invertido capital en genética exótica y procesos postcosecha controlados, ¿tiene sentido comercial aplicar un tueste que borre esa diferenciación? O, por el contrario, ¿conoces el límite de transferencia de calor para no dejar el grano crudo y subdesarrollado?' },
        { type: 'h2', text: '2. Sensorialidad sin filtros: el estándar de laboratorio' },
        { type: 'p', text: 'Para evaluar el café de manera objetiva, la SCA (Specialty Coffee Association) dicta un protocolo estricto de control de calidad para la catación, el cual exige un tueste claro-medio (entre 58 y 63 puntos Agtron) desarrollado entre 8 y 12 minutos.' },
        { type: 'p', text: 'En nuestro laboratorio, bajo un protocolo estándar riguroso, optamos por llevar las muestras al tueste más claro posible. ¿La razón? Queremos apreciar absolutamente todo lo que está presente en el grano. Un tueste ultra-claro no perdona; expone con transparencia radical tanto los atributos más sutiles y complejos como los defectos de procesamiento o cultivo. Es la única forma de realizar un diagnóstico honesto y sin máscaras.' },
        { type: 'h2', text: '3. Radiografía del mercado: una oportunidad de posicionamiento' },
        { type: 'p', text: 'El consumo comercial varía drásticamente según la cultura local y los métodos de preparación predominantes, lo que abre nichos de mercado muy específicos:' },
        { type: 'table',
          headers: ['Canal de consumo', 'Mercado colombiano (en transición)', 'Mercado mundial (Norteamérica, Europa, Asia)'],
          rows: [
            ['Café en bolsa', '75 % dominado por tuestes oscuros y medios-oscuros. 25 % especialidad en nichos urbanos.', '40 % tuestes oscuros · 45 % tuestes medios · 15 % tuestes claros.'],
            ['Espresso', '80 % tueste medio-oscuro, buscando cuerpo alto y baja acidez tradicional.', '65 % estilo italiano tradicional · 35 % tueste medio-claro a medio.'],
            ['Filtrados', '70 % de la oferta en tiendas de especialidad prefiere tuestes claros y medios.', 'Más del 80 % del segmento premium: el tueste claro es el rey absoluto.'],
          ] },
        { type: 'h2', text: '4. El tueste como estrategia de negocio' },
        { type: 'ul', items: [
          'Consecuencia con el origen: si te mueven convicciones reales sobre el valor del trabajo en el campo, los tuestes claros son la única vía consecuente para respetar la pureza de la cosecha. Sin embargo, requiere educar activamente a tu cliente.',
          'Definición del público objetivo: un tueste claro atraerá a un consumidor analítico que busca complejidad y acidez. Un tueste medio-oscuro atraerá a quien busca el balance clásico, cuerpo denso y notas chocolatadas.',
          'Estrategia de comercialización: conocer a fondo a tu cliente ideal te ahorra pérdidas. El nivel de tueste define tu posicionamiento de marca.',
        ] },
        { type: 'h2', text: 'Conclusión: decisiones inteligentes para tu taza y tu negocio' },
        { type: 'p', text: 'Tomar mejores decisiones requiere ir más allá de la superficie de los granos. El nivel de tueste define las reglas del juego tanto para el consumidor que busca alinear el café con su bienestar como para el empresario que busca rentabilidad.' },
        { type: 'h2', text: '¿Quieres dominar los perfiles de tueste y escalar el rendimiento de tu marca?' },
        { type: 'p', text: 'Desarrollar curvas de tueste consistentes, estandarizar un laboratorio de control de calidad o estructurar una línea de productos que se venda con éxito no es cuestión de azar. Requiere análisis técnico y visión comercial.' },
        { type: 'p', text: 'En The Coffee Five te acompañamos en el proceso. Contamos con servicios de consultoría especializada diseñados para llevar tu negocio al siguiente nivel. Contáctanos hoy mismo y agenda una sesión de consultoría técnica.' },
      ],
      en: [
        { type: 'h2', text: 'Introduction: the scientific and philosophical decision inside the drum' },
        { type: 'p', text: 'Roasting coffee is not just about applying heat; it is the ultimate bridge between the hard work on the farm and the experience in the cup. For an industry entrepreneur, a roaster, or a coffee grower looking to break into the premium market, roasting ceases to be a simple operational step and becomes both a scientific and a philosophical decision. It is the commercial tool that dictates product identity and return on investment.' },
        { type: 'p', text: 'In this space we explore how the degree of roasting transforms the raw material, redefines the business, and shapes our sensory perception.' },
        { type: 'h2', text: '1. From super light to super dark: a mirror or a veil?' },
        { type: 'p', text: 'The roast spectrum is a game of chemical balance among organic acids, sugars, and thermal degradation compounds. Depending on the profile you choose, you are taking a radical business stance:' },
        { type: 'ul', items: [
          'Toward light roasts: we preserve the integrity of chlorogenic, citric, and malic acids. This lets us highlight the terroir — the variety, altitude, soil, and microclimate express themselves with clarity through floral, fruity notes and a vibrant acidity. A light roast is a mirror to the origin.',
          'Toward dark roasts: the aromatic compounds of origin are destroyed by pyrolysis, giving way to advanced caramelization and carbonization. This works like a veil: it hides the defects of lower-quality coffees by uniforming the flavor under generic notes of ash, smoke, dark chocolate, and char.',
        ] },
        { type: 'p', text: 'The commercial question: if you have invested capital in exotic genetics and controlled post-harvest processing, does it make commercial sense to apply a roast that erases that differentiation? Or, conversely, do you know the precise heat-transfer thresholds to avoid leaving the bean raw and underdeveloped?' },
        { type: 'h2', text: '2. Sensory analysis unfiltered: the laboratory standard' },
        { type: 'p', text: 'To evaluate coffee objectively, the SCA (Specialty Coffee Association) dictates a strict quality-control protocol for cupping, which requires a light-medium roast (between 58 and 63 points on the Agtron scale) developed between 8 and 12 minutes.' },
        { type: 'p', text: 'In our laboratory, under a rigorous standard protocol, we choose to take samples to the lightest roast possible. The reason? We want to appreciate absolutely everything present in the bean. An ultra-light roast is unforgiving; it exposes with radical transparency both the most subtle, complex attributes and the defects of processing or cultivation. It is the only way to conduct an honest, unmasked diagnosis.' },
        { type: 'h2', text: '3. Market blueprint: a positioning opportunity' },
        { type: 'p', text: 'Commercial consumption varies drastically depending on local culture and dominant brewing methods, opening up highly specific market niches:' },
        { type: 'table',
          headers: ['Consumption channel', 'Colombian market (in transition)', 'Global market (North America, Europe, Asia)'],
          rows: [
            ['Bagged coffee', '75% dark to medium-dark roasts. 25% specialty in growing urban niches.', '40% dark roasts · 45% medium roasts · 15% light roasts.'],
            ['Espresso', '80% medium-dark roasts, aiming for high body and low traditional acidity.', '65% traditional Italian style · 35% medium-light to medium roasts.'],
            ['Filter', '70% of the specialty-shop offer prefers light and medium roasts for manual methods.', 'Over 80% of the premium segment: light roast is the absolute king.'],
          ] },
        { type: 'h2', text: '4. Roasting as a business strategy' },
        { type: 'ul', items: [
          'Alignment with origin: if you are driven by real convictions about the value of work in the field, light roasts are the only consistent path to respect the purity of the harvest. However, it requires actively educating your customer.',
          'Defining your target audience: a light roast will attract an analytical consumer seeking complexity and acidity. A medium-dark roast will attract those looking for a classic balance, dense body, and chocolatey notes.',
          'Commercial strategy: knowing your ideal customer inside out prevents losses. Your roast level defines your brand positioning.',
        ] },
        { type: 'h2', text: 'Conclusion: smarter decisions for your cup and your business' },
        { type: 'p', text: 'Making better decisions requires looking beyond the surface of the beans. The roast level defines the rules of the game — both for the consumer seeking to align coffee with their well-being and for the entrepreneur seeking profitability.' },
        { type: 'h2', text: 'Want to master roast profiles and scale your brand’s performance?' },
        { type: 'p', text: 'Developing consistent roast curves, standardizing a quality-control laboratory, or structuring a product line that sells successfully is not a matter of chance. It requires technical analysis and commercial vision.' },
        { type: 'p', text: 'At The Coffee Five we guide you through the process. We offer specialized consulting services designed to take your business to the next level. Get in touch with us today and book a technical consulting session.' },
      ],
    },
  },
];

export function getJournalArticles(locale: Locale): JournalArticleSummary[] {
  return journalSources.map((a) => ({
    slug: a.slug,
    category: a.category[locale],
    title: a.title[locale],
    description: a.description[locale],
  }));
}

export function getJournalArticleBySlug(slug: string, locale: Locale): JournalArticleDetail | undefined {
  const source = journalSources.find((a) => a.slug === slug);
  if (!source) return undefined;
  return {
    slug: source.slug,
    category: source.category[locale],
    title: source.title[locale],
    description: source.description[locale],
    readMinutes: source.readMinutes,
    blocks: source.blocks[locale],
  };
}

export function getAllJournalSlugs(): string[] {
  return journalSources.map((a) => a.slug);
}

export const processSteps = [
  { title: 'Cultivo', label: 'CULTIVO', img: '/process-0.jpg', description: 'Semilla, vivero, cultivo, nutrición, control de plagas y enfermedades, procesamiento, control de calidad.' },
  { title: 'Origen', label: 'ORIGEN', img: '/process-1.jpg', description: 'Red de productores, consultoría, buenas prácticas, sourcing ético y relaciones directas.' },
  { title: 'Laboratorio', label: 'LABORATORIO', img: '/process-2.jpg', description: 'Análisis sensorial, control de calidad, retroalimentación y ajustes, mejora continua de prácticas.' },
  { title: 'Logística', label: 'LOGÍSTICA', img: '/process-3.jpg', description: 'Exportación, importación en EE.UU., transporte terrestre. No vendemos café, vendemos tranquilidad y frescura.' },
];

export const consultingServices = [
  { title: 'Asesoría a Fincas', description: 'Siembras desde cero, nutrición, manejo de plagas, adaptación al cambio climático, diseño de procesos de fermentación y secado.' },
  { title: 'Laboratorio — Medellín', description: 'Análisis sensorial y físico. Lab propio con tostadora, trilladora, espresso, percolado. Recomendaciones de mejora.' },
  { title: 'Formación', description: 'Talleres de filtrados, home barista, catación, fermentación, secado, logística. Compra de verde. Herramientas para que productores, tostadores y compradores tomen mejores decisiones.' },
];

export const procesoColorMap: Record<string, string> = {
  Lavado: siteConfig.procesoColors.lavado,
  Natural: siteConfig.procesoColors.natural,
  Honey: siteConfig.procesoColors.honey,
  'Anaeróbico': siteConfig.procesoColors.anaerobico,
  Fermentado: siteConfig.procesoColors.fermentado,
};

/**
 * Display labels for the process, per locale. The raw Spanish value stays the
 * logic key (filtering, `procesoColorMap`); only the shown label is localized.
 */
const procesoLabels: Record<Locale, Record<string, string>> = {
  es: { Lavado: 'Lavado', Natural: 'Natural', Honey: 'Honey', 'Anaeróbico': 'Anaeróbico', Fermentado: 'Fermentado' },
  en: { Lavado: 'Washed', Natural: 'Natural', Honey: 'Honey', 'Anaeróbico': 'Anaerobic', Fermentado: 'Fermented' },
};

/** Localized label for a process value (falls back to the raw value). */
export function procesoLabel(proceso: string, locale: Locale): string {
  return procesoLabels[locale]?.[proceso] ?? proceso;
}

/** Localized farm note for a lot (falls back to Spanish). */
export function lotNotaFinca(lot: { notaFinca: string; notaFincaEn?: string }, locale: Locale): string {
  return locale === 'en' ? lot.notaFincaEn ?? lot.notaFinca : lot.notaFinca;
}
