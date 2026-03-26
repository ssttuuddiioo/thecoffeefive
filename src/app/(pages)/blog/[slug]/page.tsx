import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ImagePlaceholder } from '@/app/_components/ImagePlaceholder';
import { getAllJournalSlugs, getJournalArticleBySlug, type JournalContentBlock } from '@/lib/mock-data';

type Props = {
  params: { slug: string };
};

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
    default:
      return null;
  }
}

export default function BlogPostPage({ params }: Props) {
  const article = getJournalArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="pt-20 md:pt-24">
      <article className="container-site section-padding">
        <div className="max-w-2xl mx-auto mb-10">
          <p className="text-[10px] tracking-[0.1em] uppercase text-coffee-400 mb-4">
            {article.category}
          </p>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-coffee-white mb-4 leading-tight">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-coffee-400">
            <span>Juan Medina</span>
            <span className="hidden sm:inline">·</span>
            <span>Borrador — contenido por publicar</span>
            <span className="hidden sm:inline">·</span>
            <span>{article.readMinutes} min lectura</span>
          </div>
        </div>

        <div className="max-w-3xl mx-auto mb-12">
          <ImagePlaceholder aspectRatio="16/9" label="Featured image" className="rounded-md" />
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
              <p className="text-xs text-coffee-400">Productor · Catador · Tostador</p>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
