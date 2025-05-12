
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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50">
      <div className="container mx-auto py-8 px-4">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4 text-blue-900">MP4 to GIF Converter</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Convert your videos to GIFs right in your browser, no upload needed!
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-8">
            {!videoFile ? (
              <Card>
                <CardContent className="pt-6">
                  <FileUpload onFileSelected={handleFileSelected} />
                </CardContent>
              </Card>
            ) : (
              <>
                <Card>
                  <CardContent className="pt-6">
                    <VideoPreview videoFile={videoFile} />
                  </CardContent>
                </Card>
                <div>
                  <Button 
                    variant="outline" 
                    onClick={() => setVideoFile(null)}
                    className="w-full"
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
              <div className="flex justify-center">
                <Button 
                  onClick={handleConvert}
                  disabled={isConverting || !videoFile}
                  className="text-lg px-8 py-6"
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
              <Card>
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
