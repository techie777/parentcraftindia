import Milestone from '../models/Milestone.js';
import User from '../models/User.js';
import { mockUsers } from './authController.js';

export let mockMilestones = [
  // Newborn (0-3m)
  {
    _id: 'm_01',
    title: 'Social Smile Response',
    description: 'Smiles spontaneously at caregiver voices and familiar faces.',
    ageCategory: 'Newborn (0-3m)',
    domain: 'Social & Emotional',
    recommendedAgeMonthsMin: 1,
    recommendedAgeMonthsMax: 3,
    importance: 'Essential',
    tip: 'Make frequent direct eye contact and speak in warm, gentle rhythmic tones.'
  },
  {
    _id: 'm_02',
    title: 'Head Lift in Tummy Time',
    description: 'Lifts head up 45 to 90 degrees when lying on stomach.',
    ageCategory: 'Newborn (0-3m)',
    domain: 'Physical & Motor',
    recommendedAgeMonthsMin: 1,
    recommendedAgeMonthsMax: 3,
    importance: 'Essential',
    tip: 'Start with 2-3 minutes of tummy time 3 times a day on a clean, soft mat.'
  },
  {
    _id: 'm_vax_01',
    title: 'BCG, OPV-0 & Hepatitis B Dose 1',
    description: 'Primary protection against tuberculosis, polio, and hepatitis B given shortly after birth.',
    ageCategory: 'Newborn (0-3m)',
    domain: 'Vaccination Schedule',
    recommendedAgeMonthsMin: 0,
    recommendedAgeMonthsMax: 1,
    importance: 'Essential',
    tip: 'Ensure vaccination booklet is recorded at hospital discharge.'
  },

  // Baby (3-12m)
  {
    _id: 'm_03',
    title: 'Independent Sitting Without Support',
    description: 'Sits stably upright without propping hands for over 1 minute.',
    ageCategory: 'Baby (3-12m)',
    domain: 'Physical & Motor',
    recommendedAgeMonthsMin: 6,
    recommendedAgeMonthsMax: 8,
    importance: 'Essential',
    tip: 'Surround baby with soft cushions and place toys slightly out of reach.'
  },
  {
    _id: 'm_04',
    title: 'First Words & Babbling ("Mama", "Dada")',
    description: 'Uses double-syllable sounds intentionally to address parents or request objects.',
    ageCategory: 'Baby (3-12m)',
    domain: 'Cognitive & Language',
    recommendedAgeMonthsMin: 9,
    recommendedAgeMonthsMax: 12,
    importance: 'Essential',
    tip: 'Narrate your daily actions out loud: "Now we are putting on our yellow socks!"'
  },
  {
    _id: 'm_vax_02',
    title: 'Pentavalent 1, 2, 3 & Rotavirus Series',
    description: 'Protects against diphtheria, tetanus, pertussis, hepatitis B, HiB, and severe diarrhea.',
    ageCategory: 'Baby (3-12m)',
    domain: 'Vaccination Schedule',
    recommendedAgeMonthsMin: 1.5,
    recommendedAgeMonthsMax: 3.5,
    importance: 'Essential',
    tip: 'Follow the 6-week, 10-week, and 14-week routine immunization calendar.'
  },

  // Toddler (1-3y)
  {
    _id: 'm_05',
    title: 'Independent Walking & Running',
    description: 'Walks steadily without assistance and starts climbing low steps.',
    ageCategory: 'Toddler (1-3y)',
    domain: 'Physical & Motor',
    recommendedAgeMonthsMin: 12,
    recommendedAgeMonthsMax: 18,
    importance: 'Essential',
    tip: 'Childproof sharp furniture corners and secure heavy bookshelves to walls.'
  },
  {
    _id: 'm_06',
    title: 'Potty Training Readiness Signals',
    description: 'Communicates wet diaper discomfort and shows interest in the potty chair.',
    ageCategory: 'Toddler (1-3y)',
    domain: 'Social & Emotional',
    recommendedAgeMonthsMin: 24,
    recommendedAgeMonthsMax: 36,
    importance: 'Recommended',
    tip: 'Use gentle praise and picture books. Avoid shaming accidental slips.'
  },
  {
    _id: 'm_vax_03',
    title: 'MMR Dose 1 & Typhoid Conjugate',
    description: 'Immunization against Measles, Mumps, Rubella, and Typhoid fever.',
    ageCategory: 'Toddler (1-3y)',
    domain: 'Vaccination Schedule',
    recommendedAgeMonthsMin: 9,
    recommendedAgeMonthsMax: 15,
    importance: 'Essential',
    tip: 'Consult your pediatrician for MMR booster schedule at 15-18 months.'
  },

  // Ages 1-5 (Preschool)
  {
    _id: 'm_07',
    title: 'Sharing & Cooperative Play',
    description: 'Takes turns with peers and demonstrates basic empathy when a playmate is sad.',
    ageCategory: 'Ages 1-5',
    domain: 'Social & Emotional',
    recommendedAgeMonthsMin: 36,
    recommendedAgeMonthsMax: 48,
    importance: 'Recommended',
    tip: 'Organize small supervised playdates and model sharing explicitly.'
  },

  // Ages 5-10
  {
    _id: 'm_08',
    title: 'Emotional Self-Regulation & Focus',
    description: 'Sustains focus on tasks for 25+ minutes and manages frustration with coping strategies.',
    ageCategory: 'Ages 5-10',
    domain: 'Cognitive & Language',
    recommendedAgeMonthsMin: 72,
    recommendedAgeMonthsMax: 120,
    importance: 'Essential',
    tip: 'Practice box breathing together ("Inhale 4s, Hold 4s, Exhale 4s").'
  },

  // Ages 10-18
  {
    _id: 'm_09',
    title: 'Critical Thinking & Autonomy',
    description: 'Formulates personal opinions, manages daily school schedules, and practices healthy digital boundaries.',
    ageCategory: 'Ages 10-18',
    domain: 'Cognitive & Language',
    recommendedAgeMonthsMin: 132,
    recommendedAgeMonthsMax: 216,
    importance: 'Essential',
    tip: 'Hold weekly family roundtables where teen opinions on household decisions are actively respected.'
  }
];

