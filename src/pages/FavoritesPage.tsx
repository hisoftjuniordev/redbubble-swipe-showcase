
import React from 'react';
import { Link } from 'react-router-dom';
import { useLikedProducts } from '../context/LikedProductsContext';
import ProductGrid from '../components/ProductGrid';

const FavoritesPage: React.FC = () => {
  const { likedProducts, removeLikedProduct } = useLikedProducts();

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-pink-400 to-red-300">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-white">
                Your Favorites
              </h1>
              <Link
                to="/"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-pink-500 bg-white hover:bg-gray-50"
              >
                Back to Swipe
              </Link>
            </div>
          </div>
          
          <ProductGrid 
            products={likedProducts} 
            onRemove={removeLikedProduct}
            emptyMessage="No favorites yet"
          />
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;
