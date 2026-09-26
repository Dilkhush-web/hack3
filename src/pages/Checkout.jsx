import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Shield, CreditCard, Lock, CheckCircle2, ArrowRight, ShieldCheck, FileText, Smartphone, Check, Loader2, KeyRound, UserCheck, Phone, MessageSquare, Sparkles, X, Mail } from 'lucide-react';

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();

  const customLogoUrl = "https://res.cloudinary.com/doa6d6cyf/image/upload/v1790335406/Untitled_design_1_1_ppduhi.png";

  const passedState = location.state || {};
  const passedVendor = passedState.vendor || {};

  const totalAmount = Number(passedVendor.basePrice) || Number(passedState.budget) || 500000;

  const vendor = {
    name: passedVendor.name || (passedState.category ? `${passedState.category} Verified Partner` : "The Royal Haveli"),
    category: passedVendor.category || "Destination",
    basePrice: totalAmount,
    image: passedVendor.image || "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=800",
    phone: "+91 98370 44102"
  };

  const platformFee = Math.round(totalAmount * 0.02);
  const payableTotal = totalAmount + platformFee;

  const advanceAmount = Math.round(totalAmount * 0.4); 
  const setupProofAmount = Math.round(totalAmount * 0.4); 
  const finalHandoverAmount = totalAmount - advanceAmount - setupProofAmount; 
  const balanceAfterToken = totalAmount - advanceAmount;

  const [payMode, setPayMode] = useState('escrow');
  const [tenure, setTenure] = useState(6); // Default 6 months for Zero-Cost

  const [step, setStep] = useState(1); 

  const [aadhaarNum, setAadhaarNum] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [otpVal, setOtpVal] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [cibilScore, setCibilScore] = useState(null);

  const [showGatewayModal, setShowGatewayModal] = useState(false);
  const [utrNumber, setUtrNumber] = useState('');
  const [tokenPaid, setTokenPaid] = useState(false);

  const [income, setIncome] = useState('');
  const [bankAcc, setBankAcc] = useState('');
  const [autopayUpi, setAutopayUpi] = useState('');
  const [isProcessingFinal, setIsProcessingFinal] = useState(false);
  const [smsDispatched, setSmsDispatched] = useState(false);

  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [ecosystemAnswers, setEcosystemAnswers] = useState({ makeup: '', destination: '', planner: '' });
  const [contractLocked, setContractLocked] = useState(false);

  // --- DYNAMIC EMAIL DISPATCHER (SENDS TO EXACT INPUT EMAIL) ---
  const sendEmailNotification = async (recipientEmail, targetPhone, messageText) => {
    try {
      if (!recipientEmail) return;

      const serviceID = "service_b182pds";
      const templateID = "template_0bafrtd";
      const publicKey = "JZtH1oQcCJ82J4w7l";

      const templateParams = {
        to_email: recipientEmail,
        phone_number: targetPhone || "9837044102",
        message: messageText,
        app_name: "Wedding Granth (AfterUs Global)"
      };

      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: serviceID,
          template_id: templateID,
          user_id: publicKey,
          template_params: templateParams
        })
      });

      if (response.ok) {
        console.log(`Email successfully dispatched to ${recipientEmail}`);
      } else {
        console.error("EmailJS dispatch failed.");
      }
    } catch (error) {
      console.error("Email Dispatch Error:", error);
    }
  };

  // DYNAMIC INTEREST RATE LOGIC: <= 6 Months gets 0%, > 6 Months gets 12% p.a.
  const isZeroCost = tenure <= 6;
  const annualInterestRate = isZeroCost ? 0 : 0.12; 
  const monthlyInterestRate = annualInterestRate / 12;

  const emiAmount = monthlyInterestRate === 0 
    ? Math.round(balanceAfterToken / tenure)
    : Math.round(
        (balanceAfterToken * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, tenure)) /
        (Math.pow(1 + monthlyInterestRate, tenure) - 1)
      );

  const handleModeChange = (mode) => {
    setPayMode(mode);
    setTokenPaid(false);
    setUtrNumber('');
    setStep(1);
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!aadhaarNum || aadhaarNum.length < 12 || !clientPhone || clientPhone.length < 10 || !clientEmail) {
      alert("Please enter a valid 12-digit ID, 10-digit mobile number, and email address.");
      return;
    }

    const kycOtp = Math.floor(100000 + Math.random() * 900000);
    sendEmailNotification(
      clientEmail,
      clientPhone,
      `Wedding Granth Bureau KYC OTP: ${kycOtp}. Intended for mobile +91 ${clientPhone}.`
    );

    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setStep(1.5);
    }, 1500);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (!otpVal) {
      alert("Please enter the verification OTP.");
      return;
    }
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setCibilScore(785);

      sendEmailNotification(
        clientEmail,
        clientPhone,
        `Bureau Check Approved! CIBIL Score: 785/900 for mobile +91 ${clientPhone}. Proceed to lock 40% advance token.`
      );

      setStep(2); 
    }, 2000);
  };

  const handlePayToken = () => {
    setShowGatewayModal(true);
  };

  const handleSimulateTokenSuccess = () => {
    setShowGatewayModal(false);
    setTokenPaid(true);
  };

  const handleVerifyUtrAndProceed = () => {
    if (!utrNumber || utrNumber.trim() === '') {
      alert("Mandatory: Please enter the UTR / Transaction Reference number after paying token.");
      return;
    }

    if (payMode === 'bnpl') {
      setStep(3); 
    } else {
      finalizeSuccessFlow(); 
    }
  };

  const handleFinalizeLoan = (e) => {
    e.preventDefault();
    if (!income || !bankAcc || !autopayUpi) {
      alert("Please fill out all financial and e-NACH autopay details.");
      return;
    }

    setIsProcessingFinal(true);
    setTimeout(() => {
      setIsProcessingFinal(false);
      finalizeSuccessFlow();
    }, 2500);
  };

  const finalizeSuccessFlow = () => {
    setSmsDispatched(true);
    setContractLocked(true);
    setStep(4);

    const targetPhone = clientPhone || "9837044102";
    const targetEmail = clientEmail;
    
    sendEmailNotification(
      targetEmail,
      targetPhone,
      `AUG Escrow Success! 40% Token of ₹${advanceAmount.toLocaleString('en-IN')} (UTR: ${utrNumber || 'VERIFIED'}) locked for ${vendor.name} (Mobile: +91 ${targetPhone}). Milestones active: 40% Setup Proof, 20% Final.`
    );

    setTimeout(() => setShowQuestionnaire(true), 1200);
  };

  const handleDownloadPdf = () => {
    const contractContent = `
==================================================
        WEDDING GRANTH (AFTERUS GLOBAL)
        OFFICIAL ESCROW SMART CONTRACT
==================================================
- Vendor Name: ${vendor.name}
- Total Contract Value: ₹ ${totalAmount.toLocaleString('en-IN')}
- 40% Advance Token Paid (Verified UTR: ${utrNumber || 'VERIFIED'}): ₹ ${advanceAmount.toLocaleString('en-IN')}
- 40% Setup Proof Milestone: ₹ ${setupProofAmount.toLocaleString('en-IN')}
- 20% Final Handover Milestone: ₹ ${finalHandoverAmount.toLocaleString('en-IN')}
- Financing Mode: ${payMode === 'bnpl' ? `EMI Active (${tenure} Months @ ₹${emiAmount.toLocaleString('en-IN')}/mo \vert{} Interest:${isZeroCost ? '0% (Zero-Cost)' : '12% p.a.'})` : 'Upfront Escrow (40-40-20 Milestone Framework)'}
- Client Mobile: +91 ${clientPhone || '98XXXXXXXX'}
- Client Email: ${clientEmail || 'user@gmail.com'}
==================================================
    `;
    const blob = new Blob([contractContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Wedding_Granth_Contract_${vendor.name.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (step === 4) {
    return (
      <div className="w-full min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center py-16 px-6 relative">
        <div className="max-w-3xl w-full bg-white border border-[#8B0000]/20 p-8 md:p-12 rounded-3xl shadow-xl text-center relative overflow-hidden">

          <div className="w-20 h-20 bg-green-50 border border-green-200 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
            <Check size={40} />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#8B0000]/10 text-[#8B0000] text-xs font-bold uppercase tracking-widest rounded-full mb-4">
            <Lock size={12} /> AUG Escrow Vault Secured
          </div>

          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-3">Token & Contract Locked Successfully!</h2>
          <p className="text-gray-600 font-sans text-sm mb-6">
            {payMode === 'bnpl' 
              ? `40% advance verified. Remaining balance of ₹${balanceAfterToken.toLocaleString('en-IN')} structured into ${tenure}-Month EMI of ₹${emiAmount.toLocaleString('en-IN')}/mo (${isZeroCost ? 'Zero-Cost' : '12% p.a.'}).` 
              : `40% advance token verified via UTR. 40-40-20 Escrow milestones activated successfully.`}
          </p>

          <div className="bg-[#FDFBF7] p-6 rounded-2xl border border-gray-200 mb-8 text-left space-y-3 font-mono text-xs text-gray-700">
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="text-gray-400">Transaction ID:</span>
              <span className="font-bold text-gray-900">AUG-TXN-982410-IN</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="text-gray-400">Assigned Vendor:</span>
              <span className="font-bold text-gray-900">{vendor.name}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="text-gray-400">Client Email Sent:</span>
              <span className="font-bold text-[#8B0000]">{clientEmail}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="text-gray-400">Verified Vendor Phone:</span>
              <span className="font-bold text-green-700 flex items-center gap-1">
                <Phone size={12} /> {vendor.phone}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Escrow Status:</span>
              <span className="font-bold text-green-700">40% Token Credited (Waiting for Setup Proof)</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              type="button"
              onClick={handleDownloadPdf}
              className="bg-white border-2 border-[#8B0000] text-[#8B0000] px-6 py-3.5 rounded-xl font-bold hover:bg-[#8B0000]/5 transition-colors flex items-center justify-center gap-2 text-sm shadow-sm cursor-pointer"
            >
              <FileText size={16} /> Download Contract PDF
            </button>
            <button 
              type="button"
              onClick={() => navigate('/vendor-dash', { state: { vendor } })}
              className="bg-[#8B0000] text-white px-6 py-3.5 rounded-xl font-bold hover:bg-[#660000] transition-colors flex items-center justify-center gap-2 text-sm shadow-md cursor-pointer"
            >
              Go to Vendor Dashboard & Chat <ArrowRight size={16} />
            </button>
          </div>

        </div>

        {contractLocked && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#8B0000] text-white px-5 py-3 rounded-2xl shadow-2xl border border-white/20 flex items-center gap-3 animate-bounce cursor-pointer hover:bg-[#660000] transition-colors"
               onClick={() => navigate('/vendor-dash', { state: { vendor } })}>
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-200">Active Escrow Contract</p>
              <p className="text-xs font-serif font-bold">{vendor.name}</p>
            </div>
            <MessageSquare size={18} className="ml-2 text-white" />
          </div>
        )}

      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#FDFBF7] flex flex-col items-center py-16 px-6 relative selection:bg-[#8B0000] selection:text-white">

      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#8B0000 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
      </div>

      <div className="max-w-6xl w-full relative z-10">

        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#8B0000]/10 text-[#8B0000] text-xs font-bold uppercase tracking-widest rounded-full mb-4 border border-[#8B0000]/20 shadow-sm">
            <Lock size={14} /> India's First Managed Wedding Ecosystem
          </div>
          <h1 className="text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-3 tracking-tight">
            Secure Contract & Payment Protocol
          </h1>
          <p className="text-gray-600 font-sans text-sm max-w-xl mx-auto">
            Mandatory 40-40-20 sequence: 40% Advance Token & UTR Verification ➔ Contract Execution.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-[#8B0000]/15 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <img src={vendor.image} alt={vendor.name} className="w-20 h-20 rounded-2xl object-cover border border-gray-200" />
                <div>
                  <span className="text-[10px] font-bold text-[#8B0000] uppercase tracking-widest bg-[#8B0000]/5 px-2.5 py-1 rounded-md border border-[#8B0000]/10">
                    {vendor.category}
                  </span>
                  <h2 className="text-xl font-serif font-bold text-gray-900 mt-1.5">{vendor.name}</h2>
                  <p className="text-xs text-gray-500 font-medium">Dehradun / Pan-India Node</p>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-3 font-sans text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Base Contract Value</span>
                  <span className="font-semibold text-gray-900">₹ {totalAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Escrow & Platform Fee (2%)</span>
                  <span className="font-semibold text-gray-900">₹ {platformFee.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between border-t border-gray-100 pt-3 text-base font-bold text-gray-900">
                  <span>Total Lock Amount</span>
                  <span className="text-[#8B0000]">₹ {payableTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-[#8B0000]/15 shadow-sm">
              <h3 className="text-base font-serif font-bold text-gray-900 mb-4 flex items-center gap-2">
                <ShieldCheck className="text-[#8B0000]" size={18} /> 40-40-20 Escrow Milestones
              </h3>
              <div className="space-y-3 text-xs text-gray-600">
                <div className="p-3 bg-[#FDFBF7] rounded-xl border border-[#8B0000]/20 font-bold text-[#8B0000]">
                  1. Advance Token (40%): ₹ {advanceAmount.toLocaleString('en-IN')} — Cleared first via UTR.
                </div>
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                  2. Setup Proof (40%): ₹ {setupProofAmount.toLocaleString('en-IN')} — Released on raw proof.
                </div>
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                  3. Final Handover (20%): ₹ {finalHandoverAmount.toLocaleString('en-IN')} — Released upon completion.
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 border border-[#8B0000]/20 shadow-lg relative">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <img src={customLogoUrl} alt="AUG Logo" className="w-8 h-8 rounded-lg border border-[#8B0000] object-cover bg-white" />
                <span className="text-xs font-serif font-bold tracking-tight text-gray-900">Wedding Granth (AfterUs Global)</span>
              </div>

              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">Execution Pipeline</h3>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <button
                  type="button"
                  onClick={() => handleModeChange('escrow')}
                  className={`py-4 px-5 rounded-2xl font-bold text-sm transition-all border flex flex-col items-center gap-1 cursor-pointer ${payMode === 'escrow' ? 'bg-[#8B0000] text-white border-[#8B0000] shadow-md' : 'bg-[#FDFBF7] text-gray-700 border-gray-200'}`}
                >
                  <Shield size={20} />
                  <span>Upfront Escrow (Cash)</span>
                  <span className="text-[10px] opacity-80">40-40-20 Milestones</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleModeChange('bnpl')}
                  className={`py-4 px-5 rounded-2xl font-bold text-sm transition-all border flex flex-col items-center gap-1 cursor-pointer ${payMode === 'bnpl' ? 'bg-[#8B0000] text-white border-[#8B0000] shadow-md' : 'bg-[#FDFBF7] text-gray-700 border-gray-200'}`}
                >
                  <CreditCard size={20} />
                  <span>Token + BNPL EMI</span>
                  <span className="text-[10px] opacity-80">40% Token + Balance EMI</span>
                </button>
              </div>

              {payMode === 'bnpl' && step === 1 && (
                <form onSubmit={handleSendOtp} className="bg-[#FDFBF7] border border-[#8B0000]/20 p-6 rounded-2xl space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#8B0000] uppercase tracking-wider">
                    <UserCheck size={16} /> Stage 1: Identity & Bureau Check
                  </div>
                  <div className="space-y-3">
                    <input 
                      type="text" 
                      placeholder="12-Digit Identification Number"
                      value={aadhaarNum}
                      onChange={(e) => setAadhaarNum(e.target.value)}
                      required
                      maxLength="12"
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#8B0000]"
                    />
                    <input 
                      type="tel" 
                      placeholder="Linked Mobile Number"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      required
                      maxLength="10"
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#8B0000]"
                    />
                    <input 
                      type="email" 
                      placeholder="Notification Email Address for OTP"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      required
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#8B0000]"
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={isVerifying}
                    className="w-full bg-[#8B0000] text-white py-3.5 rounded-xl font-bold text-sm hover:bg-[#660000] transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                  >
                    {isVerifying ? <Loader2 className="animate-spin" size={16} /> : <KeyRound size={16} />}
                    {isVerifying ? 'Connecting to Bureau...' : 'Verify & Send Bureau Check OTP Email'}
                  </button>
                </form>
              )}

              {payMode === 'bnpl' && step === 1.5 && (
                <form onSubmit={handleVerifyOtp} className="bg-[#FDFBF7] border border-[#8B0000]/20 p-6 rounded-2xl space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#8B0000] uppercase tracking-wider">
                    <KeyRound size={16} /> Enter OTP Sent to Email ({clientEmail})
                  </div>
                  <input 
                    type="text" 
                    placeholder="Enter 6-digit OTP (e.g. 123456)"
                    value={otpVal}
                    onChange={(e) => setOtpVal(e.target.value)}
                    required
                    maxLength="6"
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#8B0000] text-center font-mono tracking-widest text-lg"
                  />
                  <button 
                    type="submit" 
                    disabled={isVerifying}
                    className="w-full bg-[#8B0000] text-white py-3.5 rounded-xl font-bold text-sm hover:bg-[#660000] transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                  >
                    {isVerifying ? <Loader2 className="animate-spin" size={16} /> : null}
                    {isVerifying ? 'Verifying Bureau Score...' : 'Confirm OTP'}
                  </button>
                </form>
              )}

              {(payMode === 'escrow' || step === 2) && (
                <div className="space-y-6">
                  {payMode === 'bnpl' && (
                    <div className="bg-green-50 border border-green-200 p-4 rounded-xl flex items-center justify-between text-green-800">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="text-green-600 shrink-0" size={22} />
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wide">Bureau Score: {cibilScore} / 900 (Approved)</p>
                          <p className="text-xs text-green-700">KYC cleared. Now 40% Token payment is mandatory.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="bg-[#FDFBF7] border-2 border-[#8B0000] p-6 rounded-2xl space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-gray-700 uppercase">Mandatory Token (40%)</span>
                      <span className="text-2xl font-serif font-bold text-[#8B0000]">₹ {advanceAmount.toLocaleString('en-IN')}</span>
                    </div>
                    <p className="text-xs text-gray-600">Pay this amount to AUG Escrow Account, then paste your UTR / Transaction Reference below to unlock further processing.</p>

                    <button 
                      type="button"
                      onClick={handlePayToken}
                      className="w-full bg-[#8B0000] text-white py-3 rounded-xl font-bold text-sm hover:bg-[#660000] transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <CreditCard size={16} /> Pay ₹ {advanceAmount.toLocaleString('en-IN')} via Gateway
                    </button>

                    {tokenPaid && (
                      <div className="space-y-3 pt-4 border-t border-[#8B0000]/20">
                        <label className="block text-xs font-bold text-gray-900 uppercase">Enter UTR / Reference Number *</label>
                        <input 
                          type="text" 
                          placeholder="e.g. UTRN4829102948"
                          value={utrNumber}
                          onChange={(e) => setUtrNumber(e.target.value)}
                          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-mono outline-none focus:border-[#8B0000]"
                        />
                        <button 
                          type="button"
                          onClick={handleVerifyUtrAndProceed}
                          className="w-full bg-green-700 text-white py-3 rounded-xl font-bold text-sm hover:bg-green-800 transition-colors shadow-sm cursor-pointer"
                        >
                          Verify UTR & Proceed <ArrowRight size={16} className="inline ml-1" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {payMode === 'bnpl' && step === 3 && (
                <form onSubmit={handleFinalizeLoan} className="bg-[#FDFBF7] border border-[#8B0000]/20 p-6 rounded-2xl space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#8B0000] uppercase tracking-wider">
                    <CreditCard size={16} /> Stage 3: Remaining Balance EMI Structuring
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-gray-200 space-y-2">
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>Remaining Balance for EMI:</span>
                      <span className="font-bold text-gray-900">₹ {balanceAfterToken.toLocaleString('en-IN')}</span>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Select Tenure (3 or 6 Mos = Zero Cost | 9 or 12 Mos = 12% p.a.)</label>
                      <div className="grid grid-cols-4 gap-2">
                        {[3, 6, 9, 12].map((m) => (
                          <button
                            key={m}
                            type="button"
                            onClick={() => setTenure(m)}
                            className={`py-2 rounded-lg font-bold text-xs border transition-all cursor-pointer ${tenure === m ? 'bg-gray-900 text-white border-gray-900' : 'bg-gray-50 text-gray-700 border-gray-200'}`}
                          >
                            {m} Mos
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-gray-100 flex justify-between items-center">
                      <div>
                        <p className="text-[10px] text-gray-400 uppercase font-bold">Calculated Monthly EMI</p>
                        <p className="text-xl font-serif font-bold text-[#8B0000]">₹ {emiAmount.toLocaleString('en-IN')} <span className="text-xs font-sans text-gray-500 font-normal">/mo ({tenure} Mos)</span></p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-gray-400 uppercase font-bold">Interest Rate</p>
                        <p className="text-sm font-bold text-gray-900">{isZeroCost ? '0% (Zero-Cost)' : '12% p.a.'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input 
                      type="number" 
                      placeholder="Monthly Income (₹)"
                      value={income}
                      onChange={(e) => setIncome(e.target.value)}
                      required
                      className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#8B0000]"
                    />
                    <input 
                      type="text" 
                      placeholder="Bank Account Number"
                      value={bankAcc}
                      onChange={(e) => setBankAcc(e.target.value)}
                      required
                      className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#8B0000]"
                    />
                  </div>

                  <input 
                    type="text" 
                    placeholder="Enter UPI ID for e-NACH Autopay (e.g. user@oksbi)"
                    value={autopayUpi}
                    onChange={(e) => setAutopayUpi(e.target.value)}
                    required
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#8B0000]"
                  />

                  <button 
                    type="submit" 
                    disabled={isProcessingFinal}
                    className="w-full bg-[#8B0000] text-white py-3.5 rounded-xl font-bold text-sm hover:bg-[#660000] transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer"
                  >
                    {isProcessingFinal ? <Loader2 className="animate-spin" size={16} /> : <Lock size={16} />}
                    {isProcessingFinal ? 'Executing Loan Sanction & Email Dispatch...' : 'Sanction Loan & Finalize Contract'}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>

      {showGatewayModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-white max-w-md w-full rounded-3xl p-8 shadow-2xl border border-gray-200 relative">
            <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">AUG Neutral Escrow Gateway</h3>
            <p className="text-xs text-gray-500 mb-6">Pay mandatory 40% Token Advance to unlock your contract.</p>

            <div className="bg-[#FDFBF7] p-4 rounded-2xl border border-[#8B0000]/20 mb-6">
              <span className="text-xs font-bold text-gray-400 uppercase">Payable Amount (40%)</span>
              <p className="text-3xl font-serif font-bold text-[#8B0000]">₹ {advanceAmount.toLocaleString('en-IN')}</p>
            </div>

            <button 
              type="button"
              onClick={handleSimulateTokenSuccess}
              className="w-full bg-[#8B0000] text-white py-3.5 rounded-xl font-bold hover:bg-[#660000] transition-colors shadow-md mb-3 cursor-pointer"
            >
              Simulate Successful UPI Payment
            </button>
            <button 
              type="button"
              onClick={() => setShowGatewayModal(false)}
              className="w-full bg-gray-100 text-gray-700 py-2.5 rounded-xl font-bold text-xs hover:bg-gray-200 transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

    </div>
  );
}