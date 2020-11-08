const crypto = require('crypto-js');
const config = require('config');


const salt = config.get('salt');

module.exports = {
  decryptAES: (encryptedData, json = false, newSalt = salt) => {
    const bodyBytes = crypto.AES.decrypt(encryptedData, newSalt);
    let decryptedData = bodyBytes.toString(crypto.enc.Utf8);

    if (json) {
      decryptedData = JSON.parse(decryptedData);
    }

    return decryptedData;
  },
  encryptAES: (data, newSalt = salt) => crypto.AES.encrypt(data, newSalt).toString()
};