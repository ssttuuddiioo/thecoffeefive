'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { mobileNavVariants, mobileNavItem, easeSmooth } from '@/lib/framer';
import { siteConfig } from '@/config/site';

const LIGHT_BG_ROUTES = ['/cafe-verde/'];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isLightBg = LIGHT_BG_ROUTES.some((r) => pathname.startsWith(r) && pathname !== '/cafe-verde');

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="max-w-content mx-auto px-5 md:px-8 lg:px-20 flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.svg"
              alt="Coffee Five"
              width={32}
              height={51}
              className="h-[51px] w-auto [filter:brightness(0)_saturate(100%)_invert(36%)_sepia(92%)_saturate(600%)_hue-rotate(110deg)_brightness(92%)]"
            />
            <span
              className="text-[13px] leading-tight"
              style={{ fontFamily: "'salted', cursive", color: '#0D7C47' }}
            >
              The<br />Coffee<br />Five
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-7">
            {siteConfig.nav.main.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={`text-[11px] tracking-[0.1em] uppercase transition-colors ${isLightBg ? 'text-coffee-black hover:text-gray-600' : 'text-coffee-white hover:text-coffee-200'}`}
              >
                {item.label}
              </Link>
            ))}
            <span className={`text-[11px] tracking-[0.1em] uppercase ml-2 pl-4 border-l ${isLightBg ? 'text-gray-400 border-gray-300' : 'text-coffee-400 border-coffee-700'}`}>
              <span className={`font-medium ${isLightBg ? 'text-coffee-black' : 'text-coffee-white'}`}>ES</span> / EN
            </span>
            <Link href="/tostado" className={`ml-2 ${isLightBg ? 'text-coffee-black' : 'text-coffee-white'}`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
            </Link>
          </nav>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden p-2 min-h-[44px] min-w-[44px] flex items-center justify-center ${isLightBg ? 'text-coffee-black' : 'text-coffee-white'}`}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="4" y1="8" x2="20" y2="8" />
                <line x1="4" y1="16" x2="20" y2="16" />
              </svg>
            )}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            variants={mobileNavVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={easeSmooth}
            className="fixed inset-0 z-40 bg-coffee-black flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-8">
              {siteConfig.nav.main.map((item) => (
                <motion.div key={item.key} variants={mobileNavItem}>
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-coffee-white text-2xl tracking-[0.15em] uppercase"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div variants={mobileNavItem}>
                <span className="text-coffee-400 text-sm tracking-[0.1em] uppercase mt-4">
                  <span className="text-coffee-white font-medium">ES</span> / EN
                </span>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
