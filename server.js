/**
 * Created by Florin David on 13/03/2018.
 */
const config = require('./src/config');
const { start } = require('./src/config/express-config');

// Run configurations
config()
  // Start the server
  .then(start);
