# Coffee Five — Juan Medina Specialty Coffee

**Website:** coffeefive.com (TBD)
**Client:** Juan Medina — Specialty Coffee Professional & Exporter
**Built by:** Pablo @ Studio Studio, LLC

## Stack

- **Framework:** Next.js 14 (App Router)
- **Commerce:** Shopify Storefront API (products, cart, checkout, blog)
- **Hosting:** Vercel
- **Styling:** Tailwind CSS
- **Language:** TypeScript

## Architecture

```
Browser → Next.js (Vercel)
              ├── Shopify Storefront API → Products, Cart, Checkout, Blog
              └── Static/ISR pages → About, Services, Contact
```

Shopify is the single data source for launch. Juan manages everything from the Shopify admin:
- Products (green + roasted coffee)
- Blog posts
- Inventory
- Orders & fulfillment

The frontend is fully custom — no Shopify themes. We pull data via the Storefront API and render it however we want.

## Future: Sanity CMS

When editorial needs outgrow Shopify's blog editor, we'll add Sanity as a content layer. The architecture is designed to make this a clean addition — not a rewrite. Product data stays in Shopify; editorial/brand content moves to Sanity.

## Getting Started

```bash
npm install
cp .env.example .env.local
# Add your Shopify credentials
npm run dev
```

## Environment Variables

```
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-token
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
```

## Deployment

Push to `main` → Vercel auto-deploys.
