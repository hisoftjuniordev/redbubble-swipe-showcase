
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const OnboardingModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has seen the onboarding modal before
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    if (!hasSeenOnboarding) {
      setIsOpen(true);
      // Set flag in localStorage
      localStorage.setItem('hasSeenOnboarding', 'true');
    }
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white rounded-xl shadow-xl p-6 w-11/12 max-w-md animate-fade-in">
        <button 
          onClick={() => setIsOpen(false)} 
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-500"
        >
          <X size={24} />
        </button>
        
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-red-300">
            Welcome to SwipeBubble!
          </h2>
          <p className="text-gray-600 mb-6">
            Discover amazing Redbubble products in a fun way!
          </p>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-center mb-2">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-swipe-like" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
              </div>
              <p className="text-sm text-gray-600">Swipe right to like products</p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-center mb-2">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-swipe-nope" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              </div>
              <p className="text-sm text-gray-600">Swipe left to pass</p>
            </div>
          </div>
          
          <p className="text-sm text-gray-500 mb-6">
            Your liked products will be saved to your favorites!
          </p>
          
          <button 
            onClick={() => setIsOpen(false)}
            className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-pink-400 to-red-300 text-white font-medium hover:from-pink-500 hover:to-red-400 transition-all"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingModal;
