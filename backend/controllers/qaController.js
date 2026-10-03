import Question from '../models/Question.js';

export let mockQuestions = [
  {
    _id: 'qa_01',
    title: 'How do I handle Roblox and YouTube Gaming addiction in a 9-year-old?',
    details: 'Our son becomes aggressive and sneaks screens at night whenever we restrict gaming time. How do we establish healthy digital boundaries without turning home into a battleground?',
    submittedBy: { name: 'Parent of 9y child', isConfidential: true },
    ageCategory: 'Ages 5-10',
    category: 'Screen Time & Digital Wellness',
    status: 'answered',
    helpfulCount: 42,
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    expertAnswer: {
      answeredBy: {
        _id: 'usr_expert_01',
        name: 'Dr. Ananya Roy',
        specialization: 'Pediatric Development & Behavioral Health',
        avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80',
        workplace: 'Max Children Healthcare'
      },
      answer: `Screen addiction in middle childhood stems from games offering instant dopamine rewards and social belonging. 
      To reset boundaries without constant conflict:
      1. **Never use screens as a quick reward or emotional sedative.**
      2. **Establish screen-free physical zones** (bedrooms, dining table). Charge all devices overnight in parents' bedroom.
      3. **Replace dopamine, don't just eliminate it.** Introduce high-engagement offline hobbies like swimming, martial arts, or LEGO building challenges.
      4. **Co-play for 15 minutes** to understand what he loves about the game, then transition together to dinner.`,
      keyTakeaways: [
        'Device charging station outside bedrooms',
        'Pair screen exit with active physical engagement',
        'Co-play to build empathetic connection before setting rules'
      ],
      answeredAt: new Date(Date.now() - 86400000 * 3).toISOString()
    }
  },
  {
    _id: 'qa_02',
    title: 'My 6th grader is being excluded by classmates and feels lonely. How can I foster emotional resilience?',
    details: 'My daughter came home crying because her lunch table group told her she could not sit with them. She wants to fake illness to skip school now.',
    submittedBy: { name: 'Empathetic Mom', isConfidential: false },
    ageCategory: 'Ages 5-10',
    category: 'Bullying & Emotional Resilience',
    status: 'answered',
    helpfulCount: 38,
    createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
    expertAnswer: {
      answeredBy: {
        _id: 'usr_expert_02',
        name: 'Dr. Sameer Sen',
        specialization: 'Adolescent & Child Psychologist',
        avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
        workplace: 'MindCare Child Clinic'
      },
      answer: `Relational exclusion at age 10-12 feels devastating because peer approval is becoming central to self-identity.
      Key steps to help her rebuild confidence:
      1. **Validate feelings first:** Say "It makes complete sense that you felt hurt today. I would feel sad too."
      2. **Avoid rushing to fix school dynamics immediately.** Give her a safe haven home environment.
      3. **Expand her social portfolio.** Enroll her in extracurriculars outside school (art studio, sports team) so school isn't her only social world.
      4. **Roleplay gentle assertive responses:** "That's okay, I'll sit with Maya today!"`,
      keyTakeaways: [
        'Build social connections outside the classroom',
        'Validate hurt without minimizing feelings',
        'Practice assertive peer communication scripts'
      ],
      answeredAt: new Date(Date.now() - 86400000 * 6).toISOString()
    }
  },
  {
    _id: 'qa_03',
    title: 'Severe sibling rivalry between 3-year-old and newborn baby. What to do when toddler pinches baby?',
    details: 'Since brought our 2-month-old daughter home, our 3-year-old son has regression in potty training and repeatedly tries to pinch or push the baby when we are not looking.',
    submittedBy: { name: 'Mother of two', isConfidential: true },
    ageCategory: 'Toddler (1-3y)',
    category: 'Social Behavior & Sibling Rivalry',
    status: 'answered',
    helpfulCount: 29,
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
    expertAnswer: {
      answeredBy: {
        _id: 'usr_expert_01',
        name: 'Dr. Ananya Roy',
        specialization: 'Pediatric Development & Behavioral Health',
        avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80',
        workplace: 'Max Children Healthcare'
      },
      answer: `Regression and displaced aggression are classic signs that your toddler feels displaced from their position of primary focus.
      1. **Never leave toddler alone with newborn unattended during this transition stage.**
      2. **Provide 15 minutes of uninterrupted 1-on-1 "Special Mommy Time"** daily where the baby is not in the room.
      3. **Give toddler a helper role:** "Can you get baby's blue blanket for me? You are such a caring big brother!"`,
      keyTakeaways: [
        'Daily dedicated 1-on-1 parent time for the elder sibling',
        'Channel competitive urge into helpful sibling tasks',
        'Respond to pinching with firm calm safety boundaries, not anger'
      ],
      answeredAt: new Date(Date.now() - 86400000 * 9).toISOString()
    }
  },
  {
    _id: 'qa_04',
    title: 'Career path pressure in Grade 11: How to guide without forcing traditional engineering/medical tracks?',
    details: 'Our 16-year-old daughter is passionate about design and digital media, but relatives are pressuring us to push her into medical coaching. How do we navigate career planning constructively?',
    submittedBy: { name: 'Concerned Parent', isConfidential: false },
    ageCategory: 'Ages 10-18',
    category: 'Career Guidance & Teen Mental Health',
    status: 'pending',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString()
  }
];

