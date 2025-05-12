
import React, { useEffect } from 'react';
import MainNav from '@/components/MainNav';
import { Zap, Lock, CircleDollarSign, Settings, FileImage, Video, FileCode, FileArchive, FileAudio } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link as RouterLink } from 'react-router-dom';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Helmet } from 'react-helmet-async';

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 transition-all hover:translate-y-[-5px] hover:bg-gray-900/70 hover:border-blue-500/30 duration-300">
    <div className="bg-blue-500/20 p-4 rounded-full mb-4 w-16 h-16 flex items-center justify-center">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2 text-gray-100">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

const Features = () => {
  // Animation observer to trigger animations when scrolled into view
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
    
    const elements = document.querySelectorAll('.scroll-section');
    elements.forEach(el => observer.observe(el));
    
    return () => elements.forEach(el => observer.unobserve(el));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Helmet>
        <title>Features | MP4 to GIF Converter and Media Tools</title>
        <meta name="description" content="Explore the powerful features of our free online MP4 to GIF converter and other media tools. Convert, compress, and edit your files with ease." />
        <meta name="keywords" content="MP4 to GIF features, video converter features, GIF maker, video editing tools, online converter" />
        <meta property="og:title" content="GIFConvert Features | MP4 to GIF Converter and Media Tools" />
        <meta property="og:description" content="Discover the full range of features available in our free online converter for videos, images, GIFs and more." />
        <link rel="canonical" href="https://gifconvert.app/features" />
      </Helmet>
      
      <MainNav />
      
      <div className="bg-particles"></div>
      
      <div className="container mx-auto py-10 px-4">
        <header className="text-center mb-16 max-w-3xl mx-auto scroll-section">
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
            GIFConvert Features
          </h1>
          <p className="text-lg text-gray-300">
            Our MP4 to GIF converter and other media tools offer a wide range of powerful features to help you create and transform your content with ease.
          </p>
        </header>
        
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center text-gray-100 gradient-text scroll-section">Core Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 scroll-section">
            <FeatureCard 
              icon={<Zap className="h-8 w-8 text-blue-400" />} 
              title="Fast Conversion" 
              description="Convert videos to GIFs in seconds with our optimized client-side processing technology."
            />
            
            <FeatureCard 
              icon={<Lock className="h-8 w-8 text-blue-400" />} 
              title="Privacy Focused" 
              description="All processing happens in your browser. Your files never leave your device."
            />
            
            <FeatureCard 
              icon={<CircleDollarSign className="h-8 w-8 text-blue-400" />} 
              title="100% Free" 
              description="No watermarks, no subscriptions, no hidden fees. Completely free to use."
            />
            
            <FeatureCard 
              icon={<Settings className="h-8 w-8 text-blue-400" />} 
              title="Customizable" 
              description="Adjust quality, duration, and frames to create perfect GIFs for any use."
            />
          </div>
          
          <h2 className="text-2xl font-bold mb-8 text-center text-gray-100 gradient-text scroll-section">All Tool Categories</h2>
          
          <div className="space-y-16 mb-16">
            <div className="scroll-section">
              <div className="flex items-center gap-3 mb-6">
                <FileCode className="h-6 w-6 text-blue-400" />
                <h3 className="text-xl font-semibold text-gray-100">File Converters</h3>
              </div>
              
              <ScrollArea className="h-auto max-h-[400px]">
                <div className="horizontal-scroll-container py-4">
                  <div className="tools-grid">
                    {[
                      "OCR Converter", "Video Converter", "Audio Converter", "E-book Converter", 
                      "Image Converter", "Archive Converter", "Vector Converter", "Document Converter",
                      "Video to MP3", "PDF Converter", "Image to PDF", "Image to Word",
                      "Unit Converter", "Time Converter"
                    ].map((tool, idx) => (
                      <div key={idx} className="tool-item bg-gray-900/50 rounded-lg border border-gray-800 p-4">
                        <h4 className="text-gray-200 font-medium">{tool}</h4>
                        <p className="text-gray-400 text-sm mt-2">
                          Convert your {tool.toLowerCase().includes("converter") 
                            ? tool.toLowerCase().replace(" converter", "") 
                            : tool.toLowerCase().replace(" to ", " to ")} files easily.
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollArea>
            </div>
            
            <div className="scroll-section">
              <div className="flex items-center gap-3 mb-6">
                <FileArchive className="h-6 w-6 text-blue-400" />
                <h3 className="text-xl font-semibold text-gray-100">File Compressors</h3>
              </div>
              
              <ScrollArea className="h-auto max-h-[400px]">
                <div className="horizontal-scroll-container py-4">
                  <div className="tools-grid">
                    {[
                      "Video Compressor", "Image Compressor", "GIF Compressor", "MP3 Compressor",
                      "WAV Compressor", "Compress PDF", "Compress JPEG", "Compress PNG"
                    ].map((tool, idx) => (
                      <div key={idx} className="tool-item bg-gray-900/50 rounded-lg border border-gray-800 p-4">
                        <h4 className="text-gray-200 font-medium">{tool}</h4>
                        <p className="text-gray-400 text-sm mt-2">
                          Reduce file size while maintaining quality.
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollArea>
            </div>
            
            <div className="scroll-section">
              <div className="flex items-center gap-3 mb-6">
                <FileImage className="h-6 w-6 text-blue-400" />
                <h3 className="text-xl font-semibold text-gray-100">GIF Converters</h3>
              </div>
              
              <ScrollArea className="h-auto max-h-[400px]">
                <div className="horizontal-scroll-container py-4">
                  <div className="tools-grid">
                    {[
                      "Video to GIF", "MP4 to GIF", "WEBM to GIF", "APNG to GIF",
                      "GIF to MP4", "GIF to APNG", "Image to GIF", "GIF Maker"
                    ].map((tool, idx) => (
                      <div key={idx} className="tool-item bg-gray-900/50 rounded-lg border border-gray-800 p-4">
                        <h4 className="text-gray-200 font-medium">{tool}</h4>
                        <p className="text-gray-400 text-sm mt-2">
                          {tool.includes("to GIF") 
                            ? `Create GIFs from ${tool.split(" to ")[0]} files.` 
                            : tool.includes("GIF to") 
                              ? `Convert GIFs to ${tool.split("GIF to ")[1]} format.`
                              : "Create and edit animated GIFs."}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollArea>
            </div>
            
            <div className="scroll-section">
              <div className="flex items-center gap-3 mb-6">
                <Video className="h-6 w-6 text-blue-400" />
                <h3 className="text-xl font-semibold text-gray-100">Video Tools</h3>
              </div>
              
              <ScrollArea className="h-auto max-h-[400px]">
                <div className="horizontal-scroll-container py-4">
                  <div className="tools-grid">
                    {[
                      "Crop Video", "Video Trimmer"
                    ].map((tool, idx) => (
                      <div key={idx} className="tool-item bg-gray-900/50 rounded-lg border border-gray-800 p-4">
                        <h4 className="text-gray-200 font-medium">{tool}</h4>
                        <p className="text-gray-400 text-sm mt-2">
                          {tool === "Crop Video" 
                            ? "Adjust the dimensions of your video files." 
                            : "Cut and trim video length to your desired duration."}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollArea>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold mb-8 text-center text-gray-100 gradient-text scroll-section">Advanced Features</h2>
          
          <div className="space-y-12 mb-16">
            <div className="grid md:grid-cols-2 gap-8 items-center scroll-section">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-100">Format Support</h3>
                <p className="text-gray-400 mb-4">
                  Our converter supports multiple video formats including MP4, WEBM, and AVI. No matter what format your video is in, you can easily convert it to a high-quality GIF.
                </p>
                <ul className="list-disc list-inside text-gray-400 space-y-2">
                  <li>MP4 (most common video format)</li>
                  <li>WEBM (open web video format)</li>
                  <li>AVI (Windows video format)</li>
                </ul>
              </div>
              <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
                <div className="aspect-video bg-black rounded flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="flex justify-center space-x-4 mb-4">
                      <span className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm">.mp4</span>
                      <span className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm">.webm</span>
                      <span className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm">.avi</span>
                    </div>
                    <p className="text-gray-400">All major video formats supported</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 items-center scroll-section">
              <div className="order-2 md:order-1 bg-gray-900/50 border border-gray-800 rounded-lg p-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-gray-400 text-sm">Quality</label>
                    <div className="h-2 bg-gray-800 rounded-full">
                      <div className="h-full w-3/4 bg-blue-500 rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-gray-400 text-sm">Frame Rate</label>
                    <div className="h-2 bg-gray-800 rounded-full">
                      <div className="h-full w-1/2 bg-blue-500 rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-gray-400 text-sm">File Size</label>
                    <div className="h-2 bg-gray-800 rounded-full">
                      <div className="h-full w-2/3 bg-blue-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="order-1 md:order-2">
                <h3 className="text-xl font-semibold mb-3 text-gray-100">Advanced Controls</h3>
                <p className="text-gray-400 mb-4">
                  Take full control over your GIF creation with advanced customization options. Adjust various parameters to get exactly the GIF you want.
                </p>
                <ul className="list-disc list-inside text-gray-400 space-y-2">
                  <li>Control frames per second (FPS)</li>
                  <li>Adjust quality settings</li>
                  <li>Resize dimensions</li>
                  <li>Trim start and end points</li>
                  <li>Optimize for file size</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="text-center scroll-section">
            <RouterLink to="/">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg button-glow">
                Try It Now
              </Button>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
