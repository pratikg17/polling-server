const moment = require('moment');

const votesRepository = (db) => {
  // save poll in db
  const castVoteDao = async (poll) => {
    try {
      const { id } = await db.one(
        `INSERT INTO polls(poll_name, poll_desc, user_id, is_featured)
            values($1,$2, $3, $4) RETURNING poll_id as id`,
        [poll.pollName, poll.pollDesc, poll.userId, poll.isFeatured]
      );
      return id;
    } catch (error) {
      console.log('error', error);
      throw Error('Faild to save in db');
    }
  };

  return {
    castVoteDao,
  };
};

module.exports = votesRepository;
