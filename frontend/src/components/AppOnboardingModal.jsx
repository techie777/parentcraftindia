import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, ArrowRight, ArrowLeft, X, 
  Home, Video, HelpCircle, Calendar, HeartHandshake,
  CheckCircle2, Compass, Stethoscope
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function AppOnboardingModal({ isOpen, onClose }) {
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
      badgeEn: 'Navigation 1 of 5 • Dashboard',
      badgeHi: 'नेविगेशन 1 / 5 • मुख्य पृष्ठ',
      titleEn: 'Click here for Home',
      titleHi: 'होम (मुख्य पृष्ठ) के लिए यहाँ क्लिक करें',
      actionPromptEn: '👉 Click here for Home',
      actionPromptHi: '👉 होम के लिए यहाँ क्लिक करें',
      descEn: 'Returns you to the main dashboard anytime. Explore featured child care programs, age milestones (ages 4–17), and parenting guidance.',
      descHi: 'किसी भी समय मुख्य पेज पर लौटने के लिए यहाँ क्लिक करें — नए प्रोग्राम, आयु अनुसार विकास के चरण और पेरेंटिंग टूल्स देखें।',
      featureHighlightEn: 'Instant access to all clinical programs & top recommendations',
      featureHighlightHi: 'सभी क्लिनिकल प्रोग्राम और प्रमुख सिफारिशों तक तुरंत पहुंच',
      nextLabelEn: 'Next: Experts →',
      nextLabelHi: 'आगे: विशेषज्ञ →'
    },
    {
      key: 'experts',
      desktopId: 'tour-nav-experts',
      mobileId: 'tour-mobile-experts',
      icon: Video,
      iconEmoji: '🩺',
      badgeEn: 'Navigation 2 of 5 • Find Doctors',
      badgeHi: 'नेविगेशन 2 / 5 • विशेषज्ञ खोज',
      titleEn: 'Click here for Counsellors search & book',
      titleHi: 'काउंसलर्स खोज व बुकिंग के लिए यहाँ क्लिक करें',
      actionPromptEn: '👉 Click here for Counsellors',
      actionPromptHi: '👉 काउंसलर्स के लिए यहाँ क्लिक करें',
      descEn: 'Search and filter RCI & MCI verified child psychologists, speech therapists, and developmental pediatricians across India. View bios, ratings, and book private video sessions.',
      descHi: 'भारत भर के प्रमाणित बाल मनोवैज्ञानिकों, स्पीच थेरेपिस्ट्स और डॉक्टरों की सूची देखें, प्रोफाइल व रेटिंग जांचें और सीधे वीडियो सत्र बुक करें।',
      featureHighlightEn: 'Filter by concern (ADHD, Speech, Anxiety), language & fee',
      featureHighlightHi: 'समस्या (एडीएचडी, स्पीच, तनाव), भाषा और फीस अनुसार फ़िल्टर करें',
      nextLabelEn: 'Next: Problems →',
      nextLabelHi: 'आगे: समस्याएं →'
    },
    {
      key: 'problems',
      desktopId: 'tour-nav-problems',
      mobileId: 'tour-mobile-problems',
      icon: HelpCircle,
      iconEmoji: '🧩',
      badgeEn: 'Navigation 3 of 5 • Problem Areas',
      badgeHi: 'नेविगेशन 3 / 5 • समस्या निवारण',
      titleEn: 'Click here for Problem Areas',
      titleHi: 'समस्या निवारण हब के लिए यहाँ क्लिक करें',
      actionPromptEn: '👉 Click here for Problem Areas',
      actionPromptHi: '👉 समस्या निवारण के लिए यहाँ क्लिक करें',
      descEn: 'Explore doctor-backed clinical solutions for screen addiction, exam anxiety, school refusal, tantrums, ADHD, and speech delay with interactive Q&A cards.',
      descHi: 'स्क्रीन की लत, परीक्षा का डर, गुस्सा, स्कूल जाने से डर, एडीएचडी और स्पीच डिले का डॉक्टर-सत्यापित समाधान व प्रश्नोत्तरी कार्ड देखें।',
      featureHighlightEn: 'Tap any card to view doctor advice & tap heart to save favorites',
      featureHighlightHi: 'किसी भी कार्ड को खोलकर डॉक्टर के सुझाव पढ़ें और पसंदीदा सेव करें',
      nextLabelEn: 'Next: Bookings →',
      nextLabelHi: 'आगे: बुकिंग्स →'
    },
    {
      key: 'bookings',
      desktopId: 'tour-nav-bookings',
      mobileId: 'tour-mobile-bookings',
      icon: Calendar,
      iconEmoji: '📅',
      badgeEn: 'Navigation 4 of 5 • My Schedule',
      badgeHi: 'नेविगेशन 4 / 5 • मेरी बुकिंग्स',
      titleEn: 'Click here for Bookings',
      titleHi: 'अपनी बुकिंग्स देखने के लिए यहाँ क्लिक करें',
      actionPromptEn: '👉 Click here for Bookings',
      actionPromptHi: '👉 बुकिंग्स के लिए यहाँ क्लिक करें',
      descEn: 'Access all your upcoming appointments, view confirmed date/time slots, join 1-on-1 private video calls with one click, and download consultation summaries.',
      descHi: 'अपने सभी निर्धारित परामर्श सत्र देखें, समय स्लॉट जांचें, एक क्लिक में निजी वीडियो कॉल से जुड़ें और पर्ची डाउनलोड करें।',
      featureHighlightEn: 'One-click video room join link & live appointment countdown',
      featureHighlightHi: 'एक क्लिक में वीडियो कॉल जॉइन लिंक व लाइव अपॉइंटमेंट काउंटडाउन',
      nextLabelEn: 'Next: SOS Help →',
      nextLabelHi: 'आगे: हेल्पलाइन →'
    },
    {
      key: 'sos',
      desktopId: 'tour-nav-sos',
      mobileId: 'tour-mobile-sos',
      icon: HeartHandshake,
      iconEmoji: '🆘',
      badgeEn: 'Navigation 5 of 5 • 24/7 Crisis Help',
      badgeHi: 'नेविगेशन 5 / 5 • आपातकालीन सहायता',
      titleEn: 'Click here for SOS Help',
      titleHi: '24/7 आपातकालीन सहायता व हेल्पलाइन के लिए यहाँ क्लिक करें',
      actionPromptEn: '👉 Click here for SOS Help',
      actionPromptHi: '👉 SOS हेल्पलाइन के लिए यहाँ क्लिक करें',
      descEn: 'Need immediate guidance or feeling overwhelmed? One-touch direct connection to Govt Tele-MANAS (14416), Childline (1098), and our 24/7 clinical chat guide.',
      descHi: 'तत्काल मनोवैज्ञानिक मदद या आपातकालीन स्थिति में सरकारी टेली-मानस (14416), चाइल्डलाइन (1098) और 24/7 लाइव चैट से तुरंत जुड़ें।',
      featureHighlightEn: '100% free, confidential & available 24 hours every day',
      featureHighlightHi: '100% निशुल्क, पूर्ण गोपनीय और 24 घंटे हर दिन उपलब्ध',
      nextLabelEn: 'Finish Tour 🚀',
      nextLabelHi: 'टूर समाप्त करें 🚀'
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

    // Fallback: if not found by primary ID, try desktop/mobile counterpart
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

  useEffect(() => {
    if (!isOpen) return;

    updateTargetRect();
    const handleResize = () => updateTargetRect();
    const handleScroll = () => updateTargetRect();

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    // Small delay to allow any layout rendering to stabilize
    const timer = setTimeout(updateTargetRect, 80);

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
      localStorage.setItem('parentcraft_tutorial_seen', 'true');
      sessionStorage.setItem('parentcraft_intro_seen', 'true');
    } catch (e) {
      console.warn('Storage unavailable', e);
    }
    onClose();
  };

  const isTargetAtBottom = isMobile || (targetRect && targetRect.top > window.innerHeight / 2);

  return (
    <div className="fixed inset-0 z-[9990] overflow-hidden select-none animate-in fade-in duration-200">
      
      {/* SEMI-TRANSPARENT BACKDROP */}
      <div 
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm transition-opacity duration-300"
        onClick={handleComplete}
      />

      {/* SPOTLIGHT GLOW RING OVER ACTUAL BUTTON */}
      {targetRect && (
        <div
          className="fixed pointer-events-none z-[9995] transition-all duration-300 ease-out"
          style={{
            top: `${Math.max(0, targetRect.top - 6)}px`,
            left: `${Math.max(0, targetRect.left - 6)}px`,
            width: `${targetRect.width + 12}px`,
            height: `${targetRect.height + 12}px`,
            borderRadius: '9999px',
            boxShadow: '0 0 0 9999px rgba(15, 23, 42, 0.78), 0 0 24px 6px rgba(125, 107, 238, 0.95)',
            border: '2px solid #A78BFA'
          }}
        >
          {/* Pulsing halo wave around the highlighted button */}
          <div className="absolute inset-0 rounded-full border-2 border-white animate-ping opacity-60 pointer-events-none" />
          
          {/* Animated Attention Badge pointing directly to the target */}
          <div 
            className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-full bg-gradient-to-r from-[#5B48D6] to-[#7D6BEE] text-white text-[11px] font-black shadow-lg border border-white/40 flex items-center space-x-1 animate-bounce pointer-events-auto cursor-pointer ${
              isTargetAtBottom ? '-top-10' : '-bottom-10'
            }`}
            onClick={handleNext}
          >
            <span>{isHi ? currentTour.actionPromptHi : currentTour.actionPromptEn}</span>
          </div>
        </div>
      )}

      {/* FLOATING COACH MARK GUIDE CARD */}
      <div 
        className={`fixed z-[10000] px-4 w-full flex justify-center transition-all duration-300 ${
          isTargetAtBottom 
            ? 'bottom-24 sm:bottom-28' 
            : 'top-24 sm:top-28'
        }`}
      >
        <div className="max-w-lg w-full bg-white text-[#1A1540] rounded-[28px] sm:rounded-[32px] p-5 sm:p-6 shadow-[0_25px_60px_-15px_rgba(91,72,214,0.4)] border border-[#E4DFF7] relative animate-in zoom-in-95 duration-200 overflow-hidden flex flex-col space-y-3.5">
          
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
                <span>{isHi ? currentTour.badgeHi : currentTour.badgeEn}</span>
              </span>
              <span className="text-[11px] font-mono font-bold text-slate-400">
                {isHi ? `स्टेप ${currentStep + 1} / ${totalSteps}` : `Step ${currentStep + 1} of ${totalSteps}`}
              </span>
            </div>

            <button
              type="button"
              onClick={handleComplete}
              className="text-xs font-bold text-slate-400 hover:text-slate-800 transition-colors p-1.5 rounded-full hover:bg-slate-100 cursor-pointer flex items-center space-x-1"
              title={isHi ? 'टूर छोड़ें' : 'Skip guide'}
            >
              <span className="text-[11px]">{isHi ? 'छोड़ें' : 'Skip'}</span>
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* MAIN INSTRUCTION HEADLINE */}
          <div className="flex items-start space-x-3 pt-1">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#ECE8FF] to-[#FAF8FF] border border-[#D5CCFA] shadow-xs flex items-center justify-center text-2xl flex-shrink-0 animate-in zoom-in duration-200">
              {currentTour.iconEmoji}
            </div>
            <div className="space-y-0.5">
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#5B48D6]">
                {isHi ? 'निर्देश:' : 'Quick Navigation Guide:'}
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

          {/* ACTION CALLOUT HIGHLIGHT */}
          <div className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-[#FAF8FF] border border-[#E9E4F5] text-xs text-slate-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span className="font-semibold leading-tight text-slate-800">
              {isHi ? currentTour.featureHighlightHi : currentTour.featureHighlightEn}
            </span>
          </div>

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
          <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
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
