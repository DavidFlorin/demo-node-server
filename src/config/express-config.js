/**
 * Created by Florin David on 11/02/16.
 */
const Promise = require('bluebird');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const cors = require('cors');
const express = require('express');
const ip = require('ip');

const log = require('../components/log');
const env = require('./env');

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

/**
 * Default export
 *
 *  - add routes
 */
exports.config = () => {
    // Add the auth routes
    // auth.addRoutes(app);

    // Authenticate all routes
    // app.use(auth.createAuthenticator())
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
