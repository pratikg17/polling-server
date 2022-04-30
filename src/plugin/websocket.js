const webSocket = require('fastify-websocket');
const fp = require('fastify-plugin');

module.exports = fp((fastify, options, next) => {
  fastify.register(webSocket, {
    maxPayload: 1048576,
    clientTracking: true,
  });
  next();
});
