/**
 * Created by Florin David on 13/03/2018.
 */
/**
 * Created by Florin David on 08/03/2017.
 */
const winston = require('winston');

const env  = require('./env');

module.exports = () => {

  // Clear all transports
  winston.clear();

  // winston configurations
  winston.configure({
    handleExceptions: env.LOGGER_HANDLE_EXCEPTIONS_IN_LOGGER,
    level: env.LOGGER_LEVEL,
  });

  // Console support
  winston.add(winston.transports.Console, {
    handleExceptions: env.LOGGER_HANDLE_EXCEPTIONS_IN_LOGGER,
    level: env.LOGGER_LEVEL,
  })

};
