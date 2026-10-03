import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  details: { type: String, required: true },
  submittedBy: {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    isConfidential: { type: Boolean, default: false }
  },
  ageCategory: {
    type: String,
    enum: ['Newborn (0-3m)', 'Baby (3-12m)', 'Toddler (1-3y)', 'Ages 1-5', 'Ages 5-10', 'Ages 10-18', '18+ (Young Adult)', 'General Parenting'],
    required: true
  },
  category: {
    type: String,
    enum: [
      'Screen Time & Digital Wellness',
      'Bullying & Emotional Resilience',
      'Academic Burnout & School Disinterest',
      'Social Behavior & Sibling Rivalry',
      'Career Guidance & Teen Mental Health',
      'Nutrition & Physical Growth',
      'General Parenting Challenges'
    ],
    required: true
  },
  targetSpecialist: { type: String, default: 'Certified Pediatrician' },
  status: { type: String, enum: ['pending', 'answered'], default: 'pending' },
  expertAnswer: {
    answeredBy: {
      _id: { type: String },
      name: { type: String },
      specialization: { type: String },
      avatar: { type: String },
      workplace: { type: String }
    },
    answer: { type: String },
    keyTakeaways: [{ type: String }],
    answeredAt: { type: Date }
  },
  helpfulCount: { type: Number, default: 0 }
}, {
  timestamps: true
});

export default mongoose.model('Question', questionSchema);
