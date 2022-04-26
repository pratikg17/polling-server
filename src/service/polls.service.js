const moment = require('moment');
const PollsRepository = require('../dao/polls.dao');

const pollsService = (fastify) => {
  const { save, getAll } = PollsRepository(fastify.db);

  const createPoll = async (job) => {
    const jobId = await save(job);
    return jobId;
  };

  const getPolls = async (limit, offset) => {
    const jobs = await getAll(limit, offset);

    return jobs.map((job) => ({
      id: job.id,
      title: job.title,
      description: job.description,
      skills: job.skills,
      minBudget: job.min_budget,
      maxBudget: job.max_budget,
      expiredAt: job.expired_at,
      userId: job.user_id,
      createdAt: moment(job.created_at).format('DD/MM/YYYY'),
      updatedAt: moment(job.updated_at).format('DD/MM/YYYY'),
      version: job.version,
    }));
  };

  return { createPoll, getPolls };
};

module.exports = pollsService;
