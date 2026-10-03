import React, { useState } from 'react';
import { STAGE_DATA } from '../data/journeyData';
import { Sparkles, BookOpen, Utensils, CheckSquare, Clock, ArrowRight, AlertCircle, Heart, ChevronRight } from 'lucide-react';

export default function JourneyHub({ selectedStage, setSelectedStage, searchQuery }) {
  const [activeTab, setActiveTab] = useState('overview');

  const currentStage = STAGE_DATA.find(s => s.id === selectedStage) || STAGE_DATA[0];

  return (
    <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header Banner for Selected Stage */}
      <div className={`p-6 sm:p-8 rounded-3xl bg-gradient-to-r ${currentStage.color} border shadow-sm mb-8 relative overflow-hidden`}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/80 text-slate-800 text-xs font-bold uppercase tracking-wider mb-2 border border-slate-200/50">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>{currentStage.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {currentStage.name} <span className="text-lg font-medium text-slate-600 font-sans">({currentStage.ageRange})</span>
            </h2>
            <p className="mt-1 text-sm sm:text-base text-slate-700 font-medium">
              {currentStage.tagline}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {currentStage.keyFocus.map((focus, idx) => (
              <span key={idx} className="px-3 py-1.5 rounded-xl bg-white/90 text-slate-800 text-xs font-semibold shadow-xs">
                ✨ {focus}
              </span>
            ))}
          </div>
        </div>

        {/* Section Tabs inside Journey Hub */}
        <div className="flex items-center space-x-2 mt-6 pt-4 border-t border-slate-900/10">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'overview' ? 'bg-slate-900 text-white shadow-md' : 'bg-white/70 text-slate-700 hover:bg-white'
            }`}
          >
            Guided Articles & Tips
          </button>
          <button
            onClick={() => setActiveTab('nutrition')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'nutrition' ? 'bg-slate-900 text-white shadow-md' : 'bg-white/70 text-slate-700 hover:bg-white'
            }`}
          >
            Nutrition & Feeding
          </button>
          <button
            onClick={() => setActiveTab('checklist')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'checklist' ? 'bg-slate-900 text-white shadow-md' : 'bg-white/70 text-slate-700 hover:bg-white'
            }`}
          >
            Development Checklist
          </button>
        </div>
      </div>

      {/* TAB CONTENT: Guided Articles & Tips */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Articles (2 Columns) */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-teal-600" />
              <span>Pediatric Articles for {currentStage.name}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentStage.articles.map((art, idx) => (
                <div key={idx} className="glass-card glass-card-hover p-5 rounded-2xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                      <span className="flex items-center space-x-1 font-medium">
                        <Clock className="w-3.5 h-3.5 text-sage-600" />
                        <span>{art.readTime}</span>
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px]">
                        {art.tags[0]}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 leading-snug mb-2 hover:text-teal-700 transition-colors cursor-pointer">
                      {art.title}
                    </h4>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {art.excerpt}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-slate-500">{art.author}</span>
                    <button className="text-xs font-bold text-teal-600 hover:text-teal-800 flex items-center space-x-1">
                      <span>Read</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Practical Daily Routine Tip Card */}
            <div className="glass-card p-6 rounded-2xl bg-gradient-to-r from-emerald-50/60 to-teal-50/60 border border-emerald-200/60">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-emerald-600 text-white rounded-xl">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Empathetic Parent Reminders</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Remember: Developmental timelines are ranges, not strict exams. Every child develops at their own unique pace. If you ever feel overwhelmed, take a 5-minute breather—parenting is a marathon built on daily love and presence.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar: Key Milestones Summary & Red Flags */}
          <div className="space-y-6">
            
            {/* Quick Checklist Widget */}
            <div className="glass-card p-5 rounded-2xl">
              <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center space-x-2">
                <CheckSquare className="w-4 h-4 text-emerald-600" />
                <span>Stage Milestone Targets</span>
              </h4>
              <ul className="space-y-2.5">
                {currentStage.checklist.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-2 text-xs text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* When to Consult Doctor Box */}
            <div className="glass-card p-5 rounded-2xl border-rose-200/80 bg-rose-50/40">
              <div className="flex items-center space-x-2 text-rose-700 text-xs font-bold mb-2">
                <AlertCircle className="w-4 h-4" />
                <span>Pediatric Red Flags to Watch</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Consult your pediatrician if you notice persistent lack of eye contact, sudden loss of previously acquired speech/motor skills, or continuous extreme lethargy.
              </p>
            </div>

          </div>

        </div>
      )}

      {/* TAB CONTENT: Nutrition & Feeding */}
      {activeTab === 'nutrition' && (
        <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-amber-100 text-amber-700 rounded-2xl">
              <Utensils className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Nutrition & Feeding Guidelines ({currentStage.name})</h3>
              <p className="text-xs text-slate-600">{currentStage.nutrition.summary}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-100 shadow-xs">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-2">Recommended Feeding Schedule</h4>
              <p className="text-sm font-semibold text-slate-800">{currentStage.nutrition.schedule}</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-100 shadow-xs">
              <h4 className="text-xs font-bold uppercase tracking-wider text-teal-700 mb-2">Pediatrician Dietary Recommendations</h4>
              <ul className="space-y-2">
                {currentStage.nutrition.tips.map((tip, i) => (
                  <li key={i} className="text-xs text-slate-700 flex items-start space-x-2">
                    <ChevronRight className="w-3.5 h-3.5 text-teal-600 mt-0.5 flex-shrink-0" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: Development Checklist */}
      {activeTab === 'checklist' && (
        <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-4">
          <h3 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
            <CheckSquare className="w-5 h-5 text-emerald-600" />
            <span>Developmental Checkpoints ({currentStage.name})</span>
          </h3>
          <p className="text-xs text-slate-600">
            Use these checkpoints to monitor progress. Check them off in the interactive Milestone Tracker tab to log your child’s growth story!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {currentStage.checklist.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-white border border-slate-100 flex items-center space-x-3 shadow-xs">
                <div className="w-5 h-5 rounded-md border-2 border-emerald-500 flex items-center justify-center text-emerald-600">
                  ✓
                </div>
                <span className="text-xs font-semibold text-slate-800">{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </section>
  );
}
