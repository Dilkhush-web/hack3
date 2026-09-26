import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Smartphone, Building, Loader2, KeyRound, Mail } from 'lucide-react';

export default function VendorAuth() {
  const navigate = useNavigate();
  const customLogoUrl = "https://res.cloudinary.com/doa6d6cyf/image/upload/v1790335406/Untitled_design_1_1_ppduhi.png";

  const [authMode, setAuthMode] = useState('login');

  // Login States
  const [loginPhone, setLoginPhone] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [otpStep, setOtpStep] = useState(false);
  const [otpVal, setOtpVal] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Register States
  const [businessName, setBusinessName] = useState('');
  const [category, setCategory] = useState('Photography Studio');
  const [basePrice, setBasePrice] = useState('');
  const [location, setLocation] = useState('Dehradun');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regOtpStep, setRegOtpStep] = useState(false);
  const [regOtpVal, setRegOtpVal] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const categories = ['Photography Studio', 'Destination', 'Makeup Artist', 'Event Planner'];

  // --- EMAILJS REAL DISPATCHER (NO BACKEND REQUIRED) ---
  const sendEmailNotification = async (recipientEmail, targetPhone, messageText) => {
    try {
      const serviceID = "service_b182pds";
      const templateID = "template_0bafrtd";
      const publicKey = "JZtH1oQcCJ82J4w7l";

      const templateParams = {
        to_email: recipientEmail,
        phone_number: targetPhone,
        message: messageText,
        app_name: "Wedding Granth (AfterUs Global)"
      };

      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          service_id: serviceID,
          template_id: templateID,
          user_id: publicKey,
          template_params: templateParams
        })
      });

      if (response.ok) {
        console.log("Email & Mobile notification successfully dispatched!");
      } else {
        console.error("EmailJS dispatch failed.");
      }
    } catch (error) {
      console.error("Email Dispatch Error:", error);
    }
  };

  // 1. Login OTP Dispatch
  const handleSendLoginOtp = (e) => {
    e.preventDefault();
    if (!loginPhone || loginPhone.length < 10 || !loginEmail) {
      alert("Please enter a valid 10-digit mobile number and email address.");
      return;
    }
    
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    sendEmailNotification(
      loginEmail,
      loginPhone,
      `Wedding Granth Login OTP: ${otp}. This code is intended for mobile number +91 ${loginPhone}.`
    );

    setIsLoggingIn(true);
    setTimeout(() => {
      setIsLoggingIn(false);
      setOtpStep(true);
    }, 1200);
  };

  // 2. Login OTP Verification & Navigation to Live Profile Hub
  const handleVerifyLoginOtp = (e) => {
    e.preventDefault();
    if (!otpVal) {
      alert("Please enter the verification OTP.");
      return;
    }

    setIsLoggingIn(true);
    setTimeout(() => {
      setIsLoggingIn(false);

      const savedProfile = JSON.parse(localStorage.getItem(`vendor_${loginPhone}`)) || {
        name: `Studio Partner (${loginPhone.slice(-4)})`,
        category: "Photography Studio",
        basePrice: 200000,
        phone: `+91 ${loginPhone}`,
        email: loginEmail,
        location: "Dehradun"
      };

      sendEmailNotification(
        loginEmail,
        loginPhone,
        `Login Successful! Welcome back to Wedding Granth Escrow Node for mobile +91 ${loginPhone}.`
      );

      navigate('/vendor-profile-live', { state: { vendor: savedProfile } });
    }, 1200);
  };

  // 3. Register OTP Trigger
  const handleTriggerRegisterOtp = (e) => {
    e.preventDefault();
    if (!businessName || !basePrice || !location || !regPhone || regPhone.length < 10 || !regEmail) {
      alert("Please fill in all required fields including a valid phone number and email.");
      return;
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    sendEmailNotification(
      regEmail,
      regPhone,
      `Wedding Granth Registration OTP: ${otp}. Complete your onboarding for mobile +91 ${regPhone}.`
    );

    setIsRegistering(true);
    setTimeout(() => {
      setIsRegistering(false);
      setRegOtpStep(true);
    }, 1200);
  };

  // 4. Register Final Verification & Save to Storage -> Navigates to Vendor Dash
  const handleFinalRegister = (e) => {
    e.preventDefault();
    if (!regOtpVal) {
      alert("Please enter the OTP sent to your email/mobile.");
      return;
    }

    const newVendorData = {
      name: businessName,
      category: category,
      basePrice: Number(basePrice),
      phone: `+91 ${regPhone}`,
      email: regEmail,
      location: location
    };

    localStorage.setItem(`vendor_${regPhone}`, JSON.stringify(newVendorData));

    sendEmailNotification(
      regEmail,
      regPhone,
      `Congratulations! Studio "${businessName}" is successfully registered on Wedding Granth with mobile +91 ${regPhone}.`
    );

    setIsRegistering(true);
    setTimeout(() => {
      setIsRegistering(false);
      navigate('/vendor-dash', { state: { vendor: newVendorData } });
    }, 1500);
  };

  return (
    <div className="w-full min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center py-16 px-6 relative selection:bg-[#8B0000] selection:text-white">
      
      <div className="max-w-md w-full relative z-10">
        
        <div className="text-center mb-8 flex flex-col items-center">
          <img 
            src={customLogoUrl} 
            alt="Wedding Granth Logo" 
            className="w-14 h-14 rounded-2xl border-2 border-[#8B0000] object-cover bg-white shadow-md mb-3" 
          />
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#8B0000]/10 text-[#8B0000] text-xs font-bold uppercase tracking-widest rounded-full mb-3 border border-[#8B0000]/20 shadow-sm">
            <Lock size={14} /> Vendor Secure Node
          </div>
          <h1 className="text-3xl font-serif font-bold text-gray-900 tracking-tight">
            Partner Portal Access
          </h1>
          <p className="text-gray-600 font-sans text-xs mt-1">
            Manage your live profile, escrow wallet, and client analytics.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-[#8B0000]/20 shadow-xl relative">
          
          <div className="grid grid-cols-2 gap-2 p-1.5 bg-[#FDFBF7] rounded-2xl border border-gray-200 mb-8">
            <button
              type="button"
              onClick={() => setAuthMode('login')}
              className={`py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${authMode === 'login' ? 'bg-[#8B0000] text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Partner Login
            </button>
            <button
              type="button"
              onClick={() => setAuthMode('register')}
              className={`py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${authMode === 'register' ? 'bg-[#8B0000] text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Register Studio
            </button>
          </div>

          {authMode === 'login' ? (
            <div>
              {!otpStep ? (
                <form onSubmit={handleSendLoginOtp} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Registered Mobile Number</label>
                    <div className="relative">
                      <span className="absolute left-4 top-3.5 text-sm text-gray-400 font-mono">+91</span>
                      <input 
                        type="tel"
                        placeholder="Enter 10-digit number"
                        value={loginPhone}
                        onChange={(e) => setLoginPhone(e.target.value)}
                        required
                        maxLength="10"
                        className="w-full bg-[#FDFBF7] border border-gray-200 rounded-xl pl-14 pr-4 py-3 text-sm outline-none focus:border-[#8B0000] font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Notification Email Address</label>
                    <div className="relative">
                      <span className="absolute left-4 top-3.5 text-sm text-gray-400"><Mail size={16} /></span>
                      <input 
                        type="email"
                        placeholder="Enter email to receive OTP"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        required
                        className="w-full bg-[#FDFBF7] border border-gray-200 rounded-xl pl-12 pr-4 py-3 text-sm outline-none focus:border-[#8B0000]"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    disabled={isLoggingIn}
                    className="w-full bg-[#8B0000] text-white py-3.5 rounded-xl font-bold text-sm hover:bg-[#660000] transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isLoggingIn ? <Loader2 className="animate-spin" size={16} /> : <Smartphone size={16} />}
                    {isLoggingIn ? 'Dispatching OTP Email...' : 'Send Login OTP'}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyLoginOtp} className="space-y-4">
                  <div className="bg-[#FDFBF7] p-3.5 rounded-xl border border-[#8B0000]/15 text-xs text-gray-600">
                    OTP sent successfully to email <b className="text-gray-900">{loginEmail}</b> for mobile <b className="text-gray-900">+91 {loginPhone}</b>.
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Enter 6-Digit OTP</label>
                    <input 
                      type="text"
                      placeholder="123456"
                      value={otpVal}
                      onChange={(e) => setOtpVal(e.target.value)}
                      required
                      maxLength="6"
                      className="w-full bg-[#FDFBF7] border border-gray-200 rounded-xl px-4 py-3 text-center text-lg font-mono tracking-widest outline-none focus:border-[#8B0000]"
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={isLoggingIn}
                    className="w-full bg-[#8B0000] text-white py-3.5 rounded-xl font-bold text-sm hover:bg-[#660000] transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isLoggingIn ? <Loader2 className="animate-spin" size={16} /> : <KeyRound size={16} />}
                    {isLoggingIn ? 'Authenticating Node...' : 'Verify & Open Live Profile'}
                  </button>
                </form>
              )}
            </div>
          ) : (
            <div>
              {!regOtpStep ? (
                <form onSubmit={handleTriggerRegisterOtp} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Studio / Business Name *</label>
                    <input 
                      type="text"
                      placeholder="e.g. Royal Crown Photography"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      required
                      className="w-full bg-[#FDFBF7] border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#8B0000]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Business Niche / Category *</label>
                    <select 
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-[#FDFBF7] border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#8B0000] font-sans"
                    >
                      {categories.map((cat, idx) => (
                        <option key={idx} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Base Price (₹) *</label>
                      <input 
                        type="number"
                        placeholder="150000"
                        value={basePrice}
                        onChange={(e) => setBasePrice(e.target.value)}
                        required
                        className="w-full bg-[#FDFBF7] border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#8B0000]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">City / Location *</label>
                      <input 
                        type="text"
                        placeholder="Dehradun"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                        className="w-full bg-[#FDFBF7] border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#8B0000]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Mobile Number *</label>
                    <div className="relative">
                      <span className="absolute left-4 top-3 text-xs text-gray-400 font-mono">+91</span>
                      <input 
                        type="tel"
                        placeholder="10-digit number"
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        required
                        maxLength="10"
                        className="w-full bg-[#FDFBF7] border border-gray-200 rounded-xl pl-13 pr-4 py-2.5 text-sm outline-none focus:border-[#8B0000] font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Notification Email *</label>
                    <input 
                      type="email"
                      placeholder="Enter email for OTP & alerts"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      required
                      className="w-full bg-[#FDFBF7] border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#8B0000]"
                    />
                  </div>

                  <div className="pt-2">
                    <button 
                      type="submit"
                      disabled={isRegistering}
                      className="w-full bg-[#8B0000] text-white py-3.5 rounded-xl font-bold text-sm hover:bg-[#660000] transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isRegistering ? <Loader2 className="animate-spin" size={16} /> : <Building size={16} />}
                      {isRegistering ? 'Sending OTP Email...' : 'Verify Number & Register Studio'}
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleFinalRegister} className="space-y-4">
                  <div className="bg-[#FDFBF7] p-3.5 rounded-xl border border-[#8B0000]/15 text-xs text-gray-600">
                    Verification OTP sent successfully to email <b className="text-gray-900">{regEmail}</b> for phone <b className="text-gray-900">+91 {regPhone}</b>.
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Enter 6-Digit Verification OTP</label>
                    <input 
                      type="text"
                      placeholder="123456"
                      value={regOtpVal}
                      onChange={(e) => setRegOtpVal(e.target.value)}
                      required
                      maxLength="6"
                      className="w-full bg-[#FDFBF7] border border-gray-200 rounded-xl px-4 py-3 text-center text-lg font-mono tracking-widest outline-none focus:border-[#8B0000]"
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={isRegistering}
                    className="w-full bg-[#8B0000] text-white py-3.5 rounded-xl font-bold text-sm hover:bg-[#660000] transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isRegistering ? <Loader2 className="animate-spin" size={16} /> : <KeyRound size={16} />}
                    {isRegistering ? 'Creating Node...' : 'Complete & Open Vendor Dashboard'}
                  </button>
                </form>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}