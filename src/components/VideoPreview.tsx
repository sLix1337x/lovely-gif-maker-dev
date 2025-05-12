
import React, { useRef, useEffect } from 'react';

interface VideoPreviewProps {
  videoFile: File;
}

const VideoPreview: React.FC<VideoPreviewProps> = ({ videoFile }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    if (videoRef.current && videoFile) {
      const url = URL.createObjectURL(videoFile);
      videoRef.current.src = url;
      
      return () => URL.revokeObjectURL(url);
    }
  }, [videoFile]);
  
  return (
    <div className="relative rounded-lg overflow-hidden bg-black">
      <video 
        ref={videoRef}
        controls
        className="w-full h-auto"
        style={{ maxHeight: '400px' }}
      />
    </div>
  );
};

export default VideoPreview;
