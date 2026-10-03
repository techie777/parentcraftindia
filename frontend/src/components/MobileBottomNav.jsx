import React from 'react';
import { Home, Video, Compass, Calendar, HeartHandshake, Sparkles, MessageSquare } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useBookingNotification } from '../context/BookingNotificationContext';

export default function MobileBottomNav({ activeTab, setActiveTab, onOpenMyBookings, onOpenCrisisModal, onOpenTutorial, onOpenSpotlightTour, isTourActive }) {
  const { lang } = useLanguage();
  const isHi = lang === 'hi';
  const { unreadCount } = useBookingNotification();

  const handleTab = (tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div 
      id="mobile-bottom-nav"
      className={`fixed bottom-0 left-0 right-0 border-t border-[#E4DFF7] px-2 py-1.5 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] md:hidden transition-all duration-300 ${
        isTourActive 
          ? 'z-[9996] bg-white shadow-[0_-10px_35px_rgba(91,72,214,0.35)] ring-2 ring-[#7D6BEE]' 
          : 'z-40 bg-white/95 backdrop-blur-lg'
      }`}>
      <div className="flex items-center justify-around max-w-lg mx-auto">
        
        {/* Home */}
        <button
          type="button"
          id="tour-mobile-home" onClick={() => handleTab('home')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl transition-all cursor-pointer ${
            activeTab === 'home'
              ? 'text-[#5B48D6] font-black'
              : 'text-[#5E5A80] hover:text-[#241F4A]'
          }`}
        >
          <div className={`p-1 rounded-xl transition-all ${activeTab === 'home' ? 'bg-[#ECE8FF]' : ''}`}>
            <Home className="w-5 h-5" />
          </div>
          <span className="text-[10px] tracking-tight mt-0.5">{isHi ? 'होम' : 'Home'}</span>
        </button>

        {/* Specialists */}
        <button
          type="button"
          id="tour-mobile-experts" onClick={() => handleTab('book-counselor')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl transition-all cursor-pointer ${
            activeTab === 'book-counselor'
              ? 'text-[#5B48D6] font-black'
              : 'text-[#5E5A80] hover:text-[#241F4A]'
          }`}
        >
          <div className={`p-1 rounded-xl transition-all ${activeTab === 'book-counselor' ? 'bg-[#ECE8FF]' : ''}`}>
            <Video className="w-5 h-5" />
          </div>
          <span className="text-[10px] tracking-tight mt-0.5">{isHi ? 'विशेषज्ञ' : 'Experts'}</span>
        </button>

        {/* Problem Areas */}
        <button
          type="button"
          id="tour-mobile-problems" onClick={() => handleTab('common-problems')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl transition-all cursor-pointer ${
            activeTab === 'common-problems'
              ? 'text-[#5B48D6] font-black'
              : 'text-[#5E5A80] hover:text-[#241F4A]'
          }`}
        >
          <div className={`p-1 rounded-xl transition-all ${activeTab === 'common-problems' ? 'bg-[#ECE8FF]' : ''}`}>
            <Compass className="w-5 h-5" />
          </div>
          <span className="text-[10px] tracking-tight mt-0.5">{isHi ? 'समस्याएं' : 'Problems'}</span>
        </button>

        {/* Bookings */}
        <button
          type="button"
          id="tour-mobile-bookings" onClick={onOpenMyBookings}
          className="flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl transition-all text-[#5E5A80] hover:text-[#241F4A] relative cursor-pointer"
        >
          <div className="p-1 rounded-xl relative">
            <Calendar className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-white animate-pulse" />
            )}
          </div>
          <span className="text-[10px] tracking-tight mt-0.5">{isHi ? 'बुकिंग्स' : 'Bookings'}</span>
        </button>

        {/* Urgent Crisis SOS */}
        <button
          type="button"
          id="tour-mobile-sos" onClick={onOpenCrisisModal}
          className="flex flex-col items-center justify-center py-1 px-2 rounded-2xl text-rose-600 hover:text-rose-700 transition-all cursor-pointer"
        >
          <div className="p-1 rounded-xl bg-rose-50 text-rose-600">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-black tracking-tight mt-0.5">{isHi ? 'हेल्पलाइन' : 'SOS Help'}</span>
        </button>

      </div>
    </div>
  );
}
