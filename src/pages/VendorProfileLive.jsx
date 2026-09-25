import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ShieldCheck, Wallet, MapPin, Camera, Zap, MessageSquare, Phone, CheckCircle2, Loader2, ArrowRight, DollarSign, Tag, Image, Video, Star, FileCheck, Layers, Share2, TrendingUp, Eye, Sparkles, PlusCircle } from 'lucide-react';

export default function VendorProfileLive() {
  const location = useLocation();
  const navigate = useNavigate();

  // 1. Fetch vendor data passed from login/dashboard or fallback
  const vendorData = location.state?.vendor || {
    name: "The Royal Haveli Studio",
    category: "Photography Studio",
    basePrice: 500000,
    phone: "+91 98370 44102",
    location: "Dehradun"
  };

  // Analytics & Metrics
  const [profileViews] = useState(1428);
  const [trustScore] = useState(98);

  // --- CUSTOM OFFER CREATOR BY VENDOR ---
  const [customOfferTitle, setCustomOfferTitle] = useState('Festive Wedding Special: Get Free Drone Shot + 15% Off');
  const [isEditingOffer, setIsEditingOffer] = useState(false);
  const [tempOffer, setTempOffer] = useState(customOfferTitle);

  // Portfolio Images & Reels (Synced or Default Showcase)
  const portfolioImages = [
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=600"
  ];

  const reels = [
    "Cinematic Varmala Teaser (4K)",
    "Pre-Wedding Drone Highlight Reel",
    "Emotional Bride Entry Sequence",
    "Reception Night Party Montage"
  ];

  const reviewsList = [
    { author: "Aniket & Sneha", rating: 5, comment: "Absolute perfection! AUG Escrow gave us complete peace of mind." },
    { author: "Rohan Malhotra", rating: 5, comment: "Professional team, delivered raw footage right on schedule." },
    { author: "Priya Sharma", rating: 5, comment: "Best cinematic quality in Dehradun. Worth every rupee." },
    { author: "Vikram & Neha", rating: 4, comment: "Great drone shots and polite staff during pheras." },
    { author: "Alok Verma", rating: 5, comment: "Seamless milestone payouts and verified GPS tracking." }
  ];

  const handleSaveCustomOffer = (e) => {
    e.preventDefault();
    setCustomOfferTitle(tempOffer);
    setIsEditingOffer(false);
    alert("Custom promotional offer published live on your public profile!");
  };

  const handleWhatsAppShare = () => {
    alert(`Public Profile Link copied! Share with clients: https://weddinggranth.aug/profile/${encodeURIComponent(vendorData.name)}`);
  };

  return (
    <div className="w-full min-h-screen bg-[#FDFBF7] flex flex-col font-sans selection:bg-[#8B0000] selection:text-white">
      
      {/* Top Header */}
      <header className="w-full bg-white border-b border-[#8B0000]/15 py-4 px-8 flex justify-between items-center sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#8B0000] text-white flex items-center justify-center font-serif font-bold text-lg shadow-md">
            WG
          </div>
          <div>
            <h1 className="font-serif font-bold text-gray-900 text-lg leading-tight">{vendorData.name}</h1>
            <p className="text-[10px] font-bold text-[#8B0000] uppercase tracking-widest">{vendorData.category} • Live Analytics & Preview</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={handleWhatsAppShare}
            className="bg-[#8B0000]/10 text-[#8B0000] hover:bg-[#8B0000]/20 px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
          >
            <Share2 size={14} /> Share Profile
          </button>
          <button 
            onClick={() => navigate('/vendor-dash', { state: { vendor: vendorData } })}
            className="bg-[#8B0000] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#660000] transition shadow-sm cursor-pointer"
          >
            Escrow Wallet Dashboard
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl w-full mx-auto px-6 py-10 space-y-8 flex-1">
        
        {/* 1. ANALYTICS & GROWTH METRICS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-[#8B0000]/15 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Profile Visitors</p>
              <p className="text-3xl font-serif font-bold text-gray-900">{profileViews.toLocaleString()}</p>
              <span className="text-[10px] text-green-700 font-bold mt-1 flex items-center gap-1">
                <TrendingUp size={12} /> +24% this week
              </span>
            </div>
            <div className="w-12 h-12 bg-[#8B0000]/10 text-[#8B0000] rounded-2xl flex items-center justify-center">
              <Eye size={22} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#8B0000]/15 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">AUG Trust Score</p>
              <p className="text-3xl font-serif font-bold text-green-700">{trustScore} / 100</p>
              <span className="text-[10px] text-gray-500 font-bold mt-1">Verified Escrow Node</span>
            </div>
            <div className="w-12 h-12 bg-green-100 text-green-700 rounded-2xl flex items-center justify-center">
              <ShieldCheck size={22} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#8B0000]/15 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Escrow Inquiries</p>
              <p className="text-3xl font-serif font-bold text-[#8B0000]">14 Leads</p>
              <span className="text-[10px] text-amber-600 font-bold mt-1">Active Client Tokens</span>
            </div>
            <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-2xl flex items-center justify-center">
              <MessageSquare size={22} />
            </div>
          </div>
        </div>

        {/* 2. CUSTOM OFFER CREATOR BY VENDOR */}
        <div className="bg-gradient-to-r from-[#8B0000] to-[#5a0000] text-white p-6 rounded-3xl shadow-lg flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="space-y-1">
            <span className="bg-amber-400 text-gray-900 text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">
              Active Public Offer Banner
            </span>
            <h3 className="text-lg font-serif font-bold mt-1">📢 "{customOfferTitle}"</h3>
            <p className="text-xs text-gray-200">Couples visiting your profile will instantly see this banner during checkout.</p>
          </div>

          <div>
            {!isEditingOffer ? (
              <button 
                onClick={() => setIsEditingOffer(true)}
                className="bg-white text-[#8B0000] px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-gray-100 transition shadow-md cursor-pointer whitespace-nowrap"
              >
                Edit My Offer
              </button>
            ) : (
              <form onSubmit={handleSaveCustomOffer} className="flex gap-2 w-full md:w-auto">
                <input 
                  type="text"
                  value={tempOffer}
                  onChange={(e) => setTempOffer(e.target.value)}
                  className="bg-white text-gray-900 px-4 py-2 rounded-xl text-xs outline-none w-64"
                  placeholder="Enter custom offer..."
                  required
                />
                <button type="submit" className="bg-amber-400 text-gray-900 px-4 py-2 rounded-xl text-xs font-bold hover:bg-amber-300 cursor-pointer">
                  Save
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 3. LIVE PUBLIC PROFILE PREVIEW (CLEAN CLIENT VIEW) */}
        <div className="bg-white rounded-3xl p-8 border border-[#8B0000]/15 shadow-sm space-y-8">
          
          <div className="flex justify-between items-center flex-wrap gap-4 border-b border-gray-100 pb-6">
            <div>
              <span className="text-[10px] bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                ● Live Public Client Preview
              </span>
              <h2 className="text-3xl font-serif font-bold text-gray-900 mt-2">{vendorData.name}</h2>
              <p className="text-xs text-gray-500 mt-0.5">{vendorData.category} • Base Price: ₹ {vendorData.basePrice?.toLocaleString('en-IN')} • {vendorData.location || 'Dehradun'}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-gray-400 uppercase font-bold">Manage Uploads from Dashboard</p>
              <button 
                onClick={() => navigate('/vendor-dash', { state: { vendor: vendorData } })}
                className="text-xs font-bold text-[#8B0000] hover:underline mt-1 inline-flex items-center gap-1 cursor-pointer"
              >
                Go to Dashboard to Add/Delete Photos <ArrowRight size={12} />
              </button>
            </div>
          </div>

          {/* PORTFOLIO GALLERY SHOWCASE */}
          <div className="space-y-4 bg-[#FDFBF7] p-6 rounded-2xl border border-gray-200">
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <Image size={16} className="text-[#8B0000]" /> Portfolio Gallery ({portfolioImages.length} Photos Showcase)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {portfolioImages.map((img, idx) => (
                <div key={idx} className="relative h-32 rounded-2xl overflow-hidden border border-gray-200 shadow-sm bg-white group">
                  <img src={img} alt="Portfolio" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              ))}
            </div>
          </div>

          {/* CINEMATIC REELS SHOWCASE */}
          <div className="space-y-4 bg-[#FDFBF7] p-6 rounded-2xl border border-gray-200">
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <Video size={16} className="text-[#8B0000]" /> Cinematic Reels & Teasers ({reels.length} Active)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {reels.map((reel, idx) => (
                <div key={idx} className="bg-white p-3.5 rounded-2xl border border-gray-200 text-xs font-bold text-gray-800 flex items-center justify-between shadow-sm">
                  <span>🎬 {reel}</span>
                  <span className="text-[10px] text-green-600 font-mono">Verified 4K</span>
                </div>
              ))}
            </div>
          </div>

          {/* VERIFIED REVIEWS SHOWCASE */}
          <div className="space-y-4 bg-[#FDFBF7] p-6 rounded-2xl border border-gray-200">
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <Star size={16} className="text-amber-500 fill-amber-500" /> Verified Client Testimonials ({reviewsList.length} Reviews)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {reviewsList.map((rev, idx) => (
                <div key={idx} className="bg-white p-4 rounded-2xl border border-gray-200 space-y-1 shadow-sm text-xs">
                  <div className="flex justify-between items-center">
                    <b className="text-gray-900">{rev.author}</b>
                    <div className="flex text-amber-500 gap-0.5">
                      {[...Array(rev.rating)].map((_, i) => (<Star key={i} size={11} className="fill-amber-500" />))}
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"{rev.comment}"</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}