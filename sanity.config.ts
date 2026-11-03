import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { presentationTool } from 'sanity/presentation';
import { UploadIcon } from '@sanity/icons';
import { CsvImportTool } from './src/sanity/tools/CsvImportTool';
import { schemaTypes } from './src/sanity/schemas';
import { COPY_DOC_IDS } from './src/sanity/lib/copy-docs';
import { presentationResolve } from './src/sanity/presentation';
import { structure } from './src/sanity/structure';
import { apiVersion, dataset, projectId, studioBasePath } from './src/sanity/env';

/** One fixed document each: never created, duplicated or removed from the Studio UI. */
const SINGLETONS = new Set<string>(COPY_DOC_IDS);

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
    presentationTool({
      title: 'Vista previa',
      previewUrl: { initial: '/es', previewMode: { enable: '/api/draft-mode/enable' } },
      resolve: presentationResolve,
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  // The Studio opens on the first tool, so the order is: Vista previa, the
  // document list, CSV import, then the rest.
  tools: (prev) => {
    const named = (name: string) => prev.filter((tool) => tool.name === name);
    return [
      ...named('presentation'),
      ...named('structure'),
      // Bulk lot editing without leaving the Studio: download CSV, edit in a
      // spreadsheet, upload it back. Same rules as the CLI importer — they share
      // src/sanity/lib/lot-csv.ts.
      {
        name: 'importar-csv',
        title: 'Importar CSV',
        icon: UploadIcon,
        component: CsvImportTool,
      },
      ...prev.filter((tool) => tool.name !== 'presentation' && tool.name !== 'structure'),
    ];
  },
  document: {
    actions: (prev, { schemaType }) =>
      SINGLETONS.has(schemaType)
        ? prev.filter(({ action }) => action !== 'duplicate' && action !== 'delete' && action !== 'unpublish')
        : prev,
  },
});
