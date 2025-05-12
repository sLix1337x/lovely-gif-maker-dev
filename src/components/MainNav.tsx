
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
          <a href="#features" className="text-sm text-gray-300 hover:text-white">Features</a>
          <a href="#how-to" className="text-sm text-gray-300 hover:text-white">How To</a>
          <a href="#" className="text-sm text-gray-300 hover:text-white">Docs</a>
          <a href="#" className="text-sm text-gray-300 hover:text-white">About</a>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white button-glow">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};

export default MainNav;
