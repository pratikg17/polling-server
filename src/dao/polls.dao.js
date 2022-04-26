const moment = require('moment');

const pollsRepository = (db) => {
  // save poll in db
  const save = async (poll) => {
    try {
      const { id } = await db.one(
        `INSERT INTO polls(poll_name, poll_desc, user_id, is_featured)
            values($1,$2, $3, $4) RETURNING id
          `,
        [poll.pollName, poll.pollDesc, poll.userId, poll.isFeatured]
      );

      return id;
    } catch (error) {
      console.log('error', error);
      throw Error('Faild to save in db');
    }
  };

  const getAll = async (limit, offset) => {
    try {
      const currentDate = moment().format('YYYY-MM-DD');
      const polls = await db.query(
        `
            select * from polls where expired_at >= $1 order by created_at limit $2 offset $3
          `,
        [currentDate, limit, offset]
      );

      return polls;
    } catch (error) {
      throw Error('failed to fetch poll records from db');
    }
  };

  return { save, getAll };
};

module.exports = pollsRepository;
