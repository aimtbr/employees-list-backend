const { Schema } = require('mongoose');
const {
  GENDERS_ENUM,
  POSITIONS_ENUM,
  DEFAULT_GENDER,
  DEFAULT_POSITION,
  DEFAULT_CONTACTS
} = require('../../lib/constants.js');


const { Types } = Schema;

const Employees = new Schema({
  fullName: {
    type: Types.String,
    maxLength: 100,
    default: ''
  },
  gender: {
    type: Types.String,
    enum: GENDERS_ENUM,
    default: DEFAULT_GENDER
  },
  contacts: {
    type: Types.String,
    maxLength: 20,
    default: DEFAULT_CONTACTS
  },
  position: {
    type: Types.String,
    enum: POSITIONS_ENUM,
    default: DEFAULT_POSITION
  },
  salary: {
    type: Types.Number,
    min: 0,
    default: 0,
  },
  deleted: {
    type: Types.Boolean,
    default: false
  }
},
  {
    timestamps: {
      currentTime: () => new Date().toISOString(),
      createdAt: 'dateAdded'
    }
  }
);

Employees.index(
  {
    fullName: 'text',
    gender: 'text',
    contacts: 'text',
    position: 'text'
  },
  {
    default_language: 'none'
  }
);

module.exports = Employees;