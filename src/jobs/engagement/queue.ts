import { Queue } from 'bullmq';
import { connection } from '../../config/redis.config';
import { ScrapeJobData } from './types';

export const scrapingQueue = new Queue<ScrapeJobData>('scraping-tasks', {
  connection,
});
