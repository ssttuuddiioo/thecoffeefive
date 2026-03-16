'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ImagePlaceholder } from '@/app/_components/ImagePlaceholder';
import { CartDrawer } from '@/app/_components/CartDrawer';
import { mockRoastedCoffee } from '@/lib/mock-data';

const weights = ['250g', '340g', '1 lb'];

type CartItem = { id: string; name: string; price: string; weight: string; quantity: number };

export default function TiendaProductPage() {
  const product = mockRoastedCoffee[0];
  const [selectedWeight, setSelectedWeight] = useState(weights[0]);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = () => {
    const id = `${product.name}-${selectedWeight}`;
    setCartItems(prev => {
      const existing = prev.find(item => item.id === id);
      if (existing) {
        return prev.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { id, name: product.name, price: product.price, weight: selectedWeight, quantity: 1 }];
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
            <ImagePlaceholder aspectRatio="1/1" label="Product photo" className="rounded-md" />
            <div className="grid grid-cols-3 gap-3">
              <ImagePlaceholder aspectRatio="1/1" label="Detail" className="rounded-sm" />
              <ImagePlaceholder aspectRatio="1/1" label="Package" className="rounded-sm" />
              <ImagePlaceholder aspectRatio="1/1" label="Brew" className="rounded-sm" />
            </div>
          </div>

          {/* Product info */}
          <div>
            <p className="text-[10px] tracking-[0.15em] uppercase text-coffee-400 mb-3">Café Tostado</p>
            <h1 className="text-2xl md:text-3xl font-bold text-coffee-white mb-2">{product.name}</h1>
            <p className="text-base text-coffee-400 italic mb-4">{product.notes}</p>
            <p className="text-xl font-medium text-coffee-white mb-6">{product.price}</p>

            <div className="flex flex-wrap gap-1.5 mb-6">
              {product.tags.map(tag => (
                <span key={tag} className="tag-pill">{tag}</span>
              ))}
            </div>

            {/* Weight selector */}
            <div className="mb-6">
              <p className="text-[10px] tracking-[0.1em] uppercase text-coffee-400 mb-3">Peso</p>
              <div className="flex gap-2">
                {weights.map(w => (
                  <button
                    key={w}
                    onClick={() => setSelectedWeight(w)}
                    className={`tab-pill ${selectedWeight === w ? 'tab-pill-active' : ''}`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={addToCart}
              className="w-full py-3 bg-coffee-white text-coffee-black text-[12px] tracking-[0.1em] uppercase rounded-sm font-medium hover:bg-coffee-200 transition-colors min-h-[44px] mb-8"
            >
              Agregar al carrito
            </button>

            <div className="border-t border-coffee-800 pt-6">
              <h3 className="text-sm font-medium text-coffee-white mb-2">Sobre este café</h3>
              <p className="text-sm text-coffee-400 leading-relaxed">
                Tostado por Juan Medina en Medellín. Tostamos sobre pedido para garantizar máxima frescura. Perfil de tueste diseñado para resaltar las mejores cualidades de este lote.
              </p>
            </div>
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
