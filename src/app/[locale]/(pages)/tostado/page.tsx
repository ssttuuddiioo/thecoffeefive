import type { Metadata } from 'next';
import { isLocale, defaultLocale, type Locale } from '@/config/i18n';
import { getSiteCopy } from '@/sanity/copy';
import { SignupSection } from '@/app/_components/sections/SignupSection';

/**
 * Roasted coffee isn't for sale yet. The nav, footer and homepage all still
 * link here — rather than dead links or a hidden nav item, /tostado is a
 * coming-soon page that collects emails for launch.
 *
 * The product pages live in git history; restore them when the store opens.
 */
export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale: Locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const dict = await getSiteCopy(locale);
  return {
    title: dict.nav.roasted,
    description: dict.signup.body,
  };
}

export default function TostadoPage() {
  return (
    <main className="min-h-screen bg-coffee-black flex flex-col justify-center pt-20 md:pt-24">
      <SignupSection />
    </main>
  );
}
