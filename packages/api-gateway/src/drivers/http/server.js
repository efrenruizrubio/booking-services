// External dependencies
const Fastify = require('fastify');
const Autoload = require('fastify-autoload');
const Swagger = require('fastify-swagger');
const path = require('path');

// Internal dependencies
const swaggerOptions = require('./utils/swagger');

// Setup
const isTestEnv = process.env.NODE_ENV === 'test';

const fastify = Fastify({
  // Disable logs in test environment
  logger: !isTestEnv,
});

// Avoid loading swagger when running tests
if (!isTestEnv) {
  // Swagger needs to be loaded before the routes
  fastify.register(Swagger, swaggerOptions);
}

fastify.register(Autoload, { dir: path.join(__dirname, 'routes') });
fastify.register(Autoload, { dir: path.join(__dirname, 'plugins') });

async function start() {
  try {
    await fastify.listen(process.env.SERVER_PORT || 3000, '0.0.0.0');
  } catch (error) {
    fastify.log.error(
      `[http-server]: Error with message ${error.message} has happened`,
    );
    process.exit(1);
  }
}

module.exports = {
  start,
  fastify,
};
