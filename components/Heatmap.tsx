import React from 'react';
import { Map, AlertTriangle, ShieldCheck } from 'lucide-react';
import { LocationData } from '../types';

interface HeatmapProps {
  userLocation: LocationData | null;
}

export const Heatmap: React.FC<HeatmapProps> = ({ userLocation }) => {
  // Mock data to simulate nearby reports
  const mockAlerts = [
    { id: 1, disease: 'Early Blight', distance: '2.4 km', risk: 'High', time: '2 hours ago' },
    { id: 2, disease: 'Leaf Curl', distance: '5.1 km', risk: 'Moderate', time: 'Yesterday' },
    { id: 3, disease: 'Stem Borer', distance: '8.3 km', risk: 'Low', time: '2 days ago' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="bg-green-800 p-4 text-white">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Map size={24} /> Regional Risk Radar
          </h2>
          <p className="text-green-200 text-sm mt-1">
            Real-time disease reports from farmers near you.
          </p>
        </div>

        {/* Map Visualization Placeholder */}
        <div className="relative w-full aspect-[16/9] bg-green-50 overflow-hidden flex items-center justify-center border-b border-gray-100">
           {/* Abstract Map Design */}
           <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-500 to-transparent"></div>
           
           {/* Radar Rings */}
           <div className="absolute w-64 h-64 border border-green-300 rounded-full animate-ping opacity-20"></div>
           <div className="absolute w-48 h-48 border border-green-400 rounded-full opacity-30"></div>
           
           {/* Center (User) */}
           <div className="relative z-10 flex flex-col items-center">
             <div className="w-5 h-5 bg-blue-600 rounded-full border-2 border-white shadow-xl animate-pulse ring-4 ring-blue-500/20"></div>
             
             {/* Location Label */}
             <div className="mt-2 flex flex-col items-center bg-white/95 px-3 py-1.5 rounded-lg shadow-md border border-blue-100 backdrop-blur-sm transform transition-all hover:scale-105 cursor-default">
                <span className="text-xs font-bold text-blue-700 flex items-center gap-1">
                   You are here
                </span>
                {userLocation ? (
                  <span className="text-[10px] text-gray-500 font-mono mt-0.5">
                    {userLocation.latitude.toFixed(4)}, {userLocation.longitude.toFixed(4)}
                  </span>
                ) : (
                   <span className="text-[10px] text-amber-600 font-medium mt-0.5">
                    Location unavailable
                  </span>
                )}
             </div>
           </div>

           {/* Alerts on "Map" */}
           <div className="absolute top-1/4 left-1/4 flex flex-col items-center opacity-80 hover:opacity-100 transition-opacity cursor-pointer">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce shadow-lg"></div>
              <span className="text-[10px] font-bold text-red-700 bg-white/90 px-1.5 py-0.5 rounded-full shadow-sm border border-red-100 mt-1">Blight</span>
           </div>
           <div className="absolute bottom-1/3 right-1/4 flex flex-col items-center opacity-80 hover:opacity-100 transition-opacity cursor-pointer">
              <div className="w-3 h-3 bg-amber-500 rounded-full shadow-lg"></div>
              <span className="text-[10px] font-bold text-amber-700 bg-white/90 px-1.5 py-0.5 rounded-full shadow-sm border border-amber-100 mt-1">Pest</span>
           </div>
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
             <h3 className="font-semibold text-gray-800">Nearby Outbreaks</h3>
             <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full font-medium">3 Active Alerts</span>
          </div>

          <div className="space-y-3">
            {mockAlerts.map(alert => (
              <div key={alert.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100 hover:border-green-200 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${alert.risk === 'High' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'}`}>
                    <AlertTriangle size={18} />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{alert.disease}</div>
                    <div className="text-xs text-gray-500">{alert.time} • {alert.distance} away</div>
                  </div>
                </div>
                <div className={`text-xs font-bold px-2 py-1 rounded ${
                    alert.risk === 'High' ? 'text-red-700 bg-red-50' : 
                    alert.risk === 'Moderate' ? 'text-amber-700 bg-amber-50' : 
                    'text-green-700 bg-green-50'
                }`}>
                  {alert.risk} Risk
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
        <ShieldCheck className="text-blue-600 shrink-0 mt-0.5" size={20} />
        <div>
           <h4 className="font-semibold text-blue-900">Government Advisory</h4>
           <p className="text-sm text-blue-700 mt-1">
             High incidence of Early Blight detected in your district. Preventive spraying of Mancozeb 75 WP recommended by PMFBY guidelines.
           </p>
        </div>
      </div>
    </div>
  );
};