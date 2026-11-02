/**
 * Copies the bundled text and photos into the Studio's page documents, so editors
 * start from what the site shows instead of empty fields. Only fills what is
 * missing: a value already in Sanity is never replaced, and lots, blog posts and
 * products are not touched.
 *
 *   npm run sanity:migrate                          # report only, needs no token
 *   npm run sanity:migrate -- --dataset staging     # report on another dataset
 *   npm run sanity:migrate -- --apply               # write; needs SANITY_API_WRITE_TOKEN
 *
 * Export a backup first: npx sanity dataset export production backup.tar.gz
 */
import { createReadStream, existsSync } from 'node:fs';
import { basename, join } from 'node:path';
import { createClient, type SanityClient } from '@sanity/client';
import { loadEnv } from './lib/sanity-client';
import { planFill, toObject, type Photo, type SchemaField } from './lib/copy-fill';
import { es } from '../src/config/dictionaries/es';
import { en } from '../src/config/dictionaries/en';
import { COPY_DOCS, type CopyDocId } from '../src/sanity/lib/copy-docs';
import { copyDocuments } from '../src/sanity/schemas/documents/copy';

loadEnv();

const args = process.argv.slice(2);
const apply = args.includes('--apply');
const datasetArg = args.includes('--dataset') ? args[args.indexOf('--dataset') + 1] : undefined;

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '';
const dataset = datasetArg ?? process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-10-01';
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!/^[a-z0-9]{8,}$/i.test(projectId)) {
  throw new Error('NEXT_PUBLIC_SANITY_PROJECT_ID is not set. See docs/SANITY.md.');
}
if (apply && !token) {
  throw new Error('--apply needs SANITY_API_WRITE_TOKEN in .env.local (Editor role).');
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false, perspective: 'published' });

const documents = copyDocuments as unknown as (SchemaField & { name: CopyDocId })[];

function wantedDoc(docId: CopyDocId, photos: Photo[]): Record<string, unknown> {
  const doc = documents.find((d) => d.name === docId);
  if (!doc) throw new Error(`No schema for ${docId}`);
  return toObject(doc.fields ?? [], { es, en }, photos);
}

/** Upload each bundled photo once; Sanity also dedupes by file hash. */
async function uploadPhotos(photos: Photo[], sanity: SanityClient): Promise<Map<string, string>> {
  const assets = new Map<string, string>();
  for (const { src } of photos) {
    if (assets.has(src)) continue;
    const file = join('public', src);
    if (!existsSync(file)) {
      console.warn(`  missing file, skipped: ${file}`);
      continue;
    }
    const asset = await sanity.assets.upload('image', createReadStream(file), { filename: basename(file) });
    assets.set(src, asset._id);
    console.log(`  uploaded ${src}`);
  }
  return assets;
}

/** Replace the `_bundledSrc` marker with a real image reference. */
function attachImages(value: unknown, assets: Map<string, string>): unknown {
  if (Array.isArray(value)) return value.map((item) => attachImages(item, assets));
  if (typeof value !== 'object' || value === null) return value;
  const { _bundledSrc, ...rest } = value as Record<string, unknown>;
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(rest)) out[k] = attachImages(v, assets);
  const asset = typeof _bundledSrc === 'string' ? assets.get(_bundledSrc) : undefined;
  if (asset) out.image = { _type: 'image', asset: { _type: 'reference', _ref: asset } };
  return out;
}

async function main() {
  console.log(`${apply ? 'APPLY' : 'DRY RUN'} on ${projectId}/${dataset}\n`);

  const legacy = await client.fetch<{ _createdAt: string; _updatedAt: string } | null>(
    `*[_id == "siteCopy"][0]{_createdAt, _updatedAt}`,
  );
  if (legacy && legacy._createdAt !== legacy._updatedAt) {
    console.warn('WARNING: old siteCopy was edited after it was seeded. Review it before applying.\n');
  }

  const ids = Object.keys(COPY_DOCS) as CopyDocId[];
  const existing = await client.fetch<Record<string, unknown>[]>(`*[_id in $ids]`, { ids });
  const photos: Photo[] = [];
  const plans = ids.map((id) => {
    const wanted = wantedDoc(id, photos);
    const held = existing.find((doc) => doc._id === id);
    return { id, held, plan: planFill(wanted, held) };
  });

  let totalSets = 0;
  for (const { id, held, plan } of plans) {
    totalSets += plan.sets.length;
    console.log(
      `${id}: ${held ? 'exists' : 'new'}, ${plan.sets.length} to fill, ${plan.identical} identical, ${plan.differs.length} differ (Sanity wins)`,
    );
    plan.differs.forEach((path) => console.log(`    differs: ${path}`));
  }
  const uniquePhotos = new Set(photos.map((p) => p.src)).size;
  console.log(`\n${totalSets} paths to fill. ${uniquePhotos} bundled photos referenced.`);

  if (!apply) {
    console.log('Nothing written. Re-run with --apply to write.');
    return;
  }
  if (totalSets === 0) {
    console.log('Nothing to do.');
    return;
  }

  const assets = await uploadPhotos(photos, client);
  for (const { id, held, plan } of plans) {
    if (plan.sets.length === 0) continue;
    const tx = client.transaction().createIfNotExists({ _id: id, _type: id });
    for (const { path, value } of plan.sets) {
      tx.patch(id, (patch) => patch.setIfMissing({ [path]: attachImages(value, assets) }));
    }
    await tx.commit({ visibility: 'async' });
    console.log(`wrote ${id}${held ? '' : ' (new)'}`);
  }
  console.log('\nDone. Run again: it should report 0 to fill.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
