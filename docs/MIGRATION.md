# MIGRATION.md — Wireframe → Next.js Migration Guide

## Overview

There is an approved wireframe at `docs/wireframe-reference.html` that represents the homepage design for Coffee Five. This file is the **source of truth** for layout, section order, component structure, spacing, and visual tone. Your job is to port this into the Next.js App Router architecture already scaffolded in this repo.

**Do not redesign. Translate.**

## What the wireframe establishes (preserve all of this)

### Design tokens already decided
- **Fonts:** DM Sans (body) + DM Mono (monospace/labels). Self-host both via `next/font/google` or download and use `next/font/local`.
- **Light base palette (wireframe mode):** `--bg: #FAFAF8`, `--text: #1A1A1A`, `--accent: #6B4C3B` (coffee brown), `--label: #A09888`, `--wire: #E2DED8`, `--card-bg: #F0EDE8`, `--dark-section: #1A1A1A`
- **Section numbering:** Each section has a faded large number (01–08) positioned top-right
- **Section tags:** Monospace, uppercase, letterspaced labels like "03 — El Proceso"
- **Annotation style:** Italic monospace with `↳` prefix, muted color — these are design notes that should be REMOVED in production but inform intent

### Section order & structure (8 sections)

**01 — Hero** (`<section class="hero">`)
- Full-viewport height, full-bleed image placeholder behind everything
- Nav bar: logo left, links right in a frosted glass pill (Café, Proyecto, Servicios, Historia, Blog, Contacto, ES/EN toggle)
- Center: logo mark, headline "Somos expertos, pero no dejamos de aprender.", two CTAs ("Nuestro Café" primary, "Nuestros Servicios" secondary)
- Bottom: scroll indicator ("SCROLL" + vertical line)
- **Component:** `HeroSection` (server component, no interactivity)

**02 — Identity / Quién es Juan** (`<section class="identity">`)
- Carousel with 2 slides (client component needed):
  - Slide 1: Centered layout. Roles line "Productor · Catador · Tostador · Barista · Exportador", headline "Sembramos, Cultivamos, Cosechamos, Procesamos, Catamos, Exportamos.", subtext.
  - Slide 2: Two-column layout. Large headline left, roles + description right.
- Dot navigation at bottom-right
- **Component:** `IdentitySection` (needs 'use client' for carousel)

**03 — El Proceso** (`<section class="process">`)
- Title: "Quality is intentional work at every stage."
- 4-column grid strip with the FOUR PILLARS (not the old Cultivo/Fermentación/Secado/Catación):
  - **Grow** — Seed, nursery, cultivation, nutrition and disease, plague and control, processing, quality control.
  - **Source** — Farmers networking, consulting, best practices, ethical sourcing.
  - **Lab** — Sensory analysis, quality control, feedback and adjustments, continuously improving practices.
  - **Logistics** — Exportation services, importation in USA, land transportation. "We don't sell coffee, we sell freshness."
- Each step: square image placeholder on top, title + description below
- Arrow (→) between steps except the last
- **Component:** `ProcessSection` (static, server component)

