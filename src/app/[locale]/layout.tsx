import { notFound } from 'next/navigation';
import { locales, isLocale, type Locale } from '@/config/i18n';
import { getDictionary } from '@/config/dictionaries';
import { LanguageProvider } from '@/app/_components/LanguageProvider';
import { Header } from '@/app/_components/Header';
import { Footer } from '@/app/_components/Footer';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Only `es` and `en` are valid locales — anything else 404s.
export const dynamicParams = false;

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale as Locale);

  return (
    <LanguageProvider locale={locale as Locale} dict={dict}>
      <Header />
      {children}
      <div className="flex h-3">
        <div className="flex-1" style={{ backgroundColor: '#ECCD3E' }} />
        <div className="flex-1" style={{ backgroundColor: '#0D7C47' }} />
        <div className="flex-1" style={{ backgroundColor: '#4592DB' }} />
        <div className="flex-1" style={{ backgroundColor: '#91171F' }} />
        <div className="flex-1" style={{ backgroundColor: '#ED4035' }} />
      </div>
      <Footer />
    </LanguageProvider>
  );
}
