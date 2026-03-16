'use client';

import { motion } from 'framer-motion';
import { slideRightVariants, springSmooth } from '@/lib/framer';

type CartItem = {
  id: string;
  name: string;
  price: string;
  weight: string;
  quantity: number;
};

type CartDrawerProps = {
  items: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
};

export function CartDrawer({ items, onClose, onUpdateQuantity, onRemove }: CartDrawerProps) {
  const total = items.reduce((sum, item) => {
    const price = parseFloat(item.price.replace('$', ''));
    return sum + price * item.quantity;
  }, 0);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 z-40"
        onClick={onClose}
      />
      <motion.div
        variants={slideRightVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={springSmooth}
        className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-coffee-900 z-50 flex flex-col"
      >
        <div className="flex items-center justify-between p-6 border-b border-coffee-800">
          <h2 className="text-lg font-bold text-coffee-white">Tu carrito</h2>
          <button onClick={onClose} className="text-coffee-400 hover:text-coffee-white min-h-[44px] min-w-[44px] flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <p className="text-sm text-coffee-400 text-center mt-10">Tu carrito está vacío</p>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-16 h-16 bg-coffee-800 rounded-sm flex-none" />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-coffee-white">{item.name}</h4>
                    <p className="text-xs text-coffee-400">{item.weight}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                        className="w-7 h-7 border border-coffee-700 rounded-sm flex items-center justify-center text-coffee-400 hover:text-coffee-white hover:border-coffee-white text-xs min-h-[44px] min-w-[44px]"
                      >
                        −
                      </button>
                      <span className="text-sm text-coffee-white w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 border border-coffee-700 rounded-sm flex items-center justify-center text-coffee-400 hover:text-coffee-white hover:border-coffee-white text-xs min-h-[44px] min-w-[44px]"
                      >
                        +
                      </button>
                      <button
                        onClick={() => onRemove(item.id)}
                        className="ml-auto text-[10px] text-coffee-400 hover:text-coffee-white uppercase tracking-wide min-h-[44px] flex items-center"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-coffee-white font-medium">{item.price}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-coffee-800">
            <div className="flex justify-between mb-4">
              <span className="text-sm text-coffee-400">Subtotal</span>
              <span className="text-sm text-coffee-white font-medium">${total.toFixed(2)}</span>
            </div>
            <button className="w-full py-3 bg-coffee-white text-coffee-black text-[12px] tracking-[0.1em] uppercase rounded-sm font-medium hover:bg-coffee-200 transition-colors min-h-[44px]">
              Checkout
            </button>
            <p className="text-[10px] text-coffee-400 text-center mt-3">
              Serás redirigido a Shopify para completar tu compra.
            </p>
          </div>
        )}
      </motion.div>
    </>
  );
}
