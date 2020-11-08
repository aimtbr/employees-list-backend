const express = require('express');

const handlers = require('./handlers/default.js');


const router = express.Router();

router.use('*', handlers.notFound);

module.exports = router;