import React, { useState, useEffect } from 'react';

export default function InitialSplashScreen({ onFinish }) {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Simple, swift transition: 1.2s display then 300ms smooth fade-out
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        onFinish();
      }, 300);
    }, 1200);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#FAF8FF] text-[#1A1540] px-6 transition-opacity duration-300 select-none font-sans ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center text-center space-y-4 animate-in fade-in zoom-in-95 duration-400">
        
        {/* Clean Official Brand Emblem */}
        <div className="w-20 h-20 rounded-2xl bg-white p-3 shadow-[0_10px_25px_-5px_rgba(91,72,214,0.12)] border border-[#E4DFF7] flex items-center justify-center">
          <img 
            alt="Parentcraft India" 
            className="w-full h-full object-contain" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyVVYb08Y0ZEtV7XOLRDspc2OvrH6etB22FmUsxiiswS2fZ13HBqAVFHxtEm6bwvTj7mp5S-mfqDZMVDSoPp3SzRWr5mOHnI-ealcY-Y9mNVjvpzksZyRg4UwinWs4PmkYG2-F3wTGlSGM9Z8Yho1jMI4huEW8YLops_8xDzBfR_ySW-HQtkxqCDCAlsChLA6C8Hk4afF2HB91uirPyIs2SqobJCUiEoER6A0qEdPKiLe2HgsxHRzibw" 
          />
        </div>

        {/* Clean Brand Title & Minimal Subtext */}
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#2A2461]">
            Parentcraft <span className="text-[#5B48D6]">India</span>
          </h1>
          <p className="text-xs text-[#5E5A80] font-medium tracking-wide">
            Child Wellbeing & Psychology
          </p>
        </div>

        {/* Subtle Minimalist Spinner */}
        <div className="pt-3 flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-[#E4DFF7] border-t-[#5B48D6] rounded-full animate-spin" />
        </div>

      </div>
    </div>
  );
}
