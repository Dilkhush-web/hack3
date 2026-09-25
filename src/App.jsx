import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

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