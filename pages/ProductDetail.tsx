
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Minus, Plus, Share2, ArrowLeft, Heart, ShoppingBag, ShieldCheck, Truck } from 'lucide-react';
import { PRODUCTS } from '../constants';
import { useApp } from '../context/AppContext';
import { Product } from '../types';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart, addToWishlist, wishlist } = useApp();
  const [product, setProduct] = useState<Product | null>(null);
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const isInWishlist = product ? wishlist.some(i => i.id === product.id) : false;

  useEffect(() => {
    const p = PRODUCTS.find(item => item.id === id);
    if (p) {
        setProduct(p);
    }
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) return <div className="h-screen flex items-center justify-center font-playfair italic text-2xl text-[#B4A694]">Gathering artifacts...</div>;

  return (
    <div className="pt-32 pb-40 bg-[#F8F7F2]">
      <div className="px-6 md:px-12 max-w-screen-2xl mx-auto">
        <a href="#/boutique" className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] font-bold mb-16 opacity-60 hover:opacity-100 hover:text-[#B4A694] transition-all">
          <ArrowLeft size={14} /> Back to Collection
        </a>

        <div className="grid lg:grid-cols-2 gap-20 xl:gap-32">
          {/* Gallery - Large & Immersive */}
          <div className="space-y-6">
              <div className="aspect-[4/5] overflow-hidden bg-white relative group border border-black/5">
                  <img 
                    src={product.images[activeImage]} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" 
                  />
                  <div className="absolute top-6 right-6 flex flex-col gap-4">
                      <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center hover:bg-[#2D2D2D] hover:text-white transition-all shadow-sm"><Share2 size={16} /></button>
                      <button 
                        onClick={() => addToWishlist(product)}
                        className={`w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center transition-all shadow-sm ${isInWishlist ? 'text-[#B4A694]' : 'hover:text-[#B4A694]'}`}
                      >
                        <Heart size={16} fill={isInWishlist ? 'currentColor' : 'none'} />
                      </button>
                  </div>
              </div>
              <div className="flex gap-4">
                  {product.images.map((img, idx) => (
                      <button 
                          key={idx} 
                          onClick={() => setActiveImage(idx)}
                          className={`w-24 h-32 border-2 transition-all overflow-hidden bg-white ${activeImage === idx ? 'border-[#B4A694]' : 'border-transparent opacity-60 hover:opacity-100'}`}
                      >
                          <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                  ))}
              </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col pt-4">
              <div className="mb-10">
                <span className="text-[10px] uppercase tracking-[0.4em] text-[#B4A694] font-bold mb-4 block">{product.category}</span>
                <h1 className="font-playfair text-5xl md:text-6xl text-[#2D2D2D] mb-6 leading-tight">{product.name}</h1>
                <p className="text-3xl font-light tracking-widest text-[#2D2D2D]">R {product.price.toLocaleString()}</p>
              </div>
              
              <div className="prose prose-sm max-w-none text-gray-500 font-light leading-relaxed mb-12 space-y-4">
                  <p className="text-lg text-[#2D2D2D]/80 italic font-playfair">{product.vision}</p>
                  <p>{product.description}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 mb-16">
                  <div className="flex items-center border border-black/10 px-8 py-5 bg-white">
                      <button onClick={() => setQty(Math.max(1, qty-1))} className="hover:text-[#B4A694] transition-colors"><Minus size={18} /></button>
                      <span className="mx-12 text-sm font-bold w-4 text-center">{qty}</span>
                      <button onClick={() => setQty(qty+1)} className="hover:text-[#B4A694] transition-colors"><Plus size={18} /></button>
                  </div>
                  <button 
                      onClick={() => {
                          for(let i=0; i<qty; i++) addToCart(product);
                      }}
                      className="flex-1 bg-[#2D2D2D] text-white text-[11px] uppercase tracking-[0.4em] font-bold hover:bg-[#B4A694] transition-all duration-500 flex items-center justify-center gap-3 py-5"
                  >
                      <ShoppingBag size={16} /> Add to Bag
                  </button>
              </div>

              {/* Functional Attributes */}
              <div className="space-y-12 border-t border-black/5 pt-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex gap-4 items-start">
                        <div className="w-10 h-10 bg-white flex items-center justify-center flex-shrink-0 border border-black/5">
                            <Truck size={18} className="text-[#B4A694]" />
                        </div>
                        <div>
                            <h4 className="text-[10px] uppercase tracking-widest font-bold mb-1">Fast Local Delivery</h4>
                            <p className="text-xs text-gray-400">Arrives in 2-4 business days within Cape Town.</p>
                        </div>
                    </div>
                    <div className="flex gap-4 items-start">
                        <div className="w-10 h-10 bg-white flex items-center justify-center flex-shrink-0 border border-black/5">
                            <ShieldCheck size={18} className="text-[#B4A694]" />
                        </div>
                        <div>
                            <h4 className="text-[10px] uppercase tracking-widest font-bold mb-1">Lifetime Quality</h4>
                            <p className="text-xs text-gray-400">Authenticity guaranteed with artisan signature.</p>
                        </div>
                    </div>
                  </div>

                  <div className="bg-white p-8 border border-black/5 space-y-8">
                    <div>
                        <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-4 text-[#B4A694]">Materiality & Care</h3>
                        <p className="text-gray-500 leading-relaxed text-sm font-light">{product.materiality}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-8 pt-8 border-t border-black/5">
                        <div>
                            <span className="text-[9px] uppercase tracking-widest text-gray-400 block mb-1">Origin</span>
                            <span className="text-[11px] uppercase tracking-wider font-medium">Cape Town Studio</span>
                        </div>
                        <div>
                            <span className="text-[9px] uppercase tracking-widest text-gray-400 block mb-1">Inventory</span>
                            <span className="text-[11px] uppercase tracking-wider font-medium text-green-700">In Sanctuary</span>
                        </div>
                    </div>
                  </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
