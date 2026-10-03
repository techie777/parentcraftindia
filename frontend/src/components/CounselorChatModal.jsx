import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { 
  X, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Video, 
  RefreshCw, 
  ThumbsUp, 
  ArrowRight,
  ArrowLeft,
  Calendar,
  MessageSquare
} from 'lucide-react';

export const COUNSELOR_PRESETS = [
  {
    id: 'dr_ananya',
    name: 'Dr. Ananya Roy',
    roleEn: 'Senior Pediatric Neurologist & Child Specialist',
    roleHi: 'वरिष्ठ बाल रोग विशेषज्ञ व न्यूरोलॉजिस्ट',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80',
    hospital: 'Max Healthcare & Child Clinic'
  },
  {
    id: 'dr_sameer',
    name: 'Dr. Sameer Sen',
    roleEn: 'Adolescent & Child Clinical Psychologist',
    roleHi: 'किशोर व बाल क्लिनिकल मनोवैज्ञानिक',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
    hospital: 'MindCare Child Research Institute'
  }
];

export const QUICK_COUNSEL_RESPONSES = {
  screen: {
    en: {
      counselor: COUNSELOR_PRESETS[0],
      answer: `Screen addiction in 3-12 year olds stems from rapid dopamine spikes offered by interactive games. 
      To enforce healthy digital hygiene:
      1. **Never use screens as an emotional reward or sedative.**
      2. **Create screen-free physical sanctuary zones** (bedrooms and dining tables).
      3. **Use visual timers** so the child can watch time elapsing without feeling abrupt shock.
      4. **Pair screen exit with a high-engagement alternative:** "When the screen sleeps, we get to go pick colored chalks for our balcony drawing board!"`,
      takeaways: [
        'Device charging station outside bedrooms overnight',
        'Visual sand timer for transition transparency',
        'Co-play for 10 minutes before asking to turn off'
      ]
    },
    hi: {
      counselor: COUNSELOR_PRESETS[0],
      answer: `3-12 वर्ष के बच्चों में स्क्रीन की लत खेलों द्वारा दिए जाने वाले त्वरित डोपामाइन के कारण होती है।
      स्वस्थ डिजिटल स्वच्छता लागू करने के लिए:
      1. **कभी भी स्क्रीन का उपयोग भावनात्मक इनाम के रूप में न करें।**
      2. **स्क्रीन-मुक्त क्षेत्र बनाएं** (बेडरूम और डाइनिंग टेबल)।
      3. **विजुअल टाइमर का उपयोग करें** ताकि बच्चा बिना झटके के समय को बीतते देख सके।
      4. **स्क्रीन बंद करने को पसंदीदा गतिविधि के साथ जोड़ें।**`,
      takeaways: [
        'रात में बेडरूम के बाहर डिवाइस चार्जिंग स्टेशन रखें',
        'संक्रमण की पारदर्शिता के लिए रेत का टाइमर',
        'स्क्रीन बंद करने से पहले 10 मिनट साथ खेलें'
      ]
    }
  },

  speech: {
    en: {
      counselor: COUNSELOR_PRESETS[0],
      answer: `Delayed speech at 24 months requires gentle structured language stimulation rather than panic:
      1. **Narrate daily activities out loud:** "Now we are putting on our yellow socks!"
      2. **Avoid answering for your child instantly** when they point at objects; give them 5 seconds to attempt the vocal sound.
      3. **Read interactive picture books** daily, pointing at animals and imitating sounds together.
      4. **Schedule an Audiology & Speech screening** if the child has fewer than 10 clear words by age 2.`,
      takeaways: [
        'Narrate daily routines with rich simple vocabulary',
        'Pause 5 seconds to let child attempt words',
        'Limit screen exposure under 2 years to protect language centers'
      ]
    },
    hi: {
      counselor: COUNSELOR_PRESETS[0],
      answer: `24 महीने की उम्र में बोलने में देरी होने पर घबराने के बजाय संरचित भाषा प्रोत्साहन की आवश्यकता होती है:
      1. **दैनिक गतिविधियों का जोर से वर्णन करें:** "अब हम पीले मोज़े पहन रहे हैं!"
      2. **जब बच्चा वस्तुओं की ओर इशारा करे तो तुरंत जवाब न दें**; उन्हें आवाज़ निकालने के लिए 5 सेकंड दें।
      3. **प्रतिदिन चित्र पुस्तकें पढ़ें** और साथ में जानवरों की आवाज़ों की नकल करें।
      4. यदि 2 वर्ष की आयु तक 10 से कम स्पष्ट शब्द हों तो **स्पीच स्क्रीनर से परामर्श लें।**`,
      takeaways: [
        'सरल शब्दावली के साथ दैनिक दिनचर्या का वर्णन करें',
        'बच्चे को शब्द बोलने देने के लिए 5 सेकंड रुकें',
        'भाषा केंद्रों की सुरक्षा के लिए 2 वर्ष से कम उम्र में स्क्रीन सीमित करें'
      ]
    }
  },

  behavioral: {
    en: {
      counselor: COUNSELOR_PRESETS[1],
      answer: `Meltdowns occur when a child's underdeveloped prefrontal cortex experiences emotional overload.
      1. **Co-regulate before disciplining:** Lower your body height to eye level, keep your tone quiet and calm.
      2. **Validate the emotion without yielding to the boundary:** "I see you are angry because we cannot buy this toy. It is okay to feel angry, but it is not okay to hit."
      3. **Use gentle physical touch** (a warm hug or holding hands) if the child allows.`,
      takeaways: [
        'Eye-level quiet vocal tone calms nervous system',
        'Name the feeling explicitly to build emotional vocabulary',
        'Avoid public shaming or angry lectures during meltdown'
      ]
    },
    hi: {
      counselor: COUNSELOR_PRESETS[1],
      answer: `भावनात्मक अतिप्रवाह के कारण नखरे और गुस्सा आते हैं।
      1. **सख्त होने से पहले शांत करें:** बच्चे के नेत्र स्तर पर आएं, शांत स्वर रखें।
      2. **सीमाएं बनाए रखते हुए भावना को स्वीकार करें:** "मैं समझता हूँ कि आप गुस्सा हैं, लेकिन मारना ठीक नहीं है।"
      3. **सहानुभूतिपूर्ण स्पर्श** (गले लगाना या हाथ पकड़ना) का उपयोग करें।`,
      takeaways: [
        'शांत आवाज बच्चे के तंत्रिका तंत्र को स्थिर करती है',
        'भावनाओं को नाम देना सिखाएं',
        'गुस्से के दौरान डांटने या सार्वजनिक शर्मिंदगी से बचें'
      ]
    }
  }
};

