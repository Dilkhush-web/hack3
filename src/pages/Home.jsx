import React, { useState } from 'react';
import { vendors } from '../data';
import { useNavigate } from 'react-router-dom';
import { Shield, CreditCard, Lock, Search, MapPin, IndianRupee, ChevronRight, ShieldCheck, EyeOff, CheckCircle2, Building, HelpCircle } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState({
    category: 'Photographers',
    location: '',
    budget: ''
  });

  const [escrowAmount, setEscrowAmount] = useState(500000);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate('/vibe-matcher', { state: searchQuery });
  };

  const topVendors = [
    { name: "The Royal Haveli", category: "Destination Venues", price: "₹8.5L", img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=800" },
    { name: "Glamour Studios", category: "Makeup Artists", price: "₹45k", img: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&q=80&w=800" },
    { name: "Amit Photography", category: "Photography", price: "₹1.2L", img: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800" },
    { name: "Elite Planners", category: "Event Planners", price: "₹3.0L", img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800" }
  ];

  const faqs = [
    { q: "What happens if a vendor cancels the booking?", a: "Our system initiates an automated 100% refund from the neutral escrow account directly to your source bank account within 24 hours." },
    { q: "When is the final payment released to the creator?", a: "The final 20% milestone is strictly held until you digitally approve the complete project handover on your dashboard." },
    { q: "Can I convert the escrow lock into EMIs?", a: "Yes. At checkout, you can select our integrated BNPL nodes to convert your total contract value into flexible monthly installments." }
  ];

  return (
    <div className="w-full min-h-screen bg-[#FDFBF7] flex flex-col items-center selection:bg-[#8B0000] selection:text-white relative overflow-hidden">
      
      {/* Subtle Tech Grid Background */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#8B0000 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
      </div>

      <div className="w-full bg-[#8B0000] text-[#FDFBF7] text-xs md:text-sm font-medium tracking-wide py-2 text-center z-10 shadow-sm">
        Currently in Closed Beta. Onboarding only the Top 5% verified creators.
      </div>

      {/* 1. Hero Section */}
      <section className="w-full max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-16 flex flex-col items-center text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/85 backdrop-blur-sm border border-[#8B0000]/15 text-[#8B0000] text-sm font-semibold tracking-wide mb-8 shadow-sm">
          <Lock size={16} />
          <span>India's First Managed Wedding Ecosystem</span>
        </div>
        
        <h1 className="text-5xl lg:text-7xl font-serif font-bold text-gray-900 leading-[1.15] mb-6 max-w-4xl tracking-tight">
          Your Vibe. Your Budget. <span className="text-[#8B0000] italic">Zero Fraud.</span>
        </h1>
        
        <p className="text-lg text-gray-600 font-sans max-w-2xl leading-relaxed mb-14">
          A centralized infrastructure to discover verified professionals, manage contracts, and secure your capital through milestone-based payouts.
        </p>

        {/* Dynamic Manual Search System */}
        <div className="w-full max-w-5xl bg-white p-2 rounded-2xl shadow-xl border border-[#8B0000]/20 mb-16">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-center divide-y md:divide-y-0 md:divide-x divide-gray-200">
            <div className="w-full md:w-1/4 px-4 py-4 md:py-2 flex items-center gap-3 hover:bg-[#FDFBF7] transition-colors rounded-l-xl">
              <Search className="text-[#8B0000]" size={20} />
              <div className="flex flex-col w-full text-left">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Service Type</label>
                <select 
                  className="w-full bg-transparent outline-none text-gray-900 font-semibold cursor-pointer appearance-none text-sm md:text-base"
                  value={searchQuery.category}
                  onChange={(e) => setSearchQuery({...searchQuery, category: e.target.value})}
                >
                  <option value="Photographers">Photography</option>
                  <option value="Destination">Destination Venues</option>
                  <option value="Makeup">Makeup Artists</option>
                  <option value="Event">Event Planners</option>
                </select>
              </div>
            </div>

            <div className="w-full md:w-1/3 px-4 py-4 md:py-2 flex items-center gap-3 hover:bg-[#FDFBF7] transition-colors">
              <MapPin className="text-[#8B0000]" size={20} />
              <div className="flex flex-col w-full text-left">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Location</label>
                <input 
                  type="text" 
                  placeholder="e.g. Dehradun"
                  required
                  className="w-full bg-transparent outline-none text-gray-900 font-semibold placeholder:text-gray-400 text-sm md:text-base"
                  value={searchQuery.location}
                  onChange={(e) => setSearchQuery({...searchQuery, location: e.target.value})}
                />
              </div>
            </div>

            <div className="w-full md:w-1/3 px-4 py-4 md:py-2 flex items-center gap-3 hover:bg-[#FDFBF7] transition-colors">
              <IndianRupee className="text-[#8B0000]" size={20} />
              <div className="flex flex-col w-full text-left">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Target Budget</label>
                <input 
                  type="number" 
                  placeholder="Exact amount"
                  required
                  min="10000"
                  className="w-full bg-transparent outline-none text-gray-900 font-semibold placeholder:text-gray-400 text-sm md:text-base"
                  value={searchQuery.budget}
                  onChange={(e) => setSearchQuery({...searchQuery, budget: e.target.value})}
                />
              </div>
            </div>

            <div className="w-full md:w-auto p-2 bg-white rounded-r-xl">
              <button 
                type="submit" 
                className="w-full h-full min-h-[56px] bg-[#8B0000] text-white px-8 rounded-xl font-bold hover:bg-[#660000] transition-colors flex items-center justify-center gap-2 whitespace-nowrap shadow-md"
              >
                Verify Matches <ChevronRight size={18} />
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Compliance Strip */}
      <div className="w-full border-y border-[#660000] bg-[#8B0000] py-5 relative z-10 shadow-md">
        <div className="max-w-5xl mx-auto px-6 flex flex-wrap justify-center md:justify-between items-center gap-6 text-xs md:text-sm font-bold text-[#FDFBF7] uppercase tracking-widest">
          <span className="flex items-center gap-2"><Building size={16} className="text-[#FDFBF7]/80" /> Startup India Recognized</span>
          <span className="flex items-center gap-2"><Lock size={16} className="text-[#FDFBF7]/80" /> 256-Bit Bank-Grade Escrow</span>
          <span className="flex items-center gap-2"><Shield size={16} className="text-[#FDFBF7]/80" /> PCI-DSS Compliant</span>
        </div>
      </div>

      {/* 2. Top Verified Vendors (Linked with data.js mapping) */}
      <section className="w-full py-24 bg-[#FDFBF7] relative z-10 border-b border-[#8B0000]/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">Verified Ecosystem Partners</h2>
              <p className="text-gray-600 font-sans">Top curated professionals backed by our escrow guarantee from system.</p>
            </div>
            <button onClick={handleSearch} className="flex items-center gap-2 text-[#8B0000] font-bold hover:text-[#660000] transition-colors">
              View Complete Directory <ChevronRight size={16} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {vendors.slice(0, 4).map((vendor, idx) => (
              <div 
                key={idx} 
                onClick={() => navigate('/vibe-matcher', { state: { category: vendor.category, location: 'Dehradun', budget: vendor.basePrice } })}
                className="bg-white rounded-2xl overflow-hidden border border-[#8B0000]/10 shadow-sm hover:shadow-lg transition-all group cursor-pointer"
              >
                <div className="h-48 relative overflow-hidden">
                  <img src={vendor.image} alt={vendor.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm border border-[#8B0000]/20">
                    <ShieldCheck size={14} className="text-[#8B0000]" />
                    <span className="text-[10px] font-bold text-gray-800 uppercase tracking-wide">Escrow Verified</span>
                  </div>
                </div>
                <div className="p-5 bg-white">
                  <div className="text-xs font-bold text-[#8B0000] uppercase tracking-wide mb-1">{vendor.category}</div>
                  <h3 className="text-lg font-serif font-bold text-gray-900 mb-2">{vendor.name}</h3>
                  <div className="text-[11px] text-gray-500 mb-4 line-clamp-1">{vendor.vibeTags?.join(' • ')}</div>
                  <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                    <span className="text-xs text-gray-500 font-medium">EMI / Base</span>
                    <span className="text-base font-bold text-gray-900">₹ {vendor.basePrice?.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. The Escrow Advantage */}
      <section className="w-full py-24 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">The Escrow Advantage</h2>
            <p className="text-gray-600 font-sans">
              Executing high-value contracts safely. We eliminate vendor fraud and secure your capital until delivery.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#FDFBF7] border border-[#8B0000]/10 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-white border border-[#8B0000]/20 text-[#8B0000] rounded-xl flex items-center justify-center mb-6">
                <Shield size={24} />
              </div>
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-3">Zero-Risk Booking</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                If a vendor fails to deliver or breaches compliance, the platform initiates an automated 100% refund directly from the escrow account.
              </p>
            </div>
            <div className="bg-[#FDFBF7] border border-[#8B0000]/10 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-white border border-[#8B0000]/20 text-[#8B0000] rounded-xl flex items-center justify-center mb-6">
                <CheckCircle2 size={24} />
              </div>
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-3">Quality Control</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Capital is released only upon verifiable proof of deliverables. Final payment is held until the complete project handover is approved.
              </p>
            </div>
            <div className="bg-[#FDFBF7] border border-[#8B0000]/10 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-white border border-[#8B0000]/20 text-[#8B0000] rounded-xl flex items-center justify-center mb-6">
                <EyeOff size={24} />
              </div>
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-3">Strict Data Privacy</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Communication is monitored via automated filters. Your personal contact details remain completely masked until the final contract is signed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-16 bg-[#FDFBF7] border-y border-[#8B0000]/10 relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white border border-[#8B0000]/10 p-6 rounded-xl flex gap-4 items-start shadow-sm">
                <HelpCircle className="text-[#8B0000] shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">{faq.q}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Plan Your Cashflow (40-40-20 Framework Calculator) */}
      <section className="w-full py-24 bg-white relative z-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-[#FDFBF7] border border-[#8B0000]/15 p-8 md:p-14 rounded-3xl shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#8B0000]/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/3"></div>

            <div className="text-center mb-12 relative z-10">
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-3">Plan Your Cashflow & Payouts</h2>
              <p className="text-gray-600 font-sans text-sm max-w-xl mx-auto">
                Stop paying unsecured 100% advances. Enter your exact target budget to simulate our 40-40-20 Escrow Milestone Framework.
              </p>
            </div>

            <div className="flex flex-col items-center mb-16 relative z-10 w-full max-w-2xl mx-auto">
              
              {/* Manual Number Input */}
              <div className="flex items-center bg-white px-6 py-3 rounded-2xl shadow-sm border border-[#8B0000]/20 mb-8 w-full md:w-auto">
                <span className="text-4xl font-serif font-bold text-[#8B0000] mr-2">₹</span>
                <input 
                  type="number" 
                  value={escrowAmount}
                  onChange={(e) => setEscrowAmount(Number(e.target.value) || 0)}
                  className="text-4xl font-serif font-bold text-[#8B0000] tracking-tight outline-none bg-transparent w-full md:w-48 text-left appearance-none"
                  min="0"
                />
              </div>

              {/* Range Slider Backup */}
              <input 
                type="range" 
                min="50000" 
                max="2500000" 
                step="50000"
                value={escrowAmount}
                onChange={(e) => setEscrowAmount(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#8B0000]"
              />
              <div className="w-full flex justify-between mt-4 text-xs font-bold text-gray-400 uppercase">
                <span>₹50K</span>
                <span className="text-[#8B0000]">Drag or Type Budget</span>
                <span>₹25L+</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
              <div className="absolute top-1/2 left-0 w-full h-px bg-gray-200 hidden md:block -z-10"></div>
              
              <div className="bg-white border-2 border-[#8B0000] p-6 rounded-2xl text-center shadow-md relative transform md:-translate-y-2">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#8B0000] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full whitespace-nowrap">
                  Step 1 (Advance)
                </div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1 mt-2">Token Paid</div>
                <div className="text-2xl font-bold text-gray-900 mb-2">40%</div>
                <div className="text-xl text-[#8B0000] font-bold">₹ {(escrowAmount * 0.4).toLocaleString('en-IN')}</div>
                <div className="text-xs text-gray-500 mt-2 font-medium">Secured in AUG Vault</div>
              </div>

              <div className="bg-white border border-gray-200 p-6 rounded-2xl text-center shadow-sm">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Step 2</div>
                <div className="text-2xl font-bold text-gray-900 mb-2">40%</div>
                <div className="text-xl text-[#8B0000] font-bold">₹ {(escrowAmount * 0.4).toLocaleString('en-IN')}</div>
                <div className="text-xs text-gray-500 mt-2 font-medium">Released on Setup Proof</div>
              </div>

              <div className="bg-white border border-gray-200 p-6 rounded-2xl text-center shadow-sm">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Step 3</div>
                <div className="text-2xl font-bold text-gray-900 mb-2">20%</div>
                <div className="text-xl text-[#8B0000] font-bold">₹ {(escrowAmount * 0.2).toLocaleString('en-IN')}</div>
                <div className="text-xs text-gray-500 mt-2 font-medium">Paid upon final handover</div>
              </div>
            </div>
            
            <div className="mt-12 text-center relative z-10">
              <div className="inline-flex items-center gap-2 bg-white border border-[#8B0000]/20 px-5 py-3 rounded-xl text-sm text-gray-700 font-bold shadow-sm">
                <CreditCard size={18} className="text-[#8B0000]" />
                Eligible for flexible monthly EMI installments starting at ₹{(escrowAmount / 12).toFixed(0)}/month post verification.
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}