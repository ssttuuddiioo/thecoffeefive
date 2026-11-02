# Coffee Five — Juan Medina Specialty Coffee

**Website:** coffeefive.com (TBD)
**Client:** Juan Medina — Specialty Coffee Professional & Exporter
**Built by:** Pablo @ Studio Studio, LLC

## Stack

- **Framework:** Next.js 14 (App Router)
- **CMS:** Sanity, with the Studio at `/studio`. See `docs/SANITY.md`
- **Orders:** WhatsApp and email enquiries
- **Hosting:** Vercel
- **Styling:** Tailwind CSS
- **Language:** TypeScript

## Architecture

```
Browser → Next.js (Vercel) → Sanity → lots, products, blog, page text and photos
```

Juan edits everything in the Studio. Bundled copy in `src/config/dictionaries` is the
fallback, so a blank field or a Sanity outage never blanks the site. The frontend is
fully custom.

## Getting Started

```bash
npm install
cp .env.example .env.local
# Add the Sanity project ID
npm run dev
```

## Environment Variables

See `.env.example`.

## Deployment

Push to `main` → Vercel auto-deploys.
