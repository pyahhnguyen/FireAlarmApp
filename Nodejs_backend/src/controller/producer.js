// Import the AWS SDK
const AWS = require('aws-sdk');
 
// Configure AWS SDK with your region
AWS.config.update({ region: 'us-west-2' });
 
// Create an SQS service object
const sqs = new AWS.SQS();
 
// SQS Queue URL
const queueUrl = 'https://sqs.us-west-2.amazonaws.com/492804330065/apartment-sensors-monitoring';
 
// Function to send simulated fire alert sensor data to SQS
function sendFireAlertToSQS(apartmentId, smokeDetector, heatDetector, flameDetector, gasDetector) {
    const sensorData = {
        apartmentId,
        sensors: {
            smokeDetector,
            heatDetector,
            flameDetector,
            gasDetector
        }
    };
    const params = {
        MessageBody: JSON.stringify(sensorData),
        QueueUrl: queueUrl
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
 
// Simulate sending data to SQS
setInterval(() => {
    const smokeDectector = Math.floor(Math.random() * 100) + 50; // Simulate 10 different sensors
    const heatDetector = Math.floor(Math.random() * (100)) + 500; // Simulate temperature between 50 and 100
    const flameDetector = Math.floor(Math.random() * (100 + 1)) + 500;
    const GasDetector = Math.floor(Math.random() * (100 + 1)) + 500;
    const apartmentId = Math.floor(Math.random() * 10) + 1; // Simulate 10 different apartments
    sendFireAlertToSQS(apartmentId, smokeDectector, heatDetector, flameDetector, GasDetector);
}, 5000); // Send data every 5 seconds