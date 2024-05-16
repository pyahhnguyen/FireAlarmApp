const mongoose = require('mongoose');
const notification = require("../models/notification.model");
const { createApplicationEndpoint } = require('../services/snsnotification.service');

const HEADERS = {
    CLIENT_ID: 'x-client-id',
    DEVICE_TOKEN: 'x-devicetoken'
};

const getDeviceToken = async (req, res, next) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.headers[HEADERS.CLIENT_ID]);
        const deviceToken = req.headers[HEADERS.DEVICE_TOKEN];

        const notificationSettings = await notification.findOne({ userId }).orFail();

        let existingToken = notificationSettings.deviceTokens.find(token => token.token === deviceToken);

        if (existingToken) {
            if (existingToken.active) {
                return res.send({ body: "Already subscribed to receive alerts" });
            } else {
                existingToken.active = true;
                await notificationSettings.save();
                return res.send({ body: "Subscribed to receive alerts" });
            }
        }

        await createApplicationEndpoint(deviceToken);
        notificationSettings.deviceTokens.push({ token: deviceToken, active: true });
        await notificationSettings.save();
        return res.send({ body: "New device subscribed and endpoint created" });
    } catch (err) {
        console.error('Error processing device token: ', err);
        return next(err);
    }
}


module.exports = { getDeviceToken };
