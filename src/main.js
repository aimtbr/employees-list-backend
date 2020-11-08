const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const routers = require('./routes');
const { connectToDatabase } = require('./db');
const { isAuthorized } = require('./lib/middleware.js');


const { PORT = 3000 } = process.env;

const useModifications = (app) => {
  app.use(cors());
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.text());
  app.use(express.urlencoded({ extended: true }));
  app.use('/users', routers.users);
  app.use('/api', [isAuthorized, routers.employees]);
  app.use('*', routers.default);
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