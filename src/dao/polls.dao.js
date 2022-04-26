const moment = require('moment');

const pollsRepository = (db) => {
  // save poll in db
  const save = async (poll) => {
    try {
      const { id } = await db.one(
        `INSERT INTO polls(title, description, skills, min_budget, max_budget, expired_at, user_id)
            values($1,$2, $3, $4, $5, $6, $7) RETURNING id
          `,
        [
          poll.title,
          poll.description,
          poll.skills,
          poll.minBudget,
          poll.maxBudget,
          poll.expiredAt,
          poll.userId,
        ]
      );

      return id;
    } catch (error) {
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
