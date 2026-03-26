'use client';

import { useState } from 'react';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
  title?: string;
  subtitle?: string;
  variant?: 'dark' | 'light';
}

export function FaqAccordion({ items, title = 'Preguntas Frecuentes', subtitle, variant = 'dark' }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const isDark = variant === 'dark';

  return (
    <section className={isDark ? '' : 'bg-coffee-cream text-coffee-black'}>
      <div className="container-site section-padding">
        <p className={`text-[10px] tracking-[0.15em] uppercase mb-4 ${isDark ? 'text-coffee-400' : 'text-coffee-400'}`}>FAQ</p>
        <h2 className={`text-2xl md:text-3xl font-bold mb-2 ${isDark ? 'text-coffee-white' : 'text-coffee-black'}`}>
          {title}
        </h2>
        {subtitle && (
          <p className={`text-sm mb-10 max-w-xl ${isDark ? 'text-coffee-400' : 'text-coffee-400'}`}>{subtitle}</p>
        )}
        <div className={`divide-y ${isDark ? 'divide-coffee-800' : 'divide-coffee-200'}`}>
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className={`w-full flex items-center justify-between py-5 text-left transition-colors ${
                    isDark ? 'text-coffee-white hover:text-coffee-orange' : 'text-coffee-black hover:text-coffee-orange'
                  }`}
                >
                  <span className="text-sm md:text-base font-semibold pr-4">{item.question}</span>
                  <span
                    className={`text-xl shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className={`text-sm leading-relaxed pb-5 ${isDark ? 'text-coffee-400' : 'text-coffee-400'}`}>
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
