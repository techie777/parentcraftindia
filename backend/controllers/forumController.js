import Post from '../models/Post.js';

// Pre-seeded mock posts for instant presentation if database is empty or offline
export let mockPosts = [
  {
    _id: 'post_01',
    title: 'Managing screen time tantrums in 4-year-olds without yelling?',
    content: `My 4-year-old daughter throws intense meltdowns whenever it is time to turn off the iPad after her 20-minute cartoon slot. We try warnings ("5 minutes left!"), but she still screams and throws things. What gentle parenting strategies have actually worked for you all?`,
    author: {
      _id: 'usr_parent_01',
      name: 'Priya Sharma',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      role: 'parent',
      isVerifiedExpert: false
    },
    ageCategory: 'Ages 1-5',
    tags: ['Screen Time', 'Behavior', 'Tantrums'],
    upvotes: ['usr_parent_02', 'usr_parent_03', 'usr_expert_01'],
    pinned: true,
    isFlagged: false,
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    comments: [
      {
        _id: 'c_01',
        author: {
          _id: 'usr_expert_01',
          name: 'Dr. Ananya Roy',
          avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80',
          role: 'expert',
          isVerifiedExpert: true,
          specialization: 'Pediatric Development & Behavioral Health'
        },
        content: `Hi Priya! Transition anxiety is very common at 4 years. Try using a visual visual timer (like a sand timer) so she can see time moving, and pair transition with a desirable high-dopamine alternative: "When the screen sleeps, we get to go pick three colored crayons for our secret drawing book!"`,
        createdAt: new Date(Date.now() - 3600000 * 3).toISOString()
      },
      {
        _id: 'c_02',
        author: {
          _id: 'usr_parent_02',
          name: 'Vikram Mehta',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
          role: 'parent'
        },
        content: `Dr. Ananya's tip about the physical sand timer transformed our house! We also let our son press the red power button himself to give him a feeling of control.`,
        createdAt: new Date(Date.now() - 3600000 * 1).toISOString()
      }
    ]
  },
  {
    _id: 'post_02',
    title: 'Newborn sleep cycles: Is 2 hours at a time normal during weeks 3-6?',
    content: `First time mother here! Our baby boy wakes up every 90 minutes to 2 hours for feeding. Exhaustion is hitting hard. Is this normal cluster feeding or should we tweak night routine?`,
    author: {
      _id: 'usr_parent_04',
      name: 'Sunita Reddy',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      role: 'parent'
    },
    ageCategory: 'Newborn (0-3m)',
    tags: ['Sleep', 'Feeding', 'Newborn Care'],
    upvotes: ['usr_parent_01', 'usr_parent_05'],
    pinned: false,
    isFlagged: false,
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    comments: [
      {
        _id: 'c_03',
        author: {
          _id: 'usr_parent_01',
          name: 'Priya Sharma',
          avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
          role: 'parent'
        },
        content: `Hang in there Mama! Weeks 3-6 are peak growth spurt phase. Their stomachs are tiny so 2-hour cycles are completely normal. Sleep when baby sleeps if you can!`,
        createdAt: new Date(Date.now() - 3600000 * 8).toISOString()
      }
    ]
  },
  {
    _id: 'post_03',
    title: 'How to support a teenager experiencing academic burnout & exam anxiety?',
    content: `Our 15-year-old son has been studying 10 hours a day for grade 10 board exams and has recently become withdrawn, sleeping poorly, and expressing feelings of "never being good enough". How do we help him balance without adding pressure?`,
    author: {
      _id: 'usr_parent_05',
      name: 'Rajesh Kulkarni',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      role: 'parent'
    },
    ageCategory: 'Ages 10-18',
    tags: ['Academic Pressure', 'Mental Health', 'Teens'],
    upvotes: ['usr_parent_01', 'usr_parent_02', 'usr_parent_03', 'usr_expert_01'],
    pinned: true,
    isFlagged: false,
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    comments: [
      {
        _id: 'c_04',
        author: {
          _id: 'usr_expert_01',
          name: 'Dr. Ananya Roy',
          avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80',
          role: 'expert',
          isVerifiedExpert: true,
          specialization: 'Pediatric Development & Behavioral Health'
        },
        content: `This is a crucial moment for empathetic validation. Explicitly tell him: "Your worth as our son is 100% independent of your exam marks." Schedule mandatory 30-minute outdoor walks or sports breaks together every evening to regulate cortisol levels.`,
        createdAt: new Date(Date.now() - 3600000 * 18).toISOString()
      }
    ]
  }
];

