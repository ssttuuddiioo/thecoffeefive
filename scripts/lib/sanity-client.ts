import { createClient } from '@sanity/client';

/**
 * Write-capable client for the CLI scripts only.
 *
 * Needs SANITY_API_WRITE_TOKEN (Editor role). Never import this from anything
 * under `src/app` — the token must not reach the browser bundle.
 */
export function getWriteClient() {
  // Read process.env at call time, not import time. `src/sanity/env.ts` computes
  // its constants when the module is first evaluated, which — because ES imports
  // are hoisted — happens before loadEnv() has had a chance to read .env.local.
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '';
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';
  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-10-01';
  const token = process.env.SANITY_API_WRITE_TOKEN;

  if (!/^[a-z0-9]{8,}$/i.test(projectId)) {
    throw new Error(
      'NEXT_PUBLIC_SANITY_PROJECT_ID is not set. Add it to .env.local — see docs/SANITY.md.',
    );
  }
  if (!token) {
    throw new Error(
      'SANITY_API_WRITE_TOKEN is not set. Create one at sanity.io/manage (Editor role) and add it to .env.local.',
    );
  }

  return createClient({ projectId, dataset, apiVersion, token, useCdn: false });
}

/** Loads .env.local so the scripts work without extra shell setup. */
export function loadEnv() {
  const fs = require('node:fs') as typeof import('node:fs');
  for (const file of ['.env.local', '.env']) {
    if (!fs.existsSync(file)) continue;
    for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
      const match = /^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/.exec(line);
      if (!match) continue;
      const [, key, rawValue] = match;
      if (process.env[key] !== undefined) continue;
      process.env[key] = rawValue.replace(/^["']|["']$/g, '');
    }
  }
}
