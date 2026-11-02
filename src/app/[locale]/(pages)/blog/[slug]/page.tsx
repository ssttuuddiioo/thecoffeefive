import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ImagePlaceholder } from '@/app/_components/ImagePlaceholder';
import { PortableBody } from '@/app/_components/PortableBody';
import { getJournalArticleBySlug, getJournalSlugs } from '@/sanity/fetch';
import { getSiteCopy } from '@/sanity/copy';
import { withLocale, type Locale } from '@/config/i18n';

type Props = {
  params: { locale: string; slug: string };
};

export async function generateStaticParams() {
  const slugs = await getJournalSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function BlogPostPage({ params }: Props) {
  const locale = params.locale as Locale;
  const c = (await getSiteCopy(locale)).blog;
  const article = await getJournalArticleBySlug(params.slug, locale);

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
            <span>{c.author}</span>
            <span className="hidden sm:inline">·</span>
            {article.readMinutes && <span>{article.readMinutes} {c.readMinutes}</span>}
            {article.publishedAt && (
              <>
                <span className="hidden sm:inline">·</span>
                <time dateTime={article.publishedAt}>
                  {new Intl.DateTimeFormat(locale, { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(article.publishedAt))}
                </time>
              </>
            )}
          </div>
        </div>

        <div className="max-w-3xl mx-auto mb-12">
          {article.cover ? (
            <div className="relative aspect-video rounded-md overflow-hidden">
              <Image src={article.cover} alt={article.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" priority />
            </div>
          ) : (
            <ImagePlaceholder aspectRatio="16/9" label={c.featuredImage} className="rounded-md" />
          )}
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="space-y-6 text-sm md:text-base text-coffee-400 leading-relaxed">
            <PortableBody value={article.body as never} />
          </div>

          <div className="mt-12 pt-8 border-t border-coffee-800 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-coffee-900 flex items-center justify-center p-2">
              <Image src="/logo.svg" alt="Coffee Five" width={24} height={38} className="brightness-0 invert" />
            </div>
            <div>
              <p className="text-sm font-medium text-coffee-white">{c.author}</p>
              <p className="text-xs text-coffee-400">{c.role}</p>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
