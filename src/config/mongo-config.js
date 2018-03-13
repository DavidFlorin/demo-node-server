/**
 * Created by Florin David on 04/12/2017.
 */
const Promise = require('bluebird');
const mongoose = require('mongoose');

const log = require('../components/log');
const env = require('../config/env');

// Use 'bluebird' promises for mongoose
mongoose.Promise = Promise;

module.exports = () => {

  log.info('Connecting to mongodb...');

  return new Promise((resolve, reject) => {
    mongoose.connection.on('error', reject);
    mongoose.connection.once('open', resolve);
    mongoose.connect(env.DB_URL)
  })

};
