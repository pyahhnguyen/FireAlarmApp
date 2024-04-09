const mongoose = require('mongoose');
const Apartment = require("./apartment.model")

const detectorSchema = new mongoose.Schema({   
        Location: String,
        deviveId: Number,
        deviceType: String,
        name: String,
        ModelNo: String,
        Code: String,
        deviceDescription: String,
        deviceData: Number,
        location: String,
        status: String,
        triggerAt: {
            type: Date,
        },
        resolveAt: {
            type: Date,
        },
}, { _id: false }); // _id: false is used to prevent Mongoose from creating an id for subdocuments

const alertSchema = new mongoose.Schema({
    apartment: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: Apartment,
    },
    flameDetector: detectorSchema,
    smokeDetector: detectorSchema,
    heatDetector: detectorSchema,
    gasDetector: detectorSchema,

}, {
    timestamps: true,
});

const Alert = mongoose.model('Alert', alertSchema);

module.exports = Alert;