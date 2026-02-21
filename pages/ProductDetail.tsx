
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Minus, Plus, Share2, ArrowLeft, Heart, ShoppingBag, ShieldCheck, Truck, Star, MessageSquare } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Product, Review } from '../types';
import SEO from '../components/SEO';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products, addToCart, addToWishlist, wishlist, addReview } = useApp();
  const [product, setProduct] = useState<Product | null>(null);
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  // Review form state
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isInWishlist = product ? wishlist.some(i => i.id === product.id) : false;

  useEffect(() => {
    const p = products.find(item => item.id === id);
    if (p) {
        setProduct(p);
    }
    window.scrollTo(0, 0);
  }, [id, products]);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!product || !reviewName || !reviewComment) return;

    setIsSubmitting(true);
    // Simulate API delay
    setTimeout(() => {
      addReview(product.id, {
        userName: reviewName,
        rating: reviewRating,
        comment: reviewComment,
      });
      setReviewName('');
      setReviewRating(5);
      setReviewComment('');
      setIsSubmitting(false);
    }, 800);
  };

  if (!product) return <div className="h-screen flex items-center justify-center font-playfair italic text-2xl text-[#B4A694]">Gathering artifacts...</div>;

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": product.images,
    "description": product.description,
    "brand": {
      "@type": "Brand",
      "name": "Surprise by Style"
    },
    "offers": {
      "@type": "Offer",
      "url": window.location.href,
      "priceCurrency": "ZAR",
      "price": product.price,
      "availability": product.isAvailable ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
    },
    "aggregateRating": product.reviews && product.reviews.length > 0 ? {
      "@type": "AggregateRating",
      "ratingValue": (product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length).toFixed(1),
      "reviewCount": product.reviews.length
    } : undefined
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": window.location.origin
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Boutique",
        "item": `${window.location.origin}/#/boutique`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": product.name,
        "item": window.location.href
      }
    ]
  };

  return (
    <div className="pt-32 pb-40 bg-[#F8F7F2]">
      <SEO 
        title={product.name}
        description={`${product.description} Available for purchase or hire in Cape Town.`}
        keywords={`${product.name}, ${product.category}, luxury furniture Cape Town, deco hiring`}
        image={product.images[0]}
        url={`/product/${product.id}`}
        type="product"
        schemas={[productSchema, breadcrumbSchema]}
      />
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
                <div className="flex items-baseline gap-6">
                  <p className="text-3xl font-light tracking-widest text-[#2D2D2D]">R {product.price.toLocaleString()}</p>
                  {product.isForHire && (
                    <div className="flex items-center gap-2 px-3 py-1 bg-[#B4A694]/10 rounded-full">
                      <span className="text-[9px] uppercase tracking-widest font-bold text-[#B4A694]">Available for Hire</span>
                      <span className="text-sm font-medium text-[#B4A694]">R {product.hiringPrice?.toLocaleString()} / day</span>
                    </div>
                  )}
                </div>
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

        {/* Reviews Section */}
        <div className="mt-40 border-t border-black/5 pt-32">
          <div className="grid lg:grid-cols-3 gap-20">
            {/* Review Summary */}
            <div>
              <h2 className="font-playfair text-4xl text-[#2D2D2D] mb-8 italic">Client Reflections</h2>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex text-[#B4A694]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} fill={i < 4 ? "currentColor" : "none"} />
                  ))}
                </div>
                <span className="text-sm font-medium text-[#2D2D2D]">4.8 out of 5</span>
              </div>
              <p className="text-gray-500 font-light text-sm leading-relaxed mb-12">
                Our pieces are designed to be lived with. Here is how they have settled into the homes of our community.
              </p>
              
              {/* Review Form */}
              <div className="bg-white p-8 border border-black/5">
                <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold mb-8 text-[#B4A694]">Share Your Experience</h3>
                <form onSubmit={handleReviewSubmit} className="space-y-6">
                  <div>
                    <label className="text-[9px] uppercase tracking-widest text-gray-400 block mb-2">Your Name</label>
                    <input 
                      type="text" 
                      required
                      value={reviewName}
                      onChange={(e) => setReviewName(e.target.value)}
                      className="w-full bg-transparent border-b border-black/10 py-2 text-sm outline-none focus:border-[#B4A694] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] uppercase tracking-widest text-gray-400 block mb-2">Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewRating(star)}
                          className={`transition-colors ${reviewRating >= star ? 'text-[#B4A694]' : 'text-gray-200'}`}
                        >
                          <Star size={18} fill={reviewRating >= star ? "currentColor" : "none"} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-[9px] uppercase tracking-widest text-gray-400 block mb-2">Your Thoughts</label>
                    <textarea 
                      required
                      rows={4}
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      className="w-full bg-transparent border border-black/10 p-3 text-sm outline-none focus:border-[#B4A694] transition-colors resize-none"
                    />
                  </div>
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#2D2D2D] text-white text-[10px] uppercase tracking-[0.3em] font-bold py-4 hover:bg-[#B4A694] transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Review'}
                  </button>
                </form>
              </div>
            </div>

            {/* Review List */}
            <div className="lg:col-span-2 space-y-16">
              {product.reviews && product.reviews.length > 0 ? (
                product.reviews.map((review) => (
                  <div key={review.id} className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h4 className="font-playfair text-xl text-[#2D2D2D] mb-1">{review.userName}</h4>
                        <span className="text-[9px] uppercase tracking-widest text-gray-400">{review.date}</span>
                      </div>
                      <div className="flex text-[#B4A694]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-500 font-light leading-relaxed italic">"{review.comment}"</p>
                  </div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center py-20 bg-white border border-dashed border-black/10 rounded-lg">
                  <MessageSquare size={40} className="text-gray-200 mb-6" strokeWidth={1} />
                  <p className="font-playfair text-xl italic text-gray-400">Be the first to share a narrative about this piece.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
