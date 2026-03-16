# Coffee Five — Figma Design Brief

## For: Pablo @ Studio Studio
## Client: Juan Medina — Coffee Five Project

---

## Creative Direction

**One sentence:** Black and white minimalist — premium, editorial, photography-driven. The design system is invisible; the coffee is visible.

**The principle:** The less the design says, the more the photography says. Every pixel of chrome, decoration, or color that isn't in a photograph is a pixel competing with Juan's story. Strip it until there's nothing left to remove, then make what remains precise.

**Reference energy:** Onyx Coffee Lab's website (2025 Webby Award winner for Best Ecommerce) — dark, restrained, photography-first, with one expressive typographic mark (the script logo) surrounded by total discipline. Coffee Five should feel like a peer to Onyx, not a copy. The difference is Juan's origin story and consulting depth.

---

## Color Palette

## Color Palette — LOCKED

### Base: Black & White + Warm Neutral

| Token | Value | Usage |
|-------|-------|-------|
| `--black` | `#0A0A0A` | Primary background, text on light |
| `--white` | `#FAFAF9` | Primary text on dark |
| `--cream` | `#EDE7D6` | Warm neutral — light section backgrounds, card surfaces, soft contrast against pure black/white |
| `--gray-900` | `#141414` | Card backgrounds on dark sections |
| `--gray-800` | `#1E1E1E` | Subtle surface elevation |
| `--gray-700` | `#2A2A2A` | Borders on dark |
| `--gray-400` | `#8A8A8A` | Secondary text, metadata |
| `--gray-200` | `#D4D4D4` | Borders on light |

### Process Colors (for lot cards)

Lot card color is **assigned by processing method**. Each proceso gets a fixed color:

| Proceso | Color | Hex |
|---------|-------|-----|
| Lavado (Washed) | Blue | `#4592DB` |
| Natural | Green | `#0D7C47` |
| Honey | Yellow | `#ECCD3E` |
| Anaeróbico / Experimental | Red | `#91171F` |
| Fermentado / Extended | Bright Red | `#F63F34` |

These colors appear ONLY on lot cards and process-related UI (filter pills, process badges). They do not appear anywhere else in the system. The B&W base stays clean.

### No gradients

Zero gradients anywhere. No gradient overlays on hero, no gradient backgrounds, no gradient fills. Solid colors only. This is non-negotiable.

### Location Badges

Keep functional and subtle — text labels in gray metadata style. No colored badges:
- "📍 Colombia" / "🚢 En tránsito" / "📦 EE.UU." in secondary text color

---

## Typography

## Typography — LOCKED

### Google Sans

**Single type family for everything.** Google Sans (Product Sans) for headings, body, and UI elements. Clean, geometric, premium, and free via Google Fonts. No monospace secondary — Google Sans handles metadata and labels too, differentiated by weight, size, and letter-spacing.

**Load via `next/font/google`:**
```typescript
import { Google_Sans } from 'next/font/google'; // or use the actual package name
```

Note: Google Sans may need to be loaded as "Google Sans" or sourced directly. If unavailable via next/font, self-host the woff2 files in `/public/fonts/`.

**How to differentiate without a mono typeface:**
- Metadata, labels, nav links: Google Sans at 10-12px, letterspaced (1-2px), uppercase
- Prices, weights, scores: Google Sans Medium, tabular numerals if available
- Section tags ("01 — El Proceso"): Google Sans at 10px, letterspaced, uppercase
- Body text: Google Sans Regular at 16px, normal letter-spacing

### Type Scale (Tailwind-compatible)

```
Hero display:     72px / 80px line-height  (desktop) → 40px / 48px (mobile)
Page title:       48px / 56px
Section heading:  32px / 40px
Card title:       20px / 28px
Body:             16px / 26px  ← generous line-height for readability
Body small:       14px / 22px
Metadata:         12px / 18px  (letter-spacing: 0.5-1px)
Tag/label:        10px / 16px  (letter-spacing: 1-2px, uppercase)
```

### Weight usage
- **Regular (400):** Body text, descriptions
- **Medium (500):** Navigation, card titles, metadata emphasis
- **Bold (700):** Section headings, hero headline
- Never use Light (300) or Black (900)

