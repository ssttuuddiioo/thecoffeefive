'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Shown only when someone has preview mode on outside the Studio, for example after
 * opening a preview link in a new tab, so they never mistake drafts for the live site.
 */
export function PreviewBanner() {
  const pathname = usePathname();
  const [outsideStudio, setOutsideStudio] = useState(false);

  useEffect(() => {
    setOutsideStudio(window.self === window.top);
  }, []);

  if (!outsideStudio) return null;

  return (
    <a
      href={`/api/draft-mode/disable?redirect=${encodeURIComponent(pathname)}`}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[60] px-4 py-2 rounded-full bg-coffee-orange text-coffee-black text-[11px] tracking-[0.1em] uppercase font-semibold shadow-lg"
    >
      Vista previa · Salir
    </a>
  );
}
