import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Lock, Mail, User, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export default function LoginModal({ isOpen, onClose }) {
  const { login, register, loginWithGoogle } = useAuth();
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isDoctorRegister, setIsDoctorRegister] = useState(false);
  const [mciLicense, setMciLicense] = useState('');

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
      onClose();
    } catch (err) {
      setErrorMsg('Failed to sign in with Google');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      if (isRegisterMode) {
        if (!fullName.trim() || !email.trim() || !password.trim()) {
          setErrorMsg('Please fill in all required fields.');
          return;
        }
        await register({
          name: fullName,
          email,
          password,
          role: isDoctorRegister ? 'expert' : 'parent',
          isDoctor: isDoctorRegister,
          licenseNumber: mciLicense
        });
      } else {
        if (!email.trim() || !password.trim()) {
          setErrorMsg('Please enter email and password.');
          return;
        }
        await login(email, password);
      }
      onClose();
    } catch (err) {
      setErrorMsg(err.message || 'Authentication failed. Please check your credentials.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl space-y-6 relative animate-in zoom-in-95 duration-150 border border-emerald-100">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#5B48D6] via-[#7D6BEE] to-[#FF8F7A] p-[2px] flex items-center justify-center flex-shrink-0 shadow-md">
              <div className="w-full h-full bg-[#18133E] rounded-[14px] flex items-center justify-center p-1.5">
                <svg viewBox="0 0 36 36" fill="none" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="18" cy="18" r="16" fill="#241F4A" />
                  <path d="M9 22C9 16.5 13 12 18 12C23 12 27 16.5 27 22" stroke="#A89BF5" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="18" cy="8" r="3.2" fill="#A89BF5" />
                  <circle cx="18" cy="16.5" r="2.4" fill="#FF8F7A" />
                  <path d="M15 22C15 20.5 16.5 19 18 20.2C19.5 19 21 20.5 21 22C21 23.5 18 25.5 18 25.5C18 25.5 15 23.5 15 22Z" fill="#34D399" />
                </svg>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 tracking-tight">
                {isRegisterMode ? 'Create Parentcraft Account' : 'Sign In to Parentcraft'}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {isRegisterMode ? 'Join 14,000+ Indian families & doctors' : 'Verified Child Counselling & Psychology'}
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 text-slate-400">
            <X className="w-5 h-5 text-slate-700" />
          </button>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
            {errorMsg}
          </div>
        )}

        {/* Quick Demo Fill Buttons */}
        {!isRegisterMode && (
          <div className="p-3 rounded-2xl bg-[#ECE8FF]/60 border border-[#D5CCFA] space-y-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#5B48D6] block">
              ⚡ 1-Click Demo Fill
            </span>
            <div className="grid grid-cols-2 gap-2 text-[11px] font-bold">
              <button
                type="button"
                onClick={() => {
                  setEmail('ananya.sharma@parvarish.org');
                  setPassword('doctor123');
                }}
                className="py-1.5 px-2.5 rounded-xl bg-white hover:bg-[#ECE8FF] text-[#5B48D6] border border-[#D5CCFA] text-left transition-all truncate cursor-pointer"
              >
                👩‍⚕️ Dr. Ananya (Doctor)
              </button>
              <button
                type="button"
                onClick={() => {
                  setEmail('priya.sharma@familywellbeing.org');
                  setPassword('parent123');
                }}
                className="py-1.5 px-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-left transition-all truncate cursor-pointer"
              >
                👩 Priya S. (Parent)
              </button>
            </div>
          </div>
        )}

        {/* 1-CLICK GOOGLE SIGN-IN BUTTON */}
        <div className="space-y-3">
          <button
            onClick={handleGoogleSignIn}
            className="w-full py-3.5 px-4 rounded-2xl bg-white hover:bg-slate-50 border-2 border-slate-200 text-slate-800 font-extrabold text-xs flex items-center justify-center space-x-3 shadow-xs active:scale-95 transition-all"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>Continue with Google</span>
          </button>

          <div className="relative flex items-center justify-center">
            <span className="h-px bg-slate-200 w-full" />
            <span className="bg-white px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest absolute">Or</span>
          </div>
        </div>

        {/* EMAIL FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {isRegisterMode && (
            <>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Priya Sharma"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800"
                  />
                </div>
              </div>

              {/* Role Selector: Parent or Doctor */}
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600">Account Type</label>
                <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setIsDoctorRegister(false)}
                    className={`py-2 px-3 rounded-xl border transition-all ${!isDoctorRegister ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-slate-700 border-slate-200'}`}
                  >
                    Parent Member
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsDoctorRegister(true)}
                    className={`py-2 px-3 rounded-xl border transition-all ${isDoctorRegister ? 'bg-teal-600 text-white border-teal-600' : 'bg-white text-slate-700 border-slate-200'}`}
                  >
                    Doctor / Specialist
                  </button>
                </div>

                {isDoctorRegister && (
                  <div className="pt-2">
                    <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">MCI / RCI License ID</label>
                    <input
                      type="text"
                      required
                      value={mciLicense}
                      onChange={(e) => setMciLicense(e.target.value)}
                      placeholder="e.g. MCI-849201"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono text-slate-800"
                    />
                  </div>
                )}
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-md active:scale-95 transition-all flex items-center justify-center space-x-2"
          >
            <span>{isRegisterMode ? 'Create Account & Sign In' : 'Sign In Now'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Toggle Mode Footer */}
        <div className="text-center pt-2 border-t border-slate-100 text-xs">
          {isRegisterMode ? (
            <span className="text-slate-600">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => { setIsRegisterMode(false); setErrorMsg(''); }}
                className="font-extrabold text-emerald-700 hover:underline"
              >
                Sign In
              </button>
            </span>
          ) : (
            <span className="text-slate-600">
              New to Parvarish?{' '}
              <button
                type="button"
                onClick={() => { setIsRegisterMode(true); setErrorMsg(''); }}
                className="font-extrabold text-emerald-700 hover:underline"
              >
                Create Account
              </button>
            </span>
          )}
        </div>

      </div>
    </div>
  );
}
