import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { headers, cookies } from 'next/headers';
import { Analytics } from '@vercel/analytics/next';
import { siteConfig } from '@/config/site';
import { defaultLocale, isLocale, LOCALE_COOKIE } from '@/config/i18n';
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

/** Resolve the language for <html lang> — middleware forwards it as a header. */
function resolveLang(): string {
  const fromHeader = headers().get('x-locale');
  if (isLocale(fromHeader)) return fromHeader;
  const fromCookie = cookies().get(LOCALE_COOKIE)?.value;
  if (isLocale(fromCookie)) return fromCookie;
  return defaultLocale;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={resolveLang()} className={plusJakarta.variable}>
      <head>
        {/* Adobe Fonts — Salted. Replace PROJECT_ID with your Typekit web project ID */}
        <link rel="stylesheet" href="https://use.typekit.net/vhe5lxj.css" />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
