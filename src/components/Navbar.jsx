import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Building2, ArrowRight, ShieldCheck, MapPin, ChevronDown, Lock, Compass, Home, Sparkles } from 'lucide-react';

export default function Navbar({ vendorUser }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('Dehradun');
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);

  const customLogoUrl = "https://res.cloudinary.com/doa6d6cyf/image/upload/v1790335406/Untitled_design_1_1_ppduhi.png"; 
  const isVendorRoute = location.pathname.includes('vendor-dash') || location.pathname.includes('vendor-auth');
  const activeVendorName = vendorUser?.name || location.state?.vendor?.name;
  const cities = ['Dehradun', 'Delhi NCR', 'Mumbai', 'Jaipur', 'Udaipur', 'Goa'];

  return (
    <header className="w-full bg-[#FDFBF7]/90 backdrop-blur-2xl border-b border-[#8B0000]/15 sticky top-0 z-50 shadow-sm transition-all">
      
      {/* 1. TOP LIVE SECURITY TICKER (Pure Fintech Startup Vibe) */}
      

      {/* 2. MAIN PREMIUM NAVBAR HEADER */}
      <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between">
        
        {/* Left: Brand Identity & City Switcher */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-3.5 group cursor-pointer">
            <img 
              src={customLogoUrl} 
              alt="AUG Logo" 
              className="w-10 h-10 rounded-xl border-2 border-[#8B0000] object-cover bg-white shadow-md group-hover:scale-105 transition-transform" 
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif font-bold text-gray-900 text-base tracking-tight">Wedding Granth</span>
                <span className="text-[9px] bg-[#8B0000]/10 text-[#8B0000] font-bold px-2 py-0.5 rounded-full border border-[#8B0000]/20 uppercase">
                  Escrow OS
                </span>
              </div>
              <p className="text-[10px] text-gray-500 font-sans tracking-wide">India's First Managed Wedding Ecosystem</p>
            </div>
          </Link>

          {/* City Selector */}
          <div className="relative hidden lg:block">
            <button 
              onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
              className="flex items-center gap-1.5 bg-white border border-gray-200 px-3 py-1.5 rounded-xl text-xs font-bold text-gray-700 hover:border-[#8B0000] transition shadow-sm cursor-pointer"
            >
              <MapPin size={14} className="text-[#8B0000]" />
              <span>{selectedCity}</span>
              <ChevronDown size={12} className="text-gray-400" />
            </button>

            {cityDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-40 bg-white border border-gray-200 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in zoom-in duration-150">
                {cities.map((city, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setSelectedCity(city); setCityDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2 text-xs font-bold text-gray-700 hover:bg-[#8B0000]/5 hover:text-[#8B0000] transition cursor-pointer"
                  >
                    {city}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Center: Sleek Startup Pill Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-white border border-[#8B0000]/15 p-1.5 rounded-2xl shadow-sm">
          <Link 
            to="/" 
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              location.pathname === '/' ? 'bg-[#8B0000] text-white shadow-sm' : 'text-gray-700 hover:text-[#8B0000]'
            }`}
          >
            Home
          </Link>
          <Link 
            to="/explore-vendors" 
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              location.pathname.includes('explore-vendors') ? 'bg-[#8B0000] text-white shadow-sm' : 'text-gray-700 hover:text-[#8B0000]'
            }`}
          >
            Directory
          </Link>
          <Link 
            to="/checkout" 
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              location.pathname.includes('checkout') ? 'bg-[#8B0000] text-white shadow-sm' : 'text-gray-700 hover:text-[#8B0000]'
            }`}
          >
            Escrow Vault
          </Link>
         
        </nav>

        {/* Right Corner: Partner Node CTA */}
        <div className="hidden md:flex items-center gap-3">
          {isVendorRoute && activeVendorName ? (
            <div className="bg-[#8B0000]/10 border border-[#8B0000]/30 px-4 py-2 rounded-2xl flex items-center gap-2 text-xs font-bold text-[#8B0000]">
              <Building2 size={14} />
              <span>Partner: {activeVendorName}</span>
            </div>
          ) : (
            <button
              onClick={() => navigate('/vendor-auth')}
              className="bg-gray-900 text-white px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-black transition-all shadow-md flex items-center gap-2 group cursor-pointer"
            >
              <span>Vendor Portal</span>
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-white border border-gray-200 text-gray-700 shadow-sm cursor-pointer"
          >
            {mobileMenuOpen ? <span className="font-bold text-xs">CLOSE</span> : <span className="font-bold text-xs">MENU</span>}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-6 py-6 space-y-4 shadow-2xl animate-in slide-in-from-top duration-200">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-bold text-gray-800 py-2 border-b border-gray-50">Home</Link>
          <Link to="/explore-vendors" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-bold text-gray-800 py-2 border-b border-gray-50">Explore Vendors</Link>
          <Link to="/checkout" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-bold text-gray-800 py-2 border-b border-gray-50">Escrow Vault</Link>
          <Link to="/vibe-matcher" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-bold text-red-700 py-2 border-b border-gray-50">Vibe Matcher</Link>
          <button
            onClick={() => { setMobileMenuOpen(false); navigate('/vendor-auth'); }}
            className="w-full bg-[#8B0000] text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer mt-2"
          >
            <span>Vendor Portal Login</span> <ArrowRight size={14} />
          </button>
        </div>
      )}
    </header>
  );
}