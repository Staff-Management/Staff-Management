const express = require('express');
const houseController = require('../controller/houseController')
const router = express.Router();

router.post('/addhouse', houseController.addHouse);
router.post('/addtenants', houseController.addTenants);
router.post('/updateFacility', houseController.updateFacility);
router.post('/updatehouse', houseController.updateHouse);
router.get('/gethouseinfo', houseController.getHouse);
router.get('/gethouse/:landLord', houseController.getLandLord);
router.post('/facilityreport', houseController.FacilityReports)

module.exports = router;
