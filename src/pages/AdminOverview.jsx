import React, { useState, useEffect } from 'react';
import { ShieldAlert, Lock, Unlock, KeyRound, DollarSign, Users, MessageSquare, AlertTriangle, CheckCircle2, XCircle, RefreshCw, Power, FileText, ArrowRight, Send, Check, PhoneCall, Clock } from 'lucide-react';

export default function AdminOverview() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null); // 'admin' (7488) or 'calling' (7484)
  const [passcode, setPasscode] = useState('');
  const [activeSubTab, setActiveSubTab] = useState('overview');
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  // Live Operational Data States
  const [registrations, setRegistrations] = useState([
    { id: 1, type: 'Vendor', name: 'The Royal Haveli Studio', category: 'Photography', status: 'Pending Verification', date: '2026-09-24' },
    { id: 2, type: 'Client EMI', name: 'Rahul Sharma', amount: '₹ 3,50,000', cibil: 785, status: 'Approved (ID Verified)', date: '2026-09-24' },
    { id: 3, type: 'Vendor', name: 'Aura Cinematics', category: 'Destination', status: 'Active Node', date: '2026-09-23' }
  ]);

  // Calling Team Leads Queue State (Loaded dynamically from localStorage & fallback default)
  const [callingLeads, setCallingLeads] = useState([]);

  useEffect(() => {
    const savedLeads = JSON.parse(localStorage.getItem('aug_calling_leads'));
    if (savedLeads && savedLeads.length > 0) {
      setCallingLeads(savedLeads);
    } else {
      // Default initial mock leads if storage is empty
      setCallingLeads([
        { 
          id: 1, 
          name: 'Aman Verma', 
          phone: '+91 98765 43210', 
          vendorName: 'Royal Lens & Cinematic Studio', 
          vendorPrice: '₹1,45,000', 
          leadType: 'Instant Call (2 Hrs)', 
          status: 'Pending Call', 
          notes: 'Wants cinematic trailer included.',
          weddingDate: '2026-12-10'
        },
        { 
          id: 2, 
          name: 'Priya Singh', 
          phone: '+91 91234 56789', 
          vendorName: 'The Grand Imperial Palace', 
          vendorPrice: '₹4,50,000', 
          leadType: 'AI Qualified Enquiry', 
          status: 'In Follow-up', 
          notes: 'Discussing 40-40-20 escrow milestone.',
          weddingDate: '2027-01-15'
        }
      ]);
    }
  }, []);

  const [escrowVaults, setEscrowVaults] = useState([
    { id: 'AUG-TXN-982', client: 'Rahul Sharma', vendor: 'The Royal Haveli', lockedAmount: 150000, netPayout: 147000, status: 'Token Secured (40%)' },
    { id: 'AUG-TXN-983', client: 'Priya Verma', vendor: 'Aura Cinematics', lockedAmount: 280000, netPayout: 274400, status: 'Setup Day Proof Pending' }
  ]);

  const [disputes, setDisputes] = useState([
    { id: 1, ticketId: 'DSP-402', parties: 'Amit Studio vs Client Neha', issue: 'Delay in raw footage delivery past milestone date.', status: 'Under Review' }
  ]);

  const [chatAlerts, setChatAlerts] = useState([
    { id: 1, vendor: 'The Royal Haveli', client: 'Rahul Sharma', trigger: 'Phone number sharing attempt detected', status: 'Frozen' },
  ]);

  const [auditLogs, setAuditLogs] = useState([
    { time: '16:30 IST', action: 'Secure God-Mode terminal initialized successfully.' },
    { time: '16:45 IST', action: 'ChatShield security intercepted 1 unauthorized contact share.' }
  ]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode.trim() === '7488') {
      setIsAuthenticated(true);
      setUserRole('admin');
      addLog('Master Admin terminal successfully unlocked.');
    } else if (passcode.trim() === '7484') {
      setIsAuthenticated(true);
      setUserRole('calling');
      addLog('Calling Team Sales CRM unlocked successfully.');
    } else {
      alert("Access Denied: Invalid Security Credentials.");
      setPasscode('');
    }
  };

  const addLog = (actionText) => {
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setAuditLogs(prev => [{ time: `${timeNow} IST`, action: actionText }, ...prev]);
  };

  const handleUpdateLeadStatus = (leadId, newStatus) => {
    const updated = callingLeads.map(l => l.id === leadId ? { ...l, status: newStatus } : l);
    setCallingLeads(updated);
    localStorage.setItem('aug_calling_leads', JSON.stringify(updated));
    addLog(`Updated lead status for ID ${leadId} to ${newStatus}.`);
  };

  const handleForceRelease = (id, vendorName, amount) => {
    setEscrowVaults(prev => prev.filter(v => v.id !== id));
    addLog(`Force-released escrow funds of ₹${amount} for transaction ${id} (${vendorName}).`);
    alert(`Success: Funds transferred to ${vendorName} via IMPS.`);
  };

  const handleTransferPayout = (vaultId, vendorName, netAmount) => {
    setEscrowVaults(prev => prev.filter(v => v.id !== vaultId));
    addLog(`Executed direct bank settlement of ₹${netAmount} for vendor ${vendorName}.`);
    alert(`Vendor Payout of ₹${netAmount} successfully settled to bank account.`);
  };

  const handleToggleChatBlock = (alertId) => {
    setChatAlerts(prev => prev.map(a => a.id === alertId ? { ...a, status: a.status === 'Frozen' ? 'Active' : 'Frozen' } : a));
    addLog(`Toggled chat security freeze state for alert ID ${alertId}.`);
  };

  if (!isAuthenticated) {
    return (
      <div className="w-full min-h-screen bg-[#141414] flex flex-col items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full bg-[#1F1F1F] border border-gray-800 rounded-3xl p-8 shadow-2xl text-center relative">
          <div className="w-16 h-16 bg-red-950/40 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-red-900/30">
            <Lock size={28} />
          </div>
          <h1 className="text-2xl font-serif font-bold text-white mb-2">AUG Gateway Terminal</h1>
          <p className="text-xs text-gray-400 mb-6">Enter Admin PIN (7488) or Calling Team PIN (7484)</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password"
              placeholder="••••"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              maxLength="4"
              className="w-full bg-[#121212] border border-gray-800 text-white rounded-xl px-4 py-3.5 text-center text-xl font-mono tracking-widest outline-none focus:border-red-600"
            />
            <button 
              type="submit"
              className="w-full bg-red-800 text-white py-3.5 rounded-xl font-bold text-sm hover:bg-red-700 transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <KeyRound size={16} /> Authenticate & Access
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ==========================================
  // CALLING TEAM CRM VIEW (PIN: 7484)
  // ==========================================
  if (userRole === 'calling') {
    return (
      <div className="w-full min-h-screen bg-[#FDFBF7] flex flex-col font-sans selection:bg-[#8B0000] selection:text-white">
        <header className="w-full bg-[#1A1A1A] text-white py-4 px-8 flex justify-between items-center sticky top-0 z-50 border-b border-red-900/30 shadow-md">
          <div className="flex items-center gap-3">
            <img 
              src="https://via.placeholder.com/40" 
              alt="AUG Logo" 
              className="w-10 h-10 rounded-xl border border-red-500 object-cover bg-white" 
            />
            <div>
              <h1 className="font-serif font-bold text-base tracking-tight">AUG Calling Team Sales CRM</h1>
              <p className="text-[10px] text-red-400 font-mono uppercase tracking-widest">Role: Sales & Deal Closer • Active Queue</p>
            </div>
          </div>
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="bg-red-900/40 text-red-300 px-4 py-2 rounded-xl text-xs font-bold hover:bg-red-900 transition-colors border border-red-800/50 cursor-pointer"
          >
            Lock Terminal
          </button>
        </header>

        <div className="max-w-7xl w-full mx-auto px-6 py-10 space-y-8 flex-1">
          <div className="bg-white rounded-3xl p-8 border border-[#8B0000]/15 shadow-sm space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-serif font-bold text-gray-900">Incoming Concierge Leads & Instant Call Queue</h3>
                <p className="text-xs text-gray-500 mt-1">Review live client inquiries submitted from the concierge modal and close deals.</p>
              </div>
              <span className="bg-red-100 text-[#8B0000] px-3 py-1 rounded-full text-xs font-bold">
                {callingLeads.length} Active Leads
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {callingLeads.map((lead) => (
                <div key={lead.id} className="bg-[#FDFBF7] p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-bold px-2.5 py-1 bg-red-900 text-white rounded-md uppercase">
                        {lead.leadType || lead.type}
                      </span>
                      <h4 className="font-bold text-lg text-gray-900 mt-2">{lead.name || lead.clientName}</h4>
                      <p className="text-xs font-mono text-gray-600">📞 {lead.phone} • Wedding: {lead.weddingDate}</p>
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-100 text-amber-800">
                      {lead.status}
                    </span>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-gray-200 space-y-1">
                    <p className="text-xs text-gray-400 uppercase tracking-wider font-bold">Vendor & Package Info:</p>
                    <div className="flex justify-between items-center">
                      <span className="font-serif font-bold text-gray-900 text-sm">{lead.vendorName}</span>
                      <span className="text-xs font-bold text-green-700 bg-green-50 px-2.5 py-1 rounded border border-green-200">{lead.vendorPrice || lead.budget || 'Custom Budget'}</span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-600 bg-gray-50 p-3 rounded-xl border border-gray-100">
                    💡 <span className="font-semibold text-gray-800">Details:</span> Guests: {lead.guestCount || 'N/A'} | Style: {lead.aestheticStyle || 'N/A'}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-200">
                    <button 
                      onClick={() => handleUpdateLeadStatus(lead.id, 'In Follow-up')}
                      className="flex-1 bg-amber-600 text-white py-2 rounded-xl text-xs font-bold hover:bg-amber-700 transition cursor-pointer"
                    >
                      Mark Follow-up
                    </button>
                    <button 
                      onClick={() => handleUpdateLeadStatus(lead.id, 'Escrow Locked ✓')}
                      className="flex-1 bg-green-700 text-white py-2 rounded-xl text-xs font-bold hover:bg-green-800 transition cursor-pointer"
                    >
                      Lock Deal (Escrow)
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // MASTER ADMIN VIEW (PIN: 7488)
  // ==========================================
  return (
    <div className="w-full min-h-screen bg-[#FDFBF7] flex flex-col font-sans selection:bg-[#8B0000] selection:text-white">
      
      <header className="w-full bg-[#1A1A1A] text-white py-4 px-8 flex justify-between items-center sticky top-0 z-50 border-b border-red-900/30 shadow-md">
        <div className="flex items-center gap-3">
          <img 
            src="https://via.placeholder.com/40" 
            alt="AUG Logo" 
            className="w-10 h-10 rounded-xl border border-red-500 object-cover bg-white" 
          />
          <div>
            <h1 className="font-serif font-bold text-base tracking-tight">AUG Master Control Center</h1>
            <p className="text-[10px] text-red-400 font-mono uppercase tracking-widest">Secure Node: /granthadmin-aug • Active Admin</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/10 text-xs font-mono">
            <Power size={14} className={maintenanceMode ? "text-red-500" : "text-green-500"} />
            <span>Maintenance Mode: <b>{maintenanceMode ? 'ACTIVE' : 'OFF'}</b></span>
            <button 
              onClick={() => { setMaintenanceMode(!maintenanceMode); addLog(`Toggled maintenance mode to ${!maintenanceMode}`); }}
              className="ml-2 bg-white/10 px-2.5 py-1 rounded text-[10px] font-bold hover:bg-white/20 transition-colors cursor-pointer"
            >
              Toggle
            </button>
          </div>
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="bg-red-900/40 text-red-300 px-4 py-2 rounded-xl text-xs font-bold hover:bg-red-900 transition-colors border border-red-800/50 cursor-pointer"
          >
            Lock Terminal
          </button>
        </div>
      </header>

      <div className="max-w-7xl w-full mx-auto px-6 py-10 space-y-8 flex-1">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-[#8B0000]/15 shadow-sm">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Active Escrow Volume</p>
            <p className="text-3xl font-serif font-bold text-[#8B0000]">₹ 4,30,000</p>
            <p className="text-[10px] text-green-700 font-bold mt-2">2 Secured Vaults</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-[#8B0000]/15 shadow-sm">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Platform Commission (2%)</p>
            <p className="text-3xl font-serif font-bold text-gray-900">₹ 21,500</p>
            <p className="text-[10px] text-green-700 font-bold mt-2">Fully Settled</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-[#8B0000]/15 shadow-sm">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Pending Approvals</p>
            <p className="text-3xl font-serif font-bold text-amber-600">{registrations.length}</p>
            <p className="text-[10px] text-gray-500 font-bold mt-2">Vendors / EMI Queued</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-[#8B0000]/15 shadow-sm">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Active Dispute Tickets</p>
            <p className="text-3xl font-serif font-bold text-red-700">{disputes.length}</p>
            <p className="text-[10px] text-red-600 font-bold mt-2">Requires Arbitration</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 bg-white p-2 rounded-2xl border border-gray-200 shadow-sm w-fit">
          <button
            onClick={() => setActiveSubTab('overview')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${activeSubTab === 'overview' ? 'bg-[#8B0000] text-white shadow-sm' : 'text-gray-700 hover:bg-gray-50'}`}
          >
            Registrations & EMI Feed
          </button>
          <button
            onClick={() => setActiveSubTab('escrow')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${activeSubTab === 'escrow' ? 'bg-[#8B0000] text-white shadow-sm' : 'text-gray-700 hover:bg-gray-50'}`}
          >
            Escrow & Payout Ledger
          </button>
          <button
            onClick={() => setActiveSubTab('disputes')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${activeSubTab === 'disputes' ? 'bg-[#8B0000] text-white shadow-sm' : 'text-gray-700 hover:bg-gray-50'}`}
          >
            Arbitration & Disputes ({disputes.length})
          </button>
          <button
            onClick={() => setActiveSubTab('chatsecurity')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${activeSubTab === 'chatsecurity' ? 'bg-[#8B0000] text-white shadow-sm' : 'text-gray-700 hover:bg-gray-50'}`}
          >
            ChatShield Breaches
          </button>
          <button
            onClick={() => setActiveSubTab('audit')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${activeSubTab === 'audit' ? 'bg-[#8B0000] text-white shadow-sm' : 'text-gray-700 hover:bg-gray-50'}`}
          >
            Audit Logs
          </button>
        </div>

        {activeSubTab === 'overview' && (
          <div className="bg-white rounded-3xl p-8 border border-[#8B0000]/15 shadow-sm space-y-6">
            <h3 className="text-xl font-serif font-bold text-gray-900">New Registrations & EMI Applications Feed</h3>
            <div className="space-y-3">
              {registrations.length === 0 ? (
                <p className="text-xs text-gray-500">No pending registrations or EMI applications.</p>
              ) : (
                registrations.map((reg) => (
                  <div key={reg.id} className="bg-[#FDFBF7] p-4 rounded-2xl border border-gray-200 flex justify-between items-center text-xs font-sans">
                    <div>
                      <span className="bg-[#8B0000]/10 text-[#8B0000] font-bold px-2.5 py-0.5 rounded uppercase text-[10px] mr-2">{reg.type}</span>
                      <b className="text-gray-900 text-sm">{reg.name}</b>
                      <p className="text-gray-500 mt-1">{reg.category ? `Category: ${reg.category}` : `Loan: ${reg.amount} | CIBIL: ${reg.cibil}`} • {reg.date}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full font-bold">{reg.status}</span>
                      <button 
                        onClick={() => {
                          setRegistrations(prev => prev.filter(r => r.id !== reg.id));
                          addLog(`Approved and onboarded ${reg.name}`);
                        }}
                        className="bg-green-700 text-white px-4 py-2 rounded-xl font-bold hover:bg-green-800 shadow-sm cursor-pointer"
                      >
                        Approve & Activate
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeSubTab === 'escrow' && (
          <div className="bg-white rounded-3xl p-8 border border-[#8B0000]/15 shadow-sm space-y-6">
            <h3 className="text-xl font-serif font-bold text-gray-900">Active Escrow Vaults & Vendor Payout Ledger</h3>
            <div className="space-y-3">
              {escrowVaults.length === 0 ? (
                <p className="text-xs text-gray-500">All escrow vaults have been settled.</p>
              ) : (
                escrowVaults.map((vault) => (
                  <div key={vault.id} className="bg-[#FDFBF7] p-5 rounded-2xl border border-gray-200 flex justify-between items-center text-xs">
                    <div>
                      <span className="font-mono text-gray-400 font-bold">{vault.id}</span>
                      <h4 className="font-serif font-bold text-gray-900 text-sm mt-0.5">{vault.vendor} (Client: {vault.client})</h4>
                      <p className="text-gray-600 mt-1">Locked Gross: <b>₹ {vault.lockedAmount.toLocaleString('en-IN')}</b> | Net Payout: <span className="text-green-700 font-bold">₹ {vault.netPayout.toLocaleString('en-IN')}</span></p>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleTransferPayout(vault.id, vault.vendor, vault.netPayout)}
                        className="bg-[#8B0000] text-white px-4 py-2.5 rounded-xl font-bold hover:bg-[#660000] shadow-sm cursor-pointer"
                      >
                        Transfer IMPS Payout
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeSubTab === 'disputes' && (
          <div className="bg-white rounded-3xl p-8 border border-[#8B0000]/15 shadow-sm space-y-6">
            <h3 className="text-xl font-serif font-bold text-gray-900">Dispute & Ticket Arbitration Desk</h3>
            <div className="space-y-3">
              {disputes.length === 0 ? (
                <p className="text-xs text-gray-500">No active disputes logged.</p>
              ) : (
                disputes.map((d) => (
                  <div key={d.id} className="bg-[#FDFBF7] p-5 rounded-2xl border border-gray-200 flex justify-between items-center text-xs">
                    <div>
                      <span className="font-mono text-red-700 font-bold">{d.ticketId}</span>
                      <h4 className="font-serif font-bold text-gray-900 text-sm mt-0.5">{d.parties}</h4>
                      <p className="text-gray-600 mt-1">Issue: <b>{d.issue}</b></p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full font-bold">{d.status}</span>
                      <button 
                        onClick={() => {
                          setDisputes(prev => prev.filter(item => item.id !== d.id));
                          addLog(`Resolved arbitration ticket ${d.ticketId}`);
                        }}
                        className="bg-gray-900 text-white px-4 py-2 rounded-xl font-bold hover:bg-black cursor-pointer"
                      >
                        Resolve & Release Escrow
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeSubTab === 'chatsecurity' && (
          <div className="bg-white rounded-3xl p-8 border border-[#8B0000]/15 shadow-sm space-y-6">
            <h3 className="text-xl font-serif font-bold text-gray-900 flex items-center gap-2">
              <AlertTriangle className="text-red-600" size={20} /> ChatShield Security Breach Monitor
            </h3>
            <div className="space-y-3">
              {chatAlerts.map((alert) => (
                <div key={alert.id} className="bg-red-50/50 p-4 rounded-2xl border border-red-200 flex justify-between items-center text-xs">
                  <div>
                    <span className="bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded text-[10px]">Bypass Attempt</span>
                    <h4 className="font-serif font-bold text-gray-900 text-sm mt-1">{alert.vendor} ⇄ {alert.client}</h4>
                    <p className="text-red-700 font-mono mt-0.5">Trigger: {alert.trigger}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full font-bold ${alert.status === 'Frozen' ? 'bg-red-200 text-red-900' : 'bg-green-200 text-green-900'}`}>
                      {alert.status}
                    </span>
                    <button 
                      onClick={() => handleToggleChatBlock(alert.id)}
                      className="bg-gray-900 text-white px-4 py-2 rounded-xl font-bold hover:bg-black cursor-pointer"
                    >
                      {alert.status === 'Frozen' ? 'Unblock Chat' : 'Freeze Chat'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSubTab === 'audit' && (
          <div className="bg-white rounded-3xl p-8 border border-[#8B0000]/15 shadow-sm space-y-4">
            <h3 className="text-xl font-serif font-bold text-gray-900">Admin Action Audit Trail</h3>
            <div className="bg-[#1A1A1A] text-gray-300 p-6 rounded-2xl font-mono text-xs space-y-2 max-h-96 overflow-y-auto">
              {auditLogs.map((log, index) => (
                <div key={index} className="flex gap-4 border-b border-white/5 pb-2">
                  <span className="text-red-400">[{log.time}]</span>
                  <span>{log.action}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}