
import React, { useState, useCallback } from 'react';
import { AnalysisResult } from './types';
import { analyzeFoodImage } from './services/geminiService';
import ImageUploader from './components/ImageUploader';
import ResultDisplay from './components/ResultDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import { LogoIcon } from './components/IconComponents';

const App: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = useCallback((file: File) => {
    const MAX_FILE_SIZE_MB = 4;
    const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
    
    if (file.size > MAX_FILE_SIZE_BYTES) {
        setError(`Image file is too large. Please select an image under ${MAX_FILE_SIZE_MB}MB.`);
        setImageFile(null);
        setImageUrl(null);
        return;
    }

    setImageFile(file);
    setAnalysisResult(null);
    setError(null);
    const newImageUrl = URL.createObjectURL(file);
    setImageUrl(newImageUrl);
  }, []);

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result.split(',')[1]);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleAnalyzeClick = async () => {
    if (!imageFile) {
      setError('Please select an image first.');
      return;
    }

    setIsLoading(true);
    setAnalysisResult(null);
    setError(null);

    try {
      const base64Data = await fileToBase64(imageFile);
      const imageData = {
        mimeType: imageFile.type,
        data: base64Data,
      };
      
      const result = await analyzeFoodImage(imageData);

      if (result.isFoodUnclear) {
        setError("The food in the image is unclear. Could you please try a different one?");
      } else {
        setAnalysisResult(result);
      }
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred during analysis. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800 font-sans antialiased">
      <main className="container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-8">
          <div className="flex justify-center items-center gap-3 mb-2">
            <LogoIcon />
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500">
              NutriLens AI
            </h1>
          </div>
          <p className="text-gray-600 text-lg">Your AI Nutrition & Recipe Assistant</p>
        </header>

        <div className="max-w-3xl mx-auto bg-white p-6 md:p-8 rounded-2xl shadow-lg">
          <ImageUploader onImageSelect={handleImageSelect} imageUrl={imageUrl} />
          
          <div className="mt-6">
            <button
              onClick={handleAnalyzeClick}
              disabled={!imageFile || isLoading}
              className="w-full bg-green-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center shadow-md disabled:shadow-none"
            >
              {isLoading ? (
                <>
                  <LoadingSpinner />
                  <span className="ml-2">Analyzing...</span>
                </>
              ) : (
                'Analyze Food'
              )}
            </button>
          </div>
        </div>

        {error && (
          <div className="max-w-3xl mx-auto mt-6 text-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg" role="alert">
            <p>{error}</p>
          </div>
        )}
        
        {analysisResult && !isLoading && (
            <div className="mt-8 transition-opacity duration-700 ease-in opacity-100">
                <ResultDisplay result={analysisResult} />
            </div>
        )}
      </main>
      <footer className="text-center py-4 mt-8">
        <p className="text-gray-500 text-sm">Powered by Hannan Hashmi</p>
      </footer>
    </div>
  );
};

export default App;
