
import React from 'react';
import { Link } from 'react-router-dom';
import { useLikedProducts } from '../context/LikedProductsContext';

const Navbar: React.FC = () => {
  const { likedProducts } = useLikedProducts();

  return (
    <nav className="bg-white shadow-lg rounded-b-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-red-300">
                SwipeBubble
              </span>
            </Link>
          </div>
          <div className="flex items-center">
            <Link
              to="/favorites"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-pink-400 to-red-300 hover:from-pink-500 hover:to-red-400 transition-all"
            >
              Favorites {likedProducts.length > 0 && <span className="ml-1 bg-white text-pink-500 rounded-full w-5 h-5 flex items-center justify-center text-xs">{likedProducts.length}</span>}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
