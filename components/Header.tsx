import React from 'react';
import { Leaf, Sprout } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-green-700 text-white shadow-lg">
      <div className="max-w-4xl mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-white p-2 rounded-full text-green-700">
            <Sprout size={28} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Kisan-Vibe</h1>
            <p className="text-green-100 text-sm font-medium">AI Crop Doctor & Insurance Assistant</p>
          </div>
        </div>
      
      </div>
    </header>
  );
};