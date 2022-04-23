const fp = require('fastify-plugin');
const jwt = require('fastify-jwt');
const config = require('../config');

module.exports = fp(async (fastify, options, next) => {
  const secret = config.jwt_token;
  fastify.register(jwt, {
    // TODO: move to .env from code (don't don't put your secret in code)
    secret: secret,
  });

  fastify.decorate('authenticate', async (request, reply) => {
    try {
      // extract jwt token from Authorization header
      // remove Bearer from front of token
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });

  next();
});
