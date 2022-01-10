const express = require('express');
const userController = require('../controller/userController')
const router = express.Router();


router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/onboarding', userController.onBoarding);
router.post('/sendnotification', userController.sendNotification);
router.post('/getnotification', userController.getNotification);
router.post('/deletenotification', userController.deleteNotification);
router.post('/getuser', userController.getUser);
// router.post('/updateDriv', userController.updateDriv);
// router.post('/updateWork', userController.updateWorkAuth);
// router.post('/updateRef', userController.updateRef);
// router.post('/updateCar', userController.updateCar);
// router.post('/updateContact', userController.updateContact);
// router.post('/updateAddress', userController.updateAddress);
// router.post('/updateProfile', userController.updateProfile);

module.exports = router;
