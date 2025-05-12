
import React from 'react';
import { Button } from '@/components/ui/button';

const MainNav: React.FC = () => {
  return (
    <header className="border-b border-gray-800 bg-background/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded bg-blue-500 flex items-center justify-center">
            <span className="text-white font-bold text-sm">GC</span>
          </div>
          <span className="font-semibold text-lg">GIFConvert</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-sm text-gray-300 hover:text-white">Features</a>
          <a href="#" className="text-sm text-gray-300 hover:text-white">Pricing</a>
          <a href="#" className="text-sm text-gray-300 hover:text-white">Docs</a>
          <a href="#" className="text-sm text-gray-300 hover:text-white">About</a>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Button variant="outline" className="hidden sm:flex border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-gray-100">
            Sign In
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white button-glow">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};

export default MainNav;
