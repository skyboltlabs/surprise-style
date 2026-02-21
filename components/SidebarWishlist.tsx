
import React from 'react';
import { X, ArrowRight, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';

const SidebarWishlist: React.FC = () => {
  const { wishlist, isWishlistOpen, toggleWishlist, removeFromWishlist } = useApp();

  if (!isWishlistOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-start">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/10 backdrop-blur-sm transition-opacity"
        onClick={() => toggleWishlist(false)}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-[#F8F7F2] h-full shadow-2xl flex flex-col p-8 animate-in slide-in-from-left duration-500 ease-out border-r border-black/5">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="font-playfair text-3xl">Moodboard</h2>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#B4A694] mt-1">Curated Inspiration</p>
          </div>
          <button onClick={() => toggleWishlist(false)} className="hover:rotate-90 transition-transform duration-300 p-2">
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 grid grid-cols-2 gap-4 auto-rows-min custom-scrollbar">
          {wishlist.length === 0 ? (
            <div className="col-span-2 text-center py-24 flex flex-col items-center">
              <Heart size={48} strokeWidth={0.5} className="text-[#B4A694] mb-6 opacity-40" />
              <p className="font-playfair italic text-lg opacity-60">Nothing saved yet.</p>
              <button 
                onClick={() => toggleWishlist(false)}
                className="mt-8 text-[10px] uppercase tracking-widest border-b border-[#2D2D2D] pb-1 hover:text-[#B4A694] transition-all font-bold"
              >
                Browse Artifacts
              </button>
            </div>
          ) : (
            wishlist.map((item) => (
              <div key={item.id} className="group relative aspect-[4/5] bg-white overflow-hidden border border-black/5">
                <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-[#2D2D2D]/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center">
                    <h3 className="text-white font-playfair text-sm mb-3">{item.name}</h3>
                    <div className="flex flex-col gap-3">
                        <a href={`#/product/${item.id}`} onClick={() => toggleWishlist(false)} className="text-[8px] uppercase tracking-widest bg-white text-[#2D2D2D] px-3 py-1.5 font-bold">View Details</a>
                        <button 
                            onClick={() => removeFromWishlist(item.id)}
                            className="text-[8px] uppercase tracking-widest text-white/70 hover:text-white transition-colors"
                        >
                            Remove
                        </button>
                    </div>
                </div>
              </div>
            ))
          )}
        </div>

        {wishlist.length > 0 && (
          <div className="mt-8 pt-8 border-t border-black/5">
            <button 
                className="w-full flex items-center justify-between group bg-white border border-black/5 p-4 hover:border-[#B4A694] transition-colors"
                onClick={() => alert("Moodboard shared successfully.")}
            >
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Share My Curation</span>
                <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform text-[#B4A694]" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SidebarWishlist;
