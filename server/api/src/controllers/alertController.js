const mongoose = require('mongoose');
const Alert = require('../models/AlertModel'); // Import the Apartment model

const getAlerts = async (req, res, next) => {
    try {
        const alert = await Alert.findOne({ apartment: new mongoose.Types.ObjectId(req.headers.userid) }).select("smokeDetector flameDetector gasDetector heatDetector -_id").orFail();
        res.send(alert);
        console.log('Retrieved document: ', alert);
    } catch (err) {
        console.error('Error retrieving document: ', err);
        throw err;
    }
}



module.exports = {
    getAlerts
};