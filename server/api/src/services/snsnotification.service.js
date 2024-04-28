const AWS = require('aws-sdk');
require('dotenv').config();
// Initialize the SNS client
AWS.config.update({
    region: 'us-east-1', // Example region
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const sns = new AWS.SNS();

/**
 * Create an SNS application endpoint for a given device token.
 * @param {string} deviceToken - The device token for push notification service.
 * @returns {Promise<string>} Returns the EndpointArn if successful.
 */
const createApplicationEndpoint = async (deviceToken) => {
    const params = {
        PlatformApplicationArn: process.env.SNS_PLATFORM_ARN, // Replace with your platform application ARN
        Token: deviceToken,
        CustomUserData: 'Additional data - optional', // Optional
        Attributes: {
            // Optional attributes
            'Enabled': 'true'
        }
    };

    try {
        const response = await sns.createPlatformEndpoint(params).promise();
        console.log('Successfully created SNS endpoint:', response.EndpointArn);
        return response.EndpointArn;
    } catch (error) {
        console.error('Failed to create SNS endpoint:', error);
        throw new Error('Failed to create SNS endpoint');
    }
};

module.exports = {createApplicationEndpoint}