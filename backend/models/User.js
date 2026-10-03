import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const childSchema = new mongoose.Schema({
  name: { type: String, required: true },
  birthDate: { type: Date, required: true },
  gender: { type: String, enum: ['Boy', 'Girl', 'Other'], default: 'Other' },
  completedMilestones: [{ type: String }] // IDs or titles of completed milestones
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['parent', 'expert', 'admin'], default: 'parent' },
  avatar: { type: String, default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
  bio: { type: String, default: '' },
  children: [childSchema],
  
  // Expert specific fields
  isVerifiedExpert: { type: Boolean, default: false },
  specialization: { type: String, default: '' }, // e.g. "Certified Pediatrician", "Child Psychologist", "Adolescent Counselor"
  workplace: { type: String, default: '' },
  credentials: { type: String, default: '' }
}, {
  timestamps: true
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model('User', userSchema);
