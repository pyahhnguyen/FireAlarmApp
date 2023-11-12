//root: /api/sensor_data
const express = require("express");
const router = express.Router();
const SensorData = require('../../models/sensor'); 

// In your Express API
router.get('/api/sensordata', async (req, res) => {
    try {
      const sensorData = await SensorData.find({ sensor_id: { $in: ['001', '002', '003', '004'] } }).sort({ timestamp: -1 }).limit(4).exec();
      res.json(sensorData);
    } catch (err) {
      console.error('Error fetching sensor data:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;
