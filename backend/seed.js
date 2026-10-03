import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import User from './models/User.js';
import Post from './models/Post.js';
import Question from './models/Question.js';
import Milestone from './models/Milestone.js';
import { mockUsers } from './controllers/authController.js';
import { mockPosts } from './controllers/forumController.js';
import { mockQuestions } from './controllers/qaController.js';
import { mockMilestones } from './controllers/milestoneController.js';

dotenv.config();

const seedData = async () => {
  const isDbConnected = await connectDB();
  if (!isDbConnected) {
    console.log('[Seed]: DB not connected, skipping seed to database. In-memory data will be used automatically.');
    process.exit(0);
  }

  try {
    await User.deleteMany();
    await Post.deleteMany();
    await Question.deleteMany();
    await Milestone.deleteMany();

    console.log('[Seed]: Cleaned existing collections...');

    const createdUsers = await User.insertMany(mockUsers);
    console.log(`[Seed]: Seeded ${createdUsers.length} users.`);

    const createdPosts = await Post.insertMany(mockPosts);
    console.log(`[Seed]: Seeded ${createdPosts.length} posts.`);

    const createdQuestions = await Question.insertMany(mockQuestions);
    console.log(`[Seed]: Seeded ${createdQuestions.length} Q&A items.`);

    const createdMilestones = await Milestone.insertMany(mockMilestones);
    console.log(`[Seed]: Seeded ${createdMilestones.length} milestones.`);

    console.log('[Seed Successful]: All Parvarish data populated!');
    process.exit(0);
  } catch (error) {
    console.error('[Seed Error]:', error);
    process.exit(1);
  }
};

seedData();
