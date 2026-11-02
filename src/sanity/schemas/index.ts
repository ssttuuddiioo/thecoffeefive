import type { SchemaTypeDefinition } from 'sanity';
import { localeString, localeText, localeBlockContent } from './objects/locale';
import { blockContent } from './objects/blockContent';
import { editorialImage } from './objects/editorialImage';
import { greenLot } from './documents/greenLot';
import { roastedCoffee } from './documents/roastedCoffee';
import { journalArticle } from './documents/journalArticle';
import { siteCopy } from './documents/siteCopy';
import { copyDocuments } from './documents/copy';

export const schemaTypes: SchemaTypeDefinition[] = [
  // Objects — registered before the documents that reference them.
  localeString,
  localeText,
  blockContent,
  localeBlockContent,
  editorialImage,
  // Documents
  greenLot,
  roastedCoffee,
  journalArticle,
  siteCopy,
  ...copyDocuments,
];
