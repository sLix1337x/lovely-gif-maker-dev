
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  onFileSelected: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelected }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('video/')) {
        onFileSelected(file);
      } else {
        alert('Please select a valid video file.');
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 border-2 border-dashed border-gray-600/40 rounded-lg bg-black/30 backdrop-blur-sm hover:bg-black/40 transition-colors w-full max-w-md mx-auto">
      <Upload className="h-12 w-12 text-blue-400" />
      <h3 className="text-lg font-medium text-gray-200">Drop your video here</h3>
      <p className="text-sm text-gray-400 text-center">
        Drag & drop your MP4, WEBM, or AVI video file here or click to browse
      </p>
      <div className="flex items-center justify-center">
        <span className="inline-flex items-center text-xs text-gray-400">
          <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div> Max file size: 50MB
        </span>
      </div>
      <Button 
        variant="outline" 
        onClick={() => fileInputRef.current?.click()}
        className="border-gray-600 text-gray-300 hover:bg-gray-800"
      >
        Select Video
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="video/mp4,video/webm,video/x-msvideo,.mp4,.webm,.avi"
        className="hidden"
      />
    </div>
  );
};

export default FileUpload;
