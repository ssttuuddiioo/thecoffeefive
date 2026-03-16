import { ImagePlaceholder } from './ImagePlaceholder';

type JournalCardProps = {
  category: string;
  title: string;
  description: string;
};

export function JournalCard({ category, title, description }: JournalCardProps) {
  return (
    <div className="border border-coffee-700 rounded-md overflow-hidden bg-coffee-900">
      <ImagePlaceholder aspectRatio="3/2" label="Article image" />
      <div className="p-5">
        <p className="text-[10px] tracking-[0.1em] uppercase text-coffee-400 mb-2">
          {category}
        </p>
        <h4 className="text-[15px] font-medium mb-1.5 leading-snug text-coffee-white">
          {title}
        </h4>
        <p className="text-xs text-coffee-400 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
