const  mongoose = require('mongoose');
const { Schema } = mongoose;

// Define a Mongoose schema for your sensor data
const sensorDataSchema = new Schema({
  sensor_id: String,
  building: String,
  floor: Number,
  apartment: Number,
  room: String,
  timestamp: Date,
  data: {
    type: { type: String }, // Adjust the schema to specify the type of 'type' as String
    value: Number,
  },
});

// Create a Mongoose model for the sensor data
const SensorData = mongoose.model('SensorData', sensorDataSchema);


module.exports = SensorData;