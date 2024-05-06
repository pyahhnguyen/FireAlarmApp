const express = require('express');
const router = express.Router();
const asyncHandler = require('../../helper/asyncHanlde');
const sensorController = require('../../controller/sensorController');


router.post('/sensor/alert_process', asyncHandler(sensorController.alertProcess))
router.post('/sensor/history', asyncHandler(sensorController.history))
    
module.exports = router;