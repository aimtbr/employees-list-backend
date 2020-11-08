const { Schema } = require('mongoose');
const { v4: uuidv4 } = require('uuid');


const { Types } = Schema;

const Users = new Schema({
  email: {
    type: Types.String,
    required: true
  },
  password: {
    type: Types.String,
    required: true
  },
  login: {
    type: Types.String,
    required: true
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