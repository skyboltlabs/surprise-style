
import React from 'react';
import { ArrowRight, ChevronRight, Star } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useApp } from '../context/AppContext';
import SEO from '../components/SEO';

const Home: React.FC = () => {
  const { products } = useApp();
  const newArrivals = products.slice(0, 4);

  return (
    <div className="min-h-screen">
      <SEO 
        title="Curated Homeware & Luxury Decor"
        description="Discover timeless furniture and artisanal artifacts in the heart of Cape Town. High-end luxury decor hiring and acquisition boutique."
      />
      {/* Lifestyle Hero */}
      <section className="relative h-[80vh] w-full flex items-center justify-center pt-24">
        <div className="absolute inset-x-0 bottom-0 h-full w-full px-6 md:px-12">
            <div className="relative w-full h-full overflow-hidden">
                <img 
                    src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=2000" 
                    alt="Living Room Lifestyle" 
                    className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-black/10" />
            </div>
        </div>
        
        <div className="relative z-10 text-center max-w-3xl px-6">
          <h1 className="font-playfair text-5xl md:text-7xl text-white mb-8 drop-shadow-lg">
            Elevate Your Everyday
          </h1>
          <p className="text-white text-lg font-light mb-10 drop-shadow-md">
            Thoughtfully curated furniture and decor designed for the soul of your home.
          </p>
          <a href="#/boutique" className="inline-block px-10 py-4 bg-white text-[#2D2D2D] text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-[#2D2D2D] hover:text-white transition-all duration-300">
            Shop The Collection
          </a>
        </div>
      </section>

      {/* Shop by Category - Tiles */}
      <section className="py-24 px-6 md:px-12 max-w-screen-2xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
                <h2 className="font-playfair text-4xl mb-4">Shop by Space</h2>
                <div className="h-0.5 w-16 bg-[#B4A694]" />
            </div>
            <a href="#/boutique" className="text-[10px] uppercase tracking-[0.2em] font-bold flex items-center gap-2 group">
                Browse All <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
            <div className="group cursor-pointer">
                <div className="aspect-[4/5] overflow-hidden bg-gray-100">
                    <img src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&q=80&w=800" alt="Living" className="w-full h-full object-cover hover-scale" />
                </div>
                <h3 className="mt-4 font-playfair text-2xl group-hover:text-[#B4A694] transition-colors">The Living Room</h3>
            </div>
            <div className="group cursor-pointer">
                <div className="aspect-[4/5] overflow-hidden bg-gray-100">
                    <img src="https://images.pexels.com/photos/6947276/pexels-photo-6947276.jpeg?auto=format&fit=crop&q=80&w=800" alt="Dining" className="w-full h-full object-cover hover-scale" />
                </div>
                <h3 className="mt-4 font-playfair text-2xl group-hover:text-[#B4A694] transition-colors">The Dining Nook</h3>
            </div>
            <div className="group cursor-pointer">
                <div className="aspect-[4/5] overflow-hidden bg-gray-100">
                    <img src="https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=800" alt="Decor" className="w-full h-full object-cover hover-scale" />
                </div>
                <h3 className="mt-4 font-playfair text-2xl group-hover:text-[#B4A694] transition-colors">Curated Decor</h3>
            </div>
        </div>
      </section>

      {/* New Arrivals Grid */}
      <section className="bg-white py-24 px-6 md:px-12">
        <div className="max-w-screen-2xl mx-auto">
            <div className="text-center mb-16">
                <span className="text-[10px] uppercase tracking-[0.4em] text-[#B4A694] font-bold mb-2 block">Our Favorites</span>
                <h2 className="font-playfair text-4xl italic">New Arrivals</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {newArrivals.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
        </div>
      </section>

      {/* Deco Hiring Section */}
      <section className="py-32 px-6 md:px-12 bg-[#2D2D2D] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20">
            <img 
                src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1200" 
                alt="Event Decor" 
                className="w-full h-full object-cover" 
            />
        </div>
        <div className="max-w-screen-2xl mx-auto relative z-10">
            <div className="max-w-2xl">
                <span className="text-[10px] uppercase tracking-[0.5em] text-[#B4A694] font-bold mb-6 block">Event Curation</span>
                <h2 className="font-playfair text-5xl md:text-7xl mb-10 italic leading-tight">Deco Hiring for Exceptional Spaces</h2>
                <p className="text-gray-400 font-light text-lg mb-12 leading-relaxed">
                    Transform your event with our curated collection of artisanal pieces. From editorial-grade table settings to architectural furniture, our hiring service brings the "Surprise by Style" aesthetic to your most important moments.
                </p>
                <div className="flex flex-wrap gap-8">
                    <div className="flex flex-col">
                        <span className="text-3xl font-playfair text-[#B4A694] mb-2">01</span>
                        <h4 className="text-[10px] uppercase tracking-widest font-bold mb-2">Curated Selection</h4>
                        <p className="text-xs text-gray-500">Access to exclusive, hand-picked artifacts.</p>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-3xl font-playfair text-[#B4A694] mb-2">02</span>
                        <h4 className="text-[10px] uppercase tracking-widest font-bold mb-2">Styling Support</h4>
                        <p className="text-xs text-gray-500">Expert guidance on creating cohesive atmospheres.</p>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-3xl font-playfair text-[#B4A694] mb-2">03</span>
                        <h4 className="text-[10px] uppercase tracking-widest font-bold mb-2">Seamless Logistics</h4>
                        <p className="text-xs text-gray-500">White-glove delivery and collection across the Cape.</p>
                    </div>
                </div>
                <a href="#/boutique?filter=hiring" className="mt-16 inline-block px-12 py-5 border border-white/20 text-white text-[11px] uppercase tracking-[0.4em] font-bold hover:bg-white hover:text-[#2D2D2D] transition-all duration-500">
                    Explore Hiring Catalog
                </a>
            </div>
        </div>
      </section>

      {/* Brand Values */}
      <section className="py-24 px-6 md:px-12 bg-[#F2F1EC]">
        <div className="max-w-screen-xl mx-auto grid md:grid-cols-3 gap-16 text-center">
            <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-6 text-[#B4A694]">
                    <Star size={32} strokeWidth={1} />
                </div>
                <h3 className="font-playfair text-xl mb-4">Artisanal Quality</h3>
                <p className="text-sm text-gray-500 font-light leading-relaxed">Sourced from independent Cape Town artisans and global masters of craft.</p>
            </div>
            <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-6 text-[#B4A694]">
                    <ArrowRight size={32} strokeWidth={1} className="-rotate-45" />
                </div>
                <h3 className="font-playfair text-xl mb-4">Fast Cape Shipping</h3>
                <p className="text-sm text-gray-500 font-light leading-relaxed">Delivered within 48 hours to all major Cape Town suburbs with white-glove care.</p>
            </div>
            <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-6 text-[#B4A694]">
                    <Star size={32} strokeWidth={1} />
                </div>
                <h3 className="font-playfair text-xl mb-4">Sustainability First</h3>
                <p className="text-sm text-gray-500 font-light leading-relaxed">Materials that age with dignity and production methods that respect our earth.</p>
            </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-32 flex flex-col items-center px-6">
        <div className="max-w-xl text-center">
            <h2 className="font-playfair text-4xl mb-6 italic">Join the Journal</h2>
            <p className="text-gray-500 font-light mb-10">Sign up for early access to our seasonal drops and interior styling tips.</p>
            <div className="flex flex-col sm:flex-row gap-4 w-full">
                <input type="email" placeholder="Your Email Address" className="flex-1 px-6 py-4 border border-black/10 focus:border-[#B4A694] outline-none text-sm" />
                <button className="px-10 py-4 bg-[#2D2D2D] text-white text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-[#B4A694] transition-colors">Subscribe</button>
            </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
