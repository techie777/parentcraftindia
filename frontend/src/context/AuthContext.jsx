import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiFetch } from '../services/api';

const AuthContext = createContext(null);

export const DEMO_PROFILES = {
  parent: {
    _id: 'usr_parent_01',
    userId: 'PRV-USR-948201',
    name: 'Priya Sharma',
    email: 'priya.sharma@familywellbeing.org',
    role: 'parent',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    bio: 'Mother of two wonderful energetic boys (ages 3 and 7). Learning every single day!',
    children: [
      { _id: 'child_01', name: 'Aarav', birthDate: '2023-04-12', gender: 'Boy', completedMilestones: ['m_01', 'm_02', 'm_vax_01'] },
      { _id: 'child_02', name: 'Rohan', birthDate: '2019-09-05', gender: 'Boy', completedMilestones: ['m_01', 'm_02', 'm_03', 'm_04', 'm_vax_01', 'm_vax_02', 'm_vax_03'] }
    ]
  },
  expert: {
    _id: 'usr_expert_01',
    userId: 'PRV-DOC-849201',
    name: 'Dr. Ananya Sharma',
    email: 'ananya.sharma@parvarish.org',
    role: 'expert',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80',
    bio: 'Senior Pediatric Neurologist & Child Developmental Specialist with 14+ years of clinical experience.',
    isVerifiedExpert: true,
    licenseNumber: 'MCI-849201',
    specialization: 'Pediatric Development & Behavioral Health',
    workplace: 'Max Children Healthcare & Research Institute'
  },
  admin: {
    _id: 'usr_admin_01',
    userId: 'PRV-ADM-100201',
    name: 'Parvarish Moderation Desk',
    email: 'admin@parvarish.org',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    bio: 'Community Lead & Lead Moderator ensuring a safe, supportive space for parents.'
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('parvarish_user');
    return saved ? JSON.parse(saved) : DEMO_PROFILES.parent;
  });

  const [activeChildIndex, setActiveChildIndex] = useState(0);

  useEffect(() => {
    if (user) {
      localStorage.setItem('parvarish_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('parvarish_user');
      localStorage.removeItem('parvarish_token');
    }
  }, [user]);

  const switchDemoRole = (roleKey) => {
    const profile = DEMO_PROFILES[roleKey];
    if (profile) {
      setUser(profile);
      localStorage.setItem('parvarish_user', JSON.stringify(profile));
    }
  };

  const loginWithGoogle = async () => {
    const randomId = Math.floor(100000 + Math.random() * 900000);
    const googleUser = {
      _id: `google_usr_${Date.now()}`,
      userId: `PRV-USR-${randomId}`,
      name: 'Google Parent User',
      email: 'user.google@gmail.com',
      role: 'parent',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      authProvider: 'Google OAuth 2.0',
      bio: 'Parent member signed in via Google.'
    };
    setUser(googleUser);
    localStorage.setItem('parvarish_user', JSON.stringify(googleUser));
    return googleUser;
  };

  const login = async (email, password) => {
    try {
      const data = await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });
      const userWithId = {
        ...data,
        userId: data.userId || `PRV-USR-${Math.floor(100000 + Math.random() * 900000)}`
      };
      setUser(userWithId);
      if (data.token) localStorage.setItem('parvarish_token', data.token);
      return userWithId;
    } catch (err) {
      const lower = email.toLowerCase().trim();
      const matched = Object.values(DEMO_PROFILES).find(p => 
        p.email.toLowerCase() === lower ||
        (lower.includes('ananya') && p.role === 'expert') ||
        (lower.includes('doctor') && p.role === 'expert')
      );
      if (matched) {
        setUser(matched);
        return matched;
      }
      // Demo fallback user if credentials entered
      const randomId = Math.floor(100000 + Math.random() * 900000);
      const demoUser = {
        _id: `usr_${Date.now()}`,
        userId: `PRV-USR-${randomId}`,
        name: email.split('@')[0] || 'Parent User',
        email: email,
        role: 'parent',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        bio: 'Parent member on Parvarish platform.'
      };
      setUser(demoUser);
      return demoUser;
    }
  };

  const register = async (userData) => {
    const randomId = Math.floor(100000 + Math.random() * 900000);
    const isDoc = userData.role === 'expert' || userData.isDoctor;
    const newUser = {
      _id: `usr_${Date.now()}`,
      userId: isDoc ? `PRV-DOC-${randomId}` : `PRV-USR-${randomId}`,
      name: userData.name,
      email: userData.email,
      role: isDoc ? 'expert' : 'parent',
      licenseNumber: userData.licenseNumber || null,
      specialization: userData.specialization || null,
      avatar: isDoc 
        ? 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80'
        : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      bio: userData.bio || (isDoc ? 'Verified Specialist Partner' : 'Parent member on Parvarish platform.')
    };
    setUser(newUser);
    return newUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('parvarish_user');
    localStorage.removeItem('parvarish_token');
  };

  const updateChildMilestones = (childId, updatedList) => {
    if (!user || !user.children) return;
    const updatedChildren = user.children.map(c => {
      if (c._id === childId || (!c._id && c.name === user.children[activeChildIndex]?.name)) {
        return { ...c, completedMilestones: updatedList };
      }
      return c;
    });
    setUser({ ...user, children: updatedChildren });
  };

  return (
    <AuthContext.Provider value={{
      user,
      activeChildIndex,
      setActiveChildIndex,
      login,
      register,
      loginWithGoogle,
      logout,
      switchDemoRole,
      updateChildMilestones
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
