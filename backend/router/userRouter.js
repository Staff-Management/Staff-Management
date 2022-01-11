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
router.post('/getemployees', userController.getEmployees);
router.post('/updateprofile', userController.updateProfile);

// router.post('/updateDriv', userController.updateDriv);
// router.post('/updateWork', userController.updateWorkAuth);
// router.post('/updateRef', userController.updateRef);
// router.post('/updateCar', userController.updateCar);
// router.post('/updateContact', userController.updateContact);
// router.post('/updateAddress', userController.updateAddress);


module.exports = router;
