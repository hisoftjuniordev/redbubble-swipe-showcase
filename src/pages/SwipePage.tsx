import React, { useState, useEffect } from 'react';
import { useLikedProducts } from '../context/LikedProductsContext';
import ProductCard from '../components/ProductCard';
import SwipeControls from '../components/SwipeControls';
import OnboardingModal from '../components/OnboardingModal';
import { Product, SwipeDirection } from '../types';
import { fetchRedbubbleProducts } from '../utils/redbubbleService';
import { toast } from '../hooks/use-toast';

const SwipePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { addLikedProduct } = useLikedProducts();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Fetch products from your Redbubble store
        const redbubbleProducts = await fetchRedbubbleProducts();
        
        if (redbubbleProducts.length === 0) {
          setError("No products found. Please check your store URL.");
          toast({
            title: "No products found",
            description: "We couldn't find any products in your store.",
            variant: "destructive",
          });
          return;
        }
        
        setProducts(redbubbleProducts);
        toast({
          title: "Products loaded",
          description: `${redbubbleProducts.length} products from your store are ready to browse!`,
        });
      } catch (error) {
        console.error("Error loading products:", error);
        setError("Failed to load products. Please try again later.");
        toast({
          title: "Error loading products",
          description: "Could not load products from your store. Using fallback data.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadProducts();
  }, []);

  const handleSwipe = (direction: SwipeDirection, product: Product) => {
    if (direction === 'right') {
      // Like the product
      addLikedProduct(product);
      toast({
        title: "Product liked",
        description: `${product.name} has been added to your favorites!`,
      });
    }
    
    // Move to the next product
    setCurrentIndex(prevIndex => prevIndex + 1);
  };

  const handleLike = () => {
    if (currentIndex < products.length) {
      handleSwipe('right', products[currentIndex]);
    }
  };

  const handleNope = () => {
    if (currentIndex < products.length) {
      handleSwipe('left', products[currentIndex]);
    }
  };

  const resetSwipe = () => {
    setCurrentIndex(0);
  };

  // Check if we've gone through all products
  const isFinished = currentIndex >= products.length;

  return (
    <div className="flex flex-col min-h-screen pb-8">
      <OnboardingModal />
      
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center">
            <div className="w-16 h-16 border-4 border-pink-400 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-lg text-white">Loading products from your store...</p>
          </div>
        ) : error ? (
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-pink-400 to-red-300 text-white font-medium hover:from-pink-500 hover:to-red-400 transition-all"
            >
              Try Again
            </button>
          </div>
        ) : isFinished ? (
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-pink-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <h2 className="text-2xl font-bold mb-2">You've seen all products!</h2>
            <p className="text-gray-600 mb-6">Want to go through them again?</p>
            <button 
              onClick={resetSwipe}
              className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-pink-400 to-red-300 text-white font-medium hover:from-pink-500 hover:to-red-400 transition-all"
            >
              Start Over
            </button>
          </div>
        ) : (
          <div className="w-full max-w-sm pb-4">
            <div className="relative w-full aspect-square mb-4">
              {/* Show current and next card for smooth transitioning */}
              {products.slice(currentIndex, currentIndex + 2).map((product, idx) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSwipe={handleSwipe}
                  isActive={idx === 0}
                />
              ))}
            </div>
            <SwipeControls onLike={handleLike} onNope={handleNope} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SwipePage;
