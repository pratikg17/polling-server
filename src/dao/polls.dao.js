const moment = require('moment');

const pollsRepository = (db) => {
  // save poll in db
  const save = async (poll) => {
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

  const insertPollOptions = async (pollOptions, pollId) => {
    if (pollOptions.length > 0) {
      try {
        const insertValues = pollOptions.map((po) => {
          let values = `('${pollId}'::uuid, '${po.optionName}', '${po.color}')`;
          return values;
        });

        let values = insertValues.join(',');
        if (insertValues.length < 1) {
          values = insertValues[0];
        }

        const query = `INSERT INTO poll_options
        (poll_id, option_name, color) values  ${insertValues.join(',')}`;

        console.log('query', query);
        const insertOptions = await db.query(query);
        return insertOptions;
      } catch (error) {
        console.log(error);
        throw Error('Not valid process orders data - failed to update in db');
      }
    } else {
      return null;
    }
  };
  return { save, getAll, insertPollOptions };
};

module.exports = pollsRepository;
