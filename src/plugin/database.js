const fp = require('fastify-plugin');
const pgp = require('pg-promise')();
const applyMigration = require('./helper/migration');

const config = require('../config');

const db = async (fastify, options, next) => {
  const dbConnection = pgp(config.database_uri);
  // register db as decorator to provide globally
  fastify.decorate('db', dbConnection);

  fastify.log.info('Migration is about to start');
  const migrationCount = await applyMigration();
  fastify.log.info(`Migration applied count: ${migrationCount}`);
  next();
};

module.exports = fp(db);
