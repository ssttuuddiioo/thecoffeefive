/**
 * One-time migration of the bundled content in `src/lib/mock-data.ts` and the
 * ES/EN dictionaries into Sanity.
 *
 *   npm run sanity:seed -- --dry-run   # report what would be written
 *   npm run sanity:seed                # write
 *   npm run sanity:seed -- --images    # also upload public/lots/*.jpg
 *
 * Idempotent: documents use deterministic ids (`greenLot-HS-001`), so re-running
 * updates in place rather than creating duplicates. Existing images are left
 * alone unless --images is passed.
 */
import { existsSync, readFileSync } from 'node:fs';
import { randomUUID } from 'node:crypto';
import { loadEnv, getWriteClient } from './lib/sanity-client';
import { slugifyLot } from '../src/lib/slug';
import {
  mockGreenLots,
  mockRoastedCoffee,
  getAllJournalSlugs,
  getJournalArticleBySlug,
  type JournalContentBlock,
} from '../src/lib/mock-data';
import { es } from '../src/config/dictionaries/es';
import { en } from '../src/config/dictionaries/en';

loadEnv();

const key = () => randomUUID().slice(0, 8);

/** Sanity requires a _key on every item in an array. */
function keyed<T extends object>(items: T[]): (T & { _key: string })[] {
  return items.map((item) => ({ ...item, _key: key() }));
}

function locale(esValue?: string, enValue?: string) {
  if (!esValue && !enValue) return undefined;
  return { es: esValue ?? '', en: enValue ?? '' };
}

/** Convert the typed journal blocks into Portable Text. */
function toPortableText(blocks: JournalContentBlock[]): Record<string, unknown>[] {
  const out: Record<string, unknown>[] = [];

  for (const block of blocks) {
    if (block.type === 'p' || block.type === 'h2') {
      out.push({
        _type: 'block',
        _key: key(),
        style: block.type === 'h2' ? 'h2' : 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: key(), text: block.text, marks: [] }],
      });
      continue;
    }
    if (block.type === 'ul') {
      for (const item of block.items) {
        out.push({
          _type: 'block',
          _key: key(),
          style: 'normal',
          listItem: 'bullet',
          level: 1,
          markDefs: [],
          children: [{ _type: 'span', _key: key(), text: item, marks: [] }],
        });
      }
      continue;
    }
    if (block.type === 'table') {
      out.push({
        _type: 'table',
        _key: key(),
        headers: block.headers,
        rows: keyed(block.rows.map((cells) => ({ _type: 'row', cells }))),
      });
    }
  }

  return out;
}

/**
 * Walk the ES and EN dictionaries in parallel, producing the siteCopy document.
 * Shape mirrors the generated schema exactly.
 */
