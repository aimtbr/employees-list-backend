const { Schema } = require('mongoose');


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
  deleted: {
    type: Types.Boolean,
    default: false
  }
}, { timestamps: { currentTime: () => new Date().toISOString() } });

module.exports = Users;