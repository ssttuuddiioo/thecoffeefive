import { JournalCard } from '@/app/_components/JournalCard';
import { mockArticles } from '@/lib/mock-data';

export default function BlogPage() {
  return (
    <main className="pt-20 md:pt-24">
      <div className="container-site section-padding">
        <p className="text-[10px] tracking-[0.15em] uppercase text-coffee-400 mb-4">Journal</p>
        <h1 className="text-3xl md:text-4xl font-bold text-coffee-white mb-4">From the journal</h1>
        <p className="text-sm text-coffee-400 mb-10 max-w-lg">
          Historias de origen, casos de estudio, y conocimiento técnico del mundo del café de especialidad.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...mockArticles, ...mockArticles].map((article, i) => (
            <JournalCard key={`${article.title}-${i}`} {...article} />
          ))}
        </div>
      </div>
    </main>
  );
}
