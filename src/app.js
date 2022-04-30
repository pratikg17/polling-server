const fastify = require('fastify');
const cors = require('fastify-cors');
const db = require('./plugin/database');
const testRoute = require('./route/tempTestRoute');
const swaggerPg = require('./plugin/swagger');
const userRoute = require('./route/users');
const pollsRoute = require('./route/polls');
const votesRoute = require('./route/votes');
const websocket = require('./plugin/websocket');

const authenticate = require('./plugin/authenticate');

const build = (opts = {}) => {
  const app = fastify(opts);

  // add cors
  app.register(cors);

  // register plugins
  app.register(db);
  app.register(swaggerPg);
  app.register(authenticate);
  app.register(websocket);

  // register route
  app.register(testRoute, { prefix: 'api/v1/test' });
  app.register(userRoute, { prefix: 'api/v1/users' });
  app.register(pollsRoute, { prefix: 'api/v1/polls' });
  app.register(votesRoute, { prefix: 'api/v1/votes' });

  app.get('/', async (request, reply) => {
    reply.code(200).send({ hello: 'world! done CI/CD' });
  });

  return app;
};

module.exports = build;
