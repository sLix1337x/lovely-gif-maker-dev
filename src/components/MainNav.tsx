
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const MainNav: React.FC = () => {
  return (
    <header className="border-b border-gray-800 bg-background/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded bg-blue-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">GC</span>
            </div>
            <span className="font-semibold text-lg">GIFConvert</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/features" className="text-sm text-gray-300 hover:text-white">Features</Link>
          <Link to="/about" className="text-sm text-gray-300 hover:text-white">About</Link>
          <Link to="/contact" className="text-sm text-gray-300 hover:text-white">Contact</Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white button-glow" asChild>
            <Link to="/">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default MainNav;
