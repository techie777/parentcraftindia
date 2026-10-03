import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Search, Filter, ShieldCheck, CheckCircle2, Star, MessageSquare, Phone, Video, Calendar, ArrowRight, MapPin, X, SlidersHorizontal } from 'lucide-react';

export const FULL_COUNSELOR_LIST = [
  {
    id: 'c_01',
    name: 'Dr. Ananya Roy',
    titleEn: 'Senior Pediatric Neurologist & Child Developmental Specialist',
    titleHi: 'वरिष्ठ बाल रोग विशेषज्ञ व न्यूरोलॉजिस्ट',
    specialtyEn: 'Pediatric Development',
    specialtyHi: 'बाल विकास व व्यवहार',
    hospital: 'Max Children Healthcare & Research Institute',
    experience: '14+ Years Exp.',
    experienceYears: 14,
    rating: '4.9 ★',
    reviewCount: 320,
    availableToday: true,
    modes: ['chat', 'call', 'video', 'inperson'],
    location: 'New Delhi & Online',
    fee: '₹800 / Session',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&auto=format&fit=crop&q=80',
    bioEn: 'Dr. Ananya Roy specializes in early child motor development, autism spectrum screening, speech milestones, and managing severe toddler meltdowns with evidence-based behavioral therapy.',
    bioHi: 'डॉ. अनन्या रॉय बच्चों के शुरुआती विकास, बोलने में देरी, ऑटिज्म स्क्रीनिंग और व्यवहार संबंधी चुनौतियों के इलाज में 14 वर्षों से अधिक का अनुभव रखती हैं।',
    reviews: [
      { author: 'Priya S.', rating: '5 ★', textEn: 'Dr. Ananya helped us manage our 4-year-old’s screen tantrums calmly. Highly empathetic!', textHi: 'डॉ. अनन्या ने हमारे 4 साल के बच्चे के गुस्से को शांत करने में बहुत मदद की।' },
      { author: 'Vikram M.', rating: '5 ★', textEn: 'Extremely detailed explanation of speech milestones during video call.', textHi: 'वीडियो कॉल के दौरान बहुत ही विस्तार से समझाया।' }
    ]
  },
  {
    id: 'c_02',
    name: 'Dr. Sameer Sen',
    titleEn: 'Adolescent & Child Clinical Psychologist',
    titleHi: 'किशोर व बाल क्लिनिकल मनोवैज्ञानिक',
    specialtyEn: 'Child & Teen Psychology',
    specialtyHi: 'बाल व किशोर मनोविज्ञान',
    hospital: 'MindCare Child Clinic & Research Center',
    experience: '11+ Years Exp.',
    experienceYears: 11,
    rating: '4.8 ★',
    reviewCount: 280,
    availableToday: true,
    modes: ['chat', 'call', 'video'],
    location: 'Mumbai & Online',
    fee: '₹900 / Session',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&auto=format&fit=crop&q=80',
    bioEn: 'Specialist in adolescent exam burnout, school drop-off anxiety, peer pressure, sibling conflict resolution, and teenage emotional regulation.',
    bioHi: '10वीं-12वीं परीक्षा के तनाव, स्कूल जाने के डर, दोस्तों के दबाव और किशोरों के व्यवहार प्रबंधन के विशेषज्ञ डॉक्टर।',
    reviews: [
      { author: 'Rajesh K.', rating: '5 ★', textEn: 'Helped my Grade 10 son regain confidence during board exams.', textHi: '10वीं बोर्ड परीक्षा के दौरान मेरे बेटे का आत्मविश्वास लौटाया।' }
    ]
  },
  {
    id: 'c_03',
    name: 'Kavita Verma (M.Sc)',
    titleEn: 'Certified Speech & Language Pathologist',
    titleHi: 'प्रमाणित स्पीच और भाषा थेरेपिस्ट',
    specialtyEn: 'Speech & Language',
    specialtyHi: 'वाणी और भाषा विकास',
    hospital: 'Aawaz Speech & Hearing Center',
    experience: '9+ Years Exp.',
    experienceYears: 9,
    rating: '4.9 ★',
    reviewCount: 190,
    availableToday: false,
    modes: ['video', 'inperson'],
    location: 'Bengaluru & Online',
    fee: '₹750 / Session',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    bioEn: 'Dedicated Speech Therapist for toddlers and young children with delayed first words, articulation difficulty, stammering, and pronunciation practice.',
    bioHi: 'छोटे बच्चों में बोलने की देरी, शब्दों के स्पष्ट उच्चारण और हकलाने के उपचार की विशेषज्ञ थेरेपिस्ट।',
    reviews: [
      { author: 'Meera N.', rating: '5 ★', textEn: 'My 2-year-old started forming 2-word sentences within 2 months of her exercises.', textHi: '2 महीने के अभ्यास से मेरी बेटी 2-शब्दों के वाक्य बोलने लगी।' }
    ]
  }
];

