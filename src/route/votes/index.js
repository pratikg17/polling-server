const VotesService = require('../../service/votes.service');
const { postRequestBody } = require('./votes.schema');

// mark this function as async - required
const votesRoute = async (fastify) => {
  const { castVote, getUserVote } = VotesService(fastify);

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

  fastify.post('/user-vote', async (request, reply) => {
    // authenticate request
    // append user request.user
    await fastify.authenticate(request, reply);
    const data = request.body;
    const vote = await getUserVote(data);
    reply.code(200).send({ vote });
  });
};

module.exports = votesRoute;
