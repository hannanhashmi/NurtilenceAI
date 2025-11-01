
import React, { useState, useCallback, useRef } from 'react';
import { UploadIcon } from './IconComponents';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  imageUrl: string | null;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect, imageUrl }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    handleDrag(e);
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  }, [handleDrag]);
  
  const handleDragOut = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    handleDrag(e);
    setIsDragging(false);
  }, [handleDrag]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    handleDrag(e);
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        onImageSelect(file);
      }
      e.dataTransfer.clearData();
    }
  }, [handleDrag, onImageSelect]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onImageSelect(e.target.files[0]);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-300 ${isDragging ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-green-400 bg-gray-50'}`}
      onDragEnter={handleDragIn}
      onDragLeave={handleDragOut}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={openFileDialog}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      {imageUrl ? (
        <div className="relative">
          <img src={imageUrl} alt="Selected food" className="max-h-64 w-auto mx-auto rounded-lg object-contain" />
           <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-lg">
              <p className="text-white font-semibold">Click or drag to change image</p>
           </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-2 text-gray-500">
          <UploadIcon />
          <p className="font-semibold">
            <span className="text-green-500">Click to upload</span> or drag and drop
          </p>
          <p className="text-sm">SVG, PNG, JPG or GIF</p>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
