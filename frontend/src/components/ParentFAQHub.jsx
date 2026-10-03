import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { PARENT_FAQS } from '../data/faqData';
import { 
  Search, Heart, Share2, MessageSquare, ChevronDown, ChevronUp, 
  Send, CheckCircle2, Sparkles, HelpCircle, BookOpen, Lightbulb, 
  ShieldCheck, X, ArrowRight, User
} from 'lucide-react';

export const FAQ_CATEGORY_FILTERS = [
  { id: 'All', labelEn: 'All Challenges', labelHi: 'सभी समस्याएं', icon: '🌐' },
  { id: 'Behavior & Emotional Health', labelEn: 'Behavior & Tantrums', labelHi: 'व्यवहार व जिद', icon: '👶', ageTag: 'Ages 0–5 Yrs' },
  { id: 'Speech & Language', labelEn: 'Speech & Communication', labelHi: 'बोलना व भाषा', icon: '🗣️', ageTag: 'Ages 2–8 Yrs' },
  { id: 'Academic & School Life', labelEn: 'School & Focus', labelHi: 'स्कूल व पढ़ाई', icon: '🎒', ageTag: 'Ages 6–12 Yrs' },
  { id: 'Adolescent & Mental Health', labelEn: 'Teen Mental Health', labelHi: 'किशोर मानसिक स्वास्थ्य', icon: '🎧', ageTag: 'Ages 13–18 Yrs' }
];

