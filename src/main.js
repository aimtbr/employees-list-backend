const express = require('express');
const cors = require('cors');

const { connectToDatabase } = require('./db');
const { isAuthorized } = require('./lib/middleware.js');
const employeesRouter = require('./routes/employees.js');


const { PORT = 3000 } = process.env;

const run = async () => {
  await connectToDatabase();
  const app = express();

  app.use(cors());
  app.use('/api', [isAuthorized, employeesRouter]);

  app.listen(PORT, () => {
    console.log('App is running on port ' + PORT);
  });
};

run();