---

## Layout Grid (Figma Setup)

### Desktop frame: 1440px wide

Set up a 12-column grid:
- **Columns:** 12
- **Gutter:** 24px
- **Margin:** 80px left/right (content area = 1280px)

This maps to `max-w-7xl mx-auto px-6 md:px-8 lg:px-20` in Tailwind.

### Mobile frame: 375px wide
- **Columns:** 4
- **Gutter:** 16px
- **Margin:** 20px left/right

### Tablet frame: 768px wide (optional, can interpolate)
- **Columns:** 8
- **Gutter:** 20px
- **Margin:** 40px

---

## Key Frames to Design

You don't need to design every page. Design these, and the system will be clear enough for Claude Code to extrapolate the rest:

### 1. Homepage Hero + Nav (most critical)

This sets the entire tone. Design at 1440px wide, full viewport height.

- **Navigation:** TRANSPARENT over hero image. Logo left (the florecita mark, small, white). Nav links right (Google Sans, letterspaced, uppercase, 10-11px, white). Language toggle (ES / EN). Cart icon. No background pill, no frosted glass — just white text floating on the image. Becomes solid black bar on scroll.
- **Hero area:** Full-bleed photograph with NO gradient overlay. Choose a dark enough hero image that white text reads naturally. No scrim, no gradient, no overlay of any kind. Just photo + type.
- **Hero headline:** "Somos expertos, pero no dejamos de aprender." White text, centered.
- **Two CTAs:** "Nuestro Café" (primary — white outline button) + "Nuestros Servicios" (secondary, more subtle)
- **Scroll indicator:** minimal, bottom center

### 2. Identity Section (02)

Two layouts to show (the carousel has 2 slides):
- **Slide 1:** Centered. Roles in uppercase letterspaced Google Sans ("PRODUCTOR · CATADOR · TOSTADOR · BARISTA · EXPORTADOR"). Headline below. Short subtext.
- **Slide 2:** Two-column. Large headline left, roles + description right.

This section should feel like a magazine editorial spread — confident, spacious, all typography.

### 3. One Green Coffee Lot Card (at full detail)

This is the standout component. Design at the actual card size (~360px wide × 480px tall):
- Solid color background **assigned by proceso** (see Process Colors table above):
  - Lavado → Blue `#4592DB`
  - Natural → Green `#0D7C47`
  - Honey → Yellow `#ECCD3E`
  - Anaeróbico → Dark Red `#91171F`
  - Fermentado → Bright Red `#F63F34`
- Florecita logo watermark, top-left, white, semi-transparent
- Coffee name at bottom (white, medium weight, ~22px)
- Metadata: weight + price per lb (Google Sans, white, letterspaced)
- "Learn More" button (appears on hover — white outline, uppercase)
- Rounded corners (12px)

Also show it in context: a horizontal scroll row of 4-5 cards with different proceso colors.

### 4. One Roasted Coffee Card

