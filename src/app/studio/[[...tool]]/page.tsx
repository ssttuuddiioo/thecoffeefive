'use client';

/**
 * Sanity Studio, mounted at /studio.
 *
 * This is a Client Component on purpose: `sanity.config` pulls in the Studio
 * runtime, which uses React context. Importing it from a Server Component makes
 * Next resolve React through the react-server condition, where `createContext`
 * does not exist, and the build fails while collecting page data.
 *
 * `/studio` is exempted from the locale middleware — see src/middleware.ts.
 */
import { NextStudio } from 'next-sanity/studio';
import config from '../../../../sanity.config';
import { isSanityConfigured } from '@/sanity/env';

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <main style={{ fontFamily: 'system-ui, sans-serif', padding: '4rem 2rem', maxWidth: '42rem', lineHeight: 1.6 }}>
        <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Sanity no está configurado</h1>
        <p>
          Falta <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> en <code>.env.local</code>.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Consulta <code>docs/SANITY.md</code> para los pasos de configuración.
        </p>
      </main>
    );
  }
  return <NextStudio config={config} />;
}
