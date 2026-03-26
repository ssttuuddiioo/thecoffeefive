'use client';

import Link from 'next/link';
import { useStaggerReveal } from '@/lib/gsap';
import { SectionTag } from '../SectionTag';
import { JournalCard } from '../JournalCard';
import { mockArticles } from '@/lib/mock-data';

const blogImages = ['/blog1.png', '/blog3.png', '/blog5.png', '/blog2.png', '/blog1.png', '/blog3.png'];

export function JournalSection() {
  const gridRef = useStaggerReveal();

  return (
    <section className="relative bg-coffee-black">
      {/* Accent top bar */}
      <div className="h-3" style={{ backgroundColor: '#0D7C47' }} />

      <div className="container-site py-16 md:py-24">
        {/* Header row */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-end mb-12 md:mb-16">
          <div>
            <SectionTag number="07" label="Blog" />
            <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Blog
            </h3>
            <p className="text-sm md:text-base text-white/50 max-w-xl leading-relaxed">
              Notas de campo, guías prácticas y reflexiones sobre café de especialidad — desde la finca hasta la taza.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-block px-8 py-3 text-[11px] tracking-[0.15em] uppercase font-semibold rounded-sm transition-colors self-start lg:self-end hover:opacity-90"
            style={{ backgroundColor: '#0D7C47', color: '#fff' }}
          >
            Ver todo →
          </Link>
        </div>

        {/* Cards */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {mockArticles.map((article, i) => (
            <div key={article.title} data-reveal>
              <JournalCard {...article} image={blogImages[i % blogImages.length]} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
