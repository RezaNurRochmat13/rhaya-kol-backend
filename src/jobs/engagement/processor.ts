import { Job } from 'bullmq';
import { ScrapeJobData, EngagementStats } from './types';
import { PostRepository } from '../../repository/post.repository';

const { createEngagementLog } = PostRepository();

export const processEngagementJob = async (job: Job<ScrapeJobData>) => {
  const { postId, url } = job.data;

  console.log(`[Worker] Processing job ${job.id} for: ${url}`);

  try {
    const mockStats: EngagementStats = {
      likes: Math.floor(Math.random() * 500),
      comments: Math.floor(Math.random() * 50),
      shares: Math.floor(Math.random() * 20),
      capturedAt: new Date(),
    };

    await createEngagementLog(postId, mockStats);

    return { success: true, postId };
  } catch (error) {
    console.error(`[Worker] Error at ${url}:`, error);
    throw error;
  }
};
