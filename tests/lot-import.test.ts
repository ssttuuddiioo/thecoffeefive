/**
 * The importer must take whatever Juan's offer looks like next harvest. Only a missing
 * ref or name, or a repeated ref, may stop it; anything unfamiliar becomes a warning.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import Papa from 'papaparse';
import {
  COLUMNS,
  buildLotPatches,
  buildNewLot,
  getPath,
  parseLotCsvText,
  planImport,
  prepareRows,
  toCell,
} from '@/sanity/lib/lot-csv';

const fixture = readFileSync(join(__dirname, 'fixtures/lotes-variados.csv'), 'utf8');
const prepare = (csv: string) => prepareRows(parseLotCsvText(csv));

test('every row of an odd but valid file imports, with warnings instead of errors', () => {
  const { prepared, errors, warnings } = prepare(fixture);
  assert.deepEqual(errors, []);
  assert.equal(prepared.length, 6);
  assert.ok(warnings.length > 0);
});

test('headers match in any case, in Spanish, and unknown columns only warn', () => {
  const { prepared, warnings } = prepare(fixture);
  const first = prepared[0];
  assert.equal(first.ref, 'HS-101');
  assert.equal(first.name, 'Lote Lavado');
  assert.equal(first.fields.price, '$12/lb');
  assert.equal(first.fields.weight, '132 lbs');
  assert.ok(warnings.some((w) => w.includes('columna_extra')));
});

test('known processes are standardised, new ones kept as typed', () => {
  const byRef = Object.fromEntries(prepare(fixture).prepared.map((r) => [r.ref, r.fields]));
  assert.equal(byRef['HS-101'].proceso, 'Lavado');
  assert.equal(byRef['HS-102'].proceso, 'Honey');
  assert.equal(byRef['RG-201'].proceso, 'Anaeróbico');
  assert.equal(byRef['HS-0103'].proceso, 'Thermal Shock');
  assert.equal(byRef['GE-12'].proceso, 'Carbonic Maceration');
});

test('locations: known cities get a group and keep the city; new cities are kept as typed', () => {
  const byRef = Object.fromEntries(prepare(fixture).prepared.map((r) => [r.ref, r.fields]));
  assert.equal(byRef['HS-101'].ubicacion, 'colombia');
  assert.equal(byRef['HS-101'].bodega, 'Medellin');
  assert.equal(byRef['HS-102'].ubicacion, 'landed_us');
  assert.equal(byRef['HS-102'].bodega, 'Miami/Douglas');
  assert.equal(byRef['HS-0103'].ubicacion, null);
  assert.equal(byRef['HS-0103'].bodega, 'Houston');
  assert.equal(byRef['GE-12'].ubicacion, 'en_transito');
  assert.equal(byRef['RG-201'].ubicacion, 'landed_us');
});

test('unreadable yes/no and numbers are skipped with a warning, not an error', () => {
  const { prepared, warnings } = prepare(fixture);
  const byRef = Object.fromEntries(prepared.map((r) => [r.ref, r.fields]));
  assert.equal(byRef['RG-200'].disponible, undefined);
  assert.equal(byRef['GE-12'].order, undefined);
  assert.ok(warnings.some((w) => w.includes('RG-200') && w.includes('disponible')));
  assert.ok(warnings.some((w) => w.includes('GE-12') && w.includes('order')));
});

test('only a missing ref or name, or a repeated ref, stops the import', () => {
  const header = 'ref,name,proceso\n';
  assert.equal(prepare(`${header}HS-1,Uno,Lavado\n,Sin ref,Lavado\n`).errors.length, 1);
  assert.equal(prepare(`${header}HS-1,,Lavado\n`).errors.length, 1);
  assert.equal(prepare(`${header}HS-1,Uno,Lavado\nHS-1,Otro,Natural\n`).errors.length, 1);
  assert.equal(prepare('name,proceso\nUno,Lavado\n').errors.length, 1);
  assert.deepEqual(prepare(`${header}HS-1,Uno,\n`).errors, []);
});

test('a new city clears the old group instead of leaving the lot filed under the old country', () => {
  const [row] = prepare('ref,name,ubicacion\nHS-1,Uno,Cartagena\n').prepared;
  const patches = buildLotPatches(row.fields);
  assert.deepEqual(patches[patches.length - 1], { unset: ['ubicacion'] });
  assert.equal('ubicacion' in buildNewLot(row), false);
});

test('the preview says which lots will be hidden on the site', () => {
  const { prepared } = prepare(fixture);
  const plan = planImport(prepared, [{ _id: 'x', ref: 'RG-200', disponible: false }]);
  assert.deepEqual(plan.hidden, ['RG-200 · Lote Regional', 'RG-201 · Lote Oculto']);
  assert.equal(plan.creates.length, 5);
});

test('exporting and re-importing changes nothing', () => {
  const { prepared } = prepare(fixture);
  const stored = prepared.map((row) => ({ ...buildNewLot(row), _id: row.ref }));
  // Same as the Studio's "Descargar CSV actual".
  const rows = stored.map((doc) => Object.fromEntries(COLUMNS.map((c) => [c.header, toCell(getPath(doc, c.path))])));
  const csv = Papa.unparse(rows, { columns: COLUMNS.map((c) => c.header) });
  const again = prepare(csv);
  assert.deepEqual(again.errors, []);
  const plan = planImport(again.prepared, stored);
  assert.equal(plan.updates.length, 0, JSON.stringify(plan.updates.map((u) => u.changes)));
  assert.equal(plan.unchanged, stored.length);
});
