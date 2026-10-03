import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, Lock, CheckCircle2, Key, UserCheck, ArrowRight } from 'lucide-react';
import AdminPanel from './AdminPanel';

export default function AdminLoginView() {
  const { user, switchDemoRole } = useAuth();
  const { lang, t } = useLanguage();

  const [email, setEmail] = useState('admin@parvarish.app');
  const [password, setPassword] = useState('admin123');
  const [isLoggedIn, setIsLoggedIn] = useState(user?.role === 'admin');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (password === 'admin123' || password === 'admin') {
      switchDemoRole('admin');
      setIsLoggedIn(true);
      setErrorMsg('');
    } else {
      setErrorMsg('Invalid admin credentials. (Demo Password: admin123)');
    }
  };

  if (isLoggedIn || user?.role === 'admin') {
    return <AdminPanel />;
  }

  return (
    <section className="py-12 max-w-md mx-auto px-4 space-y-6 animate-in fade-in duration-200">
      
      <div className="glass-card p-8 rounded-3xl space-y-6 border-purple-200 shadow-xl text-center">
        
        <div className="w-16 h-16 rounded-3xl bg-purple-100 text-purple-700 flex items-center justify-center mx-auto shadow-sm">
          <ShieldCheck className="w-8 h-8" />
        </div>

        <div className="space-y-1">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Parvarish Enterprise Admin Desk</h2>
          <p className="text-xs text-slate-500 font-medium">
            Dedicated login portal for verified web moderators and clinical application reviewers.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Admin Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Admin Security Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="admin123"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-md shadow-purple-600/20 active:scale-95 transition-all flex items-center justify-center space-x-1.5"
          >
            <span>Login to Enterprise Admin Suite</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 border-t border-slate-100">
          <button
            onClick={() => { switchDemoRole('admin'); setIsLoggedIn(true); }}
            className="w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800"
          >
            ⚡ Quick Demo Admin Login
          </button>
        </div>

      </div>

    </section>
  );
}
