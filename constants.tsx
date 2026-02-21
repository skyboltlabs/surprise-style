
import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Hand-Thrown Ceramic Vase',
    category: 'The Dining Table',
    price: 1850,
    description: 'Each piece is individually crafted by local Cape artisans, featuring a raw sandy exterior and glazed interior.',
    materiality: 'Stoneware, Matte White Glaze.',
    vision: 'A celebration of imperfection, designed to hold wild Cape florals.',
    images: ['https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1612196808214-b7e239e5f6b7?auto=format&fit=crop&q=80&w=800'],
    isAvailable: true,
    reviews: [
      { id: 'r1', userName: 'Elena V.', rating: 5, comment: 'The texture is even more beautiful in person. A true statement piece.', date: 'January 2024' },
      { id: 'r2', userName: 'Marcus T.', rating: 4, comment: 'Slightly smaller than expected but the craftsmanship is undeniable.', date: 'December 2023' }
    ]
  },
  {
    id: '2',
    name: 'Linen Slumber Armchair',
    category: 'Lounge Luxe',
    price: 12500,
    description: 'Deep-seated comfort upholstered in premium Belgian linen for a relaxed yet refined living space.',
    materiality: 'Solid Ash Wood, Belgian Linen, Feather Fill.',
    vision: 'Understated luxury that prioritizes tactile comfort and longevity.',
    images: ['https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&q=80&w=800'],
    isAvailable: true,
    reviews: [
      { id: 'r3', userName: 'Sarah J.', rating: 5, comment: 'The most comfortable chair I have ever owned. The linen is exquisite.', date: 'February 2024' }
    ]
  },
  {
    id: '3',
    name: 'Brushed Brass Pendant',
    category: 'Grand Entrances',
    price: 4200,
    description: 'A sculptural light fixture that casts a warm, ambient glow through its hand-finished brass dome.',
    materiality: 'Solid Brass, Textile Cable.',
    vision: 'Bringing architectural warmth to entryways and dining nooks.',
    images: ['https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&q=80&w=800'],
    isAvailable: true,
  },
  {
    id: '4',
    name: 'Scandi Dining Table',
    category: 'The Dining Table',
    price: 15800,
    description: 'A minimalist oak table designed for gathering and everyday rituals.',
    materiality: 'White Oak, Natural Oil Finish.',
    vision: 'The heart of the home, crafted to age beautifully with your family.',
    images: ['https://images.unsplash.com/photo-1657524398377-567034729507?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=800'],
    isAvailable: true,
  },
  {
    id: '5',
    name: 'Textured Wool Throw',
    category: 'Lounge Luxe',
    price: 2400,
    description: 'Heavyweight wool throw with a chunky waffle knit, perfect for winter nights in the Cape.',
    materiality: '100% Merino Wool.',
    vision: 'Tactile warmth that adds depth to neutral palettes.',
    images: ['https://images.unsplash.com/photo-1731399211410-e3ffe1560310?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1528913422301-49666c07521e?auto=format&fit=crop&q=80&w=800'],
    isAvailable: true,
  },
  {
    id: '6',
    name: 'Travertine Side Table',
    category: 'Grand Entrances',
    price: 6900,
    description: 'A geometric monolith made from Italian Travertine, honed to a silky finish.',
    materiality: 'Beige Travertine.',
    vision: 'A solid, timeless anchor for modern interiors.',
    images: ['https://images.unsplash.com/photo-1565791380713-1756b9a05343?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800'],
    isAvailable: true,
  }
];

export const THEME_COLORS = {
  SAND: '#F8F7F2',
  CHARCOAL: '#2D2D2D',
  CLAY: '#B4A694',
  WHITE: '#FFFFFF'
};
