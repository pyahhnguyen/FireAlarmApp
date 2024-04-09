const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});
// Create an SQS service object
const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });
 
// Define the SQS queue URL
const receivedSqsQueueUrl = process.env.SQS_QUEUE_RECEIVED_URL;
const requestSqsQueueUrl = process.env.SQS_QUEUE_REQUESTED_URL;
// Poll for messages from SQS
function pollSQS() {
    const params = {
        QueueUrl: receivedSqsQueueUrl,
        MaxNumberOfMessages: 1, // Maximum number of messages to receive in a single poll
        WaitTimeSeconds: 10 // Wait time for long polling (in seconds)
    };
 
    sqs.receiveMessage(params, (err, data) => {
        if (err) {
            console.error('Error receiving message from SQS:', err);
        } else if (data.Messages && data.Messages.length > 0) {
            // Process received message
            const message = data.Messages[0];
            handleMessage(message);
 
            // Delete the received message from the queue
            deleteMessageFromQueue(message.ReceiptHandle);
        } else {
            // No messages received in this poll
            console.log('No messages received from SQS');
        }
 
        // Continue polling
        pollSQS();
    });
}
 
// Handle received message
function handleMessage(message) {
    const body = JSON.parse(message.Body);
    //console.log('Received message:', body);
    let condition = false;
    // Extract apartment id and sensor information
    const apartmentId = body.apartmentId;
    const roomName = Object.keys(body)[1]; 
    const sensorName = Object.keys(body[roomName])[0];
    const sensorData = body[roomName][sensorName];
    //console.log(apartmentId,roomName,sensors);
    // Check sensor statistics
    if (sensorData > 100) {
            condition = true;
        }
    // Publish to SQS regardless of condition
    publishToSQS(apartmentId,roomName,sensorName, condition);
    // Implement your logic to handle the message
    // e.g., trigger alerts, update database, etc.
}
 
// Delete message from the SQS queue
function deleteMessageFromQueue(receiptHandle) {
    const params = {
        QueueUrl: receivedSqsQueueUrl,
        ReceiptHandle: receiptHandle
    };
 
    sqs.deleteMessage(params, (err, data) => {
        if (err) {
            console.error('Error deleting message from SQS:', err);
        } else {
            console.log('Message deleted from SQS');
        }
    });
}
function publishToSQS(apartmentId, roomName, sensorName, condition) {
    const data = {
        apartmentId,
        [roomName]:{
            [sensorName]: {
                status: condition
            },
            status: condition,
        },
    };
    console.log(data);
    const params = {
        MessageBody: JSON.stringify(data),
        QueueUrl: requestSqsQueueUrl
    };
    // Send the message to the SQS queue
    sqs.sendMessage(params, (err, data) => {
        if (err) {
            console.error('Error sending message to SQS:', err);
        } else {
            console.log('Message sent to SQS:', data.MessageId);
        }
    });
}
// Start polling SQS
pollSQS();