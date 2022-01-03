const express = require('express');
const tokenController = require('../controller/tokenController')
const router = express.Router();

router.post('/token', tokenController.token);

module.exports = router;