const moment = require('moment');
const PollsService = require('../../service/polls.service');
const { postRequestBody, queryParameter } = require('./polls.schema');

// mark this function as async - required
const pollsRoute = async (fastify) => {
  const { createPoll, getPolls } = PollsService(fastify);

  fastify.get(
    '/',
    { schema: { querystring: queryParameter } },
    async (request, reply) => {
      // authenticate request
      // append user request.user
      await fastify.authenticate(request, reply);

      const { limit, offset } = request.query;

      const polls = await getPolls(limit, offset);
      reply.code(200).send({ polls });
    }
  );

  fastify.post(
    '/',
    {
      schema: { body: postRequestBody },
    },
    async (request, reply) => {
      // authenticate request
      await fastify.authenticate(request, reply);

      const poll = request.body;
      console.log('poll', poll);
      const pollId = await createPoll(poll);
      console.log(pollId);
      reply.code(201).send({ pollId });
      // reply.code(201).send({ pollId });
    }
  );
};

module.exports = pollsRoute;
