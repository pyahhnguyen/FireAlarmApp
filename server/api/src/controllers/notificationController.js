const mongoose = require('mongoose');
const Notification = require("../models/notification.model");
const createApplicationEndpoint = require('../services/snsnotification.service');

const getDeviceToken = async (req, res, next) => {
    try {
        console.log(req.headers); 
        // Fetch notification settings for the user
        const notificationSettings = await Notification.findOne({ userId: mongoose.Types.ObjectId(req.headers.userId) }).orFail();

        // Find the device token in the list
        const existingToken = notificationSettings.deviceTokens.find(token => token.token === req.headers.devicetoken);

        if (existingToken) {
            if (existingToken.active) {
                return res.send({ body: "Already subscribed to receive alerts" });
            } else {
                // Activate the token if it is inactive
                existingToken.active = true;
                await notificationSettings.save(); // Save the updated document
                return res.send({ body: "Subscribed to receive alerts" });
            }
        } else {
            // Create a new application endpoint if token not found
            await createApplicationEndpoint(req.headers.devicetoken);
            // Add new token to the list
            notificationSettings.deviceTokens.push({ token: req.headers.devicetoken, active: true });
            await notificationSettings.save();
            res.send({ body: "New device subscribed and endpoint created" });
        }
    } catch (err) {
        console.error('Error processing device token: ', err);
        res.status(500).send({ error: "Failed to process device token" });
    }
}

module.exports = { getDeviceToken };
