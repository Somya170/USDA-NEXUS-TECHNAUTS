const { Worker } = require('bullmq');
const IORedis = require('ioredis');
const path = require('path');

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
const connection = new IORedis(redisUrl);

// run worker to process guardian jobs
const worker = new Worker('guardian-queue', async job => {
  // lazy require to avoid startup cycles
  const guardian = require('../agents/guardian/guardian.worker');
  await guardian.run(job.data.useCaseId);
}, { connection });

worker.on('completed', job => {
  console.log('Guardian job completed', job.id);
});

worker.on('failed', (job, err) => {
  console.error('Guardian job failed', job.id, err);
});

module.exports = {
  triggerGuardian(useCaseId) {
    const { guardianQueue } = require('./queue');
    return guardianQueue.add('guardian-job', { useCaseId });
  }
};
