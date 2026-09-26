import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, Globe, Terminal } from 'lucide-react';

export default function Footer() {
  const customLogoUrl = "https://res.cloudinary.com/doa6d6cyf/image/upload/v1790335406/Untitled_design_1_1_ppduhi.png";

  return (
    <footer className="w-full bg-[#0D0D0D] text-[#FDFBF7] pt-12 pb-8 px-6 lg:px-12 border-t border-[#8B0000]/30 font-sans relative overflow-hidden z-10">
      
      {/* Background Ambient Glow Accents */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-[#8B0000]/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start pb-10 border-b border-white/10 relative z-10">
        
        {/* Left Col: Brand Identity & Status */}
        <div className="md:col-span-6 space-y-4">
          <div className="flex items-center gap-3">
            <img 
              src={customLogoUrl} 
              alt="Wedding Granth Logo" 
              className="w-10 h-10 rounded-xl border-2 border-[#8B0000] object-cover bg-white shadow-md" 
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-lg tracking-tight text-white">Wedding Granth</span>
              </div>
              <p className="text-[10px] text-gray-400 font-mono tracking-widest uppercase mt-0.5">AfterUs Global Technology Node</p>
            </div>
          </div>

          <p className="text-xs text-gray-400 max-w-md leading-relaxed font-sans">
            India's pioneering escrow-backed wedding infrastructure. Eliminating vendor fraud and securing capital through our automated 40-40-20 milestone framework.
          </p>

          <div className="flex flex-wrap gap-2.5 pt-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/10 text-[10px] text-gray-300">
              <ShieldCheck size={13} className="text-emerald-400" />
              <span>256-Bit Escrow Vault Protected</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/10 text-[10px] text-gray-300">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
              <span>All Systems Operational</span>
            </div>
          </div>
        </div>

        {/* Right Cols: Startup Navigation Columns */}
        <div className="md:col-span-6 grid grid-cols-2 gap-6">
          
          {/* Platform Column */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-red-400 font-mono flex items-center gap-1.5">
              <Globe size={12} /> Platform
            </h4>
            <ul className="space-y-2 text-xs text-gray-300 font-medium">
              <li>
                <Link to="/" className="hover:text-white hover:translate-x-1 inline-block transition-all">
                  Home Terminal
                </Link>
              </li>
              <li>
                <Link to="/vibe-matcher" className="hover:text-white hover:translate-x-1 inline-block transition-all">
                  AI Vibe Matcher
                </Link>
              </li>
              <li>
                <Link to="/checkout" className="hover:text-white hover:translate-x-1 inline-block transition-all">
                  Secure Checkout
                </Link>
              </li>
              <li>
                <Link to="/vendor-auth" className="hover:text-white hover:translate-x-1 inline-block transition-all">
                  Vendor Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Compliance & Trust Column */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-red-400 font-mono flex items-center gap-1.5">
              <Lock size={12} /> Compliance
            </h4>
            <ul className="space-y-2 text-xs text-gray-400 font-medium">
              <li className="hover:text-gray-200 transition-colors cursor-default">Startup India Recognized</li>
              <li className="hover:text-gray-200 transition-colors cursor-default">PCI-DSS Payment Certified</li>
              <li className="hover:text-gray-200 transition-colors cursor-default">ChatShield Active Node</li>
              <li className="hover:text-gray-200 transition-colors cursor-default">Automated 100% Refund API</li>
            </ul>
          </div>

        </div>

      </div>

      {/* Bottom Sub-footer with Secure Admin Access Icon */}
      <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-[11px] text-gray-500 relative z-10">
        <p>© 2026 Wedding Granth (AfterUs Global Consultancy). All rights reserved.</p>
        
        <div className="flex items-center gap-6 font-medium text-gray-400">
          <span className="hover:text-white transition-colors cursor-pointer">Privacy Protocol</span>
          <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
          
          {/* Secret/Discreet Admin Terminal Gateway Icon */}
          <Link 
            to="/granthadmin-aug" 
            title="Master Admin & Calling Team CRM Terminal"
            className="flex items-center gap-1 px-2.5 py-1 bg-white/5 hover:bg-[#8B0000]/20 border border-white/10 hover:border-[#8B0000]/40 rounded-lg text-gray-300 hover:text-white transition-all"
          >
            <Terminal size={12} className="text-red-400" />
            <span className="font-mono text-[10px]">Admin Node</span>
          </Link>
        </div>
      </div>

    </footer>
  );
}