const moment = require('moment');
const VotesRepository = require('../dao/votes.dao');
const PollsRepository = require('../dao/polls.dao');

const votesService = (fastify) => {
  const { castVoteDao, validateVoteDao, getUserVoteDao } = VotesRepository(
    fastify.db
  );
  const { getAllPollResultsDao, getAllPollResultByIdDao } = PollsRepository(
    fastify.db
  );

  const castVote = async (vote) => {
    // const isAlreadyVoted = await validateVote(vote);
    const isAlreadyVoted = true;
    if (isAlreadyVoted) {
      const voteId = await castVoteDao(vote);
      // Trigger socket
      sendPollingUpdates(vote);
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

  const sendPollingUpdates = async (vote) => {
    const pollsResults = await getAllPollResultsDao();
    const pollResult = await getAllPollResultByIdDao(vote.pollId);
    let socketMsg = {
      polls: pollsResults,
      poll: pollResult,
    };
    fastify.websocketServer.clients.forEach(function each(client) {
      if (client.readyState == 1) {
        client.send(JSON.stringify(socketMsg));
      }
    });
  };

  const getUserVote = async (vote) => {
    const voteData = await getUserVoteDao(vote);
    return voteData;
  };

  return { castVote, getUserVote };
};

module.exports = votesService;
