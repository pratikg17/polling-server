const moment = require('moment');
const PollsService = require('../../service/polls.service');
const {
  postRequestBody,
  queryParameter,
  updateRequestBody,
} = require('./polls.schema');

// mark this function as async - required
const pollsRoute = async (fastify) => {
  const { createPoll, getPolls, updatePoll, getAllUserPolls, getPollById } =
    PollsService(fastify);

  fastify.get('/', async (request, reply) => {
    const polls = await getPolls();
    reply.code(200).send({ polls });
  });

  fastify.get('/poll-by-id', async (request, reply) => {
    // authenticate request
    // append user request.user
    await fastify.authenticate(request, reply);
    const { poll_id } = request.query;
    const polls = await getPollById(poll_id);
    reply.code(200).send({ polls });
  });

  fastify.get('/my-polls', async (request, reply) => {
    // authenticate request
    // append user request.user
    await fastify.authenticate(request, reply);
    const { user_id } = request.query;
    const polls = await getAllUserPolls(user_id);
    reply.code(200).send({ polls });
  });

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
      reply.code(201).send({ pollId });
    }
  );

  fastify.post(
    '/update-poll',
    {
      schema: { body: updateRequestBody },
    },
    async (request, reply) => {
      // authenticate request
      await fastify.authenticate(request, reply);

      const poll = request.body;
      console.log('poll', poll);
      const pollId = await updatePoll(poll);

      reply.code(201).send({ pollId });
      // reply.code(201).send({ pollId });
    }
  );
};

module.exports = pollsRoute;
