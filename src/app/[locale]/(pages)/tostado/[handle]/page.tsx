'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence } from 'framer-motion';
import { CartDrawer } from '@/app/_components/CartDrawer';
import { useTranslation } from '@/app/_components/LanguageProvider';
import { mockRoastedCoffee } from '@/lib/mock-data';

const weightOptions = [
  { label: '340 g', available: true },
  { label: '1 lb', available: true },
  { label: '1 kg', available: true },
  { label: '2.5 kg', available: true },
];

const COPY = {
  es: {
    eyebrow: 'Café Tostado',
    soon: 'pronto',
    presentacion: 'Presentación',
    addToCart: 'Agregar al carrito',
    aboutTitle: 'Sobre este café',
    aboutBody: 'Tostado por Juan Medina en Medellín. Tostamos sobre pedido para garantizar máxima frescura. Perfil de tueste diseñado para resaltar las mejores cualidades de este lote.',
    prep: 'Preparación',
    ratio: 'Ratio',
    temperatura: 'Temperatura',
    metodos: 'Métodos',
    baristaTip: 'Tip de barista',
  },
  en: {
    eyebrow: 'Roasted Coffee',
    soon: 'soon',
    presentacion: 'Size',
    addToCart: 'Add to cart',
    aboutTitle: 'About this coffee',
    aboutBody: 'Roasted by Juan Medina in Medellín. We roast to order to guarantee maximum freshness. Roast profile designed to bring out the best qualities of this lot.',
    prep: 'Brewing',
    ratio: 'Ratio',
    temperatura: 'Temperature',
    metodos: 'Methods',
    baristaTip: 'Barista tip',
  },
} as const;

type CartItem = { id: string; name: string; price: string; weight: string; quantity: number };

export default function TiendaProductPage() {
  const { locale } = useTranslation();
  const c = COPY[locale];
  const product = mockRoastedCoffee[0];
  const [selectedWeight, setSelectedWeight] = useState(weightOptions[0].label);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = () => {
    const id = `${product.variedad}-${selectedWeight}`;
    setCartItems(prev => {
      const existing = prev.find(item => item.id === id);
      if (existing) {
        return prev.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { id, name: product.variedad, price: product.price, weight: selectedWeight, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems(prev => prev.filter(item => item.id !== id));
    } else {
      setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
    }
  };

  return (
    <main className="pt-20 md:pt-24">
      <div className="container-site section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Images */}
          <div className="space-y-3">
            <div className="relative aspect-square rounded-md overflow-hidden">
              <Image src="/bag-front.jpg" alt={product.variedad} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="relative aspect-square rounded-sm overflow-hidden">
                <Image src="/bag-back.jpg" alt={`${product.variedad} — back`} fill className="object-cover" sizes="(max-width: 1024px) 33vw, 16vw" />
              </div>
              <div className="relative aspect-square rounded-sm overflow-hidden">
                <Image src="/bag-front.jpg" alt={`${product.variedad} — detail`} fill className="object-cover" sizes="(max-width: 1024px) 33vw, 16vw" />
              </div>
              <div className="relative aspect-square rounded-sm overflow-hidden">
                <Image src="/bag-back.jpg" alt={`${product.variedad} — package`} fill className="object-cover" sizes="(max-width: 1024px) 33vw, 16vw" />
              </div>
            </div>
          </div>

          {/* Product info */}
          <div>
            <p className="text-[10px] tracking-[0.15em] uppercase text-coffee-400 mb-3">{c.eyebrow}</p>
            <h1 className="text-2xl md:text-3xl font-bold text-coffee-white mb-2">{product.variedad}</h1>
            <p className="text-base text-coffee-400 italic mb-1">{product.fermentacion}</p>
            <p className="text-base text-coffee-400 italic mb-4">{product.perfil}</p>
            <p className="text-xl font-medium text-coffee-white mb-6">{product.price}</p>

            <div className="flex flex-wrap gap-1.5 mb-6">
              <span className="tag-pill">{product.origin}</span>
              <span className="tag-pill">{product.proceso}</span>
              <span className="tag-pill">{product.tueste}</span>
            </div>

            {/* Weight selector */}
            <div className="mb-6">
              <p className="text-[10px] tracking-[0.1em] uppercase text-coffee-400 mb-3">{c.presentacion}</p>
              <div className="flex flex-wrap gap-2">
                {weightOptions.map(w => (
                  <button
                    key={w.label}
                    onClick={() => w.available && setSelectedWeight(w.label)}
                    disabled={!w.available}
                    className={`tab-pill ${selectedWeight === w.label ? 'tab-pill-active' : ''} ${!w.available ? 'opacity-40 cursor-not-allowed' : ''}`}
                  >
                    {w.label}
                    {!w.available && <span className="ml-1 text-[9px] no-underline">· {c.soon}</span>}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={addToCart}
              className="w-full py-3 bg-coffee-white text-coffee-black text-[12px] tracking-[0.1em] uppercase rounded-sm font-medium hover:bg-coffee-200 transition-colors min-h-[44px] mb-8"
            >
              {c.addToCart}
            </button>

            <div className="border-t border-coffee-800 pt-6">
              <h3 className="text-sm font-medium text-coffee-white mb-2">{c.aboutTitle}</h3>
              <p className="text-sm text-coffee-400 leading-relaxed">
                {c.aboutBody}
              </p>
            </div>

            {/* Brew / Preparación */}
            {product.brew && (
              <div className="border-t border-coffee-800 pt-6 mt-6">
                <h3 className="text-sm font-medium text-coffee-white mb-4">{c.prep}</h3>

                <div className="grid grid-cols-3 gap-4 mb-5">
                  <div>
                    <p className="text-[10px] tracking-[0.1em] uppercase text-coffee-400 mb-1">{c.ratio}</p>
                    <p className="text-sm text-coffee-white font-medium">{product.brew.ratio}</p>
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.1em] uppercase text-coffee-400 mb-1">{c.temperatura}</p>
                    <p className="text-sm text-coffee-white font-medium">{product.brew.temperatura}</p>
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.1em] uppercase text-coffee-400 mb-1">{c.metodos}</p>
                    <p className="text-sm text-coffee-white font-medium">{product.brew.metodos.join(' · ')}</p>
                  </div>
                </div>

                <div className="bg-coffee-800/40 rounded-md p-4">
                  <p className="text-[10px] tracking-[0.1em] uppercase text-coffee-400 mb-2">{c.baristaTip}</p>
                  <p className="text-sm text-coffee-300 leading-relaxed italic">
                    {product.brew.tip}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {cartOpen && (
          <CartDrawer
            items={cartItems}
            onClose={() => setCartOpen(false)}
            onUpdateQuantity={updateQuantity}
            onRemove={(id) => setCartItems(prev => prev.filter(item => item.id !== id))}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
