const { model } = require('mongoose');

const employeesSchema = require('./Employees.js');
const usersSchema = require('./Users.js');


module.exports = {
  Employees: model('employees', employeesSchema),
  Users: model('users', usersSchema),
};