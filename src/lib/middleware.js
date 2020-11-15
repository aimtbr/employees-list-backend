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
  }
};