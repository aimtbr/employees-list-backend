const express = require('express');
const config = require('config');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const routers = require('./routes');
const { connectToDatabase } = require('./db');
const { isAuthorized } = require('./lib/middleware.js');

const allowedHost = config.get('allowedHost');
const port = process.env.PORT || config.get('port');

const useModifications = (app) => {
  app.use(cors({ origin: allowedHost, credentials: true }));
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.text());
  app.use(express.urlencoded({ extended: true }));
  app.use('/users', routers.users);
  app.use('/api', [isAuthorized, routers.employees]);
  app.use('*', routers.notFound);
};

const run = async () => {
  await connectToDatabase();

  const app = express();

  useModifications(app);

  app.listen(port, () => {
    console.log('App is running on port ' + port);
  });
};

run();