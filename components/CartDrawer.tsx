
import React from 'react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onUpdateQuantity, onRemove }) => {
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col animate-slide-left">
        <div className="p-6 border-b flex items-center justify-between">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span className="material-symbols-outlined">shopping_bag</span>
            Your Cart
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <span className="material-symbols-outlined text-6xl text-gray-200 mb-4">shopping_cart_off</span>
              <p className="text-text-muted font-medium">Your cart is empty.</p>
              <button onClick={onClose} className="mt-4 text-primary font-bold">Start Shopping</button>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-4 border-b border-gray-50 pb-4">
                <img src={item.image} alt={item.name} className="size-20 rounded-lg object-cover bg-gray-50" />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-bold text-text-main">{item.name}</h3>
                    <button onClick={() => onRemove(item.id)} className="text-gray-400 hover:text-red-500">
                      <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                  </div>
                  <p className="text-xs text-text-muted mb-2">{item.unit}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center border rounded-lg overflow-hidden h-8">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="px-2 hover:bg-gray-50 text-gray-500"
                      >-</button>
                      <span className="px-3 text-sm font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="px-2 hover:bg-gray-50 text-gray-500"
                      >+</button>
                    </div>
                    <span className="font-bold">₹{item.price * item.quantity}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t bg-gray-50 space-y-4">
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
            <button className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-primary/20">
              Checkout Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
