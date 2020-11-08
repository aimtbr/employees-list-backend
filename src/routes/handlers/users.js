const bcrypt = require('bcrypt');

const { decryptAES, encryptAES } = require('../../lib/helpers.js');
const { Users } = require('../../db/models');


const schemaProps = Object.keys(Users.schema.paths);

module.exports = {
  createUser: async (req, res) => {
    try {
      const { body: encryptedBody } = req;
      const saltRounds = 12;
      const propsInUse = [];

      const decryptedBody = decryptAES(encryptedBody, true);
      const { email, login, password } = decryptedBody;

      const bodyKeys = Object.keys(decryptedBody);
      const everyPropExist = bodyKeys.every((key) => schemaProps.includes(key));
      const [emailInUse, loginInUse] = await Promise.all([
        Users.findOne({ email }),
        Users.findOne({ login })
      ]);

      // check whether the passed data matches the schema
      if (!everyPropExist) {
        return res.status(400).json({ error: 'Invalid key' });
      }

      if (emailInUse !== null) {
        propsInUse.push('email');
      }

      if (loginInUse !== null) {
        propsInUse.push('login');
      }

      if (propsInUse.length !== 0) {
        return res.status(403).json({
          props: propsInUse,
          error: 'Some of the properties already in use'
        });
      }

      // encrypt a password before adding to the database
      const encryptedPassword = await bcrypt.hash(password, saltRounds);

      const query = { ...decryptedBody, password: encryptedPassword };
      await Users.create(query)
        .catch((error) => res.status(400).json({ error }));

      return res.sendStatus(201);
    } catch (error) {
      console.error(error);
      return res.sendStatus(400);
    }
  },
  authorizeUser: async (req, res) => {
    try {
      const { body: encryptedBody } = req;
      const requiredFields = ['login', 'password'];

      const decryptedBody = decryptAES(encryptedBody, true);
      const { login, password: plainPassword } = decryptedBody;

      const bodyKeys = Object.keys(decryptedBody);
      const matchAllFields = bodyKeys.every((key) => requiredFields.includes(key));

      if (!matchAllFields) {
        return res.status(400).json({ requiredFields, error: 'Required fields do not match' });
      }

      const user = await Users.findOne({ login });

      if (user !== null) {
        const { password, secret } = user;
        const passwordMatches = await bcrypt.compare(plainPassword, password);

        if (passwordMatches) {
          return res.cookie('access_token', secret, {
            httpOnly: true,
            encode: encryptAES,
          }).sendStatus(200);
        } else {
          return res.status(403).json({ invalid: 'password' });
        }
      }

      return res.status(403).json({ invalid: 'login' });
    } catch (error) {
      console.error(error);
      return res.sendStatus(400);
    }
  },
  logoutUser: (req, res) => {
    if (req.cookies.access_token === undefined) {
      return res.status(401).json({ error: 'Already logged out' });
    }

    return res.clearCookie('access_token').sendStatus(200);
  }
};