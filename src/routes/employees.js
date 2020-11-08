const express = require('express');

const handlers = require('./handlers/employees.js');


const router = express.Router();

router.route('/employee/:id')
  .patch(handlers.editOneEmployee) // id of employee in params, body object contains fields to change
  .delete(handlers.deleteOneEmployee); // id of employee in params

router.get('/employees', handlers.getManyEmployees); // skip and limit query params to filter the result

router.post('/employee', handlers.addOneEmployee); // without any params and body

module.exports = router;