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

  const getPolls = async () => {
    const polls = await getAllDao();
    let pollsData = {};
    polls.forEach((poll) => {
      if (!pollsData[poll.poll_id]) {
        pollsData[poll.poll_id] = {
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

  return { createPoll, getPolls, updatePoll };
};

module.exports = pollsService;
