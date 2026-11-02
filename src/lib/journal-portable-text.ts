import { randomUUID } from 'node:crypto';
import type { JournalContentBlock } from './mock-data';

const key = () => randomUUID().slice(0, 8);

/** Sanity requires a _key on every item in an array. */
function keyed<T extends object>(items: T[]): (T & { _key: string })[] {
  return items.map((item) => ({ ...item, _key: key() }));
}

/** Convert the typed journal blocks into Portable Text. */
export function toPortableText(blocks: JournalContentBlock[]): Record<string, unknown>[] {
  const out: Record<string, unknown>[] = [];

  for (const block of blocks) {
    if (block.type === 'p' || block.type === 'h2') {
      out.push({
        _type: 'block',
        _key: key(),
        style: block.type === 'h2' ? 'h2' : 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: key(), text: block.text, marks: [] }],
      });
      continue;
    }
    if (block.type === 'ul') {
      for (const item of block.items) {
        out.push({
          _type: 'block',
          _key: key(),
          style: 'normal',
          listItem: 'bullet',
          level: 1,
          markDefs: [],
          children: [{ _type: 'span', _key: key(), text: item, marks: [] }],
        });
      }
      continue;
    }
    if (block.type === 'table') {
      out.push({
        _type: 'table',
        _key: key(),
        headers: block.headers,
        rows: keyed(block.rows.map((cells) => ({ _type: 'row', cells }))),
      });
    }
  }

  return out;
}