export default function ParentFAQHub() {
  const { lang, t } = useLanguage();
  const isHi = lang === 'hi';

  const [faqs, setFaqs] = useState(PARENT_FAQS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [favorites, setFavorites] = useState([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [expandedId, setExpandedId] = useState('faq_01');
  const [toastMessage, setToastMessage] = useState('');
  const [commentInputMap, setCommentInputMap] = useState({});

  const handleToggleFavorite = (faqId, e) => {
    e.stopPropagation();
    setFavorites(prev => {
      if (prev.includes(faqId)) {
        return prev.filter(id => id !== faqId);
      } else {
        return [...prev, faqId];
      }
    });
  };

  const handleShare = (faq, e) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}/common-problems?id=${faq.id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setToastMessage(isHi ? 'लिंक क्लिपबोर्ड पर कॉपी हो गया!' : 'Guidance link copied to clipboard!');
    } else {
      setToastMessage(isHi ? 'शेयर लिंक तैयार है' : 'Share link generated!');
    }
    setTimeout(() => setToastMessage(''), 2500);
  };

  const handleAddComment = (faqId, e) => {
    e.preventDefault();
    const text = commentInputMap[faqId];
    if (!text || !text.trim()) return;

    const newComment = {
      id: `c_${Date.now()}`,
      author: 'Priya Sharma (Parent Member)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      textEn: text,
      textHi: text,
      createdAt: 'Just now'
    };

    setFaqs(prev => prev.map(f => {
      if (f.id === faqId) {
        return { ...f, comments: [...f.comments, newComment] };
      }
      return f;
    }));

    setCommentInputMap(prev => ({ ...prev, [faqId]: '' }));
  };

  const filteredFaqs = faqs.filter(f => {
    const qText = isHi ? f.questionHi : f.questionEn;
    const aText = isHi ? f.answerHi : f.answerEn;
    
    const matchesSearch = qText.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          aText.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || f.category === selectedCategory;
    const matchesFavorite = !showFavoritesOnly || favorites.includes(f.id);

    return matchesSearch && matchesCategory && matchesFavorite;
  });

  return (
    <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-200">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-emerald-700 text-white text-xs font-bold shadow-2xl flex items-center space-x-2 animate-in slide-in-from-bottom-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-200" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* RE-DESIGNED WELCOMING HERO BANNER */}
      <div className="glass-card p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-emerald-50 via-teal-50 to-amber-50 border border-emerald-200/80 space-y-6 shadow-xs">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isHi ? 'विशेषज्ञ बाल स्वास्थ्य ज्ञानकोष' : 'Pediatric Knowledge Base & Parent Q&A'}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              {isHi ? 'बच्चों की समस्याएं और वैज्ञानिक समाधान' : 'Common Child Challenges & Expert Solutions'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-2xl">
              {isHi 
                ? 'जिद, मोबाइल की लत, बोलने में देरी, पढ़ाई के तनाव और किशोर भावनाओं के लिए डॉक्टरों द्वारा सत्यापित आसान मार्गदर्शन।'
                : 'Browse simple, board-certified guidance on toddlers tantrums, screen limits, speech delays, exam fear, and teen emotions.'}
            </p>
          </div>

          {/* Favorites Filter Button */}
          <button
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            className={`flex items-center space-x-2 px-5 py-3 rounded-2xl text-xs font-extrabold transition-all border shadow-xs flex-shrink-0 ${
              showFavoritesOnly
                ? 'bg-rose-600 text-white border-transparent shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
            }`}
          >
            <Heart className={`w-4 h-4 ${showFavoritesOnly ? 'fill-white' : 'text-rose-500'}`} />
            <span>{isHi ? `पसंदीदा मार्गदर्शन (${favorites.length})` : `Saved Articles (${favorites.length})`}</span>
          </button>
        </div>

        {/* SEARCH BAR WITH CLEAR BUTTON */}
        <div className="relative max-w-2xl">
          <Search className="w-5 h-5 text-emerald-600 absolute left-4 top-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isHi ? "उदा. 'जिद', 'मोबाइल', 'बोलना', 'परीक्षा चिंता' लिखकर खोजें..." : "Search issues e.g. 'tantrum', 'screen addiction', 'speech delay', 'exam anxiety'..."}
            className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-white border border-emerald-200 text-xs sm:text-sm text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-3.5 p-1 rounded-full hover:bg-slate-100 text-slate-400"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>

      {/* CATEGORY & AGE GROUP FILTER PILLS */}
      <div className="space-y-2">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
          {isHi ? 'श्रेणी और आयु वर्ग द्वारा फ़िल्टर करें:' : 'Filter By Developmental Stage or Topic:'}
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {FAQ_CATEGORY_FILTERS.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-2 border ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-102'
                    : 'bg-white text-slate-700 hover:bg-emerald-50 border-slate-200'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{isHi ? cat.labelHi : cat.labelEn}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* CLEAR RESULTS FEED */}
      <div className="space-y-4">
        {filteredFaqs.length === 0 ? (
          <div className="glass-card p-12 text-center rounded-3xl text-slate-500 text-sm space-y-3 bg-white border border-slate-200">
            <div className="text-3xl">🔍</div>
            <div className="font-bold text-slate-800">
              {isHi ? 'कोई मेल खाती समस्या नहीं मिली' : 'No matching guidance found'}
            </div>
            <p className="text-xs text-slate-500">
              {isHi ? 'कृपया अलग शब्द खोजें या फ़िल्टर रीसेट करें।' : 'Try searching with different keywords or reset your filter.'}
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setShowFavoritesOnly(false); }}
              className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isExpanded = expandedId === faq.id;
            const isFav = favorites.includes(faq.id);
            const questionText = isHi ? faq.questionHi : faq.questionEn;
            const answerText = isHi ? faq.answerHi : faq.answerEn;

            return (
              <div
                key={faq.id}
                className={`bg-white rounded-3xl transition-all duration-200 border ${
                  isExpanded ? 'border-emerald-500 ring-2 ring-emerald-500/20 shadow-md' : 'border-slate-200 hover:border-emerald-300'
                }`}
              >
                {/* Card Header Bar */}
                <div
                  onClick={() => setExpandedId(isExpanded ? null : faq.id)}
                  className="p-6 cursor-pointer flex items-start justify-between gap-4"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-[11px] font-extrabold flex items-center space-x-1">
                        <Sparkles className="w-3 h-3 text-emerald-600" />
                        <span>{isHi ? faq.categoryHi : faq.category}</span>
                      </span>

                      <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-[11px] font-extrabold">
                        {faq.ageTag}
                      </span>
                    </div>

                    <h2 className="text-base sm:text-xl font-extrabold text-slate-900 leading-snug">
                      {questionText}
                    </h2>
                  </div>

                  {/* Actions: Favorite, Share, Expand toggle */}
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <button
                      onClick={(e) => handleToggleFavorite(faq.id, e)}
                      className={`p-2.5 rounded-2xl transition-colors ${
                        isFav ? 'bg-rose-100 text-rose-600' : 'bg-slate-100 text-slate-400 hover:text-rose-500'
                      }`}
                      title="Bookmark Article"
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-600' : ''}`} />
                    </button>

                    <button
                      onClick={(e) => handleShare(faq, e)}
                      className="p-2.5 rounded-2xl bg-slate-100 text-slate-500 hover:text-emerald-700 transition-colors"
                      title="Share Article Link"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>

                    <button className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-800">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* EXPANDED HIGH-IMPACT CLINICAL GUIDANCE & PARENT ACTION STEPS */}
                {isExpanded && (
                  <div className="px-6 pb-6 pt-2 space-y-6 border-t border-slate-100 animate-in fade-in duration-150">
                    
                    {/* Clinical Takeaway Box */}
                    <div className="p-6 rounded-2xl bg-emerald-50/90 border border-emerald-200 text-xs sm:text-sm text-slate-800 leading-relaxed space-y-3">
                      <div className="flex items-center space-x-2 text-xs font-black text-emerald-900 uppercase tracking-wider">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>{isHi ? '🩺 विशेषज्ञों द्वारा प्रमाणित मार्गदर्शन:' : '🩺 Board-Certified Clinical Guidance:'}</span>
                      </div>

                      <div className="text-slate-800 font-medium leading-relaxed whitespace-pre-line">
                        {answerText}
                      </div>
                    </div>

                    {/* Recommended Home Action Steps */}
                    <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200/80 space-y-2 text-xs">
                      <div className="flex items-center space-x-2 text-amber-900 font-extrabold uppercase tracking-wider">
                        <Lightbulb className="w-4 h-4 text-amber-600" />
                        <span>{isHi ? '💡 माता-पिता के लिए 3 व्यावहारिक कदम:' : '💡 3 Recommended Action Steps for Parents:'}</span>
                      </div>
                      <ul className="list-disc pl-5 space-y-1 text-slate-700 font-medium">
                        <li>{isHi ? 'शांत वातावरण बनाएं और बच्चे पर तुरंत गुस्सा न करें।' : 'Maintain a non-confrontational, calm tone when discussing triggers.'}</li>
                        <li>{isHi ? 'स्पष्ट दिनचर्या तय करें और प्रशंसा द्वारा सकारात्मक आदतों को प्रोत्साहित करें।' : 'Establish a visual routine chart and reward small daily progress.'}</li>
                        <li>{isHi ? 'यदि समस्या लगातार बनी रहे तो हमारे बाल रोग मनोवैज्ञानिक से ऑनलाइन बात करें।' : 'If anxiety or behavior persists, schedule a confidential session with a pediatric specialist.'}</li>
                      </ul>
                    </div>

                    {/* Integrated Comments Thread */}
                    <div className="space-y-4 pt-2">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center space-x-1.5">
                        <MessageSquare className="w-4 h-4 text-emerald-600" />
                        <span>{isHi ? `समुदाय की बातचीत व अनुभव (${faq.comments.length})` : `Parent Community Discussion (${faq.comments.length})`}</span>
                      </h3>

                      {faq.comments.length === 0 ? (
                        <p className="text-xs text-slate-400 italic">No comments yet. Share your experience or questions below!</p>
                      ) : (
                        <div className="space-y-3">
                          {faq.comments.map((comment) => {
                            const cText = isHi ? comment.textHi : comment.textEn;
                            return (
                              <div key={comment.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-2">
                                    <img src={comment.avatar} className="w-6 h-6 rounded-full object-cover border border-slate-300" />
                                    <span className="text-xs font-bold text-slate-900">{comment.author}</span>
                                    {comment.isExpert && (
                                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[9px] font-bold flex items-center space-x-1">
                                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                                        <span>Verified Doctor</span>
                                      </span>
                                    )}
                                  </div>
                                  <span className="text-[10px] text-slate-400">{comment.createdAt}</span>
                                </div>
                                <p className="text-xs text-slate-700 pl-8 leading-relaxed font-medium">{cText}</p>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* Add Comment Form */}
                      <form
                        onSubmit={(e) => handleAddComment(faq.id, e)}
                        className="flex items-center space-x-2 pt-2"
                      >
                        <input
                          type="text"
                          value={commentInputMap[faq.id] || ''}
                          onChange={(e) => setCommentInputMap({ ...commentInputMap, [faq.id]: e.target.value })}
                          placeholder={isHi ? "अपनी टिप्पणी या सवाल लिखें..." : "Share your experience or ask a question..."}
                          className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                        <button
                          type="submit"
                          disabled={!commentInputMap[faq.id]?.trim()}
                          className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center space-x-1 disabled:opacity-50"
                        >
                          <span>{isHi ? 'पोस्ट करें' : 'Post Comment'}</span>
                          <Send className="w-3 h-3" />
                        </button>
                      </form>

                    </div>

                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

    </section>
  );
}
