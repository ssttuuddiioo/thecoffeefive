/**
 * Decides what the copy migration may write. Pure, so it can be tested without a
 * dataset. The one rule: a value already in Sanity is never replaced.
 */

export type SchemaField = {
  name: string;
  type: string;
  fields?: SchemaField[];
  of?: { type: string; fields?: SchemaField[] }[];
};

type Rec = Record<string, unknown>;
export type Photo = { src: string; alt: string };

const isRecord = (value: unknown): value is Rec =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isLocaleType = (type: string) => type === 'localeString' || type === 'localeText';

let nextKey = 0;
const key = () => `seed${(nextKey++).toString(36)}`;

export type Bundled = { es: unknown; en: unknown };

/** Build the Sanity value for one field from the ES and EN dictionaries. */
export function toSanity(field: SchemaField, { es, en }: Bundled, photos: Photo[]): unknown {
  if (isLocaleType(field.type)) {
    return { _type: field.type, es: es ?? '', en: en ?? '' };
  }
  if (field.type === 'editorialImage') {
    const source = es as Photo;
    const english = en as Photo;
    if (source.src) photos.push(source);
    return {
      _type: 'editorialImage',
      alt: { _type: 'localeString', es: source.alt, en: english.alt },
      // Swapped for a real asset reference when writing.
      _bundledSrc: source.src,
    };
  }
  if (field.type === 'array') {
    const item = field.of?.[0];
    const esItems = (es as unknown[]) ?? [];
    const enItems = (en as unknown[]) ?? [];
    return esItems.map((value, i) => {
      if (item && isLocaleType(item.type)) {
        return { _key: key(), _type: item.type, es: value, en: enItems[i] ?? '' };
      }
      return {
        _key: key(),
        ...toObject(item?.fields ?? [], { es: value, en: enItems[i] }, photos),
      };
    });
  }
  return { _type: field.type === 'object' ? undefined : field.type, ...toObject(field.fields ?? [], { es, en }, photos) };
}

export function toObject(fields: SchemaField[], { es, en }: Bundled, photos: Photo[]): Rec {
  const out: Rec = {};
  for (const field of fields) {
    const value = toSanity(
      field,
      { es: (es as Rec | undefined)?.[field.name], en: (en as Rec | undefined)?.[field.name] },
      photos,
    );
    out[field.name] = value;
  }
  return JSON.parse(JSON.stringify(out));
}

export type FillReport = {
  /** Shallowest missing paths and the values to write there. */
  sets: { path: string; value: unknown }[];
  identical: number;
  /** Sanity holds a different value and keeps it. */
  differs: string[];
};

const isLeaf = (value: Rec) => 'es' in value || 'en' in value;

function equalLeaf(a: Rec, b: Rec): boolean {
  return a.es === b.es && a.en === b.en;
}

/** Compare the wanted content with what the dataset holds. */
export function planFill(wanted: Rec, existing: unknown, path = ''): FillReport {
  const report: FillReport = { sets: [], identical: 0, differs: [] };
  const current = isRecord(existing) ? existing : {};

  for (const [name, value] of Object.entries(wanted)) {
    if (name === '_type' || name === '_key' || name === '_bundledSrc') continue;
    const here = path ? `${path}.${name}` : name;
    const held = current[name];

    if (held === undefined || held === null) {
      report.sets.push({ path: here, value });
      continue;
    }
    if (Array.isArray(value)) {
      // A list already in Sanity is the editor's, whole. Only an empty one is filled.
      if (Array.isArray(held) && held.length > 0) {
        if (JSON.stringify(strip(held)) === JSON.stringify(strip(value))) report.identical += 1;
        else report.differs.push(here);
      } else {
        report.sets.push({ path: here, value });
      }
      continue;
    }
    if (isRecord(value)) {
      if (isLeaf(value) && isRecord(held)) {
        if (equalLeaf(value, held)) report.identical += 1;
        else report.differs.push(here);
        continue;
      }
      const nested = planFill(value, held, here);
      report.sets.push(...nested.sets);
      report.identical += nested.identical;
      report.differs.push(...nested.differs);
    }
  }
  return report;
}

function strip(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(strip);
  if (!isRecord(value)) return value;
  const out: Rec = {};
  for (const [k, v] of Object.entries(value)) {
    if (k !== '_key' && k !== '_type') out[k] = strip(v);
  }
  return out;
}
