/**
 * Reports drift between the dictionaries and the Studio's copy documents: text
 * the editors can't reach, and Studio fields that nothing reads.
 *
 *   npm run sanity:check-copy
 */
import { es } from '../src/config/dictionaries/es';
import { COPY_DOCS, type CopyDocId } from '../src/sanity/lib/copy-docs';
import { copyDocuments } from '../src/sanity/schemas/documents/copy';

type Field = { name: string; type: string; fields?: Field[]; of?: { type: string; fields?: Field[] }[] };

const missing: string[] = [];
const extra: string[] = [];

const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && !Array.isArray(v);
const isPhoto = (v: Record<string, unknown>) => typeof v.src === 'string' && typeof v.alt === 'string';

function compare(path: string, base: unknown, field: Field | undefined): void {
  if (!field) {
    missing.push(path);
    return;
  }
  if (typeof base === 'string') {
    if (!['localeString', 'localeText'].includes(field.type)) extra.push(`${path}: text but ${field.type}`);
    return;
  }
  if (Array.isArray(base)) {
    if (field.type !== 'array') {
      extra.push(`${path}: list but ${field.type}`);
      return;
    }
    const item = base[0];
    if (isRecord(item)) compareObject(`${path}[]`, item, field.of?.[0]?.fields ?? []);
    return;
  }
  if (isRecord(base)) {
    if (isPhoto(base)) {
      if (field.type !== 'editorialImage') extra.push(`${path}: photo but ${field.type}`);
      return;
    }
    compareObject(path, base, field.fields ?? []);
  }
}

function compareObject(path: string, base: Record<string, unknown>, fields: Field[]): void {
  for (const key of Object.keys(base)) {
    compare(`${path}.${key}`, base[key], fields.find((f) => f.name === key));
  }
  for (const field of fields) {
    if (field.type === 'boolean') continue;
    if (!(field.name in base)) extra.push(`${path}.${field.name}: no dictionary text`);
  }
}

const documents = copyDocuments as unknown as (Field & { name: CopyDocId })[];
for (const [docId, sections] of Object.entries(COPY_DOCS)) {
  const doc = documents.find((d) => d.name === docId);
  if (!doc) {
    missing.push(`document ${docId}`);
    continue;
  }
  for (const section of sections) {
    compare(`${docId}.${section}`, es[section], doc.fields?.find((f) => f.name === section));
  }
}

console.log(`No Studio field (${missing.length}):`);
missing.forEach((line) => console.log(`  ${line}`));
console.log(`Studio field with no text (${extra.length}):`);
extra.forEach((line) => console.log(`  ${line}`));
process.exit(missing.length + extra.length > 0 ? 1 : 0);
