import React, { useState } from 'react';

export default function ConciergeModal({ isOpen, onClose, vendorName = "Luxury Wedding Service" }) {
  const [mode, setMode] = useState('enquiry'); // 'enquiry' or 'instant'
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    weddingDate: '',
    guestCount: '200-500 guests',
    aestheticStyle: 'Cinematic / Royal',
    budget: '₹3 Lakh - ₹7 Lakh'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // --- REAL-TIME CALLING DASHBOARD STORAGE INJECTION ---
    const newLead = {
      id: Date.now(),
      name: formData.name,
      phone: formData.phone,
      weddingDate: formData.weddingDate,
      guestCount: formData.guestCount,
      aestheticStyle: formData.aestheticStyle,
      budget: formData.budget,
      vendorName: vendorName,
      leadType: mode === 'instant' ? 'Instant 2-Hour Callback' : 'AI Qualified Enquiry',
      timestamp: new Date().toLocaleString(),
      status: 'Pending Call'
    };

    const existingLeads = JSON.parse(localStorage.getItem('aug_calling_leads')) || [];
    localStorage.setItem('aug_calling_leads', JSON.stringify([newLead, ...existingLeads]));
    // ----------------------------------------------------

    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-100 animate-in fade-in zoom-in duration-200">
        
        {/* Modal Header with Custom Logo Link */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-5 text-white flex justify-between items-center relative">
          <div className="flex items-center space-x-3">
            {/* Logo Link - Yahan apna logo link daal lena */}
            <img 
              src="https://via.placeholder.com/40" 
              alt="AUG Logo" 
              className="w-10 h-10 rounded-full border-2 border-[#8B0000] object-cover bg-white" 
            />
            <div>
              <h3 className="font-bold text-base">AUG Managed Concierge</h3>
              <p className="text-xs text-gray-300">Vendor: <span className="text-red-400 font-medium">{vendorName}</span></p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition"
          >
            ✕
          </button>
        </div>

        {/* Mode Selector Tabs (Enquiry vs Instant Call) */}
        {!isSubmitted && (
          <div className="grid grid-cols-2 bg-gray-100 p-1.5 border-b border-gray-200 text-xs font-semibold">
            <button 
              type="button"
              onClick={() => { setMode('enquiry'); setStep(1); }}
              className={`py-2 rounded-lg transition ${mode === 'enquiry' ? 'bg-white text-[#8B0000] shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
            >
              📋 Detailed Enquiry (AI Questions)
            </button>
            <button 
              type="button"
              onClick={() => { setMode('instant'); setStep(1); }}
              className={`py-2 rounded-lg transition ${mode === 'instant' ? 'bg-white text-[#8B0000] shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
            >
              ⚡ Instant Call (Within 2 Hours)
            </button>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* INSTANT CALL FLOW */}
              {mode === 'instant' && (
                <>
                  <div className="bg-red-50 border border-red-100 p-3 rounded-xl text-xs text-[#8B0000] font-medium flex items-center justify-between">
                    <span>⚡ Priority Callback Guarantee</span>
                    <span className="bg-white px-2 py-0.5 rounded shadow-sm text-green-600 font-bold">Connect in 2 Hours</span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name</label>
                    <input 
                      type="text" 
                      name="name" 
                      required 
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your name" 
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Phone Number</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      required 
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 98765 43210" 
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Wedding Date</label>
                    <input 
                      type="date" 
                      name="weddingDate" 
                      required 
                      value={formData.weddingDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                    />
                  </div>

                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800">
                    🕒 <span className="font-semibold">Note:</span> Our expert sales manager will call you on this number within **2 hours** to lock the deal safely via escrow.
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-[#8B0000] hover:bg-[#700000] text-white font-semibold py-3 rounded-xl text-sm transition shadow-md"
                  >
                    Request Instant 2-Hour Callback 🚀
                  </button>
                </>
              )}

              {/* ENQUIRY FLOW WITH AI QUALIFICATION QUESTIONS */}
              {mode === 'enquiry' && (
                <>
                  {step === 1 ? (
                    <>
                      <div className="bg-red-50 border border-red-100 p-3 rounded-xl text-xs text-[#8B0000] font-medium flex items-center justify-between">
                        <span>🤖 AI Lead Qualification</span>
                        <span className="bg-white px-2 py-0.5 rounded shadow-sm">Step 1 of 2</span>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name</label>
                        <input 
                          type="text" 
                          name="name" 
                          required 
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your name" 
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Phone Number</label>
                        <input 
                          type="tel" 
                          name="phone" 
                          required 
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+91 98765 43210" 
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Tentative Wedding Date</label>
                        <input 
                          type="date" 
                          name="weddingDate" 
                          required 
                          value={formData.weddingDate}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                        />
                      </div>

                      <button 
                        type="button" 
                        onClick={() => setStep(2)}
                        className="w-full mt-2 bg-[#8B0000] hover:bg-[#700000] text-white font-semibold py-3 rounded-xl text-sm transition shadow-md"
                      >
                        Next: AI Questions (Step 2) →
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="bg-red-50 border border-red-100 p-3 rounded-xl text-xs text-[#8B0000] font-medium flex items-center justify-between">
                        <span>💡 Additional Questions</span>
                        <span className="bg-white px-2 py-0.5 rounded shadow-sm">Step 2 of 2</span>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">1. Expected Guest Count?</label>
                        <select 
                          name="guestCount" 
                          value={formData.guestCount}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                        >
                          <option>Under 200 guests</option>
                          <option>200 - 500 guests</option>
                          <option>500 - 1000 guests</option>
                          <option>1000+ guests (Grand Scale)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">2. Preferred Aesthetic Style?</label>
                        <select 
                          name="aestheticStyle" 
                          value={formData.aestheticStyle}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                        >
                          <option>Cinematic & Candid</option>
                          <option>Traditional & Royal</option>
                          <option>Minimalist & Modern</option>
                          <option>Destination & Luxury</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">3. Estimated Budget Range?</label>
                        <select 
                          name="budget" 
                          value={formData.budget}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                        >
                          <option>₹1 Lakh - ₹3 Lakh</option>
                          <option>₹3 Lakh - ₹7 Lakh</option>
                          <option>₹7 Lakh - ₹15 Lakh</option>
                          <option>₹15 Lakh+ (Elite)</option>
                        </select>
                      </div>

                      <div className="flex space-x-3 mt-4">
                        <button 
                          type="button" 
                          onClick={() => setStep(1)}
                          className="w-1/3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl text-sm transition"
                        >
                          ← Back
                        </button>
                        <button 
                          type="submit" 
                          className="w-2/3 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl text-sm transition shadow-md"
                        >
                          Submit AI Enquiry ✓
                        </button>
                      </div>
                    </>
                  )}
                </>
              )}

            </form>
          ) : (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold shadow-inner">
                ✓
              </div>
              <h4 className="text-xl font-bold text-gray-800">
                {mode === 'instant' ? 'Instant Callback Scheduled!' : 'AI Enquiry Successfully Dispatched!'}
              </h4>
              <p className="text-xs text-gray-500 max-w-xs mx-auto">
                {mode === 'instant' 
                  ? `Your priority request for ${vendorName} is received. Our expert team will connect with you within 2 hours.` 
                  : `AI has successfully qualified your requirements for ${vendorName}. Our calling team will reach out shortly.`
                }
              </p>
              <div className="p-3 bg-red-50 rounded-xl border border-red-100 text-xs text-[#8B0000] font-semibold">
                🛡️ Protected under AUG Managed Escrow Framework
              </div>
              <button 
                onClick={onClose}
                className="mt-4 px-6 py-2.5 bg-gray-900 hover:bg-black text-white rounded-xl text-sm font-semibold transition"
              >
                Close & Return
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}