import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ShieldCheck, Lock } from 'lucide-react';

export default function Footer() {
  // 👉 YAHAN APNA LOGO LINK DAAL SAKTE HO (Replace the placeholder URL below)
  const customLogoUrl = "https://res.cloudinary.com/doa6d6cyf/image/upload/v1790335406/Untitled_design_1_1_ppduhi.png";

  return (
    <footer className="w-full bg-[#141414] text-[#FDFBF7] py-16 px-6 border-t border-[#8B0000]/30 font-sans relative overflow-hidden">
      
      {/* Background Glow Accent */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#8B0000]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 items-start pb-12 border-b border-white/10 relative z-10">
        
        {/* Left: Brand, Custom Logo Link & Tagline */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center gap-3">
            <img 
              src={customLogoUrl} 
              alt="AUG Logo" 
              className="w-10 h-10 rounded-xl border-2 border-[#8B0000] object-cover bg-white shadow-md" 
            />
            <div>
              <span className="font-serif font-bold text-lg tracking-tight text-white">Wedding Granth</span>
              <p className="text-[10px] text-red-400 font-mono tracking-widest uppercase">AUG Escrow Ecosystem</p>
            </div>
          </div>
          <p className="text-xs text-gray-400 max-w-sm leading-relaxed">
            India's premier escrow-backed wedding ecosystem. Securing client capital through a mandatory 40-40-20 milestone framework and zero-fraud guarantee.
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[11px] text-gray-300">
            <ShieldCheck size={14} className="text-green-500" />
            <span>256-Bit Bank-Grade Escrow Vault Protected</span>
          </div>
        </div>

        {/* Middle / Right: Quick Professional Links */}
        <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-red-400 mb-4 font-mono">Platform</h4>
            <ul className="space-y-2.5 text-xs text-gray-300 font-medium">
              <li><Link to="/" className="hover:text-white transition-colors">Home Terminal</Link></li>
              <li><Link to="/vibe-matcher" className="hover:text-white transition-colors">AI Vibe Matcher</Link></li>
              <li><Link to="/checkout" className="hover:text-white transition-colors">Secure Checkout</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-red-400 mb-4 font-mono">Administration</h4>
            <ul className="space-y-2.5 text-xs text-gray-300 font-medium">
              <li><Link to="/vendor-auth" className="hover:text-white transition-colors flex items-center gap-1">Vendor Portal <ArrowUpRight size={12} /></Link></li>
              <li><Link to="/granthadmin-aug" className="hover:text-white transition-colors">🔒 Master Admin Terminal</Link></li>
              <li><Link to="/granthadmin-aug" className="hover:text-white transition-colors">📞 Calling Team CRM</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-red-400 mb-4 font-mono">Compliance</h4>
            <ul className="space-y-2.5 text-xs text-gray-300 font-medium">
              <li className="text-gray-400">Startup India Recognized</li>
              <li className="text-gray-400">PCI-DSS Compliant</li>
              <li className="text-gray-400">ChatShield Active</li>
            </ul>
          </div>
        </div>

      </div>

      {/* Bottom Sub-footer */}
      
    </footer>
  );
}