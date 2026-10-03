import React, { useState, useEffect } from 'react';
import { 
  Sparkles, ArrowRight, ArrowLeft, X, CheckCircle2, 
  Stethoscope, HelpCircle, Video, ShieldCheck, Heart, 
  Calendar, Lock, PhoneCall, Compass
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function AppFeatureTutorialModal({ isOpen, onClose, onStartSpotlightTour }) {
  const { lang } = useLanguage();
  const isHi = lang === 'hi';
  const [currentSlide, setCurrentSlide] = useState(0);

  // Always reset to first slide whenever opened
  useEffect(() => {
    if (isOpen) {
      setCurrentSlide(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const TUTORIAL_SLIDES = [
    {
      badgeEn: 'Specialist Network',
      badgeHi: 'प्रमाणित विशेषज्ञ नेटवर्क',
      iconEmoji: '🩺',
      titleEn: 'Verified Child Psychologists & Doctors',
      titleHi: 'सत्यापित बाल मनोवैज्ञानिक व काउंसलर',
      descEn: 'Connect with RCI & MCI registered specialists across India for behavioral, developmental, and emotional care (ages 4–17).',
      descHi: '4 से 17 वर्ष के बच्चों के व्यवहार, मानसिक और भावनात्मक विकास के लिए भारत भर के प्रमाणित विशेषज्ञों से परामर्श लें।',
      pointsEn: [
        '100% verified clinical credentials and hospital affiliations',
        'Filter by concern: Screen Addiction, ADHD, Speech Delay, Anxiety',
        'Consultations in Hindi, English, and regional languages'
      ],
      pointsHi: [
        '100% सत्यापित क्लिनिकल योग्यता और अनुभव',
        'समस्या अनुसार खोजें: स्क्रीन की लत, गुस्सा, एडीएचडी, स्पीच डिले',
        'हिंदी, अंग्रेजी व क्षेत्रीय भाषाओं में परामर्श उपलब्ध'
      ],
      trustPillEn: '⭐ 4.9/5 Rating • 14,000+ Indian Families Assisted',
      trustPillHi: '⭐ 4.9/5 रेटिंग • 14,000+ भारतीय परिवारों का भरोसा'
    },
    {
      badgeEn: 'Clinical Problem Areas',
      badgeHi: 'समस्या निवारण हब',
      iconEmoji: '🧩',
      titleEn: 'Solutions for Every Parenting Concern',
      titleHi: 'हर पेरेंटिंग चिंता का सटीक डॉक्टर समाधान',
      descEn: 'Step-by-step clinical guidance for screen addiction, exam stress, school refusal, tantrums, ADHD, and speech delay.',
      descHi: 'स्क्रीन की लत, परीक्षा का तनाव, स्कूल जाने से डर, गुस्सा और स्पीच डिले का सरल, व्यावहारिक व डॉक्टर-सत्यापित हल।',
      pointsEn: [
        'Structured clinical cards with doctor-reviewed Q&A',
        'Organized by age milestones from 4 to 17 years',
        'Tap the heart icon on any card to save as favorite'
      ],
      pointsHi: [
        'डॉक्टरों द्वारा जाँचे गए उत्तर और व्यावहारिक सुझाव',
        '4 से 17 वर्ष तक आयु वर्ग अनुसार सुव्यवस्थित श्रेणियां',
        'दिल (Heart) आइकन दबाकर पसंदीदा समस्याओं को सेव करें'
      ],
      trustPillEn: '✨ 8+ Major Clinical Categories Covered',
      trustPillHi: '✨ 8+ प्रमुख क्लिनिकल श्रेणियों में मार्गदर्शन'
    },
    {
      badgeEn: 'In-Browser Telehealth',
      badgeHi: 'निजी वीडियो परामर्श',
      iconEmoji: '🎥',
      titleEn: 'Private 1-on-1 Video & Audio Sessions',
      titleHi: '100% निजी व सुरक्षित वीडियो सत्र',
      descEn: 'Join confidential consultations directly inside your browser with zero downloads. Fully compliant with India’s DPDP Act 2023.',
      descHi: 'बिना कोई ऐप डाउनलोड किए अपने फोन या लैपटॉप से सीधे जुड़ें। भारत के डीपीडीपी एक्ट 2023 के तहत पूर्ण सुरक्षित व गोपनीय।',
      pointsEn: [
        'One-click instant camera and microphone activation',
        'End-to-end encrypted with zero third-party data sharing',
        'Integrated private in-call parent-doctor chat'
      ],
      pointsHi: [
        'एक क्लिक में कैमरा और माइक शुरू करने की आसान सुविधा',
        '256-बिट एन्क्रिप्शन और पूर्ण व्यक्तिगत डेटा गोपनीयता',
        'परामर्श के दौरान डॉक्टर के साथ सीधे निजी चैट'
      ],
      trustPillEn: '🔒 DPDP Act Compliant • 256-Bit SSL Encrypted',
      trustPillHi: '🔒 डीपीडीपी एक्ट 2023 अनुपालित • 256-बिट एन्क्रिप्टेड'
    },
    {
      badgeEn: 'Live Booking & 24/7 Helpline',
      badgeHi: 'सुरक्षित बुकिंग व हेल्पलाइन',
      iconEmoji: '📅',
      titleEn: 'Real-Time Slots & 24/7 Emergency Help',
      titleHi: 'आज से ही स्लॉट बुकिंग व 24/7 सहायता',
      descEn: 'Select live slots starting today, pay safely via UPI or cards, receive instant WhatsApp receipts, and get 24/7 crisis support.',
      descHi: 'आज की तारीख से उपलब्ध समय चुनें, यूपीआई से सुरक्षित भुगतान करें, व्हाट्सएप पर रसीद पाएं और 24/7 हेल्पलाइन से जुड़ें।',
      pointsEn: [
        'Live booking calendar starts from today’s current date',
        'PCI-DSS Level 1 safe payment gateway (UPI, Cards, NetBanking)',
        'Direct one-touch call to National Crisis Helpline (14416 / 1098)'
      ],
      pointsHi: [
        'आज के लाइव कैलेंडर से आसान स्लॉट चयन',
        '100% सुरक्षित भुगतान गेटवे (UPI, RuPay, Visa, Mastercard)',
        'राष्ट्रीय आपातकालीन हेल्पलाइन (14416 / 1098) पर तुरंत संपर्क'
      ],
      trustPillEn: '🛡️ Safe & Secure Gateway • 100% Refund Protection',
      trustPillHi: '🛡️ 100% सुरक्षित पेमेंट • आसान रिशेड्यूलिंग'
    }
  ];

  const totalSlides = TUTORIAL_SLIDES.length;
  const slide = TUTORIAL_SLIDES[currentSlide];
  const isFirst = currentSlide === 0;
  const isLast = currentSlide === totalSlides - 1;
  const progressPercent = ((currentSlide + 1) / totalSlides) * 100;

  const handleNext = () => {
    if (isLast) {
      onClose();
    } else {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-[9990] bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      
      {/* CARD CONTAINER */}
      <div className="max-w-[480px] w-full bg-white text-[#1A1540] rounded-[32px] p-5 sm:p-7 shadow-[0_25px_60px_-15px_rgba(91,72,214,0.35)] border border-[#E4DFF7] relative animate-in zoom-in-95 duration-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* TOP PROGRESS BAR STRIP */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-100">
          <div 
            className="h-full bg-gradient-to-r from-[#5B48D6] via-[#7D6BEE] to-emerald-500 transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* TOP BAR: BADGE, STEP COUNTER & SKIP */}
        <div className="flex items-center justify-between pt-1 pb-3 border-b border-slate-100">
          <div className="flex items-center space-x-2">
            <span className="flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-[#ECE8FF] text-[#5B48D6] text-[10px] font-black uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-[#5B48D6]" />
              <span>{isHi ? 'फीचर ट्यूटोरियल गाइड' : 'App Tutorial Guide'}</span>
            </span>
            <span className="text-[11px] font-mono font-bold text-slate-400">
              {isHi ? `${currentSlide + 1} / ${totalSlides}` : `${currentSlide + 1} of ${totalSlides}`}
            </span>
          </div>

          {/* User can read or skip anytime */}
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-bold text-slate-400 hover:text-slate-800 transition-colors p-1.5 rounded-full hover:bg-slate-100 cursor-pointer flex items-center space-x-1"
            title={isHi ? 'ट्यूटोरियल बंद करें' : 'Close tutorial'}
          >
            <span className="text-[11px] font-extrabold text-[#5B48D6]">{isHi ? 'छोड़ें (Skip)' : 'Skip'}</span>
            <X className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>

        {/* SCROLLABLE SLIDE CONTENT */}
        <div className="overflow-y-auto py-3 space-y-4 pr-1 focus:outline-none">
          
          {/* ICON & BADGE ROW */}
          <div className="flex items-center space-x-3.5">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-[#ECE8FF] to-[#FAF8FF] border border-[#D5CCFA] shadow-xs flex items-center justify-center text-3xl sm:text-4xl flex-shrink-0 animate-in zoom-in duration-200">
              {slide.iconEmoji}
            </div>
            <div className="space-y-0.5">
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-[#F3EFFF] text-[#5B48D6] border border-[#E4DFF7]">
                {isHi ? slide.badgeHi : slide.badgeEn}
              </span>
              <h2 className="text-lg sm:text-xl font-black text-[#1A1540] tracking-tight leading-snug">
                {isHi ? slide.titleHi : slide.titleEn}
              </h2>
            </div>
          </div>

          {/* MAIN DESCRIPTION */}
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            {isHi ? slide.descHi : slide.descEn}
          </p>

          {/* 3 HIGHLIGHT BULLET POINTS */}
          <div className="space-y-2 bg-[#FAF8FF] p-3 sm:p-3.5 rounded-2xl border border-[#E9E4F5]">
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#5B48D6] mb-1">
              {isHi ? 'मुख्य विशेषताएं:' : 'Key Highlights:'}
            </div>
            {(isHi ? slide.pointsHi : slide.pointsEn).map((point, idx) => (
              <div key={idx} className="flex items-start space-x-2 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="leading-snug">{point}</span>
              </div>
            ))}
          </div>

          {/* TRUST PILL */}
          <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-[11px] font-semibold w-full justify-center">
            <span>{isHi ? slide.trustPillHi : slide.trustPillEn}</span>
          </div>

        </div>

        {/* STEP DOTS INDICATOR */}
        <div className="flex items-center justify-center space-x-2 pt-1 pb-1">
          {TUTORIAL_SLIDES.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                currentSlide === idx 
                  ? 'w-8 bg-[#5B48D6]' 
                  : 'w-2 bg-slate-200 hover:bg-slate-300'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* FOOTER ACTIONS */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2">
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
              <span>
                {isLast 
                  ? (isHi ? 'शुरू करें (Explore App) 🚀' : 'Explore App Directly 🚀') 
                  : (isHi ? 'आगे बढ़ें (Next) →' : 'Next →')}
              </span>
              {!isLast && <ArrowRight className="w-4 h-4" />}
            </button>
          </div>

          {/* Optional separate button to launch the Black Overlay Guided Tour if user wants */}
          {isLast && onStartSpotlightTour && (
            <button
              type="button"
              onClick={onStartSpotlightTour}
              className="w-full py-2 px-3 rounded-xl bg-slate-50 hover:bg-[#ECE8FF] text-[#5B48D6] font-bold text-xs flex items-center justify-center space-x-1.5 border border-[#E4DFF7] transition-all cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>{isHi ? 'इंटरएक्टिव ऐप टूर भी देखें 🎯' : 'Launch Interactive App Tour 🎯'}</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
