import Link from 'next/link';
import Image from 'next/image';

type JournalCardProps = {
  slug: string;
  category: string;
  title: string;
  description: string;
  image?: string;
};

export function JournalCard({ slug, category, title, image }: JournalCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="group block rounded-md overflow-hidden hover:opacity-90 transition-opacity">
      <div className="relative" style={{ aspectRatio: '683/858' }}>
        {image && (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        )}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/40 via-black/15 to-transparent" />
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-6">
          <p className="text-[13px] tracking-[0.1em] uppercase text-black/50 mb-2">
            {category}
          </p>
          <h4 className="text-[30px] font-black leading-tight text-black group-hover:text-black/80 transition-colors">
            {title}
          </h4>
        </div>
      </div>
    </Link>
  );
}
