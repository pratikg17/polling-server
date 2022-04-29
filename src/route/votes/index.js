const VotesService = require('../../service/votes.service');
const { postRequestBody } = require('./votes.schema');

// mark this function as async - required
const pollsRoute = async (fastify) => {
  const { castVote, getPollResult } = VotesService(fastify);

  fastify.post(
    '/cast-vote',
    {
      schema: { body: postRequestBody },
    },
    async (request, reply) => {
      // authenticate request
      await fastify.authenticate(request, reply);

      const vote = request.body;
      const voteId = await castVote(vote);
      reply.code(201).send({ voteId });
    }
  );
};

module.exports = pollsRoute;
