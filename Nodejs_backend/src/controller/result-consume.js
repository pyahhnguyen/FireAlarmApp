const AWS = require('aws-sdk');


// MongoDB connection string
const url = 'mongodb://localhost:27017';
const dbName = 'myproject';

// Set your AWS credentials and region
AWS.config.update({
    // accessKeyId: 'your_access_key_id',
    // secretAccessKey: 'your_secret_access_key',
    region: 'us-west-2'
});
 // Create an SQS service object
const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });
 
// Define the SQS queue URL
const receivedSqsQueueUrl = 'https://sqs.us-west-2.amazonaws.com/492804330065/apartment-sensors-results';
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
    console.log('Received message:', body);

    // Extract apartment id and sensor information
    const apartmentId = body.apartmentId;
    const condition = body.condition;
    if (condition == true){
        console.log({ apartmentId, condition });
        return JSON.stringify({ apartmentId, condition });
    }
    else{
        console.log({apartmentId}, 'No Fire Alert');
        return JSON.stringify({ apartmentId, condition });
    }

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
// Start polling SQS
pollSQS();