# Design System — Coffee Five

## Design Philosophy

Utilitarian, bold, high-contrast. This is a "zero-to-one" build for a brand that represents real agricultural and scientific work. The design should feel like a tool, not a decoration. Every element earns its place.

**References:**
- Onyx Coffee Lab — photography-driven polish, dark modes, disciplined type
- Osito — sourcing depth, transparency, data-forward product presentation
- Coffee Five's differentiator — consulting expertise that neither competitor surfaces

## Color System

**NOTE:** The approved wireframe uses a LIGHT palette (cream/beige base). The earlier CLAUDE.md spec referenced a dark palette. **Match the wireframe for now** — the dark palette can be explored later as an alternate theme. The wireframe's palette is:

```css
:root {
  /* Wireframe palette (approved) */
  --bg: #FAFAF8;
  --text: #1A1A1A;
  --accent: #6B4C3B;           /* Coffee brown — links, active states */
  --label: #A09888;            /* Muted text, metadata */
  --wire: #E2DED8;             /* Borders, dividers */
  --wire-dark: #C8C2B8;        /* Stronger borders */
  --img-bg: #E8E4DE;           /* Image placeholder background */
  --card-bg: #F0EDE8;          /* Card backgrounds */
  --dark-section: #1A1A1A;     /* Roasted coffee section, footer */

  /* Location badges */
  --loc-colombia-bg: #E8F0E8;
  --loc-colombia-text: #4A7A4A;
  --loc-transit-bg: #FFF3E0;
  --loc-transit-text: #A07020;
  --loc-landed-bg: #E3EAF2;
  --loc-landed-text: #4A6A8A;

  /* Green coffee lot card backgrounds */
  --lot-gold: #D4B83D;
  --lot-red: #E04B3A;
  --lot-black: #1A1A1A;
  --lot-blue: #5B8EC2;
  --lot-green: #1B7A3D;
  --lot-wine: #7A1A1A;
}
```

The site is **dark by default**. Black backgrounds, white text, orange accents. This mirrors the specialty coffee aesthetic (Onyx reference) and makes photography pop.

## Typography

**Decided in wireframe (do not change):**
1. **Body:** DM Sans (400, 500, 700, 400 italic) — clean, legible, works in ES and EN
2. **Monospace/Labels:** DM Mono (400, 500) — used for section tags, metadata, CTAs, nav links, prices

Load via `next/font/google` or self-host from `/public/fonts/`.

### Type Scale
```css
--text-xs: 0.75rem;     /* 12px — metadata, tags */
--text-sm: 0.875rem;    /* 14px — captions, small labels */
--text-base: 1rem;      /* 16px — body text */
--text-lg: 1.125rem;    /* 18px — lead paragraphs */
--text-xl: 1.25rem;     /* 20px — section intros */
--text-2xl: 1.5rem;     /* 24px — subheadings */
--text-3xl: 2rem;       /* 32px — section titles */
--text-4xl: 2.5rem;     /* 40px — page titles */
--text-5xl: 3.5rem;     /* 56px — hero headline */
--text-6xl: 4.5rem;     /* 72px — hero display (desktop only) */
```

### Font Loading
Self-host all fonts in `/public/fonts/`. Use `next/font/local` for optimal loading:
```typescript
import localFont from 'next/font/local';

const displayFont = localFont({
  src: [
    { path: '../public/fonts/Display-Bold.woff2', weight: '700' },
    { path: '../public/fonts/Display-Black.woff2', weight: '900' },
  ],
  variable: '--font-display',
  display: 'swap',
});

const bodyFont = localFont({
  src: [
    { path: '../public/fonts/Body-Regular.woff2', weight: '400' },
    { path: '../public/fonts/Body-Medium.woff2', weight: '500' },
  ],
  variable: '--font-body',
  display: 'swap',
});
```

## Spacing & Layout

- **Max content width:** 1280px (80rem)
- **Section padding:** 80px vertical (desktop), 48px (mobile)
- **Grid:** 12-column on desktop, collapsing to 4-column on mobile
- **Generous negative space** — let photography and type breathe
- **Content container:** `max-w-7xl mx-auto px-6 md:px-8 lg:px-12`

## Components

### Product Card (Green Coffee)
- Large image area (3:4 aspect ratio)
- Below: Finca name, lot number
- Tags: Variedad, Proceso, Altura (small pills)
- Cupping score (if available)
- Location badge (color-coded: Colombia/transit/landed)
- Price
- "Ver detalles →" link

### Product Card (Roasted Coffee)
- Image (1:1 or 3:4)
- Coffee name
- Tasting notes (short, e.g., "Chocolate, cherry, caramel")
- Weight + Price
- "Agregar →" CTA

### Blog Card
- Featured image (16:9)
- Title
- Excerpt (2 lines max)
- Date
- "Leer más →"

### Section Tag
- Small, monospaced-feeling label: "01 — El Origen"
- Positioned above section headings
- Numbered sequentially on homepage

### Location Badge
```
📍 En Colombia     → yellow/gold badge
🚢 En tránsito     → blue badge
📦 Landed in US    → green badge
```

### CTA Button
- Primary: Orange background, black text, no border-radius or very slight (2px)
- Secondary: Transparent, white border, white text
- Text links: "Ver más →" with arrow, orange on hover

### Navigation
- Fixed/sticky header
- Logo (floating behavior — shrinks/adjusts on scroll)
- Minimal nav: Café Verde, Café Tostado, Servicios, Journal, Contacto
- Language toggle: ES / EN
- Cart icon with item count
- Mobile: hamburger → full-screen overlay

## Image Handling

### Placeholders (Pre-Photography)
Until Juan provides photography, use intentional placeholder containers:
```html
<!-- NOT a broken image icon. A designed placeholder. -->
<div class="aspect-[3/4] bg-gray-900 flex items-center justify-center border border-gray-800">
  <span class="text-gray-700 text-sm tracking-widest uppercase">Foto pendiente</span>
</div>
```

### When Photos Arrive
- Use Next.js `<Image>` component for all images
- Serve WebP/AVIF via Shopify CDN or Next.js image optimization
- Define explicit `width` and `height` to prevent layout shift
- Hero images: full-bleed, `object-fit: cover`
- Product images: contained, consistent aspect ratios

## Animations & Interactions

- Keep animations subtle and purposeful — this is utilitarian, not playful
- Page load: fade-in with slight upward translate (staggered by section)
- Scroll: sections reveal as they enter viewport (IntersectionObserver)
- Hover: product cards get subtle scale or border-color shift
- Navigation: smooth transitions between states
- Logo float: logo in header shrinks/transforms on scroll
- NO parallax, NO heavy scroll-jacking, NO decorative particle effects

## Responsive Breakpoints

```css
/* Mobile first */
sm: 640px    /* Large phones */
md: 768px    /* Tablets */
lg: 1024px   /* Small laptops */
xl: 1280px   /* Desktop */
2xl: 1536px  /* Large screens */
```

### Mobile Considerations
- Touch targets minimum 44x44px
- Horizontal scrolling product carousels where appropriate
- Stacked layouts (no side-by-side on mobile)
- Full-width images
- Simplified navigation (hamburger → overlay)
- Cart as slide-out drawer, not separate page

## Accessibility

- Semantic HTML (proper heading hierarchy, landmark regions)
- Alt text on all images
- Sufficient color contrast (WCAG AA minimum)
- Focus states visible on all interactive elements
- Skip-to-content link
- `lang="es"` on root, with `lang="en"` on English content blocks
