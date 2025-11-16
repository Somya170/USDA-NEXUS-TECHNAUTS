const { Queue } = require('bullmq');
const IORedis = require('ioredis');

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
const connection = new IORedis(redisUrl);

const guardianQueue = new Queue('guardian-queue', { connection });

module.exports = { guardianQueue };
