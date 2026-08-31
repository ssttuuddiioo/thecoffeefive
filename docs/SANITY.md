# Sanity — setup and content workflow

Sanity is the CMS for the offer list, roasted coffee, the journal, and every UI
string on the site. The Studio is mounted inside this app at **`/studio`** — no
separate deploy, one login.

Until `NEXT_PUBLIC_SANITY_PROJECT_ID` is set, the site keeps rendering the
bundled content in `src/lib/mock-data.ts`. Nothing breaks before setup.

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

### Migrate the existing content

```bash
npm run sanity:seed -- --dry-run     # report what would be written
npm run sanity:seed -- --images      # write, and upload public/lots photos
```

The seed is idempotent — documents use deterministic ids (`greenLot-HS-001`),
so re-running updates in place instead of creating duplicates.

Then open <http://localhost:3001/studio>.

---

## 2. Everyday content editing

| Content | Where |
|---|---|
| Green coffee lots | Studio → **Lotes de café verde** |
| Roasted coffee | Studio → **Café tostado** |
| Blog posts | Studio → **Blog** |
| All site text (ES + EN) | Studio → **Textos del sitio** |

Published changes appear on the site within 60 seconds (ISR).

Spanish is the source of truth. An empty English field falls back to Spanish
rather than rendering blank.

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
  Photos and anything else are preserved.
- A lot's **slug is never rewritten**, because that would break live URLs.
- Lots missing from the CSV are **left alone**. The importer never deletes.
- The whole file is validated before anything is written. One bad row aborts the
  run, so you can never end up with a half-imported offer list.

### Columns

`scripts/templates/lots-template.csv` is a ready-to-edit file containing the
current lots. Column definitions live in `scripts/lib/lot-csv.ts` — that one list
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

1. Add it to the schema in `src/sanity/schemas/documents/greenLot.ts`.
2. Add a column to `COLUMNS` in `scripts/lib/lot-csv.ts` if it should round-trip
   through CSV.
3. Map it in `toGreenLot` in `src/sanity/fetch.ts`.

For **site copy**, instead add the key to `src/config/dictionaries/es.ts` and
`en.ts`, then regenerate the schema:

```bash
npm run sanity:gen-copy
```

`src/sanity/schemas/documents/siteCopy.ts` is generated from the Spanish
dictionary — never hand-edit it, it is overwritten on every run.

---

## 5. How content is resolved

`src/sanity/fetch.ts` decides where content comes from:

| Situation | Result |
|---|---|
| Sanity not configured | Bundled mock data |
| Sanity errors / unreachable | Bundled mock data, with a warning — an outage degrades instead of taking the site down |
| Configured but empty, in dev | Bundled mock data |
| Configured but empty, in production | Empty |

That last row is deliberate: serving stale prices to a buyer who thinks they are
current is worse than an obviously empty page.
