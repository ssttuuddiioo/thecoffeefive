import type { Metadata } from 'next';
import { isLocale, defaultLocale, type Locale } from '@/config/i18n';
import { getSiteCopy } from '@/sanity/copy';
import { getRoastedCoffee, isCatalogOpen } from '@/sanity/fetch';
import { RoastedCard } from '@/app/_components/RoastedCard';
import { SignupSection } from '@/app/_components/sections/SignupSection';

/**
 * Próximamente until the Studio switch opens the catalog and a coffee is available.
 * Any doubt, including Sanity being unreachable, keeps it on Próximamente.
 */
async function getCatalog(locale: Locale) {
  const [open, coffees] = await Promise.all([isCatalogOpen(), getRoastedCoffee(locale)]);
  return open ? coffees : [];
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale: Locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const [dict, coffees] = await Promise.all([getSiteCopy(locale), getCatalog(locale)]);
  return {
    title: dict.nav.roasted,
    description: coffees.length > 0 ? dict.tostado.intro : dict.signup.body,
  };
}

export default async function TostadoPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const [{ tostado: c }, coffees] = await Promise.all([getSiteCopy(locale), getCatalog(locale)]);

  if (coffees.length === 0) {
    return (
      <main className="min-h-screen bg-coffee-black flex flex-col justify-center pt-20 md:pt-24">
        <SignupSection />
      </main>
    );
  }

  return (
    <main className="pt-20 md:pt-24">
      <div className="container-site section-padding">
        <p className="text-[10px] tracking-[0.15em] uppercase text-coffee-400 mb-4">{c.eyebrow}</p>
        <h1 className="text-3xl md:text-4xl font-bold text-coffee-white mb-4">{c.heading}</h1>
        <p className="text-sm text-coffee-400 mb-10 max-w-lg">{c.intro}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coffees.map((coffee) => (
            <RoastedCard key={coffee.slug} {...coffee} />
          ))}
        </div>
      </div>
    </main>
  );
}
