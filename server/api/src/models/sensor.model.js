const mongoose = require('mongoose');

const sensorSchema = new mongoose.Schema({
  device_type: {
    // ex: temperature, humidity,smoke, gas, etc.
      type: String,
      required: true,
  },
  deviceId : {
      type: String,
      required: true,
  },
  deviceName: {
      type: String,
      required: true,
  },
  deviceDescription: {
      type: String,
  
  },
  model_code:{
      type: String,
      required: true,
  },
  deviceData: {
    type: Number,
    required: true,
  },

location: {
    type: String,
    required: true,
},
  status: {
      type: String,
      default: 'normal',
  },
  warning: {
      type: Number,
      default: 0,
  },

  createdAt: {
      type: Date,
      default: Date.now,
  },
  topic: {
      type: String,
      required: true,
  },
  owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
  
  },
});

const Sensor = mongoose.model('Sensor', sensorSchema);

module.exports = Sensor;

