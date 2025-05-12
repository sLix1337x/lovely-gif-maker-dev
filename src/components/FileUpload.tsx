
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
    <div className="flex flex-col items-center gap-4 p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
      <Upload className="h-12 w-12 text-gray-400" />
      <h3 className="text-lg font-medium">Drop your video here</h3>
      <p className="text-sm text-gray-500 text-center">
        or click to browse (MP4, WebM, MOV)
      </p>
      <Button 
        variant="outline" 
        onClick={() => fileInputRef.current?.click()}
      >
        Select Video
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="video/mp4,video/webm,video/quicktime"
        className="hidden"
      />
    </div>
  );
};

export default FileUpload;
