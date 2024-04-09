// Import the AWS SDK
const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});
const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });
// SQS Queue URL
const queueUrl = process.env.SQS_QUEUE_MONITORING_URL;
console.log('Queue URL:', queueUrl);
// Function to send simulated fire alert sensor data to SQS
function sendFireAlertToSQS(apartmentId, sensor, roomName) {
    const sensorData = {
        apartmentId,
        [roomName]:{
            [sensor.sensorName]: sensor.data,
            }
    };
    console.log(sensorData)
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
const roomNames = ['LivingRoom', 'Kitchen']; // Simulate 2 different rooms
const apartmentId = ['659a4e55b88b9369f584b308','659a597cb88b9369f584b309','659a59dfb88b9369f584b30a','659a59ecb88b9369f584b30b','659a59f2b88b9369f584b30c','659a59fab88b9369f584b30d','659a5a00b88b9369f584b30e','659a5a00b88b9369f584b30f','659a5a0db88b9369f584b310','659a5a16b88b9369f584b311',] // Simulate 10 different apartments
// Simulate sending data to SQS
setInterval(() => {
    const smokeDectector = Math.floor(Math.random() * 100) + 50; // Simulate 10 different sensors
    const sensorData = {
        sensorName: 'smokeDectector',
        data: smokeDectector
    }
    for (const room in roomNames){
        for (const apartment in apartmentId){
            sendFireAlertToSQS(apartmentId[apartment], sensorData, roomNames[room]);
        }
    }
}, 100000); // Send data every 1 seconds
setInterval(() => {
    const GasDetector = Math.floor(Math.random() * 100) + 100; // Simulate temperature between 50 and 100
    const sensorData = {
        sensorName: 'GasDetector',
        data: GasDetector
    }
    for (const room in roomNames){
        for (const apartment in apartmentId){
            sendFireAlertToSQS(apartmentId[apartment], sensorData, roomNames[room]);
        }
    }
 100000});
// Simulate sending data to SQS
setInterval(() => {
    const heatDetector = Math.floor(Math.random() * 100) + 100; // Simulate temperature between 50 and 100
    const sensorData = {
        sensorName: 'heatDetector',
        data: heatDetector
    }
    for (const room in roomNames){
        for (const apartment in apartmentId){
            sendFireAlertToSQS(apartmentId[apartment], sensorData, roomNames[room]);
        }
    }
 100000}); // Send data every 1 seconds
 setInterval(() => {
    const flameDetector = Math.floor(Math.random() * 100); // Simulate temperature between 50 and 100
    const sensorData = {
        sensorName: 'flameDetector',
        data: flameDetector
    }
    for (const room in roomNames){
        for (const apartment in apartmentId){
            sendFireAlertToSQS(apartmentId[apartment], sensorData, roomNames[room]);
        }
    }
 100000});