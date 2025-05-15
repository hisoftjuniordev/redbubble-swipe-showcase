
import React, { createContext, useState, useContext, useEffect } from 'react';
import { Product } from '../types';

interface LikedProductsContextType {
  likedProducts: Product[];
  addLikedProduct: (product: Product) => void;
  removeLikedProduct: (productId: string) => void;
  isProductLiked: (productId: string) => boolean;
}

const LikedProductsContext = createContext<LikedProductsContextType | undefined>(undefined);

export const LikedProductsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [likedProducts, setLikedProducts] = useState<Product[]>([]);

  // Load liked products from localStorage on init
  useEffect(() => {
    const storedLikedProducts = localStorage.getItem('likedProducts');
    if (storedLikedProducts) {
      setLikedProducts(JSON.parse(storedLikedProducts));
    }
  }, []);

  // Save liked products to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('likedProducts', JSON.stringify(likedProducts));
  }, [likedProducts]);

  const addLikedProduct = (product: Product) => {
    setLikedProducts((prev) => {
      // Check if product already exists
      if (prev.some(p => p.id === product.id)) {
        return prev;
      }
      return [...prev, product];
    });
  };

  const removeLikedProduct = (productId: string) => {
    setLikedProducts((prev) => prev.filter(product => product.id !== productId));
  };

  const isProductLiked = (productId: string) => {
    return likedProducts.some(product => product.id === productId);
  };

  return (
    <LikedProductsContext.Provider 
      value={{ 
        likedProducts, 
        addLikedProduct, 
        removeLikedProduct,
        isProductLiked
      }}
    >
      {children}
    </LikedProductsContext.Provider>
  );
};

export const useLikedProducts = (): LikedProductsContextType => {
  const context = useContext(LikedProductsContext);
  if (context === undefined) {
    throw new Error('useLikedProducts must be used within a LikedProductsProvider');
  }
  return context;
};
