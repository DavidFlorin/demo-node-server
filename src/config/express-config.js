/**
 * Created by Florin David on 11/02/16.
 */
const Promise = require('bluebird');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const bodyParser = require('body-parser');
const chalk = require('chalk');
const cors = require('cors');
const express = require('express');
const ip = require('ip');

const log = require('../components/log');
const env = require('./env');
const routing = require('./routing');

const User = require('../models/user');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

// CORS setup
app.use(cors({
  credentials: true,
  maxAge: 24 * 60 * 60, // 24 h
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  origin: true,
}));

// Authentication - basic strategy config
passport.use(new BasicStrategy(

  function(name, password, done) {

    let user;

    // find the user by name
    User.findOne({name}).exec()
      .tap((_user) => {
        user = _user;
        if (!user) {
          return done(null, false);
        }
      })

      // compare the user password
      .then((user) => user.comparePassword(password))

      // check
      .then((success) => {
        if (!success) {
          throw new Error('Invalid user password');
        }
        // password matches
        done(null, user)
      })

      // exit with error in case of an error
      .catch(() => done(null, false))
  }

));

/**
 * Default export
 *
 *  - add routes
 */
exports.config = () => {
  routing(app);
};

/**
 * Start the server
 *
 * @return {Promise.<undefined>}
 */
exports.start = () => {

  if (!app) {
    throw new Error('run express-config `.config` first')
  }

  log.info('Start the API server...');

  return new Promise((resolve, reject) => {

    app.listen(env.PORT, 'localhost', (err) => {

      if (err) {
        console.error(chalk.red(err));
        return reject(err)
      }

      console.log(`Server started ! ${chalk.green('✓')}`);

      console.log(`${chalk.bold('Access URLs:')}`);
      console.log(chalk.gray('-----------------------------------'));
      console.log(
        `Localhost: ${chalk.magenta(`http://localhost:${env.PORT}`)}`
      );
      console.log(
        `      LAN: ${chalk.magenta(`http://${ip.address()}:${env.PORT}`)}`
      );
      console.log(chalk.gray('-----------------------------------'));
      console.log(`${chalk.blue(`Press ${chalk.italic('CTRL-C')} to stop`)}`);

      resolve()
    })
  })
};