export default function CounselorChatModal({ isOpen, onClose, initialQuery, onBookCounselor }) {
  const { lang, t } = useLanguage();
  const { user } = useAuth();
  
  const [messages, setMessages] = useState([]);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      const selectedCounselor = COUNSELOR_PRESETS[0];
      const welcomeMsg = {
        id: 'msg_welcome',
        sender: 'counselor',
        counselor: selectedCounselor,
        text: lang === 'hi'
          ? `नमस्ते ${user?.name || 'अभिभावक'}! मैं डॉ. अनन्या रॉय हूँ। आप आज किस बाल विकास या व्यवहार संबंधी चुनौती पर परामर्श प्राप्त करना चाहते हैं?`
          : `Hello ${user?.name || 'Parent'}! I am Dr. Ananya Roy. What developmental or behavioral parenting challenge would you like guidance on today?`,
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages([welcomeMsg]);

      // If initialized with specific query from ProblemAreasHub
      if (initialQuery?.queryText) {
        handleUserSend(initialQuery.queryText, initialQuery.categoryId);
      }
    }
  }, [isOpen, initialQuery, lang]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isOpen) return null;

  const handleUserSend = (textToSend, categoryKey = 'screen') => {
    const qText = textToSend || inputQuery;
    if (!qText.trim()) return;

    const userMsg = {
      id: `msg_u_${Date.now()}`,
      sender: 'user',
      text: qText,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputQuery('');
    setIsTyping(true);

    // Simulate real-time clinical response formulation
    setTimeout(() => {
      let key = 'screen';
      const qLower = qText.toLowerCase();
      if (qLower.includes('speech') || qLower.includes('बोल') || qLower.includes('भाषा') || categoryKey === 'speech') {
        key = 'speech';
      } else if (qLower.includes('tantrum') || qLower.includes('meltdown') || qLower.includes('गुस्सा') || qLower.includes('मार') || categoryKey === 'behavioral') {
        key = 'behavioral';
      }

      const counselData = QUICK_COUNSEL_RESPONSES[key][lang] || QUICK_COUNSEL_RESPONSES['screen']['en'];

      const botReply = {
        id: `msg_c_${Date.now()}`,
        sender: 'counselor',
        counselor: counselData.counselor,
        text: counselData.answer,
        takeaways: counselData.takeaways,
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setIsTyping(false);
      setMessages(prev => [...prev, botReply]);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#FAF8FF] sm:bg-slate-900/60 sm:backdrop-blur-md flex items-center justify-center p-0 sm:p-4 overflow-hidden animate-in fade-in duration-150">
      
      {/* 
        FULL SCREEN ON MOBILE (h-[100dvh] w-full rounded-none border-0)
        ELEGANT MODAL ON TABLET / DESKTOP (sm:max-w-2xl sm:h-[85vh] sm:rounded-3xl sm:border)
      */}
      <div className="bg-white w-full h-[100dvh] sm:h-[85vh] sm:max-h-[760px] sm:max-w-2xl sm:rounded-3xl flex flex-col shadow-2xl overflow-hidden border-0 sm:border sm:border-[#E4DFF7]">
        
        {/* =======================================================================
            HEADER (CLEAN LIGHT THEME WITH SAFE MOBILE BACK / CLOSE)
            ======================================================================= */}
        <div className="p-3.5 sm:p-5 border-b border-[#E4DFF7] flex items-center justify-between bg-gradient-to-r from-[#F0EBFF] via-white to-[#FAF8FF] flex-shrink-0">
          <div className="flex items-center space-x-2.5 sm:space-x-3 overflow-hidden">
            
            {/* Back button on mobile */}
            <button
              onClick={onClose}
              className="sm:hidden p-1.5 rounded-full hover:bg-[#eae5ff] text-[#1A1540] transition-colors cursor-pointer mr-0.5"
              title="Close chat"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div className="relative flex-shrink-0">
              <img
                src={COUNSELOR_PRESETS[0].avatar}
                alt={COUNSELOR_PRESETS[0].name}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover border-2 border-[#5B48D6] shadow-sm"
              />
              <span className="w-3 h-3 rounded-full bg-emerald-500 border-2 border-white absolute bottom-0 right-0 shadow-xs" />
            </div>

            <div className="overflow-hidden">
              <div className="flex items-center space-x-1.5">
                <h3 className="text-sm sm:text-base font-bold text-[#1A1540] truncate">{COUNSELOR_PRESETS[0].name}</h3>
                <CheckCircle2 className="w-4 h-4 text-[#126D55] flex-shrink-0" />
              </div>
              <p className="text-[11px] sm:text-xs text-[#5B48D6] font-medium truncate">
                {lang === 'hi' ? COUNSELOR_PRESETS[0].roleHi : COUNSELOR_PRESETS[0].roleEn}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1.5 flex-shrink-0">
            {/* Direct book shortcut in header on mobile */}
            <button
              onClick={() => { onClose(); onBookCounselor(); }}
              className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#5B48D6] hover:bg-[#4F3DBD] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              <Video className="w-3.5 h-3.5" />
              <span>{lang === 'hi' ? 'सत्र बुक करें' : 'Book Session'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-full hover:bg-[#eae5ff] text-[#5E5A80] hover:text-[#1A1540] transition-colors cursor-pointer"
              title="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* =======================================================================
            CHAT MESSAGES SCROLL AREA
            ======================================================================= */}
        <div className="flex-1 p-3.5 sm:p-6 overflow-y-auto space-y-3.5 sm:space-y-4 bg-[#FAF8FF]">
          
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start space-x-2.5 sm:space-x-3 ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
            >
              {msg.sender === 'counselor' && (
                <img 
                  src={msg.counselor.avatar} 
                  alt={msg.counselor.name} 
                  className="w-8 h-8 rounded-full object-cover flex-shrink-0 border border-[#E4DFF7] shadow-xs mt-1" 
                />
              )}

              <div className={`max-w-[88%] sm:max-w-[82%] p-3.5 sm:p-4 space-y-2.5 ${
                msg.sender === 'user'
                  ? 'bg-[#5B48D6] text-white font-medium text-xs sm:text-sm rounded-2xl rounded-tr-xs shadow-sm'
                  : 'bg-white text-[#1A1540] border border-[#E4DFF7] text-xs sm:text-sm rounded-2xl rounded-tl-xs shadow-xs'
              }`}>
                <p className="leading-relaxed whitespace-pre-line">{msg.text}</p>

                {/* Clinical Key Takeaway Box */}
                {msg.takeaways && (
                  <div className="p-3 rounded-xl bg-[#BDEBDD]/30 border border-[#BDEBDD] text-[#00533F] space-y-1.5 mt-2">
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#126D55] flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>{lang === 'hi' ? 'मुख्य नैदानिक सुझाव:' : 'Key Clinical Takeaways:'}</span>
                    </h4>
                    <ul className="space-y-1">
                      {msg.takeaways.map((takeaway, idx) => (
                        <li key={idx} className="text-xs flex items-start space-x-1.5">
                          <span className="font-bold">•</span>
                          <span>{takeaway}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className={`text-[10px] text-right ${msg.sender === 'user' ? 'text-white/70' : 'text-[#5E5A80]'}`}>
                  {msg.createdAt}
                </div>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-center space-x-2 text-xs text-[#5B48D6] italic font-medium p-2 bg-white/70 rounded-xl inline-flex border border-[#E4DFF7] shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>{lang === 'hi' ? 'डॉ. रॉय उत्तर तैयार कर रही हैं...' : 'Dr. Roy is formulating clinical guidance...'}</span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* =======================================================================
            QUICK REPLY CHIPS BAR (HORIZONTALLY SCROLLABLE ON MOBILE)
            ======================================================================= */}
        <div className="px-3 sm:px-6 py-2 bg-[#F6F1FF] border-t border-[#E4DFF7] flex items-center space-x-2 overflow-x-auto no-scrollbar flex-shrink-0">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#5E5A80] whitespace-nowrap">
            {lang === 'hi' ? 'त्वरित प्रश्न:' : 'Quick Queries:'}
          </span>
          <button
            type="button"
            onClick={() => handleUserSend(lang === 'hi' ? '20 मिनट की आईपैड सीमा कैसे तय करें?' : 'How to set 20-min iPad limit without tantrums?')}
            className="px-3 py-1 rounded-full bg-white text-[#2A2461] text-xs font-semibold hover:bg-[#F0EBFF] hover:text-[#5B48D6] border border-[#E4DFF7] whitespace-nowrap shadow-2xs transition-colors cursor-pointer"
          >
            📱 {lang === 'hi' ? 'स्क्रीन टाइम सीमा' : 'Screen Time Limit'}
          </button>
          <button
            type="button"
            onClick={() => handleUserSend(lang === 'hi' ? 'क्या 24 महीने में बोलने में देरी होना सामान्य है?' : 'Is speech delay normal at 24 months?')}
            className="px-3 py-1 rounded-full bg-white text-[#2A2461] text-xs font-semibold hover:bg-[#F0EBFF] hover:text-[#5B48D6] border border-[#E4DFF7] whitespace-nowrap shadow-2xs transition-colors cursor-pointer"
          >
            🗣️ {lang === 'hi' ? 'बोलने में देरी' : 'Speech Delay'}
          </button>
          <button
            type="button"
            onClick={() => handleUserSend(lang === 'hi' ? 'बच्चा गुस्सा आने पर मारता या काटता है' : 'Child bites or hits when angry')}
            className="px-3 py-1 rounded-full bg-white text-[#2A2461] text-xs font-semibold hover:bg-[#F0EBFF] hover:text-[#5B48D6] border border-[#E4DFF7] whitespace-nowrap shadow-2xs transition-colors cursor-pointer"
          >
            🧠 {lang === 'hi' ? 'जिद और गुस्सा' : 'Tantrum Control'}
          </button>
        </div>

        {/* =======================================================================
            CHAT INPUT & 1-ON-1 CONSULTATION CTA FOOTER (SAFE-AREA OPTIMIZED)
            ======================================================================= */}
        <div className="p-3 sm:p-4 border-t border-[#E4DFF7] bg-white space-y-2.5 flex-shrink-0">
          
          <form
            onSubmit={(e) => { e.preventDefault(); handleUserSend(); }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder={lang === 'hi' ? 'काउंसलर से पूछें...' : 'Ask counselor a question...'}
              className="flex-1 px-4 py-2.5 sm:py-3 rounded-xl bg-[#F6F1FF] border border-[#E4DFF7] text-xs sm:text-sm text-[#1A1540] placeholder-[#5E5A80] focus:outline-none focus:ring-2 focus:ring-[#5B48D6]"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim()}
              className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-[#5B48D6] hover:bg-[#4F3DBD] text-white text-xs sm:text-sm font-bold flex items-center space-x-1.5 disabled:opacity-40 transition-all cursor-pointer shadow-xs"
            >
              <span>{lang === 'hi' ? 'भेजें' : 'Send'}</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* 1-on-1 Direct Booking Callout Bar */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
            <span className="text-xs text-emerald-950 font-bold truncate pr-2">
              {lang === 'hi' ? 'डॉ. अनन्या रॉय से 1-ऑन-1 व्यक्तिगत परामर्श लें' : 'Speak with Dr. Ananya Roy directly'}
            </span>
            <button
              type="button"
              onClick={() => { onClose(); onBookCounselor(); }}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center space-x-1.5 flex-shrink-0 shadow-xs transition-colors cursor-pointer"
            >
              <Video className="w-3.5 h-3.5" />
              <span>{lang === 'hi' ? 'सत्र बुक करें' : 'Book Session Now'}</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
