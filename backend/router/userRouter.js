const express = require('express');
const userController = require('../controller/userController')
const router = express.Router();

//This request is only used to create an account to test /login request. 
router.post('/register', userController.register);

//login part
router.post('/login', userController.login);

module.exports = router;
