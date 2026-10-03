import React from 'react';
import { 
  Heart, 
  ShieldCheck, 
  PhoneCall, 
  Sparkles, 
  Lock, 
  MapPin, 
  Mail, 
  Phone, 
  Clock, 
  Info, 
  ArrowRight,
  ShieldAlert,
  CreditCard,
  CheckCircle2,
  Youtube,
  Instagram,
  Linkedin,
  Facebook,
  Twitter,
  MessageCircle
} from 'lucide-react';

export default function Footer({ setActiveTab }) {
  return (
    <footer className="w-full bg-[#f6f1ff] text-[#1a1540] pt-12 pb-10 border-t border-[#E4DFF7] shadow-[0_-1px_12px_rgba(91,72,214,0.03)] mt-12 md:mt-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8">
        
        {/* Top Disclaimer Banner - Enhanced Font Size & Clarity */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E4DFF7] shadow-xs flex items-start sm:items-center gap-3.5">
          <Info className="w-5 h-5 text-[#5b48d6] flex-shrink-0 mt-0.5 sm:mt-0" />
          <p className="text-sm text-[#4E4A70] leading-relaxed">
            <strong className="text-[#1A1540]">Medical Disclaimer:</strong> We are a specialized child developmental and psychological guidance network, not an emergency medical facility or acute suicide helpline. If you or your child are experiencing severe acute distress, please immediately dial Tele-MANAS (<a href="tel:14416" className="text-[#5b48d6] font-bold hover:underline">14416</a>), Childline (<a href="tel:1098" className="text-rose-600 font-bold hover:underline">1098</a>), or emergency services (<a href="tel:112" className="text-[#1A1540] font-bold hover:underline">112</a>).
          </p>
        </div>

        {/* 4 Columns Main Grid with Increased Font Sizes & Legibility */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 py-2">
          
          {/* Col 1: Brand, Overview & Social Media (Span 4) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div 
              className="flex items-center space-x-2.5 cursor-pointer self-start" 
              onClick={() => setActiveTab && setActiveTab('home')}
            >
              <img 
                alt="Parentcraft India Logo" 
                className="h-9 w-auto object-contain" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyVVYb08Y0ZEtV7XOLRDspc2OvrH6etB22FmUsxiiswS2fZ13HBqAVFHxtEm6bwvTj7mp5S-mfqDZMVDSoPp3SzRWr5mOHnI-ealcY-Y9mNVjvpzksZyRg4UwinWs4PmkYG2-F3wTGlSGM9Z8Yho1jMI4huEW8YLops_8xDzBfR_ySW-HQtkxqCDCAlsChLA6C8Hk4afF2HB91uirPyIs2SqobJCUiEoER6A0qEdPKiLe2HgsxHRzibw" 
              />
              <div>
                <span className="text-xl font-bold text-[#2A2461] tracking-tight">Parentcraft India</span>
                <p className="text-xs text-[#5E5A80] font-semibold">Child Wellbeing & Psychology</p>
              </div>
            </div>

            <p className="text-sm text-[#4E4A70] leading-relaxed">
              Empowering parents of children aged 4–17 across India with verified child counsellors, psychologists, career guides, and evidence-backed developmental assessments.
            </p>

            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-[#126d55] text-xs font-bold border border-[#E4DFF7] shadow-xs self-start">
              <ShieldCheck className="w-4 h-4" />
              <span>RCI & MCI Guidelines Compliant</span>
            </div>

            {/* Social Media Icons */}
            <div className="pt-2">
              <span className="text-xs font-bold text-[#2A2461] uppercase tracking-wider block mb-2.5">
                Connect With Us
              </span>
              <div className="flex items-center gap-2.5 flex-wrap">
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  aria-label="YouTube" 
                  className="w-10 h-10 rounded-full bg-white border border-[#E4DFF7] text-[#c4302b] flex items-center justify-center hover:bg-[#c4302b] hover:text-white transition-all shadow-xs"
                >
                  <Youtube className="w-4.5 h-4.5" />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  aria-label="Instagram" 
                  className="w-10 h-10 rounded-full bg-white border border-[#E4DFF7] text-[#e1306c] flex items-center justify-center hover:bg-[#e1306c] hover:text-white transition-all shadow-xs"
                >
                  <Instagram className="w-4.5 h-4.5" />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  aria-label="LinkedIn" 
                  className="w-10 h-10 rounded-full bg-white border border-[#E4DFF7] text-[#0077b5] flex items-center justify-center hover:bg-[#0077b5] hover:text-white transition-all shadow-xs"
                >
                  <Linkedin className="w-4.5 h-4.5" />
                </a>
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  aria-label="Facebook" 
                  className="w-10 h-10 rounded-full bg-white border border-[#E4DFF7] text-[#1877f2] flex items-center justify-center hover:bg-[#1877f2] hover:text-white transition-all shadow-xs"
                >
                  <Facebook className="w-4.5 h-4.5" />
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  aria-label="Twitter / X" 
                  className="w-10 h-10 rounded-full bg-white border border-[#E4DFF7] text-[#1da1f2] flex items-center justify-center hover:bg-[#1da1f2] hover:text-white transition-all shadow-xs"
                >
                  <Twitter className="w-4.5 h-4.5" />
                </a>
                <a 
                  href="https://whatsapp.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  aria-label="WhatsApp Community" 
                  className="w-10 h-10 rounded-full bg-white border border-[#E4DFF7] text-[#25d366] flex items-center justify-center hover:bg-[#25d366] hover:text-white transition-all shadow-xs"
                >
                  <MessageCircle className="w-4.5 h-4.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Registered Office & Contact Details (Span 3) */}
          <div className="lg:col-span-3 flex flex-col gap-3.5">
            <span className="text-sm font-bold uppercase tracking-wider text-[#2A2461]">
              Registered Office & Contact
            </span>
            
            <div className="text-sm text-[#4E4A70] space-y-3">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4.5 h-4.5 text-[#5b48d6] flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">64 Dhar Kothi, Residency Area, Indore, MP 452001, India</span>
              </div>
              
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4.5 h-4.5 text-[#126d55] flex-shrink-0" />
                <a href="tel:+919310831813" className="hover:text-[#5b48d6] font-bold text-base text-[#1A1540] transition-colors">
                  +91-9310831813
                </a>
              </div>
              
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4.5 h-4.5 text-[#FF8F7A] flex-shrink-0" />
                <a href="mailto:support@parentcraftindia.com" className="hover:text-[#5b48d6] font-semibold text-sm transition-colors break-all">
                  support@parentcraftindia.com
                </a>
              </div>

              <div className="flex items-center space-x-2.5 text-xs text-[#5E5A80]">
                <Clock className="w-4 h-4 text-[#5b48d6] flex-shrink-0" />
                <span>Mon – Sat, 9:00 AM – 7:00 PM IST</span>
              </div>
            </div>
          </div>

          {/* Col 3: Navigation & Guidance (Span 2) */}
          <div className="lg:col-span-2 flex flex-col gap-3.5">
            <span className="text-sm font-bold uppercase tracking-wider text-[#2A2461]">
              Platform & Guidance
            </span>
            <ul className="space-y-2.5 text-sm text-[#4E4A70]">
              <li>
                <button 
                  type="button" 
                  onClick={() => setActiveTab && setActiveTab('book-counselor')} 
                  className="hover:text-[#5b48d6] font-medium transition-colors text-left cursor-pointer"
                >
                  Find an Expert Counsellor
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => setActiveTab && setActiveTab('common-problems')} 
                  className="hover:text-[#5b48d6] font-medium transition-colors text-left cursor-pointer"
                >
                  Common Concerns & Cards
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => setActiveTab && setActiveTab('specialist')} 
                  className="hover:text-[#5b48d6] font-medium transition-colors text-left cursor-pointer"
                >
                  For Child Psychologists
                </button>
              </li>
              <li>
                <a href="#screening-aid" className="hover:text-[#5b48d6] font-medium transition-colors">
                  5-Minute Screening Aid
                </a>
              </li>
              <li className="pt-1 flex items-center gap-1.5 text-xs text-[#126d55] font-semibold">
                <Lock className="w-3.5 h-3.5" />
                <span>DPDP Act 2023 Compliant</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Re-Designed National Crisis Helpline Dialogue (Span 3) */}
          <div className="lg:col-span-3 p-5 rounded-3xl bg-white border border-[#E4DFF7] shadow-sm flex flex-col gap-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-rose-600 font-bold text-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                <span>National Crisis Helplines</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 text-[10px] font-extrabold uppercase">
                24/7 Active
              </span>
            </div>
            
            <p className="text-xs text-[#5E5A80] leading-relaxed">
              Immediate, toll-free mental health & child protection helplines across India:
            </p>

            <div className="space-y-2 pt-1">
              
              {/* Tele-MANAS */}
              <div className="p-2.5 rounded-2xl bg-[#FAF8FF] border border-[#E4DFF7] flex items-center justify-between gap-2 hover:border-[#5B48D6] transition-colors">
                <div>
                  <span className="text-[11px] font-semibold text-[#5E5A80] block">Tele-MANAS (Mental Health)</span>
                  <span className="text-base font-black text-[#5B48D6]">14416</span>
                </div>
                <a 
                  href="tel:14416" 
                  className="px-3 py-1.5 rounded-xl bg-[#5B48D6] hover:bg-[#4B3AB8] text-white text-xs font-bold shadow-xs active:scale-95 transition-all flex items-center gap-1"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call</span>
                </a>
              </div>

              {/* Childline India */}
              <div className="p-2.5 rounded-2xl bg-[#FAF8FF] border border-[#E4DFF7] flex items-center justify-between gap-2 hover:border-rose-300 transition-colors">
                <div>
                  <span className="text-[11px] font-semibold text-[#5E5A80] block">Childline India (Under 18)</span>
                  <span className="text-base font-black text-rose-600">1098</span>
                </div>
                <a 
                  href="tel:1098" 
                  className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs active:scale-95 transition-all flex items-center gap-1"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call</span>
                </a>
              </div>

              {/* Emergency Services */}
              <div className="p-2.5 rounded-2xl bg-[#FAF8FF] border border-[#E4DFF7] flex items-center justify-between gap-2 hover:border-slate-400 transition-colors">
                <div>
                  <span className="text-[11px] font-semibold text-[#5E5A80] block">National Emergency Response</span>
                  <span className="text-base font-black text-slate-900">112</span>
                </div>
                <a 
                  href="tel:112" 
                  className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-xs active:scale-95 transition-all flex items-center gap-1"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call</span>
                </a>
              </div>

            </div>

            <div className="text-[11px] text-[#5E5A80] flex items-center gap-1.5 pt-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#126d55] flex-shrink-0" />
              <span>Free • Confidential • 20+ Languages</span>
            </div>
          </div>

        </div>

        {/* Safe & Secure Payment Gateway Trust Strip */}
        <div className="p-5 rounded-3xl bg-white border border-[#E4DFF7] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#BDEBDD]/40 text-[#00533f] flex items-center justify-center flex-shrink-0 shadow-xs border border-[#BDEBDD]">
              <ShieldCheck className="w-6 h-6 text-[#126D55]" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <Lock className="w-4 h-4 text-[#126D55]" />
                <h4 className="font-bold text-base text-[#1A1540]">
                  Safe & Secure Payment Gateway — Pay Online with Complete Confidence
                </h4>
                <span className="px-2 py-0.5 rounded-full bg-[#BDEBDD] text-[#00533f] text-xs font-bold">
                  PCI-DSS Level 1 Compliant
                </span>
              </div>
              <p className="text-sm text-[#4E4A70] mt-1 leading-relaxed">
                All transactions are protected with bank-grade <strong>256-Bit SSL encryption</strong>. We accept all major Indian payment methods with instant confirmation and a <strong>100% refund guarantee</strong> on cancellations up to 4 hours prior.
              </p>
            </div>
          </div>

          {/* Payment Badges */}
          <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
            <span className="px-3.5 py-1.5 rounded-xl bg-[#FAF8FF] border border-[#E4DFF7] text-xs font-bold text-[#2A2461]">
              ⚡ UPI (GPay • PhonePe • Paytm)
            </span>
            <span className="px-3.5 py-1.5 rounded-xl bg-[#FAF8FF] border border-[#E4DFF7] text-xs font-bold text-[#2A2461]">
              💳 Credit & Debit Cards (Visa • Mastercard • RuPay)
            </span>
            <span className="px-3.5 py-1.5 rounded-xl bg-[#FAF8FF] border border-[#E4DFF7] text-xs font-bold text-[#2A2461]">
              🏛️ Net Banking (50+ Banks)
            </span>
          </div>
        </div>

        {/* Bottom Copyright & Compliance Strip */}
        <div className="pt-6 border-t border-[#E4DFF7] flex flex-col sm:flex-row items-center justify-between text-sm text-[#5E5A80] gap-3">
          <div>
            © {new Date().getFullYear()} Parentcraft India Wellness Pvt. Ltd. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <a href="#top" className="hover:text-[#5b48d6] transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#top" className="hover:text-[#5b48d6] transition-colors">Terms of Service</a>
            <span>•</span>
            <a href="#top" className="hover:text-[#5b48d6] transition-colors">Grievance Redressal</a>
            <span>•</span>
            <a href="#top" className="hover:text-[#5b48d6] transition-colors">Cancellation Policy</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
