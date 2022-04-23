const UserService = require('../../service/users.service');
const RolesService = require('../../service/roles.service');
const {
  postRequestBody,
  postResponseBody,
  getRequestparams,
  getResponseBody,
} = require('./users.schema');

// make sure to mark function as async
const userRoute = async (fastify) => {
  const {
    getUserById,
    createInvestorUser,
    getUserByEmailId,
    getInvestorAuthetication,
    getAdminAuthetication,
  } = UserService(fastify);

  fastify.get(
    '/:userId',
    { schema: { params: getRequestparams, response: getResponseBody } },
    async (request, reply) => {
      const { userId } = request.params;
      try {
        const user = await getUserById(userId);
        reply.code(200).send(user);
      } catch (error) {
        reply.code(404).send(error);
      }
    }
  );

  fastify.post('/login', async (request, reply) => {
    try {
      const { email, password } = request.body;

      const user = await getUserByEmailId(email, password);

      // create jwt token
      const token = fastify.jwt.sign(user);

      reply.code(200).send({ token: `Bearer ${token}` });
    } catch (err) {
      reply.code(401).send({
        message: err.message,
      });
    }
  });

  fastify.post('/investor-login', async (request, reply) => {
    try {
      const { userName, password } = request.body;

      const user = await getInvestorAuthetication(userName, password);

      // create jwt token
      const token = fastify.jwt.sign(user);

      reply.code(200).send({ token: `Bearer ${token}` });
    } catch (err) {
      reply.code(401).send({
        message: err.message,
      });
    }
  });

  fastify.post('/admin-login', async (request, reply) => {
    try {
      const { userName, password } = request.body;

      const user = await getAdminAuthetication(userName, password);

      // create jwt token
      const token = fastify.jwt.sign(user);

      reply.code(200).send({ token: `Bearer ${token}` });
    } catch (err) {
      reply.code(401).send({
        message: err.message,
      });
    }
  });

  fastify.post(
    '/',
    { schema: { body: postRequestBody, response: postResponseBody } },
    async (request, reply) => {
      fastify.log.info('creating user');
      try {
        const userId = await createInvestorUser(request.body);
        fastify.log.info(`user created with ${userId}`);
        reply.code(201).send({ userId });
      } catch (error) {
        reply.code(400).send(error);
      }
    }
  );
};

module.exports = userRoute;
