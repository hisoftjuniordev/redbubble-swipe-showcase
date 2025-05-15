
import React from 'react';

interface SwipeControlsProps {
  onLike: () => void;
  onNope: () => void;
}

const SwipeControls: React.FC<SwipeControlsProps> = ({ onLike, onNope }) => {
  return (
    <div className="flex justify-center space-x-8 py-6">
      {/* Nope Button */}
      <button 
        onClick={onNope}
        className="swipe-action w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center border-2 border-swipe-nope"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-swipe-nope" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      
      {/* Like Button */}
      <button 
        onClick={onLike}
        className="swipe-action w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center border-2 border-swipe-like"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-swipe-like" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>
    </div>
  );
};

export default SwipeControls;
