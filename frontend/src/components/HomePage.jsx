import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Heart, 
  Brain, 
  MessageSquare, 
  Phone, 
  Video, 
  Calendar, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  BookOpen, 
  Users, 
  UserCheck, 
  Eye, 
  ShieldAlert, 
  Lock, 
  Star, 
  Sparkles, 
  Smile, 
  Check, 
  Clock, 
  ChevronRight, 
  ChevronDown, 
  X, 
  Lightbulb, 
  School, 
  HelpCircle,
  AlertCircle
} from 'lucide-react';

export default function HomePage({
  onNavToProblems,
  onNavToBookCounselor,
  onOpenCounselorChat,
  onNavToSpecialist
}) {
  const { language } = useLanguage();
  const isHi = language === 'hi';

  // Hero concern chip selection
  const [selectedChips, setSelectedChips] = useState(['exam']);
  const [selectedAge, setSelectedAge] = useState('8-12');

  const toggleChip = (id) => {
    if (selectedChips.includes(id)) {
      setSelectedChips(selectedChips.filter(c => c !== id));
    } else {
      setSelectedChips([...selectedChips, id]);
    }
  };

  // Mood Tracker State
  const [selectedMood, setSelectedMood] = useState('withdrawn');
  const moodTips = {
    happy: "Channel this positive energy into shared creative activities or heartfelt storytelling before bedtime.",
    calm: "An ideal window for discussing upcoming school deadlines or subtle social hurdles without triggering anxiety.",
    anxious: "Validate their worries with slow, unhurried listening. Avoid immediate problem-solving until they feel physically relaxed.",
    frustrated: "Step back from debate. Give them quiet physical space to breathe, and revisit the conversation when cortisol levels settle.",
    withdrawn: "When a child goes quiet after school, offer a warm snack without asking questions for the first 20 minutes. Giving decompression time reduces evening friction."
  };

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState(0);

  // Assessment Quiz State
  const [assessmentAnswer, setAssessmentAnswer] = useState('2-3-times');

  // Crisis Helpline Modal State
  const [isCrisisOpen, setIsCrisisOpen] = useState(false);

  return (
    <div className="w-full bg-[#fcf8ff] text-[#1a1540] font-sans antialiased selection:bg-[#BDEBDD] selection:text-[#1a1540]">
      
      {/* =======================================================================
          SECTION 2: HERO SECTION WITH 5-SECOND FINDER & WARM ILLUSTRATION
          ======================================================================= */}
      <section className="relative w-full pt-6 pb-12 md:pt-12 md:pb-20 overflow-hidden bg-[#F7F5FF]">
        {/* Layered soft ambient glow */}
        <div className="absolute -top-24 right-0 w-[580px] h-[580px] rounded-full bg-gradient-to-br from-[#5b48d6]/10 via-[#eae5ff]/40 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-0 w-[420px] h-[420px] rounded-full bg-gradient-to-tr from-[#FF8F7A]/10 via-[#ffdea7]/30 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Copy & 5-Second Finder */}
          <div className="lg:col-span-7 flex flex-col gap-5 sm:gap-6">
            <div className="inline-flex items-center gap-2 self-start bg-white px-3.5 py-1.5 rounded-full shadow-[0_4px_16px_rgba(91,72,214,0.06)] border border-[#E4DFF7]">
              <span className="w-2 h-2 rounded-full bg-[#126d55] animate-pulse" />
              <span className="text-xs text-[#474554] font-semibold">
                {isHi ? 'भारत का समर्पित बाल एवं किशोर कल्याण नेटवर्क' : "India's Dedicated Child & Youth Wellbeing Network"}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-[#2A2461] tracking-tight leading-[1.15]">
              {isHi ? (
                <>अपने बच्चे को समझें। <br /><span className="text-[#5b48d6]">सही विशेषज्ञ चुनें।</span></>
              ) : (
                <>Understand your child. <br /><span className="text-[#5b48d6]">Find the right expert.</span></>
              )}
            </h1>

            <p className="text-base sm:text-lg text-[#5E5A80] leading-relaxed max-w-xl">
              {isHi 
                ? 'भारत भर के RCI व MCI प्रमाणित चाइल्ड काउंसलर, मनोवैज्ञानिक और करियर मार्गदर्शक, 4-17 वर्ष के बच्चों के लिए।'
                : 'Verified child counsellors, psychologists, and career guides across India, for children aged 4–17.'}
            </p>

            {/* The 5-Second Finder Card */}
            <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-[0_12px_36px_-6px_rgba(91,72,214,0.1)] border border-[#E4DFF7] flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm text-[#2A2461] font-bold tracking-wide flex items-center gap-1.5">
                  <Brain className="w-4 h-4 text-[#5b48d6]" />
                  <span>{isHi ? 'मुझे चिंता है…' : "I'm worried about…"}</span>
                </span>
                <span className="text-[11px] sm:text-xs text-[#5E5A80]">
                  {isHi ? 'एक या अधिक चुनें' : 'Tap to select one or more'}
                </span>
              </div>

              {/* Concern Pills */}
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'exam', label: isHi ? 'परीक्षा का तनाव' : 'Exam stress' },
                  { id: 'screen', label: isHi ? 'स्क्रीन टाइम' : 'Screen time' },
                  { id: 'school', label: isHi ? 'स्कूल का चुनाव' : 'Choosing a school' },
                  { id: 'behaviour', label: isHi ? 'गुस्सा व जिद' : 'Behaviour' },
                  { id: 'career', label: isHi ? 'करियर मार्गदर्शन' : 'Career' }
                ].map((chip) => {
                  const isActive = selectedChips.includes(chip.id);
                  return (
                    <button
                      key={chip.id}
                      type="button"
                      onClick={() => toggleChip(chip.id)}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#5b48d6] text-white shadow-sm'
                          : 'bg-[#f6f1ff] text-[#5E5A80] hover:bg-[#f0ebff] hover:text-[#1a1540]'
                      }`}
                    >
                      {isActive && <Check className="w-3.5 h-3.5" />}
                      <span>{chip.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Selector & CTA Row */}
              <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="relative flex-1">
                  <select
                    value={selectedAge}
                    onChange={(e) => setSelectedAge(e.target.value)}
                    className="w-full h-11 pl-4 pr-10 appearance-none rounded-xl bg-[#f6f1ff] text-sm text-[#1a1540] border border-[#E4DFF7] focus:outline-none focus:ring-2 focus:ring-[#5b48d6] cursor-pointer"
                  >
                    <option value="4-7">{isHi ? 'उम्र 4–7 (शुरुआती वर्ष)' : 'Age 4–7 (Early years)'}</option>
                    <option value="8-12">{isHi ? 'उम्र 8–12 (मध्य बचपन)' : 'Age 8–12 (Middle childhood)'}</option>
                    <option value="13-17">{isHi ? 'उम्र 13–17 (किशोर व बोर्ड परीक्षा)' : 'Age 13–17 (Teens & Board exams)'}</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#5E5A80] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                <button
                  type="button"
                  onClick={onNavToBookCounselor}
                  className="inline-flex items-center justify-center h-11 px-7 rounded-xl bg-[#ffc247] text-[#3A2600] font-bold text-sm shadow-[0_8px_20px_-2px_rgba(255,194,71,0.4)] hover:bg-[#f9bd42] active:scale-95 transition-all text-center cursor-pointer"
                >
                  {isHi ? 'विशेषज्ञ खोजें' : 'Find experts'}
                </button>
              </div>

              <div className="pt-1 flex items-center justify-between flex-wrap gap-2 text-[#5E5A80] text-xs">
                <button
                  type="button"
                  onClick={onNavToProblems}
                  className="inline-flex items-center gap-1 text-[#5b48d6] hover:underline font-semibold cursor-pointer"
                >
                  <span>{isHi ? 'या 5 मिनट का निःशुल्क मूल्यांकन लें' : 'Or take a free 5-minute assessment'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <span className="flex items-center gap-1 text-[#126d55] font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{isHi ? 'तत्काल अपॉइंटमेंट उपलब्ध' : 'Instant appointments available'}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Quality Authentic Counselling Hero Visual */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full max-w-[480px] rounded-3xl overflow-hidden shadow-[0_20px_50px_-10px_rgba(91,72,214,0.22)] border-2 border-[#E4DFF7] bg-white group">
              {/* Photo with subtle hover zoom */}
              <div className="relative aspect-[4/3.7] w-full overflow-hidden">
                <img
                  src="/images/counselling_hero_family.jpg"
                  alt="Child and Family Counselling Session"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {/* Gentle gradient overlay for badges readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1540]/60 via-transparent to-black/10 pointer-events-none" />

                {/* Floating Top-Left: Verified RCI Badge */}
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.12)] border border-[#E4DFF7]">
                  <ShieldCheck className="w-4 h-4 text-[#126d55]" />
                  <span className="text-xs text-[#1a1540] font-bold">RCI Certified Specialists</span>
                </div>

                {/* Floating Top-Right: Today Slots Live Pulse */}
                <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.12)] border border-[#E4DFF7]">
                  <span className="w-2 h-2 rounded-full bg-[#126d55] animate-ping" />
                  <span className="text-[11px] text-[#126d55] font-extrabold tracking-wide">SLOTS TODAY</span>
                </div>

                {/* Floating Bottom Card: Rating & Confidentiality Glass Banner */}
                <div className="absolute bottom-4 inset-x-4 bg-white/95 backdrop-blur-md rounded-2xl p-3 border border-[#E4DFF7] shadow-[0_12px_28px_rgba(0,0,0,0.15)] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-[#1A1540]">4.9/5</span>
                    <span className="text-[11px] text-[#5E5A80] hidden sm:inline">(2,400+ Families)</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-bold text-[#5B48D6]">
                    <Lock className="w-3.5 h-3.5" />
                    <span>100% Private</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Organic Gentle Wavy Bottom Transition Divider */}
        <div className="w-full mt-8 md:mt-12 text-white">
          <svg className="w-full h-8 md:h-12 block" fill="none" preserveAspectRatio="none" viewBox="0 0 1440 64" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,32 C320,64 640,0 960,32 C1200,56 1360,16 1440,32 L1440,64 L0,64 Z" fill="#FFFFFF" />
          </svg>
        </div>
      </section>

      {/* =======================================================================
          SECTION 3: TRUST STRIP (4 CLEAN CARDS)
          ======================================================================= */}
      <section className="w-full bg-white py-8 border-b border-[#E4DFF7]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            
            <div className="p-5 rounded-2xl bg-white border border-[#E4DFF7] shadow-[0_8px_24px_-4px_rgba(91,72,214,0.04)] hover:shadow-md transition-all flex flex-col gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#BDEBDD]/50 flex items-center justify-center text-[#00533f]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-[#2A2461]">Verified experts</h3>
              <p className="text-xs text-[#5E5A80] leading-relaxed">
                RCI registered psychologists and certified counsellors with credential verification.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#E4DFF7] shadow-[0_8px_24px_-4px_rgba(91,72,214,0.04)] hover:shadow-md transition-all flex flex-col gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#e4dfff]/60 flex items-center justify-center text-[#5b48d6]">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-[#2A2461]">Private by design</h3>
              <p className="text-xs text-[#5E5A80] leading-relaxed">
                Confidential 1-on-1 audio/video sessions; no records or notes shared with schools.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#E4DFF7] shadow-[0_8px_24px_-4px_rgba(91,72,214,0.04)] hover:shadow-md transition-all flex flex-col gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#ffdea7]/60 flex items-center justify-center text-[#7c5800]">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-[#2A2461]">Clear pricing</h3>
              <p className="text-xs text-[#5E5A80] leading-relaxed">
                Direct session fees from ₹500 to ₹900 with zero hidden platform booking charges.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#E4DFF7] shadow-[0_8px_24px_-4px_rgba(91,72,214,0.04)] hover:shadow-md transition-all flex flex-col gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#FF8F7A]/25 flex items-center justify-center text-[#c2410c]">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-[#2A2461]">Easy cancellation</h3>
              <p className="text-xs text-[#5E5A80] leading-relaxed">
                100% refund on cancellations up to 4 hours before the scheduled appointment.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* =======================================================================
          SECTION 4: SCROLLING TOPIC TICKER (MARQUEE)
          ======================================================================= */}
      <section className="w-full bg-[#f0ebff]/40 py-3 overflow-hidden border-b border-[#E4DFF7]">
        <div className="relative w-full flex items-center overflow-x-hidden">
          <div className="flex items-center gap-3 whitespace-nowrap animate-ticker">
            {[
              { text: 'Exam Pressure', color: 'bg-[#5b48d6]' },
              { text: 'Screen Addiction', color: 'bg-[#FF8F7A]' },
              { text: 'School Transition', color: 'bg-[#ffc247]' },
              { text: 'Tantrums & Meltdowns', color: 'bg-[#126d55]' },
              { text: 'Stream Selection (Science / Commerce / Arts)', color: 'bg-[#5b48d6]' },
              { text: 'Sibling Rivalry', color: 'bg-[#FF8F7A]' },
              { text: 'Bullying & Social Anxiety', color: 'bg-[#126d55]' },
              { text: 'ADHD & Focus Support', color: 'bg-[#ffc247]' },
              { text: 'Board Exam Readiness', color: 'bg-[#5b48d6]' }
            ].map((topic, i) => (
              <span key={i} className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white text-[#474554] text-xs font-semibold shadow-xs border border-[#E4DFF7]">
                <span className={`w-1.5 h-1.5 rounded-full ${topic.color}`} />
                {topic.text}
              </span>
            ))}
            {/* Seamless loop */}
            {[
              { text: 'Exam Pressure', color: 'bg-[#5b48d6]' },
              { text: 'Screen Addiction', color: 'bg-[#FF8F7A]' },
              { text: 'School Transition', color: 'bg-[#ffc247]' },
              { text: 'Tantrums & Meltdowns', color: 'bg-[#126d55]' },
              { text: 'Stream Selection (Science / Commerce / Arts)', color: 'bg-[#5b48d6]' }
            ].map((topic, i) => (
              <span key={`dup-${i}`} className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white text-[#474554] text-xs font-semibold shadow-xs border border-[#E4DFF7]">
                <span className={`w-1.5 h-1.5 rounded-full ${topic.color}`} />
                {topic.text}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* =======================================================================
          SECTION 5: "START WITH WHAT YOU'RE FACING" (8 CONCERN CARDS)
          ======================================================================= */}
      <section className="w-full bg-white py-12 md:py-20 border-b border-[#E4DFF7]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-12 flex flex-col gap-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#5b48d6] uppercase tracking-wider">Specialized Guidance</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2A2461] mt-1">Start with what you're facing</h2>
            </div>
            <p className="text-sm text-[#5E5A80] max-w-md leading-relaxed">
              Explore thoughtful pathways designed around the genuine developmental milestones of Indian homes.
            </p>
          </div>

          {/* Featured Clinical Modalities Dual Hero Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Modality 1: Child Play Therapy */}
            <div className="group rounded-3xl bg-gradient-to-br from-[#FAF8FF] to-white border-2 border-[#E4DFF7] overflow-hidden shadow-[0_12px_36px_-6px_rgba(91,72,214,0.08)] hover:shadow-[0_20px_48px_-8px_rgba(91,72,214,0.18)] transition-all flex flex-col sm:flex-row">
              <div className="sm:w-2/5 relative overflow-hidden aspect-[4/3] sm:aspect-auto">
                <img
                  src="/images/child_play_therapy.jpg"
                  alt="Early Childhood Play Therapy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#00533f] text-[11px] font-bold shadow-sm border border-[#E4DFF7]">
                  Ages 2–9
                </span>
              </div>
              <div className="sm:w-3/5 p-6 flex flex-col justify-between gap-3">
                <div>
                  <span className="text-[11px] font-bold text-[#5B48D6] uppercase tracking-wider">Play Therapy & Milestones</span>
                  <h3 className="text-lg font-bold text-[#2A2461] mt-0.5 group-hover:text-[#5B48D6] transition-colors">
                    Early Behavioral & Sensory Support
                  </h3>
                  <p className="text-xs text-[#5E5A80] mt-1.5 leading-relaxed">
                    Gentle guidance for speech delays, tantrums, social anxiety, and early Autism/ADHD screening in a playful, nurturing setting.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onNavToBookCounselor}
                  className="self-start inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#126D55] text-white text-xs font-bold shadow-xs hover:bg-[#0E5442] active:scale-95 transition-all cursor-pointer"
                >
                  <span>Book Child Specialist</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Modality 2: Adolescent & Career Guidance */}
            <div className="group rounded-3xl bg-gradient-to-br from-[#FAF8FF] to-white border-2 border-[#E4DFF7] overflow-hidden shadow-[0_12px_36px_-6px_rgba(91,72,214,0.08)] hover:shadow-[0_20px_48px_-8px_rgba(91,72,214,0.18)] transition-all flex flex-col sm:flex-row">
              <div className="sm:w-2/5 relative overflow-hidden aspect-[4/3] sm:aspect-auto">
                <img
                  src="/images/teen_career_counselling.jpg"
                  alt="Teen Academic and Career Counselling"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#7C5800] text-[11px] font-bold shadow-sm border border-[#E4DFF7]">
                  Ages 10–18
                </span>
              </div>
              <div className="sm:w-3/5 p-6 flex flex-col justify-between gap-3">
                <div>
                  <span className="text-[11px] font-bold text-[#5B48D6] uppercase tracking-wider">Adolescents & High School</span>
                  <h3 className="text-lg font-bold text-[#2A2461] mt-0.5 group-hover:text-[#5B48D6] transition-colors">
                    Exam Stress & Career Direction
                  </h3>
                  <p className="text-xs text-[#5E5A80] mt-1.5 leading-relaxed">
                    Personalized counselling for 10th/12th board pressure, Science vs Commerce clarity, screen habits, and teen confidence.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onNavToBookCounselor}
                  className="self-start inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#5B48D6] text-white text-xs font-bold shadow-xs hover:bg-[#4B3AB8] active:scale-95 transition-all cursor-pointer"
                >
                  <span>Book Teen Counsellor</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { id: 'school', title: 'Choosing a school', desc: 'Finding an environment where your child thrives?', icon: '🏫', bg: 'bg-[#BDEBDD]/50', color: 'text-[#00533f]' },
              { id: 'exam', title: 'Exam & coaching stress', desc: 'Overwhelmed by marks, tests, or competitive prep?', icon: '📚', bg: 'bg-[#FF8F7A]/25', color: 'text-[#c2410c]' },
              { id: 'screen', title: 'Screens and gaming', desc: 'Constant battles over phones, tablets, or bedtime?', icon: '📱', bg: 'bg-[#ffdea7]/60', color: 'text-[#7c5800]' },
              { id: 'behaviour', title: 'Anger and behaviour', desc: 'Struggling to manage sudden outbursts or withdrawal?', icon: '🌦️', bg: 'bg-[#e4dfff]/60', color: 'text-[#5b48d6]' },
              { id: 'career', title: 'Career direction', desc: 'Confused between streams, degrees, and modern careers?', icon: '🧭', bg: 'bg-[#ffdea7]/60', color: 'text-[#7c5800]' },
              { id: 'bullying', title: 'Friends and bullying', desc: 'Worried about isolation, peer pressure, or teasing at school?', icon: '🤝', bg: 'bg-[#e4dfff]/60', color: 'text-[#5b48d6]' },
              { id: 'focus', title: 'Focus and learning', desc: 'Noticing reading delays, handwriting hurdles, or ADHD traits?', icon: '💡', bg: 'bg-[#BDEBDD]/50', color: 'text-[#00533f]' },
              { id: 'parenting', title: 'Parenting together', desc: 'Differing parenting styles or navigating separation as co-parents?', icon: '🏡', bg: 'bg-[#FF8F7A]/25', color: 'text-[#c2410c]' }
            ].map((card) => (
              <button
                key={card.id}
                type="button"
                onClick={onNavToBookCounselor}
                className="group p-5 rounded-3xl bg-[#f6f1ff]/50 hover:bg-white border border-[#E4DFF7] hover:shadow-[0_12px_32px_-4px_rgba(91,72,214,0.12)] transition-all flex flex-col gap-3 text-left cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-2xl ${card.bg} flex items-center justify-center text-2xl`}>
                  {card.icon}
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#2A2461] group-hover:text-[#5b48d6] transition-colors">{card.title}</h3>
                  <p className="text-xs text-[#5E5A80] mt-1 leading-relaxed">{card.desc}</p>
                </div>
                <span className="mt-auto inline-flex items-center gap-1 text-xs text-[#5b48d6] font-bold group-hover:translate-x-1 transition-transform">
                  Browse specialists <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* =======================================================================
          SECTION 6: "HOW IT WORKS" (3 STEPS DASHED LINE)
          ======================================================================= */}
      <section className="w-full bg-[#F7F5FF] py-12 md:py-20 border-b border-[#E4DFF7]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-12 flex flex-col gap-12">
          
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-bold text-[#5b48d6] uppercase tracking-wider">Effortless Journey</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2A2461] mt-1">How it works</h2>
            <p className="text-sm text-[#5E5A80] mt-2">Compassionate, step-by-step guidance tailored for your household.</p>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Step 1 */}
            <div className="relative z-10 flex flex-col items-center text-center gap-3 bg-white p-7 rounded-3xl shadow-[0_8px_24px_-4px_rgba(91,72,214,0.06)] border border-[#E4DFF7]">
              <div className="w-14 h-14 rounded-full bg-[#5b48d6] text-white flex items-center justify-center font-bold text-lg shadow-sm">
                1
              </div>
              <h3 className="font-bold text-base sm:text-lg text-[#2A2461]">Tell us your concern</h3>
              <p className="text-xs sm:text-sm text-[#5E5A80] leading-relaxed">
                Pick your child's age group and the challenge you're navigating at home or school.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative z-10 flex flex-col items-center text-center gap-3 bg-white p-7 rounded-3xl shadow-[0_8px_24px_-4px_rgba(91,72,214,0.06)] border border-[#E4DFF7]">
              <div className="w-14 h-14 rounded-full bg-[#ffc247] text-[#3A2600] flex items-center justify-center font-bold text-lg shadow-sm">
                2
              </div>
              <h3 className="font-bold text-base sm:text-lg text-[#2A2461]">Meet matched experts</h3>
              <p className="text-xs sm:text-sm text-[#5E5A80] leading-relaxed">
                Browse verified profiles with transparent fees, regional languages, and instant slots.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative z-10 flex flex-col items-center text-center gap-3 bg-white p-7 rounded-3xl shadow-[0_8px_24px_-4px_rgba(91,72,214,0.06)] border border-[#E4DFF7]">
              <div className="w-14 h-14 rounded-full bg-[#126d55] text-white flex items-center justify-center font-bold text-lg shadow-sm">
                3
              </div>
              <h3 className="font-bold text-base sm:text-lg text-[#2A2461]">Talk and get a plan</h3>
              <p className="text-xs sm:text-sm text-[#5E5A80] leading-relaxed">
                Join a secure video or clinic session and receive practical family next-steps without jargon.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* =======================================================================
          SECTION 7: MOOD CHECK WIDGET (INTERACTIVE EMOTIONAL CHECK-IN)
          ======================================================================= */}
      <section className="w-full bg-white py-12 md:py-16 border-b border-[#E4DFF7]">
        <div className="max-w-[960px] mx-auto px-4 sm:px-6 md:px-12">
          <div className="bg-[#f6f1ff]/70 rounded-3xl p-6 sm:p-10 border border-[#E4DFF7] shadow-[0_12px_36px_-6px_rgba(91,72,214,0.06)] flex flex-col gap-6 text-center items-center">
            
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-white text-[#5b48d6] text-xs font-bold mb-2 shadow-xs border border-[#E4DFF7]">
                Daily Emotional Check-in
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#2A2461]">How is your child feeling today?</h2>
              <p className="text-xs sm:text-sm text-[#5E5A80] mt-1 max-w-lg">
                A quick pulse check for parents to tune into subtle emotional cues and body language.
              </p>
            </div>

            {/* 5 Illustrated Face Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 w-full">
              {[
                { key: 'happy', emoji: '😊', label: 'Happy & Energetic' },
                { key: 'calm', emoji: '😌', label: 'Calm & Settled' },
                { key: 'anxious', emoji: '😟', label: 'Anxious / Restless' },
                { key: 'frustrated', emoji: '😤', label: 'Frustrated / Angry' },
                { key: 'withdrawn', emoji: '🤐', label: 'Quiet & Withdrawn' }
              ].map((m) => (
                <button
                  key={m.key}
                  type="button"
                  onClick={() => setSelectedMood(m.key)}
                  className={`flex flex-col items-center p-3.5 rounded-2xl transition-all cursor-pointer border ${
                    selectedMood === m.key
                      ? 'bg-white border-[#5b48d6] ring-2 ring-[#5b48d6]/30 shadow-md scale-105'
                      : 'bg-white hover:bg-[#eae5ff] border-[#E4DFF7] shadow-xs'
                  }`}
                >
                  <span className="text-3xl sm:text-4xl transition-transform hover:scale-110">{m.emoji}</span>
                  <span className="text-xs text-[#2A2461] mt-2 font-bold">{m.label}</span>
                </button>
              ))}
            </div>

            {/* Gentle parenting tip card */}
            <div className="w-full bg-white p-4 sm:p-5 rounded-2xl border border-[#E4DFF7] shadow-xs flex items-start gap-3.5 text-left">
              <div className="w-9 h-9 rounded-full bg-[#ffdea7]/60 flex-shrink-0 flex items-center justify-center text-[#7c5800]">
                <Lightbulb className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#2A2461]">Gentle parenting tip:</p>
                <p className="text-xs sm:text-sm text-[#5E5A80] mt-0.5 leading-relaxed">
                  {moodTips[selectedMood]}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =======================================================================
          SECTION 8: EXPERT CARDS (3-COLUMN VERIFIED PRACTITIONERS)
          ======================================================================= */}
      <section className="w-full bg-[#F7F5FF] py-12 md:py-20 border-b border-[#E4DFF7]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-12 flex flex-col gap-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#5b48d6] uppercase tracking-wider">Verified Network</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2A2461] mt-1">Talk to experienced practitioners</h2>
            </div>
            <button
              type="button"
              onClick={onNavToBookCounselor}
              className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#5b48d6] hover:underline cursor-pointer"
            >
              <span>View all counsellors across India</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Profile 1 */}
            <div className="bg-white rounded-3xl p-6 shadow-[0_8px_24px_-4px_rgba(91,72,214,0.06)] border border-[#E4DFF7] hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-start gap-4">
                  <img
                    className="w-16 h-16 rounded-2xl object-cover shadow-sm bg-[#f0ebff]"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuATan8Q1Q8zGdWmJ808UIqonRNzo2voXIjrjCxopKKW0eSA7ol6iUAvNk8P-RoWaaHavNQ6fmS-ntefxIq0GgzcqRuNt8sNP8-a2oo63d8TuHvE3jrNFOGyRvzHVPD0z8754yVRnmCJ3YbYv-U5si8-vavGkqjyYf656-FF8516AZD9Mpa_ht85ilnx9M6chvUwZSarn6Mhag3foB_1YrtNCnHcZtiOlpYirz1kLq5lyDwzYljL9WHT2Q"
                    alt="Dr. Ananya Sen"
                  />
                  <div>
                    <h3 className="font-bold text-base text-[#2A2461]">Dr. Ananya Sen, PhD</h3>
                    <p className="text-xs text-[#5E5A80]">Child & Adolescent Psychologist</p>
                    <div className="inline-flex items-center gap-1 mt-1 text-[#126d55] text-xs font-bold">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Credentials verified (RCI)</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E4DFF7] flex flex-wrap gap-2 text-xs">
                  <span className="px-2.5 py-1 rounded-full bg-[#f6f1ff] text-[#5E5A80] font-medium">12 yrs exp</span>
                  <span className="px-2.5 py-1 rounded-full bg-[#f6f1ff] text-[#5E5A80] font-medium">English, Hindi, Bengali</span>
                </div>

                <div className="mt-3 p-3 rounded-xl bg-[#f6f1ff]/70 flex items-center justify-between text-xs">
                  <span className="text-[#5E5A80]">Next available</span>
                  <span className="text-[#2A2461] font-bold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#126d55] animate-ping" />
                    Today, 5:30 PM (Video)
                  </span>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-[#E4DFF7] flex items-center justify-between">
                <div>
                  <span className="text-xl font-black text-[#2A2461]">₹850</span>
                  <span className="text-xs text-[#5E5A80]"> / 45 min</span>
                </div>
                <button
                  type="button"
                  onClick={onNavToBookCounselor}
                  className="px-6 py-2 rounded-full bg-[#ffc247] text-[#3A2600] font-bold text-xs shadow-sm hover:bg-[#f9bd42] active:scale-95 transition-all cursor-pointer"
                >
                  Book
                </button>
              </div>
            </div>

            {/* Profile 2 */}
            <div className="bg-white rounded-3xl p-6 shadow-[0_8px_24px_-4px_rgba(91,72,214,0.06)] border border-[#E4DFF7] hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-start gap-4">
                  <img
                    className="w-16 h-16 rounded-2xl object-cover shadow-sm bg-[#f0ebff]"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzLVNLYGDoubDYelYry6HOzUDKLb33qx6YgAmXivpYjN6qrsTLpu_jVEPk2gUM9mTlUmnkEiFa-IksqxgW6rHFLrHZlk8Gtb_3MpNkeEFURfutyAUzjc1aRZWZCRKabQRdV4dg-swQjVfccETr3t29Pi3faEQ6c7anEYo3CCvtMmFcJqZLCVOo21g6NeOGv3cTh-S6fKER_awz-9OWk7Ixu2pP1aK2Ufnxm-fZ1Jph4iF34yXP8hzw9g"
                    alt="Rajesh Kulkarni"
                  />
                  <div>
                    <h3 className="font-bold text-base text-[#2A2461]">Rajesh Kulkarni, M.Phil</h3>
                    <p className="text-xs text-[#5E5A80]">School Counsellor & Career Guide</p>
                    <div className="inline-flex items-center gap-1 mt-1 text-[#126d55] text-xs font-bold">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Credentials verified</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E4DFF7] flex flex-wrap gap-2 text-xs">
                  <span className="px-2.5 py-1 rounded-full bg-[#f6f1ff] text-[#5E5A80] font-medium">9 yrs exp</span>
                  <span className="px-2.5 py-1 rounded-full bg-[#f6f1ff] text-[#5E5A80] font-medium">English, Hindi, Marathi</span>
                </div>

                <div className="mt-3 p-3 rounded-xl bg-[#f6f1ff]/70 flex items-center justify-between text-xs">
                  <span className="text-[#5E5A80]">Next available</span>
                  <span className="text-[#2A2461] font-bold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#126d55] animate-ping" />
                    Tomorrow, 11:00 AM
                  </span>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-[#E4DFF7] flex items-center justify-between">
                <div>
                  <span className="text-xl font-black text-[#2A2461]">₹650</span>
                  <span className="text-xs text-[#5E5A80]"> / 45 min</span>
                </div>
                <button
                  type="button"
                  onClick={onNavToBookCounselor}
                  className="px-6 py-2 rounded-full bg-[#ffc247] text-[#3A2600] font-bold text-xs shadow-sm hover:bg-[#f9bd42] active:scale-95 transition-all cursor-pointer"
                >
                  Book
                </button>
              </div>
            </div>

            {/* Profile 3 */}
            <div className="bg-white rounded-3xl p-6 shadow-[0_8px_24px_-4px_rgba(91,72,214,0.06)] border border-[#E4DFF7] hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-start gap-4">
                  <img
                    className="w-16 h-16 rounded-2xl object-cover shadow-sm bg-[#f0ebff]"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBO71wllUx5Mmcr09zkEYBqGxyl-mbhNwWrd-1j21qfIDfZBCQb5tXudhrgv5BIhQs9FmttzF-365vUfkj1INUnNdeq-W6taEM9zkeer5kZVP4_kGVwY49gYcG70c-RMKpLDA6pDUstWEOxonYJ0VyGH8BLoB8xk0YOh2TbtgCx5ylqQfWPqktczB4tlobmOmwIjiqsm0xAgjmHIcPSnWDzDjdy3FbrQ-i0yiyJuk7UtAsKn4dnvHzemg"
                    alt="Meera Krishnan"
                  />
                  <div>
                    <h3 className="font-bold text-base text-[#2A2461]">Meera Krishnan, MSc</h3>
                    <p className="text-xs text-[#5E5A80]">Behavioural Therapist & Special Educator</p>
                    <div className="inline-flex items-center gap-1 mt-1 text-[#126d55] text-xs font-bold">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Credentials verified</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E4DFF7] flex flex-wrap gap-2 text-xs">
                  <span className="px-2.5 py-1 rounded-full bg-[#f6f1ff] text-[#5E5A80] font-medium">7 yrs exp</span>
                  <span className="px-2.5 py-1 rounded-full bg-[#f6f1ff] text-[#5E5A80] font-medium">English, Tamil, Hindi</span>
                </div>

                <div className="mt-3 p-3 rounded-xl bg-[#f6f1ff]/70 flex items-center justify-between text-xs">
                  <span className="text-[#5E5A80]">Next available</span>
                  <span className="text-[#2A2461] font-bold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#126d55] animate-ping" />
                    Tomorrow, 4:00 PM (Video)
                  </span>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-[#E4DFF7] flex items-center justify-between">
                <div>
                  <span className="text-xl font-black text-[#2A2461]">₹700</span>
                  <span className="text-xs text-[#5E5A80]"> / 45 min</span>
                </div>
                <button
                  type="button"
                  onClick={onNavToBookCounselor}
                  className="px-6 py-2 rounded-full bg-[#ffc247] text-[#3A2600] font-bold text-xs shadow-sm hover:bg-[#f9bd42] active:scale-95 transition-all cursor-pointer"
                >
                  Book
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =======================================================================
          SECTION 9: PARENT STORIES (3 QUOTE CARDS)
          ======================================================================= */}
      <section className="w-full bg-white py-12 md:py-20 border-b border-[#E4DFF7]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-12 flex flex-col gap-10">
          
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-bold text-[#5b48d6] uppercase tracking-wider">Family Experiences</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2A2461] mt-1">Real journeys, peaceful homes</h2>
            <p className="text-sm text-[#5E5A80] mt-2">Transparent insights from families who walked this path.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-[#f6f1ff]/50 rounded-3xl p-6 sm:p-7 flex flex-col justify-between border border-[#E4DFF7] shadow-xs">
              <div className="flex flex-col gap-3">
                <span className="text-3xl text-[#5b48d6] opacity-60">“</span>
                <p className="text-xs sm:text-sm text-[#1a1540] italic leading-relaxed">
                  "We were having daily fights about phone use after Class 8. In just two sessions, Dr. Sen helped us set a realistic family screen agreement without yelling."
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-[#E4DFF7] flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#BDEBDD] text-[#00533f] flex items-center justify-center font-bold text-xs">P</div>
                <div>
                  <p className="text-xs font-bold text-[#2A2461]">Parent of a 14-year-old</p>
                  <p className="text-[11px] text-[#5E5A80]">Bengaluru</p>
                </div>
              </div>
            </div>

            <div className="bg-[#f6f1ff]/50 rounded-3xl p-6 sm:p-7 flex flex-col justify-between border border-[#E4DFF7] shadow-xs">
              <div className="flex flex-col gap-3">
                <span className="text-3xl text-[#5b48d6] opacity-60">“</span>
                <p className="text-xs sm:text-sm text-[#1a1540] italic leading-relaxed">
                  "Helped our 10-year-old cope with relocation and changing schools. It gave our son the tools to express his anxieties instead of acting out in class."
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-[#E4DFF7] flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#ffdea7] text-[#7c5800] flex items-center justify-center font-bold text-xs">M</div>
                <div>
                  <p className="text-xs font-bold text-[#2A2461]">Mother of 5th grader</p>
                  <p className="text-[11px] text-[#5E5A80]">Pune</p>
                </div>
              </div>
            </div>

            <div className="bg-[#f6f1ff]/50 rounded-3xl p-6 sm:p-7 flex flex-col justify-between border border-[#E4DFF7] shadow-xs">
              <div className="flex flex-col gap-3">
                <span className="text-3xl text-[#5b48d6] opacity-60">“</span>
                <p className="text-xs sm:text-sm text-[#1a1540] italic leading-relaxed">
                  "The career aptitude guidance gave my daughter absolute clarity on choosing Humanities without guilt. She feels energized and focused for Class 11."
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-[#E4DFF7] flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#e4dfff] text-[#5b48d6] flex items-center justify-center font-bold text-xs">F</div>
                <div>
                  <p className="text-xs font-bold text-[#2A2461]">Father of 16-year-old</p>
                  <p className="text-[11px] text-[#5E5A80]">Delhi NCR</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =======================================================================
          SECTION 10: SELF-ASSESSMENT PREVIEW & VIRTUAL CONSULTATION SHOWCASE
          ======================================================================= */}
      <section className="w-full bg-[#F7F5FF] py-12 md:py-20 border-b border-[#E4DFF7]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Column: Virtual Tele-Consultation Visual Showcase */}
            <div className="lg:col-span-5 rounded-3xl bg-white border border-[#E4DFF7] shadow-[0_12px_36px_-6px_rgba(91,72,214,0.08)] overflow-hidden flex flex-col justify-between">
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <img
                  src="/images/online_video_counselling.jpg"
                  alt="Online Video Counselling Consultation"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1540]/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#5B48D6] text-xs font-bold shadow-sm border border-[#E4DFF7]">
                  <Video className="w-3.5 h-3.5" />
                  <span>Online Tele-Consultations</span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-xs font-bold">1-on-1 Confidential Video Support</p>
                  <p className="text-[11px] text-white/80">From your home couch with zero clinic commute</p>
                </div>
              </div>

              <div className="p-6 flex flex-col justify-between flex-1 gap-4">
                <div className="space-y-2.5">
                  <h3 className="font-bold text-base text-[#2A2461]">Speak with a child psychologist this week</h3>
                  <div className="space-y-2 text-xs text-[#5E5A80]">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#126D55] flex-shrink-0" />
                      <span>Encrypted, browser-based video calls (No software to download)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#126D55] flex-shrink-0" />
                      <span>Flexible timings: 8:00 AM to 10:00 PM including weekends</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#126D55] flex-shrink-0" />
                      <span>Actionable developmental plan & home routine after session</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onNavToBookCounselor}
                  className="w-full py-3 rounded-full bg-[#ffc247] hover:bg-[#f9bd42] text-[#3A2600] font-bold text-xs shadow-sm active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Video className="w-4 h-4" />
                  <span>Book Online Session (From ₹650)</span>
                </button>
              </div>
            </div>

            {/* Right Column: 5-Minute Screening Aid Card */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-[0_12px_36px_-6px_rgba(91,72,214,0.08)] border border-[#E4DFF7] flex flex-col justify-between gap-5">
              
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e4dfff]/60 text-[#5b48d6] text-xs font-bold">
                  <Brain className="w-3.5 h-3.5" />
                  Free 5-Minute Screening Aid
                </span>
                <span className="text-[11px] text-[#5E5A80]">Confidential • Instant Observation Summary</span>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="w-full bg-[#f6f1ff] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#5b48d6] h-full w-[25%] rounded-full transition-all" />
                </div>
                <span className="text-[11px] text-[#5E5A80] self-end font-semibold">Question 1 of 8</span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-[#2A2461] leading-snug">
                Over the past 2 weeks, how often has your child appeared irritable or distressed before school or tuition?
              </h3>

              {/* Interactive Radio Options */}
              <div className="flex flex-col gap-2.5 my-1">
                {[
                  { value: 'rarely', label: 'Rarely or never' },
                  { value: '2-3-times', label: '2–3 times a week' },
                  { value: 'almost-every-day', label: 'Almost every school morning' }
                ].map((opt) => (
                  <label 
                    key={opt.value}
                    className={`flex items-center gap-3.5 p-3.5 rounded-2xl transition-all cursor-pointer border ${
                      assessmentAnswer === opt.value
                        ? 'bg-[#f0ebff] border-[#5b48d6]'
                        : 'bg-[#f6f1ff]/60 hover:bg-[#eae5ff] border-[#E4DFF7]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="assessment-q1"
                      value={opt.value}
                      checked={assessmentAnswer === opt.value}
                      onChange={() => setAssessmentAnswer(opt.value)}
                      className="w-4 h-4 accent-[#5b48d6] cursor-pointer"
                    />
                    <span className="text-xs sm:text-sm text-[#1a1540] font-medium">{opt.label}</span>
                  </label>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={onNavToProblems}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-[#5b48d6] text-white font-bold text-xs sm:text-sm hover:bg-[#4F3DBD] transition-all shadow-md cursor-pointer"
                >
                  <span>Continue assessment (Takes 3 mins)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <span className="text-xs text-[#5E5A80] flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-[#126d55]" />
                  No registration required for preview
                </span>
              </div>

              {/* Mandatory Disclaimer */}
              <div className="mt-2 p-3.5 rounded-2xl bg-[#f6f1ff] text-[#5E5A80] flex items-start gap-2.5 border border-[#E4DFF7]">
                <AlertCircle className="w-4 h-4 text-[#5E5A80] flex-shrink-0 mt-0.5" />
                <p className="text-[11px] leading-relaxed">
                  <strong>Note:</strong> This assessment is an early screening aid designed to help parents observe patterns. It does not constitute a medical or clinical diagnosis.
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =======================================================================
          SECTION 11: UPCOMING WORKSHOPS (3 CARDS)
          ======================================================================= */}
      <section className="w-full bg-white py-12 md:py-20 border-b border-[#E4DFF7]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-12 flex flex-col gap-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#5b48d6] uppercase tracking-wider">Live Learning</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2A2461] mt-1">Upcoming parenting workshops</h2>
            </div>
            <p className="text-sm text-[#5E5A80] max-w-md">
              Practical group sessions led by senior Indian child psychologists and learning therapists.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-white rounded-3xl p-6 shadow-[0_8px_24px_-4px_rgba(91,72,214,0.06)] border border-[#E4DFF7] flex flex-col justify-between gap-5 hover:shadow-lg transition-all">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="px-3 py-1 rounded-xl bg-[#e4dfff]/60 text-xs font-bold text-[#5b48d6]">
                    SUN, 18 OCT
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#BDEBDD] text-[#00533f] text-xs font-bold">Free</span>
                </div>
                <h3 className="font-bold text-base text-[#2A2461] leading-snug">
                  De-escalating Tween Outbursts & Sibling Rivalry
                </h3>
                <div className="flex flex-col gap-1 text-[#5E5A80] text-xs">
                  <span className="flex items-center gap-1.5"><Video className="w-3.5 h-3.5" /> Online Interactive Webinar</span>
                  <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> Speaker: Dr. Radhika Nair</span>
                </div>
              </div>
              <button 
                type="button" 
                onClick={onNavToBookCounselor}
                className="w-full py-2.5 rounded-full bg-[#f6f1ff] hover:bg-[#eae5ff] text-[#2A2461] font-bold text-xs transition-all cursor-pointer"
              >
                Reserve seat
              </button>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-[0_8px_24px_-4px_rgba(91,72,214,0.06)] border border-[#E4DFF7] flex flex-col justify-between gap-5 hover:shadow-lg transition-all">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="px-3 py-1 rounded-xl bg-[#e4dfff]/60 text-xs font-bold text-[#5b48d6]">
                    SAT, 24 OCT
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#BDEBDD] text-[#00533f] text-xs font-bold">Free</span>
                </div>
                <h3 className="font-bold text-base text-[#2A2461] leading-snug">
                  Navigating Board Exam Pressure: A Parent's Playbook
                </h3>
                <div className="flex flex-col gap-1 text-[#5E5A80] text-xs">
                  <span className="flex items-center gap-1.5"><Video className="w-3.5 h-3.5" /> Online Live Q&A</span>
                  <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> Speaker: Rajesh Kulkarni</span>
                </div>
              </div>
              <button 
                type="button" 
                onClick={onNavToBookCounselor}
                className="w-full py-2.5 rounded-full bg-[#f6f1ff] hover:bg-[#eae5ff] text-[#2A2461] font-bold text-xs transition-all cursor-pointer"
              >
                Reserve seat
              </button>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-[0_8px_24px_-4px_rgba(91,72,214,0.06)] border border-[#E4DFF7] flex flex-col justify-between gap-5 hover:shadow-lg transition-all">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="px-3 py-1 rounded-xl bg-[#e4dfff]/60 text-xs font-bold text-[#5b48d6]">
                    SUN, 01 NOV
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#BDEBDD] text-[#00533f] text-xs font-bold">Free</span>
                </div>
                <h3 className="font-bold text-base text-[#2A2461] leading-snug">
                  Understanding Dyslexia & ADHD Signs in Primary School
                </h3>
                <div className="flex flex-col gap-1 text-[#5E5A80] text-xs">
                  <span className="flex items-center gap-1.5"><School className="w-3.5 h-3.5" /> Hybrid (Bengaluru & Zoom)</span>
                  <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> Speaker: Meera Krishnan</span>
                </div>
              </div>
              <button 
                type="button" 
                onClick={onNavToBookCounselor}
                className="w-full py-2.5 rounded-full bg-[#f6f1ff] hover:bg-[#eae5ff] text-[#2A2461] font-bold text-xs transition-all cursor-pointer"
              >
                Reserve seat
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* =======================================================================
          SECTION 12: PROFESSIONALS CALLOUT BAND (DEEP INDIGO)
          ======================================================================= */}
      <section className="w-full bg-[#2A2461] text-white py-12 md:py-20">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 flex flex-col gap-4">
            <span className="inline-flex items-center gap-2 self-start bg-white/10 px-3.5 py-1 rounded-full text-[#BDEBDD] text-xs font-semibold">
              <ShieldCheck className="w-4 h-4" />
              RCI Practitioners & Educators
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              Are you a qualified child counsellor, psychologist, or educator?
            </h2>
            <p className="text-sm sm:text-base text-white/80 max-w-2xl leading-relaxed">
              Join India's dedicated child wellbeing network. Gain access to verified parent inquiries, an automated appointment scheduler, and seamless event hosting with zero upfront listing fees.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 pt-2 text-xs text-white/90">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#BDEBDD]" />
                <span>Free listing with RCI & degree verification</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#BDEBDD]" />
                <span>Automated calendar sync & UPI settlements</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3 items-start lg:items-end">
            <button
              type="button"
              onClick={onNavToSpecialist}
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-[#ffc247] text-[#3A2600] font-bold text-sm shadow-[0_8px_24px_rgba(255,194,71,0.3)] hover:bg-[#f9bd42] active:scale-95 transition-all text-center cursor-pointer"
            >
              Join as a professional
            </button>
            <span className="text-xs text-[#BDEBDD] flex items-center gap-1">
              <span>RCI / MCI Guidelines Compliant</span>
            </span>
          </div>

        </div>
      </section>

      {/* =======================================================================
          SECTION 13: FREQUENTLY ASKED QUESTIONS (ACCORDION)
          ======================================================================= */}
      <section className="w-full bg-white py-12 md:py-20 border-b border-[#E4DFF7]">
        <div className="max-w-[840px] mx-auto px-4 sm:px-6 md:px-12 flex flex-col gap-8">
          
          <div className="text-center">
            <span className="text-xs font-bold text-[#5b48d6] uppercase tracking-wider">Common Queries</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#2A2461] mt-1">Frequently asked questions</h2>
          </div>

          <div className="flex flex-col gap-3">
            {[
              {
                q: "How do you verify the counsellors and psychologists on Parentcraft?",
                a: "Every practitioner submits their official RCI registration, educational degrees, and minimum clinical experience for manual verification before their profile is activated."
              },
              {
                q: "Can our sessions happen in regional Indian languages?",
                a: "Yes. You can filter experts by over 10 Indian languages including Hindi, Tamil, Telugu, Marathi, Bengali, Kannada, Malayalam, and Gujarati."
              },
              {
                q: "What happens if our child is uncomfortable during the first session?",
                a: "Counsellors use gentle rapport-building techniques. If you feel it's not the right match, our support team helps you rebook with another specialist at no extra charge."
              }
            ].map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className="rounded-2xl bg-[#f6f1ff]/60 border border-[#E4DFF7] overflow-hidden transition-all">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#2A2461] cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-[#5E5A80] transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#5b48d6]' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-0 text-xs sm:text-sm text-[#5E5A80] leading-relaxed border-t border-[#E4DFF7]/40 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* =======================================================================
          FLOATING DOCKED "NEED URGENT HELP?" BUTTON & CRISIS MODAL
          ======================================================================= */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          type="button"
          onClick={() => setIsCrisisOpen(true)}
          className="flex items-center gap-2 bg-white text-rose-600 border border-rose-200 shadow-[0_8px_24px_rgba(91,72,214,0.1)] px-4 py-2.5 rounded-full text-xs font-bold hover:bg-rose-50 active:scale-95 transition-all cursor-pointer"
        >
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
          <span>Need urgent help?</span>
        </button>
      </div>

      {/* Emergency Crisis Dialog */}
      {isCrisisOpen && (
        <div className="fixed inset-0 z-50 bg-[#15122E]/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-[#E4DFF7] space-y-5 relative animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between">
              <div>
                <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-bold uppercase tracking-wider">
                  24/7 Verified Helplines
                </span>
                <h3 className="text-xl font-bold text-[#2A2461] mt-1">Need urgent crisis help?</h3>
              </div>
              <button 
                type="button"
                onClick={() => setIsCrisisOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-[#5E5A80] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[#5E5A80] leading-relaxed">
              If a child or adult is in immediate danger or acute distress, call free 24/7 emergency services right away:
            </p>

            <div className="space-y-2.5">
              <div className="p-3.5 rounded-2xl bg-[#F7F5FF] border border-[#E4DFF7] flex items-center justify-between">
                <div>
                  <div className="text-xs text-[#5E5A80] font-semibold">Tele-MANAS (Govt. Mental Health Helpline)</div>
                  <div className="text-lg font-black text-[#5b48d6]">14416</div>
                </div>
                <a href="tel:14416" className="px-4 py-2 rounded-xl bg-[#5b48d6] text-white text-xs font-bold hover:bg-[#4F3DBD]">
                  Call
                </a>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F7F5FF] border border-[#E4DFF7] flex items-center justify-between">
                <div>
                  <div className="text-xs text-[#5E5A80] font-semibold">Childline India (Ministry of WCD)</div>
                  <div className="text-lg font-black text-rose-600">1098</div>
                </div>
                <a href="tel:1098" className="px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700">
                  Call
                </a>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F7F5FF] border border-[#E4DFF7] flex items-center justify-between">
                <div>
                  <div className="text-xs text-[#5E5A80] font-semibold">National Emergency Services</div>
                  <div className="text-lg font-black text-[#1a1540]">112</div>
                </div>
                <a href="tel:112" className="px-4 py-2 rounded-xl bg-[#1a1540] text-white text-xs font-bold hover:bg-black">
                  Call
                </a>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-[#5E5A80] text-center border-t border-slate-100">
              Parentcraft India provides psychological guidance and is not an emergency hospital or suicide prevention facility.
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
