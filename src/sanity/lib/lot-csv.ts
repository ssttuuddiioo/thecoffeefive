import Papa from 'papaparse';
import { canonicalProceso, isKnownProceso, normalizeText, resolveUbicacion } from '@/lib/lot-values';
import { slugifyLot } from '@/lib/slug';

/**
 * Single source of truth for the lot CSV format. Both the importer and the
 * exporter derive from this list, so a round-trip (export → edit → import)
 * never loses or renames a column.
 *
 * The importer fails open: anything Juan types is kept, and an unfamiliar value
 * becomes a warning in the preview. Only three things stop an import, because
 * the import cannot work without them: a row with no ref, a row with no name,
 * and the same ref twice.
 */
export type ColumnKind = 'string' | 'number' | 'boolean';

export interface ColumnSpec {
  /** CSV header. */
  header: string;
  /** Dot path into the Sanity document. */
  path: string;
  /** Name shown in the import preview. */
  label: string;
  /** Paragraph text: the preview shows it apart from the short facts. */
  long?: boolean;
  kind?: ColumnKind;
  /** Without it the row cannot be imported at all. */
  required?: boolean;
  /** Other headers people use for this column, normalised. */
  headerAliases?: string[];
  help?: string;
}

export const COLUMNS: ColumnSpec[] = [
  { header: 'ref', path: 'ref', label: 'Referencia', required: true, headerAliases: ['referencia', 'lote'], help: 'Clave única del lote, ej. HS-001' },
  { header: 'name', path: 'name', label: 'Nombre', required: true, headerAliases: ['nombre'] },
  { header: 'proceso', path: 'proceso', label: 'Proceso', headerAliases: ['process'] },
  { header: 'price', path: 'price', label: 'Precio', headerAliases: ['precio'] },
  { header: 'weight', path: 'weight', label: 'Cantidad', headerAliases: ['cantidad', 'peso', 'quantity'] },
  { header: 'ubicacion', path: 'ubicacion', label: 'Ubicación', headerAliases: ['location'] },
  { header: 'bodega', path: 'bodega', label: 'Bodega', headerAliases: ['warehouse'], help: 'Ciudad que ve el comprador, ej. Miami/Douglas' },
  { header: 'disponible', path: 'disponible', label: 'Visible', kind: 'boolean', headerAliases: ['visible', 'available'] },
  { header: 'order', path: 'order', label: 'Orden', kind: 'number', headerAliases: ['orden'] },
  { header: 'variedad', path: 'variedad', label: 'Variedad' },
  { header: 'finca', path: 'finca', label: 'Finca' },
  { header: 'municipio', path: 'municipio', label: 'Municipio' },
  { header: 'region', path: 'region', label: 'Región' },
  { header: 'altura', path: 'altura', label: 'Altura' },
  { header: 'puntaje', path: 'puntaje', label: 'SCA', headerAliases: ['sca', 'norma', 'score'] },
  { header: 'humedad', path: 'humedad', label: 'Humedad' },
  { header: 'actividad_agua', path: 'actividadAgua', label: 'Actividad de agua' },
  { header: 'densidad', path: 'densidad', label: 'Densidad' },
  { header: 'criba', path: 'criba', label: 'Criba' },
  { header: 'trilla', path: 'trilla', label: 'Trilla' },
  { header: 'recomendaciones_es', path: 'recomendaciones.es', label: 'Recomendaciones (ES)', long: true },
  { header: 'recomendaciones_en', path: 'recomendaciones.en', label: 'Recomendaciones (EN)', long: true },
  { header: 'nota_finca_es', path: 'notaFinca.es', label: 'Nota de finca (ES)', long: true },
  { header: 'nota_finca_en', path: 'notaFinca.en', label: 'Nota de finca (EN)', long: true },
  { header: 'proceso_descripcion_es', path: 'procesoDescripcion.es', label: 'Descripción del proceso (ES)', long: true },
  { header: 'proceso_descripcion_en', path: 'procesoDescripcion.en', label: 'Descripción del proceso (EN)', long: true },
  { header: 'notas_cata_es', path: 'notasCata.es', label: 'Notas de cata (ES)', long: true },
  { header: 'notas_cata_en', path: 'notasCata.en', label: 'Notas de cata (EN)', long: true },
  { header: 'perfil_descripcion_es', path: 'perfilDescripcion.es', label: 'Descripción del perfil (ES)', long: true },
  { header: 'perfil_descripcion_en', path: 'perfilDescripcion.en', label: 'Descripción del perfil (EN)', long: true },
];

export function getPath(obj: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object') return (acc as Record<string, unknown>)[key];
    return undefined;
  }, obj);
}

export function setPath(obj: Record<string, unknown>, path: string, value: unknown): void {
  const keys = path.split('.');
  let cursor = obj;
  for (const key of keys.slice(0, -1)) {
    if (typeof cursor[key] !== 'object' || cursor[key] === null) cursor[key] = {};
    cursor = cursor[key] as Record<string, unknown>;
  }
  cursor[keys[keys.length - 1]] = value;
}

