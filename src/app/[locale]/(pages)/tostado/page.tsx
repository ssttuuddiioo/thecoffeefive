import type { Metadata } from 'next';
import { isLocale, defaultLocale, type Locale } from '@/config/i18n';
import { getDictionary } from '@/config/dictionaries';
import { SignupSection } from '@/app/_components/sections/SignupSection';

/**
 * Roasted coffee isn't for sale yet. The nav, footer and homepage all still
 * link here — rather than dead links or a hidden nav item, /tostado is a
 * coming-soon page that collects emails for launch.
 *
 * The product pages live in git history; restore them when the store opens.
 */
export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale: Locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const dict = getDictionary(locale);
  return {
    title: dict.nav.roasted,
    description: dict.signup.body,
  };
}

export default function TostadoPage({ params }: { params: { locale: string } }) {
  const locale: Locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const t = getDictionary(locale);

  return (
    <main className="min-h-screen bg-coffee-black flex flex-col justify-center pt-20 md:pt-24">
      <div className="text-center px-5 pt-10">
        <p className="text-[10px] tracking-[0.25em] uppercase text-coffee-400">
          {t.nav.roasted}
        </p>
      </div>
      <SignupSection />
    </main>
  );
}
