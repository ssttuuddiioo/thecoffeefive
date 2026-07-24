'use client';

import Link from 'next/link';
import type { ComponentProps } from 'react';
import { withLocale } from '@/config/i18n';
import { useTranslation } from './LanguageProvider';

/**
 * Drop-in replacement for next/link that prefixes internal paths with the
 * active locale (e.g. '/cafe-verde' → '/en/cafe-verde'). External links,
 * anchors, and non-string hrefs are passed through untouched.
 */
export function LocaleLink({ href, ...props }: ComponentProps<typeof Link>) {
  const { locale } = useTranslation();
  const finalHref =
    typeof href === 'string' && href.startsWith('/') ? withLocale(locale, href) : href;
  return <Link href={finalHref} {...props} />;
}