function buildSiteCopy(esNode: unknown, enNode: unknown): unknown {
  if (typeof esNode === 'string') {
    return { es: esNode, en: typeof enNode === 'string' ? enNode : esNode };
  }
  if (Array.isArray(esNode)) {
    const enArray = Array.isArray(enNode) ? enNode : [];
    return esNode.map((item, i) => {
      const counterpart = enArray[i];
      if (typeof item === 'string') {
        return { _key: key(), es: item, en: typeof counterpart === 'string' ? counterpart : item };
      }
      const built = buildSiteCopy(item, counterpart) as Record<string, unknown>;
      return { _key: key(), ...built };
    });
  }
  if (esNode && typeof esNode === 'object') {
    const result: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(esNode as Record<string, unknown>)) {
      const counterpart = (enNode as Record<string, unknown> | undefined)?.[k];
      result[k] = buildSiteCopy(v, counterpart);
    }
    return result;
  }
  return esNode;
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const withImages = args.includes('--images');

  const client = getWriteClient();
  const tx = client.transaction();
  const summary: string[] = [];

  // ── Green lots ────────────────────────────────────────────────────────
  const imageRefs = new Map<string, { _type: 'image'; asset: { _type: 'reference'; _ref: string } }[]>();

  if (withImages && !dryRun) {
    for (const lot of mockGreenLots) {
      const uploaded = [];
      for (const path of lot.photos) {
        const file = `public${path}`;
        if (!existsSync(file)) {
          console.warn(`  ! falta ${file} — se omite`);
          continue;
        }
        const asset = await client.assets.upload('image', readFileSync(file), {
          filename: path.split('/').pop(),
        });
        uploaded.push({ _type: 'image' as const, asset: { _type: 'reference' as const, _ref: asset._id } });
      }
      if (uploaded.length > 0) imageRefs.set(lot.ref, uploaded);
      console.log(`  ↑ ${lot.ref}: ${uploaded.length} foto(s)`);
    }
  }

  mockGreenLots.forEach((lot, index) => {
    const doc: Record<string, unknown> = {
      _id: `greenLot-${lot.ref}`,
      _type: 'greenLot',
      ref: lot.ref,
      name: lot.name,
      slug: { _type: 'slug', current: slugifyLot(lot.name) },
      order: index,
      disponible: lot.disponible !== false,
      proceso: lot.proceso,
      price: lot.price,
      weight: lot.weight,
      ubicacion: lot.ubicacion,
      variedad: lot.variedad,
      finca: lot.finca,
      municipio: (lot as { municipio?: string }).municipio,
      region: lot.region,
      altura: lot.altura,
      puntaje: lot.puntaje,
      humedad: lot.humedad,
      actividadAgua: lot.actividadAgua,
      densidad: lot.densidad,
      criba: lot.criba,
      trilla: lot.trilla,
      recomendaciones: locale(lot.recomendaciones, undefined),
      notaFinca: locale(lot.notaFinca, (lot as { notaFincaEn?: string }).notaFincaEn),
    };
    const images = imageRefs.get(lot.ref);
    if (images) doc.images = keyed(images);
    tx.createOrReplace(doc as never);
  });
  summary.push(`${mockGreenLots.length} lotes de café verde`);

  // ── Roasted coffee ────────────────────────────────────────────────────
  mockRoastedCoffee.forEach((coffee, index) => {
    tx.createOrReplace({
      _id: `roastedCoffee-${slugifyLot(coffee.variedad)}`,
      _type: 'roastedCoffee',
      variedad: coffee.variedad,
      slug: { _type: 'slug', current: slugifyLot(coffee.variedad) },
      order: index,
      origin: coffee.origin,
      price: coffee.price,
      weight: coffee.weight,
      proceso: coffee.proceso,
      tueste: coffee.tueste,
      fermentacion: coffee.fermentacion,
      perfil: locale(coffee.perfil, undefined),
      brewRatio: coffee.brew.ratio,
      brewTemperatura: coffee.brew.temperatura,
      brewMetodos: coffee.brew.metodos,
      brewTip: locale(coffee.brew.tip, undefined),
    } as never);
  });
  summary.push(`${mockRoastedCoffee.length} cafés tostados`);

  // ── Journal ───────────────────────────────────────────────────────────
  const slugs = getAllJournalSlugs();
  for (const slug of slugs) {
    const esArticle = getJournalArticleBySlug(slug, 'es');
    const enArticle = getJournalArticleBySlug(slug, 'en');
    if (!esArticle) continue;
    tx.createOrReplace({
      _id: `journalArticle-${slug}`,
      _type: 'journalArticle',
      slug: { _type: 'slug', current: slug },
      title: locale(esArticle.title, enArticle?.title),
      category: locale(esArticle.category, enArticle?.category),
      description: locale(esArticle.description, enArticle?.description),
      readMinutes: esArticle.readMinutes,
      publishedAt: new Date().toISOString(),
      body: {
        es: toPortableText(esArticle.blocks),
        en: enArticle ? toPortableText(enArticle.blocks) : [],
      },
    } as never);
  }
  summary.push(`${slugs.length} artículo(s) del blog`);

  // ── Site copy singleton ───────────────────────────────────────────────
  const copy = buildSiteCopy(es, en) as Record<string, unknown>;
  tx.createOrReplace({ _id: 'siteCopy', _type: 'siteCopy', ...copy } as never);
  summary.push('textos del sitio (ES + EN)');

  console.log('\nA escribir:');
  for (const line of summary) console.log(`  • ${line}`);

  if (dryRun) {
    console.log('\nSimulación — no se escribió nada. Vuelve a ejecutar sin --dry-run para aplicar.');
    if (!withImages) console.log('Añade --images para subir también las fotos de public/lots.');
    return;
  }

  await tx.commit();
  console.log('\nListo. Abre /studio para revisar el contenido.');
  if (!withImages) {
    console.log('Las fotos no se subieron — vuelve a ejecutar con --images si las quieres en Sanity.');
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
