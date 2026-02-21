
export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'The Dining Table' | 'Grand Entrances' | 'Lounge Luxe' | 'Floral Architecture';
  price: number;
  hiringPrice?: number;
  isForHire?: boolean;
  description: string;
  materiality: string;
  vision: string;
  images: string[];
  isAvailable: boolean;
  reviews?: Review[];
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
