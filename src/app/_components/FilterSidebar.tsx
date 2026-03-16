'use client';

import { useState } from 'react';

type FilterSection = {
  key: string;
  label: string;
  options: string[];
  selected: string[];
  onChange: (values: string[]) => void;
};

type SliderFilter = {
  label: string;
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  unit?: string;
};

type FilterSidebarProps = {
  keyword: string;
  onKeywordChange: (value: string) => void;
  sections: FilterSection[];
  sliders?: SliderFilter[];
  onClear: () => void;
};

function AccordionSection({ label, options, selected, onChange }: Omit<FilterSection, 'key'>) {
  const [open, setOpen] = useState(false);

  const toggle = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter(v => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-3"
      >
        <span className="text-sm font-bold text-coffee-white">{label}</span>
        <span className="text-coffee-400 text-lg leading-none">{open ? '−' : '+'}</span>
      </button>
      <div className="w-full h-px bg-coffee-700" />
      {open && (
        <div className="flex flex-col gap-1 py-3">
          {options.map(option => (
            <button
              key={option}
              type="button"
              onClick={() => toggle(option)}
              className="flex items-center gap-3 py-1 cursor-pointer group text-left"
            >
              <span
                className={`w-4 h-4 rounded-sm border flex items-center justify-center flex-shrink-0 transition-colors ${
                  selected.includes(option)
                    ? 'bg-coffee-white border-coffee-white'
                    : 'border-coffee-700 group-hover:border-coffee-400'
                }`}
              >
                {selected.includes(option) && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none" className="text-coffee-black">
                    <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
              <span className="text-[13px] text-coffee-400 group-hover:text-coffee-white transition-colors">
                {option}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function SliderSection({ label, min, max, value, onChange, unit = '' }: SliderFilter) {
  const [open, setOpen] = useState(false);
  const isActive = value[0] !== min || value[1] !== max;

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-3"
      >
        <span className="text-sm font-bold text-coffee-white">
          {label}
          {isActive && <span className="ml-2 text-[10px] text-coffee-400 font-normal">{value[0]}–{value[1]}{unit}</span>}
        </span>
        <span className="text-coffee-400 text-lg leading-none">{open ? '−' : '+'}</span>
      </button>
      <div className="w-full h-px bg-coffee-700" />
      {open && (
        <div className="py-4 px-1">
          <div className="flex justify-between text-[11px] text-coffee-400 mb-3">
            <span>{value[0]}{unit}</span>
            <span>{value[1]}{unit}</span>
          </div>
          <div className="relative h-1 bg-coffee-700 rounded-full">
            <div
              className="absolute h-1 bg-coffee-white rounded-full"
              style={{
                left: `${((value[0] - min) / (max - min)) * 100}%`,
                right: `${100 - ((value[1] - min) / (max - min)) * 100}%`,
              }}
            />
          </div>
          <div className="relative mt-1">
            <input
              type="range"
              min={min}
              max={max}
              value={value[0]}
              onChange={e => {
                const v = Number(e.target.value);
                if (v <= value[1]) onChange([v, value[1]]);
              }}
              className="absolute w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-coffee-white [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-coffee-900"
              style={{ top: '-8px' }}
            />
            <input
              type="range"
              min={min}
              max={max}
              value={value[1]}
              onChange={e => {
                const v = Number(e.target.value);
                if (v >= value[0]) onChange([value[0], v]);
              }}
              className="absolute w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-coffee-white [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-coffee-900"
              style={{ top: '-8px' }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export function FilterSidebar({ keyword, onKeywordChange, sections, sliders = [], onClear }: FilterSidebarProps) {
  const hasActiveFilters = keyword.length > 0 || sections.some(s => s.selected.length > 0) || sliders.some(s => s.value[0] !== s.min || s.value[1] !== s.max);

  return (
    <nav className="flex flex-col gap-1">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs tracking-[0.15em] uppercase text-coffee-400">Filtrar</h3>
        {hasActiveFilters && (
          <button
            onClick={onClear}
            className="text-[11px] text-coffee-400 hover:text-coffee-white uppercase tracking-wide transition-colors"
          >
            Limpiar
          </button>
        )}
      </div>

      {/* Keyword search */}
      <div className="mb-2">
        <input
          type="text"
          value={keyword}
          onChange={e => onKeywordChange(e.target.value)}
          placeholder="Buscar por nombre..."
          className="w-full bg-transparent border border-coffee-700 text-coffee-white text-[13px] px-3 py-2.5 rounded-sm placeholder:text-coffee-400/50 focus:outline-none focus:border-coffee-400 transition-colors"
        />
      </div>

      {/* Accordion sections */}
      {sections.map(section => (
        <AccordionSection
          key={section.key}
          label={section.label}
          options={section.options}
          selected={section.selected}
          onChange={section.onChange}
        />
      ))}

      {/* Slider sections */}
      {sliders.map(slider => (
        <SliderSection key={slider.label} {...slider} />
      ))}
    </nav>
  );
}
