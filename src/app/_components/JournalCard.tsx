import Link from 'next/link';
import { ImagePlaceholder } from './ImagePlaceholder';

type JournalCardProps = {
  slug: string;
  category: string;
  title: string;
  description: string;
};

export function JournalCard({ slug, category, title, description }: JournalCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="group block border border-coffee-700 rounded-md overflow-hidden bg-coffee-900 hover:border-coffee-500 transition-colors">
      <ImagePlaceholder aspectRatio="3/2" label="Article image" />
      <div className="p-5">
        <p className="text-[10px] tracking-[0.1em] uppercase text-coffee-400 mb-2">
          {category}
        </p>
        <h4 className="text-[15px] font-medium mb-1.5 leading-snug text-coffee-white group-hover:text-coffee-200 transition-colors">
          {title}
        </h4>
        <p className="text-xs text-coffee-400 leading-relaxed">
          {description}
        </p>
      </div>
    </Link>
  );
}