export default function CounselorDirectoryPage({ onSelectCounselor }) {
  const { lang, t } = useLanguage();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [selectedModeFilter, setSelectedModeFilter] = useState('All');
  const [onlyAvailableToday, setOnlyAvailableToday] = useState(false);
  const [minExp, setMinExp] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Filter Dialog Modal State for clean mobile & desktop UX
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const specialties = [
    'All',
    'Pediatric Development',
    'Child & Teen Psychology',
    'Speech & Language'
  ];

  const filteredCounselors = FULL_COUNSELOR_LIST.filter(c => {
    const name = c.name.toLowerCase();
    const title = (lang === 'hi' ? c.titleHi : c.titleEn).toLowerCase();
    const s = searchQuery.toLowerCase();
    
    const matchesSearch = name.includes(s) || title.includes(s) || c.specialtyEn.toLowerCase().includes(s);
    const matchesSpecialty = selectedSpecialty === 'All' || c.specialtyEn === selectedSpecialty;
    const matchesMode = selectedModeFilter === 'All' || c.modes.includes(selectedModeFilter);
    const matchesToday = !onlyAvailableToday || c.availableToday;
    const matchesExp = c.experienceYears >= minExp;

    return matchesSearch && matchesSpecialty && matchesMode && matchesToday && matchesExp;
  });

  return (
    <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-150">
      
      {/* Top Banner Hero Header with Real Counselling Image */}
      <div className="rounded-3xl bg-white border border-[#E4DFF7] shadow-[0_12px_36px_-6px_rgba(91,72,214,0.08)] overflow-hidden max-w-5xl mx-auto flex flex-col md:flex-row items-center">
        <div className="p-6 sm:p-8 flex-1 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#e4dfff]/70 text-[#5B48D6] text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-[#126D55]" />
            <span>Verified Counselor Directory</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {t('directoryTitle')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-xl">
            {t('directorySub')}
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-[#5E5A80] font-semibold">
            <span className="inline-flex items-center gap-1 text-[#126D55]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>RCI & MCI Certified</span>
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1 text-[#5B48D6]">
              <Video className="w-3.5 h-3.5" />
              <span>Instant Video & Clinic Slots</span>
            </span>
          </div>
        </div>

        <div className="w-full md:w-72 lg:w-80 h-48 md:h-52 relative overflow-hidden flex-shrink-0">
          <img
            src="/images/online_video_counselling.jpg"
            alt="Virtual Counselling Session"
            className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-transparent to-white/20 pointer-events-none" />
          <div className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[11px] font-bold text-[#126D55] shadow-sm border border-[#E4DFF7]">
            <span className="w-2 h-2 rounded-full bg-[#126D55] animate-ping" />
            <span>Online Slots Today</span>
          </div>
        </div>
      </div>

      {/* TOP CENTER PROMINENT SEARCH BAR & FILTER DIALOG TRIGGER BUTTON */}
      <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-3">
        
        {/* Search Bar */}
        <div className="relative flex-1 w-full">
          <Search className="w-5 h-5 text-emerald-600 absolute left-4 top-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('searchCounselorPlaceholder')}
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl glass-card text-xs sm:text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-md shadow-emerald-950/5 border border-emerald-200"
          />
        </div>

        {/* Filter Options Trigger Button */}
        <button
          onClick={() => setIsFilterModalOpen(true)}
          className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-md active:scale-95 transition-all flex-shrink-0"
        >
          <SlidersHorizontal className="w-4 h-4 text-emerald-400" />
          <span>⚡ Filter Options</span>
          {(selectedSpecialty !== 'All' || selectedModeFilter !== 'All' || onlyAvailableToday || minExp > 0) && (
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
          )}
        </button>

      </div>

      {/* COUNSELOR CARDS GRID (FULL WIDTH, CLEAN MOBILE SCROLLING) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-2">
          <span>Showing <strong className="text-slate-900">{filteredCounselors.length}</strong> verified counselors</span>
          {selectedSpecialty !== 'All' && (
            <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
              Specialty: {selectedSpecialty}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            [1, 2, 3].map(n => (
              <div key={n} className="glass-card p-6 rounded-3xl space-y-4 border-slate-200 animate-pulse bg-white">
                <div className="flex items-start justify-between">
                  <div className="w-16 h-16 rounded-2xl bg-slate-200" />
                  <div className="w-16 h-6 rounded-full bg-slate-200" />
                </div>
                <div className="space-y-2">
                  <div className="w-3/4 h-5 rounded-lg bg-slate-200" />
                  <div className="w-1/2 h-4 rounded-lg bg-slate-200" />
                </div>
                <div className="w-full h-12 rounded-2xl bg-slate-100" />
              </div>
            ))
          ) : (
            filteredCounselors.map((counselor) => (
              <div
                key={counselor.id}
                onClick={() => onSelectCounselor(counselor)}
                className="glass-card glass-card-hover p-6 rounded-3xl space-y-4 flex flex-col justify-between border-slate-200 cursor-pointer"
              >
              <div className="space-y-3">
                
                {/* Doctor Avatar & Status */}
                <div className="flex items-start justify-between">
                  <div className="relative">
                    <img
                      src={counselor.avatar}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-400 shadow-sm"
                    />
                    {counselor.availableToday && (
                      <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white absolute bottom-0 right-0" title="Available Today" />
                    )}
                  </div>

                  <div className="text-right">
                    <div className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-extrabold">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span>{counselor.rating}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">({counselor.reviewCount} Reviews)</div>
                  </div>
                </div>

                {/* Title & Affiliation */}
                <div>
                  <div className="flex items-center space-x-1.5">
                    <h3 className="text-lg font-bold text-slate-900">{counselor.name}</h3>
                    <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0" />
                  </div>
                  <p className="text-xs font-semibold text-teal-700 mt-0.5">
                    {lang === 'hi' ? counselor.titleHi : counselor.titleEn}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1 flex items-center space-x-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{counselor.hospital}</span>
                  </p>
                </div>

                {/* Bio Excerpt */}
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {lang === 'hi' ? counselor.bioHi : counselor.bioEn}
                </p>

                {/* 4 Available Modes Indicator Badges */}
                <div className="pt-2 flex flex-wrap items-center gap-1.5 text-[10px] font-bold text-slate-600">
                  <span className="px-2 py-1 rounded-md bg-amber-50 border border-amber-200">💬 Chat</span>
                  <span className="px-2 py-1 rounded-md bg-teal-50 border border-teal-200">📞 Call</span>
                  <span className="px-2 py-1 rounded-md bg-emerald-50 border border-emerald-200">📹 Video</span>
                  <span className="px-2 py-1 rounded-md bg-purple-50 border border-purple-200">🤝 Clinic</span>
                </div>

              </div>

              {/* Card Action Button */}
              <div className="pt-3 border-t border-slate-100">
                <button
                  onClick={(e) => { e.stopPropagation(); onSelectCounselor(counselor); }}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-md shadow-emerald-600/20 active:scale-95 transition-all flex items-center justify-center space-x-1.5"
                >
                  <span>{t('viewProfileBtn')}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-200" />
                </button>
              </div>

            </div>
          ))
        )}
        </div>
      </div>

      {/* FILTER OPTIONS DIALOG MODAL WITH TOP-RIGHT X CLOSE BUTTON */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl border border-emerald-100 animate-in zoom-in-95 duration-150 relative">
            
            {/* Top Right Close Button */}
            <button
              onClick={() => setIsFilterModalOpen(false)}
              className="p-2 rounded-full hover:bg-slate-100 text-slate-500 absolute top-4 right-4"
              title="Close Filters"
            >
              <X className="w-6 h-6 text-slate-700" />
            </button>

            {/* Modal Header */}
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                <Filter className="w-5 h-5 text-emerald-600" />
                <span>Search & Filter Options</span>
              </h3>
              <p className="text-xs text-slate-500">Filter counselors by specialty, mode, and availability.</p>
            </div>

            {/* Filters Body */}
            <div className="space-y-5">
              
              {/* 1. Specialty Filter */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Specialty
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                  {specialties.map((sp) => (
                    <button
                      key={sp}
                      onClick={() => setSelectedSpecialty(sp)}
                      className={`p-2.5 rounded-xl border transition-all text-left ${
                        selectedSpecialty === sp ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      {sp === 'All' ? t('allSpecialties') : sp}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Communication Mode Filter */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Communication Mode
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                  <button
                    onClick={() => setSelectedModeFilter('All')}
                    className={`p-2.5 rounded-xl border ${selectedModeFilter === 'All' ? 'bg-slate-900 text-white' : 'bg-white border-slate-200'}`}
                  >
                    All Modes
                  </button>
                  <button
                    onClick={() => setSelectedModeFilter('chat')}
                    className={`p-2.5 rounded-xl border ${selectedModeFilter === 'chat' ? 'bg-amber-100 border-amber-400 text-amber-900 font-bold' : 'bg-white border-slate-200'}`}
                  >
                    💬 Live Chat
                  </button>
                  <button
                    onClick={() => setSelectedModeFilter('call')}
                    className={`p-2.5 rounded-xl border ${selectedModeFilter === 'call' ? 'bg-teal-100 border-teal-400 text-teal-900 font-bold' : 'bg-white border-slate-200'}`}
                  >
                    📞 Voice Call
                  </button>
                  <button
                    onClick={() => setSelectedModeFilter('video')}
                    className={`p-2.5 rounded-xl border ${selectedModeFilter === 'video' ? 'bg-emerald-100 border-emerald-400 text-emerald-900 font-bold' : 'bg-white border-slate-200'}`}
                  >
                    📹 Video Call
                  </button>
                </div>
              </div>

              {/* 3. Availability Toggle */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-800">
                <span>Available Today Only</span>
                <input
                  type="checkbox"
                  checked={onlyAvailableToday}
                  onChange={(e) => setOnlyAvailableToday(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                />
              </div>

            </div>

            {/* Modal Actions */}
            <div className="pt-2 flex items-center justify-between border-t border-slate-100">
              <button
                onClick={() => { setSelectedSpecialty('All'); setSelectedModeFilter('All'); setOnlyAvailableToday(false); setMinExp(0); }}
                className="text-xs font-bold text-rose-600 hover:underline"
              >
                Reset All Filters
              </button>

              <button
                onClick={() => setIsFilterModalOpen(false)}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-md"
              >
                Apply & View Results ({filteredCounselors.length})
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
