import User from '../models/User.js';
import { generateToken } from '../middleware/authMiddleware.js';

// In-memory user fallback for standalone execution if DB isn't running
export let mockUsers = [
  {
    _id: 'usr_parent_01',
    name: 'Priya Sharma',
    email: 'priya@example.com',
    role: 'parent',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    bio: 'Mother of two wonderful energetic boys (ages 3 and 7). Learning every single day!',
    children: [
      { name: 'Aarav', birthDate: '2023-04-12', gender: 'Boy', completedMilestones: ['m_01', 'm_02', 'm_vax_01'] },
      { name: 'Rohan', birthDate: '2019-09-05', gender: 'Boy', completedMilestones: ['m_01', 'm_02', 'm_03', 'm_04'] }
    ]
  },
  {
    _id: 'usr_expert_01',
    name: 'Dr. Ananya Roy',
    email: 'dr.ananya@parvarish.org',
    role: 'expert',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80',
    bio: 'Senior Pediatric Neurologist & Child Developmental Specialist with 14+ years of clinical experience.',
    isVerifiedExpert: true,
    specialization: 'Pediatric Development & Behavioral Health',
    workplace: 'Max Children Healthcare & Research Institute'
  },
  {
    _id: 'usr_admin_01',
    name: 'Parvarish Moderation Desk',
    email: 'admin@parvarish.org',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    bio: 'Community Lead & Lead Moderator ensuring a safe, supportive space for parents.'
  }
];

export const registerUser = async (req, res) => {
  const { name, email, password, role, children } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || 'parent',
      children: children || []
    });

    const token = generateToken(user._id);

    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      children: user.children,
      token
    });
  } catch (error) {
    // Fallback registration for offline mode
    const newUser = {
      _id: `usr_${Date.now()}`,
      name,
      email,
      role: role || 'parent',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      children: children || []
    };
    mockUsers.push(newUser);
    const token = generateToken(newUser._id);
    return res.status(201).json({ ...newUser, token });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        isVerifiedExpert: user.isVerifiedExpert,
        specialization: user.specialization,
        children: user.children,
        token: generateToken(user._id)
      });
    }
  } catch (error) {
    // DB offline fallback search in mockUsers
  }

  const mockMatch = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (mockMatch) {
    return res.json({
      ...mockMatch,
      token: generateToken(mockMatch._id)
    });
  }

  return res.status(401).json({ message: 'Invalid email or password' });
};

export const getMe = async (req, res) => {
  if (req.user) {
    return res.json(req.user);
  }
  return res.status(404).json({ message: 'User not found' });
};
