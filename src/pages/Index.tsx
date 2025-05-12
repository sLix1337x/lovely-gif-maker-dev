
import React, { useState } from 'react';
import FileUpload from '@/components/FileUpload';
import VideoPreview from '@/components/VideoPreview';
import GifPreview from '@/components/GifPreview';
import ConversionOptions from '@/components/ConversionOptions';
import { Button } from '@/components/ui/button';
import { convertVideoToGif, ConversionOptions as GifOptions } from '@/utils/gifConverter';
import { toast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Wand2, Zap, Lock, CircleDollarSign, Settings, Info, Check } from 'lucide-react';
import MainNav from '@/components/MainNav';

const Index = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [gifBlob, setGifBlob] = useState<Blob | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [conversionOptions, setConversionOptions] = useState<GifOptions>({
    fps: 10,
    quality: 10
  });

  const handleFileSelected = (file: File) => {
    setVideoFile(file);
    setGifBlob(null);
  };

  const handleConvert = async () => {
    if (!videoFile) return;
    
    setIsConverting(true);
    
    try {
      const blob = await convertVideoToGif(videoFile, conversionOptions);
      setGifBlob(blob);
      toast({
        title: "Conversion successful!",
        description: "Your GIF has been created. You can now download it.",
      });
    } catch (error) {
      console.error('Conversion error:', error);
      toast({
        title: "Conversion failed",
        description: "There was an error converting your video. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-dark">
      <MainNav />
      <div className="container mx-auto py-10 px-4 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 pointer-events-none">
          <div className="glow-effect h-full w-full"></div>
        </div>
        
        <header className="text-center mb-16 relative z-10">
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">MP4 to GIF Converter</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Convert your videos to GIFs right in your browser, no upload needed!
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-10 relative z-10 max-w-5xl mx-auto">
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
                  <Button 
                    variant="outline" 
                    onClick={() => setVideoFile(null)}
                    className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-gray-100"
                  >
                    Choose Different Video
                  </Button>
                </div>
              </>
            )}

            {videoFile && (
              <ConversionOptions 
                options={conversionOptions} 
                onChange={setConversionOptions} 
              />
            )}
          </div>

          <div className="flex flex-col gap-8">
            {videoFile && (
              <div className="flex justify-center mb-8">
                <Button 
                  onClick={handleConvert}
                  disabled={isConverting || !videoFile}
                  className="text-lg px-8 py-6 button-glow bg-blue-600 hover:bg-blue-700 transition-all"
                >
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
        <section id="features" className="py-20 relative z-10 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
            Why Choose Our MP4 to GIF Converter?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center p-6">
              <div className="bg-blue-500/20 p-4 rounded-full mb-4">
                <Zap className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-100">Fast Conversion</h3>
              <p className="text-gray-400 text-sm">
                Convert videos to GIFs in seconds with our optimized processing.
              </p>
            </div>
            
            <div className="flex flex-col items-center p-6">
              <div className="bg-blue-500/20 p-4 rounded-full mb-4">
                <Lock className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-100">Privacy Focused</h3>
              <p className="text-gray-400 text-sm">
                All processing happens in your browser - we never see your files.
              </p>
            </div>
            
            <div className="flex flex-col items-center p-6">
              <div className="bg-blue-500/20 p-4 rounded-full mb-4">
                <CircleDollarSign className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-100">100% Free</h3>
              <p className="text-gray-400 text-sm">
                No watermarks, no subscriptions, no hidden fees.
              </p>
            </div>
            
            <div className="flex flex-col items-center p-6">
              <div className="bg-blue-500/20 p-4 rounded-full mb-4">
                <Settings className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-100">Customizable</h3>
              <p className="text-gray-400 text-sm">
                Adjust quality, duration, and frames to get perfect GIFs.
              </p>
            </div>
          </div>
        </section>
        
        {/* How to Convert Section */}
        <section id="how-to" className="py-16 relative z-10 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
            How to Convert MP4 to GIF
          </h2>
          
          <div className="space-y-6 max-w-2xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white font-medium">1</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-100 mb-2">Upload your MP4 video file</h3>
                <p className="text-gray-400">Drag & drop your file or click to browse and select a video file.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white font-medium">2</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-100 mb-2">Adjust conversion settings (optional)</h3>
                <p className="text-gray-400">Set your preferred frame rate, quality, and dimensions for the output GIF.</p>
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
                <h3 className="text-xl font-semibold text-gray-100 mb-2">Wait a moment for processing to complete</h3>
                <p className="text-gray-400">The time depends on your video's length and your selected options.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white font-medium">5</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-100 mb-2">Download your new GIF file</h3>
                <p className="text-gray-400">Get your newly created GIF and use it wherever you want!</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="border-t border-gray-800 mt-20 pt-6 pb-10 text-center text-gray-400 text-sm relative z-10">
          <div className="max-w-5xl mx-auto">
            <p className="mb-4">© 2025 Free MP4 to GIF Converter by sLix1337. All rights reserved.</p>
            <div className="flex justify-center space-x-6">
              <a href="#" className="hover:text-gray-300">Privacy Policy</a>
              <a href="#" className="hover:text-gray-300">Terms of Service</a>
              <a href="#" className="hover:text-gray-300">Contact</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
