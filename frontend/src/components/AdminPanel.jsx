import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  LayoutDashboard, Users, ShieldCheck, Calendar, CreditCard, Bell, Settings, 
  CheckCircle2, XCircle, Search, ArrowUpRight, DollarSign, TrendingUp, Filter, 
  Check, AlertTriangle, Eye, Send, Lock, LogOut, RefreshCw, Layers, Activity
} from 'lucide-react';

export const ADMIN_USERS = [
  { id: 'u_1', name: 'Priya Sharma', email: 'priya.s@gmail.com', city: 'Delhi', joined: '12 Jan 2026', totalBookings: 4, totalSpent: 4200, status: 'Active' },
  { id: 'u_2', name: 'Rahul Verma', email: 'rahul.v@gmail.com', city: 'Mumbai', joined: '04 Feb 2026', totalBookings: 2, totalSpent: 2000, status: 'Active' },
  { id: 'u_3', name: 'Neha Kapoor', email: 'neha.k@gmail.com', city: 'Bengaluru', joined: '22 Mar 2026', totalBookings: 6, totalSpent: 6400, status: 'Active' },
  { id: 'u_4', name: 'Vikram Malhotra', email: 'vikram.m@gmail.com', city: 'Pune', joined: '10 Apr 2026', totalBookings: 1, totalSpent: 800, status: 'Suspended' }
];

export const ADMIN_VENDORS = [
  { id: 'v_1', name: 'Dr. Ananya Roy', degree: 'MD (Pediatrics)', license: 'MCI-849201', specialty: 'Pediatric Development', experience: '14 Years', hospital: 'Max Healthcare', status: 'Verified', rating: '4.9 ★', totalEarnings: 45000 },
  { id: 'v_2', name: 'Dr. Sameer Sen', degree: 'M.Phil (Clinical Psychology)', license: 'RCI-948102', specialty: 'Child Psychology', experience: '11 Years', hospital: 'MindCare Center', status: 'Verified', rating: '4.8 ★', totalEarnings: 38000 },
  { id: 'v_3', name: 'Kavita Verma', degree: 'M.Sc (Speech Pathology)', license: 'RCI-749201', specialty: 'Speech & Language', experience: '9 Years', hospital: 'Aawaz Center', status: 'Verified', rating: '4.9 ★', totalEarnings: 28000 },
  { id: 'v_4', name: 'Dr. Ramesh K. Sharma', degree: 'MD (Pediatrics)', license: 'MCI-948201', specialty: 'Pediatric Development', experience: '12 Years', hospital: 'Fortis Hospital', status: 'Pending Verification', rating: 'New', totalEarnings: 0 }
];

export const ADMIN_APPOINTMENTS = [
  { id: 'ap_1', passCode: 'PRV-COUNSEL-948201', parent: 'Priya Sharma', doctor: 'Dr. Ananya Roy', mode: 'video', date: new Date().toISOString().split('T')[0], time: '04:00 PM', fee: 1200, status: 'Today', meetingLink: 'In-App Video Room' },
  { id: 'ap_2', passCode: 'PRV-COUNSEL-749201', parent: 'Rahul Verma', doctor: 'Dr. Sameer Sen', mode: 'chat', date: '2026-07-28', time: '11:30 AM', fee: 900, status: 'Upcoming', meetingLink: 'Live Chat Room' },
  { id: 'ap_3', passCode: 'PRV-COUNSEL-482019', parent: 'Neha Kapoor', doctor: 'Kavita Verma', mode: 'call', date: '2026-07-20', time: '02:00 PM', fee: 800, status: 'Completed', meetingLink: null },
  { id: 'ap_4', passCode: 'PRV-COUNSEL-392019', parent: 'Vikram Malhotra', doctor: 'Dr. Ananya Roy', mode: 'inperson', date: '2026-07-15', time: '10:00 AM', fee: 800, status: 'Cancelled', meetingLink: null, refundStatus: 'Partial Refund (₹250 Penalty Fee Applied)' }
];

export const ADMIN_TRANSACTIONS = [
  { id: 'tx_101', date: '25 Jul 2026', parent: 'Priya Sharma', doctor: 'Dr. Ananya Roy', totalPaid: 1200, baseFee: 1200, commission: 180, doctorPayout: 1020, payoutStatus: 'Settled' },
  { id: 'tx_102', date: '24 Jul 2026', parent: 'Rahul Verma', doctor: 'Dr. Sameer Sen', totalPaid: 900, baseFee: 900, commission: 135, doctorPayout: 765, payoutStatus: 'Pending Settlement' },
  { id: 'tx_103', date: '20 Jul 2026', parent: 'Neha Kapoor', doctor: 'Kavita Verma', totalPaid: 800, baseFee: 800, commission: 120, doctorPayout: 680, payoutStatus: 'Settled' }
];

