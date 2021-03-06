const moment = require('moment');
const PollsRepository = require('../dao/polls.dao');

const pollsService = (fastify) => {
  const {
    save,
    getAllDao,
    insertPollOptionsDao,
    updatePollDao,
    updatePollOptionsDao,
    getAllUserPollsDao,
    getPollByIdDao,
    getAllPollResultsDao,
    getAllPollResultByIdDao,
    deletePollByIdDao,
  } = PollsRepository(fastify.db);

  const createPoll = async (poll) => {
    const pollId = await save(poll);
    await insertPollOptionsDao(poll.pollOptions, pollId);
    sendPollingUpdates();
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
    sendPollingUpdates();
    return pollId;
  };

  const getPolls = async () => {
    const polls = await getAllDao();
    return formatPolls(polls);
  };

  const getPollById = async (pollId) => {
    const polls = await getPollByIdDao(pollId);
    return formatPolls(polls);
  };

  const getAllUserPolls = async (userId) => {
    const polls = await getAllUserPollsDao(userId);
    return formatPolls(polls);
  };

  const getAllPollResults = async () => {
    const results = await getAllPollResultsDao();
    return results;
  };

  const getPollResultById = async (pollId) => {
    const results = await getAllPollResultByIdDao(pollId);
    return results;
  };

  const sendPollingUpdates = async () => {
    const pollsResults = await getAllPollResultsDao();
    let socketMsg = {
      polls: pollsResults,
    };
    fastify.websocketServer.clients.forEach(function each(client) {
      if (client.readyState == 1) {
        client.send(JSON.stringify(socketMsg));
      }
    });
  };

  const deletePollById = async (pollId) => {
    const pollData = await deletePollByIdDao(pollId);
    sendPollingUpdates();
    return pollData;
  };

  return {
    createPoll,
    getPolls,
    updatePoll,
    getAllUserPolls,
    getPollById,
    getAllPollResults,
    getPollResultById,
    deletePollById,
  };
};

const formatPolls = (polls) => {
  let pollsData = {};
  polls.forEach((poll) => {
    if (!pollsData[poll.poll_id]) {
      pollsData[poll.poll_id] = {
        pollId: poll.poll_id,
        pollName: poll.poll_name,
        pollDesc: poll.poll_desc,
        userId: poll.user_id,
        isFeatured: poll.is_featured,
        pollOptions: [],
      };

      pollsData[poll.poll_id].pollOptions.push({
        pollOptionId: poll.poll_option_id,
        optionName: poll.option_name,
        color: poll.color,
        pollId: poll.poll_id,
      });
    } else {
      pollsData[poll.poll_id].pollOptions.push({
        pollOptionId: poll.poll_option_id,
        optionName: poll.option_name,
        color: poll.color,
        pollId: poll.poll_id,
      });
    }
  });

  let formattedData = Object.values(pollsData);
  return formattedData;
};

module.exports = pollsService;
