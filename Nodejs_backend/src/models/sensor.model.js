const mongoose = require('mongoose');

const sensorSchema = new mongoose.Schema({
    device_type: {
        // ex: temperature, humidity,smoke, gas, etc.
        type: String,
        required: true,
    },
    deviceId: {
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
    model_code: {
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
    address: {
        type: String,
    
    },
    status: {
        type: String,
        default: 'normal',
    },
    warning: {
        type: Number,
        default: 0,
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
    },
    apartment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Apartment',
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
}, { timestamps: true });

const Sensor = mongoose.model('Sensor', sensorSchema);

module.exports = Sensor;

