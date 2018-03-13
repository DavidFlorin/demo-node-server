/**
 * Created by Florin David on 05/09/16.
 */
const parse = require('parse-keys');

let ENV_JSON = {};
try {
  ENV_JSON = require('../../env.json')
} catch (error) {
  // ignore error
}

const defaults = {

  // Node Environment
  NODE_ENV: 'development',

  // Database
  DB_URL: 'mongodb://127.0.0.1/demo-app',

  // API Port
  PORT: 3000,

  // Logger settings
  LOGGER_HANDLE_EXCEPTIONS_IN_LOGGER: true,
  LOGGER_LEVEL: 'debug',

};

// Use this line for WebStorm autocomplete functions
module.exports = defaults;

/*
 * Export environment variables and 'checkEnv' function
 */
module.exports = Object.assign({},
  defaults,
  ENV_JSON,

  // all env vars
  process.env,

  // but some of them processed
  parse(process.env, Object.keys(defaults))
);
