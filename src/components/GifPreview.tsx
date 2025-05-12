
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface GifPreviewProps {
  gifBlob: Blob;
}

const GifPreview: React.FC<GifPreviewProps> = ({ gifBlob }) => {
  const gifUrl = React.useMemo(() => {
    return URL.createObjectURL(gifBlob);
  }, [gifBlob]);
  
  React.useEffect(() => {
    return () => {
      URL.revokeObjectURL(gifUrl);
    };
  }, [gifUrl]);
  
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = gifUrl;
    link.download = `converted-${Date.now()}.gif`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className="flex flex-col gap-4">
      <div className="relative rounded-lg overflow-hidden bg-checkerboard">
        <img 
          src={gifUrl} 
          alt="Converted GIF" 
          className="w-full h-auto"
          style={{ maxHeight: '400px' }}
        />
      </div>
      <Button onClick={handleDownload} className="w-full">
        <Download className="mr-2 h-4 w-4" /> Download GIF
      </Button>
    </div>
  );
};

export default GifPreview;
