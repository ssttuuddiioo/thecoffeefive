/**
 * Export every green lot from Sanity to CSV.
 *
 *   npm run lots:export                 # writes lots-YYYY-MM-DD.csv
 *   npm run lots:export -- offer.csv    # writes offer.csv
 *   npm run lots:export -- --stdout     # prints to stdout
 *
 * Includes hidden lots (disponible=false) so nothing is silently dropped from a
 * round-trip. Images are not exported — they live in Sanity and are preserved
 * by the importer.
 */
import { writeFileSync } from 'node:fs';
import Papa from 'papaparse';
import { loadEnv, getWriteClient } from './lib/sanity-client';
import { COLUMNS, getPath, toCell, type ColumnSpec } from '../src/sanity/lib/lot-csv';
import { allGreenLotsQuery } from '../src/sanity/queries';

loadEnv();

async function main() {
  const args = process.argv.slice(2);
  const toStdout = args.includes('--stdout');
  const target = args.find((a) => !a.startsWith('--')) ?? `lots-${new Date().toISOString().slice(0, 10)}.csv`;

  const client = getWriteClient();
  const docs = await client.fetch<Record<string, unknown>[]>(allGreenLotsQuery);

  const rows = docs.map((doc) => {
    const row: Record<string, string> = {};
    for (const column of COLUMNS) row[column.header] = toCell(getPath(doc, column.path));
    return row;
  });

  const csv = Papa.unparse(rows, { columns: COLUMNS.map((c: ColumnSpec) => c.header) });

  if (toStdout) {
    process.stdout.write(csv + '\n');
    return;
  }

  writeFileSync(target, csv + '\n');
  console.log(`Exported ${rows.length} lot${rows.length === 1 ? '' : 's'} to ${target}`);
  if (rows.length === 0) {
    console.log('Dataset is empty — run `npm run sanity:seed` first to migrate the bundled lots.');
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
