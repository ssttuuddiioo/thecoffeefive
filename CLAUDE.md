# CLAUDE.md — Coffee Five Project Context

## Project Overview

This is the website for **Coffee Five** — Juan Medina's specialty coffee brand. Juan is a Colombian specialty coffee professional (productor, catador, tostador, barista, exportador) who operates across the entire coffee chain from seed to cup. He won 🥇 Roasted Regional 2025 Colombia and 🥈 V60 Regional 2024 Colombia.

**Tagline:** "Desde la semilla hasta la taza"
**Killer quote from Juan:** "We don't sell coffee, we sell freshness."

## ⚠️ START HERE — Wireframe Reference

There is an approved homepage wireframe at `docs/wireframe-reference.html`. Open it in a browser to see the design. The migration guide at `docs/MIGRATION.md` maps every section of that wireframe to Next.js components and explains exactly what to build. **Read MIGRATION.md before building any homepage components.**

## Tech Stack

- **Next.js 14** with App Router (TypeScript)
- **Shopify Storefront API** for all commerce + blog
- **Tailwind CSS** for styling
- **Vercel** for hosting

No Sanity CMS at launch — Shopify is the single data source. The architecture should be clean enough that Sanity can be added later without a rewrite.

## Brand Identity & Design Direction

### Aesthetic
- **Utilitarian, bold, high-contrast** — a "zero-to-one" foundational approach
- High-contrast color palette: striking black and vibrant orange
- Minimalist typography: clean sans-serif with heavy weights for headings
- Structured layouts with grid-like precision
- Photography-first: dark, moody, documentary-style (finca work, processing, lab)
- Inspired by **Onyx Coffee Lab** (polish, constraint, photography-driven) and **Osito** (sourcing depth, transparency, data)
- NOT generic AI aesthetics — no purple gradients, no Inter/Roboto, no cookie-cutter layouts

### Logo
- Florecita con dos cerezas, línea continua (hand-drawn continuous line, flower with two coffee cherries)
- Logo should "float" as user scrolls (Onyx-inspired behavior)
- Lockups needed: horizontal, stacked, icon-only

### Typography Rules
- 1-2 distinctive type families that work in both Spanish and English
- Heavy weights for headings, refined body type
- NO generic fonts (Arial, Inter, Roboto, system fonts)

### Color
- Primary: Black + vibrant orange (high-contrast)
- Restrained palette — one accent color that works on packaging too
- Use CSS variables for consistency

### Language
- **Spanish-first** with English toggle
- All copy should work in both languages
- Short, punchy text blocks that translate well

## Site Structure

### Homepage (long-scroll landing page, identity-first)
1. **Hero** — Full-bleed finca image, floating logo, tagline (ES), ES/EN toggle. Two CTAs: "Nuestro Café" + "Servicios"
2. **Quién es Juan** — Personal story. "Agrónomo, catador, tostador." Establishes he spans the entire chain. Portrait/farm imagery.
3. **The Process (El Proceso)** — Four visual blocks: Cultivo → Fermentación → Secado → Catación. Credibility before product. Image-heavy, minimal text.
4. **Green Coffee (Café Verde)** — B2B-facing. Featured lots with origin, process, score, location (Colombia vs landed in US). Osito energy — sourcing depth, transparency.
5. **Roasted Coffee (Café Tostado)** — Consumer-facing. Smaller retail formats, tasting notes, approachable. Onyx energy — polished, lifestyle.
6. **Consulting & Services** — Three pillars: Asesoría a Fincas, Laboratorio, Formación. Juan's differentiator that neither Onyx nor Osito offer.
7. **From the Journal** — Blog cards pulled from Shopify blog. Case study format.
8. **Footer** — Newsletter, nav, social, language toggle, contact

### Four Business Pillars (used in various sections)
- **Grow** — Seed, nursery, cultivation, nutrition, disease control, processing, QC
- **Source** — Farmer networking, consulting, best practices, ethical sourcing
- **Lab** — Sensory analysis, quality control, feedback loops, continuous improvement
- **Logistics** — Export services, US import, land transportation, freshness guarantee

