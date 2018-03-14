/**
 * Created by Florin David on 14/03/2018.
 */
const passport = require('passport');
const users = require('../controllers/users');

module.exports = (app) => {

  const auth = passport.authenticate('basic', { session: false });

  // Create new user (register user)
  app.post('/users', (req, res) => {

    const { name, email, password } = req.body;

    return users.createUser({name, email, password})
      .then(() => {
        res.send({success: true})
      })
      .catch((error) => {
        res.status = 500;
        res.send({
          error: error.message
        })
      })
  });

  app.get('/test', auth,
    function(req, res) {
      res.send('user ' + req.user.name)
    });

};
