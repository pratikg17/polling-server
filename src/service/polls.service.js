const moment = require('moment');
const PollsRepository = require('../dao/polls.dao');

const pollsService = (fastify) => {
  const {
    save,
    getAllDao,
    insertPollOptionsDao,
    updatePollDao,
    updatePollOptionsDao,
  } = PollsRepository(fastify.db);

  const createPoll = async (poll) => {
    const pollId = await save(poll);
    await insertPollOptionsDao(poll.pollOptions, pollId);
    return pollId;
  };

  const updatePoll = async (poll) => {
    const pollId = await updatePollDao(poll);

    let updateValues = [];
    let insertValues = [];

    poll.pollOptions.forEach((po) => {
      if (po.pollOptionId) {
        updateValues.push(po);
      } else {
        insertValues.push(po);
      }
    });
    await insertPollOptionsDao(insertValues, poll.pollId);
    await updatePollOptionsDao(updateValues, poll.pollId);

    return pollId;
  };

  const getPolls = async (limit, offset) => {
    const polls = await getAll(limit, offset);

    return polls.map((poll) => ({
      id: poll.id,
      title: poll.title,
      description: poll.description,
      skills: poll.skills,
      minBudget: poll.min_budget,
      maxBudget: poll.max_budget,
      expiredAt: poll.expired_at,
      userId: poll.user_id,
      createdAt: moment(poll.created_at).format('DD/MM/YYYY'),
      updatedAt: moment(poll.updated_at).format('DD/MM/YYYY'),
      version: poll.version,
    }));
  };

  return { createPoll, getPolls, updatePoll };
};

module.exports = pollsService;
