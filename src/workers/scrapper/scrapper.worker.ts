import { Worker } from 'bullmq';
import { connection } from '../../config/redis.config';
import { processEngagementJob } from '../../jobs/engagement/processor';
import { ScrapeJobData } from '../../jobs/engagement/types';

const scrappingWorker = new Worker<ScrapeJobData>('scraping-tasks', processEngagementJob, {
  connection,
});

scrappingWorker.on('completed', (job) => {
  console.log(`[Worker] Job ${job.id} has completed!`);
});

scrappingWorker.on('failed', (job, err) => {
  console.error(`[Worker] Job ${job?.id} failed with error: ${err.message}`);
});

export default scrappingWorker;
