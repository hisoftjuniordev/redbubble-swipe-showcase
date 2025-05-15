
import React from 'react';
import Navbar from '../components/Navbar';
import SwipePage from './SwipePage';
import { LikedProductsProvider } from '../context/LikedProductsContext';

const Index: React.FC = () => {
  return (
    <LikedProductsProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <SwipePage />
        </main>
      </div>
    </LikedProductsProvider>
  );
};

export default Index;