export const getQuestions = async (req, res) => {
  const { category, ageCategory, status, search } = req.query;

  try {
    let query = {};
    if (category && category !== 'All') query.category = category;
    if (ageCategory && ageCategory !== 'All') query.ageCategory = ageCategory;
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { details: { $regex: search, $options: 'i' } }
      ];
    }

    const questions = await Question.find(query).sort({ createdAt: -1 });
    if (questions && questions.length > 0) return res.json(questions);
  } catch (e) {
    // fallback
  }

  let filtered = [...mockQuestions];
  if (category && category !== 'All') filtered = filtered.filter(q => q.category === category);
  if (ageCategory && ageCategory !== 'All') filtered = filtered.filter(q => q.ageCategory === ageCategory);
  if (status) filtered = filtered.filter(q => q.status === status);
  if (search) {
    const s = search.toLowerCase();
    filtered = filtered.filter(q => q.title.toLowerCase().includes(s) || q.details.toLowerCase().includes(s));
  }

  return res.json(filtered);
};

export const submitQuestion = async (req, res) => {
  const { title, details, ageCategory, category, targetSpecialist, isConfidential } = req.body;

  const newQuestion = {
    title,
    details,
    submittedBy: {
      _id: req.user?._id || 'usr_demo',
      name: isConfidential ? 'Anonymous Parent' : (req.user?.name || 'Concerned Parent'),
      isConfidential: !!isConfidential
    },
    ageCategory: ageCategory || 'Ages 5-10',
    category: category || 'General Parenting Challenges',
    targetSpecialist: targetSpecialist || 'Certified Pediatrician',
    status: 'pending',
    helpfulCount: 0,
    createdAt: new Date().toISOString()
  };

  try {
    const created = await Question.create(newQuestion);
    return res.status(201).json(created);
  } catch (e) {
    newQuestion._id = `qa_${Date.now()}`;
    mockQuestions.unshift(newQuestion);
    return res.status(201).json(newQuestion);
  }
};

export const answerQuestion = async (req, res) => {
  const { id } = req.params;
  const { answer, keyTakeaways } = req.body;

  const expertAnswer = {
    answeredBy: {
      _id: req.user?._id || 'usr_expert_01',
      name: req.user?.name || 'Dr. Ananya Roy',
      specialization: req.user?.specialization || 'Child Developmental Specialist',
      avatar: req.user?.avatar || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80',
      workplace: req.user?.workplace || 'Max Healthcare'
    },
    answer,
    keyTakeaways: keyTakeaways || [],
    answeredAt: new Date().toISOString()
  };

  try {
    const question = await Question.findById(id);
    if (question) {
      question.status = 'answered';
      question.expertAnswer = expertAnswer;
      await question.save();
      return res.json(question);
    }
  } catch (e) {
    // fallback
  }

  const mock = mockQuestions.find(q => q._id === id);
  if (mock) {
    mock.status = 'answered';
    mock.expertAnswer = expertAnswer;
    return res.json(mock);
  }

  return res.status(404).json({ message: 'Question not found' });
};

export const markHelpful = async (req, res) => {
  const { id } = req.params;
  try {
    const q = await Question.findById(id);
    if (q) {
      q.helpfulCount += 1;
      await q.save();
      return res.json(q);
    }
  } catch (e) {
    // fallback
  }

  const mock = mockQuestions.find(q => q._id === id);
  if (mock) {
    mock.helpfulCount += 1;
    return res.json(mock);
  }

  return res.status(404).json({ message: 'Question not found' });
};
