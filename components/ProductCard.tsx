
import React from 'react';
import { ShoppingBag, Heart } from 'lucide-react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const { addToCart, addToWishlist, wishlist } = useApp();
  const isInWishlist = wishlist.some(i => i.id === product.id);

  return (
    <div className="group flex flex-col h-full bg-white p-4">
      {/* Image Wrapper */}
      <a href={`#/product/${product.id}`} className="block relative aspect-[4/5] overflow-hidden bg-[#F8F7F2]">
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="w-full h-full object-cover hover-scale" 
        />
        {/* Quick Add Button */}
        <button 
          onClick={(e) => { e.preventDefault(); addToCart(product); }}
          className="absolute bottom-4 left-4 right-4 bg-white/95 py-3 text-[10px] uppercase tracking-[0.2em] font-bold flex items-center justify-center gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-[#2D2D2D] hover:text-white"
        >
          <ShoppingBag size={14} /> Add to Bag
        </button>
        {/* Wishlist Icon */}
        <button 
          onClick={(e) => { e.preventDefault(); addToWishlist(product); }}
          className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-300 ${isInWishlist ? 'text-[#B4A694]' : 'text-gray-400 opacity-0 group-hover:opacity-100'}`}
        >
          <Heart size={18} fill={isInWishlist ? 'currentColor' : 'none'} />
        </button>
      </a>

      {/* Info Section */}
      <div className="mt-5 flex flex-col items-center text-center">
        <span className="text-[9px] uppercase tracking-[0.3em] text-[#B4A694] mb-1">{product.category}</span>
        <a href={`#/product/${product.id}`} className="font-playfair text-lg text-[#2D2D2D] group-hover:text-[#B4A694] transition-colors">{product.name}</a>
        <p className="mt-2 text-sm font-medium tracking-wide">R {product.price.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default ProductCard;
