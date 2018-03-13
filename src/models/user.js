/**
 * Created by Florin David on 11/05/2017.
 */

/* eslint-disable no-invalid-this */

const Promise = require('bluebird');
const bcryptjs = require('bcryptjs');
const mongoose = require('mongoose');

import env from '../config/env'

const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;

const schema = new Schema({
  email: {type: String, require: true},
  name: String,
  password: {type: String, require: true},

  createdAt: Date,
  updatedAt: Date,
});

// ///////////////////////////////////////////////
// /////////////////// Hooks /////////////////////
// ///////////////////////////////////////////////

schema.pre('save', function(next) {

  // only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) {
    return next()
  }

  // generate a salt
  bcryptjs.genSalt(SALT_WORK_FACTOR)
    .then((salt) => bcryptjs.hash(this.password, salt))
    .then((hash) => {this.password = hash})
    .then(next)
    .catch(next)
});

schema.pre('save', function(next) {
  // createdAt/updatedAt
  const now = new Date();
  this.updatedAt = now;
  if (!this.createdAt) {
    this.createdAt = now
  }
  next()
});

// ///////////////////////////////////////////////
// ////////////// Static Methods /////////////////
// ///////////////////////////////////////////////

schema.methods.comparePassword = function(candidatePassword) {
  return bcryptjs.compare(candidatePassword, this.password)
};

/**
 * Get User by Email
 *
 * @param {String} email
 *
 * @return {Promise<User>} user
 */
schema.statics.findByEmail = function(email) {
  return this.findOne({email: new RegExp(`^${email}$`, 'i')})
};

module.exports = mongoose.model('User', schema, 'users');

