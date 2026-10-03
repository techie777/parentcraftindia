import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useBookingNotification } from '../context/BookingNotificationContext';
import { 
  ArrowLeft, Star, Award, ShieldCheck, MapPin, Calendar, Clock, 
  Video, Phone, MessageSquare, CheckCircle2, AlertTriangle, Sparkles, 
  DollarSign, FileText, ChevronRight, Sun, Sunset, Moon, CreditCard, Send, Lock, RefreshCw, Bell, Camera, X, Smartphone, Shield, Check
} from 'lucide-react';
import VideoCallRoomModal from './VideoCallRoomModal';

export const TIME_SLOTS_BY_PERIOD = [
  {
    period: 'Morning Slots',
    periodHi: 'सुबह का समय',
    icon: Sun,
    iconColor: 'text-amber-500',
    bgColor: 'bg-amber-50/70 border-amber-200/70',
    slots: ['09:00 AM', '10:00 AM', '11:30 AM']
  },
  {
    period: 'Afternoon Slots',
    periodHi: 'दोपहर का समय',
    icon: Sunset,
    iconColor: 'text-teal-600',
    bgColor: 'bg-teal-50/70 border-teal-200/70',
    slots: ['12:30 PM', '02:00 PM', '04:00 PM']
  },
  {
    period: 'Evening Slots',
    periodHi: 'शाम का समय',
    icon: Moon,
    iconColor: 'text-indigo-600',
    bgColor: 'bg-indigo-50/70 border-indigo-200/70',
    slots: ['05:30 PM', '07:00 PM', '08:30 PM']
  }
];

export function getTodayDateString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function isSlotInPast(selectedDateStr, timeSlotStr) {
  try {
    const todayStr = getTodayDateString();
    if (selectedDateStr < todayStr) return true;
    if (selectedDateStr > todayStr) return false;

    const now = new Date();
    const currentHour = now.getHours();
    const currentMin = now.getMinutes();

    let [time, period] = timeSlotStr.split(' ');
    let [hour, min] = time.split(':').map(Number);
    if (period === 'PM' && hour !== 12) hour += 12;
    if (period === 'AM' && hour === 12) hour = 0;

    if (hour < currentHour) return true;
    if (hour === currentHour && min <= currentMin) return true;

    return false;
  } catch (e) {
    return false;
  }
}

export function getFirstAvailableSlot(dateStr) {
  const allSlots = ['09:00 AM', '10:00 AM', '11:30 AM', '12:30 PM', '02:00 PM', '04:00 PM', '05:30 PM', '07:00 PM', '08:30 PM'];
  const firstValid = allSlots.find(slot => !isSlotInPast(dateStr, slot));
  return firstValid || '05:30 PM';
}

export const COUNSELOR_SERVICES = [
  {
    id: 's_01',
    titleEn: '1-on-1 Child Behavioral & Emotion Assessment Session',
    titleHi: '1-ऑन-1 बाल व्यवहार व भावना मूल्यांकन सत्र',
    fee: 1200,
    duration: '45 Mins Session',
    descEn: 'Deep-dive clinical assessment including autism screening, school anxiety, and personalized parenting plan.',
    descHi: 'गहन नैदानिक मूल्यांकन जिसमें ऑटिज्म जांच, स्कूल की चिंता और व्यक्तिगत पेरेंटिंग योजना शामिल है।'
  },
  {
    id: 's_02',
    titleEn: 'Child Motor & Speech Evaluation Session',
    titleHi: 'बाल मोटर और वाक् (स्पीच) मूल्यांकन सत्र',
    fee: 800,
    duration: '30 Mins Session',
    descEn: 'Focused session for speech delay, stuttering, spatial balance, or fine motor milestone checks.',
    descHi: 'बोलने में देरी, हकलाने या शारीरिक विकास में रुकावट के लिए केंद्रित सत्र।'
  },
  {
    id: 's_03',
    titleEn: 'Parental Stress & Co-Parenting Harmony Consultation',
    titleHi: 'माता-पिता का तनाव व पारिवारिक सामंजस्य सत्र',
    fee: 1500,
    duration: '60 Mins Session',
    descEn: 'Dedicated session for mothers and fathers to resolve discipline conflicts and reduce burnout.',
    descHi: 'माता-पिता के बीच आपसी मतभेद दूर करने और पेरेंटिंग तनाव कम करने के लिए विशेष सत्र।'
  }
];

