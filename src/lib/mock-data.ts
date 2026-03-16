import { siteConfig } from '@/config/site';

export const mockGreenLots = [
  { name: 'Bourbon Papayo', weight: '750 lbs', price: '$7/lb', proceso: 'Lavado', color: siteConfig.procesoColors.lavado, variedad: 'Bourbon', finca: 'Los Guayacanes', altura: '2,100', puntaje: '88', region: 'Nariño', ubicacion: 'colombia' as const },
  { name: 'Chiroso Natura', weight: '750 lbs', price: '$7/lb', proceso: 'Natural', color: siteConfig.procesoColors.natural, variedad: 'Chiroso', finca: 'Bellavista', altura: '1,850', puntaje: '86', region: 'Santander', ubicacion: 'colombia' as const },
  { name: 'Geisha Honey', weight: '750 lbs', price: '$7/lb', proceso: 'Honey', color: siteConfig.procesoColors.honey, variedad: 'Geisha', finca: 'El Paraíso', altura: '2,200', puntaje: '90', region: 'Huila', ubicacion: 'en_transito' as const },
  { name: 'Caturra Anaeróbico', weight: '750 lbs', price: '$7/lb', proceso: 'Anaeróbico', color: siteConfig.procesoColors.anaerobico, variedad: 'Caturra', finca: 'La Esperanza', altura: '1,900', puntaje: '87', region: 'Cauca', ubicacion: 'landed_us' as const },
  { name: 'Castillo Fermentado', weight: '750 lbs', price: '$7/lb', proceso: 'Fermentado', color: siteConfig.procesoColors.fermentado, variedad: 'Castillo', finca: 'San Rafael', altura: '1,750', puntaje: '85', region: 'Tolima', ubicacion: 'colombia' as const },
  { name: 'Tabi Lavado', weight: '750 lbs', price: '$7/lb', proceso: 'Lavado', color: siteConfig.procesoColors.lavado, variedad: 'Tabi', finca: 'La Palma', altura: '2,000', puntaje: '86', region: 'Nariño', ubicacion: 'en_transito' as const },
  { name: 'Pink Bourbon Lote 12', weight: '500 lbs', price: '$9/lb', proceso: 'Natural', color: siteConfig.procesoColors.natural, variedad: 'Pink Bourbon', finca: 'Villa María', altura: '1,950', puntaje: '89', region: 'Huila', ubicacion: 'colombia' as const },
  { name: 'Geisha Lote Especial', weight: '300 lbs', price: '$15/lb', proceso: 'Lavado', color: siteConfig.procesoColors.lavado, variedad: 'Geisha', finca: 'El Vergel', altura: '2,050', puntaje: '92', region: 'Cauca', ubicacion: 'colombia' as const },
  { name: 'Caturra Micro Lote', weight: '400 lbs', price: '$6.50/lb', proceso: 'Honey', color: siteConfig.procesoColors.honey, variedad: 'Caturra', finca: 'La Margarita', altura: '1,800', puntaje: '86', region: 'Tolima', ubicacion: 'landed_us' as const },
  { name: 'Castillo Lavado Clásico', weight: '1,000 lbs', price: '$5.50/lb', proceso: 'Lavado', color: siteConfig.procesoColors.lavado, variedad: 'Castillo', finca: 'El Roble', altura: '1,700', puntaje: '84', region: 'Antioquia', ubicacion: 'en_transito' as const },
  { name: 'Colombia Honey', weight: '600 lbs', price: '$6/lb', proceso: 'Honey', color: siteConfig.procesoColors.honey, variedad: 'Colombia', finca: 'Finca Aurora', altura: '1,650', puntaje: '85', region: 'Risaralda', ubicacion: 'colombia' as const },
  { name: 'Chiroso Anaeróbico', weight: '350 lbs', price: '$10/lb', proceso: 'Anaeróbico', color: siteConfig.procesoColors.anaerobico, variedad: 'Chiroso', finca: 'La Primavera', altura: '2,000', puntaje: '89', region: 'Antioquia', ubicacion: 'colombia' as const },
  { name: 'Bourbon Fermentado 72h', weight: '500 lbs', price: '$8/lb', proceso: 'Fermentado', color: siteConfig.procesoColors.fermentado, variedad: 'Bourbon', finca: 'Los Naranjos', altura: '1,900', puntaje: '87', region: 'Huila', ubicacion: 'landed_us' as const },
  { name: 'Tabi Natural Seco', weight: '450 lbs', price: '$7.50/lb', proceso: 'Natural', color: siteConfig.procesoColors.natural, variedad: 'Tabi', finca: 'Cerro Azul', altura: '2,100', puntaje: '88', region: 'Nariño', ubicacion: 'colombia' as const },
  { name: 'Pink Bourbon Honey', weight: '400 lbs', price: '$11/lb', proceso: 'Honey', color: siteConfig.procesoColors.honey, variedad: 'Pink Bourbon', finca: 'La Esmeralda', altura: '1,980', puntaje: '90', region: 'Cauca', ubicacion: 'en_transito' as const },
  { name: 'Geisha Anaeróbico', weight: '200 lbs', price: '$18/lb', proceso: 'Anaeróbico', color: siteConfig.procesoColors.anaerobico, variedad: 'Geisha', finca: 'El Paraíso', altura: '2,200', puntaje: '93', region: 'Huila', ubicacion: 'colombia' as const },
  { name: 'Castillo Natural Seco', weight: '800 lbs', price: '$5/lb', proceso: 'Natural', color: siteConfig.procesoColors.natural, variedad: 'Castillo', finca: 'San Isidro', altura: '1,600', puntaje: '84', region: 'Santander', ubicacion: 'landed_us' as const },
  { name: 'Caturra Fermentado 96h', weight: '350 lbs', price: '$9/lb', proceso: 'Fermentado', color: siteConfig.procesoColors.fermentado, variedad: 'Caturra', finca: 'La Ceiba', altura: '1,850', puntaje: '88', region: 'Cauca', ubicacion: 'colombia' as const },
  { name: 'Colombia Lavado', weight: '900 lbs', price: '$5/lb', proceso: 'Lavado', color: siteConfig.procesoColors.lavado, variedad: 'Colombia', finca: 'El Porvenir', altura: '1,550', puntaje: '83', region: 'Risaralda', ubicacion: 'en_transito' as const },
  { name: 'Chiroso Honey Especial', weight: '300 lbs', price: '$12/lb', proceso: 'Honey', color: siteConfig.procesoColors.honey, variedad: 'Chiroso', finca: 'Alto del Viento', altura: '2,150', puntaje: '91', region: 'Antioquia', ubicacion: 'colombia' as const },
  { name: 'Bourbon Lavado Lote 5', weight: '650 lbs', price: '$6.50/lb', proceso: 'Lavado', color: siteConfig.procesoColors.lavado, variedad: 'Bourbon', finca: 'La Montaña', altura: '1,750', puntaje: '86', region: 'Tolima', ubicacion: 'landed_us' as const },
];

