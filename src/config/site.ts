export const siteConfig = {
  name: 'Coffee Five',
  tagline: 'Desde la semilla hasta la taza',
  description: 'Juan Medina — Specialty coffee from origin to cup. Green coffee, roasted coffee, and consulting services.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://coffeefive.com',
  author: 'Juan Medina',
  email: 'info@coffeefive.com',
  whatsapp: {
    /** E.164 without + — used for wa.me links */
    number: '15167578800',
    /** Human-readable (US) */
    display: '+1 (516) 757-8800',
    email: 'info@coffeefive.com', // Fallback email for enquiries
  },
  social: {
    instagram: 'https://www.instagram.com/thecoffeefive/',
  },
  nav: {
    main: [
      { key: 'nav.green', label: 'Verde', href: '/cafe-verde' },
      { key: 'nav.roasted', label: 'Tostado', href: '/coming-soon' },
      { key: 'nav.services', label: 'Consultorio', href: '/coming-soon' },
      { key: 'nav.about', label: 'Nosotros', href: '/coming-soon' },
      { key: 'nav.contact', label: 'Contacto', href: '/coming-soon' },
      { key: 'nav.journal', label: 'Blog', href: '/coming-soon' },
    ] as const,
  },
  shopify: {
    collections: {
      green: 'green-coffee',       // Enquiry only — NO cart
      roasted: 'roasted-coffee',   // Shopify cart + checkout
      merch: 'merch',              // Shopify cart + checkout
    },
    blog: 'journal',
  },
  // Homepage section order
  homepageSections: [
    'hero',
    'about-juan',
    'process',
    'green-coffee',
    'roasted-coffee',
    'services',
    'journal',
    'footer',
  ] as const,
  // The four business pillars
  pillars: [
    {
      key: 'grow',
      description: 'Seed, nursery, cultivation, nutrition, disease control, processing, QC',
    },
    {
      key: 'source',
      description: 'Farmer networking, consulting, best practices, ethical sourcing',
    },
    {
      key: 'lab',
      description: 'Sensory analysis, quality control, feedback loops, continuous improvement',
    },
    {
      key: 'logistics',
      description: 'Export services, US import, land transportation, freshness guarantee',
    },
  ] as const,
  // Process → lot card color mapping
  procesoColors: {
    lavado: '#4592DB',
    natural: '#0D7C47',
    honey: '#ECCD3E',
    anaerobico: '#91171F',
    fermentado: '#F63F34',
  } as const,
};
