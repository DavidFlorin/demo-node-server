/**
 * Created by Florin David on 14/03/2018.
 */
const User = require('../models/user');

module.exports = {

  /**
   * Create new user
   * @param name
   * @param email
   * @param password
   * @return {Promise<any>}
   */
  createUser: ({ name, email, password }) => {

    return User.findOne({name})
      .then((user) => {
        if (user) {
          throw new Error('User already exists')
        }
      })
      .then(() => User.create({
        name: name,
        password: password,
        email: email
      }))

  }
};
