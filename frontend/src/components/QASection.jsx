import React, { useState, useEffect } from 'react';
import { apiFetch } from '../services/api';
import { MessageSquare, ShieldCheck, ThumbsUp, Search, ChevronDown, ChevronUp, Sparkles, CheckCircle2, UserCheck, HelpCircle } from 'lucide-react';

export default function QASection({ onOpenAskExpert, searchQuery: externalSearch }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedId, setExpandedId] = useState(null);
  const [localSearch, setLocalSearch] = useState(externalSearch || '');

  const categories = [
    'All',
    'Screen Time & Digital Wellness',
    'Bullying & Emotional Resilience',
    'Academic Burnout & School Disinterest',
    'Social Behavior & Sibling Rivalry',
    'Career Guidance & Teen Mental Health'
  ];

  const fetchQA = async () => {
    setLoading(true);
    try {
      let url = `/qa?category=${encodeURIComponent(selectedCategory)}`;
      if (localSearch) url += `&search=${encodeURIComponent(localSearch)}`;
      const data = await apiFetch(url);
      setQuestions(data || []);
      if (data && data.length > 0) {
        setExpandedId(data[0]._id);
      }
    } catch (err) {
      console.warn('Using offline Q&A fallback');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQA();
  }, [selectedCategory, localSearch]);

  const handleHelpful = async (qId, e) => {
    e.stopPropagation();
    try {
      const updated = await apiFetch(`/qa/${qId}/helpful`, { method: 'POST' });
      setQuestions(prev => prev.map(q => q._id === qId ? updated : q));
    } catch (err) {
      setQuestions(prev => prev.map(q => {
        if (q._id === qId) return { ...q, helpfulCount: (q.helpfulCount || 0) + 1 };
        return q;
      }));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header Banner */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-sky-50 via-teal-50 to-emerald-50 border border-sky-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
            <span>Expert-Verified Knowledge Base</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Popular Parenting Challenges & Pediatric Solutions
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Verified evidence-based answers to modern hurdles: screen addiction, bullying, academic pressure, sibling conflict & adolescent mental health.
          </p>
        </div>

        <button
          onClick={onOpenAskExpert}
          className="flex items-center space-x-2 px-5 py-3 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-sky-600/20 active:scale-95 transition-all flex-shrink-0"
        >
          <HelpCircle className="w-4 h-4" />
          <span>Ask Confidential Question</span>
        </button>
      </div>

      {/* Category Pills & Search Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        
        {/* Category Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-sky-900 text-white shadow-sm'
                  : 'glass-card text-slate-700 hover:bg-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Local Search */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Search challenges..."
            className="w-full pl-9 pr-4 py-2 rounded-xl glass-card text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
          />
        </div>

      </div>

      {/* Q&A Accordion List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-16 text-slate-500 text-sm font-medium animate-pulse">
            Searching expert Q&A database...
          </div>
        ) : questions.length === 0 ? (
          <div className="glass-card p-12 text-center rounded-3xl space-y-3">
            <HelpCircle className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No answered queries found in this category</h3>
            <p className="text-xs text-slate-500">Would you like to submit this question directly to our pediatrician panel?</p>
            <button
              onClick={onOpenAskExpert}
              className="mt-2 inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-sky-600 text-white text-xs font-bold"
            >
              <span>Submit Question</span>
            </button>
          </div>
        ) : (
          questions.map((q) => {
            const isExpanded = expandedId === q._id;
            return (
              <div
                key={q._id}
                className={`glass-card rounded-3xl transition-all duration-200 border ${
                  isExpanded ? 'border-sky-300 shadow-md' : 'hover:border-slate-300'
                }`}
              >
                {/* Accordion Header */}
                <div
                  onClick={() => setExpandedId(isExpanded ? null : q._id)}
                  className="p-6 cursor-pointer flex items-start justify-between gap-4"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 text-[10px] font-bold">
                        {q.category}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-semibold">
                        {q.ageCategory}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        Asked by {q.submittedBy?.name || 'Parent'}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      {q.title}
                    </h3>
                  </div>

                  <button className="p-2 rounded-full hover:bg-slate-100 text-slate-400 flex-shrink-0">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>

                {/* Expanded Details & Specialist Answer */}
                {isExpanded && (
                  <div className="px-6 pb-6 pt-2 space-y-6 border-t border-slate-100 animate-in fade-in duration-150">
                    
                    {/* Parent Query Background */}
                    <div className="p-4 rounded-2xl bg-slate-50 text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                      "{q.details}"
                    </div>

                    {/* Expert Answer Callout Card */}
                    {q.expertAnswer ? (
                      <div className="p-6 rounded-2xl bg-gradient-to-r from-teal-50/90 to-emerald-50/90 border border-teal-200/80 space-y-4">
                        
                        {/* Specialist Badge */}
                        <div className="flex items-center space-x-3 pb-3 border-b border-teal-200/60">
                          <img
                            src={q.expertAnswer.answeredBy.avatar || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80'}
                            className="w-10 h-10 rounded-full object-cover border-2 border-teal-500 shadow-xs"
                          />
                          <div>
                            <div className="flex items-center space-x-1">
                              <span className="text-sm font-bold text-slate-900">{q.expertAnswer.answeredBy.name}</span>
                              <CheckCircle2 className="w-4 h-4 text-teal-600" />
                            </div>
                            <span className="text-xs text-teal-800 font-medium">
                              {q.expertAnswer.answeredBy.specialization || 'Certified Pediatric Specialist'}
                            </span>
                          </div>
                        </div>

                        {/* Detailed Answer */}
                        <div className="text-xs sm:text-sm text-slate-800 leading-relaxed space-y-2 whitespace-pre-line">
                          {q.expertAnswer.answer}
                        </div>

                        {/* Key Actionable Takeaways Checklist */}
                        {q.expertAnswer.keyTakeaways && q.expertAnswer.keyTakeaways.length > 0 && (
                          <div className="p-4 rounded-xl bg-white/80 border border-teal-100 space-y-2">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-800">
                              💡 Key Action Steps for Parents:
                            </h4>
                            <ul className="space-y-1">
                              {q.expertAnswer.keyTakeaways.map((takeaway, i) => (
                                <li key={i} className="text-xs text-slate-700 flex items-start space-x-2">
                                  <span className="text-teal-600 font-bold">•</span>
                                  <span>{takeaway}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Helpful Counter Button */}
                        <div className="pt-2 flex items-center justify-between">
                          <button
                            onClick={(e) => handleHelpful(q._id, e)}
                            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-white border border-teal-200 text-teal-800 text-xs font-bold shadow-xs hover:bg-teal-50 transition-colors"
                          >
                            <ThumbsUp className="w-3.5 h-3.5 text-teal-600" />
                            <span>This Helped {q.helpfulCount || 0} Parents</span>
                          </button>

                          <span className="text-[10px] text-slate-400">
                            Verified Response
                          </span>
                        </div>

                      </div>
                    ) : (
                      <div className="p-4 rounded-2xl bg-amber-50 text-amber-800 text-xs font-semibold">
                        ⏳ This question is currently pending review by our pediatrician panel. Answers are typically published within 24 hours.
                      </div>
                    )}

                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
