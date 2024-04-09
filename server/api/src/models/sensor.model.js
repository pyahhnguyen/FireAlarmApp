const mongoose = require('mongoose');

const sensorSchema = new mongoose.Schema({
  type: {
    // ex: temperature, humidity,smoke, gas, etc.
      type: String,
      required: true,
  },

  deviveId : {
      type: String,
      required: true,
  },

  deviceName: {
      type: String,
      required: true,
  },

  deviceDescription: {
      type: String,
      required: true,
  },

  deviceData: {
    type: Number,
    required: true,
  },

  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true,
  },

  status: {
      type: String,
      default: 'normal',
  },

  createdAt: {
      type: Date,
      default: Date.now,
  },
});

const Sensor = mongoose.model('Sensor', sensorSchema);

module.exports = Sensor;