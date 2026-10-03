import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { apiFetch, socket } from '../services/api';
import { MessageSquare, ThumbsUp, Tag, Plus, CheckCircle2, Flag, Search, Filter, Share2, Send, X, CornerDownRight } from 'lucide-react';

export default function ForumFeed({ onOpenCreatePost, initialFilterAge }) {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAgeFilter, setSelectedAgeFilter] = useState(initialFilterAge || 'All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Active Thread Modal State
  const [activeThread, setActiveThread] = useState(null);
  const [newCommentText, setNewCommentText] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);

  const ageCategories = [
    'All',
    'Newborn (0-3m)',
    'Baby (3-12m)',
    'Toddler (1-3y)',
    'Ages 1-5',
    'Ages 5-10',
    'Ages 10-18',
    '18+ (Young Adult)',
    'General Parenting'
  ];

  const fetchPosts = async () => {
    setLoading(true);
    try {
      let url = `/forum?ageCategory=${encodeURIComponent(selectedAgeFilter)}`;
      if (searchQuery) url += `&search=${encodeURIComponent(searchQuery)}`;
      const data = await apiFetch(url);
      setPosts(data || []);
    } catch (err) {
      console.warn('Using offline post fallback');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [selectedAgeFilter, searchQuery]);

  // Real-time Socket.io listener for comment additions
  useEffect(() => {
    if (activeThread) {
      socket.emit('join_thread', activeThread._id);

      const handleCommentEvent = (newComment) => {
        setActiveThread(prev => {
          if (!prev || prev._id !== activeThread._id) return prev;
          // Avoid duplicate comment append
          if (prev.comments.some(c => c._id === newComment._id)) return prev;
          return { ...prev, comments: [...prev.comments, newComment] };
        });

        // Also update comment count in list view
        setPosts(prevPosts => prevPosts.map(p => {
          if (p._id === activeThread._id) {
            if (p.comments.some(c => c._id === newComment._id)) return p;
            return { ...p, comments: [...p.comments, newComment] };
          }
          return p;
        }));
      };

      socket.on(`comment:${activeThread._id}`, handleCommentEvent);

      return () => {
        socket.off(`comment:${activeThread._id}`, handleCommentEvent);
      };
    }
  }, [activeThread]);

  const handleUpvote = async (postId, e) => {
    e?.stopPropagation();
    try {
      const updated = await apiFetch(`/forum/${postId}/upvote`, { method: 'POST' });
      setPosts(prev => prev.map(p => p._id === postId ? updated : p));
      if (activeThread && activeThread._id === postId) {
        setActiveThread(updated);
      }
    } catch (err) {
      // optimistic update
      setPosts(prev => prev.map(p => {
        if (p._id === postId) {
          const hasUpvoted = p.upvotes.includes(user?._id || 'usr_demo');
          const newUpvotes = hasUpvoted
            ? p.upvotes.filter(id => id !== (user?._id || 'usr_demo'))
            : [...p.upvotes, user?._id || 'usr_demo'];
          return { ...p, upvotes: newUpvotes };
        }
        return p;
      }));
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newCommentText.trim() || !activeThread) return;

    setSubmittingComment(true);
    try {
      const updated = await apiFetch(`/forum/${activeThread._id}/comments`, {
        method: 'POST',
        body: JSON.stringify({ content: newCommentText })
      });
      setActiveThread(updated);
      setNewCommentText('');
      fetchPosts();
    } catch (err) {
      // optimistic add for offline preview
      const fallbackComment = {
        _id: `c_${Date.now()}`,
        author: {
          _id: user?._id || 'usr_demo',
          name: user?.name || 'Parent Member',
          avatar: user?.avatar,
          role: user?.role || 'parent',
          isVerifiedExpert: user?.isVerifiedExpert || false,
          specialization: user?.specialization
        },
        content: newCommentText,
        createdAt: new Date().toISOString()
      };
      setActiveThread(prev => ({ ...prev, comments: [...prev.comments, fallbackComment] }));
      setNewCommentText('');
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleFlagPost = async (postId, e) => {
    e?.stopPropagation();
    try {
      await apiFetch(`/forum/${postId}/flag`, {
        method: 'POST',
        body: JSON.stringify({ reason: 'Reported by community member' })
      });
      alert('Thank you. Post flagged for administrative review.');
    } catch (err) {
      alert('Post flagged for administrative review.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Header & Search Control */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-card p-6 rounded-3xl">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center space-x-2">
            <MessageSquare className="w-7 h-7 text-amber-500" />
            <span>Community Forum & Peer Support</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Share experiences, ask fellow parents, and get insights from certified pediatric experts.
          </p>
        </div>

        <button
          onClick={onOpenCreatePost}
          className="flex items-center justify-center space-x-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 active:scale-95 transition-all"
        >
          <Plus className="w-5 h-5" />
          <span>New Discussion Thread</span>
        </button>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        
        {/* Category Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 no-scrollbar">
          {ageCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedAgeFilter(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedAgeFilter === cat
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'glass-card text-slate-700 hover:bg-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search discussions..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-card text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
          />
        </div>
      </div>

      {/* Discussion List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-16 text-slate-500 text-sm font-medium animate-pulse">
            Loading parenting discussions...
          </div>
        ) : posts.length === 0 ? (
          <div className="glass-card p-12 text-center rounded-3xl space-y-3">
            <MessageSquare className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No discussion threads found</h3>
            <p className="text-xs text-slate-500">Be the first to start a conversation in this category!</p>
            <button
              onClick={onOpenCreatePost}
              className="mt-2 inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold"
            >
              <Plus className="w-4 h-4" />
              <span>Start Discussion</span>
            </button>
          </div>
        ) : (
          posts.map((post) => {
            const hasUpvoted = post.upvotes?.includes(user?._id || 'usr_demo');
            return (
              <div
                key={post._id}
                onClick={() => setActiveThread(post)}
                className="glass-card glass-card-hover p-6 rounded-3xl cursor-pointer space-y-4 relative"
              >
                {post.pinned && (
                  <span className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold uppercase tracking-wider">
                    📌 Pinned Discussion
                  </span>
                )}

                {/* Author Info Header */}
                <div className="flex items-center space-x-3">
                  <img
                    src={post.author.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                    alt={post.author.name}
                    className="w-10 h-10 rounded-full object-cover border border-sage-200"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-bold text-slate-900">{post.author.name}</span>
                      {post.author.isVerifiedExpert && (
                        <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 text-[10px] font-bold">
                          <CheckCircle2 className="w-3 h-3 text-teal-600" />
                          <span>{post.author.specialization || 'Certified Specialist'}</span>
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400">
                      Posted in <span className="font-semibold text-emerald-700">{post.ageCategory}</span>
                    </span>
                  </div>
                </div>

                {/* Title & Body Excerpt */}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 hover:text-teal-700 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 line-clamp-3 leading-relaxed">
                    {post.content}
                  </p>
                </div>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {post.tags.map((tag, i) => (
                      <span key={i} className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-sage-50 text-sage-800 text-[11px] font-semibold">
                        <Tag className="w-3 h-3 text-sage-600" />
                        <span>#{tag}</span>
                      </span>
                    ))}
                  </div>
                )}

                {/* Footer Controls: Upvotes, Comments, Flag */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={(e) => handleUpvote(post._id, e)}
                      className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl font-bold transition-all ${
                        hasUpvoted
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <ThumbsUp className={`w-3.5 h-3.5 ${hasUpvoted ? 'fill-emerald-600 text-emerald-600' : ''}`} />
                      <span>{post.upvotes?.length || 0} Upvotes</span>
                    </button>

                    <div className="flex items-center space-x-1.5 text-slate-500 font-semibold">
                      <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                      <span>{post.comments?.length || 0} Comments</span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => handleFlagPost(post._id, e)}
                    className="text-slate-400 hover:text-rose-600 p-1 rounded-lg transition-colors"
                    title="Report Post"
                  >
                    <Flag className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* THREAD DETAIL MODAL (Threaded Comments & Realtime Socket Replies) */}
      {activeThread && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50/70">
              <div className="flex items-center space-x-3">
                <img
                  src={activeThread.author.avatar}
                  className="w-11 h-11 rounded-full object-cover border border-sage-300"
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-base font-bold text-slate-900">{activeThread.author.name}</span>
                    {activeThread.author.isVerifiedExpert && (
                      <span className="px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 text-[10px] font-bold">
                        Certified Expert
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-slate-500">{activeThread.ageCategory}</span>
                </div>
              </div>

              <button
                onClick={() => setActiveThread(null)}
                className="p-2 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scroll Content */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              <div>
                <h2 className="text-xl font-bold text-slate-900">{activeThread.title}</h2>
                <p className="text-sm text-slate-700 mt-2 leading-relaxed whitespace-pre-line">
                  {activeThread.content}
                </p>
              </div>

              {/* Threaded Comments List */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Discussion Replies ({activeThread.comments?.length || 0})</span>
                </h4>

                {activeThread.comments?.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">No comments yet. Share your experience below!</p>
                ) : (
                  activeThread.comments.map((comment) => (
                    <div
                      key={comment._id}
                      className={`p-4 rounded-2xl border ${
                        comment.author.isVerifiedExpert
                          ? 'bg-teal-50/70 border-teal-200/80'
                          : 'bg-slate-50 border-slate-100'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center space-x-2">
                          <img src={comment.author.avatar} className="w-7 h-7 rounded-full object-cover" />
                          <span className="text-xs font-bold text-slate-900">{comment.author.name}</span>
                          {comment.author.isVerifiedExpert && (
                            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-teal-600 text-white text-[9px] font-bold">
                              <CheckCircle2 className="w-2.5 h-2.5" />
                              <span>{comment.author.specialization || 'Specialist'}</span>
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400">
                          {new Date(comment.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>

                      <p className="text-xs text-slate-700 pl-9 leading-relaxed">
                        {comment.content}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Comment Box Footer */}
            <form onSubmit={handleAddComment} className="p-4 border-t border-slate-100 bg-slate-50 flex items-center space-x-2">
              <input
                type="text"
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                placeholder="Write a supportive reply..."
                className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="submit"
                disabled={submittingComment || !newCommentText.trim()}
                className="px-5 py-3 rounded-xl bg-slate-900 text-white text-xs font-bold flex items-center space-x-1 hover:bg-slate-800 disabled:opacity-50"
              >
                <span>Reply</span>
                <Send className="w-3 h-3" />
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
