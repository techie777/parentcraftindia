import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MessageSquare } from 'lucide-react';

export default function StickyBottomCTA({ onOpenCounselorChat, onBookCounselor }) {
  const { lang } = useLanguage();
  const isHi = lang === 'hi';

  const handleClick = () => {
    if (onOpenCounselorChat) {
      onOpenCounselorChat();
    } else if (onBookCounselor) {
      onBookCounselor();
    }
  };

  return (
    <aside 
      aria-label="Talk to Child Counsellor" 
      className="fixed bottom-20 right-3.5 sm:bottom-6 sm:right-6 z-40 flex items-center space-x-2 group select-none"
    >
      {/* Animated Floating Pill: "Talk to counsellor" */}
      <button
        type="button"
        onClick={handleClick}
        className="flex items-center space-x-2 py-2 px-3 sm:px-4 rounded-full bg-white/95 backdrop-blur-md text-[#241F4A] hover:text-[#5B48D6] shadow-lg shadow-black/10 border border-[#E4DFF7] text-xs font-black tracking-tight cursor-pointer transition-all hover:scale-105 active:scale-95 animate-bounce duration-1000"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
        <span className="whitespace-nowrap">{isHi ? 'काउंसलर से बात करें' : 'Talk to counsellor'}</span>
      </button>

      {/* Circular Floating Chat Launcher */}
      <button
        type="button"
        onClick={handleClick}
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#5B48D6] via-[#7B68EE] to-[#FF8F7A] shadow-xl shadow-[#5B48D6]/35 flex items-center justify-center text-white cursor-pointer hover:scale-110 active:scale-95 transition-all relative flex-shrink-0"
        title={isHi ? 'काउंसलर से बात करें' : 'Talk to counsellor'}
        aria-label="Talk to child counsellor"
      >
        <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        
        {/* Animated Green Online Indicator Dot */}
        <span className="w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-white absolute top-0.5 right-0.5 animate-ping" />
        <span className="w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-white absolute top-0.5 right-0.5 shadow-xs" />
      </button>
    </aside>
  );
}
