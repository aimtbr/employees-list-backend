const { Schema } = require('mongoose');
const { genders, positions } = require('../../lib/constants.js');


const { Types } = Schema;

const Employees = new Schema({
  fullName: {
    type: Types.String,
    minLength: 2,
    required: true
  },
  gender: {
    type: Types.String,
    enum: genders,
    required: true
  },
  contacts: Types.String,
  position: {
    type: Types.String,
    enum: positions,
  },
  salary: {
    type: Types.Number,
    min: 0
  },
  deleted: {
    type: Types.Boolean,
    default: false
  }
}, { timestamps: { currentTime: new Date().toISOString() } });

module.exports = Employees;