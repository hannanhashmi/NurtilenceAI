
import React, { useState, useCallback, useRef } from 'react';
import { UploadIcon, CameraIcon } from './IconComponents';
import CameraView from './CameraView';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  imageUrl: string | null;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect, imageUrl }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
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

  const handleCapture = (file: File) => {
    onImageSelect(file);
    setShowCamera(false);
  };

  return (
    <>
      <div
        className={`border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 ${isDragging ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-green-400 bg-gray-50'}`}
        onDragEnter={handleDragIn}
        onDragLeave={handleDragOut}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        {imageUrl ? (
          <div className="relative group">
            <img src={imageUrl} alt="Selected food" className="max-h-64 w-auto mx-auto rounded-lg object-contain" />
             <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                <button onClick={openFileDialog} className="bg-white/20 text-white font-semibold py-2 px-4 rounded-lg hover:bg-white/30 transition-colors">Change Image</button>
                <button onClick={() => setShowCamera(true)} className="bg-white/20 text-white font-semibold py-2 px-4 rounded-lg hover:bg-white/30 transition-colors flex items-center gap-2">
                  <CameraIcon /> Retake with Camera
                </button>
             </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <div onClick={openFileDialog} className="cursor-pointer p-4">
              <div className="flex flex-col items-center justify-center space-y-2 text-gray-500">
                <UploadIcon />
                <p className="font-semibold">
                  <span className="text-green-500">Click to upload</span> or drag and drop
                </p>
                <p className="text-sm">SVG, PNG, JPG or GIF</p>
              </div>
            </div>
            
            <div className="my-4 flex w-full max-w-xs items-center text-xs text-gray-400">
                <span className="flex-grow border-t"></span>
                <span className="mx-2 flex-shrink font-semibold">OR</span>
                <span className="flex-grow border-t"></span>
            </div>

            <button
              onClick={() => setShowCamera(true)}
              className="flex items-center gap-2 rounded-lg bg-gray-200 px-6 py-2.5 font-semibold text-gray-700 transition hover:bg-gray-300 active:scale-95"
            >
              <CameraIcon />
              Use Camera
            </button>
          </div>
        )}
      </div>
      {showCamera && <CameraView onCapture={handleCapture} onClose={() => setShowCamera(false)} />}
    </>
  );
};

export default ImageUploader;
