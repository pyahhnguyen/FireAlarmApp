const mongoose = require('mongoose');

const notificationSettingsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
        unique: true
    },
    enablePushNotifications: {
        type: Boolean,
        default: true
    },
    enableEmailNotifications: {
        type: Boolean,
        default: true
    },
    enablePhoneNotifications: {
        type: Boolean,
        default: true
    },
    notificationTimezone: {
        type: String,
        default: 'UTC'
    },
    deviceTokens: [{ 
        token: String,
        active: { type: Boolean, default: true } 
    }]
});

const NotificationSettings = mongoose.model('NotificationSettings', notificationSettingsSchema);
module.exports = NotificationSettings;
