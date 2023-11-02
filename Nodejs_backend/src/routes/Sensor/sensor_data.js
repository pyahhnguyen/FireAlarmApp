//root: /api/sensor_data
const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Define a Mongoose schema for your sensor data
const sensorDataSchema = new Schema({
    sensor_id: String,
    building: String,
    floor: Number,
    apartment: Number,
    room: String,
    timestamp: Date,
    data: {
      type: { type: String }, // Adjust the schemato specify the type of 'type' as String
      value: Number,
    },
  });
  
// Create a Mongoose model for the sensor data
const SensorData = mongoose.model('SensorData', sensorDataSchema); 

// In your Express API
router.get('/api/temperature-data', async (req, res) => {
    try {
      const temperatureData = await SensorData.find({ 'data.type': 'temperature' });
      res.json(temperatureData);
    } catch (err) {
      console.error('Error fetching temperature data:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;
