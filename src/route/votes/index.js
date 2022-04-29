const VotesService = require('../../service/votes.service');
const { postRequestBody } = require('./votes.schema');

// mark this function as async - required
const pollsRoute = async (fastify) => {
  const { castVote } = VotesService(fastify);

  fastify.post(
    '/cast-vote',
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
};

module.exports = pollsRoute;
