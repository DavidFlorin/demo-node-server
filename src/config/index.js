/**
 * Created by Florin David on 23/02/2017.
 */
const Promise = require('bluebird');

const logConfig = require('./log-config');
const mongoConfig = require('./mongo-config');
const expressConfig = require('./express-config');

/**
 * Configure the server - start the application
 *
 * @throws Mandatory environment variable missing (as promise rejection)
 *
 * @return {Promise}
 */
module.exports = () => {

  // start `express` to take API requests only if PORT is set
  return Promise.resolve()
    .then(logConfig)
    .then(expressConfig.config)
    .then(mongoConfig)
};
