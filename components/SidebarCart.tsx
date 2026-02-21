
import React from 'react';
import { X, ChevronRight, ShoppingBag } from 'lucide-react';
import { useApp } from '../context/AppContext';

const SidebarCart: React.FC = () => {
  const { cart, isCartOpen, toggleCart, removeFromCart } = useApp();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity"
        onClick={() => toggleCart(false)}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-[#F8F7F2] h-full shadow-2xl flex flex-col p-8 animate-in slide-in-from-right duration-500 ease-out border-l border-black/5">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="font-playfair text-3xl">Your Bag</h2>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#B4A694] mt-1">Ready for the home</p>
          </div>
          <button onClick={() => toggleCart(false)} className="hover:rotate-90 transition-transform duration-300 p-2">
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-8 pr-2 custom-scrollbar">
          {cart.length === 0 ? (
            <div className="text-center py-24 flex flex-col items-center">
              <ShoppingBag size={48} strokeWidth={0.5} className="text-[#B4A694] mb-6 opacity-40" />
              <p className="font-playfair italic text-lg opacity-60">Your bag is empty.</p>
              <button 
                onClick={() => toggleCart(false)}
                className="mt-8 text-[10px] uppercase tracking-widest border-b border-[#2D2D2D] pb-1 hover:text-[#B4A694] hover:border-[#B4A694] transition-all font-bold"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-6 group animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="w-24 h-32 bg-white overflow-hidden flex-shrink-0">
                  <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1 border-b border-black/5">
                  <div>
                    <h3 className="font-playfair text-lg leading-tight text-[#2D2D2D]">{item.name}</h3>
                    <p className="text-[9px] uppercase tracking-wider text-[#B4A694] mt-1">{item.category}</p>
                  </div>
                  <div className="flex justify-between items-end mb-2">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] text-gray-400">QTY: {item.quantity}</span>
                      <span className="text-sm font-medium">R {(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-[9px] uppercase tracking-widest text-red-800/40 hover:text-red-800 transition-colors font-bold"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="mt-auto pt-8">
            <div className="flex justify-between items-end mb-8">
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400">Total</span>
              <span className="text-2xl font-playfair">R {total.toLocaleString()}</span>
            </div>
            <button 
              className="w-full bg-[#2D2D2D] text-white py-6 flex items-center justify-center gap-3 group relative overflow-hidden transition-colors"
              onClick={() => alert("Proceeding to Secure Checkout...")}
            >
              <span className="relative z-10 text-[11px] uppercase tracking-[0.4em] font-bold">Checkout Now</span>
              <ChevronRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-[#B4A694] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </button>
            <p className="text-[8px] uppercase tracking-[0.2em] text-center mt-6 text-gray-400">Shipping calculated at the next step</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SidebarCart;
