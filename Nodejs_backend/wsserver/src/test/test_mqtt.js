const setupDevice = require('../controllers/deviceModule');  // Adjust the path as necessary
require('dotenv').config();

function startTest() {
    const topic = 'topic/65dde8cde00e7c1aa09330ef/living';  // Example topic, change as required

    // Set up the device using the deviceModule
    const device = setupDevice();

    device.on('connect', function() {
        console.log("Successfully connected to AWS IoT");
        // Subscribe to the topic
        device.subscribe(topic);
        console.log(`Subscribed to the topic: ${topic}`);
    });

    device.on('message', function(topic, payload) {
        console.log(`Received message from ${topic}:`);
        console.log(payload.toString());
    });

    device.on('error', function(error) {
        console.error('Connection error:', error);
    });

    device.on('close', function() {
        console.log('Connection closed');
    });

    device.on('reconnect', function() {
        console.log('Reconnecting...');
    });

    device.on('offline', function() {
        console.log('Device went offline');
    });
}

startTest();
