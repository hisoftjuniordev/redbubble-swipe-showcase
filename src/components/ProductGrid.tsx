
import React from 'react';
import { Product } from '../types';

interface ProductGridProps {
  products: Product[];
  onRemove?: (productId: string) => void;
  emptyMessage?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
  products, 
  onRemove,
  emptyMessage = "No products found" 
}) => {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-16 w-16 text-gray-300 mb-4" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={1.5} 
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
          />
        </svg>
        <h3 className="text-xl font-medium text-gray-600">{emptyMessage}</h3>
        <p className="text-gray-500 mt-2">Swipe right on products you like to add them here!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {products.map((product) => (
        <div 
          key={product.id} 
          className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:transform hover:scale-105"
        >
          <div className="relative">
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="w-full aspect-square object-cover"
            />
            {onRemove && (
              <button 
                onClick={() => onRemove(product.id)}
                className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md text-red-500 hover:text-red-600 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          
          <div className="p-4">
            <h3 className="font-medium text-gray-800 mb-1 truncate">{product.name}</h3>
            <p className="text-pink-500 font-bold mb-2">{product.price}</p>
            
            <a
              href={product.productUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-pink-500 hover:text-pink-600"
            >
              <span>View on Redbubble</span>
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
