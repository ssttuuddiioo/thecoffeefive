import Image from 'next/image';
import { PortableText, type PortableTextComponents } from '@portabletext/react';
import type { Image as SanityImage } from 'sanity';
import { urlForImage } from '@/sanity/lib/image';

type TableValue = { headers?: string[]; rows?: { cells?: string[] }[] };

/** Asset refs carry the size: image-<hash>-1920x1080-jpg. */
function imageSize(value: SanityImage): { width: number; height: number } {
  const match = /-(\d+)x(\d+)-/.exec(value.asset?._ref ?? '');
  return match ? { width: Number(match[1]), height: Number(match[2]) } : { width: 1200, height: 800 };
}

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h2: ({ children }) => <h2 className="text-xl font-bold text-coffee-white pt-4">{children}</h2>,
    h3: ({ children }) => <h3 className="text-lg font-bold text-coffee-white pt-2">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-coffee-700 pl-4 italic">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc list-inside space-y-2 text-coffee-400">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal list-inside space-y-2 text-coffee-400">{children}</ol>,
  },
  marks: {
    link: ({ children, value }) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer" className="underline text-coffee-white">
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }: { value: SanityImage }) => {
      const src = urlForImage(value);
      if (!src) return null;
      return <Image src={src} alt="" {...imageSize(value)} className="w-full h-auto rounded-md" sizes="(max-width: 768px) 100vw, 672px" />;
    },
    table: ({ value }: { value: TableValue }) => (
      <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
        <table className="w-full text-left text-xs md:text-sm border-collapse">
          <thead>
            <tr className="border-b border-coffee-700">
              {(value.headers ?? []).map((header, i) => (
                <th key={i} className="py-3 pr-4 align-top font-bold text-coffee-white">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(value.rows ?? []).map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b border-coffee-800 align-top">
                {(row.cells ?? []).map((cell, cellIndex) => (
                  <td key={cellIndex} className="py-3 pr-4 text-coffee-400">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
  },
};

export function PortableBody({ value }: { value: Parameters<typeof PortableText>[0]['value'] }) {
  return <PortableText value={value} components={components} />;
}
