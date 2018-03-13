'use strict';
/**
 * Created by Florin David on 29/01/16.
 */
const winston = require('winston');

const env = require('../config/env');

/**
 * Logger - singleton object
 *
 * @constructor
 */
const Logger = function() {};

const logger = new Logger();

['debug', 'info', 'error'].forEach((level) => {

  Logger.prototype[level] = (msg, _params, _user) => {

    let params = _params;
    let user = _user;
    const meta = {};

    // check if no params was passed
    if (params && params.constructor && !_user) {
      user = params;
      params = {};
    }

    params = Object.assign({}, params);

    meta.timestamp = new Date();
    meta.module = env.LOGGER_MODULE;
    meta.site = env.LOGGER_SITE;
    meta.environment = env.NODE_ENV;
    meta.params = params;

    // check for module overwrite
    if (params.module) {
      meta.module = params.module;
      delete params.module;
    }

    // check for `browserSessionId`
    if (params.browserSessionId) {
      meta.browserSessionId = params.browserSessionId;
      delete params.browserSessionId;
    }

    // check for client param
    if (params.client) {
      meta.client = params.client;
      delete params.client;
    }

    if (user) {
      meta.params.user = {
        id: user.id,
        name: user.name,
        email: user.email
      };
    }

    winston[level](msg, meta);

  };

});

module.exports = logger;
