const { Schema } = require('mongoose');
const { v4: uuidv4 } = require('uuid');


const { Types } = Schema;

const Users = new Schema({
  email: {
    type: Types.String,
    required: true,
    validate: {
      validator: (value) => {
        return /^[^.,\s][\d,\w,\S]+@[\d,\w]+\.\w+$/.test(value);
      }
    }
  },
  password: {
    type: Types.String,
    required: true,
    maxLength: 100
  },
  login: {
    type: Types.String,
    required: true,
    maxlength: 25
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