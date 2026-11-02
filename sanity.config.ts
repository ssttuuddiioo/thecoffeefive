import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { UploadIcon } from '@sanity/icons';
import { CsvImportTool } from './src/sanity/tools/CsvImportTool';
import { schemaTypes } from './src/sanity/schemas';
import { COPY_DOC_IDS } from './src/sanity/lib/copy-docs';
import { structure } from './src/sanity/structure';
import { apiVersion, dataset, projectId, studioBasePath } from './src/sanity/env';

/** One fixed document each: never created, duplicated or removed from the Studio UI. */
const SINGLETONS = new Set<string>(['siteCopy', ...COPY_DOC_IDS]);

export default defineConfig({
  name: 'coffee-five',
  title: 'Coffee Five',
  basePath: studioBasePath,
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
    templates: (prev) => prev.filter(({ schemaType }) => !SINGLETONS.has(schemaType)),
  },
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  tools: (prev) => [
    // Bulk lot editing without leaving the Studio: download CSV, edit in a
    // spreadsheet, upload it back. Same rules as the CLI importer — they share
    // src/sanity/lib/lot-csv.ts.
    {
      name: 'importar-csv',
      title: 'Importar CSV',
      icon: UploadIcon,
      component: CsvImportTool,
    },
    ...prev,
  ],
  document: {
    actions: (prev, { schemaType }) =>
      SINGLETONS.has(schemaType)
        ? prev.filter(({ action }) => action !== 'duplicate' && action !== 'delete' && action !== 'unpublish')
        : prev,
  },
});
