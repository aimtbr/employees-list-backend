const config = require('config');
const crypto = require('crypto-js');
const bcrypt = require('bcrypt');

const { Users } = require('../../db/models');


const salt = config.get('salt');
const schemaProps = Object.keys(Users.schema.paths);

module.exports = {
  addUser: async (req, res) => {
    try {
      const saltRounds = 12;
      const propsInUse = [];
      const { body: encryptedBody } = req;

      // decrypt the encrypted body from the POST request
      const bodyBytes = crypto.AES.decrypt(encryptedBody, salt);
      const decryptedBody = JSON.parse(bodyBytes.toString(crypto.enc.Utf8));
      const { email, login, password } = decryptedBody;

      const bodyKeys = Object.keys(decryptedBody);
      const everyPropExist = bodyKeys.every((key) => schemaProps.includes(key));
      const [emailInUse, loginInUse] = await Promise.all([
        Users.findOne({ email }),
        Users.findOne({ login })
      ]);
      console.log(emailInUse, loginInUse);
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

  }
};