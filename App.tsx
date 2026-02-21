
import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import SidebarCart from './components/SidebarCart';
import SidebarWishlist from './components/SidebarWishlist';
import Home from './pages/Home';
import Boutique from './pages/Boutique';
import ProductDetail from './pages/ProductDetail';
import Archive from './pages/Archive';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AppContent: React.FC = () => {
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative selection:bg-[#B4A694] selection:text-white">
      {/* Subtle Scandi Cursor */}
      <div 
        className="custom-cursor hidden md:block opacity-40 mix-blend-difference" 
        style={{ transform: `translate3d(${cursorPos.x - 5}px, ${cursorPos.y - 5}px, 0)` }} 
      />
      
      <Navbar />
      <SidebarCart />
      <SidebarWishlist />
      
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/boutique" element={<Boutique />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/archive" element={<Archive />} />
        </Routes>
      </main>

      <footer className="bg-white border-t border-black/5 pt-32 pb-16 px-6 md:px-12">
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid md:grid-cols-4 gap-20">
            <div className="col-span-2">
              <h2 className="font-playfair text-3xl text-[#2D2D2D] mb-8">Surprise by Style</h2>
              <p className="max-w-xs text-sm font-light leading-relaxed text-gray-500 mb-8">
                Curating timeless furniture and artisanal artifacts in the heart of Cape Town. Our collections prioritize the intersection of form, function, and soul.
              </p>
              <div className="flex gap-10">
                  <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-[#2D2D2D] hover:text-[#B4A694] transition-colors cursor-pointer">Instagram</span>
                  <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-[#2D2D2D] hover:text-[#B4A694] transition-colors cursor-pointer">Pinterest</span>
                  <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-[#2D2D2D] hover:text-[#B4A694] transition-colors cursor-pointer">Journal</span>
              </div>
            </div>
            <div>
              <h3 className="text-[#B4A694] text-[10px] uppercase tracking-[0.4em] font-bold mb-10">The Studio</h3>
              <ul className="flex flex-col gap-5 text-[10px] uppercase tracking-[0.2em] font-medium text-[#2D2D2D]">
                  <li><a href="#/boutique" className="hover:text-[#B4A694] transition-colors">Shop All</a></li>
                  <li><a href="#/archive" className="hover:text-[#B4A694] transition-colors">Our Process</a></li>
                  <li><a href="#/" className="hover:text-[#B4A694] transition-colors">Bespoke Projects</a></li>
                  <li><a href="#/" className="hover:text-[#B4A694] transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-[#B4A694] text-[10px] uppercase tracking-[0.4em] font-bold mb-10">Visit</h3>
              <p className="text-[10px] uppercase tracking-widest leading-loose text-[#2D2D2D]">
                12 Bree Street<br />
                Cape Town, 8001<br />
                South Africa
              </p>
              <p className="mt-8 text-[10px] uppercase tracking-widest text-[#B4A694] font-bold">studio@surprisebystyle.com</p>
            </div>
          </div>
          
          <div className="mt-32 pt-10 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-8">
              <p className="text-[9px] uppercase tracking-[0.3em] text-gray-400 font-medium">© 2024 Surprise by Style. Designed in the Cape.</p>
              <p className="text-[9px] uppercase tracking-[0.3em] flex gap-10 text-gray-400 font-medium">
                  <span className="hover:text-[#2D2D2D] transition-colors cursor-pointer">Privacy Policy</span>
                  <span className="hover:text-[#2D2D2D] transition-colors cursor-pointer">Terms & Conditions</span>
              </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <ScrollToTop />
        <AppContent />
      </Router>
    </AppProvider>
  );
};

export default App;
