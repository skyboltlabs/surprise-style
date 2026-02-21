
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useApp } from '../context/AppContext';
import SEO from '../components/SEO';

const CATEGORIES = ['All', 'The Dining Table', 'Grand Entrances', 'Lounge Luxe', 'Floral Architecture', 'Available for Hire'];

const Boutique: React.FC = () => {
  const { products } = useApp();
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Featured');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const filter = params.get('filter');
    if (filter === 'hiring') {
      setActiveCategory('Available for Hire');
    }
  }, [location]);

  const getSortedProducts = () => {
    let filtered = activeCategory === 'All' 
      ? [...products] 
      : activeCategory === 'Available for Hire'
        ? products.filter(p => p.isForHire)
        : products.filter(p => p.category === activeCategory);

    switch (sortBy) {
      case 'Price: Low to High':
        return filtered.sort((a, b) => a.price - b.price);
      case 'Price: High to Low':
        return filtered.sort((a, b) => b.price - a.price);
      case 'Newest':
        // Since we don't have dates, we'll assume higher ID is newer or just reverse the array
        return filtered.reverse();
      case 'Featured':
      default:
        return filtered;
    }
  };

  const sortedProducts = getSortedProducts();

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
      }
    ]
  };

  return (
    <div className="pt-48 pb-32 px-6 md:px-12 max-w-screen-2xl mx-auto">
      <SEO 
        title={`Boutique | ${activeCategory}`}
        description={`Explore our curated collection of ${activeCategory.toLowerCase()} artifacts. Timeless furniture and artisanal decor for your home in Cape Town.`}
        keywords={`${activeCategory}, luxury furniture, boutique decor, Cape Town homeware, artisanal curation`}
        url="/boutique"
        schemas={[breadcrumbSchema]}
      />
      <div className="flex flex-col md:flex-row gap-16">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold mb-8 text-gray-400">Filter Collections</h2>
          <div className="flex flex-col gap-6">
            {CATEGORIES.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-left text-sm transition-all duration-300 ${activeCategory === cat ? 'text-[#B4A694] font-medium' : 'text-[#2D2D2D] hover:text-[#B4A694]'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="mt-16 pt-16 border-t border-black/5">
             <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold mb-8 text-gray-400">Sort By</h2>
             <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-transparent border-b border-black/10 py-2 text-sm outline-none cursor-pointer focus:border-[#B4A694]"
             >
                <option value="Featured">Featured</option>
                <option value="Newest">Newest</option>
                <option value="Price: Low to High">Price: Low to High</option>
                <option value="Price: High to Low">Price: High to Low</option>
             </select>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          <header className="mb-12">
            <h1 className="font-playfair text-4xl md:text-5xl italic mb-4">{activeCategory}</h1>
            <p className="text-gray-500 font-light text-sm tracking-wide">Showing {sortedProducts.length} curated artifacts.</p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
            {sortedProducts.map(product => (
              <div key={product.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both">
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {sortedProducts.length === 0 && (
            <div className="py-40 text-center">
              <p className="font-playfair text-2xl italic text-gray-400">This sanctuary is currently empty.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Boutique;
