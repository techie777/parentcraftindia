import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  author: {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    avatar: { type: String },
    role: { type: String, default: 'parent' },
    isVerifiedExpert: { type: Boolean, default: false },
    specialization: { type: String }
  },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    avatar: { type: String },
    role: { type: String, default: 'parent' },
    isVerifiedExpert: { type: Boolean, default: false },
    specialization: { type: String }
  },
  ageCategory: {
    type: String,
    enum: ['Newborn (0-3m)', 'Baby (3-12m)', 'Toddler (1-3y)', 'Ages 1-5', 'Ages 5-10', 'Ages 10-18', '18+ (Young Adult)', 'General Parenting'],
    default: 'General Parenting'
  },
  tags: [{ type: String }], // e.g. ["Nutrition", "Sleep", "Behavior", "Education", "Mental Health"]
  upvotes: [{ type: String }], // Array of User IDs who upvoted
  comments: [commentSchema],
  isFlagged: { type: Boolean, default: false },
  flagReason: { type: String, default: '' },
  pinned: { type: Boolean, default: false }
}, {
  timestamps: true
});

export default mongoose.model('Post', postSchema);
