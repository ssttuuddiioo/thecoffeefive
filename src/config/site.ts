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
    // `key` maps to `dictionary.nav[key]` for the label (see src/config/dictionaries).
    // 'Verde' (offer list) is intentionally hidden — it lives behind the
    // password gate at /acceso and is shared via a private link.
    main: [
      { key: 'roasted', href: '/tostado' },
      { key: 'services', href: '/services' },
      { key: 'about', href: '/about' },
      { key: 'contact', href: '/contact' },
      { key: 'journal', href: '/blog' },
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
