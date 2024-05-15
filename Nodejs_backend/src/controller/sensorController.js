

'use strict';
const { SuccessResponse } = require('../core/success.response');
const SensorService = require('../services/sensor.service');

class SensorController {
    async sensor_history(req, res, next) {
        try { 
    
            // Respond with the sensor history
            new SuccessResponse({
                message: 'Sensor history retrieved successfully',
                metadata: await SensorService.getSensorHistory({
                    userId: req.user.userId,
                    deviceId: req.params.deviceId
                })
            }).send(res);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    }


}

module.exports = new SensorController();