export const mockRoastedCoffee = [
  { name: 'Bellavista Honey', img: '/bag1.jpg', notes: 'Panela, durazno, cacao', price: '$18', weight: '250g', tags: ['Caturra', 'Honey', 'Medio'] },
  { name: 'El Paraíso Natural', img: '/bag2.jpg', notes: 'Frutos rojos, jazmín, miel', price: '$24', weight: '250g', tags: ['Gesha', 'Natural', 'Claro'] },
  { name: 'La Esperanza Lavado', img: '/bag3.jpg', notes: 'Chocolate, naranja, nuez', price: '$16', weight: '250g', tags: ['Castillo', 'Lavado', 'Medio-oscuro'] },
];

export const mockArticles = [
  { category: 'Procesos', title: '¿Qué es un café honey y por qué importa?', description: 'Educational — explains process to buyers and consumers.' },
  { category: 'Caso de estudio', title: 'Cómo el análisis de suelos transformó Finca Bellavista', description: 'Case study — consulting credibility. Shows results.' },
  { category: 'Origen', title: 'Santander: el terroir que nadie está mirando', description: 'Positioning piece — builds authority and surfaces lesser-known regions.' },
];

export const processSteps = [
  { title: 'Grow', label: 'GROW', img: '/grow.png', description: 'Seed, nursery, cultivation, nutrition and disease, plague and control, processing, quality control.' },
  { title: 'Source', label: 'SOURCE', img: '/source.png', description: 'Farmers networking, consulting, best practices, ethical sourcing.' },
  { title: 'Lab', label: 'LAB', img: '/lab.png', description: 'Sensory analysis, quality control, feedback and adjustments, continuously improving practices.' },
  { title: 'Logistics', label: 'LOGISTICS', img: '/logistics.png', description: 'Exportation services, importation in USA, land transportation. We don\'t sell coffee, we sell freshness.' },
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
