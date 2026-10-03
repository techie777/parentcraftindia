import mongoose from 'mongoose';

const milestoneSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  ageCategory: {
    type: String,
    enum: ['Newborn (0-3m)', 'Baby (3-12m)', 'Toddler (1-3y)', 'Ages 1-5', 'Ages 5-10', 'Ages 10-18', '18+ (Young Adult)'],
    required: true
  },
  domain: {
    type: String,
    enum: ['Physical & Motor', 'Cognitive & Language', 'Social & Emotional', 'Vaccination Schedule'],
    required: true
  },
  recommendedAgeMonthsMin: { type: Number, default: 0 },
  recommendedAgeMonthsMax: { type: Number, default: 216 }, // up to 18 years
  tip: { type: String, default: '' },
  importance: { type: String, enum: ['Essential', 'Recommended', 'Optional'], default: 'Recommended' }
}, {
  timestamps: true
});

export default mongoose.model('Milestone', milestoneSchema);
