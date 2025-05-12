
import React, { useState, useEffect } from 'react';
import FileUpload from '@/components/FileUpload';
import VideoPreview from '@/components/VideoPreview';
import GifPreview from '@/components/GifPreview';
import ConversionOptions from '@/components/ConversionOptions';
import { Button } from '@/components/ui/button';
import { convertVideoToGif, ConversionOptions as GifOptions } from '@/utils/gifConverter';
import { toast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Wand2, Zap, Lock, CircleDollarSign, Settings, Check, FileVideo, Video } from 'lucide-react';
import MainNav from '@/components/MainNav';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

// Component to create animated particles in the background
const ParticleBackground = () => {
  useEffect(() => {
    const particlesContainer = document.querySelector('.bg-particles');
    if (!particlesContainer) return;
    
    const createParticle = () => {
      const particle = document.createElement('span');
      particle.className = 'particle';
      
      // Randomize position, size and animation
      const size = Math.random() * 5 + 2;
      const posX = Math.random() * window.innerWidth;
      const posY = Math.random() * window.innerHeight;
      const delay = Math.random() * 5;
      const duration = Math.random() * 10 + 5;
      
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${posX}px`;
      particle.style.top = `${posY}px`;
      particle.style.opacity = `${Math.random() * 0.5 + 0.1}`;
      particle.style.animation = `floating ${duration}s ease-in-out ${delay}s infinite alternate`;
      
      particlesContainer.appendChild(particle);
      
      // Remove particle after some time
      setTimeout(() => {
        if (particle.parentNode === particlesContainer) {
          particlesContainer.removeChild(particle);
        }
      }, duration * 1000);
    };
    
    // Create initial particles
    for (let i = 0; i < 30; i++) {
      createParticle();
    }
    
    // Add new particles periodically
    const interval = setInterval(() => {
      if (document.querySelectorAll('.particle').length < 50) {
        createParticle();
      }
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);
  
  return <div className="bg-particles"></div>;
};

// Animation observer to trigger animations when scrolled into view
const useScrollAnimation = () => {
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
};

const Index = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [gifBlob, setGifBlob] = useState<Blob | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [conversionOptions, setConversionOptions] = useState<GifOptions>({
    fps: 10,
    quality: 10,
    trimEnabled: false,
    startTime: 0
  });
  
  // Use the scroll animation hook
  useScrollAnimation();
  
  const handleFileSelected = (file: File) => {
    setVideoFile(file);
    setGifBlob(null);
    
    toast({
      title: "File selected",
      description: `${file.name} is ready for conversion.`
    });
  };
  
  const handleConvert = async () => {
    if (!videoFile) return;
    setIsConverting(true);
    try {
      const blob = await convertVideoToGif(videoFile, conversionOptions);
      setGifBlob(blob);
      toast({
        title: "Conversion successful!",
        description: "Your GIF has been created. You can now download it."
      });
    } catch (error) {
      console.error('Conversion error:', error);
      toast({
        title: "Conversion failed",
        description: "There was an error converting your video. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsConverting(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-dark">
      <Helmet>
        <title>MP4 to GIF Converter | Convert Videos to GIFs Online for Free</title>
        <meta name="description" content="Convert MP4, WEBM, and AVI videos to high-quality GIFs with our free online converter. No uploads required - everything happens in your browser." />
        <meta name="keywords" content="MP4 to GIF, video to GIF, GIF converter, online converter, free converter, browser-based converter, webm to gif, avi to gif" />
        <meta property="og:title" content="MP4 to GIF Converter | Free Online Video to GIF Tool" />
        <meta property="og:description" content="Convert your videos to GIFs right in your browser. Free, fast, and privacy-focused with no uploads required." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://gifconvert.app" />
      </Helmet>
      
      <MainNav />
      <ParticleBackground />
      
      <div className="container mx-auto py-10 px-4 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 pointer-events-none">
          <div className="glow-effect h-full w-full"></div>
        </div>
        
        <header className="text-center mb-16 relative z-10 max-w-3xl mx-auto scroll-section">
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">MP4 to GIF Converter</h1>
          <p className="text-lg text-gray-300">
            Convert your videos to GIFs right in your browser, no upload needed!
          </p>
        </header>

        <div className="grid md:grid-cols-1 gap-10 relative z-10 max-w-3xl mx-auto scroll-section">
          <div className="space-y-8">
            {!videoFile ? (
              <Card className="border border-gray-700 bg-secondary/50 backdrop-blur-sm overflow-hidden">
                <CardContent className="pt-6 flex justify-center">
                  <FileUpload onFileSelected={handleFileSelected} />
                </CardContent>
              </Card>
            ) : (
              <>
                <Card className="border border-gray-700 bg-secondary/50 backdrop-blur-sm overflow-hidden">
                  <CardContent className="pt-6">
                    <VideoPreview videoFile={videoFile} />
                  </CardContent>
                </Card>
                <div>
                  <Button variant="outline" onClick={() => setVideoFile(null)} className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-gray-100">
                    Choose Different Video
                  </Button>
                </div>
              </>
            )}

            {videoFile && <ConversionOptions options={conversionOptions} onChange={setConversionOptions} videoFile={videoFile} />}
          </div>

          <div className="flex flex-col gap-8">
            {videoFile && (
              <div className="flex justify-center mb-8">
                <Button onClick={handleConvert} disabled={isConverting || !videoFile} className="text-lg px-8 py-6 button-glow bg-blue-600 hover:bg-blue-700 transition-all">
                  {isConverting ? (
                    <>
                      <div className="spinner mr-2"></div> Converting...
                    </>
                  ) : (
                    <>
                      <Wand2 className="mr-2" /> Convert to GIF
                    </>
                  )}
                </Button>
              </div>
            )}

            {gifBlob && (
              <Card className="border border-gray-700 bg-secondary/50 backdrop-blur-sm overflow-hidden blue-glow">
                <CardContent className="pt-6">
                  <GifPreview gifBlob={gifBlob} />
                </CardContent>
              </Card>
            )}
          </div>
        </div>
        
        {/* Features Section */}
        <section id="features" className="relative z-10 max-w-3xl mx-auto mt-24 scroll-section">
          <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
            Why Choose Our MP4 to GIF Converter?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center p-6 transform hover:translate-y-[-5px] transition-transform duration-300">
              <div className="bg-blue-500/20 p-4 rounded-full mb-4 floating">
                <Zap className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-100">Fast Conversion</h3>
              <p className="text-gray-400 text-sm">
                Convert videos to GIFs in seconds with our optimized processing.
              </p>
            </div>
            
            <div className="flex flex-col items-center p-6 transform hover:translate-y-[-5px] transition-transform duration-300">
              <div className="bg-blue-500/20 p-4 rounded-full mb-4 floating">
                <Lock className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-100">Privacy Focused</h3>
              <p className="text-gray-400 text-sm">
                All processing happens in your browser - we never see your files.
              </p>
            </div>
            
            <div className="flex flex-col items-center p-6 transform hover:translate-y-[-5px] transition-transform duration-300">
              <div className="bg-blue-500/20 p-4 rounded-full mb-4 floating">
                <CircleDollarSign className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-100">100% Free</h3>
              <p className="text-gray-400 text-sm">
                No watermarks, no subscriptions, no hidden fees.
              </p>
            </div>
            
            <div className="flex flex-col items-center p-6 transform hover:translate-y-[-5px] transition-transform duration-300">
              <div className="bg-blue-500/20 p-4 rounded-full mb-4 floating">
                <Settings className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-100">Customizable</h3>
              <p className="text-gray-400 text-sm">
                Adjust quality, duration, and frames to get perfect GIFs.
              </p>
            </div>
          </div>
        </section>

        {/* Supported Formats */}
        <section className="relative z-10 max-w-3xl mx-auto mt-24 scroll-section">
          <h2 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
            Supported Formats
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800 transform hover:scale-105 transition-transform duration-300">
              <div className="flex justify-center mb-4">
                <FileVideo className="h-12 w-12 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-100">MP4</h3>
              <p className="text-gray-400 text-sm">
                The most common video format with excellent compression.
              </p>
            </div>
            
            <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800 transform hover:scale-105 transition-transform duration-300">
              <div className="flex justify-center mb-4">
                <Video className="h-12 w-12 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-100">WEBM</h3>
              <p className="text-gray-400 text-sm">
                Open web video format popular for online streaming.
              </p>
            </div>
            
            <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800 transform hover:scale-105 transition-transform duration-300">
              <div className="flex justify-center mb-4">
                <FileVideo className="h-12 w-12 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-100">AVI</h3>
              <p className="text-gray-400 text-sm">
                Classic video container format with wide compatibility.
              </p>
            </div>
          </div>
        </section>
        
        {/* How to Convert Section */}
        <section id="how-to" className="relative z-10 max-w-3xl mx-auto mt-24 scroll-section">
          <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
            How to Convert MP4 to GIF
          </h2>
          
          <div className="space-y-6 max-w-2xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white font-medium">1</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-100 mb-2">Upload your video file</h3>
                <p className="text-gray-400">Drag & drop your MP4, WEBM, or AVI file or click to browse and select a video.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white font-medium">2</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-100 mb-2">Adjust conversion settings</h3>
                <p className="text-gray-400">Set your preferred frame rate, quality, and trim duration for the perfect GIF.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white font-medium">3</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-100 mb-2">Click "Convert to GIF"</h3>
                <p className="text-gray-400">Start the conversion process with a single click.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white font-medium">4</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-100 mb-2">Preview your GIF</h3>
                <p className="text-gray-400">Once processing is complete, you'll see a preview of your new GIF.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white font-medium">5</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-100 mb-2">Download your GIF</h3>
                <p className="text-gray-400">Save your newly created GIF to your device.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="border-t border-gray-800 mt-20 pt-6 pb-10 text-center text-gray-400 text-sm relative z-10 scroll-section">
          <div className="max-w-3xl mx-auto">
            <p className="mb-4">© 2025 Free MP4 to GIF Converter by sLix1337. All rights reserved.</p>
            <div className="flex justify-center space-x-6">
              <RouterLink to="/privacy-policy" className="hover:text-gray-300 transition-colors">Privacy Policy</RouterLink>
              <RouterLink to="/terms-of-service" className="hover:text-gray-300 transition-colors">Terms of Service</RouterLink>
              <RouterLink to="/contact" className="hover:text-gray-300 transition-colors">Contact</RouterLink>
              <RouterLink to="/about" className="hover:text-gray-300 transition-colors">About</RouterLink>
              <RouterLink to="/features" className="hover:text-gray-300 transition-colors">Features</RouterLink>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