export const getPosts = async (req, res) => {
  const { ageCategory, tag, search } = req.query;

  try {
    let query = {};
    if (ageCategory && ageCategory !== 'All') {
      query.ageCategory = ageCategory;
    }
    if (tag) {
      query.tags = tag;
    }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }

    const posts = await Post.find(query).sort({ pinned: -1, createdAt: -1 });
    if (posts && posts.length > 0) {
      return res.json(posts);
    }
  } catch (error) {
    // Database search error or empty - fallback to memory filters
  }

  let filtered = [...mockPosts];
  if (ageCategory && ageCategory !== 'All') {
    filtered = filtered.filter(p => p.ageCategory === ageCategory);
  }
  if (tag) {
    filtered = filtered.filter(p => p.tags.includes(tag));
  }
  if (search) {
    const s = search.toLowerCase();
    filtered = filtered.filter(p => p.title.toLowerCase().includes(s) || p.content.toLowerCase().includes(s));
  }

  return res.json(filtered);
};

export const getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (post) return res.json(post);
  } catch (e) {
    // fallback
  }

  const found = mockPosts.find(p => p._id === id);
  if (found) return res.json(found);
  return res.status(404).json({ message: 'Post not found' });
};

export const createPost = async (req, res) => {
  const { title, content, ageCategory, tags } = req.body;
  const author = {
    _id: req.user?._id || 'usr_demo',
    name: req.user?.name || 'Anonymous Parent',
    avatar: req.user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    role: req.user?.role || 'parent',
    isVerifiedExpert: req.user?.isVerifiedExpert || false,
    specialization: req.user?.specialization || ''
  };

  try {
    const post = await Post.create({
      title,
      content,
      author,
      ageCategory: ageCategory || 'General Parenting',
      tags: tags || ['General']
    });
    return res.status(201).json(post);
  } catch (error) {
    const newMockPost = {
      _id: `post_${Date.now()}`,
      title,
      content,
      author,
      ageCategory: ageCategory || 'General Parenting',
      tags: tags || ['General'],
      upvotes: [],
      comments: [],
      isFlagged: false,
      createdAt: new Date().toISOString()
    };
    mockPosts.unshift(newMockPost);
    return res.status(201).json(newMockPost);
  }
};

export const upvotePost = async (req, res) => {
  const { id } = req.params;
  const userId = req.user?._id || 'usr_demo';

  try {
    const post = await Post.findById(id);
    if (post) {
      const index = post.upvotes.indexOf(userId);
      if (index === -1) {
        post.upvotes.push(userId);
      } else {
        post.upvotes.splice(index, 1);
      }
      await post.save();
      return res.json(post);
    }
  } catch (e) {
    // fallback
  }

  const mock = mockPosts.find(p => p._id === id);
  if (mock) {
    const index = mock.upvotes.indexOf(userId);
    if (index === -1) {
      mock.upvotes.push(userId);
    } else {
      mock.upvotes.splice(index, 1);
    }
    return res.json(mock);
  }

  return res.status(404).json({ message: 'Post not found' });
};

export const addComment = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  const author = {
    _id: req.user?._id || 'usr_demo',
    name: req.user?.name || 'Parent Member',
    avatar: req.user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    role: req.user?.role || 'parent',
    isVerifiedExpert: req.user?.isVerifiedExpert || false,
    specialization: req.user?.specialization || ''
  };

  const newComment = {
    _id: `c_${Date.now()}`,
    author,
    content,
    createdAt: new Date().toISOString()
  };

  try {
    const post = await Post.findById(id);
    if (post) {
      post.comments.push(newComment);
      await post.save();

      // Emit real-time comment socket event if io instance is attached
      if (req.io) {
        req.io.emit(`comment:${id}`, newComment);
      }
      return res.status(201).json(post);
    }
  } catch (e) {
    // fallback
  }

  const mock = mockPosts.find(p => p._id === id);
  if (mock) {
    mock.comments.push(newComment);
    if (req.io) {
      req.io.emit(`comment:${id}`, newComment);
    }
    return res.status(201).json(mock);
  }

  return res.status(404).json({ message: 'Post not found' });
};

export const flagPost = async (req, res) => {
  const { id } = req.params;
  const { reason } = req.body;

  try {
    const post = await Post.findById(id);
    if (post) {
      post.isFlagged = true;
      post.flagReason = reason || 'Reported by community member';
      await post.save();
      return res.json({ message: 'Post reported successfully for moderation', post });
    }
  } catch (e) {
    // fallback
  }

  const mock = mockPosts.find(p => p._id === id);
  if (mock) {
    mock.isFlagged = true;
    mock.flagReason = reason || 'Reported by community member';
    return res.json({ message: 'Post reported successfully for moderation', post: mock });
  }

  return res.status(404).json({ message: 'Post not found' });
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    await Post.findByIdAndDelete(id);
  } catch (e) {
    // fallback
  }
  const idx = mockPosts.findIndex(p => p._id === id);
  if (idx !== -1) mockPosts.splice(idx, 1);
  return res.json({ message: 'Post deleted successfully' });
};
