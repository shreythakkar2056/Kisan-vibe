import React, { useState } from 'react';
import { AnalysisResult, LocationData, ClaimRecord } from '../types';
import { AlertTriangle, CheckCircle, ShieldAlert, ShieldCheck, Activity, Volume2, StopCircle, BadgeCheck, Stethoscope, ShoppingBag, ArrowRight } from 'lucide-react';
import { ClaimModal } from './ClaimModal';

interface AnalysisCardProps {
  result: AnalysisResult;
  location: LocationData | null;
  onSubmitClaim: (claim: ClaimRecord) => void;
}

export const AnalysisCard: React.FC<AnalysisCardProps> = ({ result, location, onSubmitClaim }) => {
  const isEligible = result.claim_eligible;
  const isHealthy = result.disease.toLowerCase().includes('healthy');
  const [isPlaying, setIsPlaying] = useState(false);
  const [showClaimModal, setShowClaimModal] = useState(false);

  const handlePlaySummary = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(result.summary_for_speech);
    utterance.lang = 'en-IN'; // Indian English accent
    utterance.rate = 0.9;
    utterance.onend = () => setIsPlaying(false);
    
    setIsPlaying(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden animate-fade-in">
        
        {/* Header Status Bar */}
        <div className={`p-4 ${isHealthy ? 'bg-green-600' : 'bg-amber-600'} text-white flex items-center justify-between`}>
          <div className="flex items-center gap-2">
            {isHealthy ? <CheckCircle size={24} /> : <AlertTriangle size={24} />}
            <h2 className="text-xl font-bold">{result.disease}</h2>
          </div>
          <div className="flex items-center gap-1 px-3 py-1 bg-white/20 rounded-full text-sm font-semibold backdrop-blur-sm">
            <BadgeCheck size={16} />
            <span>Trust: {result.trust_score}</span>
          </div>
        </div>

        <div className="p-6 grid gap-6 md:grid-cols-2">
          
          {/* Voice Summary Button */}
          <div className="md:col-span-2 bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-center justify-between">
            <div>
              <h4 className="text-blue-900 font-semibold text-sm mb-1">Dr. Gemini Says:</h4>
              <p className="text-blue-800 italic text-sm">"{result.summary_for_speech}"</p>
            </div>
            <button 
              onClick={handlePlaySummary}
              className="ml-4 p-3 bg-white text-blue-600 rounded-full shadow-sm hover:bg-blue-100 transition-colors border border-blue-200"
            >
              {isPlaying ? <StopCircle size={24} /> : <Volume2 size={24} />}
            </button>
          </div>

          {/* Remedy Section (New) */}
          <div className="md:col-span-2 space-y-4">
             <div className="bg-green-50 rounded-xl p-5 border border-green-100">
                <div className="flex items-center gap-2 text-green-800 mb-3">
                   <Stethoscope size={20} />
                   <h3 className="font-bold text-lg">Doctor's Prescription</h3>
                </div>
                <p className="text-gray-700 mb-3 text-sm leading-relaxed">{result.remedy}</p>
                
                {result.recommended_product && (
                  <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-green-200 shadow-sm">
                     <div className="bg-green-100 p-2 rounded-full text-green-700">
                        <ShoppingBag size={18} />
                     </div>
                     <div>
                        <div className="text-xs text-gray-500 uppercase font-bold">Recommended Product</div>
                        <div className="text-green-900 font-bold">{result.recommended_product}</div>
                     </div>
                  </div>
                )}
             </div>
          </div>

          {/* Severity Section */}
          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-500 uppercase tracking-wide flex items-center gap-2">
              <Activity size={16} /> Severity Level
            </div>
            <div className="text-2xl font-bold text-gray-800">
              {result.severity}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className={`h-2.5 rounded-full ${
                  result.severity.toLowerCase().includes('high') ? 'bg-red-500' :
                  result.severity.toLowerCase().includes('moderate') ? 'bg-yellow-500' :
                  'bg-green-500'
                }`} 
                style={{ width: result.severity.toLowerCase().includes('high') ? '90%' : result.severity.toLowerCase().includes('moderate') ? '60%' : '30%' }}
              ></div>
            </div>
          </div>

          {/* Claim Eligibility Section */}
          <div className={`rounded-lg p-4 border-l-4 ${isEligible ? 'bg-green-50 border-green-500' : 'bg-gray-50 border-gray-400'}`}>
            <div className="flex items-center gap-2 mb-1">
              {isEligible ? <ShieldCheck className="text-green-600" size={20} /> : <ShieldAlert className="text-gray-500" size={20} />}
              <span className="font-semibold text-gray-900">PMFBY Scheme</span>
            </div>
            <div className={`text-lg font-bold ${isEligible ? 'text-green-700' : 'text-gray-600'}`}>
              {isEligible ? 'Eligible for Compensation' : 'Unlikely Eligible'}
            </div>
            
            {/* Direct Apply Button */}
            {isEligible && (
               <button 
                onClick={() => setShowClaimModal(true)}
                className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white text-sm font-bold py-2 rounded-lg shadow-md transition-colors flex items-center justify-center gap-1"
               >
                 Apply for Claim Now <ArrowRight size={16} />
               </button>
            )}
          </div>

          {/* Reason / Analysis */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Technical Report</h3>
            <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg text-sm border border-gray-100 font-mono">
              {result.reason}
            </p>
          </div>

        </div>
      </div>
      
      {/* Modal */}
      <ClaimModal 
        isOpen={showClaimModal} 
        onClose={() => setShowClaimModal(false)}
        analysis={result}
        location={location}
        onSubmitClaim={onSubmitClaim}
      />
    </>
  );
};