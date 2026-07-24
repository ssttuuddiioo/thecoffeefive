import Link from 'next/link';
import Image from 'next/image';
import { headers, cookies } from 'next/headers';
import {
  defaultLocale,
  isLocale,
  withLocale,
  LOCALE_COOKIE,
  type Locale,
} from '@/config/i18n';
import { getDictionary } from '@/config/dictionaries';

function resolveLocale(): Locale {
  const fromHeader = headers().get('x-locale');
  if (isLocale(fromHeader)) return fromHeader;
  const fromCookie = cookies().get(LOCALE_COOKIE)?.value;
  if (isLocale(fromCookie)) return fromCookie;
  return defaultLocale;
}

export default function NotFound() {
  const locale = resolveLocale();
  const dict = getDictionary(locale);

  return (
    <main className="min-h-screen bg-coffee-black flex flex-col items-center justify-center px-5 text-center">
      <Image
        src="/logo.svg"
        alt="Coffee Five"
        width={48}
        height={76}
        className="brightness-0 invert mb-8"
      />

      <h1 className="text-3xl md:text-4xl font-bold text-coffee-white mb-4 leading-tight">
        {dict.notFound.heading}
      </h1>

      <p className="text-base text-coffee-400 max-w-md mb-10 leading-relaxed">
        {dict.notFound.body}
      </p>

      <Link
        href={withLocale(locale, '/')}
        className="px-8 py-3 border border-coffee-white text-coffee-white text-[12px] tracking-[0.1em] uppercase rounded-sm hover:bg-coffee-white hover:text-coffee-black transition-colors min-h-[44px] flex items-center"
      >
        {dict.common.backHomeShort}
      </Link>
    </main>
  );
}
