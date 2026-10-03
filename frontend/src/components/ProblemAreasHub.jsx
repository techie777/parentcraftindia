import React, { useState, useMemo, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Sparkles, MessageSquare, ShieldCheck, Search, Filter, 
  ArrowRight, Video, CheckCircle2, ChevronRight, ChevronLeft, 
  X, Heart, Share2, PhoneCall, Check, BookOpen, Layers
} from 'lucide-react';

export const PROBLEM_CARD_CATEGORIES = [
  {
    id: 'school',
    tabKey: 'school',
    labelEn: 'Selection of schools',
    labelHi: 'स्कूल का चयन',
    icon: '🏫',
    questions: [
      {
        id: 'school_q1',
        qNum: 'Q1',
        titleEn: "How do I choose a 'good' school for my child's education?",
        titleHi: "अपने बच्चे की शिक्षा के लिए 'अच्छा' स्कूल कैसे चुनें?",
        snippetEn: "First you have to be aware of what should your child be getting from a school that will help them succeed. Look beyond flashy infrastructure and topper board hoardings...",
        snippetHi: "सबसे पहले आपको यह समझना होगा कि बच्चे को स्कूल से क्या मिलना चाहिए। सिर्फ बड़ी इमारतों और विज्ञापनों के बजाय शिक्षकों के व्यवहार और माहौल पर ध्यान दें...",
        fullAnswerEn: "First you have to be aware of what your child should be getting from an educational environment. Look beyond flashy infrastructure and board topper hoardings. Evaluate teacher-student ratio, emotional support policies, emphasis on sports/arts, and whether the school culture nurtures curiosity or relies on high-stakes fear. Observe how teachers speak with students during breaks and ask whether qualified counselor support is readily accessible.",
        fullAnswerHi: "सर्वप्रथम यह समझें कि स्कूल बच्चे के सर्वांगीण विकास में कैसे सहायक होगा। सिर्फ भव्य इमारतों और 10वीं/12वीं के टॉपर्स के विज्ञापनों पर न जाएं। शिक्षक-छात्र अनुपात, खेलकूद व कला को मिलने वाले महत्व, और स्कूल में बच्चों की मानसिक सेहत व काउंसलिंग सुविधा की उपलब्धता की जांच करें।"
      },
      {
        id: 'school_q2',
        qNum: 'Q2',
        titleEn: "Can I find out if a particular school is better or worse than others for my child?",
        titleHi: "क्या मैं जान सकता हूँ कि कोई स्कूल मेरे बच्चे के लिए दूसरों से बेहतर है या नहीं?",
        snippetEn: "Whatever may the advertised image, the fee level or size of buildings, look for how teachers interact with students in corridors and classrooms...",
        snippetHi: "विज्ञापित छवि या फीस चाहे जो भी हो, यह देखें कि शिक्षक छात्रों के साथ कैसा व्यवहार करते हैं। स्कूल का सफर और बच्चे की नींद भी बहुत महत्वपूर्ण है...",
        fullAnswerEn: "Whatever may be the advertised image, the fee level, or size of buildings, observe how teachers interact with students in corridors. Speak to current parents of varying academic grades, check how the school accommodates learning differences (ADHD, Dyslexia), and assess commute times. A supportive school 15 minutes away where your child gets adequate sleep often far outperforms a high-pressure school with a 90-minute commute.",
        fullAnswerHi: "स्कूल की फीस या इमारतों से अधिक महत्वपूर्ण यह है कि शिक्षक बच्चों के साथ कैसे पेश आते हैं। अलग-अलग कक्षाओं के अभिभावकों से बात करें। यह भी देखें कि स्कूल सीखने में कठिनाई (जैसे डिस्लेक्सिया या एडीएचडी) वाले बच्चों की कैसे मदद करता है। घर के पास का स्कूल जहाँ बच्चा भरपूर नींद ले सके, 90 मिनट दूर वाले स्कूल से बेहतर साबित होता है।"
      },
      {
        id: 'school_q3',
        qNum: 'Q3',
        titleEn: "How do I prepare my child for transitioning to a new school or board (CBSE vs ICSE vs IB)?",
        titleHi: "बच्चे को नए स्कूल या नए शिक्षा बोर्ड में जाने के लिए कैसे तैयार करें?",
        snippetEn: "Transitioning schools triggers real separation anxiety and identity shifts. Visit the new campus together beforehand and maintain steady home routines...",
        snippetHi: "नया स्कूल या बोर्ड बदलने से बच्चे में चिंता हो सकती है। पहले से स्कूल परिसर दिखाएं और घर का माहौल स्थिर रखें...",
        fullAnswerEn: "Transitioning schools triggers natural separation anxiety and social hesitation. Visit the new campus together beforehand, establish predictable morning routines, validate their fears of making new friends without dismissing them, and coordinate with the class teacher during the first 2 weeks. Give your child 3 to 6 months to adapt socially before worrying about minor grade fluctuations.",
        fullAnswerHi: "स्कूल बदलना बच्चों के लिए एक बड़ा बदलाव होता है। नए स्कूल जाने से पहले बच्चे को परिसर दिखाएं, समय पर सोने-जागने की दिनचर्या बनाएं और दोस्त बनाने की उनकी घबराहट को समझें। पहले 2 हफ्तों में क्लास टीचर से संपर्क में रहें और नए माहौल में ढलने के लिए बच्चे को 3 से 6 महीने का समय दें।"
      }
    ]
  },
  {
    id: 'definitions',
    tabKey: 'definitions',
    labelEn: 'Important Definitions',
    labelHi: 'महत्वपूर्ण परिभाषाएं',
    icon: '💡',
    questions: [
      {
        id: 'def_q1',
        qNum: 'Q1',
        titleEn: "What is the clinical difference between ADHD and normal high energy in young kids?",
        titleHi: "छोटे बच्चों में सामान्य चंचलता और एडीएचडी (ADHD) में क्या अंतर है?",
        snippetEn: "High-energy children can sustain deep focus during activities they enjoy (LEGO, outdoor sports). Children with ADHD experience neurological dysregulation...",
        snippetHi: "ऊर्जावान बच्चे अपनी पसंद के काम (जैसे लेगो, खेल) में पूरा ध्यान लगाते हैं। लेकिन एडीएचडी में ध्यान और आवेग पर नियंत्रण हर जगह मुश्किल होता है...",
        fullAnswerEn: "High-energy children can sustain deep focus during activities they enjoy (LEGO, outdoor play, art). Children with ADHD experience neurological dysregulation in working memory, sustained attention, and impulse control across multiple settings (both home and school). If inattention causes chronic academic struggle or emotional meltdowns across environments, an RCI clinical evaluation is recommended.",
        fullAnswerHi: "सामान्य चंचल बच्चे अपने पसंदीदा खेल या ड्राइंग में लंबे समय तक ध्यान लगा सकते हैं। इसके विपरीत, एडीएचडी से प्रभावित बच्चों में ध्यान केंद्रित करने और उतावलेपन पर नियंत्रण रखने में घर और स्कूल दोनों जगह लगातार कठिनाई होती है।"
      },
      {
        id: 'def_q2',
        qNum: 'Q2',
        titleEn: "What are the key speech and language milestones between 18 months and 3 years?",
        titleHi: "18 महीने से 3 साल के बच्चों में बोलने के मुख्य पड़ाव क्या हैं?",
        snippetEn: "By 18 months: 10–20 single words and pointing. By 24 months: 50+ words and spontaneous 2-word combinations ('want water', 'papa come')...",
        snippetHi: "18 महीने पर 10-20 शब्द और इशारा करना; 24 महीने पर 50 से अधिक शब्द और दो शब्दों के छोटे वाक्य बोलना सामान्य विकास है...",
        fullAnswerEn: "By 18 months, a child should use 10–20 single words and point to express wants. By 24 months, they should speak 50+ single words and create spontaneous 2-word phrases ('want water', 'papa come'). By 36 months, speech should be 75% intelligible to strangers. If words decrease or gestures are absent, consult a certified speech therapist early.",
        fullAnswerHi: "18 महीने में बच्चे को 10-20 शब्द बोलने और उंगली से इशारा करने में सक्षम होना चाहिए। 24 महीने तक 50+ शब्द और दो शब्दों के वाक्य ('दूध दो', 'मम्मी आओ') बोलने चाहिए। यदि 24 महीने पर बच्चा 15 से कम शब्द बोलता है या नजरें नहीं मिलाता, तो स्पीच थेरेपिस्ट से जांच करानी चाहिए।"
      },
      {
        id: 'def_q3',
        qNum: 'Q3',
        titleEn: "How do psychologists define normal exam stress vs clinical childhood anxiety?",
        titleHi: "सामान्य परीक्षा तनाव और गंभीर चिंता (Anxiety) में क्या अंतर है?",
        snippetEn: "Mild nervous butterflies before a test is a natural adaptive response. It crosses into clinical anxiety when it causes somatic illnesses...",
        snippetHi: "परीक्षा से पहले हल्की घबराहट सामान्य है। लेकिन जब यह पेट दर्द, सिरदर्द, उल्टी या स्कूल न जाने की जिद में बदल जाए तो यह चिंता का संकेत है...",
        fullAnswerEn: "Mild nervous butterflies before a test is a natural adaptive response that sharpens focus. It crosses into clinical anxiety when it causes somatic illnesses (morning nausea, unexplainable stomach cramps), severe panic attacks, hyperventilation, insomnia, or school refusal lasting longer than two weeks.",
        fullAnswerHi: "परीक्षा से पहले हल्की चिंता स्वाभाविक है। लेकिन अगर बच्चा परीक्षा के नाम पर रोज सुबह पेट दर्द, उल्टी, घबराहट, रोना या सोने में परेशानी महसूस करे और यह 2 हफ्ते से अधिक चले, तो यह क्लिनिकल एंग्जायटी का संकेत हो सकता है।"
      }
    ]
  },
  {
    id: 'academic',
    tabKey: 'academic',
    labelEn: 'Academic & Failure',
    labelHi: 'अकादमिक और परीक्षा का डर',
    icon: '📚',
    questions: [
      {
        id: 'acad_q1',
        qNum: 'Q1',
        titleEn: "Why does my child freeze during exam papers despite thorough revision at home?",
        titleHi: "घर पर याद होने के बावजूद बच्चा परीक्षा हॉल में सब कुछ क्यों भूल जाता है?",
        snippetEn: "Exam freezing is an involuntary sympathetic fight-or-flight freeze reflex triggered by fear of parental disappointment or time panic...",
        snippetHi: "परीक्षा में सब भूल जाना डर या माता-पिता की नाराजगी के दबाव से उपजी 'फ्रीज' प्रतिक्रिया है। घर पर समय सीमा के साथ अभ्यास कराएं...",
        fullAnswerEn: "Exam freezing is an involuntary sympathetic fight-or-flight freeze reflex triggered by high perceived stakes or fear of disappointment. The thinking prefrontal cortex temporarily shuts down under acute stress. Help your child practice timed mock papers in cozy conditions, teach 4-7-8 physiological box breathing, and explicitly tell them that parental love is unconditional regardless of marks.",
        fullAnswerHi: "परीक्षा में अचानक सब भूल जाना अत्यधिक तनाव के कारण दिमाग की 'फ्रीज' प्रतिक्रिया है। बच्चों को घर पर समय देखकर शांत माहौल में मॉक टेस्ट का अभ्यास कराएं, गहरी सांस लेने की तकनीक सिखाएं और यह भरोसा दें कि परीक्षा के अंक उनके प्रति आपके प्यार को नहीं बदलते।"
      },
      {
        id: 'acad_q2',
        qNum: 'Q2',
        titleEn: "My child gives up quickly whenever homework or math gets difficult. How do I build grit?",
        titleHi: "कठिन सवाल आने पर बच्चा तुरंत हाथ क्यों खड़े कर देता है? उसमें धैर्य कैसे बढ़ाएं?",
        snippetEn: "Children who give up quickly often internalize a fixed mindset—fearing that struggling means they lack intelligence. Shift praise to effort...",
        snippetHi: "बच्चे अक्सर सोचते हैं कि कठिन काम न कर पाना उनकी कमजोरी है। बच्चे की बुद्धिमत्ता के बजाय उसके प्रयासों की तारीफ करें...",
        fullAnswerEn: "Children who give up quickly often internalize a fixed mindset—fearing that struggling means they lack intelligence. Shift your praise from outcomes ('You are so smart!') to specific effort ('I love how you tried 3 different ways to solve that problem!'). Break complex tasks into 15-minute sprints followed by 3-minute physical movement breaks.",
        fullAnswerHi: "बच्चे अक्सर यह मान लेते हैं कि अगर सवाल नहीं आ रहा तो वे कमजोर हैं। अंकों के बजाय उनके प्रयास की सराहना करें: 'मुझे खुशी है कि तुमने इसे 3 बार हल करने की कोशिश की।' कठिन होमवर्क को 15-15 मिनट के छोटे हिस्सों में बांटें।"
      },
      {
        id: 'acad_q3',
        qNum: 'Q3',
        titleEn: "How should parents react to a report card with unexpected low marks?",
        titleHi: "अपेक्षा से कम अंक आने पर माता-पिता को कैसे प्रतिक्रिया देनी चाहिए?",
        snippetEn: "Take a 30-minute cooling pause before initiating conversation. Yelling creates emotional shame and drives children to lie or hide future marks...",
        snippetHi: "गुस्से में तुरंत न डांटें। 30 मिनट शांत होने के बाद बात करें। डांटने से बच्चा अगली बार रिपोर्ट कार्ड छिपाने लगता है...",
        fullAnswerEn: "Take a 30-minute cooling pause before initiating conversation. Yelling creates emotional shame and drives children to lie or hide future marks. Sit down with a calm snack, validate that exams are challenging, and ask constructive questions: 'Which chapters felt confusing? How can we plan revision together so you feel confident next time?'",
        fullAnswerHi: "कम अंक देखकर तुरंत चिल्लाने या ताने देने से बचें। इससे बच्चे के मन में अपराधबोध आता है और वह भविष्य में अंक छिपाने लगता है। शांति से बैठें और पूछें: 'कौन सा विषय कठिन लगा? हम दोनों मिलकर इसे कैसे सुधार सकते हैं?'"
      }
    ]
  },
  {
    id: 'screen',
    tabKey: 'screen',
    labelEn: 'Screen & Gaming',
    labelHi: 'स्क्रीन व गेमिंग लत',
    icon: '📱',
    questions: [
      {
        id: 'scr_q1',
        qNum: 'Q1',
        titleEn: "How do I enforce a 45-minute screen limit without daily screaming matches?",
        titleHi: "बिना रोज-रोज के झगड़े के 45 मिनट की स्क्रीन सीमा कैसे तय करें?",
        snippetEn: "Screen meltdowns occur because video games provide a rapid dopamine stream. An abrupt shutdown causes an acute neurochemical dip...",
        snippetHi: "स्क्रीन छीनने पर गुस्सा इसलिए आता है क्योंकि गेम से डोपामाइन मिलता है। अचानक बंद करने के बजाय 5 और 2 मिनट पहले चेतावनी दें...",
        fullAnswerEn: "Screen meltdowns occur because video games provide continuous dopamine spikes. An abrupt shutdown causes an acute neurochemical dip that feels like panic or anger to a child. Use a visual sand timer, give calm 5-min and 2-min transition warnings, and always bridge to an engaging offline activity (drawing, cycling, snack) rather than demanding immediate chores.",
        fullAnswerHi: "मोबाइल और गेमिंग से बच्चों के मस्तिष्क में डोपामाइन का स्तर बढ़ता है। अचानक फोन छीनने पर उन्हें झटका लगता है। टाइमर का इस्तेमाल करें, 5 मिनट और 2 मिनट पहले शांत चेतावनी दें, और फोन बंद होते ही किसी पसंदीदा खेल या गतिविधि से जोड़ें।"
      },
      {
        id: 'scr_q2',
        qNum: 'Q2',
        titleEn: "Why does my child become aggressive when the phone or tablet is taken away?",
        titleHi: "फोन लेते ही बच्चा आक्रामक, जिद्दी और चीखने-चिल्लाने क्यों लगता है?",
        snippetEn: "Aggression during screen cutoff is an emotional dysregulation response to over-stimulation and dopamine deprivation...",
        snippetHi: "यह गुस्सा स्क्रीन के अत्यधिक उद्दीपन का परिणाम है। खुद शांत रहें, बेडरूम में फोन न ले जाने दें और घर के स्पष्ट नियम बनाएं...",
        fullAnswerEn: "Aggression during screen cutoff is an emotional dysregulation response to over-stimulation and dopamine deprivation. Stay calm and anchored—do not shout back. Keep devices charged in common areas (never in bedrooms), establish non-negotiable household rules before screens turn on, and lead by example with your own phone use.",
        fullAnswerHi: "स्क्रीन छीनने पर बच्चे का गुस्सा उसके मस्तिष्क के अति-उद्दीपन का परिणाम है। खुद शांत रहें और चिल्लाने के बदले न चिल्लाएं। घर के लिए पहले से स्पष्ट नियम तय करें और बच्चों के बेडरूम से फोन और टीवी पूरी तरह बाहर रखें।"
      }
    ]
  },
  {
    id: 'behavior',
    tabKey: 'behavior',
    labelEn: 'Tantrums & Anger',
    labelHi: 'जिद, मारना व गुस्सा',
    icon: '😤',
    questions: [
      {
        id: 'beh_q1',
        qNum: 'Q1',
        titleEn: "How should parents manage public meltdowns and tantrums in supermarkets or malls?",
        titleHi: "बाजार या रिश्तेदारों के सामने बच्चे के अत्यधिक गुस्से और जिद को कैसे संभालें?",
        snippetEn: "Public tantrums are amplified by parental embarrassment. First, take a deep breath to co-regulate yourself. Do not negotiate or yell...",
        snippetHi: "सार्वजनिक जिद में लोग क्या कहेंगे का डर छोड़ें। बच्चे को किसी शांत कोने में ले जाएं, उस पर चिल्लाने या चॉकलेट से बहलाने से बचें...",
        fullAnswerEn: "Public tantrums are amplified by parental embarrassment. First, take a deep breath to co-regulate yourself—your calm nervous system is their anchor. Guide the child to a quiet, less crowded corner. Do not negotiate, bribe with sweets, or deliver long lectures. Keep words minimal: 'I see you are upset. I am right here with you.' Discuss solutions once their breathing slows.",
        fullAnswerHi: "बाजार में जिद होने पर खुद को शांत रखें। बच्चे को किसी शांत जगह ले जाएं। उस पर चिल्लाने या बात मनवाने के लिए खिलौने/चॉकलेट देने से बचें। शांत स्वर में कहें: 'मैं समझ रहा हूँ कि तुम नाराज हो, मैं तुम्हारे साथ हूँ।' शांत होने के बाद ही बात करें।"
      },
      {
        id: 'beh_q2',
        qNum: 'Q2',
        titleEn: "What should I do when my child hits, bites, or throws objects when angry?",
        titleHi: "गुस्से में जब बच्चा हाथ उठाए, काटे या सामान फेंकने लगे तो क्या करें?",
        snippetEn: "Physical aggression indicates that big emotions have exceeded verbal regulation capacity. Firmly hold their hands with empathy...",
        snippetHi: "मारना यह दर्शाता है कि बच्चा अपनी बात शब्दों में नहीं कह पा रहा। धीरे से उसका हाथ पकड़ें और कहें कि मारना गलत है...",
        fullAnswerEn: "Physical aggression indicates that big emotions have exceeded the child's verbal regulation capacity. Calmly and firmly block the hit: 'I cannot let you hit. Hitting hurts.' Offer acceptable physical sensory releases like stomping feet, pushing against a wall, or squeezing a pillow. Once calm, teach them: 'Next time say: I am furious!'",
        fullAnswerHi: "जब बच्चा हाथ उठाए तो शांत लेकिन दृढ़ता से उसका हाथ रोकें: 'मैं तुम्हें मारने नहीं दूंगा, मारने से चोट लगती है।' तकिया दबाने या पैर पटकने जैसे सुरक्षित तरीके दें और शांत होने पर भावनाएं व्यक्त करने के शब्द सिखाएं।"
      }
    ]
  },
  {
    id: 'adhd',
    tabKey: 'adhd',
    labelEn: 'ADHD & Autism',
    labelHi: 'एडीएचडी व ऑटिज्म जांच',
    icon: '🧩',
    questions: [
      {
        id: 'adhd_q1',
        qNum: 'Q1',
        titleEn: "What are early toddler signs that warrant an Autism Spectrum (ASD) screening?",
        titleHi: "छोटे बच्चों में ऑटिज्म (ASD) के शुरुआती लक्षण क्या हैं जिनकी जांच जरूरी है?",
        snippetEn: "Key early observational indicators include inconsistent eye contact, lack of joint attention (not pointing to show you objects), and speech delays...",
        snippetHi: "आंखें न मिलाना, उंगली से इशारा न करना, नाम पुकारने पर ध्यान न देना और देर से बोलना ऑटिज्म के मुख्य शुरुआती संकेत हैं...",
        fullAnswerEn: "Key early observational indicators include inconsistent eye contact, lack of joint attention (not pointing to show you objects of interest), speech delays, repetitive hand-flapping or spinning, intense distress with routine changes or sensory stimuli (loud blenders, fabric tags), and lack of pretend play by 24–30 months. Early intervention before age 4 produces the best developmental outcomes.",
        fullAnswerHi: "आंखें मिलाने में हिचकिचाहट, नाम पुकारने पर प्रतिक्रिया न देना, उंगली से इशारा न करना, हाथों को बार-बार फड़फड़ाना या गोल घूमना, और तेज आवाज या कपड़ों के टैग से अत्यधिक चिढ़ना ऑटिज्म के लक्षण हो सकते हैं। 4 साल से पहले थेरेपी शुरू करने से सबसे बेहतर परिणाम मिलते हैं।"
      },
      {
        id: 'adhd_q2',
        qNum: 'Q2',
        titleEn: "My child cannot sit still for 10 minutes to do homework. Is it ADHD?",
        titleHi: "बच्चा पढ़ाई के समय 10 मिनट भी टिककर नहीं बैठ पाता, क्या यह एडीएचडी है?",
        snippetEn: "Frequent squirming and difficulty staying seated are common in children. ADHD involves broader deficits in executive functioning...",
        snippetHi: "सिर्फ चंचलता एडीएचडी नहीं होती। यदि रोज स्कूल की चीजें खोना, निर्देशों का पालन न कर पाना और आवेग में रहना दोनों जगह हो तो जांच कराएं...",
        fullAnswerEn: "Frequent squirming and difficulty staying seated are common in active children. ADHD involves broader deficits in executive functioning: losing school supplies daily, inability to follow multi-step instructions, and impulsive outbursts across both home and school. Try sensory accommodations like wobble cushions, standing desks, and 12-minute study sprints.",
        fullAnswerHi: "सक्रिय बच्चों का थोड़ा हिलना-डुलना सामान्य है। लेकिन यदि बच्चा रोज स्कूल का सामान खोता है, निर्देश भूल जाता है और घर व स्कूल दोनों जगह अति-सक्रिय रहता है, तो क्लिनिकल मनोवैज्ञानिक से जांच करानी चाहिए।"
      }
    ]
  },
  {
    id: 'speech',
    tabKey: 'speech',
    labelEn: 'Speech & Language',
    labelHi: 'वाणी व भाषा विकास',
    icon: '🗣️',
    questions: [
      {
        id: 'sp_q1',
        qNum: 'Q1',
        titleEn: "How can parents encourage speech development naturally at home daily?",
        titleHi: "घर पर रोजाना बातचीत और बोलने की क्षमता को प्राकृतिक रूप से कैसे बढ़ाएं?",
        snippetEn: "Narrate your day continuously, speak at a measured pace with expressive facial movements, and read rhyming picture books together daily...",
        snippetHi: "दैनिक कार्यों का वर्णन बोलकर करें, धीरे-धीरे और स्पष्ट बोलें, सवाल पूछने के बाद 5 सेकंड का समय दें और चित्र पुस्तकें पढ़ें...",
        fullAnswerEn: "Narrate your day continuously like a friendly radio host ('Papa is slicing the red apple!'). Speak at a measured pace with expressive facial movements, pause 5 full seconds after asking questions to allow cognitive processing, sing interactive action rhymes, and eliminate passive background television.",
        fullAnswerHi: "घर के हर काम को बच्चे के सामने बोलकर बताएं: 'मम्मी अब सेब काट रही है।' स्पष्ट चेहरे के भावों के साथ बोलें, सवाल पूछने के बाद 5 सेकंड रुकें ताकि बच्चा बोलने की कोशिश कर सके, और टीवी को बैकग्राउंड में बंद रखें।"
      },
      {
        id: 'sp_q2',
        qNum: 'Q2',
        titleEn: "My 5-year-old has started stammering on initial sounds. How should we react?",
        titleHi: "बच्चा बोलते समय हकलाने लगा है। माता-पिता को कैसे व्यवहार करना चाहिए?",
        snippetEn: "Developmental disfluency is common as vocabulary outpaces motor speech coordination. Never tell the child to 'slow down' or 'breathe'...",
        snippetHi: "हकलाने पर कभी न कहें कि 'धीरे बोलो' या 'सांस लो'। इससे घबराहट बढ़ती है। प्यार से सुनें और उसका वाक्य खुद पूरा न करें...",
        fullAnswerEn: "Developmental disfluency is common between ages 2.5 and 6 as vocabulary outpaces motor speech coordination. Never tell the child to 'slow down', 'take a breath', or finish their words for them—this heightens social self-consciousness. Maintain loving eye contact, listen patiently, and slow your own speaking pace.",
        fullAnswerHi: "2.5 से 6 साल के बीच हकलाना काफी आम है क्योंकि सोच तेजी से चलती है और जुबान धीमी होती है। बच्चे से कभी न कहें कि 'धीमे बोलो' या 'सोचकर बोलो'। नजरें मिलाकर धैर्य से सुनें और उसका वाक्य खुद पूरा न करें।"
      }
    ]
  },
  {
    id: 'teen',
    tabKey: 'teen',
    labelEn: 'Teens & Career',
    labelHi: 'किशोर व करियर दिशा',
    icon: '👧',
    questions: [
      {
        id: 'tn_q1',
        qNum: 'Q1',
        titleEn: "How do I communicate with a teenager who has become quiet, withdrawn, or secretive?",
        titleHi: "चुपचाप रहने वाले और अपनी बातें छिपाने वाले टीनेजर से खुलकर कैसे जुड़ें?",
        snippetEn: "Adolescents withdraw to carve out personal autonomy. Interrogation ('Who were you chatting with?') pushes them further away...",
        snippetHi: "किशोर अपनी पहचान बनाने के लिए दूरी बनाते हैं। पूछताछ करने के बजाय साथ में टहलते या खाना बनाते समय अनौपचारिक बातचीत करें...",
        fullAnswerEn: "Adolescents withdraw to carve out personal autonomy. Interrogation ('Who were you chatting with?') pushes them further away. Shift to low-pressure side-by-side connection during car rides, cooking, or evening walks. Practice reflective listening: acknowledge their emotional world without immediately dispensing lectures or unsolicited advice.",
        fullAnswerHi: "किशोरावस्था में बच्चे अपनी निजता चाहते हैं। पूछताछ करने से वे और दूर होते हैं। कार चलाते समय या टहलते वक्त बिना किसी दबाव के बात करें। 80% समय सिर्फ सुनें और तुरंत सलाह या उपदेश देने से बचें।"
      },
      {
        id: 'tn_q2',
        qNum: 'Q2',
        titleEn: "Science vs Commerce vs Humanities: How do we choose the right Class 11 stream?",
        titleHi: "11वीं कक्षा में साइंस, कॉमर्स या आर्ट्स का चुनाव बिना किसी पछतावे के कैसे करें?",
        snippetEn: "Stream selection should be anchored in verified cognitive aptitude, interest mapping, and learning style, rather than peer pressure or parental nostalgia...",
        snippetHi: "विषय का चुनाव दोस्तों की देखा-देखी या सामाजिक दिखावे के बजाय बच्चे की स्वाभाविक रुचि और वैज्ञानिक एप्टीट्यूड टेस्ट के आधार पर करें...",
        fullAnswerEn: "Stream selection should be anchored in verified cognitive aptitude, interest mapping, and learning style, rather than peer pressure or parental nostalgia. Schedule an objective psycho-educational aptitude assessment. Ensure your teen understands the modern multidisciplinary career landscapes enabled by NEP 2020.",
        fullAnswerHi: "11वीं में विषय का चुनाव रिश्तेदारों या दोस्तों के प्रभाव में न करें। बच्चे की बौद्धिक क्षमता और वास्तविक रुचि को समझने के लिए किसी प्रमाणित करियर काउंसलर से एप्टीट्यूड टेस्ट कराएं।"
      }
    ]
  }
];

