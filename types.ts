
export interface Product {
  id: string;
  name: string;
  category: 'The Dining Table' | 'Grand Entrances' | 'Lounge Luxe' | 'Floral Architecture';
  price: number;
  description: string;
  materiality: string;
  vision: string;
  images: string[];
  isAvailable: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface AppState {
  cart: CartItem[];
  wishlist: Product[];
  isCartOpen: boolean;
  isWishlistOpen: boolean;
}
