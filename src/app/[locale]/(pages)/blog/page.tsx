import { JournalCard } from '@/app/_components/JournalCard';
import { getJournalArticles } from '@/lib/mock-data';
import type { Locale } from '@/config/i18n';

const blogImages = ['/blog1.png', '/blog3.png', '/blog5.png', '/blog2.png', '/blog1.png', '/blog3.png'];

const C = {
  es: {
    eyebrow: 'Journal',
    heading: 'Desde la finca',
    intro:
      'Historias de origen, casos de estudio, y conocimiento técnico del mundo del café de especialidad.',
  },
  en: {
    eyebrow: 'Journal',
    heading: 'From the journal',
    intro:
      'Origin stories, case studies, and technical knowledge from the world of specialty coffee.',
  },
} as const;

export default function BlogPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const c = C[locale];
  const articles = getJournalArticles(locale);

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
            <JournalCard key={article.slug} {...article} image={blogImages[i % blogImages.length]} />
          ))}
        </div>
      </div>
    </main>
  );
}
