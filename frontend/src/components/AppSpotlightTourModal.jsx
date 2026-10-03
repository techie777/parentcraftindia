import React, { useState, useEffect } from 'react';
import { 
  Sparkles, ArrowRight, ArrowLeft, X, 
  Home, Video, HelpCircle, Calendar, HeartHandshake
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function AppSpotlightTourModal({ isOpen, onClose }) {
  const { lang } = useLanguage();
  const isHi = lang === 'hi';
  const [currentStep, setCurrentStep] = useState(0);
  const [targetRect, setTargetRect] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const TOUR_STEPS = [
    {
      key: 'home',
      desktopId: 'tour-nav-home',
      mobileId: 'tour-mobile-home',
      icon: Home,
      iconEmoji: '🏠',
      stepNumEn: 'Step 1 of 5 • Home',
      stepNumHi: 'स्टेप 1 / 5 • होम',
      titleEn: 'Click here for Home',
      titleHi: 'होम (Dashboard) के लिए यहाँ क्लिक करें',
      promptEn: '👉 Click here for Home',
      promptHi: '👉 होम के लिए यहाँ क्लिक करें',
      descEn: 'Returns you to the main dashboard anytime. Explore featured child care programs, age-specific milestones (ages 4–17), and parenting guidance tools.',
      descHi: 'किसी भी समय मुख्य पेज पर लौटने के लिए यहाँ क्लिक करें — प्रमुख क्लिनिकल प्रोग्राम, आयु अनुसार विकास के चरण और पेरेंटिंग टूल्स देखें।',
      actionBadgeEn: 'Main Navigation & Dashboard',
      actionBadgeHi: 'मुख्य डैशबोर्ड व होम पेज',
      nextLabelEn: 'Next: Experts →',
      nextLabelHi: 'आगे: काउंसलर्स →'
    },
    {
      key: 'experts',
      desktopId: 'tour-nav-experts',
      mobileId: 'tour-mobile-experts',
      icon: Video,
      iconEmoji: '🩺',
      stepNumEn: 'Step 2 of 5 • Experts',
      stepNumHi: 'स्टेप 2 / 5 • काउंसलर्स',
      titleEn: 'Click here for Counsellors search & book',
      titleHi: 'काउंसलर्स खोज व बुकिंग के लिए यहाँ क्लिक करें',
      promptEn: '👉 Click here for Counsellors',
      promptHi: '👉 काउंसलर्स के लिए यहाँ क्लिक करें',
      descEn: 'Search and filter RCI & MCI verified child psychologists, speech therapists, and developmental pediatricians across India. View bios, parent reviews, and book private video sessions.',
      descHi: 'भारत भर के प्रमाणित बाल मनोवैज्ञानिकों, स्पीच थेरेपिस्ट्स और डॉक्टरों की सूची देखें, प्रोफाइल व रेटिंग जांचें और सीधे वीडियो सत्र बुक करें।',
      actionBadgeEn: 'Verified Doctor Directory & Booking',
      actionBadgeHi: 'सत्यापित डॉक्टर खोज व बुकिंग',
      nextLabelEn: 'Next: Problems →',
      nextLabelHi: 'आगे: समस्याएं →'
    },
    {
      key: 'problems',
      desktopId: 'tour-nav-problems',
      mobileId: 'tour-mobile-problems',
      icon: HelpCircle,
      iconEmoji: '🧩',
      stepNumEn: 'Step 3 of 5 • Problem Areas',
      stepNumHi: 'स्टेप 3 / 5 • समस्याएं',
      titleEn: 'Click here for Problem Areas',
      titleHi: 'समस्या निवारण हब के लिए यहाँ क्लिक करें',
      promptEn: '👉 Click here for Problem Areas',
      promptHi: '👉 समस्या निवारण के लिए यहाँ क्लिक करें',
      descEn: 'Explore doctor-backed clinical solutions for screen addiction, exam anxiety, school refusal, tantrums, ADHD, and speech delay with interactive Q&A cards and favorite saving.',
      descHi: 'स्क्रीन की लत, परीक्षा का तनाव, गुस्सा, स्कूल जाने से डर, एडीएचडी और स्पीच डिले का डॉक्टर-सत्यापित समाधान व प्रश्नोत्तरी कार्ड देखें।',
      actionBadgeEn: 'Clinical Guidance & Problem Hub',
      actionBadgeHi: 'क्लिनिकल समाधान व पेरेंटिंग गाइड',
      nextLabelEn: 'Next: Bookings →',
      nextLabelHi: 'आगे: बुकिंग्स →'
    },
    {
      key: 'bookings',
      desktopId: 'tour-nav-bookings',
      mobileId: 'tour-mobile-bookings',
      icon: Calendar,
      iconEmoji: '📅',
      stepNumEn: 'Step 4 of 5 • Bookings',
      stepNumHi: 'स्टेप 4 / 5 • बुकिंग्स',
      titleEn: 'Click here for Bookings',
      titleHi: 'अपनी बुकिंग्स देखने के लिए यहाँ क्लिक करें',
      promptEn: '👉 Click here for Bookings',
      promptHi: '👉 बुकिंग्स के लिए यहाँ क्लिक करें',
      descEn: 'Access all your scheduled appointments, view confirmed date/time slots, join 1-on-1 private video calls with one click, and download consultation summaries.',
      descHi: 'अपने सभी निर्धारित परामर्श सत्र देखें, समय स्लॉट जांचें, एक क्लिक में निजी वीडियो कॉल से जुड़ें और पर्ची डाउनलोड करें।',
      actionBadgeEn: 'Session Schedule & Live Video Room',
      actionBadgeHi: 'सत्र शेड्यूल व वीडियो कॉल रूम',
      nextLabelEn: 'Next: SOS Help →',
      nextLabelHi: 'आगे: SOS हेल्पलाइन →'
    },
    {
      key: 'sos',
      desktopId: 'tour-nav-sos',
      mobileId: 'tour-mobile-sos',
      icon: HeartHandshake,
      iconEmoji: '🆘',
      stepNumEn: 'Step 5 of 5 • 24/7 Helpline',
      stepNumHi: 'स्टेप 5 / 5 • 24/7 हेल्पलाइन',
      titleEn: 'Click here for SOS Help',
      titleHi: '24/7 आपातकालीन सहायता व हेल्पलाइन के लिए यहाँ क्लिक करें',
      promptEn: '👉 Click here for SOS Help',
      promptHi: '👉 SOS हेल्पलाइन के लिए यहाँ क्लिक करें',
      descEn: 'Need immediate guidance or feeling overwhelmed? One-touch direct connection to Govt Tele-MANAS (14416), Childline (1098), and our 24/7 clinical chat guide.',
      descHi: 'तत्काल मनोवैज्ञानिक मदद या आपातकालीन स्थिति में सरकारी टेली-मानस (14416), चाइल्डलाइन (1098) और 24/7 लाइव चैट से तुरंत जुड़ें।',
      actionBadgeEn: '24/7 Free & Confidential Emergency Support',
      actionBadgeHi: '24/7 निशुल्क व गोपनीय आपातकालीन सहायता',
      nextLabelEn: 'Finish Tour & Explore App 🚀',
      nextLabelHi: 'टूर समाप्त करें और ऐप देखें 🚀'
    }
  ];

  const totalSteps = TOUR_STEPS.length;
  const currentTour = TOUR_STEPS[currentStep];
  const isFirst = currentStep === 0;
  const isLast = currentStep === totalSteps - 1;
  const progressPercent = ((currentStep + 1) / totalSteps) * 100;

  // Track target element bounding rect
  const updateTargetRect = () => {
    const mobile = window.innerWidth < 1024;
    setIsMobile(mobile);

    const targetId = mobile ? currentTour.mobileId : currentTour.desktopId;
    let el = document.getElementById(targetId);

    // Fallback if not found
    if (!el) {
      el = document.getElementById(currentTour.desktopId) || document.getElementById(currentTour.mobileId);
    }

    if (el) {
      const rect = el.getBoundingClientRect();
      setTargetRect({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        bottom: rect.bottom,
        right: rect.right
      });
    } else {
      setTargetRect(null);
    }
  };

  // Reset to Step 1 whenever opened
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
      updateTargetRect();
    }
  }, [isOpen]);

  // Update on step change, resize, and scroll
  useEffect(() => {
    if (!isOpen) return;

    updateTargetRect();
    const handleResize = () => updateTargetRect();
    const handleScroll = () => updateTargetRect();

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    const timer = setTimeout(updateTargetRect, 60);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, [isOpen, currentStep]);

  if (!isOpen) return null;

  const handleNext = () => {
    if (isLast) {
      handleComplete();
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleComplete = () => {
    try {
      localStorage.setItem('parentcraft_spotlight_seen', 'true');
      sessionStorage.setItem('parentcraft_spotlight_seen', 'true');
    } catch (e) {
      console.warn('Storage unavailable', e);
    }
    onClose();
  };

  // Determine if target is in bottom navigation bar
  const isTargetAtBottom = isMobile || (targetRect && targetRect.top > window.innerHeight / 2);

  return (
    <div className="fixed inset-0 z-[9995] overflow-hidden select-none animate-in fade-in duration-200">
      
      {/* 3RD STEP: BLACK OVERLAY SCREEN GUIDING THROUGH THE APP */}
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] transition-opacity duration-300"
        onClick={handleComplete}
      />

      {/* SPOTLIGHT CUTOUT & GLOW RING OVER ACTUAL TARGET BUTTON */}
      {targetRect && (
        <div
          className="fixed pointer-events-none z-[9998] transition-all duration-300 ease-out"
          style={{
            top: `${Math.max(0, targetRect.top - 6)}px`,
            left: `${Math.max(0, targetRect.left - 6)}px`,
            width: `${targetRect.width + 12}px`,
            height: `${targetRect.height + 12}px`,
            borderRadius: '9999px',
            boxShadow: '0 0 0 9999px rgba(15, 23, 42, 0.40), 0 0 25px 6px rgba(125, 107, 238, 0.95)',
            border: '2px solid #A78BFA'
          }}
        >
          {/* Pulsing halo wave around the highlighted button */}
          <div className="absolute inset-0 rounded-full border-2 border-white animate-ping opacity-60 pointer-events-none" />
          
          {/* Animated attention prompt pointing directly at the button */}
          <div 
            className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#5B48D6] to-[#7D6BEE] text-white text-[11px] font-black shadow-2xl border border-white/50 flex items-center space-x-1 animate-bounce pointer-events-auto cursor-pointer ${
              isTargetAtBottom ? '-top-12' : '-bottom-12'
            }`}
            onClick={handleNext}
          >
            <span>{isHi ? currentTour.promptHi : currentTour.promptEn}</span>
          </div>
        </div>
      )}

      {/* FLOATING GUIDE CARD - POSITIONED TO NEVER BLOCK THE TARGET BUTTON */}
      <div 
        className={`fixed z-[9999] px-4 w-full flex justify-center transition-all duration-300 ${
          isTargetAtBottom 
            ? 'top-4 sm:top-8' 
            : 'top-28 sm:top-32'
        }`}
      >
        <div className="max-w-lg w-full bg-white text-[#1A1540] rounded-[28px] sm:rounded-[32px] p-5 sm:p-6 shadow-[0_25px_60px_-15px_rgba(91,72,214,0.45)] border border-[#E4DFF7] relative animate-in zoom-in-95 duration-200 overflow-hidden flex flex-col space-y-3">
          
          {/* TOP PROGRESS BAR */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-100">
            <div 
              className="h-full bg-gradient-to-r from-[#5B48D6] via-[#7D6BEE] to-emerald-500 transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* CARD HEADER: BADGE, STEP COUNTER & SKIP */}
          <div className="flex items-center justify-between pt-1 border-b border-slate-100 pb-2.5">
            <div className="flex items-center space-x-2">
              <span className="flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-[#ECE8FF] text-[#5B48D6] text-[10px] font-black uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-[#5B48D6]" />
                <span>{isHi ? currentTour.stepNumHi : currentTour.stepNumEn}</span>
              </span>
            </div>

            <button
              type="button"
              onClick={handleComplete}
              className="text-xs font-bold text-slate-400 hover:text-slate-800 transition-colors p-1.5 rounded-full hover:bg-slate-100 cursor-pointer flex items-center space-x-1"
              title={isHi ? 'गाइड समाप्त करें' : 'Finish tour'}
            >
              <span className="text-[11px] font-bold">{isHi ? 'छोड़ें (Skip)' : 'Skip'}</span>
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* MAIN INSTRUCTION HEADLINE */}
          <div className="flex items-start space-x-3 pt-0.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#ECE8FF] to-[#FAF8FF] border border-[#D5CCFA] shadow-xs flex items-center justify-center text-2xl flex-shrink-0 animate-in zoom-in duration-200">
              {currentTour.iconEmoji}
            </div>
            <div className="space-y-0.5">
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#5B48D6]">
                {isHi ? currentTour.actionBadgeHi : currentTour.actionBadgeEn}
              </div>
              <h3 className="text-base sm:text-lg font-black text-[#1A1540] tracking-tight leading-snug">
                {isHi ? currentTour.titleHi : currentTour.titleEn}
              </h3>
            </div>
          </div>

          {/* FRIENDLY EXPLANATION */}
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            {isHi ? currentTour.descHi : currentTour.descEn}
          </p>

          {/* STEP DOTS */}
          <div className="flex items-center justify-center space-x-2 pt-1">
            {TOUR_STEPS.map((stepItem, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentStep(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  currentStep === idx 
                    ? 'w-8 bg-[#5B48D6]' 
                    : 'w-2 bg-slate-200 hover:bg-slate-300'
                }`}
                aria-label={`Jump to tour step ${idx + 1}`}
              />
            ))}
          </div>

          {/* FOOTER ACTIONS (NEXT, BACK, FINISH) */}
          <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
            {!isFirst && (
              <button
                type="button"
                onClick={handleBack}
                className="py-2.5 px-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center space-x-1 transition-all cursor-pointer active:scale-95"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{isHi ? 'पीछे' : 'Back'}</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleNext}
              className="flex-1 py-2.5 sm:py-3 px-4 rounded-2xl bg-gradient-to-r from-[#5B48D6] to-[#7D6BEE] hover:from-[#4E3BC2] hover:to-[#6C59E3] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-md shadow-[#5B48D6]/30 transition-all cursor-pointer active:scale-95"
            >
              <span>{isHi ? currentTour.nextLabelHi : currentTour.nextLabelEn}</span>
              {!isLast && <ArrowRight className="w-4 h-4" />}
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}
