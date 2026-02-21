
import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../constants';
import { Product } from '../types';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const { searchQuery, setSearchQuery } = useApp();
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setResults([]);
      return;
    }

    const filtered = PRODUCTS.filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setResults(filtered);
  }, [searchQuery]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-white animate-in fade-in duration-300">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 pt-10">
        <div className="flex justify-between items-center mb-20">
          <div className="flex items-center gap-4 flex-1 max-w-2xl">
            <Search size={24} strokeWidth={1.5} className="text-[#B4A694]" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search for furniture, decor, or categories..."
              className="w-full text-2xl md:text-4xl font-playfair outline-none placeholder:text-gray-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button 
            onClick={() => {
              setSearchQuery('');
              onClose();
            }}
            className="p-2 hover:bg-gray-50 rounded-full transition-colors"
          >
            <X size={32} strokeWidth={1} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 overflow-y-auto max-h-[70vh] pb-20">
          {results.length > 0 ? (
            results.map((product) => (
              <a 
                key={product.id} 
                href={`#/product/${product.id}`}
                onClick={() => {
                  onClose();
                  setSearchQuery('');
                }}
                className="group flex gap-6 items-center p-4 hover:bg-gray-50 transition-colors rounded-lg"
              >
                <div className="w-24 h-24 overflow-hidden rounded-md bg-gray-100">
                  <img 
                    src={product.images[0]} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] uppercase tracking-widest text-[#B4A694] mb-1">{product.category}</p>
                  <h3 className="font-playfair text-lg text-[#2D2D2D]">{product.name}</h3>
                  <div className="flex items-center gap-2 mt-2 text-[10px] uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    View Product <ArrowRight size={12} />
                  </div>
                </div>
              </a>
            ))
          ) : searchQuery.trim() !== '' ? (
            <div className="col-span-full py-20 text-center">
              <p className="font-playfair text-2xl text-gray-400 italic">No results found for "{searchQuery}"</p>
              <p className="text-[10px] uppercase tracking-widest mt-4 text-gray-500">Try searching for "Vase", "Dining", or "Linen"</p>
            </div>
          ) : (
            <div className="col-span-full">
              <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#B4A694] mb-8">Suggested Categories</h4>
              <div className="flex flex-wrap gap-4">
                {['The Dining Table', 'Lounge Luxe', 'Grand Entrances'].map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setSearchQuery(cat)}
                    className="px-6 py-3 border border-black/5 text-[10px] uppercase tracking-widest hover:bg-[#2D2D2D] hover:text-white transition-all"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
