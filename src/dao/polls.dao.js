const moment = require('moment');
const { randomColor } = require('../plugin/helper/colorHelper');

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
      throw Error('Failed to save in db');
    }
  };

  const updatePollDao = async (poll) => {
    try {
      //  Yearly High / Low , Daily High / Low and current price will be the same
      const pollUpdated = await db.one(
        `UPDATE polls
        SET poll_name= $1, poll_desc=$2, is_featured=$3
        WHERE poll_id =$4 RETURNING *`,
        [poll.pollName, poll.pollDesc, poll.isFeatured, poll.pollId]
      );
      return pollUpdated;
    } catch (error) {
      console.log(error);
      throw Error('Not valid poll data - failed to save in db');
    }
  };

  const getAllDao = async () => {
    try {
      const polls = await db.query(
        `select * from polls p 
        join poll_options po on po.poll_id = p.poll_id 
        order by 
        p.is_featured DESC,  p.created_at`
      );

      return polls;
    } catch (error) {
      throw Error('failed to fetch poll records from db');
    }
  };

  const getAllUserPollsDao = async (userId) => {
    try {
      const polls = await db.query(
        `select * from polls p 
        join poll_options po on po.poll_id = p.poll_id 
        where p.user_id =$1
        order by 
        p.is_featured DESC,  p.created_at
        
        `,
        [userId]
      );

      return polls;
    } catch (error) {
      console.log(error);
      throw Error('failed to fetch poll records from db');
    }
  };

  const getAllPollResultsDao = async () => {
    try {
      const data = await db.query(
        `select 
          p.poll_id as "pollId",
          p.poll_name as "pollName",
          p.poll_desc as "pollDesc",
          p.is_featured as "isFeatured",
          p.created_at as "createdAt",
          p.updated_at as "updatedAt"
        ,
            (
              select array_to_json(array_agg(b))
              from (
                select po.poll_id as "pollId", po.poll_option_id as "pollOptionId" , po.color, po.option_name as "optionName",  count(v.vote_id),
                (count(v.vote_id) * 100 /   (select nullif(count(vote_id), 0) from votes v2 where v2.poll_id= po.poll_id)) as "percentage"
                from votes v
                full outer join poll_options po 
                on po.poll_option_id  = v.poll_option_id 
                 where po.poll_id = p.poll_id 
                group by po.poll_id, po.poll_option_id ,po.color, po.option_name 
               
              ) b
            ) as votes
          from polls p;`
      );

      return data;
    } catch (error) {
      console.log(error);
      throw Error('failed to fetch poll result records from db');
    }
  };

  const getAllPollResultByIdDao = async (pollId) => {
    try {
      const data = await db.query(
        `select 
          p.poll_id as "pollId",
          p.poll_name as "pollName",
          p.poll_desc as "pollDesc",
          p.is_featured as "isFeatured",
          p.created_at as "createdAt",
          p.updated_at as "updatedAt"
        ,
            (
              select array_to_json(array_agg(b))
              from (
                select po.poll_id as "pollId", po.poll_option_id as "pollOptionId" , po.color, po.option_name as "optionName",  count(v.vote_id),
                (count(v.vote_id) * 100 /   (select nullif(count(vote_id), 0) from votes v2 where v2.poll_id= po.poll_id)) as "percentage"
                from votes v
                full outer join poll_options po 
                on po.poll_option_id  = v.poll_option_id 
                 where po.poll_id = p.poll_id 
                group by po.poll_id, po.poll_option_id ,po.color, po.option_name 
               
              ) b
            ) as votes
          from polls p
          where poll_id=$1
          `,
        [pollId]
      );

      return data;
    } catch (error) {
      console.log(error);
      throw Error('failed to fetch poll result records from db');
    }
  };

  const getPollByIdDao = async (pollId) => {
    try {
      const polls = await db.query(
        `select * from polls p 
        join poll_options po on po.poll_id = p.poll_id 
        where p.poll_id =$1`,
        [pollId]
      );

      return polls;
    } catch (error) {
      console.log(error);
      throw Error('failed to fetch poll records from db');
    }
  };

  const insertPollOptionsDao = async (pollOptions, pollId) => {
    if (pollOptions.length > 0) {
      try {
        const insertValues = pollOptions.map((po) => {
          let values = `('${pollId}'::uuid, '${po.optionName}', '${
            po.color || randomColor()
          }')`;
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

  const updatePollOptionsDao = async (pollOptions, pollId) => {
    try {
      const updateValues = pollOptions.map((po) => {
        let values = `('${po.pollOptionId}'::uuid, '${po.optionName}', '${po.color}')`;
        return values;
      });
      const query = `update poll_options
      set
      option_name = tmp.option_name,
        color = tmp.color 
      from ( values  ${updateValues.join(',')}) 
      as tmp (poll_option_id , option_name, color)
      where
      poll_options.poll_option_id = tmp.poll_option_id;`;

      console.log(query);

      const pollOptionsUpdated = await db.query(query);
      return pollOptionsUpdated;
    } catch (error) {
      console.log(error);
      throw Error('Not valid stock data - failed to update in db');
    }
  };

  return {
    save,
    getAllDao,
    insertPollOptionsDao,
    updatePollOptionsDao,
    updatePollDao,
    getAllUserPollsDao,
    getPollByIdDao,
    getAllPollResultsDao,
    getAllPollResultByIdDao,
  };
};

module.exports = pollsRepository;
