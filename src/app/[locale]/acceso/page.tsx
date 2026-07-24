import { Suspense } from 'react';
import type { Metadata } from 'next';
import { isLocale, defaultLocale, type Locale } from '@/config/i18n';
import { getDictionary } from '@/config/dictionaries';
import { AccesoContent } from './AccesoContent';

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale: Locale = isLocale(params.locale) ? params.locale : defaultLocale;
  return {
    title: getDictionary(locale).acceso.metaTitle,
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
