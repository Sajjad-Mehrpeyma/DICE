import React from 'react';
import { NewsSection } from '@/components/NewsSection';

/**
 * Example page demonstrating the NewsSection component
 */
export const NewsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <NewsSection />
      </div>
    </div>
  );
};
