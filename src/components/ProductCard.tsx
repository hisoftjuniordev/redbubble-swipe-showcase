
import React, { useState } from 'react';
import { Product, SwipeDirection } from '../types';

interface ProductCardProps {
  product: Product;
  onSwipe: (direction: SwipeDirection, product: Product) => void;
  isActive: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onSwipe, isActive }) => {
  const [startX, setStartX] = useState<number | null>(null);
  const [currentX, setCurrentX] = useState<number | null>(null);
  const [swipeDirection, setSwipeDirection] = useState<SwipeDirection>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setStartX(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startX === null) return;
    setCurrentX(e.touches[0].clientX);
    const diff = e.touches[0].clientX - startX;
    
    if (diff > 50) {
      setSwipeDirection('right');
    } else if (diff < -50) {
      setSwipeDirection('left');
    } else {
      setSwipeDirection(null);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (startX === null) return;
    setCurrentX(e.clientX);
    const diff = e.clientX - startX;
    
    if (diff > 50) {
      setSwipeDirection('right');
    } else if (diff < -50) {
      setSwipeDirection('left');
    } else {
      setSwipeDirection(null);
    }
  };

  const handleTouchEnd = () => {
    if (swipeDirection) {
      onSwipe(swipeDirection, product);
    }
    resetSwipeState();
  };

  const handleMouseUp = () => {
    if (swipeDirection) {
      onSwipe(swipeDirection, product);
    }
    resetSwipeState();
  };

  const resetSwipeState = () => {
    setStartX(null);
    setCurrentX(null);
    setSwipeDirection(null);
  };

  const getCardStyle = () => {
    if (startX === null || currentX === null) {
      return {};
    }
    
    const diff = currentX - startX;
    const rotate = diff * 0.1; // Rotate based on swipe distance
    
    return {
      transform: `translateX(${diff}px) rotate(${rotate}deg)`,
    };
  };

  const getOverlayStyle = () => {
    if (swipeDirection === 'right') {
      return 'bg-green-500 bg-opacity-30';
    } else if (swipeDirection === 'left') {
      return 'bg-red-500 bg-opacity-30';
    }
    return 'bg-transparent';
  };

  const SwipeIndicator = () => {
    if (swipeDirection === 'right') {
      return (
        <div className="absolute top-4 left-4 transform -rotate-12 border-4 border-swipe-like text-swipe-like text-2xl font-bold rounded-lg px-2 py-1">
          LIKE
        </div>
      );
    } else if (swipeDirection === 'left') {
      return (
        <div className="absolute top-4 right-4 transform rotate-12 border-4 border-swipe-nope text-swipe-nope text-2xl font-bold rounded-lg px-2 py-1">
          NOPE
        </div>
      );
    }
    return null;
  };

  return (
    <div
      className={`absolute inset-0 swipe-card-container ${!isActive ? 'pointer-events-none' : ''}`}
      style={{ zIndex: isActive ? 10 : 5 }}
    >
      <div
        className={`swipe-card w-full h-full bg-white rounded-2xl shadow-xl overflow-hidden ${
          swipeDirection === 'right' ? 'swiping-right' : swipeDirection === 'left' ? 'swiping-left' : ''
        }`}
        style={getCardStyle()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div className="relative w-full h-full">
          {/* Product Image */}
          <div className="relative w-full aspect-square bg-gray-100">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className={`absolute inset-0 ${getOverlayStyle()} transition-colors duration-200`} />
            <SwipeIndicator />
          </div>

          {/* Product Info */}
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">{product.name}</h3>
            <p className="text-xl font-bold text-pink-500 mb-2">{product.price}</p>
            
            <p className="text-sm text-gray-500 mb-3 line-clamp-2">
              {product.description || 'Awesome product from Redbubble'}
            </p>
            
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
      </div>
    </div>
  );
};

export default ProductCard;
