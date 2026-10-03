import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { STAGE_DATA } from '../data/journeyData';
import { Search, Sparkles, ShieldCheck, HeartHandshake, Users, ArrowRight, Grid, MessageSquare, CheckCircle2, UserCheck, Calendar } from 'lucide-react';

export default function Hero({ selectedStage, setSelectedStage, searchQuery, setSearchQuery, onExploreClick, onOpenProblemAreas }) {
  const { lang, t } = useLanguage();

  return (
    <section className="relative overflow-hidden pt-8 pb-10 bg-hero-pattern border-b border-emerald-100/50">
      {/* Soft background ambient floating glows */}
      <div className="absolute top-5 left-1/4 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-10 right-1/4 w-96 h-96 bg-peach-200/30 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Main Banner Heading - Minimal & Clean */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t('heroBadge')}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            {t('heroTitle')}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
            {t('heroDesc')}
          </p>

          {/* Unified Search Input */}
          <div className="pt-2 max-w-xl mx-auto">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('heroSearchPlaceholder')}
                className="w-full pl-11 pr-24 py-3 rounded-2xl glass-card text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 shadow-md shadow-emerald-900/5"
              />
              <button
                onClick={onExploreClick}
                className="absolute right-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-sm flex items-center space-x-1"
              >
                <span>{t('searchBtn')}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

        </div>

        {/* 3-STEP STEP-BY-STEP GUIDE BANNER (Decluttered & Intuitive) */}
        <div className="space-y-4">
          <div className="text-center space-y-1">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              {t('howItWorksTitle')}
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              {t('howItWorksSub')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
            
            {/* STEP 1 CARD */}
            <div className="glass-card glass-card-hover p-6 rounded-3xl space-y-4 relative border-emerald-200/70 bg-gradient-to-b from-white to-emerald-50/40">
              <div className="flex items-center justify-between">
                <span className="w-9 h-9 rounded-2xl bg-emerald-600 text-white font-black text-xs flex items-center justify-center shadow-sm">
                  01
                </span>
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider bg-emerald-100/70 px-2.5 py-0.5 rounded-full">
                  {lang === 'hi' ? 'आयु चरण' : 'Age Stage'}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">{t('step1Title')}</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{t('step1Desc')}</p>
              </div>

              {/* Age Pill Selector directly inside Step 1 */}
              <div className="pt-2 flex flex-wrap gap-1.5">
                {STAGE_DATA.slice(0, 5).map((stage) => (
                  <button
                    key={stage.id}
                    onClick={() => { setSelectedStage(stage.id); onExploreClick(); }}
                    className={`px-2.5 py-1 rounded-xl text-[11px] font-semibold transition-all ${
                      selectedStage === stage.id
                        ? 'bg-emerald-600 text-white font-bold shadow-2xs'
                        : 'bg-white text-slate-700 hover:bg-emerald-50 border border-slate-200/60'
                    }`}
                  >
                    {stage.name}
                  </button>
                ))}
              </div>
            </div>

            {/* STEP 2 CARD */}
            <div className="glass-card glass-card-hover p-6 rounded-3xl space-y-4 relative border-teal-200/70 bg-gradient-to-b from-white to-teal-50/40">
              <div className="flex items-center justify-between">
                <span className="w-9 h-9 rounded-2xl bg-teal-600 text-white font-black text-xs flex items-center justify-center shadow-sm">
                  02
                </span>
                <span className="text-xs font-bold text-teal-800 uppercase tracking-wider bg-teal-100/70 px-2.5 py-0.5 rounded-full">
                  {lang === 'hi' ? 'काउंसलिंग' : 'Counseling'}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">{t('step2Title')}</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{t('step2Desc')}</p>
              </div>

              <div className="pt-2 flex items-center space-x-2">
                <button
                  onClick={() => onOpenProblemAreas('screen')}
                  className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold flex items-center justify-center space-x-1 shadow-xs transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{lang === 'hi' ? 'समस्या समाधान मैट्रिक्स' : 'Problem Areas Matrix'}</span>
                </button>
              </div>
            </div>

            {/* STEP 3 CARD */}
            <div className="glass-card glass-card-hover p-6 rounded-3xl space-y-4 relative border-amber-200/70 bg-gradient-to-b from-white to-amber-50/40">
              <div className="flex items-center justify-between">
                <span className="w-9 h-9 rounded-2xl bg-amber-600 text-white font-black text-xs flex items-center justify-center shadow-sm">
                  03
                </span>
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wider bg-amber-100/70 px-2.5 py-0.5 rounded-full">
                  {lang === 'hi' ? 'विकास व टीके' : 'Growth & Vaccines'}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">{t('step3Title')}</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{t('step3Desc')}</p>
              </div>

              <div className="pt-2 flex items-center space-x-2">
                <button
                  onClick={onExploreClick}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center space-x-1 shadow-xs transition-all"
                >
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>{lang === 'hi' ? 'विकास लॉग देखें' : 'View Growth Log'}</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Minimal Trust Badge Footer */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs text-slate-500 font-semibold border-t border-emerald-100/60">
          <span className="flex items-center space-x-1.5">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            <span>{t('trustPediatricians')}</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <Users className="w-4 h-4 text-amber-500" />
            <span>{t('trustCommunity')}</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <HeartHandshake className="w-4 h-4 text-rose-500" />
            <span>{t('trustMilestones')}</span>
          </span>
        </div>

      </div>
    </section>
  );
}
