const Sensor = require('../models/sensor.model');
const mongoose = require('mongoose');

class SensorService {
    static async getSensorHistory({userId, deviceId}) {
        try {
            const owner = new mongoose.Types.ObjectId(userId);
            // Find sensors matching the userId and deviceId, sorted by createdAt descending
            const sensors = await Sensor.find({ owner: owner, deviceId: deviceId, status: 'Alert'})
                .sort({ createdAt: -1 })  // Sort by createdAt field in descending order
                .limit(10);  // Limit the result to the latest 10 documents
            // Return the sensor data
            return sensors;
        } catch (error) {
            throw error;
        }
    }

    // Add the getRecentAlert method to get the most recent alert
    static async getRecentAlert(userId) {
        try {   
            const owner = new mongoose.Types.ObjectId(userId);
            // Find the most recent alert for the user
            const sensor = await Sensor.find({ owner: owner, status: 'Alert' })
                .sort({ createdAt: -1 })
                .limit(10); // Sort by createdAt field in descending order
            // Return the sensor data
            return sensor;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = SensorService;
