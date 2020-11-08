const express = require('express');
const cors = require('cors');

const { connectToDatabase } = require('./db');
const { isAuthorized } = require('./lib/middleware.js');
const employeesRouter = require('./routes/employees.js');
const authRouter = require('./routes/auth.js');


const { PORT = 3000 } = process.env;

const useModifications = (app) => {
  app.use(cors());
  app.use(express.json());
  app.use(express.text());
  app.use(express.urlencoded({ extended: true }));
  app.use('/api', authRouter);
  app.use('/api', [isAuthorized, employeesRouter]);
};

const run = async () => {
  await connectToDatabase();

  const app = express();

  useModifications(app);

  app.listen(PORT, () => {
    console.log('App is running on port ' + PORT);
  });
};

run();