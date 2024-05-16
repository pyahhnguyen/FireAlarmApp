const AWS = require('aws-sdk');

// Initialize the SNS client
AWS.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});


const createApplicationEndpoint = async (deviceToken) => {
    const params = {
        PlatformApplicationArn: process.env.SNS_PLATFORM_ARN,
        Token: deviceToken,
        CustomUserData: 'Additional data - optional', // Optional
        Attributes: {
            'Enabled': 'true'
        }
    };

    try {
        const response = await sns.createPlatformEndpoint(params).promise();
        return response.EndpointArn;
    } catch (error) {
        throw new Error('Failed to create SNS endpoint');
    }
};


module.exports = { createApplicationEndpoint }