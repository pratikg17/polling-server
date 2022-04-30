const moment = require('moment');
const VotesRepository = require('../dao/votes.dao');

const votesService = (fastify) => {
  const { castVoteDao, validateVoteDao, getUserVoteDao } = VotesRepository(
    fastify.db
  );

  const castVote = async (vote) => {
    // const isAlreadyVoted = await validateVote(vote);
    const isAlreadyVoted = true;
    if (isAlreadyVoted) {
      const voteId = await castVoteDao(vote);
      // Trigger socket
      return voteId;
    } else {
      throw new Error('Already voted for the poll!');
    }
  };

  const validateVote = async (vote) => {
    const voteCount = await validateVoteDao(vote);

    if (voteCount > 0) {
      return false;
    } else {
      return true;
    }
  };

  const getUserVote = async (vote) => {
    const voteData = await getUserVoteDao(vote);
    return voteData;
  };

  return { castVote, getUserVote };
};

module.exports = votesService;
