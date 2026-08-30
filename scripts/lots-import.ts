/**
 * Import green lots from CSV into Sanity, matching on `ref`.
 *
 *   npm run lots:import -- lots.csv --dry-run   # show what would change
 *   npm run lots:import -- lots.csv             # apply
 *
 * Juan does this from the Studio ("Importar CSV"); this CLI exists for bulk work
 * and scripting. Both share the rules in src/sanity/lib/lot-csv.ts, so they
 * behave identically:
 *
 * - A row whose `ref` exists PATCHES that lot — only the columns in the CSV are
 *   touched, so photos and everything else are preserved.
 * - A row with a new `ref` CREATES a lot, deriving the slug from `name`.
 * - An existing lot's slug is never rewritten; that would break live URLs.
 * - Lots absent from the CSV are left alone. This never deletes.
 * - The whole file is validated before anything is written.
 */
import { readFileSync } from 'node:fs';
import { loadEnv, getWriteClient } from './lib/sanity-client';
import {
  parseLotCsvText,
  prepareRows,
  planImport,
  buildNewLot,
  EXISTING_LOTS_QUERY,
} from '../src/sanity/lib/lot-csv';

loadEnv();

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const file = args.find((a) => !a.startsWith('--'));

  if (!file) {
    console.error('Uso: npm run lots:import -- <archivo.csv> [--dry-run]');
    process.exit(1);
  }

  const { prepared, errors } = prepareRows(parseLotCsvText(readFileSync(file, 'utf8')));

  if (errors.length > 0) {
    console.error(`\n${errors.length} error${errors.length === 1 ? '' : 'es'} en ${file} — no se importó nada:\n`);
    for (const error of errors.slice(0, 25)) console.error(`  • ${error}`);
    if (errors.length > 25) console.error(`  … y ${errors.length - 25} más`);
    process.exit(1);
  }

  const client = getWriteClient();
  const existing = await client.fetch<Record<string, unknown>[]>(EXISTING_LOTS_QUERY, {
    refs: prepared.map((row) => row.ref),
  });
  const { creates, updates, unchanged } = planImport(prepared, existing);

  console.log(`\n${file} → ${prepared.length} fila${prepared.length === 1 ? '' : 's'}\n`);
  for (const row of creates) console.log(`  CREAR   ${row.ref}  ${row.name}`);
  for (const { row, changes } of updates) {
    console.log(`  ACTUALIZAR ${row.ref}  ${row.name}`);
    for (const c of changes) console.log(`            ${c.path}: ${c.from || '—'} → ${c.to}`);
  }
  if (unchanged > 0) console.log(`  ${unchanged} sin cambios`);

  if (creates.length === 0 && updates.length === 0) {
    console.log('\nNada que hacer.');
    return;
  }

  if (dryRun) {
    console.log(`\n${creates.length} para crear, ${updates.length} para actualizar.`);
    console.log('Simulación — no se escribió nada. Vuelve a ejecutar sin --dry-run para aplicar.');
    return;
  }

  const tx = client.transaction();
  for (const row of creates) tx.create(buildNewLot(row) as never);
  // Slug is deliberately omitted from patches — renaming must not change a URL.
  for (const { id, row } of updates) tx.patch(id, { set: row.fields });
  await tx.commit();

  console.log(`\nListo: ${creates.length} creado${creates.length === 1 ? '' : 's'}, ${updates.length} actualizado${updates.length === 1 ? '' : 's'}.`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
