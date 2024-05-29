const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    // Add other room-specific fields as needed
    createdAt: {
        type: Date,
        default: Date.now,
    },
    statusRoom: {
        type: String,
        default: 'normal',
    },
    sensor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sensor',
    },
    apartment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Apartment',
        required: true,
    },
}, { timestamps: true });

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;