const AWS = require('aws-sdk');

AWS.config.update({ region: process.env.AWS_REGION }); 
const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

const sendSensorMessage = async (queueUrl, messageBody) => {
    const params = {
        MessageBody: JSON.stringify(messageBody),
        QueueUrl: queueUrl
    };

    try {
        const data = await sqs.sendMessage(params).promise();
        console.log('Message sent:', data.MessageId);
        return data.MessageId;
    } catch (err) {
        console.error('Error sending message:', err);
        throw new Error(`Error sending message: ${err.message}`);
    }
}

module.exports = sendSensorMessage