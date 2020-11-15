// global imports
const express = require('express');
// local imports
const handlers = require('./handlers/users.js');


const router = express.Router();

router.post('/auth', handlers.authorizeUser); // encrypted using crypto.AES body with login and password

router.post('/signup', handlers.createUser); // encrypted using crypto.AES body with email, login and password

router.post('/logout', handlers.logoutUser);

module.exports = router;