import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { siteConfig } from '@/config/site';
import { Header } from './_components/Header';
import { Footer } from './_components/Footer';
import '@/styles/globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin', 'latin-ext'],
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
    images: [
      {
        url: '/share.png',
        width: 1200,
        height: 630,
        alt: 'The Coffee Five — Desde la semilla hasta la taza',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: ['/share.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={plusJakarta.variable}>
      <head>
        {/* Adobe Fonts — Salted. Replace PROJECT_ID with your Typekit web project ID */}
        <link rel="stylesheet" href="https://use.typekit.net/vhe5lxj.css" />
      </head>
      <body>
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
      </body>
    </html>
  );
}
