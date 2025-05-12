
import React, { useState } from 'react';
import FileUpload from '@/components/FileUpload';
import VideoPreview from '@/components/VideoPreview';
import GifPreview from '@/components/GifPreview';
import ConversionOptions from '@/components/ConversionOptions';
import { Button } from '@/components/ui/button';
import { convertVideoToGif, ConversionOptions as GifOptions } from '@/utils/gifConverter';
import { toast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Wand2 } from 'lucide-react';
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
      <div className="container mx-auto py-16 px-4 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 pointer-events-none">
          <div className="glow-effect h-full w-full"></div>
        </div>
        
        <header className="text-center mb-16 relative z-10">
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">MP4 to GIF Converter</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Convert your videos to GIFs right in your browser, no upload needed!
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-10 relative z-10">
          <div className="space-y-8">
            {!videoFile ? (
              <Card className="border border-gray-700 bg-secondary/50 backdrop-blur-sm overflow-hidden">
                <CardContent className="pt-6">
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
      </div>
    </div>
  );
};

export default Index;
