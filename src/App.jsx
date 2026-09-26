import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { ShieldAlert, Lock, Send, Sparkles, ArrowLeft } from 'lucide-react';

// Import Core Components & Pages
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import VibeMatcher from './pages/VibeMatcher';
import Checkout from './pages/Checkout';
import VendorAuth from './pages/VendorAuth';
import VendorDash from './pages/VendorDash';
import VendorProfileLive from './pages/VendorProfileLive';
import AdminOverview from './pages/AdminOverview';

// --- CHATSHIELD UTILITY & DEMO COMPONENT ---
const FORBIDDEN_REGEX = [
  /(\+91[\-\s]?)?[6-9]\d{9}/g,
  /\b\d{10,}\b/g,
  /@[a-zA-Z0-9_.]{3,}/g,
  /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
  /https?:\/\/[^\s]+/g,
  /www\.[^\s]+/g
];

function scanMessageForBypass(text) {
  if (!text) return { isClean: true, sanitizedText: text };
  let isViolating = false;
  for (let regex of FORBIDDEN_REGEX) {
    regex.lastIndex = 0;
    if (regex.test(text)) {
      isViolating = true;
      break;
    }
  }
  if (isViolating) {
    return {
      isClean: false,
      sanitizedText: "[Blocked by AUG ChatShield: Contact sharing or external links are prohibited to maintain escrow safety.]"
    };
  }
  return { isClean: true, sanitizedText: text };
}

function ChatShieldBanner() {
  return (
    <div className="bg-[#8B0000]/5 border border-[#8B0000]/20 px-4 py-3 rounded-2xl flex items-center justify-between text-xs text-[#8B0000] mb-4 shadow-sm">
      <div className="flex items-center gap-2.5">
        <ShieldAlert size={18} className="shrink-0" />
        <span><b>AUG ChatShield Active:</b> Phone numbers, emails, and external links are automatically scrubbed to secure your 40-40-20 escrow guarantee.</span>
      </div>
      <span className="hidden md:inline-flex items-center gap-1 font-mono text-[10px] bg-[#8B0000] text-white px-2.5 py-1 rounded-md shrink-0">
        <Lock size={10} /> 256-Bit Guard
      </span>
    </div>
  );
}

function EscrowChatRoom() {
  const [messages, setMessages] = useState([
    { sender: 'system', text: 'Secure escrow chat initiated between Client and Verified Studio Partner. ChatShield protection is online.' },
    { sender: 'vendor', text: 'Hello! Welcome to Wedding Granth. Let us finalize your milestone package details.' }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // Scan message via ChatShield
    const { sanitizedText } = scanMessageForBypass(inputText);

    setMessages(prev => [
      ...prev,
      { sender: 'user', text: inputText },
      { sender: 'shield', text: sanitizedText }
    ]);
    setInputText('');
  };

  return (
    <div className="w-full min-h-[85vh] bg-[#FDFBF7] py-12 px-6 flex flex-col items-center">
      <div className="max-w-3xl w-full">
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="inline-flex items-center gap-1 text-xs font-bold text-[#8B0000] hover:underline">
            <ArrowLeft size={14} /> Back to Home Terminal
          </Link>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Escrow Encrypted Chat
          </div>
        </div>

        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">Escrow Negotiation Node</h1>
        <p className="text-xs text-gray-600 mb-6">Test ChatShield live by typing a phone number (e.g., 9876543210) or email in the chat below.</p>

        <ChatShieldBanner />

        <div className="bg-white border border-[#8B0000]/20 rounded-3xl p-6 shadow-xl flex flex-col h-[450px]">
          <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : msg.sender === 'shield' ? 'items-center' : 'items-start'}`}>
                {msg.sender === 'shield' ? (
                  <div className="w-full bg-red-50 border border-red-200 text-[#8B0000] text-xs p-3 rounded-2xl text-center font-mono my-1">
                    🛡️ {msg.text}
                  </div>
                ) : (
                  <div className={`max-w-[80%] p-4 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user' ? 'bg-[#8B0000] text-white rounded-br-none' : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  }`}>
                    {msg.text}
                  </div>
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleSend} className="flex gap-3 pt-4 border-t border-gray-100">
            <input 
              type="text" 
              placeholder="Type message here (try typing a phone number or email)..." 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 bg-[#FDFBF7] border border-gray-200 rounded-xl px-4 py-3 text-xs outline-none focus:border-[#8B0000]"
            />
            <button 
              type="submit"
              className="bg-[#8B0000] text-white px-6 py-3 rounded-xl font-bold text-xs hover:bg-[#660000] transition flex items-center gap-2 shadow-md cursor-pointer"
            >
              <Send size={14} /> Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function AppLayout() {
  const location = useLocation();
  const isAdminRoute = location.pathname === '/granthadmin-aug';

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] selection:bg-[#8B0000] selection:text-white">
      {!isAdminRoute && <Navbar />}
      
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vibe-matcher" element={<VibeMatcher />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/vendor-auth" element={<VendorAuth />} />
          <Route path="/vendor-dash" element={<VendorDash />} />
          <Route path="/vendor-profile-live" element={<VendorProfileLive />} />
          <Route path="/granthadmin-aug" element={<AdminOverview />} />
          <Route path="/chat" element={<EscrowChatRoom />} />
          
          {/* Fallback */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}