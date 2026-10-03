import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, HeartHandshake, UserCheck, MessageSquare, Phone, Video, Calendar, ShieldCheck, CheckCircle2, ArrowRight, Activity, Heart, Star, ChevronRight } from 'lucide-react';

export const COUNSELOR_DIRECTORY = [
  {
    id: 'c_01',
    name: 'Dr. Ananya Roy',
    titleEn: 'Child Growth & Behavioral Specialist',
    titleHi: 'बच्चों के विकास व व्यवहार विशेषज्ञ डॉक्टर',
    specialty: 'Pediatric Development',
    experience: '14+ Years Exp.',
    rating: '4.9 ★ (320+ Reviews)',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'c_02',
    name: 'Dr. Sameer Sen',
    titleEn: 'Child & Adolescent Psychologist',
    titleHi: 'बच्चों और किशोरों के व्यवहार व मन के डॉक्टर',
    specialty: 'Behavioral & Mental Health',
    experience: '11+ Years Exp.',
    rating: '4.8 ★ (280+ Reviews)',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'c_03',
    name: 'Kavita Verma (M.Sc)',
    titleEn: 'Certified Speech & Language Pathologist',
    titleHi: 'बोलने और भाषा विकास की विशेषज्ञ',
    specialty: 'Speech & Communication',
    experience: '9+ Years Exp.',
    rating: '4.9 ★ (190+ Reviews)',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
  }
];

