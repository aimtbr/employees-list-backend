const { Schema } = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const { isValidEmail, isValidLogin } = require('../../lib/helpers.js');


const { Types } = Schema;

const Users = new Schema({
  email: {
    type: Types.String,
    required: true,
    validate: {
      validator: isValidEmail
    }
  },
  login: {
    type: Types.String,
    required: true,
    validate: {
      validator: isValidLogin
    }
  },
  password: {
    type: Types.String,
    required: true,
    minLength: 8,
    maxLength: 100,
  },
  secret: {
    type: Types.String,
    default: uuidv4()
  },
  deleted: {
    type: Types.Boolean,
    default: false
  }
}, { timestamps: { currentTime: () => new Date().toISOString() } });

module.exports = Users;