/** Render a document value as a CSV cell. */
export function toCell(value: unknown): string {
  if (value === undefined || value === null) return '';
  if (typeof value === 'boolean') return value ? 'true' : 'false';
  return String(value);
}

export interface ParsedCell {
  value: unknown;
  /** The row cannot be imported. */
  error?: string;
  /** Imported anyway; shown in the preview so nobody is surprised. */
  warning?: string;
}

const TRUTHY = ['true', '1', 'si', 'sí', 'yes', 'y', 'x'];
const FALSY = ['false', '0', 'no', 'n'];

/** Parse a CSV cell into a document value. Unreadable values are skipped with a warning. */
export function fromCell(raw: string, column: ColumnSpec): ParsedCell {
  const trimmed = (raw ?? '').trim();

  if (trimmed === '') {
    if (column.required) return { value: undefined, error: `"${column.header}" está vacío` };
    return { value: undefined };
  }

  if (column.kind === 'boolean') {
    if (TRUTHY.includes(trimmed.toLowerCase())) return { value: true };
    if (FALSY.includes(trimmed.toLowerCase())) return { value: false };
    return {
      value: undefined,
      warning: `"${column.header}" no se entiende (${trimmed}); se deja como estaba. Usa true o false.`,
    };
  }

  if (column.kind === 'number') {
    const n = Number(trimmed.replace(',', '.'));
    if (Number.isNaN(n)) {
      return { value: undefined, warning: `"${column.header}" no es un número (${trimmed}); se deja como estaba.` };
    }
    return { value: n };
  }

  return { value: trimmed };
}

/* ────────────────────────────────────────────────────────────────────────
 * Parsing and planning
 *
 * Shared by the CLI (`npm run lots:import`) and the Studio's "Importar CSV"
 * tool, so both apply exactly the same rules. Changing the semantics here
 * changes them in both places — which is the point.
 * ──────────────────────────────────────────────────────────────────────── */

export interface PreparedRow {
  ref: string;
  name: string;
  fields: Record<string, unknown>;
  line: number;
}

export interface FieldChange {
  path: string;
  label: string;
  long: boolean;
  from: string;
  to: string;
}

export interface ImportPlan {
  creates: PreparedRow[];
  updates: { row: PreparedRow; id: string; changes: FieldChange[] }[];
  unchanged: number;
  /** Lots in the file that will be hidden on the site after the import ("REF · name"). */
  hidden: string[];
}

/**
 * Normalise what spreadsheets produce, then parse.
 *  - Excel writes a UTF-8 BOM, which would corrupt the first header name.
 *  - A bare trailing newline after a quoted final field makes Papa report a
 *    spurious "trailing quote malformed" error even though the rows are fine.
 */
export function parseLotCsvText(text: string): Record<string, string>[] {
  const cleaned = text.replace(/^﻿/, '').replace(/[\r\n]+$/, '');
  const result = Papa.parse<Record<string, string>>(cleaned, {
    header: true,
    skipEmptyLines: 'greedy',
    transformHeader: (h) => h.trim(),
  });
  if (result.errors.length > 0) {
    const [first] = result.errors;
    throw new Error(`No se pudo leer el CSV (fila ${(first.row ?? 0) + 2}): ${first.message}`);
  }
  return result.data;
}

/** Map each column to the header the file actually uses (any case, accents, or a known alias). */
function matchHeaders(headers: string[]): { byColumn: Map<ColumnSpec, string>; unknown: string[] } {
  const byColumn = new Map<ColumnSpec, string>();
  const used = new Set<string>();
  for (const column of COLUMNS) {
    const names = [column.header, ...(column.headerAliases ?? [])].map(normalizeText);
    const found = headers.find((h) => !used.has(h) && names.includes(normalizeText(h)));
    if (found !== undefined) {
      byColumn.set(column, found);
      used.add(found);
    }
  }
  return { byColumn, unknown: headers.filter((h) => h !== '' && !used.has(h)) };
}

/**
 * Read every row up front. Errors (no ref, no name, a repeated ref) stop the whole
 * import; warnings are imported anyway and listed in the preview.
 */
