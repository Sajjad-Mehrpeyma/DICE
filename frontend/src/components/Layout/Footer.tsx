import React from 'react';

/**
 * Footer component
 */
export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 px-4 py-6 lg:px-6">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="text-sm text-gray-500">
          © 2024 DICE - Decision Intelligence Copilot Engine. All rights
          reserved.
        </div>

        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
            Privacy Policy
          </a>
          <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
            Terms of Service
          </a>
          <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
            Support
          </a>
        </div>
      </div>
    </footer>
  );
};
