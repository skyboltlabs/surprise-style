
import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import SEO from '../components/SEO';

const PROJECTS = [
  { id: 1, title: 'The Constantia Estate', date: 'Spring 2024', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200', desc: 'A minimalist overhaul of a heritage wine estate focusing on neutral stone and soft linen textures.' },
  { id: 2, title: 'Bree Street Soirée', date: 'Summer 2023', image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1200', desc: 'Urban industrialism met high-contrast botanical art for an exclusive rooftop launch.' },
  { id: 3, title: 'Clifton Sanctuary', date: 'Autumn 2024', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200', desc: 'Soft textures and travertine anchors overlooking the Atlantic, creating a seamless indoor-outdoor flow.' },
  { id: 4, title: 'Winelands Wedding', date: 'Winter 2023', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1200', desc: 'A multi-sensory floral architecture project for a private celebration in Franschhoek.' },
];

const Archive: React.FC = () => {
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
        "name": "Archive",
        "item": `${window.location.origin}/#/archive`
      }
    ]
  };

  return (
    <div className="pt-48 pb-40 bg-[#F8F7F2]">
      <SEO 
        title="The Archive | Interior Narratives"
        description="A visual documentation of spaces we've inhabited. Explore our portfolio of minimalist overhauls and botanical art projects in Cape Town."
        keywords="interior design portfolio, Cape Town decor projects, minimalist interiors, botanical art"
        url="/archive"
        schemas={[breadcrumbSchema]}
      />
      <div className="px-6 md:px-12 max-w-screen-2xl mx-auto">
        <header className="mb-32 max-w-4xl">
          <span className="text-[10px] uppercase tracking-[0.5em] text-[#B4A694] font-bold mb-6 block">Interior Narratives</span>
          <h1 className="font-playfair text-6xl md:text-8xl text-[#2D2D2D] mb-10 italic">The Archive</h1>
          <p className="text-gray-500 font-light text-xl leading-relaxed max-w-2xl">
            A visual documentation of spaces we've inhabited. Each project is a study in how objects inform the atmosphere of a home.
          </p>
        </header>

        <div className="grid gap-40">
          {PROJECTS.map((project, idx) => (
            <div key={project.id} className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 md:gap-24 items-center group`}>
              <div className="flex-1 overflow-hidden relative aspect-[16/10] bg-white border border-black/5 shadow-sm">
                 <img 
                   src={project.image} 
                   alt={project.title} 
                   className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-[1.5s] ease-in-out scale-100 group-hover:scale-105" 
                 />
                 <div className="absolute inset-0 bg-[#B4A694]/5 group-hover:bg-transparent transition-colors duration-700" />
              </div>
              <div className="flex-1 max-w-md">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-[#B4A694]">{project.date}</span>
                    <div className="h-[1px] w-8 bg-[#B4A694]/30" />
                  </div>
                  <h2 className="font-playfair text-4xl md:text-5xl text-[#2D2D2D] mb-8 group-hover:text-[#B4A694] transition-colors flex items-center gap-4">
                    {project.title}
                  </h2>
                  <p className="text-gray-500 font-light text-lg mb-10 leading-relaxed">{project.desc}</p>
                  <button className="flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] font-bold text-[#2D2D2D] border-b border-[#2D2D2D]/20 pb-2 hover:border-[#B4A694] hover:text-[#B4A694] transition-all group/btn">
                    Read the Study <ArrowUpRight size={14} className="group-hover/btn:-translate-y-1 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <section className="mt-60 text-center flex flex-col items-center">
           <div className="h-32 w-[1px] bg-[#B4A694]/20 mb-16" />
           <h2 className="font-playfair text-4xl italic text-[#2D2D2D] mb-12 max-w-2xl leading-snug">
              Every home has a story waiting to be told through curate selection.
           </h2>
           <a href="#/boutique" className="px-16 py-6 bg-[#2D2D2D] text-white text-[11px] uppercase tracking-[0.4em] font-bold hover:bg-[#B4A694] transition-all duration-500">
             Begin Your Narrative
           </a>
        </section>
      </div>
    </div>
  );
};

export default Archive;