- Dark card background (#141414 on #0A0A0A)
- Product image area (square, 1:1)
- Title, tasting notes (italic), price + weight
- Small tag pills (variedad, proceso, roast level) in dark muted chips
- This should feel consumer-friendly and approachable within the minimal system

### 5. Mobile Nav State

- Hamburger icon → full-screen overlay (black bg, white text)
- Nav links stacked, large, letterspaced
- Language toggle, cart link
- Close (X) button top-right

### 6. Footer

- Black background
- 4-column grid (or stack on mobile)
- Logo, tagline, newsletter signup
- Link columns in mono/metadata style
- Minimal, functional, not decorative

---

## Spacing Rules

Design with an **8px base grid**. All spacing should be multiples of 8:

| Use | Desktop | Mobile |
|-----|---------|--------|
| Section padding (top/bottom) | 120px | 64px |
| Between section heading and content | 48px | 32px |
| Between cards in a grid | 24px | 16px |
| Card internal padding | 24-32px | 16-20px |
| Between metadata items | 8-12px | 8px |
| Paragraph spacing | 24px | 20px |

**Generous whitespace is not optional.** The minimalism only works if the negative space is doing work. If a section feels cramped, add more space — never more content.

---

## Photography Direction (for placeholder context)

You won't have final photography during the Figma phase, but frame the placeholders knowing the photos will be:

- **Documentary-style.** Not staged product shots. Juan at the cupping table. Hands sorting cherries. The lab in Medellín. Finca landscapes at golden hour. Coffee drying on raised beds.
- **Warm-toned.** The photography brings all the warmth that the B&W system intentionally withholds.
- **High contrast.** Deep shadows, highlights that catch. Moody, not flat.
- **People-centric.** Juan's face, his hands, farmers he works with. This is a human story.

For placeholders in Figma, use solid dark rectangles (#1A1A1A) — the same approach as the wireframe but without the dashed borders and X marks. Clean, intentional voids that imply "photo goes here" without looking broken.

---

## Component Checklist

Design these as reusable Figma components with variants:

- [ ] **Button** — primary (white on black), secondary (outlined), text link with arrow
- [ ] **Section Tag** — "01 — El Origen" style (Google Sans, uppercase, letterspaced)
- [ ] **Nav Link** — default, hover, active states (Google Sans, letterspaced)
- [ ] **Language Toggle** — ES / EN
- [ ] **Lot Card (Green)** — 5 proceso color variants (Lavado/Natural/Honey/Anaeróbico/Fermentado), hover state showing button
- [ ] **Roasted Card** — default state, dark bg, NO add-to-cart on card (only on product detail page)
- [ ] **Journal Card** — image + category + title + description
- [ ] **Tag Pill** — minimal pill style, dark variant + light variant
- [ ] **Process Badge** — small pill using proceso color, used on cards and product detail
- [ ] **Tab Bar** — minimal pill style for product detail page tabs (Resumen, Sabor, Origen, Proceso, Verde, Preparación)
- [ ] **Location Label** — text-only, no colored badge ("📍 Colombia" in secondary text)
- [ ] **Newsletter Input** — input field + submit button
- [ ] **Image Placeholder** — solid dark rectangle (#1A1A1A) at various aspect ratios (16:9, 3:4, 1:1, 3:2)

---

## What NOT to Design

- Don't design the blog post template — that follows from the journal card + editorial type system
- Don't design the consulting subpages — homepage services section sets the pattern
- Don't pick photography — that's a separate workstream with Juan
- Don't add decorative elements — if you're reaching for a divider line, gradient, pattern, texture, or icon, ask whether the layout would work without it. It probably does.

---

## Design Reference: Product Detail Page (Green Coffee)

**Reference:** Royal Coffee's product pages (e.g., royalcoffee.com/product/...)

Royal Coffee treats each green coffee lot like a mini-magazine. The product page isn't just "here's a bag, buy it" — it's an entire story told through tabbed sections. This is exactly the energy Juan's green coffee pages should have. Juan controls the entire chain, so he can tell even more of the story than an importer like Royal can.

### Tab Structure (from Royal, adapted for Coffee Five)

Royal uses these tabs: Overview, Taste, Source, Green, Diedrich, Aillio, Ikawa, Brew, Espresso. Coffee Five doesn't need roast machine profiles, but the principle of deep storytelling through structured sections is perfect.

**Coffee Five's product detail tabs:**

1. **Resumen (Overview)** — Quick hit: what is this coffee, who produced it, what does it taste like. The elevator pitch. Flavor profile front and center.

2. **Sabor (Taste)** — Detailed tasting notes. Not just "chocolate, cherry" but the kind of editorial description Royal does — context, pairings, the sensory experience. This is where Juan's catador expertise shines. Written like a wine review, not a data sheet.

3. **Origen (Source)** — The farm story. Who is the producer? How many hectares? What's the altitude, the climate, the soil? The human story behind the lot. This is the section that justifies the price and builds trust. Include: producer name, farm name, municipality, department, altitude, farm size, relationship history with Juan.

4. **Proceso (Process)** — How was this specific lot processed? Cherry selection, fermentation hours, temperature, washing method, drying method (raised beds, parabolic dryer), drying duration. The technical depth that B2B buyers care about. Juan's consulting expertise makes this section uniquely credible — he didn't just buy this coffee, he may have helped design the process.

5. **Verde (Green Analysis)** — Physical quality data. Density, moisture content, water activity, screen size, defect count. This is the lab data from Juan's Medellín lab. B2B buyers need this to make purchasing decisions. Present as clean data, not prose.

6. **Preparación (Brew Guide)** — Optional, for roasted version or as a value-add. Recommended brew methods, ratios, grind settings. Could be added later when roasted coffee launches.

### Product Detail Page Layout (design this in Figma)

**Top section (above the fold):**
- Product images (gallery or single hero image of the lot/farm)
- Coffee name + lot number
- Key metadata in a scannable grid:
  - Productor: Evelio Lasso
  - Finca: Los Guayacanes
  - Región: Nariño, Colombia
  - Variedad: Chiroso
  - Proceso: Lavado
  - Altura: 2,100 masl
  - Puntaje: 88
  - Perfil: blood orange, guava, sweet lemon curd, floral
- Location badge (En Colombia / En tránsito / Landed)
- Price + weight options + Add to Cart
- Available quantity (boxes/bags remaining)

**Below the fold:**
- Tab navigation bar (sticky on scroll)
- Tab content area with generous typography and spacing
- Each tab is a full editorial section — not collapsed accordions, actual rich content
- Related lots at the bottom

### What makes Royal's approach work (and what to carry forward):
- **Tabs, not scroll.** The depth doesn't overwhelm because you choose what to read. The Overview gives you enough to buy; the deeper tabs reward curiosity.
- **Named authors.** Royal credits each analysis to a specific person ("Taste Analysis by Isabella Vitaliano"). Juan should do this too — it reinforces that a real expert is behind each assessment.
- **Narrative over data.** The Source tab reads like a travel essay, not a spec sheet. The processing description tells you WHY the fermentation was 50-60 hours (cold alpine temperatures), not just that it was.
- **Roaster guidance.** Even as a green seller, Royal gives roasters actionable profiles. Juan could include cupping notes, suggested roast approach, or brew recommendations — adding value beyond the raw product.

### Shopify Metafield Implications

The product detail page will need MORE metafields than currently spec'd. Add to the Shopify setup:

| Namespace | Key | Type | Purpose |
|-----------|-----|------|---------|
| coffee | productor | Single line text | Producer name |
| coffee | finca_size | Single line text | Farm size (e.g., "3.5 hectares") |
| coffee | municipio | Single line text | Municipality |
| coffee | departamento | Single line text | Department |
| coffee | fermentacion_horas | Number | Fermentation hours |
| coffee | secado_dias | Number | Drying days |
| coffee | secado_metodo | Single line text | Drying method |
| coffee | densidad | Number (decimal) | Density (g/L) |
| coffee | humedad | Number (decimal) | Moisture % |
| coffee | actividad_agua | Number (decimal) | Water activity |
| coffee | screen_size | Single line text | Screen size |
| coffee | cosecha | Single line text | Harvest season/year |
| coffee | lote | Single line text | Lot number |
| coffee | cantidad_disponible | Single line text | Available quantity |

The rich narrative content (taste analysis, source story, process detail) should live in Shopify's product description HTML or in dedicated metafield rich text fields — structured so each tab's content can be pulled separately.

Alternatively, this is exactly where Sanity would shine later — each tab becomes a structured content block that Juan or Pablo can edit independently.

---

## Handoff Notes

When the Figma frames are ready:

1. Export key frames as PNG/PDF and drop them in `docs/design/`
2. Note the final typeface choices so we can update DESIGN.md and buy/source the fonts
3. Note any spacing or sizing decisions that differ from this brief
4. I'll update CLAUDE.md, DESIGN.md, MIGRATION.md, tailwind.config.ts, and globals.css to match — then Claude Code builds to spec

---

## One Last Thing

The difference between a $50 coffee website and a $5,000 one is never the features — it's the spacing, the type choices, and the restraint. Juan's brand story is powerful. The design's job is to get out of the way and let it land.
