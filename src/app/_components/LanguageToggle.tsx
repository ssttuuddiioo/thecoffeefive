'use client';

import { Fragment } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  locales,
  splitLocale,
  withLocale,
  LOCALE_COOKIE,
  LOCALE_COOKIE_MAX_AGE,
  type Locale,
} from '@/config/i18n';
import { useTranslation } from './LanguageProvider';

type Props = {
  className?: string;
  activeClassName?: string;
  inactiveClassName?: string;
  separatorClassName?: string;
};

/**
 * ES / EN switch. Swaps the locale prefix on the current path, persists the
 * choice in a cookie, and updates <html lang> — no full page reload.
 */
export function LanguageToggle({
  className = '',
  activeClassName = 'font-medium',
  inactiveClassName = 'opacity-60 hover:opacity-100 transition-opacity',
  separatorClassName = '',
}: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const { locale, t } = useTranslation();

  function switchTo(target: Locale) {
    if (target === locale) return;
    document.cookie = `${LOCALE_COOKIE}=${target}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE}; samesite=lax`;
    document.documentElement.lang = target;
    const { rest } = splitLocale(pathname);
    router.push(withLocale(target, rest));
  }

  return (
    <span className={className} aria-label={t.common.switchLanguage}>
      {locales.map((l, i) => (
        <Fragment key={l}>
          {i > 0 && <span className={separatorClassName}>/</span>}
          <button
            type="button"
            onClick={() => switchTo(l)}
            aria-current={l === locale}
            className={l === locale ? activeClassName : inactiveClassName}
          >
            {l.toUpperCase()}
          </button>
        </Fragment>
      ))}
    </span>
  );
}
