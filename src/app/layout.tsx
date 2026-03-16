import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { siteConfig } from '@/config/site';
import { Header } from './_components/Header';
import { Footer } from './_components/Footer';
import '@/styles/globals.css';

const googleSansFlex = localFont({
  src: '../../public/fonts/GoogleSansFlex.woff2',
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: 'es_CO',
    alternateLocale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={googleSansFlex.variable}>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
