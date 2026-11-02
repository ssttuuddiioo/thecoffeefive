import { JournalCard } from '@/app/_components/JournalCard';
import { getJournalArticles } from '@/sanity/fetch';
import { getSiteCopy } from '@/sanity/copy';
import type { Locale } from '@/config/i18n';

const blogImages = ['/blog1.png', '/blog3.png', '/blog5.png', '/blog2.png', '/blog1.png', '/blog3.png'];

export default async function BlogPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const c = (await getSiteCopy(locale)).blog;
  const articles = await getJournalArticles(locale);

  return (
    <main className="pt-20 md:pt-24">
      <div className="container-site section-padding">
        <p className="text-[10px] tracking-[0.15em] uppercase text-coffee-400 mb-4">{c.eyebrow}</p>
        <h1 className="text-3xl md:text-4xl font-bold text-coffee-white mb-4">{c.heading}</h1>
        <p className="text-sm text-coffee-400 mb-10 max-w-lg">
          {c.intro}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, i) => (
            <JournalCard
              key={article.slug}
              {...article}
              image={article.cover ?? blogImages[i % blogImages.length]}
              isCover={Boolean(article.cover)}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
