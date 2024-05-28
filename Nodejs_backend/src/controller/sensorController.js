
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

    // Add the recentAlert method for a user to get the most recent alert
    async recentAlert(req, res, next) {
        try {
            // Respond with the most recent alert
            new SuccessResponse({
                message: 'Most recent alert retrieved successfully',
                metadata: await SensorService.getRecentAlert(req.user.userId)
            }).send(res);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    }

    // Get the number of alerts for a user
    async alertsNumber(req, res, next) {
        try {
            // Respond with the number of alerts
            new SuccessResponse({
                message: 'Number of alerts retrieved successfully',
                metadata: await SensorService.getAlertsNumber(req.user.userId)
            }).send(res);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    }

}

module.exports = new SensorController();
