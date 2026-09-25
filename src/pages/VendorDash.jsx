import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ShieldCheck, Wallet, MapPin, Camera, Zap, FileText, MessageSquare, Phone, Send, CheckCircle2, Loader2, ArrowRight, DollarSign, Tag, Building, Lock, Image, Video, Star, FileCheck, Layers, Trash2, Download } from 'lucide-react';

export default function VendorDash() {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve unique vendor data from navigation state or fallback
  const passedVendor = location.state?.vendor || {
    name: "The Royal Haveli Studio",
    category: "Photography Studio",
    basePrice: 500000,
    phone: "+91 98370 44102",
    location: "Dehradun"
  };

  // Dashboard Navigation Tabs
  const [activeTab, setThemeTab] = useState('overview');

  // Wallet & Milestone States (40-40-20 framework)
  const [escrowLocked, setEscrowLocked] = useState(Math.round(passedVendor.basePrice * 0.4));
  const [pendingMilestone, setPendingMilestone] = useState(Math.round(passedVendor.basePrice * 0.4));
  const [withdrawableBalance, setWithdrawableBalance] = useState(0);
  
  // GPS & Visual Verification States
  const [isVerifyingGps, setIsVerifyingGps] = useState(false);
  const [gpsVerified, setGpsVerified] = useState(false);

  // Flash Deal & Liquidity States
  const [flashDealActive, setFlashDealActive] = useState(false);
  const [isCashingOut, setIsCashingOut] = useState(false);

  // --- PORTFOLIO & PROFILE BUILDER (WITH LIMITS & DELETION) ---
  const [portfolioImages, setPortfolioImages] = useState([
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&q=80&w=600"
  ]);
  const [newImgLink, setNewImgLink] = useState('');

  const [reels, setReels] = useState([
    "Cinematic Varmala Teaser (4K)",
    "Pre-Wedding Drone Highlight Reel",
    "Emotional Bride Entry Sequence",
    "Reception Night Party Montage"
  ]);
  const [newReelTitle, setNewReelTitle] = useState('');

  const [reviewsList, setReviewsList] = useState([
    { author: "Aniket & Sneha", rating: 5, comment: "Absolute perfection! AUG Escrow gave us complete peace of mind." },
    { author: "Rohan Malhotra", rating: 5, comment: "Professional team, delivered raw footage right on schedule." },
    { author: "Priya Sharma", rating: 5, comment: "Best cinematic quality in Dehradun. Worth every rupee." },
    { author: "Vikram & Neha", rating: 4, comment: "Great drone shots and polite staff during pheras." },
    { author: "Alok Verma", rating: 5, comment: "Seamless milestone payouts and verified GPS tracking." }
  ]);

  // --- CATEGORY AWARE BROCHURE & SPECIFICATIONS ---
  const getDefaultBrochure = (cat) => {
    switch (cat) {
      case 'Makeup Artist':
        return "Professional Kit Brands: MAC, Huda Beauty, Bobbi Brown, Kryolan. Includes trial session, draping, hair styling, and premium airbrush makeup.";
      case 'Event Planner':
        return "Theme Specialization: Royal Heritage, Bohemian Sunset, Minimalist Luxury. Full on-ground crew of 15 supervisors, vendor coordination, and live checklist execution.";
      case 'Destination':
        return "Venue Capacity: 500-1200 Guests. Rooms: 45 Luxury Suites. Amenities: Lawn, Banquet Hall, In-house multi-cuisine catering, and power backup.";
      default:
        return "Camera Setup: Sony A7IV & FX3. Lenses: 35mm f/1.4, 85mm f/1.4, 24-70mm. Lighting: Godox AD600 Pro. Deliverables: Raw 4K footage + 3 Cinematic Teasers.";
    }
  };

  const [brochureText, setBrochureText] = useState(getDefaultBrochure(passedVendor.category));
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [pdfDownloaded, setPdfDownloaded] = useState(false);

  // Handle Add Image with Max Limit (12)
  const handleAddImage = (e) => {
    e.preventDefault();
    if (!newImgLink.trim()) return;
    if (portfolioImages.length >= 12) {
      alert("Maximum limit reached! You can upload up to 12 portfolio images.");
      return;
    }
    setPortfolioImages(prev => [newImgLink, ...prev]);
    setNewImgLink('');
  };

  // Handle Delete Image
  const handleDeleteImage = (indexToDelete) => {
    setPortfolioImages(prev => prev.filter((_, idx) => idx !== indexToDelete));
  };

  // Handle Add Reel with Max Limit (4)
  const handleAddReel = (e) => {
    e.preventDefault();
    if (!newReelTitle.trim()) return;
    if (reels.length >= 4) {
      alert("Maximum limit reached! You can upload up to 4 cinematic reels.");
      return;
    }
    setReels(prev => [newReelTitle, ...prev]);
    setNewReelTitle('');
  };

  // Handle Delete Reel
  const handleDeleteReel = (indexToDelete) => {
    setReels(prev => prev.filter((_, idx) => idx !== indexToDelete));
  };

  // Save Profile with Demo Safety
  const handleSaveProfile = (e) => {
    e.preventDefault();
    setIsSavingProfile(true);
    setTimeout(() => {
      setIsSavingProfile(false);
      alert("Studio Profile & Category Brochure successfully published to Wedding Granth Directory!");
    }, 1500);
  };

  // Simulate PDF Brochure Download
  const handleDownloadBrochurePdf = () => {
    setPdfDownloaded(true);
    setTimeout(() => {
      alert(`Official PDF Brochure for "${passedVendor.name}" (${passedVendor.category}) downloaded successfully via AUG Vault!`);
      setPdfDownloaded(false);
    }, 1200);
  };

  // Live Chat States
  const [chatMessages, setChatMessages] = useState([
    { sender: 'client', text: 'Hello! We have successfully locked our 40% advance token via AUG Escrow.' },
    { sender: 'vendor', text: `Welcome! This is ${passedVendor.name}. Our team is fully aligned with your milestone schedule.` }
  ]);
  const [inputMsg, setInputMsg] = useState('');

  const handleVerifyGpsProof = () => {
    setIsVerifyingGps(true);
    setTimeout(() => {
      setIsVerifyingGps(false);
      setGpsVerified(true);
      setWithdrawableBalance(prev => prev + pendingMilestone);
      setPendingMilestone(0);
    }, 2500);
  };

  const handleEarlyPayout = () => {
    if (escrowLocked <= 0) {
      alert("No locked escrow funds available for early payout.");
      return;
    }
    setIsCashingOut(true);
    setTimeout(() => {
      setIsCashingOut(false);
      setWithdrawableBalance(prev => prev + escrowLocked);
      setEscrowLocked(0);
      alert("Instant liquidity payout of 99% successfully routed via IMPS.");
    }, 2000);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    setChatMessages(prev => [...prev, { sender: 'vendor', text: inputMsg }]);
    setInputMsg('');
    setTimeout(() => {
      setChatMessages(prev => [...prev, { sender: 'client', text: `Got it! Thanks for the update.` }]);
    }, 1200);
  };

  return (
    <div className="w-full min-h-screen bg-[#FDFBF7] flex flex-col font-sans selection:bg-[#8B0000] selection:text-white">
      
      {/* Top Navigation Bar */}
      <header className="w-full bg-white border-b border-[#8B0000]/15 py-4 px-8 flex justify-between items-center sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#8B0000] text-white flex items-center justify-center font-serif font-bold text-lg shadow-md">
            WG
          </div>
          <div>
            <h1 className="font-serif font-bold text-gray-900 text-lg leading-tight">{passedVendor.name}</h1>
            <p className="text-[10px] font-bold text-[#8B0000] uppercase tracking-widest">{passedVendor.category} • {passedVendor.location || 'Dehradun Node'}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 bg-[#FDFBF7] px-4 py-2 rounded-xl border border-gray-200 text-xs font-mono text-gray-700">
            <ShieldCheck size={16} className="text-green-600" />
            <span>Escrow Node: <b>SECURE-IN-982</b></span>
          </div>
          <button 
            onClick={() => navigate('/')}
            className="text-xs font-bold text-gray-600 hover:text-[#8B0000] transition-colors bg-gray-50 px-4 py-2 rounded-xl border border-gray-200 cursor-pointer"
          >
            Exit Portal
          </button>
        </div>
      </header>

      {/* Main Dashboard Layout */}
      <div className="max-w-7xl w-full mx-auto px-6 py-10 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* SIDEBAR NAVIGATION */}
        <div className="lg:col-span-3 space-y-2">
          <div className="bg-white p-4 rounded-3xl border border-[#8B0000]/15 shadow-sm space-y-1">
            <button
              onClick={() => setThemeTab('overview')}
              className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold transition-all flex items-center gap-3 cursor-pointer ${activeTab === 'overview' ? 'bg-[#8B0000] text-white shadow-md' : 'text-gray-700 hover:bg-[#FDFBF7]'}`}
            >
              <Wallet size={16} /> Escrow & Wallet Ledger
            </button>
            <button
              onClick={() => setThemeTab('profile')}
              className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold transition-all flex items-center gap-3 cursor-pointer ${activeTab === 'profile' ? 'bg-[#8B0000] text-white shadow-md' : 'text-gray-700 hover:bg-[#FDFBF7]'}`}
            >
              <Layers size={16} /> Studio Profile & Brochure
            </button>
            <button
              onClick={() => setThemeTab('gps')}
              className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold transition-all flex items-center gap-3 cursor-pointer ${activeTab === 'gps' ? 'bg-[#8B0000] text-white shadow-md' : 'text-gray-700 hover:bg-[#FDFBF7]'}`}
            >
              <Camera size={16} /> GPS & Proof Verification
            </button>
            <button
              onClick={() => setThemeTab('packages')}
              className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold transition-all flex items-center gap-3 cursor-pointer ${activeTab === 'packages' ? 'bg-[#8B0000] text-white shadow-md' : 'text-gray-700 hover:bg-[#FDFBF7]'}`}
            >
              <Tag size={16} /> Packages & Flash Deals
            </button>
            <button
              onClick={() => setThemeTab('chat')}
              className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold transition-all flex items-center gap-3 cursor-pointer ${activeTab === 'chat' ? 'bg-[#8B0000] text-white shadow-md' : 'text-gray-700 hover:bg-[#FDFBF7]'}`}
            >
              <MessageSquare size={16} /> Active Client Chat
            </button>
          </div>

          {/* Quick Support Card */}
          <div className="bg-[#8B0000] text-white p-6 rounded-3xl shadow-lg relative overflow-hidden">
            <Zap size={24} className="mb-3 text-amber-300" />
            <h4 className="font-serif font-bold text-base mb-1">Instant Liquidity</h4>
            <p className="text-xs text-gray-200 mb-4">Unlock locked escrow milestone funds early with 1% liquidity fee.</p>
            <button 
              onClick={handleEarlyPayout}
              disabled={isCashingOut}
              className="w-full bg-white text-[#8B0000] py-2.5 rounded-xl font-bold text-xs hover:bg-gray-100 transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              {isCashingOut ? <Loader2 className="animate-spin" size={14} /> : <DollarSign size={14} />}
              {isCashingOut ? 'Processing IMPS...' : 'Request Early Payout'}
            </button>
          </div>
        </div>

        {/* CONTENT AREA */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* TAB 1: OVERVIEW & WALLET LEDGER */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-[#8B0000]/15 shadow-sm">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Escrow Locked (40% Token)</p>
                  <p className="text-3xl font-serif font-bold text-[#8B0000]">₹ {escrowLocked.toLocaleString('en-IN')}</p>
                  <p className="text-[10px] text-green-700 font-bold mt-2">✓ Safe in AUG Vault</p>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-[#8B0000]/15 shadow-sm">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Pending Setup Proof (40%)</p>
                  <p className="text-3xl font-serif font-bold text-gray-900">₹ {pendingMilestone.toLocaleString('en-IN')}</p>
                  <p className="text-[10px] text-amber-600 font-bold mt-2">⏳ Locked till Shoot Day</p>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-[#8B0000]/15 shadow-sm">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Withdrawable Balance</p>
                  <p className="text-3xl font-serif font-bold text-green-700">₹ {withdrawableBalance.toLocaleString('en-IN')}</p>
                  <p className="text-[10px] text-gray-500 font-bold mt-2">Ready for Bank Transfer</p>
                </div>
              </div>

              {/* Tax & GST Ledger Summary */}
              <div className="bg-white rounded-3xl p-8 border border-[#8B0000]/15 shadow-sm space-y-4">
                <h3 className="text-xl font-serif font-bold text-gray-900 flex items-center gap-2">
                  <FileText size={20} className="text-[#8B0000]" /> Automated GST & Tax Compliance Ledger
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono text-gray-700">
                  <div className="bg-[#FDFBF7] p-4 rounded-2xl border border-gray-200 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Gross Contract Value:</span>
                      <span className="font-bold">₹ {(passedVendor.basePrice).toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Platform Escrow Fee (2%):</span>
                      <span className="font-bold text-[#8B0000]">- ₹ {Math.round(passedVendor.basePrice * 0.02).toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                  <div className="bg-[#FDFBF7] p-4 rounded-2xl border border-gray-200 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Net Vendor Earnings:</span>
                      <span className="font-bold text-green-700">₹ {Math.round(passedVendor.basePrice * 0.98).toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">GST Invoice Status:</span>
                      <span className="font-bold text-green-700">B2C Compliant Generated</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: STUDIO PROFILE & PORTFOLIO BUILDER WITH DELETION & BROCHURE */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-3xl p-8 border border-[#8B0000]/15 shadow-sm space-y-8">
              <div className="flex justify-between items-center flex-wrap gap-4">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-gray-900 flex items-center gap-2">
                    <Layers size={24} className="text-[#8B0000]" /> Studio Profile & Brochure Manager
                  </h3>
                  <p className="text-xs text-gray-600 mt-1">
                    Manage portfolio photos (Max 12), cinematic reels (Max 4), verified reviews, and download category PDF brochures.
                  </p>
                </div>
                <button
                  onClick={handleDownloadBrochurePdf}
                  disabled={pdfDownloaded}
                  className="bg-gray-900 text-white px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-black transition flex items-center gap-2 shadow-sm cursor-pointer"
                >
                  {pdfDownloaded ? <Loader2 className="animate-spin" size={14} /> : <Download size={14} />}
                  <span>Download PDF Brochure</span>
                </button>
              </div>

              {/* 1. Portfolio Images Section (With Limit & Delete) */}
              <div className="space-y-4 bg-[#FDFBF7] p-6 rounded-2xl border border-gray-200">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                    <Image size={16} className="text-[#8B0000]" /> Portfolio Gallery ({portfolioImages.length} / 12 Max)
                  </h4>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${portfolioImages.length >= 12 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                    {portfolioImages.length >= 12 ? 'Limit Reached (12/12)' : `${12 - portfolioImages.length} Slots Available`}
                  </span>
                </div>
                
                <form onSubmit={handleAddImage} className="flex gap-2">
                  <input 
                    type="url"
                    placeholder="Paste image URL (Unsplash/Cloudinary)..."
                    value={newImgLink}
                    onChange={(e) => setNewImgLink(e.target.value)}
                    className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-[#8B0000]"
                  />
                  <button type="submit" className="bg-[#8B0000] text-white px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-[#660000] cursor-pointer">
                    Add Photo
                  </button>
                </form>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
                  {portfolioImages.map((img, idx) => (
                    <div key={idx} className="relative h-32 rounded-xl overflow-hidden border border-gray-200 shadow-sm group bg-white">
                      <img src={img} alt="Portfolio" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button 
                          type="button"
                          onClick={() => handleDeleteImage(idx)}
                          className="bg-red-600 text-white p-2 rounded-xl hover:bg-red-700 transition shadow-md cursor-pointer"
                          title="Delete Image"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <span className="absolute bottom-1 left-1 bg-black/70 text-white text-[9px] px-1.5 py-0.5 rounded">#0{idx+1}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. Reels Section (With Limit & Delete) */}
              <div className="space-y-4 bg-[#FDFBF7] p-6 rounded-2xl border border-gray-200">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                    <Video size={16} className="text-[#8B0000]" /> Cinematic Reels ({reels.length} / 4 Max)
                  </h4>
                  <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold">Max 4 Reels Allowed</span>
                </div>
                <form onSubmit={handleAddReel} className="flex gap-2">
                  <input 
                    type="text"
                    placeholder="Enter reel title or link..."
                    value={newReelTitle}
                    onChange={(e) => setNewReelTitle(e.target.value)}
                    className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-[#8B0000]"
                  />
                  <button type="submit" className="bg-[#8B0000] text-white px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-[#660000] cursor-pointer">
                    Add Reel
                  </button>
                </form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {reels.map((reel, idx) => (
                    <div key={idx} className="bg-white p-3 rounded-xl border border-gray-200 text-xs font-bold text-gray-800 flex items-center justify-between shadow-sm">
                      <span>🎬 {reel}</span>
                      <button 
                        type="button" 
                        onClick={() => handleDeleteReel(idx)}
                        className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                        title="Delete Reel"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Reviews Section */}
              <div className="space-y-4 bg-[#FDFBF7] p-6 rounded-2xl border border-gray-200">
                <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                  <Star size={16} className="text-amber-500 fill-amber-500" /> Client Testimonials & Ratings ({reviewsList.length} Reviews)
                </h4>
                <div className="space-y-2">
                  {reviewsList.map((rev, idx) => (
                    <div key={idx} className="bg-white p-3 rounded-xl border border-gray-200 flex justify-between items-center text-xs shadow-sm">
                      <div>
                        <b className="text-gray-900">{rev.author}</b>
                        <p className="text-gray-600 italic mt-0.5">"{rev.comment}"</p>
                      </div>
                      <div className="flex text-amber-500 gap-0.5">
                        {[...Array(rev.rating)].map((_, i) => (<Star key={i} size={12} className="fill-amber-500" />))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Category-Aware Brochure & Gear Specs */}
              <div className="space-y-3 bg-[#FDFBF7] p-6 rounded-2xl border border-gray-200">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                    <FileCheck size={16} className="text-[#8B0000]" /> Brochure Specifications ({passedVendor.category})
                  </h4>
                  <span className="text-[10px] bg-[#8B0000]/10 text-[#8B0000] font-bold px-2.5 py-1 rounded-full uppercase">Auto-Formatted Niche</span>
                </div>
                <textarea 
                  rows="3"
                  value={brochureText}
                  onChange={(e) => setBrochureText(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-xl p-4 text-xs outline-none focus:border-[#8B0000] font-mono"
                  placeholder="Mention camera gear, makeup kits, or venue layout specifications..."
                ></textarea>
              </div>

              <button 
                onClick={handleSaveProfile}
                disabled={isSavingProfile}
                className="w-full bg-[#8B0000] text-white py-3.5 rounded-xl font-bold text-sm hover:bg-[#660000] transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSavingProfile ? <Loader2 className="animate-spin" size={16} /> : <CheckCircle2 size={16} />}
                {isSavingProfile ? 'Syncing Profile to Network...' : 'Save & Publish Studio Profile'}
              </button>
            </div>
          )}

          {/* TAB 3: GPS & PROOF VERIFICATION */}
          {activeTab === 'gps' && (
            <div className="bg-white rounded-3xl p-8 border border-[#8B0000]/15 shadow-sm space-y-6">
              <h3 className="text-2xl font-serif font-bold text-gray-900 flex items-center gap-2">
                <Camera size={24} className="text-[#8B0000]" /> Live Location & Visual Validator
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                To unlock your 40% setup milestone payout, upload live shoot evidence tagged with venue geo-coordinates.
              </p>

              <div className="bg-[#FDFBF7] border-2 border-dashed border-[#8B0000]/30 rounded-3xl p-8 text-center space-y-4">
                {!gpsVerified ? (
                  <>
                    <div className="w-16 h-16 bg-[#8B0000]/10 text-[#8B0000] rounded-full flex items-center justify-center mx-auto">
                      <MapPin size={32} />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-gray-900 text-base">Venue Geolocation Match Pending</h4>
                      <p className="text-xs text-gray-500 mt-1">Latitude: 30.3165° N, Longitude: 78.0322° E ({passedVendor.location || 'Dehradun'} Node)</p>
                    </div>
                    <button
                      onClick={handleVerifyGpsProof}
                      disabled={isVerifyingGps}
                      className="bg-[#8B0000] text-white px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-[#660000] transition shadow-md inline-flex items-center gap-2 cursor-pointer"
                    >
                      {isVerifyingGps ? <Loader2 className="animate-spin" size={16} /> : <CheckCircle2 size={16} />}
                      {isVerifyingGps ? 'Verifying Visual Proof...' : 'Verify Live Location & Upload Proof'}
                    </button>
                  </>
                ) : (
                  <div className="py-6 space-y-3">
                    <div className="w-16 h-16 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 size={36} />
                    </div>
                    <h4 className="font-serif font-bold text-gray-900 text-lg">Milestone 2 (40%) Unlocked Successfully!</h4>
                    <p className="text-xs text-green-700 font-bold">₹ {pendingMilestone || Math.round(passedVendor.basePrice * 0.4)} has been credited to your withdrawable balance.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: PACKAGES & FLASH DEALS */}
          {activeTab === 'packages' && (
            <div className="bg-white rounded-3xl p-8 border border-[#8B0000]/15 shadow-sm space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-serif font-bold text-gray-900">Standardized Pricing & Flash Deals</h3>
                <div className="flex items-center gap-3 bg-[#FDFBF7] px-4 py-2 rounded-2xl border border-gray-200">
                  <span className="text-xs font-bold text-gray-700">24-Hour Flash Deal (15% Off)</span>
                  <input 
                    type="checkbox" 
                    checked={flashDealActive} 
                    onChange={(e) => setFlashDealActive(e.target.checked)}
                    className="w-4 h-4 accent-[#8B0000] cursor-pointer"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#FDFBF7] p-6 rounded-2xl border border-gray-200 space-y-3">
                  <span className="text-[10px] font-bold text-[#8B0000] uppercase tracking-wider">Tier 1</span>
                  <h4 className="font-serif font-bold text-lg text-gray-900">Silver Coverage</h4>
                  <p className="text-2xl font-bold text-gray-900">₹ {(passedVendor.basePrice * 0.8).toLocaleString('en-IN')}</p>
                  <p className="text-xs text-gray-500">1 Day Shoot • 2 Editors • Raw Delivery</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border-2 border-[#8B0000] shadow-md space-y-3 relative">
                  <span className="absolute -top-3 right-4 bg-[#8B0000] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">Most Popular</span>
                  <span className="text-[10px] font-bold text-[#8B0000] uppercase tracking-wider">Tier 2</span>
                  <h4 className="font-serif font-bold text-lg text-gray-900">Gold Cinematic</h4>
                  <p className="text-2xl font-bold text-[#8B0000]">₹ {(passedVendor.basePrice).toLocaleString('en-IN')}</p>
                  <p className="text-xs text-gray-500">Drone Included • Teaser Video • 3 Editors</p>
                </div>
                <div className="bg-[#FDFBF7] p-6 rounded-2xl border border-gray-200 space-y-3">
                  <span className="text-[10px] font-bold text-[#8B0000] uppercase tracking-wider">Tier 3</span>
                  <h4 className="font-serif font-bold text-lg text-gray-900">Platinum Luxury</h4>
                  <p className="text-2xl font-bold text-gray-900">₹ {(passedVendor.basePrice * 1.5).toLocaleString('en-IN')}</p>
                  <p className="text-xs text-gray-500">Pan-India Destination • Live Streaming • Album Box</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: ACTIVE CLIENT CHAT */}
          {activeTab === 'chat' && (
            <div className="bg-white rounded-3xl p-8 border border-[#8B0000]/15 shadow-sm space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <MessageSquare size={20} className="text-[#8B0000]" />
                  <h3 className="font-serif font-bold text-gray-900 text-lg">Secure Client Channel</h3>
                </div>
                <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-bold border border-green-200 font-mono">
                  <Phone size={12} /> Client Phone: +91 98210 XXXXX
                </div>
              </div>

              <div className="bg-[#FDFBF7] h-80 overflow-y-auto p-4 rounded-2xl space-y-3 border border-gray-200 text-xs font-sans">
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.sender === 'vendor' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[75%] p-3.5 rounded-2xl ${msg.sender === 'vendor' ? 'bg-[#8B0000] text-white rounded-br-none shadow-sm' : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-sm'}`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input 
                  type="text"
                  placeholder="Type message or milestone update to client..."
                  value={inputMsg}
                  onChange={(e) => setInputMsg(e.target.value)}
                  className="flex-1 bg-[#FDFBF7] border border-gray-200 rounded-xl px-4 py-3 text-xs outline-none focus:border-[#8B0000]"
                />
                <button type="submit" className="bg-[#8B0000] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#660000] transition cursor-pointer flex items-center justify-center gap-2">
                  <Send size={14} /> Send
                </button>
              </form>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}