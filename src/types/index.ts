
export interface Product {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
  productUrl: string;
  description?: string;
  category?: string;
  artist?: string;
  createdAt?: string;
}

export type SwipeDirection = 'left' | 'right' | null;