export const DEFAULT_CLINIC_GALLERY = [
  { url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80', caption: 'Private Consultation Suite' },
  { url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop&q=80', caption: 'Behavioral Play Therapy Room' },
  { url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop&q=80', caption: 'Speech & Motor Evaluation Hub' },
  { url: 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=800&auto=format&fit=crop&q=80', caption: 'RCI Clinical Certification & Team' }
];

export default function CounselorProfilePage({ counselor, onBackToDirectory, onBookingComplete }) {
  const { lang, t } = useLanguage();
  const bookingCtx = useBookingNotification();
  const saveBookingFn = bookingCtx?.createBooking || bookingCtx?.addBooking;

  const [selectedService, setSelectedService] = useState(COUNSELOR_SERVICES[0]);
  const [selectedDate, setSelectedDate] = useState(getTodayDateString);
  const [selectedTime, setSelectedTime] = useState(() => getFirstAvailableSlot(getTodayDateString()));
  const [bookingMode, setBookingMode] = useState('video');
  const [note, setNote] = useState('');
  
  // Checkout Multi-Step Wizard: 1: Main Details Page, 2: Dedicated OTP Page, 3: Dedicated Payment Page, 4: Dedicated Confirmation Page
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [phone, setPhone] = useState('9876543210');
  const [otpSent, setOtpSent] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [otpTimer, setOtpTimer] = useState(30);
  const [smsBannerNotification, setSmsBannerNotification] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isVerifyingPayment, setIsVerifyingPayment] = useState(false);
  const [paymentStepPhase, setPaymentStepPhase] = useState(1);
  const [paymentStatusMessage, setPaymentStatusMessage] = useState('');
  const [bookingPass, setBookingPass] = useState('');
  const [isPassCopied, setIsPassCopied] = useState(false);
  const [isVideoRoomOpen, setIsVideoRoomOpen] = useState(false);

  // Gallery Lightbox State
  const [selectedGalleryImage, setSelectedGalleryImage] = useState(null);

  // Toast Notification State
  const [toastAlert, setToastAlert] = useState(null);

  const showToast = (title, message, type = 'success') => {
    setToastAlert({ title, message, type });
    setTimeout(() => {
      setToastAlert(null);
    }, 5000);
  };

  // Countdown timer for OTP resend
  useEffect(() => {
    let interval;
    if (otpSent && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpSent, otpTimer]);

  const handleServiceSelect = (service) => {
    setSelectedService(service);
  };

  const handleSendOtp = (e) => {
    if (e) e.preventDefault();
    if (!phone || phone.length < 10) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }
    setIsSendingOtp(true);
    setSmsBannerNotification(false);
    showToast('📡 Connecting Telecom Gateway...', `Dispatching secure OTP SMS to +91 ${phone}...`, 'info');

    setTimeout(() => {
      setIsSendingOtp(false);
      setOtpSent(true);
      setSmsBannerNotification(true);
      setOtpTimer(30);
      setOtpInput('');
      showToast('📩 OTP Delivered!', `SMS verification code sent to +91 ${phone}: 4820`, 'success');
    }, 1200);
  };

  const handleVerifyOtp = (e) => {
    if (e) e.preventDefault();
    if (otpInput === '4820' || otpInput.length === 4) {
      setIsVerifyingOtp(true);
      showToast('🔐 Verifying Token...', 'Validating one-time password with telecom auth node...', 'info');

      setTimeout(() => {
        setIsVerifyingOtp(false);
        setOtpVerified(true);
        setCheckoutStep(3); // Move to Dedicated Payment Page
        showToast('✅ Mobile Verified!', `+91 ${phone} authenticated. Proceeding to Secure Payment Gateway.`, 'success');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 950);
    } else {
      alert('Invalid OTP. Please enter 4820.');
    }
  };

  const handleProcessPayment = (e) => {
    if (e) e.preventDefault();
    setIsVerifyingPayment(true);
    setPaymentStepPhase(1);
    setPaymentStatusMessage('Connecting to Secure Banking & UPI Gateway (256-Bit SSL)...');
    showToast('💳 Payment Processing...', `Initiating transaction of ₹${selectedService.fee} via ${paymentMethod.toUpperCase()}`, 'info');

    setTimeout(() => {
      setPaymentStepPhase(2);
      setPaymentStatusMessage('Authorizing transaction with Reserve Bank of India & UPI Switch...');
    }, 1200);

    setTimeout(() => {
      setPaymentStepPhase(3);
      setPaymentStatusMessage(`Payment of ₹${selectedService.fee} Authorized! Provisioning encrypted consultation room pass...`);
    }, 2300);

    setTimeout(() => {
      setIsVerifyingPayment(false);
      const passCode = `PRV-COUNSEL-${Math.floor(100000 + Math.random() * 900000)}`;
      setBookingPass(passCode);

      const newBooking = {
        id: `bk_${Date.now()}`,
        passCode,
        counselorName: counselor.name,
        counselorAvatar: counselor.avatar,
        serviceTitle: lang === 'hi' ? selectedService.titleHi : selectedService.titleEn,
        fee: selectedService.fee,
        date: selectedDate,
        time: selectedTime,
        mode: bookingMode,
        status: 'Upcoming',
        hoursUntilSession: 24,
        meetingLink: `https://parvarish.app/room/${passCode}`
      };

      if (saveBookingFn) {
        saveBookingFn(newBooking);
      }
      setCheckoutStep(4); // Move to Dedicated Confirmation Page
      showToast('🎉 Booking Confirmed!', `Appointment confirmed with ${counselor.name}. Pass Code: ${passCode}`, 'success');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 3300);
  };

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-200 max-w-full overflow-x-hidden relative min-h-screen">
      
      {/* FLOATING TOAST NOTIFICATION POPUP */}
      {toastAlert && (
        <div className="fixed top-20 right-4 sm:right-6 z-[9999] max-w-md w-[90vw] sm:w-auto bg-white text-slate-900 p-4 rounded-2xl shadow-xl border-2 border-emerald-100 flex items-center space-x-3 animate-in slide-in-from-top-5 duration-200">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 text-xl font-bold">
            {toastAlert.type === 'success' ? '🎉' : '📩'}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-black text-emerald-800">{toastAlert.title}</div>
            <div className="text-xs text-slate-600 font-medium leading-tight">{toastAlert.message}</div>
          </div>
          <button onClick={() => setToastAlert(null)} className="text-slate-400 hover:text-slate-600 text-xs p-1 font-bold">
            ✕
          </button>
        </div>
      )}

      {/* SEPARATE PAGE 2: DEDICATED OTP AUTHENTICATION PAGE */}
      {checkoutStep === 2 && (
        <div className="max-w-2xl mx-auto space-y-6 py-6 animate-in zoom-in-95 duration-200">
          
          <button
            onClick={() => setCheckoutStep(1)}
            className="flex items-center space-x-2 text-xs font-extrabold text-emerald-800 hover:text-emerald-900 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-200 shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Date & Slot Selection</span>
          </button>

          <div className="glass-card p-6 sm:p-10 rounded-3xl bg-white border-emerald-200/80 shadow-xl space-y-6">
            
            <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-900">Mobile OTP Authentication</h2>
                  <p className="text-xs text-slate-500">Step 2 of 4 • Phone Verification</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black">Step 2 of 4</span>
            </div>

            {/* SLEEK 3-ITEM ORDER SUMMARY CARD */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-50/90 via-teal-50/90 to-amber-50/90 border border-emerald-200 space-y-3">
              <div className="text-xs font-extrabold text-emerald-900 uppercase tracking-wider flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Selected Appointment Summary</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-2.5 rounded-xl bg-white/80 border border-slate-200/60 space-y-0.5">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Specialist</div>
                  <div className="font-bold text-slate-900 truncate">{counselor.name}</div>
                </div>

                <div className="p-2.5 rounded-xl bg-white/80 border border-slate-200/60 space-y-0.5 sm:col-span-2">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Selected Package</div>
                  <div className="font-bold text-teal-800 truncate">{lang === 'hi' ? selectedService.titleHi : selectedService.titleEn}</div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1 text-slate-700 font-semibold border-t border-emerald-200/60">
                <span>Scheduled Timing: <strong className="text-slate-900">{selectedDate} at {selectedTime}</strong></span>
                <span className="font-black text-emerald-800 text-sm">₹{selectedService.fee}</span>
              </div>
            </div>

            {!otpSent ? (
              <div className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Mobile Phone Number</label>
                  <div className="relative">
                    <span className="absolute left-4 top-3 text-xs font-bold text-slate-500">+91</span>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-14 pr-4 py-3 rounded-2xl border border-slate-200 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  disabled={isSendingOtp}
                  onClick={handleSendOtp}
                  className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-md cursor-pointer active:scale-95 transition-all flex items-center justify-center space-x-2 disabled:opacity-75"
                >
                  {isSendingOtp ? (
                    <span className="flex items-center space-x-2">
                      <RefreshCw className="w-4 h-4 animate-spin text-white" />
                      <span>Connecting to Telecom Gateway...</span>
                    </span>
                  ) : (
                    <span>SEND SECURITY OTP SMS</span>
                  )}
                </button>
              </div>
            ) : (
              <div className="space-y-4 pt-2">
                
                {/* INCOMING SMS PUSH NOTIFICATION SIMULATION */}
                {smsBannerNotification && (
                  <div className="p-3.5 rounded-2xl bg-gradient-to-r from-indigo-50 via-white to-purple-50 text-slate-900 border-2 border-indigo-200/90 shadow-md flex items-center justify-between gap-3 animate-in slide-in-from-top-3 duration-300">
                    <div className="flex items-center space-x-3 overflow-hidden">
                      <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm flex-shrink-0">
                        💬
                      </div>
                      <div className="overflow-hidden">
                        <div className="text-[10px] font-black text-indigo-800 uppercase tracking-wider flex items-center space-x-1.5">
                          <span>Incoming SMS</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                          <span className="text-slate-400 font-mono">AX-PARVARISH</span>
                        </div>
                        <div className="text-xs text-slate-700 truncate">
                          Verification Code is <strong className="font-mono text-indigo-700 font-black text-sm">4820</strong>. Valid 10m.
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setOtpInput('4820')}
                      className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs flex-shrink-0 cursor-pointer shadow-sm transition-all"
                    >
                      Auto-fill
                    </button>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Enter 4-Digit Security OTP</label>
                  <input
                    type="text"
                    required
                    maxLength={4}
                    value={otpInput}
                    onChange={(e) => setOtpInput(e.target.value)}
                    placeholder="Enter 4820"
                    className="w-full text-center tracking-widest font-mono text-2xl font-black py-3.5 rounded-2xl border border-slate-200 text-slate-900 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-1">
                  <span>Didn't receive SMS?</span>
                  {otpTimer > 0 ? (
                    <span className="text-slate-400 font-mono font-bold">Resend code in {otpTimer}s</span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      className="text-emerald-700 font-bold hover:underline cursor-pointer"
                    >
                      Resend OTP
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  disabled={isVerifyingOtp}
                  onClick={handleVerifyOtp}
                  className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-md cursor-pointer active:scale-95 transition-all flex items-center justify-center space-x-2 disabled:opacity-75"
                >
                  {isVerifyingOtp ? (
                    <span className="flex items-center space-x-2">
                      <RefreshCw className="w-4 h-4 animate-spin text-white" />
                      <span>Validating Security Token...</span>
                    </span>
                  ) : (
                    <>
                      <span>Verify OTP & Continue to Payment</span>
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* SEPARATE PAGE 3: DEDICATED SECURE PAYMENT GATEWAY PAGE */}
      {checkoutStep === 3 && (
        <div className="max-w-2xl mx-auto space-y-6 py-6 animate-in zoom-in-95 duration-200">
          
          <button
            onClick={() => setCheckoutStep(2)}
            className="flex items-center space-x-2 text-xs font-extrabold text-emerald-800 hover:text-emerald-900 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-200 shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Phone Verification</span>
          </button>

          <div className="glass-card p-6 sm:p-10 rounded-3xl bg-white border-teal-200/80 shadow-xl space-y-6">
            
            {/* Header with SSL Badge */}
            <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-md">
                  <Lock className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-900">Secure Payment Gateway</h2>
                  <p className="text-xs text-slate-500">Step 3 of 4 • 256-Bit SSL Encrypted</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black">Step 3 of 4</span>
            </div>

            {/* REALISTIC MULTI-PHASE PAYMENT PROCESSING OVERLAY - SUPER LIGHT */}
            {isVerifyingPayment && (
              <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-50/90 via-white to-purple-50/90 text-slate-900 border-2 border-indigo-200/90 shadow-xl space-y-4 animate-in fade-in duration-300">
                <div className="flex items-center space-x-3">
                  <RefreshCw className="w-6 h-6 text-indigo-600 animate-spin flex-shrink-0" />
                  <div>
                    <div className="text-sm font-black text-slate-900">Authorizing Secure Payment</div>
                    <div className="text-xs text-indigo-700 font-bold">{paymentStatusMessage}</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 rounded-full bg-indigo-100 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-600 to-teal-500 transition-all duration-700"
                    style={{ width: paymentStepPhase === 1 ? '35%' : paymentStepPhase === 2 ? '75%' : '100%' }}
                  />
                </div>

                <div className="grid grid-cols-3 gap-2 text-[10px] text-center font-bold">
                  <div className={paymentStepPhase >= 1 ? 'text-indigo-800 font-black' : 'text-slate-400'}>
                    1. Bank SSL Handshake
                  </div>
                  <div className={paymentStepPhase >= 2 ? 'text-indigo-800 font-black' : 'text-slate-400'}>
                    2. RBI / UPI Authorization
                  </div>
                  <div className={paymentStepPhase >= 3 ? 'text-teal-700 font-black' : 'text-slate-400'}>
                    3. Consultation Pass Ready
                  </div>
                </div>
              </div>
            )}

            {/* ITEMIZED EXECUTIVE BILL CARD - SUPER LIGHT CLEAN WELLNESS THEME */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-[#FAF8FF] via-[#F6F2FF] to-[#FAF8FF] text-slate-900 border-2 border-indigo-100 shadow-[0_8px_30px_rgb(91,72,214,0.06)] space-y-4">
              <div className="flex items-center justify-between border-b border-indigo-100 pb-3">
                <span className="text-xs font-black text-indigo-900 uppercase tracking-wider flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-indigo-600" />
                  <span>Checkout Order Summary</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black border border-emerald-200">
                  Verified Checkout
                </span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between items-center text-slate-600">
                  <span>Specialist Doctor:</span>
                  <strong className="text-slate-900 font-black">{counselor.name}</strong>
                </div>

                <div className="flex justify-between items-center text-slate-600">
                  <span>Package Selected:</span>
                  <strong className="text-indigo-700 font-bold max-w-[240px] truncate text-right">{lang === 'hi' ? selectedService.titleHi : selectedService.titleEn}</strong>
                </div>

                <div className="flex justify-between items-center text-slate-600">
                  <span>Scheduled Timing:</span>
                  <strong className="text-slate-900 font-bold">{selectedDate} at {selectedTime}</strong>
                </div>

                <div className="flex justify-between items-center text-slate-600">
                  <span>Platform & Processing Fee:</span>
                  <strong className="text-emerald-700 font-bold">Free (₹0)</strong>
                </div>
              </div>

              <div className="pt-3 border-t border-indigo-100 flex justify-between items-center text-sm font-black">
                <span className="text-slate-900 font-black">Total Amount Payable:</span>
                <span className="text-indigo-700 text-xl font-black">₹{selectedService.fee}</span>
              </div>
            </div>

            {/* PAYMENT METHOD SELECTOR GRID */}
            <div className="space-y-3 pt-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Choose Payment Method</label>
              
              <div className="space-y-2.5 text-xs font-bold">
                {/* Option 1: Instant UPI */}
                <div
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-4 rounded-2xl cursor-pointer border flex items-center justify-between transition-all ${
                    paymentMethod === 'upi' 
                      ? 'bg-emerald-50/90 border-emerald-500 text-emerald-950 shadow-md ring-2 ring-emerald-500/30' 
                      : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-lg font-bold">
                      💳
                    </div>
                    <div>
                      <div className="text-xs font-black text-slate-900">Instant UPI (GPay / PhonePe / Paytm)</div>
                      <div className="text-[10px] text-slate-500 font-medium">Fast 1-tap mobile payment</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-800 bg-white px-2.5 py-1 rounded-lg border border-emerald-200">
                    parvarish@upi
                  </span>
                </div>

                {/* Option 2: Credit / Debit Card */}
                <div
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-2xl cursor-pointer border flex items-center justify-between transition-all ${
                    paymentMethod === 'card' 
                      ? 'bg-emerald-50/90 border-emerald-500 text-emerald-950 shadow-md ring-2 ring-emerald-500/30' 
                      : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center text-lg font-bold">
                      🔒
                    </div>
                    <div>
                      <div className="text-xs font-black text-slate-900">Credit / Debit Card</div>
                      <div className="text-[10px] text-slate-500 font-medium">Visa, Mastercard, RuPay, Amex</div>
                    </div>
                  </div>
                  <span className="text-xs text-slate-400 font-semibold">Instant Credit</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              disabled={isVerifyingPayment}
              onClick={handleProcessPayment}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-xs uppercase tracking-wider shadow-xl flex items-center justify-center space-x-2 cursor-pointer active:scale-95 transition-all disabled:opacity-70"
            >
              {isVerifyingPayment ? (
                <span className="flex items-center space-x-2">
                  <RefreshCw className="w-5 h-5 animate-spin text-white" />
                  <span>Processing Payment with Bank Gateway...</span>
                </span>
              ) : (
                <span>Pay ₹{selectedService.fee} & Confirm Appointment</span>
              )}
            </button>

          </div>
        </div>
      )}

      {/* SEPARATE PAGE 4: DEDICATED BOOKING CONFIRMED PAGE */}
      {checkoutStep === 4 && (
        <div className="max-w-xl mx-auto space-y-6 py-6 animate-in zoom-in-95 duration-200 text-center">
          
          <div className="glass-card p-6 sm:p-10 rounded-3xl bg-white border-emerald-200/80 shadow-2xl space-y-6">
            
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl font-black text-slate-900">Session Booking Confirmed!</h2>
              <p className="text-xs text-slate-500">Order Complete • Consultation Room Provisioned</p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-left text-xs space-y-3">
              <div className="flex items-center justify-between text-slate-600 border-b border-emerald-200/60 pb-2">
                <span>Pass Code:</span>
                <div className="flex items-center space-x-2">
                  <span className="font-mono font-black text-emerald-800 text-base">{bookingPass}</span>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(bookingPass);
                      setIsPassCopied(true);
                      setTimeout(() => setIsPassCopied(false), 2000);
                    }}
                    className="text-[11px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold hover:bg-emerald-200"
                  >
                    {isPassCopied ? '✓ Copied' : 'Copy'}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between text-slate-700">
                <span>Specialist:</span>
                <span className="font-bold text-slate-900">{counselor.name}</span>
              </div>
              <div className="flex items-center justify-between text-slate-700">
                <span>Scheduled Slot:</span>
                <span className="font-bold text-slate-900">{selectedDate} at {selectedTime}</span>
              </div>
              <div className="flex items-center justify-between text-slate-700">
                <span>Session Fee Paid:</span>
                <span className="font-bold text-emerald-800">₹{selectedService.fee} (Paid via {paymentMethod.toUpperCase()})</span>
              </div>
            </div>

            {/* PRIMARY LIVE VIDEO CALL TEST ACTION */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={() => setIsVideoRoomOpen(true)}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-xl flex items-center justify-center space-x-2 cursor-pointer active:scale-95 transition-all"
              >
                <Video className="w-5 h-5 text-emerald-200 animate-pulse" />
                <span>🎥 Launch Live Video Consultation (Test Call Now)</span>
              </button>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => window.open('/specialist', '_blank')}
                  className="py-3 px-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold cursor-pointer transition-all truncate"
                >
                  🚀 Open Doctor Portal
                </button>

                <button
                  type="button"
                  onClick={onBookingComplete}
                  className="py-3 px-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold cursor-pointer transition-all truncate"
                >
                  📋 View My Bookings
                </button>
              </div>

              <button
                type="button"
                onClick={onBackToDirectory}
                className="w-full py-2.5 rounded-xl text-slate-500 hover:text-slate-800 font-semibold text-xs cursor-pointer"
              >
                Return to Counselor Directory
              </button>
            </div>

          </div>

        </div>
      )}

      {/* PAGE 1: MAIN COUNSELOR PROFILE DETAILS & SLOT SELECTION */}
      {checkoutStep === 1 && (
        <>
          {/* Back Button */}
          <button
            onClick={onBackToDirectory}
            className="flex items-center space-x-2 text-xs font-extrabold text-emerald-800 hover:text-emerald-900 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-200 shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t('backToDirectory')}</span>
          </button>

          {/* COUNSELOR HEADER BANNER */}
          <div className="glass-card p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-50 via-teal-50 to-amber-50 border border-emerald-200/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <img
                src={counselor.avatar}
                alt={counselor.name}
                className="w-24 h-24 rounded-3xl object-cover border-2 border-emerald-400 shadow-md flex-shrink-0"
              />
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900">{counselor.name}</h1>
                  <span className="px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-[11px] font-extrabold flex items-center space-x-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>RCI/MCI Verified</span>
                  </span>
                </div>

                <p className="text-xs sm:text-sm font-bold text-teal-800">
                  {lang === 'hi' ? counselor.roleHi : counselor.roleEn}
                </p>

                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 font-medium">
                  <span className="flex items-center space-x-1 text-amber-600 font-bold">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span>{counselor.rating} ({counselor.reviewsCount} reviews)</span>
                  </span>
                  <span>•</span>
                  <span>{counselor.experience} Clinical Experience</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center min-w-[220px] w-full md:w-auto space-y-1">
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Selected Package Fee</div>
              <div className="text-2xl font-black text-emerald-800">₹{selectedService.fee}</div>
              <div className="text-[10px] text-emerald-600 font-semibold">{selectedService.duration} • 100% Secure</div>
            </div>

          </div>

          {/* MAIN TWO COLUMN LAYOUT */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* LEFT COLUMN: MULTI-SERVICES & CLINIC GALLERY */}
            <div className="lg:col-span-2 space-y-8">
              
              <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-4 border-slate-200 bg-white shadow-xs">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center space-x-2 border-b border-slate-100 pb-3">
                  <DollarSign className="w-5 h-5 text-emerald-600" />
                  <span>{t('selectServiceHeading')}</span>
                </h3>

                <div className="space-y-3">
                  {COUNSELOR_SERVICES.map((serv) => {
                    const isSelected = selectedService.id === serv.id;
                    return (
                      <div
                        key={serv.id}
                        onClick={() => handleServiceSelect(serv)}
                        className={`p-4 rounded-2xl cursor-pointer border transition-all space-y-1.5 ${
                          isSelected ? 'bg-emerald-50/90 border-emerald-500 shadow-md' : 'bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-emerald-600 bg-emerald-600' : 'border-slate-300'}`}>
                              {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </span>
                            <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                              {lang === 'hi' ? serv.titleHi : serv.titleEn}
                            </h4>
                          </div>

                          <div className="text-right">
                            <span className="text-xs font-black text-emerald-800">₹{serv.fee}</span>
                            <span className="block text-[10px] text-slate-400">{serv.duration}</span>
                          </div>
                        </div>

                        <p className="text-xs text-slate-600 pl-6 leading-relaxed">
                          {lang === 'hi' ? serv.descHi : serv.descEn}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* CLINICAL PRACTICE & FACILITY GALLERY */}
              <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-4 border-slate-200 bg-white shadow-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center space-x-2">
                    <Camera className="w-5 h-5 text-emerald-600" />
                    <span>Clinic & Consultation Facility Preview</span>
                  </h3>
                  <span className="text-xs text-slate-400 font-semibold">4 Verified Photos</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {DEFAULT_CLINIC_GALLERY.map((img, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedGalleryImage(img)}
                      className="group relative rounded-2xl overflow-hidden cursor-pointer aspect-4/3 border border-slate-200 shadow-xs hover:border-emerald-500 transition-all"
                    >
                      <img
                        src={img.url}
                        alt={img.caption}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity p-2 flex items-end">
                        <span className="text-[10px] font-bold text-white line-clamp-1">{img.caption}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: STEP 1 WIZARD CARD */}
            <div id="booking-widget" className="glass-card p-6 sm:p-8 rounded-3xl space-y-6 border-emerald-200/80 bg-white shadow-md scroll-mt-24">
              
              <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-emerald-600" />
                    <span>Book Session</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Fee: <strong className="text-emerald-800">₹{selectedService.fee}</strong>
                  </p>
                </div>
                
                {/* Step Indicators */}
                <div className="flex items-center space-x-1 text-[10px] font-bold">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white">Step 1</span>
                </div>
              </div>

              <div className="space-y-5 animate-in fade-in">
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">1. Medium</label>
                  <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                    <button
                      type="button"
                      onClick={() => setBookingMode('chat')}
                      className={`p-2.5 rounded-2xl border transition-all flex items-center space-x-2 ${bookingMode === 'chat' ? 'bg-amber-100 border-amber-500 text-amber-900' : 'bg-slate-50 border-slate-200'}`}
                    >
                      <MessageSquare className="w-4 h-4 text-amber-600" />
                      <span>Live Chat</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setBookingMode('call')}
                      className={`p-2.5 rounded-2xl border transition-all flex items-center space-x-2 ${bookingMode === 'call' ? 'bg-teal-100 border-teal-500 text-teal-900' : 'bg-slate-50 border-slate-200'}`}
                    >
                      <Phone className="w-4 h-4 text-teal-600" />
                      <span>Voice Call</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setBookingMode('video')}
                      className={`p-2.5 rounded-2xl border transition-all flex items-center space-x-2 ${bookingMode === 'video' ? 'bg-emerald-100 border-emerald-500 text-emerald-900' : 'bg-slate-50 border-slate-200'}`}
                    >
                      <Video className="w-4 h-4 text-emerald-600" />
                      <span>HD Video</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setBookingMode('inperson')}
                      className={`p-2.5 rounded-2xl border transition-all flex items-center space-x-2 ${bookingMode === 'inperson' ? 'bg-purple-100 border-purple-500 text-purple-900' : 'bg-slate-50 border-slate-200'}`}
                    >
                      <Calendar className="w-4 h-4 text-purple-600" />
                      <span>Clinic Visit</span>
                    </button>
                  </div>
                </div>

                {/* Date & Time Slot breakdown */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">2. Date & Time Slot</label>
                  <input
                    type="date"
                    min={getTodayDateString()}
                    value={selectedDate}
                    onChange={(e) => {
                      setSelectedDate(e.target.value);
                      setSelectedTime(getFirstAvailableSlot(e.target.value));
                    }}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 mb-2 focus:outline-none focus:ring-2 focus:ring-[#5b48d6]"
                  />

                  <div className="space-y-2">
                    {TIME_SLOTS_BY_PERIOD.map((group) => {
                      const PeriodIcon = group.icon;
                      return (
                        <div key={group.period} className={`p-2.5 rounded-2xl border ${group.bgColor} space-y-1.5`}>
                          <div className="flex items-center space-x-1 text-[11px] font-extrabold text-slate-800">
                            <PeriodIcon className={`w-3.5 h-3.5 ${group.iconColor}`} />
                            <span>{group.period}</span>
                          </div>

                          <div className="grid grid-cols-3 gap-1.5">
                            {group.slots.map((slot) => {
                              const isPast = isSlotInPast(selectedDate, slot);
                              const isSelected = selectedTime === slot && !isPast;

                              return (
                                <button
                                  key={slot}
                                  type="button"
                                  disabled={isPast}
                                  onClick={() => !isPast && setSelectedTime(slot)}
                                  className={`py-1.5 px-1 rounded-xl text-[11px] transition-all text-center border font-semibold ${
                                    isPast 
                                      ? 'opacity-40 bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed line-through' 
                                      : isSelected 
                                        ? 'bg-emerald-600 text-white font-black border-emerald-600 shadow-xs'
                                        : 'bg-white hover:border-emerald-400 border-slate-200 text-slate-800'
                                  }`}
                                >
                                  {slot}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => { setCheckoutStep(2); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-md active:scale-95 transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>Proceed to Mobile OTP Authentication</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        </>
      )}

      {/* GALLERY LIGHTBOX EXPAND MODAL */}
      {selectedGalleryImage && (
        <div className="fixed inset-0 z-[10000] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-3xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 space-y-3 animate-in zoom-in-95">
            <div className="p-4 flex items-center justify-between border-b border-slate-800">
              <span className="text-xs font-extrabold text-white">{selectedGalleryImage.caption}</span>
              <button onClick={() => setSelectedGalleryImage(null)} className="p-1 rounded-full text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="max-h-[70vh] flex items-center justify-center overflow-hidden p-2">
              <img
                src={selectedGalleryImage.url}
                alt={selectedGalleryImage.caption}
                className="max-h-[65vh] w-auto object-contain rounded-2xl shadow-md"
              />
            </div>
          </div>
        </div>
      )}

      {/* Video Call Room Modal */}
      <VideoCallRoomModal
        isOpen={isVideoRoomOpen}
        onClose={() => setIsVideoRoomOpen(false)}
        passCode={bookingPass || 'PRV-COUNSEL-948201'}
        counselorName={counselor.name}
      />

    </div>
  );
}
