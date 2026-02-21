
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product, CartItem, Review } from '../types';
import { PRODUCTS } from '../constants';

interface AppContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: Product[];
  isCartOpen: boolean;
  isWishlistOpen: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  toggleCart: (open?: boolean) => void;
  toggleWishlist: (open?: boolean) => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: string) => void;
  addReview: (productId: string, review: Omit<Review, 'id' | 'date'>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleCart = (open?: boolean) => setIsCartOpen(open !== undefined ? open : !isCartOpen);
  const toggleWishlist = (open?: boolean) => setIsWishlistOpen(open !== undefined ? open : !isWishlistOpen);

  const addToWishlist = (product: Product) => {
    setWishlist((prev) => {
      if (prev.some((item) => item.id === product.id)) return prev;
      return [...prev, product];
    });
  };

  const removeFromWishlist = (id: string) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  const addReview = (productId: string, reviewData: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = {
      ...reviewData,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    };

    setProducts((prev) => 
      prev.map((p) => 
        p.id === productId 
          ? { ...p, reviews: [newReview, ...(p.reviews || [])] } 
          : p
      )
    );
  };

  return (
    <AppContext.Provider
      value={{
        products,
        cart,
        wishlist,
        isCartOpen,
        isWishlistOpen,
        searchQuery,
        setSearchQuery,
        addToCart,
        removeFromCart,
        toggleCart,
        toggleWishlist,
        addToWishlist,
        removeFromWishlist,
        addReview,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
