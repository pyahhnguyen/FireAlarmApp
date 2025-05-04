const AWS = require('aws-sdk');
const {pushNotification} = require('../services/pushNotification.service');

// Configure AWS SDK
AWS.config.update({ region: process.env.AWS_REGION }); 
const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

const queueUrl = process.env.SQS_URL; 

// Function to handle messages with warning = 1
const handleWarningMessage = (message) => {
    console.log('Handling warning message:', message);
    const messageALert = `Warning: Sensor data of ${message.owner} exceeds threshold at ${message.location}!`;
    console.log(messageALert);
    pushNotification(process.env.SNS_ENDPOINT_ARN, messageALert);
};

// Function to listen to the SQS queue
const listenToQueue = async () => {
    const params = {
        QueueUrl: queueUrl,
        MaxNumberOfMessages: 10, // Adjust based on your requirements
        WaitTimeSeconds: 20 // Long polling to reduce empty responses
    };

    while (true) {
        try {
            const data = await sqs.receiveMessage(params).promise();
            if (data.Messages) {
                for (const message of data.Messages) {
                    const body = JSON.parse(message.Body);
                    console.log('Processing message:', body);
                    if (body.warning === 1) {
                        handleWarningMessage(body);
                    }
                    // Delete the message from the queue
                    const deleteParams = {
                        QueueUrl: queueUrl,
                        ReceiptHandle: message.ReceiptHandle
                    };
                    await sqs.deleteMessage(deleteParams).promise();
                    console.log('Deleted message from queue:', message.MessageId);
                }
            } else {
                console.log('No messages to process');
            }
        } catch (error) {
            console.error('Error receiving or processing messages:', error);
        }
    }
};

listenToQueue();