export default function ProblemAreasHub({ onOpenCounselorChat, onBookCounselor }) {
  const { lang, t } = useLanguage();
  const isHi = lang === 'hi';
  
  // Selected category in Carousel
  const [selectedCatId, setSelectedCatId] = useState('school');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState(['school_q1']);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [expandedQId, setExpandedQId] = useState('school_q1');
  const [toastMsg, setToastMsg] = useState('');

  const carouselRef = useRef(null);

  const scrollCarousel = (distance) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: distance, behavior: 'smooth' });
    }
  };

  const toggleFavorite = (qId, e) => {
    e.stopPropagation();
    setFavorites(prev => {
      const next = prev.includes(qId) ? prev.filter(id => id !== qId) : [...prev, qId];
      setToastMsg(next.includes(qId) 
        ? (isHi ? 'सवाल पसंदीदा सूची में जोड़ा गया' : 'Added to saved questions') 
        : (isHi ? 'पसंदीदा सूची से हटाया गया' : 'Removed from saved')
      );
      setTimeout(() => setToastMsg(''), 2000);
      return next;
    });
  };

  const handleShare = (q, e) => {
    e.stopPropagation();
    const url = `${window.location.origin}/common-problems?q=${q.id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setToastMsg(isHi ? 'लिंक कॉपी हो गया!' : 'Guidance link copied to clipboard!');
    } else {
      setToastMsg(isHi ? 'शेयर लिंक तैयार है' : 'Link ready to share!');
    }
    setTimeout(() => setToastMsg(''), 2200);
  };

  // Get active category object
  const activeCategory = PROBLEM_CARD_CATEGORIES.find(c => c.id === selectedCatId) || PROBLEM_CARD_CATEGORIES[0];

  // Flatten or filter questions
  const displayedQuestions = useMemo(() => {
    let list = [];
    
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      PROBLEM_CARD_CATEGORIES.forEach(cat => {
        cat.questions.forEach(item => {
          const title = (isHi ? item.titleHi : item.titleEn).toLowerCase();
          const snip = (isHi ? item.snippetHi : item.snippetEn).toLowerCase();
          const ans = (isHi ? item.fullAnswerHi : item.fullAnswerEn).toLowerCase();
          if (title.includes(q) || snip.includes(q) || ans.includes(q)) {
            list.push({ ...item, categoryLabel: isHi ? cat.labelHi : cat.labelEn, catId: cat.id });
          }
        });
      });
    } else if (showFavoritesOnly) {
      PROBLEM_CARD_CATEGORIES.forEach(cat => {
        cat.questions.forEach(item => {
          if (favorites.includes(item.id)) {
            list.push({ ...item, categoryLabel: isHi ? cat.labelHi : cat.labelEn, catId: cat.id });
          }
        });
      });
    } else {
      list = activeCategory.questions.map(item => ({
        ...item,
        categoryLabel: isHi ? activeCategory.labelHi : activeCategory.labelEn,
        catId: activeCategory.id
      }));
    }

    return list;
  }, [selectedCatId, searchQuery, showFavoritesOnly, favorites, isHi, activeCategory]);

  return (
    <div className="py-6 sm:py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-2xl bg-[#1A1540] text-white text-sm font-bold shadow-2xl flex items-center space-x-2 animate-in slide-in-from-bottom-3 border border-[#E4DFF7]">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2 text-sm font-bold text-[#5B48D6] uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>{isHi ? 'विशेषज्ञ वर्गीकृत समस्याएं' : 'Verified Problem Areas & FAQs'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {isHi ? 'समस्याएं एवं समाधान' : 'Child Development & Problem Areas'}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-1">
            {isHi 
              ? 'विषय चुनें या सर्च करें — RCI व MCI प्रमाणित बाल मनोवैज्ञानिकों से तुरंत कार्ड व्यू मार्गदर्शन प्राप्त करें।'
              : 'Select a category card or search below to explore practical guidance verified by child psychologists.'}
          </p>
        </div>

        {/* Quick Action Pill */}
        <button
          onClick={onBookCounselor}
          className="self-start md:self-auto flex items-center space-x-2 px-6 py-3 rounded-full bg-[#5B48D6] hover:bg-[#4B3AB8] text-white text-sm font-bold shadow-md shadow-[#5B48D6]/20 transition-all cursor-pointer active:scale-95"
        >
          <Video className="w-4.5 h-4.5" />
          <span>{isHi ? 'विशेषज्ञ से परामर्श बुक करें' : 'Book Specialist Session'}</span>
        </button>
      </div>

      {/* Visual Clinical Guidance Hero Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Child Play Therapy Banner */}
        <div 
          onClick={() => { setSelectedCatId('behavior'); setSearchQuery(''); setShowFavoritesOnly(false); }}
          className="group p-4 rounded-3xl bg-white border border-[#E4DFF7] shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center gap-4"
        >
          <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 relative">
            <img
              src="/images/child_play_therapy.jpg"
              alt="Play Therapy"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          <div>
            <span className="px-2.5 py-0.5 rounded-full bg-[#BDEBDD] text-[#00533f] text-xs font-bold">
              {isHi ? 'आयु 1.5–9 वर्ष' : 'Ages 1.5–9'}
            </span>
            <h3 className="font-bold text-base text-slate-900 group-hover:text-[#5B48D6] transition-colors mt-1">
              {isHi ? 'प्ले थेरेपी और प्रारंभिक विकास' : 'Play Therapy & Early Milestones'}
            </h3>
            <p className="text-sm text-slate-600 mt-0.5 line-clamp-2">
              {isHi 
                ? 'गुस्सा, बोलने में देरी, ऑटिज्म/ADHD और एकाग्रता के लिए अनुकूलित तकनीक।' 
                : 'Gentle support for tantrums, speech milestones, ADHD focus, and social confidence.'}
            </p>
          </div>
        </div>

        {/* Teen Counselling Banner */}
        <div 
          onClick={() => { setSelectedCatId('teen'); setSearchQuery(''); setShowFavoritesOnly(false); }}
          className="group p-4 rounded-3xl bg-white border border-[#E4DFF7] shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center gap-4"
        >
          <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 relative">
            <img
              src="/images/teen_career_counselling.jpg"
              alt="Teen & Career Counselling"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          <div>
            <span className="px-2.5 py-0.5 rounded-full bg-[#e4dfff] text-[#5b48d6] text-xs font-bold">
              {isHi ? 'आयु 10–18 वर्ष' : 'Ages 10–18'}
            </span>
            <h3 className="font-bold text-base text-slate-900 group-hover:text-[#5B48D6] transition-colors mt-1">
              {isHi ? 'किशोर मार्गदर्शन और करियर दिशा' : 'Teen Guidance & Career Clarity'}
            </h3>
            <p className="text-sm text-slate-600 mt-0.5 line-clamp-2">
              {isHi
                ? 'परीक्षा तनाव, विषय चयन, स्क्रीन की लत और भावनात्मक संतुलन।'
                : '10th/12th exam burnout, career stream choice, gaming limits, and emotional balance.'}
            </p>
          </div>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="relative max-w-3xl">
        <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            if (e.target.value) setShowFavoritesOnly(false);
          }}
          placeholder={isHi ? "सर्च करें: स्कूल चयन, परिभाषा, परीक्षा का डर, स्क्रीन लत, गुस्सा..." : "Search topics: schools, definitions, exam failure, screens, tantrums..."}
          className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-white border border-[#E4DFF7] text-base text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5B48D6] shadow-xs"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* =======================================================================
          TOP HORIZONTAL CARD CAROUSEL (EXACT SCREENSHOT UI SOLUTION)
          ======================================================================= */}
      <div className="space-y-4">
        
        {/* Carousel Header with Navigation Arrows */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#5B48D6] uppercase tracking-wider">
            {isHi ? 'श्रेणी चुनें' : 'Browse Categories'}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollCarousel(-240)}
              aria-label="Scroll left"
              className="w-9 h-9 rounded-full bg-white border border-[#E4DFF7] hover:border-[#5B48D6] text-slate-700 hover:text-[#5B48D6] shadow-xs flex items-center justify-center transition-all cursor-pointer active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollCarousel(240)}
              aria-label="Scroll right"
              className="w-9 h-9 rounded-full bg-white border border-[#E4DFF7] hover:border-[#5B48D6] text-slate-700 hover:text-[#5B48D6] shadow-xs flex items-center justify-center transition-all cursor-pointer active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Cards Track */}
        <div 
          ref={carouselRef}
          className="flex items-center gap-3.5 overflow-x-auto pb-3 pt-1 no-scrollbar scroll-smooth"
        >
          {PROBLEM_CARD_CATEGORIES.map((cat) => {
            const isSelected = selectedCatId === cat.id && !searchQuery && !showFavoritesOnly;
            const label = isHi ? cat.labelHi : cat.labelEn;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedCatId(cat.id);
                  setSearchQuery('');
                  setShowFavoritesOnly(false);
                }}
                className={`min-w-[150px] sm:min-w-[175px] h-[92px] px-4 py-3 rounded-2xl flex flex-col items-center justify-center text-center transition-all flex-shrink-0 cursor-pointer border-2 ${
                  isSelected
                    ? 'bg-[#1D4ED8] text-white border-[#1D4ED8] shadow-lg shadow-blue-500/25 scale-[1.02]'
                    : 'bg-white hover:bg-blue-50/50 text-[#1D4ED8] border-blue-100 hover:border-blue-300 shadow-xs'
                }`}
              >
                <span className="text-xl mb-1">{cat.icon}</span>
                <span className="text-sm font-bold leading-snug line-clamp-2">
                  {label}
                </span>
              </button>
            );
          })}
        </div>

      </div>

      {/* =======================================================================
          COMMON PROBLEMS SECTION WITH APP-STYLE QUESTION CARDS
          ======================================================================= */}
      <div className="space-y-4 pt-2">
        
        {/* Section Title Bar */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h2 className="text-xl sm:text-2xl font-black text-[#1D4ED8] tracking-tight">
            {isHi ? 'सामान्य समस्याएं (Common Problems)' : 'Common Problems'}
          </h2>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setShowFavoritesOnly(!showFavoritesOnly);
                setSearchQuery('');
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer ${
                showFavoritesOnly
                  ? 'bg-rose-50 text-rose-700 border-rose-200 ring-2 ring-rose-200'
                  : 'bg-white text-slate-700 border-[#E4DFF7] hover:border-slate-300'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${showFavoritesOnly ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}`} />
              <span>{isHi ? `पसंदीदा (${favorites.length})` : `Saved (${favorites.length})`}</span>
            </button>
            <span className="text-xs text-slate-500">
              {displayedQuestions.length} {isHi ? 'विषय उपलब्ध' : 'topics available'}
            </span>
          </div>
        </div>

        {/* Empty State */}
        {displayedQuestions.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-300 space-y-3">
            <span className="text-4xl">🔍</span>
            <h3 className="text-base font-bold text-slate-800">
              {isHi ? 'कोई सवाल नहीं मिला' : 'No Problem Questions Found'}
            </h3>
            <p className="text-sm text-slate-500 max-w-sm mx-auto">
              {isHi ? 'कृपया कोई अन्य शब्द सर्च करें या ऊपर से श्रेणी चुनें।' : 'Try another keyword or select a category card from the carousel above.'}
            </p>
            <button
              onClick={() => { setSelectedCatId('school'); setSearchQuery(''); setShowFavoritesOnly(false); }}
              className="px-5 py-2.5 rounded-full bg-[#1D4ED8] text-white text-sm font-bold cursor-pointer"
            >
              {isHi ? 'फ़िल्टर हटाएं' : 'Reset View'}
            </button>
          </div>
        ) : (
          /* Cards Vertical Stack (Mobile Screen Optimized Card View) */
          <div className="space-y-4">
            {displayedQuestions.map((item) => {
              const isFav = favorites.includes(item.id);
              const isExpanded = expandedQId === item.id;
              const title = isHi ? item.titleHi : item.titleEn;
              const snippet = isHi ? item.snippetHi : item.snippetEn;
              const fullAns = isHi ? item.fullAnswerHi : item.fullAnswerEn;

              return (
                <div
                  key={item.id}
                  onClick={() => setExpandedQId(isExpanded ? '' : item.id)}
                  className={`rounded-3xl bg-white border transition-all cursor-pointer p-5 sm:p-6 shadow-xs hover:shadow-md ${
                    isExpanded 
                      ? 'border-[#1D4ED8] ring-2 ring-[#1D4ED8]/10' 
                      : 'border-blue-100 hover:border-blue-200'
                  }`}
                >
                  {/* Card Top: Category Label + Heart Button */}
                  <div className="flex items-center justify-between pb-1.5">
                    <span className="text-sm font-bold text-[#1D4ED8] tracking-tight">
                      {item.categoryLabel}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={(e) => handleShare(item, e)}
                        aria-label="Share guidance"
                        className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-[#1D4ED8] transition-colors"
                      >
                        <Share2 className="w-4.5 h-4.5" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => toggleFavorite(item.id, e)}
                        aria-label="Save question"
                        className="p-2 rounded-full hover:bg-rose-50 transition-transform active:scale-125"
                      >
                        <Heart className={`w-5 h-5 transition-colors ${
                          isFav ? 'fill-rose-500 text-rose-500' : 'text-slate-300 hover:text-rose-400'
                        }`} />
                      </button>
                    </div>
                  </div>

                  {/* Card Question Title */}
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                    <strong className="text-[#1D4ED8] mr-1.5">{item.qNum}.</strong>
                    {title}
                  </h3>

                  {/* Snippet / Expanded Content */}
                  <div className="mt-2.5">
                    {!isExpanded ? (
                      <p className="text-sm sm:text-base text-slate-600 leading-relaxed line-clamp-2">
                        {snippet}
                      </p>
                    ) : (
                      <div className="space-y-4 pt-2 border-t border-slate-100 animate-in fade-in duration-200">
                        <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 text-sm sm:text-base text-slate-800 leading-relaxed">
                          <p>{fullAns}</p>
                        </div>

                        {/* Interactive Card Action Footer */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                          <div className="flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-[#126D55]" />
                            <span className="text-xs text-slate-500 font-semibold">
                              Verified by RCI Child Psychologist
                            </span>
                          </div>

                          <div className="flex items-center gap-2 flex-wrap">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onOpenCounselorChat({ categoryId: item.catId, queryText: title });
                              }}
                              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                            >
                              <MessageSquare className="w-4 h-4 text-[#1D4ED8]" />
                              <span>{isHi ? 'इस पर चैट गाइड से पूछें' : 'Ask Counselor'}</span>
                            </button>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onBookCounselor();
                              }}
                              className="px-4 py-2 rounded-xl bg-[#1D4ED8] hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                            >
                              <Video className="w-4 h-4" />
                              <span>{isHi ? 'परामर्श बुक करें' : 'Book Session'}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Click to expand hint if not expanded */}
                  {!isExpanded && (
                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-[#1D4ED8] font-bold">
                      <span>{isHi ? 'विस्तार से पढ़ें' : 'Read full doctor answer'}</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        )}

      </div>

    </div>
  );
}