**04 — Café Verde** (`<section class="green-coffee">`)
- Header: "Green coffee — current offerings" + "Ver todos los lotes →" link
- Horizontal scrolling card row (6 cards, `scroll-snap-type: x mandatory`)
- **Lot cards are the standout design element:**
  - Bold solid-color backgrounds (gold #D4B83D, red #E04B3A, black #1A1A1A, blue #5B8EC2, green #1B7A3D, dark red #7A1A1A)
  - Logo watermark top-left (white, inverted)
  - Coffee name, weight, price per lb at bottom
  - "Learn More" button that animates in on hover (GSAP → translate to CSS/Framer Motion)
  - 3:4 aspect ratio, rounded corners (12px)
- **In production:** These cards will be populated from Shopify. The solid color could come from a metafield or be auto-assigned. For now, use the hardcoded sample data.
- **Component:** `GreenCoffeeSection` + `LotCard` (LotCard needs 'use client' for hover animation)

**05 — Café Tostado** (`<section class="roasted-coffee">`)
- **DARK SECTION** — background #1A1A1A, inverted text colors
- Header: "Roasted coffee" + "Ver colección →"
- 3-column grid of roasted coffee cards:
  - Square image placeholder (dark bg)
  - Title, tasting notes (italic), price + weight, tag pills (variedad, proceso, roast level)
- **Component:** `RoastedCoffeeSection` + `RoastedCard`

**06 — Consultoría y Servicios** (`<section class="consulting">`)
- Two-column layout: text left, images right
- Left side:
  - Headline: "Helping producers improve quality — with measurable results."
  - Supporting paragraph about 1-2 point cupping score improvements
  - Three expandable service items (accordion-style with → arrow):
    - Asesoría a Fincas
    - Laboratorio — Medellín
    - Formación
- Right side: Image grid (2 square + 1 wide landscape)
- **Component:** `ConsultingSection`

**07 — Journal** (`<section class="journal">`)
- Header: "From the journal" + "Ver todo →"
- 3-column grid of blog cards:
  - 3:2 image placeholder
  - Category label (monospace, uppercase, accent color)
  - Title
  - Short description
- Sample articles: honey process explainer, Finca Bellavista case study, Santander terroir piece
- **In production:** Populated from Shopify blog API
- **Component:** `JournalSection` + `JournalCard`

**08 — Footer** (`<section class="footer">`)
- Dark section (#1A1A1A)
- 4-column grid: Brand/newsletter (2fr) | Café links | Servicios links | Más links
- Newsletter: email input + "Suscribir" button
- Logo at top of first column
- **Component:** `Footer` (in layout.tsx, not page.tsx)

### Animation Architecture

**Two animation libraries are installed. Each has a specific role:**

**GSAP + ScrollTrigger** (`src/lib/gsap.ts`) — scroll-driven and timeline animations:
- Scroll-triggered section reveals → `useScrollReveal()` hook
- Staggered grid reveals → `useStaggerReveal()` hook on parent, `data-reveal` attr on children
- Lot card hover lift + button fade-in → `useHoverLift({ childSelector: '.learn-more' })`
- Floating logo shrink on scroll → `useFloatingLogo()` hook
- Scroll indicator pulse → CSS animation (no library needed)

**Framer Motion** (`src/lib/framer.ts`) — component mount/unmount and state transitions:
- Carousel slide transitions → `carouselVariants` with `AnimatePresence`
- Cart drawer open/close → `slideRightVariants`
- Mobile nav overlay → `mobileNavVariants` + `mobileNavItem`
- Modal/dropdown mount/unmount → `fadeVariants` or `scaleVariants`
- List reorder/add/remove → `staggerContainer` + `staggerItem`
- Future page route transitions

**Rule of thumb:** If it responds to scroll position → GSAP. If it responds to a React state change (open/close, mount/unmount, reorder) → Framer Motion.

Both libraries have pre-built hooks and variant presets. Import from `@/lib/gsap` or `@/lib/framer`.

## Migration steps for Claude Code

### Step 1: Fonts
- Install DM Sans and DM Mono via `next/font/google`
- Set CSS variables `--font-body` and `--font-mono`
- Update `tailwind.config.ts` to reference these font families

### Step 2: Update design tokens
The wireframe uses a LIGHT palette (cream/beige). The CLAUDE.md spec calls for dark. **For now, match the wireframe exactly.** We can flip to dark later — it's just CSS variable swaps. Update `src/styles/globals.css` and `tailwind.config.ts` to use the wireframe's color tokens.

### Step 3: Build shared components
Extract from wireframe into `src/app/_components/`:
- `Header.tsx` — The nav from the hero (will become sticky/fixed later)
- `Footer.tsx` — Section 08
- `SectionTag.tsx` — The "03 — El Proceso" labels
- `ImagePlaceholder.tsx` — The dashed-border placeholder boxes with X pattern and label
- `LotCard.tsx` — Green coffee cards with color bg + hover animation
- `RoastedCard.tsx` — Dark-theme product cards
- `JournalCard.tsx` — Blog article cards
- `CarouselSlider.tsx` — Generic carousel with dot navigation

### Step 4: Build homepage sections
Each section becomes a component in `src/app/_components/sections/`:
- `HeroSection.tsx`
- `IdentitySection.tsx` ('use client')
- `ProcessSection.tsx`
- `GreenCoffeeSection.tsx`
- `RoastedCoffeeSection.tsx`
- `ConsultingSection.tsx`
- `JournalSection.tsx`

### Step 5: Wire up homepage
`src/app/page.tsx` imports and renders all sections in order. The Header goes in `layout.tsx`, the Footer goes in `layout.tsx`.

### Step 6: Make it responsive
The wireframe is desktop-only. Add responsive breakpoints:
- **Mobile (< 768px):**
  - Hero: stack CTAs vertically, reduce headline size
  - Nav: hamburger menu → full-screen overlay
  - Process strip: 2×2 grid or vertical stack
  - Lot cards: horizontal scroll (already works, just adjust card width to ~80vw)
  - Roasted grid: single column
  - Consulting: stack text above images
  - Journal: single column or horizontal scroll
  - Footer: single column stack
- **Tablet (768-1024px):**
  - Process: 2×2 grid
  - Roasted: 2 columns
  - Journal: 2 columns
  - Consulting: still 2-column but tighter gap

### Step 7: Connect Shopify (when ready)
- Green coffee section: `getProductsByCollection('green-coffee')` → map to `LotCard`
- Roasted section: `getProductsByCollection('roasted-coffee')` → map to `RoastedCard`
- Journal: `getBlogArticles(3)` → map to `JournalCard`
- Until Shopify is configured, use the hardcoded sample data from the wireframe

## Sample data from wireframe (use as mock data until Shopify is connected)

### Green coffee lots
```typescript
export const mockGreenLots = [
  { name: 'Bourbon Papayo', weight: '750 lbs', price: '$7/lb', color: '#D4B83D' },
  { name: 'Chiroso Natura', weight: '750 lbs', price: '$7/lb', color: '#E04B3A' },
  { name: 'Geisha Honey', weight: '750 lbs', price: '$7/lb', color: '#1A1A1A' },
  { name: 'Bourbon Papayo', weight: '750 lbs', price: '$7/lb', color: '#5B8EC2' },
  { name: 'Chiroso Natura', weight: '750 lbs', price: '$7/lb', color: '#1B7A3D' },
  { name: 'Geisha Honey', weight: '750 lbs', price: '$7/lb', color: '#7A1A1A' },
];
```

### Roasted coffee
```typescript
export const mockRoastedCoffee = [
  { name: 'Bellavista Honey', notes: 'Panela, durazno, cacao', price: '$18', weight: '250g', tags: ['Caturra', 'Honey', 'Medio'] },
  { name: 'El Paraíso Natural', notes: 'Frutos rojos, jazmín, miel', price: '$24', weight: '250g', tags: ['Gesha', 'Natural', 'Claro'] },
  { name: 'La Esperanza Lavado', notes: 'Chocolate, naranja, nuez', price: '$16', weight: '250g', tags: ['Castillo', 'Lavado', 'Medio-oscuro'] },
];
```

### Journal articles
```typescript
export const mockArticles = [
  { category: 'Procesos', title: '¿Qué es un café honey y por qué importa?', description: 'Educational — explains process to buyers and consumers.' },
  { category: 'Caso de estudio', title: 'Cómo el análisis de suelos transformó Finca Bellavista', description: 'Case study — consulting credibility. Shows results.' },
  { category: 'Origen', title: 'Santander: el terroir que nadie está mirando', description: 'Positioning piece — builds authority and surfaces lesser-known regions.' },
];
```

## What to remove from the wireframe
- The `.page-label` ("WIREFRAME · v2 · Desktop · 1440px") — development chrome
- All `.annotation` elements — design notes, not production content
- The `.section-num` large faded numbers — optional; keep if it looks good, remove if cluttered
- The inline `<script>` tag loading GSAP from CDN — replaced by npm package + `src/lib/gsap.ts`
- The inline `<script>` with vanilla JS carousel and hover logic — replaced by React components using hooks from `src/lib/gsap.ts` and variants from `src/lib/framer.ts`

## Critical: Do not change
- The headline "Somos expertos, pero no dejamos de aprender."
- The roles "Productor · Catador · Tostador · Barista · Exportador"
- The four pillar names: Grow · Source · Lab · Logistics
- The lot card design (colored backgrounds, 3:4 ratio, hover lift)
- The dark section treatment for roasted coffee
- The consulting section's specific claims (1-2 point improvement, lab in Medellín)
- The overall section flow and information hierarchy
