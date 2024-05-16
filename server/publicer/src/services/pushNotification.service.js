const AWS = require('aws-sdk');

// Initialize the SNS client
AWS.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const sns = new AWS.SNS();

const pushNotification = (endpointArn, message) => {
    const params = {
        Message: JSON.stringify({
            default: message,
            GCM: JSON.stringify({
                data: {
                    title: 'New Alert',
                    message,
                    targetScreen: 'Alerts',
                    extraInfo: 'more details here',
                    sound: 'default'
                }
            })
        }),
        MessageStructure: 'json',
        TargetArn: endpointArn
    };

    sns.publish(params, (err, data) => {
        if (err) {
            console.error('Error sending push notification:', err);
        } else {
            console.log('Push notification sent:', data);
        }
    });
};

module.exports = { pushNotification };
