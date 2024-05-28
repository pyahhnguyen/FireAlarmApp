
const express = require('express');
const router = express.Router();
const asyncHandler = require('../../helper/asyncHanlde');
const sensorController = require('../../controller/sensorController');
const { authentication } = require('../../auth/authUtils');

// authentication //
router.use(authentication)
router.get('/sensors/:deviceId', asyncHandler(sensorController.sensor_history));
router.get('/sensors/user/recentAlert', asyncHandler(sensorController.recentAlert));
router.get('/sensors/user/alertsNumber', asyncHandler(sensorController.alertsNumber));

module.exports = router;    