export function prepareRows(rows: Record<string, string>[]): {
  prepared: PreparedRow[];
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];
  const prepared: PreparedRow[] = [];
  const seen = new Map<string, number>();

  const headers = rows.length > 0 ? Object.keys(rows[0]) : [];
  const { byColumn, unknown } = matchHeaders(headers);

  for (const column of COLUMNS) {
    if (column.required && !byColumn.has(column)) errors.push(`Falta la columna "${column.header}"`);
  }
  for (const header of unknown) warnings.push(`La columna "${header}" no se reconoce y se ignora.`);
  if (errors.length > 0) return { prepared, errors, warnings };

  rows.forEach((row, index) => {
    const line = index + 2; // +1 header, +1 for 1-based lines
    const fields: Record<string, unknown> = {};
    const rowWarnings: string[] = [];
    let rowHasError = false;

    for (const [column, header] of Array.from(byColumn)) {
      const { value, error, warning } = fromCell(row[header] ?? '', column);
      if (error) {
        errors.push(`Fila ${line}: ${error}`);
        rowHasError = true;
        continue;
      }
      if (warning) rowWarnings.push(warning);
      if (value !== undefined) setPath(fields, column.path, value);
    }

    if (typeof fields.proceso === 'string') {
      const typed = fields.proceso;
      fields.proceso = canonicalProceso(typed);
      if (!isKnownProceso(typed)) {
        rowWarnings.push(`proceso "${typed}" es nuevo: se muestra tal cual, con color gris.`);
      }
    }

    if (typeof fields.ubicacion === 'string') {
      const typed = fields.ubicacion;
      const place = resolveUbicacion(typed);
      // null clears an old status, so a new city does not stay filed under the old country.
      fields.ubicacion = place.status ?? null;
      if (place.bodega && fields.bodega === undefined) fields.bodega = place.bodega;
      if (!place.known) {
        rowWarnings.push(
          `ubicación "${typed}" es nueva: se muestra tal cual y sale como opción propia en el filtro.`,
        );
      }
    }

    const ref = String(getPath(fields, 'ref') ?? '').trim();
    const name = String(getPath(fields, 'name') ?? '').trim();

    if (ref && seen.has(ref)) {
      errors.push(`Fila ${line}: la referencia ${ref} se repite (ya está en la fila ${seen.get(ref)})`);
      rowHasError = true;
    }
    if (ref) seen.set(ref, line);

    for (const w of rowWarnings) warnings.push(`Fila ${line}${ref ? ` (${ref})` : ''}: ${w}`);
    if (!rowHasError && ref) prepared.push({ ref, name, fields, line });
  });

  return { prepared, errors, warnings };
}

/** Fields that differ between a CSV row and the stored document. */
export function diffFields(
  existing: Record<string, unknown>,
  fields: Record<string, unknown>,
): FieldChange[] {
  const changes: FieldChange[] = [];
  for (const column of COLUMNS) {
    const next = getPath(fields, column.path);
    if (next === undefined) continue;
    const current = getPath(existing, column.path);
    if (toCell(current) !== toCell(next)) {
      changes.push({
        path: column.header,
        label: column.label,
        long: column.long ?? false,
        from: toCell(current),
        to: toCell(next),
      });
    }
  }
  return changes;
}

/** Work out what the import would do, without doing it. */
export function planImport(
  prepared: PreparedRow[],
  existingDocs: Record<string, unknown>[],
): ImportPlan {
  const byRef = new Map(existingDocs.map((doc) => [String(doc.ref), doc]));
  const creates: PreparedRow[] = [];
  const updates: ImportPlan['updates'] = [];
  const hidden: string[] = [];
  let unchanged = 0;

  for (const row of prepared) {
    const existing = byRef.get(row.ref);
    const disponible = getPath(row.fields, 'disponible') ?? existing?.disponible;
    if (disponible === false) hidden.push(`${row.ref} · ${row.name}`);
    if (!existing) {
      creates.push(row);
      continue;
    }
    const changes = diffFields(existing, row.fields);
    if (changes.length === 0) {
      unchanged += 1;
      continue;
    }
    updates.push({ row, id: String(existing._id), changes });
  }

  return { creates, updates, unchanged, hidden };
}

/**
 * Patches for updating a lot from a CSV row, to apply in order. Bilingual fields are
 * written by dotted path, so a CSV holding only `nota_finca_es` keeps the stored
 * English: `set: { notaFinca: { es } }` would replace the whole object. Parents are
 * created in an earlier patch because Sanity ignores a deep set under a missing parent.
 */
export function buildLotPatches(fields: Record<string, unknown>): Record<string, unknown>[] {
  const set: Record<string, unknown> = {};
  const setIfMissing: Record<string, unknown> = {};
  const unset: string[] = [];
  for (const [key, value] of Object.entries(fields)) {
    if (value === null) {
      unset.push(key);
    } else if (typeof value === 'object') {
      setIfMissing[key] = {};
      for (const [child, childValue] of Object.entries(value)) set[`${key}.${child}`] = childValue;
    } else {
      set[key] = value;
    }
  }
  return [
    ...(Object.keys(setIfMissing).length > 0 ? [{ setIfMissing }] : []),
    { set },
    ...(unset.length > 0 ? [{ unset }] : []),
  ];
}

/** The document to create for a new CSV row. */
export function buildNewLot(row: PreparedRow): { _type: string } & Record<string, unknown> {
  const fields = Object.fromEntries(Object.entries(row.fields).filter(([, value]) => value !== null));
  return {
    _type: 'greenLot',
    ...fields,
    slug: { _type: 'slug', current: slugifyLot(row.name) },
    disponible: getPath(row.fields, 'disponible') ?? true,
  };
}

/** GROQ for the documents an import needs to compare against. */
export const EXISTING_LOTS_QUERY = '*[_type == "greenLot" && ref in $refs]';
