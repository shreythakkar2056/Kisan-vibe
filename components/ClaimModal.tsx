import React, { useState } from 'react';
import { CheckCircle, X, Shield, FileText, Loader2 } from 'lucide-react';
import { AnalysisResult, LocationData, ClaimRecord } from '../types';

interface ClaimModalProps {
  isOpen: boolean;
  onClose: () => void;
  analysis: AnalysisResult;
  location: LocationData | null;
  onSubmitClaim: (claim: ClaimRecord) => void;
}

export const ClaimModal: React.FC<ClaimModalProps> = ({ isOpen, onClose, analysis, location, onSubmitClaim }) => {
  const [step, setStep] = useState<'form' | 'submitting' | 'success'>('form');
  const [claimId, setClaimId] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('submitting');
    
    // Simulate Network Delay
    setTimeout(() => {
      const newId = `#PMFBY-2024-${Math.floor(1000 + Math.random() * 9000)}`;
      setClaimId(newId);
      
      const newClaim: ClaimRecord = {
        id: newId,
        date: new Date().toLocaleDateString('en-IN'),
        disease: analysis.disease,
        amount: '₹12,500', // Estimated amount
        status: 'Pending',
        lat: location?.latitude || 0
      };
      
      onSubmitClaim(newClaim);
      setStep('success');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden transform transition-all scale-100">
        
        {/* Header */}
        <div className="bg-green-700 p-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <Shield size={20} />
            <h2 className="font-bold text-lg">PMFBY Fast-Track Claim</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-green-600 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 'form' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-green-50 p-3 rounded-lg text-sm text-green-800 border border-green-200">
                <p><strong>Diagnosis:</strong> {analysis.disease}</p>
                <p><strong>Severity:</strong> {analysis.severity}</p>
                <p><strong>Location:</strong> {location?.latitude.toFixed(4)}, {location?.longitude.toFixed(4)}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Farmer Name</label>
                <input required type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" placeholder="Enter name as per Aadhar" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Survey / Khasra Number</label>
                <input required type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" placeholder="e.g. 104/2" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Aadhar Last 4 Digits</label>
                <input required type="text" maxLength={4} pattern="\d{4}" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" placeholder="XXXX" />
              </div>

              <button type="submit" className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-3 rounded-xl shadow-lg flex items-center justify-center gap-2 mt-2">
                <FileText size={18} />
                Submit Claim Directly
              </button>
            </form>
          )}

          {step === 'submitting' && (
            <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
              <Loader2 size={48} className="text-green-600 animate-spin" />
              <div>
                <h3 className="text-lg font-bold text-gray-900">Connecting to PMFBY Portal...</h3>
                <p className="text-gray-500 text-sm">Uploading secure crop evidence and metadata.</p>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="flex flex-col items-center justify-center py-4 text-center space-y-4 animate-in zoom-in">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                <CheckCircle size={40} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Claim Application ID: {claimId}</h3>
                <p className="text-gray-600 mt-2 text-sm">
                  Your claim has been successfully registered. The local agriculture officer will visit your farm (Lat: {location?.latitude.toFixed(4)}) within 48 hours for final verification.
                </p>
              </div>
              <button onClick={onClose} className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-3 rounded-xl transition-colors">
                Close & View Status
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};