
import React from 'react';
import Navbar from '../components/Navbar';
import SwipePage from './SwipePage';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <SwipePage />
      </main>
    </div>
  );
};

export default Index;
