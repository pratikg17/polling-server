const moment = require('moment');

const votesRepository = (db) => {
  // save poll in db
  const castVoteDao = async (vote) => {
    try {
      const { id } = await db.one(
        `INSERT INTO public.votes
        (poll_option_id, poll_id, user_id)
            values($1,$2, $3) RETURNING vote_id as id`,
        [vote.pollOptionId, vote.pollId, vote.userId]
      );
      return id;
    } catch (error) {
      console.log('error', error);
      throw Error('Failed to save in db');
    }
  };

  const validateVoteDao = async (vote) => {
    try {
      const { count } = await db.one(
        `select count(*) as count from votes v where 
        user_id =$1 and 
        poll_id =$2`,
        [vote.userId, vote.pollId]
      );
      console.log('count', count);
      return count;
    } catch (error) {
      console.log('error', error);
      throw Error('Failed to save in db');
    }
  };

  const getUserVoteDao = async (vote) => {
    try {
      let query = `select v.poll_id as "pollId",  vote_id as "voteId", po.poll_option_id as "pollOptionId" , po.option_name as "optionName" , po.color as "color" from votes v
      join poll_options po on po.poll_option_id  = v .poll_option_id 
      where v.poll_id='${vote.pollId}'
      and v.user_id='${vote.userId}'`;
      const data = await db.query(query);
      return data;
    } catch (error) {
      console.log('error', error);
      throw Error('Failed to get votes in db');
    }
  };

  return {
    castVoteDao,
    validateVoteDao,
    getUserVoteDao,
  };
};

module.exports = votesRepository;
