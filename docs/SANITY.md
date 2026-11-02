# Sanity — setup and content workflow

Sanity is the CMS for the offer list, roasted coffee, the blog, and the text and
photos of every page. The Studio is mounted inside this app at **`/studio`**, with
no separate deploy.

Until `NEXT_PUBLIC_SANITY_PROJECT_ID` is set, the site renders its bundled content.
Nothing breaks before setup.

---

## 1. One-time setup

### Create the project

```bash
npx sanity login                       # opens a browser
npx sanity projects create "Coffee Five"
```

Or create it at <https://sanity.io/manage> and copy the **Project ID**.

### Create the dataset

```bash
npx sanity dataset create production
```

### Fill in `.env.local`

Copy `.env.example` to `.env.local` and set:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=<your project id>
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_WRITE_TOKEN=<token>
```

The write token comes from **sanity.io/manage → API → Tokens → Add token**,
with the **Editor** role. It is only used by the CLI scripts; it never reaches
the browser.

### Allow the Studio to talk to the API

```bash
npx sanity cors add http://localhost:3001 --credentials
npx sanity cors add https://thecoffeefive.com --credentials
```

Skipping this makes the Studio load but fail every request with a CORS error.

### Publish-driven updates

Without this, changes wait for a five-minute cache to expire.

1. Generate a secret and add it to Vercel as `SANITY_REVALIDATE_SECRET`.
2. At sanity.io/manage → API → Webhooks, add a webhook:
   - URL: `https://thecoffeefive.com/api/revalidate`
   - Dataset: `production`. Trigger on create, update and delete.
   - Secret: the same value.

### Migrating page text into the Studio

The dataset holds live content, so always back up first. The migration only fills
what is missing: a value already in Sanity is never replaced.

```bash
npx sanity dataset export production backup.tar.gz
npm run sanity:migrate                     # report only, needs no token
npm run sanity:migrate -- --apply          # write; needs SANITY_API_WRITE_TOKEN
```

Run it again afterwards: it should report 0 to fill. It uploads the bundled page
photos so editors see what is showing, and converts plain product fields to
bilingual, keeping their text as Spanish.

**After migrating, Sanity's values win.** Changing text in `es.ts` or `en.ts` stops
showing on the site. Change it in the Studio.

Then open <http://localhost:3001/studio>.

---

## 2. Everyday content editing

| Content | Where in the Studio |
|---|---|
| Header, footer, buttons, 404 page | **General** |
| Page text and photos | **Inicio**, **Consultorio**, **Nosotros**, **Proceso**, **Contacto** |
| Green coffee lots | **Café verde** |
| Offer list and lot page labels | **Café verde → Textos de café verde** |
| Roasted coffee | **Café tostado → Cafés** |
| Opening the store, its text | **Café tostado → Apertura y textos** |
| Blog posts | **Blog → Artículos** |

With the webhook set up, published changes appear within seconds.

**Blank fields never blank the site**, but the fallback depends on the content:

- Page text falls back to the bundled text **for that language**. Fixed labels and
  headings never show Spanish on the English site.
- Lots, products, blog posts and list items (FAQs, tags) have no bundled version,
  so an empty English field shows the Spanish.

---

## 3. Bulk editing lots by CSV

Green coffee inventory moves faster than editing one document at a time — prices
track the exchange, bags sell down, containers land. So lots round-trip through a
spreadsheet.

**Juan does this in the Studio**, not the terminal: the **Importar CSV** tab
downloads the current lots, takes an edited file back, shows a diff of exactly
what will change, and applies it. No token, no CLI.

The commands below are the same operation for scripting and bulk work. Both
share the rules in `src/sanity/lib/lot-csv.ts`, so they behave identically.

### Export

```bash
npm run lots:export                  # writes lots-YYYY-MM-DD.csv
npm run lots:export -- offer.csv     # writes offer.csv
npm run lots:export -- --stdout      # prints to stdout
```

Includes hidden lots, so nothing is silently dropped from a round-trip.

### Import

```bash
npm run lots:import -- offer.csv --dry-run    # show what would change
npm run lots:import -- offer.csv              # apply
```

Always dry-run first. The output names every lot it would create and every field
it would change, old value → new value.

### Import rules

- Lots are matched on **`ref`** (`HS-001`, `RG-002`). Renaming a lot is safe;
  changing its `ref` creates a new one.
- An existing lot is **patched** — only the columns in the CSV are touched.
  Photos and anything else are preserved, including the other language of a
  bilingual field when a file holds only one.
- A lot's **slug is never rewritten**, because that would break live URLs.
- Lots missing from the CSV are **left alone**. The importer never deletes.
- The whole file is validated before anything is written. One bad row aborts the
  run, so you can never end up with a half-imported offer list.

### Columns

`scripts/templates/lots-template.csv` is a ready-to-edit file containing the
current lots. Column definitions live in `src/sanity/lib/lot-csv.ts` — that one list
drives both the importer and the exporter, so the two can't drift apart.

Validated columns:

| Column | Rule |
|---|---|
| `ref` | required, format `XX-000` |
| `name` | required |
| `proceso` | required — Lavado, Natural, Honey, Anaeróbico, Fermentado |
| `price`, `weight` | required, free text |
| `ubicacion` | required — `colombia`, `en_transito`, `landed_us` |
| `disponible` | `true`/`false` (also accepts sí/no, 1/0) |
| `order` | number — lower sorts first |

Bilingual columns are suffixed `_es` / `_en` (`nota_finca_es`, `nota_finca_en`).

Excel quirks are handled: a UTF-8 BOM and CRLF line endings both import cleanly.

---

## 4. Adding a new field

**To a lot:**

1. Add it to the schema in `src/sanity/schemas/documents/greenLot.ts`.
2. Add a column to `COLUMNS` in `src/sanity/lib/lot-csv.ts` if it should round-trip
   through CSV, and to `scripts/templates/lots-template.csv`.
3. Add it to `GREEN_LOT_FIELDS` in `src/sanity/queries.ts` and map it in
   `toGreenLot` in `src/sanity/fetch.ts`.

**To site copy:**

1. Add the key to `src/config/dictionaries/es.ts` and `en.ts`.
2. Add the field, with a Spanish label, to `src/sanity/schemas/documents/copy.ts`.
3. `npm run sanity:check-copy` reports any text without a field, and the reverse.

A new photo is a `photo(src, alt)` slot in the dictionaries and a `foto(...)` field
in the schema. Render it with `{...photoProps(p)} alt={p.alt}`.

---

## 5. How content is resolved

| Content | Sanity empty or failing | Blank field |
|---|---|---|
| Page text and photos (`getSiteCopy`) | Bundled dictionary | Bundled value for that language |
| Lots | Empty list in production, mock data in dev | Hidden, or general text for tasting copy |
| Blog | Bundled articles | English falls back to Spanish |
| Roasted coffee | Próximamente | English falls back to Spanish |

Lots and roasted coffee never fall back to bundled data in production, because
serving stale prices to a buyer is worse than an obviously empty page. Queries time
out after 2.5 seconds.
