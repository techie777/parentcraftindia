import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { apiFetch } from '../services/api';
import { Heart, CheckCircle2, Circle, ShieldCheck, Award, Plus, Calendar, Sparkles, User } from 'lucide-react';

export default function MilestoneTracker() {
  const { user, activeChild, activeChildIndex, setActiveChildIndex, updateChildMilestones } = useAuth();
  const [milestones, setMilestones] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [loading, setLoading] = useState(true);

  const domains = [
    'All',
    'Physical & Motor',
    'Cognitive & Language',
    'Social & Emotional',
    'Vaccination Schedule'
  ];

  const fetchMilestones = async () => {
    setLoading(true);
    try {
      const data = await apiFetch(`/milestones?domain=${encodeURIComponent(selectedDomain)}`);
      setMilestones(data || []);
    } catch (err) {
      console.warn('Using milestone fallback');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMilestones();
  }, [selectedDomain]);

  const completedList = activeChild?.completedMilestones || [];
  const totalCount = milestones.length;
  const completedCount = milestones.filter(m => completedList.includes(m._id)).length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const handleToggle = async (mId) => {
    const isCompleted = completedList.includes(mId);
    const updatedList = isCompleted
      ? completedList.filter(id => id !== mId)
      : [...completedList, mId];

    updateChildMilestones(activeChild?._id, updatedList);

    try {
      await apiFetch('/milestones/toggle', {
        method: 'POST',
        body: JSON.stringify({ childId: activeChild?._id, milestoneId: mId })
      });
    } catch (err) {
      // optimistic update retained
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Child Selector & Progress Bar Card */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-50 via-teal-50 to-amber-50 border border-emerald-100 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6">
        
        {/* Left: Child Profile Switcher */}
        <div className="space-y-3 flex-1">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
              Child Growth Log
            </span>
          </div>

          {user?.children && user.children.length > 0 ? (
            <div className="flex items-center space-x-3">
              {user.children.map((child, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveChildIndex(idx)}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center space-x-2 border ${
                    activeChildIndex === idx
                      ? 'bg-slate-900 text-white border-transparent shadow-md'
                      : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>{child.name}</span>
                </button>
              ))}
            </div>
          ) : (
            <h2 className="text-xl font-bold text-slate-900">Child Milestone Dashboard</h2>
          )}

          <p className="text-xs text-slate-600">
            Log developmental growth achievements and keep track of essential CDC & WHO routine vaccination schedules.
          </p>
        </div>

        {/* Right: Interactive Progress Gauge */}
        <div className="glass-card p-5 rounded-2xl bg-white/90 min-w-[280px] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center space-x-1">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Development Index</span>
            </span>
            <span className="text-sm font-extrabold text-emerald-700">{progressPercent}%</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-amber-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="text-[11px] text-slate-500 font-medium text-right">
            {completedCount} of {totalCount} milestone checkpoints logged
          </div>
        </div>

      </div>

      {/* Domain Filters */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 no-scrollbar">
        {domains.map((dom) => (
          <button
            key={dom}
            onClick={() => setSelectedDomain(dom)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedDomain === dom
                ? 'bg-slate-900 text-white shadow-sm'
                : 'glass-card text-slate-700 hover:bg-white'
            }`}
          >
            {dom}
          </button>
        ))}
      </div>

      {/* Milestones Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div className="col-span-full text-center py-12 text-slate-400 font-medium">
            Loading growth milestones...
          </div>
        ) : (
          milestones.map((m) => {
            const isDone = completedList.includes(m._id);
            return (
              <div
                key={m._id}
                onClick={() => handleToggle(m._id)}
                className={`glass-card p-5 rounded-2xl cursor-pointer transition-all duration-200 flex flex-col justify-between border ${
                  isDone
                    ? 'bg-emerald-50/60 border-emerald-300/80 shadow-xs'
                    : 'hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      m.domain === 'Vaccination Schedule'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-teal-100 text-teal-800'
                    }`}>
                      {m.domain}
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold">{m.ageCategory}</span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 leading-tight mb-1">
                    {m.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {m.description}
                  </p>
                </div>

                {/* Practical Tip */}
                {m.tip && (
                  <div className="mt-3 p-2.5 rounded-xl bg-white/80 border border-slate-100 text-[11px] text-slate-600 italic">
                    💡 <span className="font-semibold">Parent Tip:</span> {m.tip}
                  </div>
                )}

                {/* Completion Check Button */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-slate-400">
                    Status: <span className={isDone ? 'text-emerald-700 font-bold' : 'text-slate-500'}>
                      {isDone ? 'Achieved ✓' : 'In Progress'}
                    </span>
                  </span>

                  <button
                    className={`flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      isDone
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {isDone ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Circle className="w-3.5 h-3.5 text-slate-400" />}
                    <span>{isDone ? 'Completed' : 'Mark Done'}</span>
                  </button>
                </div>

              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
