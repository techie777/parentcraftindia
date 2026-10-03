import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useBookingNotification } from '../context/BookingNotificationContext';
import { 
  Sparkles, Users, MessageSquare, ShieldCheck, User, LogOut, 
  CheckCircle2, ChevronDown, Globe, Video, Home, HelpCircle, 
  Menu, X, Eye, BookOpen, Compass, UserPlus, Calendar, Bell, Settings, Heart, LogIn, ExternalLink, Stethoscope, HeartHandshake
} from 'lucide-react';
import NotificationDrawer from './NotificationDrawer';
import LoginModal from './LoginModal';

export default function Navbar({ activeTab, setActiveTab, onBookCounselor, onOpenMyBookings, onOpenTutorial, onOpenSpotlightTour, onOpenCrisisModal, isTourActive }) {
  const { user, logout } = useAuth();
  const { lang, toggleLang, t } = useLanguage();
  const { unreadCount, bookings } = useBookingNotification();
  
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleNavClick = (tab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
    setShowProfileDropdown(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenJoinUsNewTab = () => {
    window.open('/specialist', '_blank');
  };

  const handleToggleHamburger = () => {
    setShowProfileDropdown(false);
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleToggleProfileDropdown = () => {
    setIsMobileMenuOpen(false);
    setShowProfileDropdown(!showProfileDropdown);
  };

  const userName = user?.name || 'Priya Sharma';
  const userId = user?.userId || 'PRV-USR-948201';
  const userAvatar = user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';
  const userEmail = user?.email || 'priya.sharma@familywellbeing.org';

  return (
    <>
      {/* Sticky Fixed Header Container */}
      <div className="sticky top-0 z-50 w-full shadow-xs">
        {/* Emergency Crisis Hotline Top Bar */}
        <div className="bg-slate-900 text-slate-300 py-1.5 px-4 text-[11px] border-b border-slate-800">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
            <div className="flex items-center space-x-2 truncate">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
              <span className="font-bold text-white">Emergency Crisis Support:</span>
              <span className="truncate">Childline <strong>1098</strong> | Govt. Helpline <strong>1800-599-0019</strong></span>
            </div>

            <div className="hidden md:flex items-center space-x-3 text-[10px] font-semibold text-emerald-400">
              <span>🛡️ RCI / MCI Compliant</span>
              <span>•</span>
              <span>🔒 100% End-to-End Encrypted</span>
            </div>
          </div>
        </div>
        <header 
        id="desktop-main-navbar"
        className={`border-b border-[#E4DFF7] transition-all ${
          isTourActive 
            ? 'relative z-[9996] bg-white shadow-xl ring-2 ring-[#7D6BEE]' 
            : 'bg-white/95 backdrop-blur-md'
        }`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-2 sm:gap-4">
            
            {/* BESPOKE PARENTCRAFT INDIA LOGO EMBLEM */}
            <div className="flex items-center space-x-2.5 cursor-pointer flex-shrink-0 group" onClick={() => handleNavClick('home')}>
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-[#5B48D6] via-[#7D6BEE] to-[#FF8F7A] p-[2px] shadow-md shadow-[#5B48D6]/20 group-hover:scale-105 transition-all">
                <div className="w-full h-full rounded-[14px] bg-white flex items-center justify-center relative overflow-hidden p-1">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyVVYb08Y0ZEtV7XOLRDspc2OvrH6etB22FmUsxiiswS2fZ13HBqAVFHxtEm6bwvTj7mp5S-mfqDZMVDSoPp3SzRWr5mOHnI-ealcY-Y9mNVjvpzksZyRg4UwinWs4PmkYG2-F3wTGlSGM9Z8Yho1jMI4huEW8YLops_8xDzBfR_ySW-HQtkxqCDCAlsChLA6C8Hk4afF2HB91uirPyIs2SqobJCUiEoER6A0qEdPKiLe2HgsxHRzibw"
                    alt="Parentcraft India Logo"
                    className="w-full h-full object-contain hover:scale-105 transition-transform"
                  />
                </div>
              </div>
              <div className="overflow-hidden">
                <div className="flex items-center space-x-1">
                  <span className="text-lg sm:text-xl font-black text-[#241F4A] tracking-tight block">
                    Parentcraft
                  </span>
                  <span className="text-lg sm:text-xl font-black text-[#5B48D6] tracking-tight block">
                    India
                  </span>
                </div>
                <div className="flex items-center space-x-1.5 -mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#5E5A80] font-bold truncate">
                    Child Counselling & Psychology
                  </span>
                </div>
              </div>
            </div>

            {/* SPACIOUS CENTER NAVIGATION */}
            <nav className="hidden lg:flex items-center space-x-1 p-1.5 rounded-full bg-[#F7F5FF] border border-[#E4DFF7] shadow-inner">
              
              <button
                id="tour-nav-home"
                onClick={() => handleNavClick('home')}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
                  activeTab === 'home'
                    ? 'bg-white text-[#5B48D6] shadow-xs border border-[#E4DFF7]'
                    : 'text-slate-600 hover:text-[#5B48D6] hover:bg-white/50'
                }`}
              >
                <Home className="w-4 h-4 text-[#5B48D6]" />
                <span>{t('navHome')}</span>
              </button>

              <button
                id="tour-nav-experts"
                onClick={() => handleNavClick('book-counselor')}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
                  activeTab === 'book-counselor'
                    ? 'bg-white text-[#5B48D6] shadow-xs border border-[#E4DFF7]'
                    : 'text-slate-600 hover:text-[#5B48D6] hover:bg-white/50'
                }`}
              >
                <Video className="w-4 h-4 text-[#5B48D6]" />
                <span>{t('navBookCounselor')}</span>
              </button>

              <button
                id="tour-nav-problems"
                onClick={() => handleNavClick('common-problems')}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
                  activeTab === 'common-problems'
                    ? 'bg-white text-[#5B48D6] shadow-xs border border-[#E4DFF7]'
                    : 'text-slate-600 hover:text-[#5B48D6] hover:bg-white/50'
                }`}
              >
                <HelpCircle className="w-4 h-4 text-[#5B48D6]" />
                <span>Problem Areas</span>
              </button>

              <button
                id="tour-nav-bookings"
                onClick={onOpenMyBookings}
                className="flex items-center space-x-2 px-3.5 py-2 rounded-full text-xs font-bold text-slate-600 hover:text-[#5B48D6] hover:bg-white/50 transition-all duration-200"
              >
                <Calendar className="w-4 h-4 text-emerald-600" />
                <span>Bookings</span>
              </button>

              <button
                id="tour-nav-sos"
                onClick={onOpenCrisisModal}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-black text-rose-600 hover:bg-rose-50 transition-all duration-200 border border-rose-200/80 bg-rose-50/50"
              >
                <HeartHandshake className="w-4 h-4 text-rose-600" />
                <span>SOS Help</span>
              </button>
            </nav>

            {/* SLEEK RIGHT CONTROLS */}
            <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
              
              {/* JOIN US BUTTON (Desktop / Tablet only) */}
              <button
                onClick={handleOpenJoinUsNewTab}
                className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-[#5B48D6] to-[#4F3DBD] hover:from-[#4F3DBD] hover:to-[#3F2EA8] text-white font-extrabold text-[11px] sm:text-xs uppercase tracking-wider shadow-sm hover:shadow-md transition-all border border-[#7D6BEE]/40 active:scale-95 flex-shrink-0"
                title="Join as a Specialist Partner (Opens in new tab)"
              >
                <Stethoscope className="w-3.5 h-3.5 text-emerald-300" />
                <span>JOIN US</span>
                <ExternalLink className="w-3 h-3 text-emerald-300 ml-0.5" />
              </button>

              {/* NOTIFICATION BELL (Desktop / Tablet only) */}
              <button
                onClick={() => setIsNotificationOpen(true)}
                className="hidden sm:flex p-1.5 sm:p-2 rounded-full glass-card hover:border-[#5B48D6] text-slate-700 transition-all relative flex-shrink-0"
                title="Notifications"
              >
                <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-[#5B48D6]" />
                {unreadCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center absolute -top-1 -right-1 border border-white">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* USER PROFILE DROPDOWN */}
              {user ? (
                <div className="relative z-50 hidden sm:block">
                  <button
                    onClick={handleToggleProfileDropdown}
                    className="flex items-center space-x-2 p-1.5 pr-3 rounded-full glass-card hover:border-[#5B48D6] transition-all border border-[#E4DFF7] shadow-xs"
                  >
                    <img
                      src={userAvatar}
                      alt={userName}
                      className="w-8 h-8 rounded-full object-cover border border-[#5B48D6]/30 shadow-2xs"
                    />
                    <div className="text-left">
                      <span className="block text-xs font-extrabold text-slate-900 max-w-[90px] truncate leading-none">
                        {userName}
                      </span>
                      <span className="block text-[9px] font-mono text-[#5B48D6] font-bold mt-0.5">
                        {userId}
                      </span>
                    </div>
                    <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${showProfileDropdown ? 'rotate-180' : ''}`} />
                  </button>

                  {showProfileDropdown && (
                    <>
                      {/* Transparent Click-Outside Dismissal Backdrop */}
                      <div 
                        className="fixed inset-0 z-[90] bg-transparent" 
                        onClick={() => setShowProfileDropdown(false)} 
                      />

                      <div className="absolute right-0 mt-3 w-72 bg-white rounded-3xl shadow-2xl border border-[#E4DFF7] p-4 z-[100] animate-in fade-in duration-150 space-y-3 ring-1 ring-black/5">
                        
                        {/* User Header with Unique User ID */}
                        <div className="flex items-center space-x-3 pb-3 border-b border-slate-100">
                          <img src={userAvatar} className="w-10 h-10 rounded-full object-cover border border-[#5B48D6]/30" />
                          <div className="overflow-hidden">
                            <div className="text-xs font-extrabold text-slate-900 truncate">{userName}</div>
                            <div className="text-[11px] text-slate-500 truncate">{userEmail}</div>
                            <div className="text-[10px] font-mono font-bold text-[#5B48D6] bg-[#ECE8FF] px-2 py-0.5 rounded-full inline-block mt-1">
                              ID: {userId}
                            </div>
                          </div>
                        </div>

                      {/* Integrated Features */}
                      <div className="space-y-1 text-xs">
                        
                        <button
                          onClick={() => { setShowProfileDropdown(false); onOpenMyBookings(); }}
                          className="w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-slate-700 hover:bg-[#ECE8FF] hover:text-[#5B48D6] transition-all font-semibold"
                        >
                          <div className="flex items-center space-x-3">
                            <Calendar className="w-4 h-4 text-[#5B48D6]" />
                            <span>My Session Bookings</span>
                          </div>
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        </button>

                        {onOpenTutorial && (
                          <button
                            onClick={() => { setShowProfileDropdown(false); onOpenTutorial(); }}
                            className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-2xl text-slate-700 hover:bg-[#ECE8FF] hover:text-[#5B48D6] transition-all font-semibold"
                          >
                            <BookOpen className="w-4 h-4 text-indigo-500" />
                            <span>App Tutorial (Feature Slides)</span>
                          </button>
                        )}

                        {onOpenSpotlightTour && (
                          <button
                            onClick={() => { setShowProfileDropdown(false); onOpenSpotlightTour(); }}
                            className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-2xl text-slate-700 hover:bg-[#ECE8FF] hover:text-[#5B48D6] transition-all font-semibold"
                          >
                            <Compass className="w-4 h-4 text-amber-500" />
                            <span>Interactive App Tour (Overlay)</span>
                          </button>
                        )}

                        <button
                          onClick={() => { toggleLang(); }}
                          className="w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-slate-700 hover:bg-[#ECE8FF] hover:text-[#5B48D6] transition-all font-semibold"
                        >
                          <div className="flex items-center space-x-3">
                            <Globe className="w-4 h-4 text-[#5B48D6]" />
                            <span>Language</span>
                          </div>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                            {lang === 'en' ? 'EN' : 'हिंदी'}
                          </span>
                        </button>

                        <button
                          onClick={() => { handleOpenJoinUsNewTab(); setShowProfileDropdown(false); }}
                          className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-2xl text-slate-700 hover:bg-amber-50 hover:text-amber-900 transition-all font-semibold"
                        >
                          <Stethoscope className="w-4 h-4 text-amber-600" />
                          <span>Specialist Doctor Portal</span>
                          <ExternalLink className="w-3 h-3 text-slate-400 ml-auto" />
                        </button>

                        <button
                          onClick={() => { setShowProfileDropdown(false); setIsNotificationOpen(true); }}
                          className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-2xl text-slate-700 hover:bg-[#ECE8FF] hover:text-[#5B48D6] transition-all font-semibold"
                        >
                          <Bell className="w-4 h-4 text-[#5B48D6]" />
                          <span>Notifications ({unreadCount})</span>
                        </button>

                      </div>

                      <div className="pt-2 border-t border-slate-100">
                        <button
                          onClick={() => { logout(); setShowProfileDropdown(false); }}
                          className="w-full flex items-center space-x-3 px-3 py-2 rounded-2xl text-rose-600 hover:bg-rose-50 text-xs font-bold transition-all"
                        >
                          <LogOut className="w-4 h-4 text-rose-600" />
                          <span>Log Out</span>
                        </button>
                      </div>

                    </div>
                  </>
                )}
                </div>
              ) : (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="hidden sm:flex items-center space-x-1.5 px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md transition-all flex-shrink-0"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </button>
              )}

              {/* HAMBURGER MENU BUTTON */}
              <button
                onClick={handleToggleHamburger}
                className="w-11 h-11 rounded-2xl bg-white text-[#241F4A] border border-[#E4DFF7] hover:border-[#5B48D6] shadow-sm flex items-center justify-center transition-all focus:outline-none flex-shrink-0 cursor-pointer active:scale-95"
                title="Open Navigation Menu"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6 text-[#5B48D6]" /> : <Menu className="w-6 h-6 text-[#241F4A]" />}
              </button>

            </div>

          </div>
        </div>
      </header>
    </div>

      {/* MOBILE HAMBURGER DRAWER */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[9999] bg-slate-900/60 backdrop-blur-md flex justify-end animate-in fade-in duration-150 max-w-full overflow-x-hidden">
          <div className="w-80 max-w-[85vw] h-screen bg-white shadow-2xl p-6 flex flex-col justify-between border-l border-emerald-100 overflow-y-auto">
            
            <div className="space-y-6">
              
              {/* Mobile Profile Header Card */}
              <div className="p-4 rounded-3xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img src={userAvatar} className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-xs" />
                    <div>
                      <div className="text-xs font-extrabold text-slate-900">{userName}</div>
                      <div className="text-[10px] font-mono text-emerald-800 font-bold">User ID: {userId}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1.5 rounded-full hover:bg-white text-slate-500"
                  >
                    <X className="w-5 h-5 text-slate-700" />
                  </button>
                </div>
              </div>

              {/* Main Mobile Navigation Links */}
              <div className="space-y-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3">Explore Features</div>

                <button
                  onClick={handleOpenJoinUsNewTab}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-xs font-black bg-gradient-to-r from-emerald-700 to-teal-700 text-white shadow-md border border-emerald-500/40 transition-all"
                >
                  <Stethoscope className="w-4 h-4 text-emerald-200" />
                  <span>JOIN US (Specialist Portal ↗)</span>
                </button>

                <button
                  onClick={() => handleNavClick('home')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                    activeTab === 'home' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Home className="w-4 h-4 text-emerald-600" />
                  <span>{t('navHome')}</span>
                </button>

                <button
                  onClick={() => handleNavClick('book-counselor')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                    activeTab === 'book-counselor' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Video className="w-4 h-4 text-emerald-600" />
                  <span>{t('navBookCounselor')}</span>
                </button>

                <button
                  onClick={() => handleNavClick('common-problems')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                    activeTab === 'common-problems' ? 'bg-teal-50 text-teal-800 border border-teal-200' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <HelpCircle className="w-4 h-4 text-teal-600" />
                  <span>{t('navCommonProblems')}</span>
                </button>

                <button
                  onClick={() => { setIsMobileMenuOpen(false); onOpenMyBookings(); }}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all"
                >
                  <Calendar className="w-4 h-4 text-emerald-600" />
                  <span>My Bookings</span>
                </button>

                {onOpenTutorial && (
                  <button
                    onClick={() => { setIsMobileMenuOpen(false); onOpenTutorial(); }}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-xs font-bold text-slate-700 hover:bg-[#ECE8FF] hover:text-[#5B48D6] transition-all"
                  >
                    <BookOpen className="w-4 h-4 text-indigo-500" />
                    <span>App Tutorial Guide (Slides)</span>
                  </button>
                )}

                {onOpenSpotlightTour && (
                  <button
                    onClick={() => { setIsMobileMenuOpen(false); onOpenSpotlightTour(); }}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-xs font-bold text-slate-700 hover:bg-[#ECE8FF] hover:text-[#5B48D6] transition-all"
                  >
                    <Compass className="w-4 h-4 text-amber-500" />
                    <span>Interactive App Tour (Overlay)</span>
                  </button>
                )}

                <button
                  onClick={toggleLang}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all"
                >
                  <div className="flex items-center space-x-3">
                    <Globe className="w-4 h-4 text-teal-600" />
                    <span>Language</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100">
                    {lang === 'en' ? 'English' : 'हिंदी'}
                  </span>
                </button>
              </div>

            </div>

            {/* Mobile Drawer Footer */}
            <div className="border-t border-slate-100 pt-4 space-y-3">
              <button
                onClick={() => { setIsMobileMenuOpen(false); onBookCounselor(); }}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-xs uppercase tracking-wider shadow-md"
              >
                {t('bookCounselorBtn')}
              </button>

              {user ? (
                <button
                  onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                  className="w-full flex items-center justify-center space-x-2 py-2 text-rose-600 text-xs font-bold"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out</span>
                </button>
              ) : (
                <button
                  onClick={() => { setIsMobileMenuOpen(false); setIsLoginModalOpen(true); }}
                  className="w-full flex items-center justify-center space-x-2 py-2 text-emerald-700 text-xs font-bold"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In / Register</span>
                </button>
              )}
            </div>

          </div>
        </div>
      )}

      {/* NOTIFICATION DRAWER */}
      <NotificationDrawer
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />

      {/* LOGIN MODAL */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
}
