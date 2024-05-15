const Sensor = require('../models/sensor.model');
const mongoose = require('mongoose');

class SensorService {
    static async getSensorHistory({userId, deviceId}) {
        try {
            const owner = new mongoose.Types.ObjectId(userId);
            // Find sensors matching the userId and deviceId
            const sensors = await Sensor.find({ owner: owner, deviceId: deviceId, status: 'Alert'}).limit(5).sort({ createdAt: -1 });
            // Return the sensor data
            return sensors;
        } catch (error) {
            throw error;
        }
    }
}


module.exports = SensorService;
