import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ImagePlaceholder } from '@/app/_components/ImagePlaceholder';
import { getAllJournalSlugs, getJournalArticleBySlug, type JournalContentBlock } from '@/lib/mock-data';
import { withLocale, type Locale } from '@/config/i18n';

type Props = {
  params: { locale: string; slug: string };
};

const C = {
  es: {
    back: '← Volver al journal',
    readMinutes: 'min de lectura',
    role: 'Productor · Catador · Tostador',
    featuredImage: 'Imagen destacada',
  },
  en: {
    back: '← Back to journal',
    readMinutes: 'min read',
    role: 'Producer · Cupper · Roaster',
    featuredImage: 'Featured image',
  },
} as const;

export function generateStaticParams() {
  return getAllJournalSlugs().map((slug) => ({ slug }));
}

function renderBlock(block: JournalContentBlock, index: number) {
  switch (block.type) {
    case 'p':
      return (
        <p key={index}>
          {block.text}
        </p>
      );
    case 'h2':
      return (
        <h2 key={index} className="text-xl font-bold text-coffee-white pt-4">
          {block.text}
        </h2>
      );
    case 'ul':
      return (
        <ul key={index} className="list-disc list-inside space-y-2 text-coffee-400">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case 'table':
      return (
        <div key={index} className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
          <table className="w-full text-left text-xs md:text-sm border-collapse">
            <thead>
              <tr className="border-b border-coffee-700">
                {block.headers.map((header) => (
                  <th key={header} className="py-3 pr-4 align-top font-bold text-coffee-white">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-b border-coffee-800 align-top">
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="py-3 pr-4 text-coffee-400">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    default:
      return null;
  }
}

export default function BlogPostPage({ params }: Props) {
  const locale = params.locale as Locale;
  const c = C[locale];
  const article = getJournalArticleBySlug(params.slug, locale);

  if (!article) {
    notFound();
  }

  return (
    <main className="pt-20 md:pt-24">
      <article className="container-site section-padding">
        <div className="max-w-2xl mx-auto mb-10">
          <Link
            href={withLocale(locale, '/blog')}
            className="inline-block text-xs text-coffee-400 hover:text-coffee-white transition-colors mb-6"
          >
            {c.back}
          </Link>
          <p className="text-[10px] tracking-[0.1em] uppercase text-coffee-400 mb-4">
            {article.category}
          </p>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-coffee-white mb-4 leading-tight">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-coffee-400">
            <span>Juan Medina</span>
            <span className="hidden sm:inline">·</span>
            <span>{article.readMinutes} {c.readMinutes}</span>
          </div>
        </div>

        <div className="max-w-3xl mx-auto mb-12">
          <ImagePlaceholder aspectRatio="16/9" label={c.featuredImage} className="rounded-md" />
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="space-y-6 text-sm md:text-base text-coffee-400 leading-relaxed">
            {article.blocks.map((block, i) => renderBlock(block, i))}
          </div>

          <div className="mt-12 pt-8 border-t border-coffee-800 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-coffee-900 flex items-center justify-center p-2">
              <Image src="/logo.svg" alt="Coffee Five" width={24} height={38} className="brightness-0 invert" />
            </div>
            <div>
              <p className="text-sm font-medium text-coffee-white">Juan Medina</p>
              <p className="text-xs text-coffee-400">{c.role}</p>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
