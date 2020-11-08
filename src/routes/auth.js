const express = require('express');

const handlers = require('./handlers/auth.js');


const router = express.Router();

router.get('/auth', handlers.authorizeUser);

router.post('/sign-up', handlers.addUser);

module.exports = router;