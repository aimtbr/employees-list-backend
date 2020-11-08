const { validate } = require('uuid');

const { decryptAES } = require('./helpers.js');
const { Users } = require('../db/models');


module.exports = {
  isAuthorized: async (req, res, next) => {
    const { access_token: accessToken } = req.cookies;

    if (accessToken !== undefined) {
      const decryptedToken = decryptAES(accessToken);
      const isValidUuid = validate(decryptedToken);

      if (isValidUuid) {
        const user = await Users.findOne({ secret: decryptedToken });

        if (user !== null) {
          return next();
        }
      }
    }

    return res.sendStatus(401);
  },
  isAllowedToAuth: (req, res, next) => {
    if (req.cookies.access_token !== undefined) {
      return res.status(404).json({ error: 'Already authorized' });
    }

    return next();
  }
};