### Subpages
- `/about` — Full brand story, Juan's background, philosophy
- `/cafe-verde` — Green coffee offer list (B2B, enquiry-based, NOT Shopify cart)
- `/cafe-verde/[handle]` — Green coffee lot detail page (six tabs, enquiry CTA)
- `/tienda` — Roasted coffee + merch store (Shopify cart + checkout)
- `/tienda/[handle]` — Roasted coffee / merch product detail page (Shopify add-to-cart)
- `/services` — Consulting: finca consulting, lab/QC, training
- `/blog` — Journal/blog index (from Shopify blog)
- `/blog/[slug]` — Individual blog post
- `/contact` — Contact form, location, social links

### Commerce: Two Separate Flows

**GREEN COFFEE = Enquiry flow (no Shopify cart)**
Green coffee is B2B. Nobody buys 50lb bags with a credit card button. The flow:
1. Browse the offer list at `/cafe-verde` (table/grid of available lots)
2. Click a lot → quick-view drawer slides in with key specs + enquiry CTAs
3. "Ver detalles completos →" link goes to full product page with six tabs
4. Enquiry options on both the drawer and the product page:
   - **WhatsApp button** (with WhatsApp logo): opens `wa.me/57XXXXXXXXXX?text=` with pre-filled message including lot name, variedad, proceso, quantity, price
   - **Email button**: opens a simple enquiry form (name, email, message) that sends to Juan's email with lot details attached
5. "Add to List" functionality: buyer can add multiple lots to an enquiry list (client-side state), then send all at once via WhatsApp or email
6. NO Shopify cart, NO checkout for green coffee

**ROASTED COFFEE + MERCH = Shopify cart + checkout**
Consumer purchases. Standard ecommerce:
1. Browse at `/tienda` (grid of roasted coffees + merch)
2. Click → product detail page with add-to-cart
3. Cart drawer slides out (Framer Motion)
4. Checkout → redirects to Shopify hosted checkout
5. Shopify handles payment, tax, shipping, order confirmation

### Shopify Collections Structure
- **Green Coffee** (`green-coffee`) — displayed on `/cafe-verde`, enquiry only
- **Roasted Coffee** (`roasted-coffee`) — displayed on `/tienda`, Shopify cart
- **Merch** (`merch`) — displayed on `/tienda`, Shopify cart (hats, mugs, tumblers, stickers, whatever Juan wants to sell)

### E-Commerce Product Organization
Products organized by:
- **Variedad** (Caturra, Castillo, Geisha, etc.)
- **Proceso** (Lavado, Honey, Natural) — determines lot card color
- **Finca** (farm name)
- **Altura** (altitude in masl)
- **Location** (📍 En Colombia / 🚢 En tránsito / 📦 Landed in US) — green coffee only
- **Format** (Green bags by weight / Roasted by bag size / Merch by type)

## Shopify — The Only Backend

**Everything lives in Shopify. One login. One admin. One place for Juan to manage his entire business.**

