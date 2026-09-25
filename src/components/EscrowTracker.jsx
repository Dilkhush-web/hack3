import React, { useState } from 'react';

export default function EscrowTracker({ currentStage = 1, userRole = 'client' }) {
  const [disputed, setDisputed] = useState(false);
  const [proofUploaded, setProofUploaded] = useState(false);

  // 40-40-20 Milestone Framework with Vault & Action tracking
  const stages = [
    { 
      id: 1, 
      title: 'Token Paid (Advance)', 
      percentage: '40%', 
      desc: 'Secured safely in AUG Vault',
      vaultId: 'AUG_VAULT_98421_TX'
    },
    { 
      id: 2, 
      title: 'Setup Day Proof', 
      percentage: '40%', 
      desc: proofUploaded ? 'Proof verified by Concierge Team' : 'Pending vendor setup submission',
      vaultId: 'AUG_VAULT_98422_TX'
    },
    { 
      id: 3, 
      title: 'Final Handover', 
      percentage: '20%', 
      desc: 'Released post-event success confirmation',
      vaultId: 'AUG_VAULT_98423_TX'
    }
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 my-4 relative overflow-hidden">
      {/* Top Header with Fintech Badge */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2">
        <div>
          <span className="bg-red-100 text-[#8B0000] text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
            Secured Fintech Escrow Vault
          </span>
          <h3 className="text-xl font-bold text-gray-900 mt-2">40-40-20 Milestone Protection</h3>
          <p className="text-xs text-gray-500">Preventing commission bypass & ensuring 100% money-back security.</p>
        </div>
        
        {/* Dispute / Freeze Button */}
        <button 
          onClick={() => setDisputed(!disputed)}
          className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all ${
            disputed 
              ? 'bg-red-600 text-white border-red-600 animate-pulse' 
              : 'bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100'
          }`}
        >
          {disputed ? '⚠️ Escrow Frozen (Dispute Active)' : '🛡️ Raise Vault Dispute'}
        </button>
      </div>

      {/* Warning Banner if Disputed */}
      {disputed && (
        <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center justify-between">
          <span>Funds are temporarily locked by AUG Concierge Admin due to a raised query.</span>
          <span className="font-bold">Resolution in progress...</span>
        </div>
      )}

      {/* Milestone Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stages.map((stage) => {
          const isCompleted = currentStage >= stage.id;
          const isCurrent = currentStage === stage.id;

          return (
            <div 
              key={stage.id} 
              className={`p-4 rounded-xl border transition-all relative ${
                isCurrent 
                  ? 'border-[#8B0000] bg-red-50/20 shadow-md ring-2 ring-[#8B0000]/20' 
                  : isCompleted 
                  ? 'border-green-500 bg-green-50/10' 
                  : 'border-gray-200 bg-gray-50/50'
              }`}
            >
              <div className="flex justify-between items-center mb-3">
                <span className={`text-xs font-extrabold px-2.5 py-1 rounded-md ${
                  isCompleted ? 'bg-green-100 text-green-700' : isCurrent ? 'bg-[#8B0000] text-white' : 'bg-gray-200 text-gray-700'
                }`}>
                  {stage.percentage}
                </span>
                <span className="text-[10px] font-mono text-gray-400">{stage.vaultId}</span>
              </div>

              <h4 className="font-bold text-gray-800 text-sm">{stage.title}</h4>
              <p className="text-xs text-gray-500 mt-1 mb-3">{stage.desc}</p>

              {/* Special Action for Vendor on Stage 2 */}
              {stage.id === 2 && userRole === 'vendor' && isCurrent && !proofUploaded && (
                <button 
                  onClick={() => setProofUploaded(true)}
                  className="w-full mt-2 bg-[#8B0000] hover:bg-[#700000] text-white text-xs font-semibold py-2 px-3 rounded-lg transition shadow"
                >
                  📤 Upload Setup Proof
                </button>
              )}

              {/* Status Footer Badge */}
              <div className="mt-2 pt-2 border-t border-gray-100 flex items-center justify-between text-[11px]">
                <span className="text-gray-400">Status:</span>
                <span className={`font-semibold ${
                  isCompleted ? 'text-green-600' : isCurrent ? 'text-[#8B0000]' : 'text-gray-400'
                }`}>
                  {isCompleted ? 'Completed ✓' : isCurrent ? 'Active Milestone' : 'Locked'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}