import Papa from 'papaparse';
import { PROCESO_VALUES, UBICACION_VALUES } from '../schemas/documents/greenLot';
import { slugifyLot } from '@/lib/slug';

/**
 * Single source of truth for the lot CSV format. Both the importer and the
 * exporter derive from this list, so a round-trip (export → edit → import)
 * never loses or renames a column.
 */
export type ColumnKind = 'string' | 'number' | 'boolean';

export interface ColumnSpec {
  /** CSV header. */
  header: string;
  /** Dot path into the Sanity document. */
  path: string;
  kind?: ColumnKind;
  required?: boolean;
  enumValues?: readonly string[];
  help?: string;
}

const UBICACION_KEYS = UBICACION_VALUES.map((u) => u.value);

export const COLUMNS: ColumnSpec[] = [
  { header: 'ref', path: 'ref', required: true, help: 'Clave única, formato HS-001' },
  { header: 'name', path: 'name', required: true },
  { header: 'proceso', path: 'proceso', required: true, enumValues: PROCESO_VALUES },
  { header: 'price', path: 'price', required: true },
  { header: 'weight', path: 'weight', required: true },
  { header: 'ubicacion', path: 'ubicacion', required: true, enumValues: UBICACION_KEYS },
  { header: 'disponible', path: 'disponible', kind: 'boolean' },
  { header: 'order', path: 'order', kind: 'number' },
  { header: 'variedad', path: 'variedad' },
  { header: 'finca', path: 'finca' },
  { header: 'municipio', path: 'municipio' },
  { header: 'region', path: 'region' },
  { header: 'altura', path: 'altura' },
  { header: 'puntaje', path: 'puntaje' },
  { header: 'humedad', path: 'humedad' },
  { header: 'actividad_agua', path: 'actividadAgua' },
  { header: 'densidad', path: 'densidad' },
  { header: 'criba', path: 'criba' },
  { header: 'trilla', path: 'trilla' },
  { header: 'recomendaciones_es', path: 'recomendaciones.es' },
  { header: 'recomendaciones_en', path: 'recomendaciones.en' },
  { header: 'nota_finca_es', path: 'notaFinca.es' },
  { header: 'nota_finca_en', path: 'notaFinca.en' },
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
  error?: string;
}

/** Parse a CSV cell into a document value, validating enums and types. */
export function fromCell(raw: string, column: ColumnSpec): ParsedCell {
  const trimmed = (raw ?? '').trim();

  if (trimmed === '') {
    if (column.required) return { value: undefined, error: `"${column.header}" es obligatorio` };
    return { value: undefined };
  }

  if (column.kind === 'boolean') {
    const truthy = ['true', '1', 'si', 'sí', 'yes', 'y'];
    const falsy = ['false', '0', 'no', 'n'];
    if (truthy.includes(trimmed.toLowerCase())) return { value: true };
    if (falsy.includes(trimmed.toLowerCase())) return { value: false };
    return { value: undefined, error: `"${column.header}" debe ser true o false (recibido: ${trimmed})` };
  }

  if (column.kind === 'number') {
    const n = Number(trimmed);
    if (Number.isNaN(n)) return { value: undefined, error: `"${column.header}" debe ser un número (recibido: ${trimmed})` };
    return { value: n };
  }

  if (column.enumValues && !column.enumValues.includes(trimmed)) {
    return {
      value: undefined,
      error: `"${column.header}" debe ser uno de: ${column.enumValues.join(', ')} (recibido: ${trimmed})`,
    };
  }

  return { value: trimmed };
}

export const REF_PATTERN = /^[A-Z]{2}-\d{3}$/;

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
  from: string;
  to: string;
}

export interface ImportPlan {
  creates: PreparedRow[];
  updates: { row: PreparedRow; id: string; changes: FieldChange[] }[];
  unchanged: number;
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

/** Validate every row up front — one bad row aborts the whole import. */
export function prepareRows(rows: Record<string, string>[]): {
  prepared: PreparedRow[];
  errors: string[];
} {
  const errors: string[] = [];
  const prepared: PreparedRow[] = [];
  const seen = new Map<string, number>();

  rows.forEach((row, index) => {
    const line = index + 2; // +1 header, +1 for 1-based lines
    const fields: Record<string, unknown> = {};
    let rowHasError = false;

    for (const column of COLUMNS) {
      if (!(column.header in row)) {
        if (column.required) {
          errors.push(`Falta la columna obligatoria "${column.header}"`);
          rowHasError = true;
        }
        continue;
      }
      const { value, error } = fromCell(row[column.header] ?? '', column);
      if (error) {
        errors.push(`Fila ${line}: ${error}`);
        rowHasError = true;
        continue;
      }
      if (value !== undefined) setPath(fields, column.path, value);
    }

    const ref = String(getPath(fields, 'ref') ?? '').trim();
    const name = String(getPath(fields, 'name') ?? '').trim();

    if (ref && !REF_PATTERN.test(ref)) {
      errors.push(`Fila ${line}: "ref" debe tener el formato HS-001 (recibido: ${ref})`);
      rowHasError = true;
    }
    if (ref && seen.has(ref)) {
      errors.push(`Fila ${line}: "ref" duplicada ${ref} (ya aparece en la fila ${seen.get(ref)})`);
      rowHasError = true;
    }
    if (ref) seen.set(ref, line);

    if (!rowHasError && ref) prepared.push({ ref, name, fields, line });
  });

  return { prepared, errors };
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
      changes.push({ path: column.header, from: toCell(current), to: toCell(next) });
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
  let unchanged = 0;

  for (const row of prepared) {
    const existing = byRef.get(row.ref);
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

  return { creates, updates, unchanged };
}

/** The document to create for a new CSV row. */
export function buildNewLot(row: PreparedRow): { _type: string } & Record<string, unknown> {
  return {
    _type: 'greenLot',
    ...row.fields,
    slug: { _type: 'slug', current: slugifyLot(row.name) },
    disponible: getPath(row.fields, 'disponible') ?? true,
  };
}

/** GROQ for the documents an import needs to compare against. */
export const EXISTING_LOTS_QUERY = '*[_type == "greenLot" && ref in $refs]';
