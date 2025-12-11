import React, { useRef } from 'react';
import { Camera, Upload, X } from 'lucide-react';

interface ImageUploaderProps {
  imagePreview: string | null;
  onImageSelect: (file: File) => void;
  onClear: () => void;
  isLoading: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ 
  imagePreview, 
  onImageSelect, 
  onClear,
  isLoading
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageSelect(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onImageSelect(e.dataTransfer.files[0]);
    }
  };

  if (imagePreview) {
    return (
      <div className="relative w-full aspect-video md:aspect-[2/1] bg-gray-100 rounded-xl overflow-hidden shadow-inner border border-gray-200">
        <img 
          src={imagePreview} 
          alt="Crop Preview" 
          className="w-full h-full object-contain"
        />
        {!isLoading && (
          <button 
            onClick={onClear}
            className="absolute top-4 right-4 bg-white/90 p-2 rounded-full shadow-lg hover:bg-red-50 text-red-600 transition-all"
          >
            <X size={20} />
          </button>
        )}
      </div>
    );
  }

  return (
    <div 
      onClick={() => fileInputRef.current?.click()}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="w-full aspect-video md:aspect-[2/1] border-3 border-dashed border-green-300 rounded-xl bg-green-50 hover:bg-green-100 transition-colors cursor-pointer flex flex-col items-center justify-center p-8 text-center group"
    >
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/*" 
        className="hidden" 
      />
      <div className="bg-green-100 p-4 rounded-full text-green-600 group-hover:scale-110 transition-transform mb-4">
        <Camera size={40} />
      </div>
      <h3 className="text-lg font-semibold text-green-900 mb-2">
        Upload or Take a Photo
      </h3>
      <p className="text-green-700 max-w-sm">
        Click to select a crop image or drag and drop here.
        <br />
        <span className="text-sm opacity-75">Supported: JPG, PNG</span>
      </p>
    </div>
  );
};