export default function AdminPanel() {
  const { lang, t } = useLanguage();

  const [currentNav, setCurrentNav] = useState('dashboard');
  const [users, setUsers] = useState(ADMIN_USERS);
  const [vendors, setVendors] = useState(ADMIN_VENDORS);
  const [appointments, setAppointments] = useState(ADMIN_APPOINTMENTS);
  const [appointmentFilter, setAppointmentFilter] = useState('All');
  
  const [cancellationPenalty, setCancellationPenalty] = useState(250);
  const [commissionRate, setCommissionRate] = useState(15);
  const [gstRate, setGstRate] = useState(18);

  const [broadcastTarget, setBroadcastTarget] = useState('all');
  const [broadcastMsg, setBroadcastMsg] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleToggleUserStatus = (id) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' } : u));
    showToast('User status updated successfully.');
  };

  const handleApproveVendor = (id, name) => {
    setVendors(prev => prev.map(v => v.id === id ? { ...v, status: 'Verified' } : v));
    showToast(`Approved ${name} as a verified Parvarish doctor!`);
  };

  const handleRejectVendor = (id, name) => {
    setVendors(prev => prev.filter(v => v.id !== id));
    showToast(`Application for ${name} rejected.`);
  };

  const handleSendBroadcast = (e) => {
    e.preventDefault();
    if (!broadcastMsg.trim()) return;
    showToast(`Notification broadcast sent to ${broadcastTarget.toUpperCase()} members!`);
    setBroadcastMsg('');
  };

  const filteredAppointments = appointments.filter(ap => {
    if (appointmentFilter === 'All') return true;
    return ap.status === appointmentFilter;
  });

  return (
    <div className="min-h-screen bg-warmbg text-slate-800 flex flex-col lg:flex-row font-sans animate-in fade-in duration-200">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-emerald-600 text-white font-bold text-xs shadow-2xl flex items-center space-x-2 animate-in slide-in-from-bottom-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-200" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* MATCHED PARVARISH BRAND SIDEBAR */}
      <aside className="w-full lg:w-64 bg-white/95 backdrop-blur-xl border-r border-emerald-100 flex flex-col justify-between flex-shrink-0 p-5 space-y-6 shadow-sm">
        <div className="space-y-6">
          
          {/* Admin Sidebar Header */}
          <div className="flex items-center space-x-3 px-2">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-amber-400 flex items-center justify-center text-white font-bold text-xl shadow-md shadow-emerald-200">
              🌱
            </div>
            <div>
              <div className="text-base font-black bg-gradient-to-r from-emerald-800 via-teal-700 to-amber-700 bg-clip-text text-transparent tracking-tight">Parvarish Admin</div>
              <div className="text-[10px] text-emerald-700 font-bold uppercase tracking-widest">Moderator Desk</div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5 text-xs font-bold">
            
            <button
              onClick={() => setCurrentNav('dashboard')}
              className={`w-full flex items-center space-x-3 px-3.5 py-3 rounded-2xl transition-all ${
                currentNav === 'dashboard' ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/20' : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-900'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Executive Dashboard</span>
            </button>

            <button
              onClick={() => setCurrentNav('users')}
              className={`w-full flex items-center space-x-3 px-3.5 py-3 rounded-2xl transition-all ${
                currentNav === 'users' ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/20' : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-900'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Parents Directory ({users.length})</span>
            </button>

            <button
              onClick={() => setCurrentNav('vendors')}
              className={`w-full flex items-center space-x-3 px-3.5 py-3 rounded-2xl transition-all ${
                currentNav === 'vendors' ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/20' : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-900'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Vendors & Approvals ({vendors.filter(v => v.status === 'Pending Verification').length})</span>
            </button>

            <button
              onClick={() => setCurrentNav('appointments')}
              className={`w-full flex items-center space-x-3 px-3.5 py-3 rounded-2xl transition-all ${
                currentNav === 'appointments' ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/20' : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-900'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Appointments Desk ({appointments.length})</span>
            </button>

            <button
              onClick={() => setCurrentNav('payments')}
              className={`w-full flex items-center space-x-3 px-3.5 py-3 rounded-2xl transition-all ${
                currentNav === 'payments' ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/20' : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-900'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>Payments & Ledger</span>
            </button>

            <button
              onClick={() => setCurrentNav('notifications')}
              className={`w-full flex items-center space-x-3 px-3.5 py-3 rounded-2xl transition-all ${
                currentNav === 'notifications' ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/20' : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-900'
              }`}
            >
              <Bell className="w-4 h-4" />
              <span>Broadcast System</span>
            </button>

            <button
              onClick={() => setCurrentNav('settings')}
              className={`w-full flex items-center space-x-3 px-3.5 py-3 rounded-2xl transition-all ${
                currentNav === 'settings' ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/20' : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-900'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Platform Settings</span>
            </button>

          </nav>

        </div>

        {/* Sidebar Footer */}
        <div className="pt-4 border-t border-slate-200 space-y-3">
          <div className="flex items-center space-x-2.5 px-2">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs border border-emerald-300">
              AD
            </div>
            <div className="text-xs">
              <div className="font-bold text-slate-900">Verified Admin</div>
              <div className="text-[10px] text-slate-500">admin@parvarish.app</div>
            </div>
          </div>

          <button
            onClick={() => window.location.href = '/'}
            className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center space-x-1.5 transition-all shadow-xs"
          >
            <LogOut className="w-3.5 h-3.5 text-rose-400" />
            <span>Exit Admin Suite</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-6 sm:p-8 space-y-8 overflow-y-auto bg-warmbg">
        
        {/* Top Bar Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-100 pb-5">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight capitalize flex items-center space-x-2">
              <Activity className="w-6 h-6 text-emerald-600" />
              <span>
                {currentNav === 'dashboard' ? 'Executive Dashboard & Overview' :
                 currentNav === 'users' ? 'Parent Members Directory' :
                 currentNav === 'vendors' ? 'Specialist Doctors & Approvals Desk' :
                 currentNav === 'appointments' ? 'Clinical Appointments Desk' :
                 currentNav === 'payments' ? 'Payments Ledger & Doctor Settlements' :
                 currentNav === 'notifications' ? 'Broadcast Notification System' : 'Platform Configuration & Rules'}
              </span>
            </h1>
            <p className="text-xs text-slate-600 mt-1">Parvarish Parenting & Well-Being Administration</p>
          </div>

          <div className="flex items-center space-x-3">
            <span className="px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold flex items-center space-x-2 shadow-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span>System Live • 100% Operational</span>
            </span>
          </div>
        </div>

        {/* ================= PAGE 1: EXECUTIVE DASHBOARD ================= */}
        {currentNav === 'dashboard' && (
          <div className="space-y-8">
            
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="p-6 rounded-3xl bg-white border border-emerald-100 space-y-2 hover:border-emerald-300 transition-all shadow-xs">
                <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase">
                  <span>Total Revenue</span>
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-3xl font-black text-slate-900">₹1,84,500</div>
                <div className="text-[11px] text-emerald-600 font-semibold">+18.4% this month</div>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-teal-100 space-y-2 hover:border-teal-300 transition-all shadow-xs">
                <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase">
                  <span>Sessions Booked</span>
                  <Calendar className="w-4 h-4 text-teal-600" />
                </div>
                <div className="text-3xl font-black text-slate-900">1,420</div>
                <div className="text-[11px] text-teal-600 font-semibold">Across 4 care modes</div>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-amber-100 space-y-2 hover:border-amber-300 transition-all shadow-xs">
                <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase">
                  <span>Parent Members</span>
                  <Users className="w-4 h-4 text-amber-600" />
                </div>
                <div className="text-3xl font-black text-slate-900">18,500</div>
                <div className="text-[11px] text-amber-600 font-semibold">Worldwide family community</div>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-purple-100 space-y-2 hover:border-purple-300 transition-all shadow-xs">
                <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase">
                  <span>Verified Doctors</span>
                  <ShieldCheck className="w-4 h-4 text-purple-600" />
                </div>
                <div className="text-3xl font-black text-slate-900">14 Doctors</div>
                <div className="text-[11px] text-purple-600 font-semibold">1 Pending Approval</div>
              </div>

            </div>

            {/* Recent Activity & Doctor Earnings Table */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Doctor Earnings Summary */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-xs">
                <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">Top Specialist Doctor Earnings</h3>
                <div className="space-y-3 text-xs">
                  {ADMIN_VENDORS.slice(0, 3).map(v => (
                    <div key={v.id} className="flex items-center justify-between p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                      <div>
                        <div className="font-bold text-slate-900">{v.name}</div>
                        <div className="text-slate-600 text-[11px]">{v.specialty}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-black text-emerald-800 text-sm">₹{v.totalEarnings}</div>
                        <div className="text-slate-500 text-[10px]">Net Payout</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pending Approvals Widget */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-xs">
                <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">Pending Onboarding Approvals</h3>
                <div className="space-y-3 text-xs">
                  {vendors.filter(v => v.status === 'Pending Verification').map(v => (
                    <div key={v.id} className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">{v.name} ({v.degree})</span>
                        <span className="px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 text-[10px] font-bold">Pending MCI License</span>
                      </div>
                      <p className="text-slate-600 text-[11px]">License: <strong className="text-slate-800 font-mono">{v.license}</strong> | {v.hospital}</p>
                      <button
                        onClick={() => setCurrentNav('vendors')}
                        className="px-4 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 shadow-xs"
                      >
                        Review Application
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ================= PAGE 2: USERS MANAGEMENT ================= */}
        {currentNav === 'users' && (
          <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-lg font-bold text-slate-900">Registered Parent Members</h3>
              <span className="text-xs text-slate-500">Total Users: <strong>{users.length}</strong></span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-[10px] uppercase font-bold text-emerald-900 bg-emerald-50">
                    <th className="py-3 px-4 rounded-l-xl">Parent Name</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">City</th>
                    <th className="py-3 px-4">Joined Date</th>
                    <th className="py-3 px-4">Total Sessions</th>
                    <th className="py-3 px-4">Total Spent</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right rounded-r-xl">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {users.map(u => (
                    <tr key={u.id} className="hover:bg-slate-50/80">
                      <td className="py-3 px-4 font-bold text-slate-900">{u.name}</td>
                      <td className="py-3 px-4 text-slate-600">{u.email}</td>
                      <td className="py-3 px-4 text-slate-600">{u.city}</td>
                      <td className="py-3 px-4 text-slate-600">{u.joined}</td>
                      <td className="py-3 px-4 font-bold text-slate-900">{u.totalBookings} Sessions</td>
                      <td className="py-3 px-4 font-black text-emerald-800">₹{u.totalSpent}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          u.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {u.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => handleToggleUserStatus(u.id)}
                          className="px-3 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px]"
                        >
                          {u.status === 'Active' ? 'Suspend' : 'Activate'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= PAGE 3: VENDORS & APPROVALS ================= */}
        {currentNav === 'vendors' && (
          <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-lg font-bold text-slate-900">Specialist Doctors & Onboarding Approvals</h3>
              <span className="text-xs text-slate-500">Verified Doctors: <strong>{vendors.filter(v => v.status === 'Verified').length}</strong></span>
            </div>

            <div className="space-y-4">
              {vendors.map(v => (
                <div key={v.id} className="p-5 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="text-sm font-bold text-slate-900">{v.name} ({v.degree})</h4>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        v.status === 'Verified' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {v.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600">Specialty: <strong>{v.specialty}</strong> | Experience: {v.experience}</p>
                    <p className="text-xs text-slate-500">License: <strong className="font-mono text-slate-700">{v.license}</strong> ({v.hospital})</p>
                  </div>

                  <div className="flex items-center space-x-2">
                    {v.status === 'Pending Verification' ? (
                      <>
                        <button
                          onClick={() => handleApproveVendor(v.id, v.name)}
                          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs"
                        >
                          Approve Doctor
                        </button>
                        <button
                          onClick={() => handleRejectVendor(v.id, v.name)}
                          className="px-4 py-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 font-bold text-xs"
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span className="text-xs font-bold text-emerald-700 flex items-center space-x-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Active Partner</span>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= PAGE 4: APPOINTMENTS DESK ================= */}
        {currentNav === 'appointments' && (
          <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <h3 className="text-lg font-bold text-slate-900">Clinical Consultation Appointments</h3>
              
              <div className="flex items-center space-x-2 text-xs">
                <span className="text-slate-500 font-bold">Filter:</span>
                {['All', 'Today', 'Upcoming', 'Completed', 'Cancelled'].map(f => (
                  <button
                    key={f}
                    onClick={() => setAppointmentFilter(f)}
                    className={`px-3 py-1 rounded-xl font-bold transition-all ${
                      appointmentFilter === f ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-[10px] uppercase font-bold text-emerald-900 bg-emerald-50">
                    <th className="py-3 px-4 rounded-l-xl">Pass Code</th>
                    <th className="py-3 px-4">Parent Member</th>
                    <th className="py-3 px-4">Specialist Doctor</th>
                    <th className="py-3 px-4">Mode</th>
                    <th className="py-3 px-4">Date & Time</th>
                    <th className="py-3 px-4">Fee</th>
                    <th className="py-3 px-4 rounded-r-xl">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredAppointments.map(ap => (
                    <tr key={ap.id} className="hover:bg-slate-50/80">
                      <td className="py-3 px-4 font-mono font-bold text-emerald-700">{ap.passCode}</td>
                      <td className="py-3 px-4 font-bold text-slate-900">{ap.parent}</td>
                      <td className="py-3 px-4 text-slate-700">{ap.doctor}</td>
                      <td className="py-3 px-4 uppercase font-bold text-[10px] text-teal-700">{ap.mode}</td>
                      <td className="py-3 px-4 text-slate-600">{ap.date} at {ap.time}</td>
                      <td className="py-3 px-4 font-black text-slate-900">₹{ap.fee}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          ap.status === 'Today' ? 'bg-emerald-100 text-emerald-800' :
                          ap.status === 'Upcoming' ? 'bg-teal-100 text-teal-800' :
                          ap.status === 'Completed' ? 'bg-slate-100 text-slate-700' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {ap.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= PAGE 5: PAYMENTS & LEDGER ================= */}
        {currentNav === 'payments' && (
          <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-lg font-bold text-slate-900">Payments Ledger & Commission Payouts</h3>
              <span className="text-xs text-emerald-800 font-bold">Platform Commission Rate: 15%</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-[10px] uppercase font-bold text-emerald-900 bg-emerald-50">
                    <th className="py-3 px-4 rounded-l-xl">Tx ID</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Parent</th>
                    <th className="py-3 px-4">Doctor</th>
                    <th className="py-3 px-4">Total Paid</th>
                    <th className="py-3 px-4">Platform Fee (15%)</th>
                    <th className="py-3 px-4">Doctor Payout</th>
                    <th className="py-3 px-4 rounded-r-xl">Payout Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {ADMIN_TRANSACTIONS.map(tx => (
                    <tr key={tx.id} className="hover:bg-slate-50/80">
                      <td className="py-3 px-4 font-mono font-bold text-slate-700">{tx.id}</td>
                      <td className="py-3 px-4 text-slate-600">{tx.date}</td>
                      <td className="py-3 px-4 font-bold text-slate-900">{tx.parent}</td>
                      <td className="py-3 px-4 text-slate-700">{tx.doctor}</td>
                      <td className="py-3 px-4 font-black text-slate-900">₹{tx.totalPaid}</td>
                      <td className="py-3 px-4 font-bold text-emerald-700">₹{tx.commission}</td>
                      <td className="py-3 px-4 font-bold text-teal-800">₹{tx.doctorPayout}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          tx.payoutStatus === 'Settled' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {tx.payoutStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= PAGE 6: BROADCAST SYSTEM ================= */}
        {currentNav === 'notifications' && (
          <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-xs max-w-2xl">
            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">Broadcast Announcement to Members</h3>
            
            <form onSubmit={handleSendBroadcast} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Target Audience</label>
                <select
                  value={broadcastTarget}
                  onChange={(e) => setBroadcastTarget(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800"
                >
                  <option value="all">All Members (Parents & Doctors)</option>
                  <option value="parents">Parent Members Only</option>
                  <option value="doctors">Specialist Doctors Only</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Broadcast Message Body</label>
                <textarea
                  rows={4}
                  required
                  value={broadcastMsg}
                  onChange={(e) => setBroadcastMsg(e.target.value)}
                  placeholder="Enter message to broadcast..."
                  className="w-full p-4 rounded-2xl border border-slate-200 text-xs text-slate-800"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-md"
              >
                Send Broadcast Notification
              </button>
            </form>
          </div>
        )}

        {/* ================= PAGE 7: SETTINGS & RULES ================= */}
        {currentNav === 'settings' && (
          <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-xs max-w-xl">
            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">Platform Financial Rules & Fees</h3>

            <div className="space-y-4 text-xs font-bold">
              <div>
                <label className="block text-slate-700 mb-1">Platform Commission Rate (%)</label>
                <input
                  type="number"
                  value={commissionRate}
                  onChange={(e) => setCommissionRate(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1">Cancellation Penalty Fee (₹)</label>
                <input
                  type="number"
                  value={cancellationPenalty}
                  onChange={(e) => setCancellationPenalty(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <button
                onClick={() => showToast('Platform configuration settings saved.')}
                className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase text-xs shadow-md"
              >
                Save Rule Changes
              </button>
            </div>
          </div>
        )}

      </main>

    </div>
  );
}
