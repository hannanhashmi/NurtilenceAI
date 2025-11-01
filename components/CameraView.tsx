
import React, { useRef, useEffect, useCallback } from 'react';
import { CloseIcon } from './IconComponents';

interface CameraViewProps {
  onCapture: (file: File) => void;
  onClose: () => void;
}

const CameraView: React.FC<CameraViewProps> = ({ onCapture, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        streamRef.current = stream;
      } catch (err) {
        console.error("Error accessing environment camera:", err);
        // Fallback for devices without an environment camera or if permission is denied for it
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
            streamRef.current = stream;
        } catch (fallbackErr) {
            console.error("Error accessing any camera:", fallbackErr);
            alert("Could not access the camera. Please check your browser permissions.");
            onClose();
        }
      }
    };

    startCamera();

    return () => {
      // Cleanup: stop the camera stream when the component unmounts
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [onClose]);

  const handleCapture = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], `capture-${Date.now()}.jpg`, { type: 'image/jpeg' });
            onCapture(file);
          }
        }, 'image/jpeg', 0.95);
      }
    }
  }, [onCapture]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-4 relative max-w-3xl w-full shadow-2xl">
        <video ref={videoRef} autoPlay playsInline className="w-full rounded-lg aspect-video object-cover bg-black"></video>
        <canvas ref={canvasRef} className="hidden"></canvas>
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 bg-black/50 text-white rounded-full p-2 hover:bg-black/75 transition"
          aria-label="Close camera view"
        >
          <CloseIcon />
        </button>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex justify-center">
            <button 
                onClick={handleCapture} 
                className="w-16 h-16 bg-white rounded-full flex items-center justify-center ring-4 ring-white/30 hover:ring-white/50 transition transform active:scale-90"
                aria-label="Capture photo"
            >
                <div className="w-14 h-14 bg-white rounded-full border-2 border-black"></div>
            </button>
        </div>
      </div>
    </div>
  );
};

export default CameraView;
