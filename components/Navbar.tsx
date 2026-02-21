
import React, { useState, useEffect } from 'react';
import { ShoppingBag, Heart, Menu, X, Search } from 'lucide-react';
import { useApp } from '../context/AppContext';
import SearchOverlay from './SearchOverlay';

const Navbar: React.FC = () => {
  const { cart, toggleCart, toggleWishlist, wishlist } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white border-b border-black/5 py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
          <div className="flex justify-between items-center">
            {/* Search (Desktop) */}
            <div 
              className="hidden md:flex items-center gap-2 group cursor-pointer"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search size={18} strokeWidth={1.5} className="group-hover:text-[#B4A694] transition-colors" />
              <span className="text-[10px] uppercase tracking-widest font-medium opacity-60 group-hover:opacity-100">Search</span>
            </div>

            {/* Logo */}
            <a href="#/" className="flex flex-col items-center">
              <span className="font-playfair text-2xl md:text-3xl tracking-wide text-[#2D2D2D]">Surprise by Style</span>
              <div className="h-[1px] w-12 bg-[#B4A694] mt-1" />
            </a>

            {/* Icons */}
            <div className="flex gap-5 items-center">
              <button 
                className="md:hidden p-1"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search size={20} strokeWidth={1.5} />
              </button>
              <button onClick={() => toggleWishlist(true)} className="relative group">
                <Heart size={20} strokeWidth={1.5} className="group-hover:text-[#B4A694] transition-colors" />
                {wishlist.length > 0 && <span className="absolute -top-1 -right-1 bg-[#B4A694] text-white text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center">{wishlist.length}</span>}
              </button>
              <button onClick={() => toggleCart(true)} className="relative group">
                <ShoppingBag size={20} strokeWidth={1.5} className="group-hover:text-[#B4A694] transition-colors" />
                {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-[#2D2D2D] text-white text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center">{cartCount}</span>}
              </button>
              <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Secondary Navigation (Desktop) */}
          <div className="hidden md:flex justify-center gap-10 mt-6 text-[10px] uppercase tracking-[0.2em] font-medium text-[#2D2D2D]/70">
            <a href="#/boutique" className="hover:text-[#B4A694] transition-colors">Living</a>
            <a href="#/boutique" className="hover:text-[#B4A694] transition-colors">Dining</a>
            <a href="#/boutique" className="hover:text-[#B4A694] transition-colors">Decor</a>
            <a href="#/boutique" className="hover:text-[#B4A694] transition-colors">New Arrivals</a>
            <a href="#/archive" className="hover:text-[#B4A694] transition-colors">The Archive</a>
          </div>
        </div>

        {/* Mobile Sidebar Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white h-screen fixed inset-0 z-[60] p-10 flex flex-col items-center justify-center gap-8 animate-in slide-in-from-right duration-300">
             <a href="#/" onClick={() => setIsMobileMenuOpen(false)} className="font-playfair text-3xl italic">Home</a>
             <a href="#/boutique" onClick={() => setIsMobileMenuOpen(false)} className="font-playfair text-3xl italic">Boutique</a>
             <a href="#/archive" onClick={() => setIsMobileMenuOpen(false)} className="font-playfair text-3xl italic">Archive</a>
             <button onClick={() => setIsMobileMenuOpen(false)} className="mt-12 text-[10px] uppercase tracking-[0.3em] font-bold border-b border-black">Close</button>
          </div>
        )}
      </nav>

      <SearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </>
  );
};

export default Navbar;
