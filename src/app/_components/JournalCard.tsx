'use client';

import Image from 'next/image';
import { LocaleLink } from './LocaleLink';
import { documentEdit } from '@/sanity/lib/edit-attr';

type JournalCardProps = {
  sanityId?: string;
  slug: string;
  category: string;
  title: string;
  description: string;
  image?: string;
  /** The image is an uploaded cover, which can be dark: use light text. */
  isCover?: boolean;
};

export function JournalCard({ sanityId, slug, category, title, image, isCover }: JournalCardProps) {
  const edit = documentEdit(sanityId, 'journalArticle');
  return (
    <LocaleLink href={`/blog/${slug}`} className="group block rounded-md overflow-hidden hover:opacity-90 transition-opacity">
      <div data-sanity={edit('coverImage')} className="relative" style={{ aspectRatio: '683/858' }}>
        {image && (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        )}
        <div className={`absolute inset-0 z-10 bg-gradient-to-t ${isCover ? 'from-black/80 via-black/40' : 'from-black/40 via-black/15'} to-transparent`} />
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-6">
          <p data-sanity={edit('category')} className={`text-[13px] tracking-[0.1em] uppercase mb-2 ${isCover ? 'text-white/70' : 'text-black/50'}`}>
            {category}
          </p>
          <h4 data-sanity={edit('title')} className={`text-[30px] font-black leading-tight transition-colors ${isCover ? 'text-white group-hover:text-white/80' : 'text-black group-hover:text-black/80'}`}>
            {title}
          </h4>
        </div>
      </div>
    </LocaleLink>
  );
}