export default function CounselingHub({ onOpenTracker }) {
  const { lang, t } = useLanguage();

  // Symptom Assessment State
  const [symptomInput, setSymptomInput] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [diagnosticResult, setDiagnosticResult] = useState(null);

  // Counselor & Mode Selection State
  const [selectedCounselor, setSelectedCounselor] = useState(COUNSELOR_DIRECTORY[0]);
  const [selectedMode, setSelectedMode] = useState('video'); // 'chat' | 'call' | 'video' | 'inperson'
  const [sessionCode, setSessionCode] = useState('PRV-849201');

  const handleRunAssessment = (presetText = null) => {
    const textToAnalyze = presetText || symptomInput;
    if (!textToAnalyze.trim()) return;

    setAnalyzing(true);
    setTimeout(() => {
      let matchedSpecialty = 'Pediatric Development';
      let recCounselor = COUNSELOR_DIRECTORY[0];

      const lower = textToAnalyze.toLowerCase();
      if (lower.includes('speech') || lower.includes('speak') || lower.includes('बोल') || lower.includes('शब्द')) {
        matchedSpecialty = 'Speech & Communication';
        recCounselor = COUNSELOR_DIRECTORY[2];
      } else if (lower.includes('tantrum') || lower.includes('screen') || lower.includes('angry') || lower.includes('मार') || lower.includes('गुस्सा')) {
        matchedSpecialty = 'Behavioral & Mental Health';
        recCounselor = COUNSELOR_DIRECTORY[1];
      }

      setDiagnosticResult({
        analyzedIssue: textToAnalyze,
        matchedSpecialty,
        recCounselor,
        summaryEn: `Assessment indicates potential ${matchedSpecialty} factors. Clinical counseling recommended.`,
        summaryHi: `प्राथमिक जानकारी के अनुसार आपके बच्चे को ${recCounselor.titleHi} की सही सलाह मिल सकती है।`
      });

      setSelectedCounselor(recCounselor);
      setAnalyzing(false);
    }, 800);
  };

  return (
    <section className="py-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Header Banner */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-50 via-teal-50 to-amber-50 border border-emerald-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>4-Step Guided Counseling</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {lang === 'hi' ? 'विशेषज्ञ परामर्श व बाल कल्याण मार्ग' : 'Expert Counseling & Child Wellness Guide'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            {lang === 'hi'
              ? '4 आसान चरणों में बच्चे की जरूरत समझें, डॉक्टर से जुड़ें, बात करने का माध्यम चुनें और स्वास्थ्य का ध्यान रखें।'
              : 'Follow 4 simple steps: assess child needs, match with specialists, choose communication mode, and track health.'}
          </p>
        </div>
      </div>

      {/* CONTINUOUS VERTICAL TIMELINE CONTAINER */}
      <div className="space-y-10">
        
        {/* STEP 01: CHILD NEED ASSESSMENT */}
        <div id="step-1" className="relative pl-0 sm:pl-16">
          <div className="hidden sm:flex absolute left-0 top-0 w-12 h-12 rounded-2xl bg-emerald-600 text-white font-black text-sm items-center justify-center shadow-md shadow-emerald-600/30 z-10">
            01
          </div>

          <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-6 bg-gradient-to-br from-white to-emerald-50/40 border-emerald-200">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-2xl bg-emerald-100 text-emerald-700">
                <HeartHandshake className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Step 1 of 4</span>
                <h3 className="text-xl font-bold text-slate-900">
                  {lang === 'hi' ? '1. अपने बच्चे के सवाल या लक्षण समझें' : '1. Child Need & Symptom Assessment'}
                </h3>
                <p className="text-xs text-slate-500">
                  {lang === 'hi'
                    ? 'अपने बच्चे के व्यवहार या बोलने से जुड़ा कोई भी सवाल लिखें।'
                    : 'Describe your child’s symptoms or questions to identify the right expert.'}
                </p>
              </div>
            </div>

            <div className="space-y-4 max-w-2xl">
              <textarea
                rows={3}
                value={symptomInput}
                onChange={(e) => setSymptomInput(e.target.value)}
                placeholder={lang === 'hi'
                  ? "उदा. '24 महीने का बच्चा बहुत कम बोलता है' या 'स्क्रीन बंद करने पर जिद करता है'..."
                  : "e.g. 'My 24-month-old speaks fewer than 10 words' or 'Throws meltdowns when screen turns off'..."}
                className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
              />

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5 text-xs">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">Prompts:</span>
                  <button
                    onClick={() => { setSymptomInput('24 month old speech delay fewer than 10 words'); handleRunAssessment('24 month old speech delay fewer than 10 words'); }}
                    className="px-2.5 py-1 rounded-full bg-white hover:bg-emerald-50 text-slate-700 text-[11px] font-semibold border border-slate-200"
                  >
                    🗣️ {lang === 'hi' ? 'बोलने में देरी' : 'Speech Delay'}
                  </button>
                  <button
                    onClick={() => { setSymptomInput('Screen addiction & tantrums when iPad turns off'); handleRunAssessment('Screen addiction & tantrums when iPad turns off'); }}
                    className="px-2.5 py-1 rounded-full bg-white hover:bg-emerald-50 text-slate-700 text-[11px] font-semibold border border-slate-200"
                  >
                    📱 {lang === 'hi' ? 'स्क्रीन जिद' : 'Screen Tantrums'}
                  </button>
                </div>

                <button
                  onClick={() => handleRunAssessment()}
                  disabled={analyzing || !symptomInput.trim()}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center space-x-2 shadow-md shadow-emerald-600/20 disabled:opacity-50"
                >
                  <span>{analyzing ? 'Checking...' : (lang === 'hi' ? 'सही डॉक्टर ढूंढें' : 'Match Counselor')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {diagnosticResult && (
                <div className="p-4 rounded-2xl bg-emerald-100/70 border border-emerald-200 text-xs font-medium text-emerald-900 space-y-1 animate-in fade-in">
                  <div className="font-bold flex items-center space-x-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>{lang === 'hi' ? 'सुझाये गए बाल विशेषज्ञ:' : 'Recommended Specialist:'} {diagnosticResult.recCounselor.name} ({lang === 'hi' ? diagnosticResult.recCounselor.titleHi : diagnosticResult.recCounselor.titleEn})</span>
                  </div>
                  <p>{lang === 'hi' ? diagnosticResult.summaryHi : diagnosticResult.summaryEn}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* STEP 02: CONNECT WITH CORRECT COUNSELOR */}
        <div id="step-2" className="relative pl-0 sm:pl-16">
          <div className="hidden sm:flex absolute left-0 top-0 w-12 h-12 rounded-2xl bg-teal-600 text-white font-black text-sm items-center justify-center shadow-md shadow-teal-600/30 z-10">
            02
          </div>

          <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-6 border-teal-200">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-2xl bg-teal-100 text-teal-700">
                <UserCheck className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-700">Step 2 of 4</span>
                <h3 className="text-xl font-bold text-slate-900">
                  {lang === 'hi' ? '2. उपयुक्त बाल रोग विशेषज्ञ का चयन करें' : '2. Select Your Preferred Counselor'}
                </h3>
                <p className="text-xs text-slate-500">
                  Select a verified child specialist below:
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {COUNSELOR_DIRECTORY.map((counselor) => {
                const isSelected = selectedCounselor.id === counselor.id;
                return (
                  <div
                    key={counselor.id}
                    onClick={() => setSelectedCounselor(counselor)}
                    className={`p-5 rounded-2xl cursor-pointer border transition-all flex flex-col justify-between space-y-3 ${
                      isSelected ? 'bg-teal-50/90 border-teal-500 shadow-md scale-102' : 'glass-card hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <img src={counselor.avatar} className="w-11 h-11 rounded-full object-cover border-2 border-teal-400" />
                      <div>
                        <div className="text-sm font-bold text-slate-900 flex items-center space-x-1">
                          <span>{counselor.name}</span>
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                        </div>
                        <div className="text-xs text-slate-600 font-medium leading-snug">
                          {lang === 'hi' ? counselor.titleHi : counselor.titleEn}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                      <span className="text-teal-700 font-bold">{counselor.experience}</span>
                      <span className="text-amber-600 font-semibold">{counselor.rating}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* STEP 03: CHOOSE COMMUNICATION MODE */}
        <div id="step-3" className="relative pl-0 sm:pl-16">
          <div className="hidden sm:flex absolute left-0 top-0 w-12 h-12 rounded-2xl bg-amber-600 text-white font-black text-sm items-center justify-center shadow-md shadow-amber-600/30 z-10">
            03
          </div>

          <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-6 border-amber-200">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-2xl bg-amber-100 text-amber-700">
                <Video className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Step 3 of 4</span>
                <h3 className="text-xl font-bold text-slate-900">
                  {lang === 'hi' ? '3. परामर्श का माध्यम चुनें' : '3. Choose Communication Mode'}
                </h3>
                <p className="text-xs text-slate-500">
                  Selected Counselor: <span className="font-bold text-slate-900">{selectedCounselor.name}</span>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div
                onClick={() => setSelectedMode('chat')}
                className={`p-4 rounded-2xl cursor-pointer border transition-all space-y-2 ${
                  selectedMode === 'chat' ? 'bg-amber-50 border-amber-500 shadow-md' : 'glass-card hover:border-slate-300'
                }`}
              >
                <div className="p-2.5 rounded-xl bg-amber-100 text-amber-800 w-fit">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-bold text-slate-900">{t('mode1Title')}</h4>
                <p className="text-[11px] text-slate-500">{t('mode1Desc')}</p>
              </div>

              <div
                onClick={() => setSelectedMode('call')}
                className={`p-4 rounded-2xl cursor-pointer border transition-all space-y-2 ${
                  selectedMode === 'call' ? 'bg-amber-50 border-amber-500 shadow-md' : 'glass-card hover:border-slate-300'
                }`}
              >
                <div className="p-2.5 rounded-xl bg-teal-100 text-teal-800 w-fit">
                  <Phone className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-bold text-slate-900">{t('mode2Title')}</h4>
                <p className="text-[11px] text-slate-500">{t('mode2Desc')}</p>
              </div>

              <div
                onClick={() => setSelectedMode('video')}
                className={`p-4 rounded-2xl cursor-pointer border transition-all space-y-2 ${
                  selectedMode === 'video' ? 'bg-amber-50 border-amber-500 shadow-md' : 'glass-card hover:border-slate-300'
                }`}
              >
                <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800 w-fit">
                  <Video className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-bold text-slate-900">{t('mode3Title')}</h4>
                <p className="text-[11px] text-slate-500">{t('mode3Desc')}</p>
              </div>

              <div
                onClick={() => setSelectedMode('inperson')}
                className={`p-4 rounded-2xl cursor-pointer border transition-all space-y-2 ${
                  selectedMode === 'inperson' ? 'bg-amber-50 border-amber-500 shadow-md' : 'glass-card hover:border-slate-300'
                }`}
              >
                <div className="p-2.5 rounded-xl bg-purple-100 text-purple-800 w-fit">
                  <Calendar className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-bold text-slate-900">{t('mode4Title')}</h4>
                <p className="text-[11px] text-slate-500">{t('mode4Desc')}</p>
              </div>

            </div>
          </div>
        </div>

        {/* STEP 04: TRACK GROWTH & EMOTIONAL WELLNESS */}
        <div id="step-4" className="relative pl-0 sm:pl-16">
          <div className="hidden sm:flex absolute left-0 top-0 w-12 h-12 rounded-2xl bg-rose-600 text-white font-black text-sm items-center justify-center shadow-md shadow-rose-600/30 z-10">
            04
          </div>

          <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-6 border-rose-200 bg-gradient-to-br from-white to-rose-50/40">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-2xl bg-rose-100 text-rose-700">
                <Activity className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-rose-700">Step 4 of 4</span>
                <h3 className="text-xl font-bold text-slate-900">
                  {lang === 'hi' ? '4. विकास व भावनात्मक स्वास्थ्य ध्यान रखें' : '4. Longitudinal Growth & Emotional Wellness Tracking'}
                </h3>
                <p className="text-xs text-slate-500">
                  Keep your child emotionally healthy and track physical/cognitive milestones.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3">
                <h4 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                  <Heart className="w-4 h-4 text-rose-500" />
                  <span>Emotional Wellness Log</span>
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Track behavioral progress, calm moments, and milestones achieved after your consultation.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3">
                <h4 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-teal-600" />
                  <span>Active Session Pass</span>
                </h4>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono font-bold text-emerald-800">
                  Session Pass: {sessionCode} ({selectedMode.toUpperCase()})
                </div>
                <p className="text-[11px] text-slate-500">
                  Specialist: {selectedCounselor.name} ({lang === 'hi' ? selectedCounselor.titleHi : selectedCounselor.titleEn})
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
}
