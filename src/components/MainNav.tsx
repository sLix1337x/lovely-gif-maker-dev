
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ChevronDown, FileImage, Video, FileCode, FileArchive, FileAudio } from 'lucide-react';

type ToolsCategory = {
  title: string;
  icon: React.ReactNode;
  items: { name: string; path: string }[];
};

const MainNav: React.FC = () => {
  const [toolsOpen, setToolsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toolsCategories: ToolsCategory[] = [
    {
      title: "File Converters",
      icon: <FileCode className="h-5 w-5 text-blue-400" />,
      items: [
        { name: "OCR Converter", path: "/tools/ocr-converter" },
        { name: "Video Converter", path: "/tools/video-converter" },
        { name: "Audio Converter", path: "/tools/audio-converter" },
        { name: "E-book Converter", path: "/tools/ebook-converter" },
        { name: "Image Converter", path: "/tools/image-converter" },
        { name: "Archive Converter", path: "/tools/archive-converter" },
        { name: "Vector Converter", path: "/tools/vector-converter" },
        { name: "Document Converter", path: "/tools/document-converter" },
        { name: "Video to MP3", path: "/tools/video-to-mp3" },
        { name: "PDF Converter", path: "/tools/pdf-converter" },
        { name: "Image to PDF", path: "/tools/image-to-pdf" },
        { name: "Image to Word", path: "/tools/image-to-word" },
        { name: "Unit Converter", path: "/tools/unit-converter" },
        { name: "Time Converter", path: "/tools/time-converter" },
      ]
    },
    {
      title: "File Compressors",
      icon: <FileArchive className="h-5 w-5 text-blue-400" />,
      items: [
        { name: "Video Compressor", path: "/tools/video-compressor" },
        { name: "Image Compressor", path: "/tools/image-compressor" },
        { name: "GIF Compressor", path: "/tools/gif-compressor" },
        { name: "MP3 Compressor", path: "/tools/mp3-compressor" },
        { name: "WAV Compressor", path: "/tools/wav-compressor" },
        { name: "Compress PDF", path: "/tools/compress-pdf" },
        { name: "Compress JPEG", path: "/tools/compress-jpeg" },
        { name: "Compress PNG", path: "/tools/compress-png" },
      ]
    },
    {
      title: "GIF Converters",
      icon: <FileImage className="h-5 w-5 text-blue-400" />,
      items: [
        { name: "Video to GIF", path: "/tools/video-to-gif" },
        { name: "MP4 to GIF", path: "/" },
        { name: "WEBM to GIF", path: "/tools/webm-to-gif" },
        { name: "APNG to GIF", path: "/tools/apng-to-gif" },
        { name: "GIF to MP4", path: "/tools/gif-to-mp4" },
        { name: "GIF to APNG", path: "/tools/gif-to-apng" },
        { name: "Image to GIF", path: "/tools/image-to-gif" },
        { name: "GIF Maker", path: "/tools/gif-maker" },
      ]
    },
    {
      title: "Video Tools",
      icon: <Video className="h-5 w-5 text-blue-400" />,
      items: [
        { name: "Crop Video", path: "/tools/crop-video" },
        { name: "Video Trimmer", path: "/tools/video-trimmer" },
      ]
    },
  ];

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setToolsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="border-b border-gray-800/50 bg-background/95 backdrop-blur-sm sticky top-0 z-50">
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
          <div className="relative" ref={menuRef}>
            <button 
              onClick={() => setToolsOpen(!toolsOpen)} 
              className="flex items-center text-sm text-gray-300 hover:text-white focus:outline-none"
            >
              Tools <ChevronDown className={`ml-1 h-4 w-4 transform transition-transform ${toolsOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <div className={`absolute left-0 top-full bg-gray-900/95 border border-gray-800 rounded-md shadow-lg w-[800px] p-4 ${toolsOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'} transition-all duration-200 z-50 -left-1/2`}>
              <div className="grid grid-cols-4 gap-6">
                {toolsCategories.map((category, index) => (
                  <div key={index}>
                    <div className="flex items-center space-x-2 mb-3">
                      {category.icon}
                      <h3 className="font-medium text-white">{category.title}</h3>
                    </div>
                    <ul className="space-y-2">
                      {category.items.map((item, itemIndex) => (
                        <li key={itemIndex}>
                          <Link 
                            to={item.path} 
                            className={`text-sm block px-2 py-1 rounded hover:bg-blue-500/10 transition-colors ${item.name === "MP4 to GIF" ? "text-blue-400 font-medium" : "text-gray-400 hover:text-gray-100"}`}
                            onClick={() => setToolsOpen(false)}
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
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
