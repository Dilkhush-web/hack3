import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { X, Heart, ShieldCheck, Loader2, CheckCircle2, ArrowRight, SlidersHorizontal, Tag, Sparkles, PhoneCall, Star, Video, Image as ImageIcon, ArrowLeft, MessageSquare, Lock } from 'lucide-react';
import { vendors } from '../data'; 
import ConciergeModal from '../components/ConciergeModal';

export default function VibeMatcher() {
  const location = useLocation();
  const navigate = useNavigate();

  const query = location.state || { category: 'Photography', location: 'Dehradun', budget: '500000' };

  const [matchStack, setMatchStack] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // States for Logic
  const [likedVendors, setLikedVendors] = useState([]);
  const [tasteProfile, setTasteProfile] = useState([]);
  const [activeToast, setActiveToast] = useState('');

  // Animation State
  const [cardAnim, setCardAnim] = useState('idle');

  // Processing & Results
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [finalMatches, setFinalMatches] = useState([]);
  const [crossRecs, setCrossRecs] = useState([]);

  // Vendor Detailed Profile State
  const [viewingProfileVendor, setViewingProfileVendor] = useState(null);

  // Concierge Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVendorForModal, setSelectedVendorForModal] = useState('');

  useEffect(() => {
    let filtered = vendors.filter(v => 
      v.category.toLowerCase().includes(query.category.toLowerCase().split(' ')[0])
    );

    if (filtered.length === 0) filtered = vendors; 

    const targetBudget = Number(query.budget) || 500000;
    filtered.sort((a, b) => Math.abs(a.basePrice - targetBudget) - Math.abs(b.basePrice - targetBudget));
    
    setMatchStack(filtered.slice(0, 5)); 
  }, [query]);

  const handleDecision = (decision) => {
    if (cardAnim !== 'idle') return;

    setCardAnim(decision === 'like' ? 'out-right' : 'out-left');

    setTimeout(() => {
      const currentVendor = matchStack[currentIndex];

      if (decision === 'like') {
        const primaryTag = currentVendor.vibeTags ? currentVendor.vibeTags[0] : 'Cinematic Luxury';
        setLikedVendors(prev => [...prev, currentVendor]);

        if (!tasteProfile.includes(primaryTag)) {
          setTasteProfile([...tasteProfile, primaryTag]);
          setActiveToast(`AI Parameter Logged: ${primaryTag}`);
          setTimeout(() => setActiveToast(''), 1500);
        }
      }

      if (currentIndex < matchStack.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setCardAnim('in');
        setTimeout(() => setCardAnim('idle'), 50);
      } else {
        processFinalMatches();
      }
    }, 300); 
  };

  const processFinalMatches = () => {
    setIsProcessing(true);

    setTimeout(() => {
      if (likedVendors.length > 0) {
        setFinalMatches(likedVendors);
      } else {
        setFinalMatches(matchStack.slice(0, 2));
      }

      const searchCatKeyword = query.category.toLowerCase().split(' ')[0];
      const otherVendors = vendors.filter(v => !v.category.toLowerCase().includes(searchCatKeyword));
      const uniqueCategories = {};
      otherVendors.forEach(v => {
        if (!uniqueCategories[v.category]) {
          uniqueCategories[v.category] = v;
        }
      });

      const recommendations = Object.values(uniqueCategories).slice(0, 3);
      setCrossRecs(recommendations);

      setIsProcessing(false);
      setShowResults(true);
    }, 3200);
  };

  // UI STATE 1: Data Processing Screen
  if (isProcessing) {
    return (
      <div className="w-full min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-5" 
             style={{ backgroundImage: 'radial-gradient(#8B0000 2px, transparent 2px)', backgroundSize: '40px 40px' }}>
        </div>
        <div className="relative z-10 flex flex-col items-center max-w-md text-center px-6">
          <div className="w-20 h-20 bg-[#FDFBF7] border border-[#8B0000]/20 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-[#8B0000]/10">
            <Loader2 size={32} className="text-[#8B0000] animate-spin" />
          </div>

          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-3">AI Deep Behavior Analysis</h2>
          <p className="text-gray-600 font-sans mb-6">
            Synthesizing your swipe patterns and securing your personal selections...
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {tasteProfile.slice(0, 3).map((tag, i) => (
              <span key={i} className="bg-[#8B0000] text-[#FDFBF7] px-4 py-1.5 rounded-full text-sm font-bold tracking-wide shadow-md flex items-center gap-1.5">
                <Tag size={12} /> {tag}
              </span>
            ))}
            {tasteProfile.length === 0 && (
              <span className="bg-[#8B0000] text-[#FDFBF7] px-4 py-1.5 rounded-full text-sm font-bold tracking-wide shadow-md">
                Curating Elite Selections
              </span>
            )}
          </div>

          <div className="w-full bg-[#8B0000]/10 h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#8B0000] h-full animate-[progress_3.2s_ease-in-out_forwards]"></div>
          </div>
        </div>
        <style>{`@keyframes progress { 0% { width: 0%; } 100% { width: 100%; } }`}</style>
      </div>
    );
  }

  // UI STATE 2: Detailed Vendor Profile View
  if (viewingProfileVendor) {
    const v = viewingProfileVendor;
    return (
      <div className="w-full min-h-screen bg-[#FDFBF7] py-12 px-6">
        <div className="max-w-5xl mx-auto">
          
          <button 
            onClick={() => setViewingProfileVendor(null)}
            className="inline-flex items-center gap-2 bg-white border border-[#8B0000]/20 text-[#8B0000] px-4 py-2 rounded-xl text-xs font-bold shadow-sm mb-8 hover:bg-gray-50 transition"
          >
            <ArrowLeft size={16} /> Back to Curated Selections
          </button>

          <div className="bg-white rounded-3xl p-8 border border-[#8B0000]/15 shadow-sm mb-10 flex flex-col md:flex-row gap-8 items-center">
            <img src={v.image} alt={v.name} className="w-full md:w-72 h-64 object-cover rounded-2xl shadow" />
            <div className="flex-1">
              <div className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-bold mb-3 border border-green-200">
                <ShieldCheck size={14} /> Secure Escrow Verified Profile
              </div>
              <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">{v.name}</h1>
              <p className="text-sm font-bold text-[#8B0000] uppercase tracking-wider mb-4">{v.category} • {v.vibeTags?.join(' • ')}</p>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">{v.description}</p>
              
              <div className="flex flex-wrap items-center gap-4">
                <div className="bg-[#FDFBF7] px-5 py-3 rounded-2xl border border-gray-200">
                  <p className="text-[10px] uppercase font-bold text-gray-400">Base Contract</p>
                  <p className="text-xl font-bold text-gray-900">₹ {v.basePrice?.toLocaleString('en-IN')}</p>
                </div>
                <div className="bg-[#FDFBF7] px-5 py-3 rounded-2xl border border-gray-200 flex items-center gap-2">
                  <Star className="text-amber-500 fill-amber-500" size={18} />
                  <div>
                    <p className="text-[10px] uppercase font-bold text-gray-400">Rating</p>
                    <p className="text-lg font-bold text-gray-900">{v.rating} ({v.reviewsCount || 120}+ reviews)</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mt-8 pt-6 border-t border-gray-100">
                <button 
                  onClick={() => {
                    setSelectedVendorForModal(v.name);
                    setIsModalOpen(true);
                  }}
                  className="bg-gray-900 text-white px-6 py-3.5 rounded-xl font-bold text-xs hover:bg-black transition flex items-center gap-2 shadow"
                >
                  <PhoneCall size={16} /> Instant Call (Connect in 2 Hours)
                </button>
                {/* Passing exact vendor state to checkout */}
                <button 
                  onClick={() => navigate('/checkout', { state: { vendor: v } })}
                  className="bg-[#8B0000] text-white px-6 py-3.5 rounded-xl font-bold text-xs hover:bg-[#660000] transition flex items-center gap-2 shadow-md"
                >
                  <Lock size={16} /> Proceed to Escrow Checkout
                </button>
              </div>
            </div>
          </div>

          <div className="mb-14">
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6 flex items-center gap-2">
              <ImageIcon className="text-[#8B0000]" size={22} /> Portfolio Showcase (10 Verified Shots)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {v.portfolioImages?.map((imgUrl, i) => (
                <div key={i} className="h-40 rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:scale-105 transition duration-300">
                  <img src={imgUrl} alt={`Portfolio ${i}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          <div className="mb-14">
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Video className="text-[#8B0000]" size={22} /> Cinematic Teaser Reels (2 Videos)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {v.videos?.map((vidUrl, i) => (
                <div key={i} className="bg-black rounded-2xl overflow-hidden shadow-lg h-64 relative flex items-center justify-center border border-gray-800">
                  <video controls className="w-full h-full object-cover">
                    <source src={vidUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Star className="text-[#8B0000]" size={22} /> Verified Escrow Client Reviews
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {v.reviews?.map((rev, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-1 text-amber-500 mb-2">
                    {[...Array(rev.rating)].map((_, idx) => (
                      <Star key={idx} size={14} className="fill-amber-500" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-700 italic mb-4">"{rev.comment}"</p>
                  <p className="text-xs font-bold text-gray-900">— {rev.user} (Verified Escrow Contract)</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        <ConciergeModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          vendorName={selectedVendorForModal} 
        />
      </div>
    );
  }

  // UI STATE 3: Final Curated Matches Grid
  if (showResults) {
    const isAutoSuggested = likedVendors.length === 0;

    return (
      <div className="w-full min-h-screen bg-[#FDFBF7] flex flex-col items-center py-20 px-6">
        <div className="max-w-6xl w-full">

          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#FDFBF7] border border-[#8B0000]/20 rounded-2xl mb-6 shadow-sm">
              {isAutoSuggested ? <Sparkles size={32} className="text-[#8B0000]" /> : <CheckCircle2 size={32} className="text-[#8B0000]" />}
            </div>
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-4 tracking-tight">
              {isAutoSuggested ? 'AI Calculated Top Matches' : 'Your Curated Vibe Selections'}
            </h2>
            <p className="text-lg text-gray-600 font-sans max-w-2xl mx-auto">
              Displaying your personally liked vendor profiles with complete portfolio access.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {finalMatches.map((vendor, idx) => (
              <div key={idx} className="bg-white rounded-3xl overflow-hidden shadow-lg border border-[#8B0000]/15 flex flex-col hover:shadow-xl transition-shadow group">
                <div className="relative h-72 overflow-hidden">
                  <img src={vendor.image} alt={vendor.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm border border-[#8B0000]/10">
                    <ShieldCheck size={14} className="text-[#8B0000]" />
                    <span className="text-xs font-bold text-gray-900 uppercase tracking-wide">
                      Verified Selection
                    </span>
                  </div>
                </div>

                <div className="p-8 flex-1 flex flex-col bg-white">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-serif font-bold text-gray-900">{vendor.name}</h3>
                      <p className="text-sm font-bold text-[#8B0000] uppercase tracking-wide mt-1">{vendor.category}</p>
                    </div>
                    <div className="text-right bg-[#FDFBF7] px-4 py-2 rounded-xl border border-[#8B0000]/20 shadow-sm">
                      <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Base Price</p>
                      <p className="text-xl font-bold text-gray-900">₹ {vendor.basePrice.toLocaleString('en-IN')}</p>
                    </div>
                  </div>

                  <div className="mb-4 text-xs text-gray-600 bg-[#FDFBF7] p-3 rounded-xl border border-gray-200">
                    💡 <span className="font-semibold text-gray-800">Escrow EMI:</span> Starting at ₹{(vendor.basePrice / 12).toFixed(0)}/month at checkout
                  </div>

                  <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
                    <button 
                      onClick={() => setViewingProfileVendor(vendor)}
                      className="flex-1 bg-gray-900 text-white px-4 py-3 rounded-xl text-xs font-bold hover:bg-black transition flex items-center justify-center gap-2 shadow"
                    >
                      Visit Profile <ArrowRight size={14} />
                    </button>
                    {/* Passing exact vendor object to checkout */}
                    <button 
                      onClick={() => navigate('/checkout', { state: { vendor } })}
                      className="flex-1 bg-[#8B0000] text-white px-4 py-3 rounded-xl text-xs font-bold hover:bg-[#660000] transition flex items-center justify-center gap-2 shadow-md"
                    >
                      Escrow Checkout
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CROSS-RECOMMENDATION SECTION */}
          {crossRecs.length > 0 && (
            <div className="w-full pt-16 border-t border-[#8B0000]/15">
              <div className="mb-10 text-center">
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">Complete Your Wedding Ecosystem</h3>
                <p className="text-gray-600">Secure remaining pillars safely via AUG Escrow.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {crossRecs.map((vendor, idx) => (
                  <div key={`rec-${idx}`} className="bg-white rounded-2xl overflow-hidden border border-[#8B0000]/15 shadow-sm hover:shadow-md transition-all cursor-pointer">
                    <div className="h-48 overflow-hidden relative">
                      <img src={vendor.image} alt={vendor.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      <div className="absolute bottom-4 left-4">
                        <p className="text-white text-xs font-bold uppercase tracking-widest">{vendor.category}</p>
                      </div>
                    </div>
                    <div className="p-5">
                      <h4 className="font-serif font-bold text-lg text-gray-900 mb-2">{vendor.name}</h4>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-[#8B0000]">₹ {vendor.basePrice.toLocaleString('en-IN')}</span>
                        <button 
                          onClick={() => setViewingProfileVendor(vendor)}
                          className="text-[#8B0000] hover:text-[#660000] transition-colors text-xs font-bold"
                        >
                          View Profile →
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    );
  }

  // UI STATE 4: Swipe Interface
  const currentCard = matchStack[currentIndex];

  let animationClass = "transition-all duration-300 ease-in-out transform ";
  if (cardAnim === 'idle') animationClass += "translate-x-0 opacity-100 scale-100";
  else if (cardAnim === 'out-right') animationClass += "translate-x-24 opacity-0 scale-95";
  else if (cardAnim === 'out-left') animationClass += "-translate-x-24 opacity-0 scale-95";
  else if (cardAnim === 'in') animationClass += "translate-x-0 opacity-0 scale-95 transition-none";

  return (
    <div className="w-full min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[30vh] bg-gradient-to-b from-[#8B0000]/5 to-transparent"></div>

      <div className="relative z-10 w-full max-w-md flex flex-col items-center">
        <div className={`w-full relative h-[62vh] ${animationClass}`}>
          {currentCard && (
            <div className="w-full bg-white rounded-[2rem] overflow-hidden shadow-xl shadow-[#8B0000]/10 border border-[#8B0000]/15 relative h-full flex flex-col">
              <img src={currentCard.image} alt={currentCard.name} className="w-full h-full object-cover absolute inset-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-gray-900/20 to-transparent"></div>

              <div className="relative z-10 mt-auto p-8 text-white w-full">
                <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full mb-3 border border-white/30">
                  <ShieldCheck size={14} className="text-green-400" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Secure Escrow Protected</span>
                </div>

                <h2 className="text-3xl font-serif font-bold mb-1 drop-shadow-md leading-tight">{currentCard.name}</h2>
                <div className="flex items-end justify-between mt-3">
                  <p className="text-xs font-bold text-gray-300 uppercase tracking-widest">{currentCard.category}</p>
                  <p className="text-2xl font-bold">₹ {currentCard.basePrice.toLocaleString('en-IN')}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="w-full flex justify-center gap-8 mt-6">
          <button onClick={() => handleDecision('cancel')} disabled={cardAnim !== 'idle'} className="w-16 h-16 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center text-gray-500 shadow-sm">
            <X size={28} />
          </button>
          <button onClick={() => handleDecision('like')} disabled={cardAnim !== 'idle'} className="w-16 h-16 rounded-full bg-[#8B0000] flex items-center justify-center text-white shadow-lg">
            <Heart size={28} fill="currentColor" />
          </button>
        </div>
      </div>
    </div>
  );
}