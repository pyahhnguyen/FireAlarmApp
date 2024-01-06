const AWS = require('aws-sdk');
 
// Set your AWS credentials and region
AWS.config.update({
    // accessKeyId: 'your_access_key_id',
    // secretAccessKey: 'your_secret_access_key',
    region: 'us-west-2'
});
 
// Create an SQS service object
const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });
 
// Define the SQS queue URL
const receivedSqsQueueUrl = 'https://sqs.us-west-2.amazonaws.com/492804330065/apartment-sensors-monitoring';
const requestSqsQueueUrl = 'https://sqs.us-west-2.amazonaws.com/492804330065/apartment-sensors-results'; 
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
    console.log('Received message:', body);
    let condition = true;
    // Extract apartment id and sensor information
    const apartmentId = body.apartmentId;
    const sensors = body.sensors;
    console.log(apartmentId,sensors);
    // Check sensor statistics
    for (const sensor in sensors) {
        if (sensors[sensor] < 100) {
            condition = false;
            break;
        }
    }
    console.log(condition);
    // Publish to SQS regardless of condition
    publishToSQS(apartmentId, condition);
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
function publishToSQS(apartmentId, condition) {
    const params = {
        MessageBody: JSON.stringify({ apartmentId, room, condition }),
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