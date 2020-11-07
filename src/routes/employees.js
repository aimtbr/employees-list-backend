const express = require('express');

const handlers = require('./handlers/employees.js');


const router = express.Router();

router.route('/employee/:id')
  .patch(handlers.editOneEmployee)
  .delete(handlers.deleteOneEmployee);

router.get('/employees', handlers.getManyEmployees);

router.post('/employee', handlers.addOneEmployee);

module.exports = router;