Shopify stores ALL content:
- Green coffee lots (displayed as enquiry-only offer list)
- Roasted coffee products (standard ecommerce with cart + checkout)
- Merch (same cart + checkout as roasted)
- Blog posts / Journal (Shopify's built-in blog editor)

The frontend pulls everything from Shopify's Storefront API and decides how to render it based on which collection a product belongs to. Juan's workflow is the same regardless of product type: add product, fill in fields, save.

### Storefront API Usage
- Products and collections via GraphQL
- Cart API for roasted coffee + merch ONLY (not green coffee)
- Checkout redirects to Shopify's hosted checkout for roasted + merch
- Blog articles for journal/blog content
- ISR (Incremental Static Regeneration) for product pages
- Webhook-triggered revalidation when products update

### Green Coffee: Same Shopify Admin, Different Frontend Treatment
Green coffee products are created in Shopify exactly like roasted products — same form, same metafields, same image uploads. The ONLY difference is what the frontend does with them:
- NO cart button, NO checkout
- WhatsApp + email enquiry buttons instead
- Quick-view drawer on the offer list
- Full detail page with six editorial tabs

Juan doesn't need to think about this distinction. He adds a product, puts it in the "Green Coffee" collection, and the site handles the rest.

### WhatsApp Enquiry Integration
No API needed. Just URL construction:
```typescript
function buildWhatsAppUrl(phone: string, lot: { name: string; variedad: string; proceso: string; price: string; quantity: string }) {
  const message = `Hola, estoy interesado en:\n\n${lot.name}\nVariedad: ${lot.variedad}\nProceso: ${lot.proceso}\nCantidad: ${lot.quantity}\nPrecio: ${lot.price}\n\n¿Podemos hablar?`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
```

For multi-lot enquiries, concatenate all lots into one message.

### Key API Patterns
```typescript
// All Shopify queries go through src/lib/shopify.ts
// Use GraphQL fragments for reusable product/blog fields
// Cart state managed client-side with cookies — ROASTED + MERCH ONLY
// Checkout URL from Shopify — never build custom checkout
// Green coffee uses Shopify for DATA but WhatsApp/email for CONVERSION
```

### Shopify Collections (3 collections + 1 blog)
- `green-coffee` → renders on `/cafe-verde` with enquiry flow
- `roasted-coffee` → renders on `/tienda` with Shopify cart
- `merch` → renders on `/tienda` with Shopify cart
- `journal` → blog handle, renders on `/blog`

### Product Metafields to Use
- `coffee.variedad` — Coffee variety
- `coffee.proceso` — Processing method (also determines lot card color)
- `coffee.finca` — Farm name
- `coffee.altura` — Altitude (masl)
- `coffee.puntaje` — Cupping score
- `coffee.ubicacion` — Current location (colombia / en_transito / landed_us)
- `coffee.notas` — Tasting notes
- `coffee.region` — Growing region
- `coffee.productor` — Producer name
- `coffee.finca_size` — Farm size
- `coffee.municipio` — Municipality
- `coffee.departamento` — Department
- `coffee.fermentacion_horas` — Fermentation hours
- `coffee.secado_dias` — Drying days
- `coffee.secado_metodo` — Drying method
- `coffee.densidad` — Density (g/L)
- `coffee.humedad` — Moisture %
- `coffee.actividad_agua` — Water activity
- `coffee.cosecha` — Harvest season/year
- `coffee.lote` — Lot number

The rich narrative content for the green lot detail tabs (Sabor, Origen, Proceso, Verde analysis) lives in the product description HTML field or in rich text metafields. Juan writes this once per lot in Shopify's editor.

## Animation Architecture

Two libraries, two roles. Never mix them.

**GSAP + ScrollTrigger** → anything driven by scroll position or timeline sequencing
- Pre-built hooks in `src/lib/gsap.ts`: `useScrollReveal`, `useStaggerReveal`, `useHoverLift`, `useFloatingLogo`
- Import: `import { useScrollReveal, useHoverLift } from '@/lib/gsap'`

**Framer Motion** → anything driven by React state (mount/unmount, open/close, reorder)
- Pre-built variants in `src/lib/framer.ts`: `fadeVariants`, `slideRightVariants`, `carouselVariants`, `mobileNavVariants`, etc.
- Import: `import { motion, AnimatePresence } from 'framer-motion'` + `import { slideRightVariants, springSmooth } from '@/lib/framer'`

Both require `'use client'` on the component that uses them.

## Responsive Design

- Mobile-first approach
- Must look great on phone (most coffee consumers browse on mobile)
- Desktop is the hero experience with full photography
- No pixel-perfect matching needed — just responsive and polished on both
- Test at 375px (mobile), 768px (tablet), 1280px+ (desktop)

## Performance Targets

- Core Web Vitals green across the board
- Images: Next.js Image component with proper sizing, WebP/AVIF
- Fonts: Self-hosted, `font-display: swap`
- ISR for product pages (revalidate every 60s or on webhook)
- Static generation for About, Services, Contact

## File Organization

```
src/
  app/
    layout.tsx          — Root layout, fonts, metadata
    page.tsx            — Homepage (long-scroll)
    _components/        — Shared components (Header, Footer, ProductCard, etc.)
    (pages)/
      about/page.tsx
      cafe-verde/
        page.tsx        — Green coffee offer list (B2B, enquiry flow)
        [handle]/page.tsx — Green lot detail (six tabs, WhatsApp/email enquiry)
      tienda/
        page.tsx        — Roasted coffee + merch store (Shopify cart)
        [handle]/page.tsx — Roasted/merch detail (Shopify add-to-cart)
      services/page.tsx
      blog/page.tsx
      blog/[slug]/page.tsx
      contact/page.tsx
    api/
      revalidate/route.ts  — Shopify webhook handler for ISR
  lib/
    shopify.ts          — Storefront API client + queries
    whatsapp.ts         — WhatsApp URL builder for green coffee enquiries
    gsap.ts             — GSAP hooks (scroll reveals, hover effects)
    framer.ts           — Framer Motion variants (transitions, drawers)
    utils.ts            — Shared utilities
    constants.ts        — Site-wide constants
  styles/
    globals.css         — Tailwind base + custom properties
  types/
    shopify.ts          — TypeScript types for Shopify responses
    index.ts            — Shared types
  config/
    site.ts             — Site metadata, nav structure, social links, WhatsApp number
    i18n.ts             — Translation strings (ES/EN)
public/
  fonts/                — Self-hosted typefaces
  images/               — Static images (logo, fallbacks)
```

## Code Style

- TypeScript strict mode
- Functional components only
- Server Components by default, 'use client' only when needed
- Named exports for components, default exports for pages
- Descriptive variable names, minimal comments (code should be self-documenting)
- Tailwind for all styling — no CSS modules, no styled-components
- Mobile-first responsive: base styles → sm: → md: → lg:

## Common Commands

```bash
npm run dev          # Local development
npm run build        # Production build
npm run lint         # ESLint
npm run type-check   # TypeScript check
```

## Things to Remember

1. **ONE backend: Shopify.** Everything lives there — green lots, roasted coffee, merch, blog posts. Juan has one login, one admin, one workflow. No CMS, no Notion, no Sanity at launch.
2. **Two commerce flows, same admin.** Green coffee → enquiry (WhatsApp + email). Roasted + merch → Shopify cart + checkout. The frontend decides which flow based on the collection. Juan's workflow is identical for both. NEVER put a Shopify cart button on green coffee.
3. **Enquiry UX:** WhatsApp button with WA logo + email option. Pre-fill the message with lot details. Support multi-lot enquiry lists (client-side state, send all at once).
4. **Quick-view drawer on green coffee:** Clicking a lot card opens a slide-out panel with key specs + enquiry CTAs. "Ver detalles completos →" links to full product page with six tabs.
5. Spanish is the primary language. English is a toggle. All hardcoded strings should come from the i18n config.
6. The site's credibility comes from showing the PROCESS before the product. Lead with expertise, not "buy now."
7. Photography will be added later — use placeholder containers that maintain aspect ratios and feel intentional (not broken).
8. Shopify hosted checkout for roasted + merch — never attempt to build checkout UI.
9. The four pillars (Grow · Source · Lab · Logistics) describe Coffee Five as a business/service platform.
10. Location labels on green coffee lots are critical — buyers need to know if coffee is in Colombia, in transit, or landed in the US.
11. Merch lives in `/tienda` alongside roasted coffee. Same cart, same checkout. Separate collection for filtering.
12. Green lot detail page tab content (Sabor, Origen, Proceso, Verde) comes from the Shopify product description or rich text metafields. Not a separate CMS.
