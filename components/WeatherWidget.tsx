import React from 'react';
import { CloudRain, Sun, Wind, TrendingUp } from 'lucide-react';

export const WeatherWidget: React.FC = () => {
  // In a real app, fetch based on lat/long. Using mock data for reliable demo.
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
      {/* Weather Card */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <CloudRain size={80} />
        </div>
        <div className="relative z-10">
          <h3 className="text-blue-100 font-medium text-sm">Current Weather</h3>
          <div className="flex items-center gap-4 mt-1">
            <span className="text-4xl font-bold">28°C</span>
            <div className="flex flex-col text-sm">
              <span className="flex items-center gap-1"><Sun size={14} /> Sunny</span>
              <span className="flex items-center gap-1"><Wind size={14} /> 12 km/h NW</span>
            </div>
          </div>
          <div className="mt-3 text-xs bg-white/20 inline-block px-2 py-1 rounded">
            Rain expected in 2 days. Plan spraying accordingly.
          </div>
        </div>
      </div>

      {/* Market Price Card (Mandi Bhav) */}
      <div className="bg-white rounded-xl p-4 shadow-lg border border-green-100 relative overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-green-800 font-bold flex items-center gap-2">
            <TrendingUp size={18} /> Mandi Bhav
          </h3>
          <span className="text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full">Live</span>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm border-b border-dashed border-gray-200 pb-1">
            <span className="text-gray-600">Wheat (Lokwan)</span>
            <span className="font-bold text-gray-900">₹2,450 / qt</span>
          </div>
          <div className="flex justify-between items-center text-sm border-b border-dashed border-gray-200 pb-1">
            <span className="text-gray-600">Paddy (Basmati)</span>
            <span className="font-bold text-gray-900">₹3,800 / qt</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Tomato (Hybrid)</span>
            <span className="font-bold text-gray-900">₹1,200 / qt</span>
          </div>
        </div>
      </div>
    </div>
  );
};