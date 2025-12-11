import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { AnalysisCard } from './components/AnalysisCard';
import { Heatmap } from './components/Heatmap';
import { WeatherWidget } from './components/WeatherWidget';
import { AdvisoryFeed } from './components/AdvisoryFeed';
import { analyzeCropImage } from './services/geminiService';
import { LocationData, AnalysisState, ClaimRecord } from './types';
import { MapPin, Loader2, Info, Scan, Map as MapIcon, Calendar, Sprout, ClipboardList, Clock, ChevronRight } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'scan' | 'map' | 'history'>('scan');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [location, setLocation] = useState<LocationData | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [claims, setClaims] = useState<ClaimRecord[]>([]);
  
  const [analysis, setAnalysis] = useState<AnalysisState>({
    isLoading: false,
    error: null,
    result: null,
  });

  // Get Location on Mount
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.warn("Geolocation error:", error);
          setLocationError("Could not fetch location. Trust score will be lower.");
        }
      );
    } else {
      setLocationError("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleImageSelect = (file: File) => {
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    setAnalysis({ isLoading: false, error: null, result: null });
  };

  const handleClear = () => {
    setImageFile(null);
    setImagePreview(null);
    setAnalysis({ isLoading: false, error: null, result: null });
  };

  const handleAnalyze = async () => {
    if (!imageFile) return;

    setAnalysis({ isLoading: true, error: null, result: null });

    try {
      const getBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            const result = reader.result as string;
            const base64 = result.split(',')[1]; 
            resolve(base64);
          };
          reader.onerror = (error) => reject(error);
        });
      };

      const base64Image = await getBase64(imageFile);
      const result = await analyzeCropImage(base64Image, location);

      setAnalysis({
        isLoading: false,
        error: null,
        result: result,
      });

    } catch (err: any) {
      setAnalysis({
        isLoading: false,
        error: err.message || "Failed to analyze image. Please try again.",
        result: null,
      });
    }
  };

  const handleClaimSubmit = (claim: ClaimRecord) => {
    setClaims(prev => [claim, ...prev]);
    // Switch to history tab after a short delay to show the user the status
    setTimeout(() => setActiveTab('history'), 500);
  };

  return (
    <div className="min-h-screen pb-24 bg-[#f0fdf4]">
      <Header />

      <main className="max-w-4xl mx-auto px-4 pt-6 space-y-6">
        
        {/* Verification Status Bar */}
        <div className="flex flex-col md:flex-row md:items-center gap-3 bg-white p-3 rounded-xl shadow-sm border border-green-100">
          <div className="flex items-center gap-2 text-sm text-gray-600 flex-1">
             <div className={`p-1.5 rounded-full ${location ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
               <MapPin size={16} />
             </div>
             <span>
              {location 
                ? `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`
                : "Locating..."}
             </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 flex-1 border-t md:border-t-0 md:border-l border-gray-100 pt-2 md:pt-0 md:pl-3">
             <div className="p-1.5 rounded-full bg-blue-100 text-blue-700">
               <Calendar size={16} />
             </div>
             <span>{new Date().toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })} • {new Date().toLocaleTimeString('en-IN', {hour: '2-digit', minute:'2-digit'})}</span>
          </div>
        </div>

        {locationError && (
            <div className="w-full p-3 bg-amber-50 text-amber-700 border border-amber-200 rounded-lg flex items-center gap-2 text-xs">
              <Info size={16} />
              {locationError}
            </div>
        )}

        {/* Tab Content */}
        {activeTab === 'scan' ? (
          <div className="space-y-6 animate-fade-in">
            
            {/* Show Dashboard on Start */}
            {!imageFile && !analysis.result && (
              <>
                <WeatherWidget />
                <AdvisoryFeed />
              </>
            )}

            <ImageUploader 
              imagePreview={imagePreview} 
              onImageSelect={handleImageSelect} 
              onClear={handleClear}
              isLoading={analysis.isLoading}
            />

            {imageFile && !analysis.result && !analysis.isLoading && (
              <button
                onClick={handleAnalyze}
                className="w-full py-4 bg-green-700 hover:bg-green-800 text-white text-lg font-bold rounded-xl shadow-lg transition-all transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
              >
                <Sprout size={24} />
                Ask Dr. Gemini
              </button>
            )}

            {analysis.isLoading && (
              <div className="w-full py-8 bg-white border border-gray-100 rounded-xl shadow-sm flex flex-col items-center justify-center gap-3 text-green-700">
                <Loader2 className="animate-spin" size={40} />
                <p className="font-medium animate-pulse text-lg">Dr. Gemini is analyzing...</p>
                <p className="text-sm text-green-600/70">Checking crops, medicines, and insurance rules...</p>
              </div>
            )}

            {analysis.error && (
              <div className="w-full p-4 bg-red-50 text-red-700 border border-red-200 rounded-xl flex items-start gap-3">
                <Info className="shrink-0 mt-0.5" size={20} />
                <p>{analysis.error}</p>
              </div>
            )}

            {analysis.result && (
              <div className="space-y-6">
                <AnalysisCard 
                  result={analysis.result} 
                  location={location} 
                  onSubmitClaim={handleClaimSubmit}
                />
                <button 
                  onClick={handleClear}
                  className="w-full py-3 bg-white text-green-700 font-semibold rounded-xl border border-green-200 shadow-sm hover:bg-green-50"
                >
                  Scan Another Crop
                </button>
              </div>
            )}
          </div>
        ) : activeTab === 'map' ? (
          <Heatmap userLocation={location} />
        ) : (
          /* History Tab */
          <div className="space-y-4 animate-fade-in">
             <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                   <ClipboardList className="text-green-600" /> My Applications
                </h2>
                <p className="text-gray-500 text-sm mt-1">Track your PMFBY claim status.</p>
             </div>

             {claims.length === 0 ? (
               <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                  <ClipboardList size={48} className="mb-2 opacity-50" />
                  <p>No claims submitted yet.</p>
               </div>
             ) : (
               <div className="space-y-3">
                 {claims.map((claim) => (
                   <div key={claim.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                      <div className="flex items-start gap-3">
                        <div className="bg-yellow-100 p-2 rounded-full text-yellow-700 mt-1">
                           <Clock size={20} />
                        </div>
                        <div>
                           <div className="font-bold text-gray-900">{claim.disease} Claim</div>
                           <div className="text-xs text-gray-500 font-mono mt-0.5">{claim.id}</div>
                           <div className="text-sm text-gray-600 mt-1">{claim.date} • {claim.amount}</div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                         <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded-full">
                           {claim.status}
                         </span>
                         <button className="text-green-600 hover:text-green-800">
                            <ChevronRight />
                         </button>
                      </div>
                   </div>
                 ))}
               </div>
             )}
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg px-6 py-2 pb-5 z-50">
        <div className="max-w-md mx-auto flex justify-around">
          <button 
            onClick={() => setActiveTab('scan')}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors ${activeTab === 'scan' ? 'text-green-700' : 'text-gray-400 hover:text-green-600'}`}
          >
            <Scan size={24} strokeWidth={activeTab === 'scan' ? 2.5 : 2} />
            <span className="text-xs font-medium mt-1">Farm Tools</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('map')}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors ${activeTab === 'map' ? 'text-green-700' : 'text-gray-400 hover:text-green-600'}`}
          >
            <MapIcon size={24} strokeWidth={activeTab === 'map' ? 2.5 : 2} />
            <span className="text-xs font-medium mt-1">Risk Map</span>
          </button>

          <button 
            onClick={() => setActiveTab('history')}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors ${activeTab === 'history' ? 'text-green-700' : 'text-gray-400 hover:text-green-600'}`}
          >
            <ClipboardList size={24} strokeWidth={activeTab === 'history' ? 2.5 : 2} />
            <span className="text-xs font-medium mt-1">Claims</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;