export const getMilestones = async (req, res) => {
  const { ageCategory, domain } = req.query;
  try {
    let query = {};
    if (ageCategory && ageCategory !== 'All') query.ageCategory = ageCategory;
    if (domain && domain !== 'All') query.domain = domain;

    const items = await Milestone.find(query);
    if (items && items.length > 0) return res.json(items);
  } catch (e) {
    // fallback
  }

  let filtered = [...mockMilestones];
  if (ageCategory && ageCategory !== 'All') filtered = filtered.filter(m => m.ageCategory === ageCategory);
  if (domain && domain !== 'All') filtered = filtered.filter(m => m.domain === domain);

  return res.json(filtered);
};

export const toggleChildMilestone = async (req, res) => {
  const { childId, milestoneId } = req.body;
  const userId = req.user?._id || 'usr_parent_01';

  try {
    const user = await User.findById(userId);
    if (user && user.children) {
      const child = user.children.id(childId) || user.children[0];
      if (child) {
        const idx = child.completedMilestones.indexOf(milestoneId);
        if (idx === -1) {
          child.completedMilestones.push(milestoneId);
        } else {
          child.completedMilestones.splice(idx, 1);
        }
        await user.save();
        return res.json({ completedMilestones: child.completedMilestones });
      }
    }
  } catch (e) {
    // fallback
  }

  const mockUser = mockUsers.find(u => u._id === userId) || mockUsers[0];
  if (mockUser && mockUser.children) {
    const child = mockUser.children.find(c => c._id === childId) || mockUser.children[0];
    if (child) {
      if (!child.completedMilestones) child.completedMilestones = [];
      const idx = child.completedMilestones.indexOf(milestoneId);
      if (idx === -1) {
        child.completedMilestones.push(milestoneId);
      } else {
        child.completedMilestones.splice(idx, 1);
      }
      return res.json({ completedMilestones: child.completedMilestones });
    }
  }

  return res.status(404).json({ message: 'Child profile not found' });
};
