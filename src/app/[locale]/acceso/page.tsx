import { Suspense } from 'react';
import type { Metadata } from 'next';
import { isLocale, defaultLocale, type Locale } from '@/config/i18n';
import { getSiteCopy } from '@/sanity/copy';
import { AccesoContent } from './AccesoContent';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale: Locale = isLocale(params.locale) ? params.locale : defaultLocale;
  return {
    title: (await getSiteCopy(locale)).acceso.metaTitle,
    robots: { index: false, follow: false },
  };
}

export default function AccesoPage() {
  return (
    <Suspense>
      <AccesoContent />
    </Suspense>
  );
}
