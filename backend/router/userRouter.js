const express = require('express');
const userController = require('../controller/userController')
const router = express.Router();

//This request is only used to create an account to test /login request. 
router.post('/register', userController.register);

//login part
router.post('/login', userController.login);
router.post('/onBoarding', userController.onBoarding);
router.post('/setavatar', userController.setAvatar);
router.post('/getavatar', userController.getAvatar);
router.post('/updateDriv', userController.updateDriv);
router.post('/updateWork', userController.updateWorkAuth);
router.post('/updateRef', userController.updateRef);
router.post('/updateCar', userController.updateCar);
router.post('/updateContact', userController.updateContact);
router.post('/updateAddress', userController.updateAddress);
router.post('/updateProfile', userController.updateProfile);

module.exports = router;
