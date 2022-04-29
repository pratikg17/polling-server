const moment = require('moment');
const VotesRepository = require('../dao/votes.dao');

const votesService = (fastify) => {
  const { castVoteDao } = VotesRepository(fastify.db);

  const castVote = async (poll) => {
    const pollId = await castVoteDao(poll);
    return pollId;
  };

  return { castVote };
};

module.exports = votesService;
