const awsIot = require('aws-iot-device-sdk');

// Constants
const ENDPOINT = "a5kpujtmyqbrl-ats.iot.us-east-1.amazonaws.com";
const CLIENT_ID = "testClient";
const PATH_TO_CERTIFICATE = "./4555102e03b46cb31d2ad00e3d2460473c4ddfafd510d1c8a52681521d8e0432-certificate.pem.crt";
const PATH_TO_PRIVATE_KEY = "./4555102e03b46cb31d2ad00e3d2460473c4ddfafd510d1c8a52681521d8e0432-private.pem.key";
const PATH_TO_AMAZON_ROOT_CA_1 = "./AmazonRootCA1.pem";
const TOPIC = "phugia/humidity";

// Create the device instance
const device = awsIot.device({
   keyPath: PATH_TO_PRIVATE_KEY,
   certPath: PATH_TO_CERTIFICATE,
   caPath: PATH_TO_AMAZON_ROOT_CA_1,
   clientId: CLIENT_ID,
   host: ENDPOINT
});

// Connect callback
device.on('connect', function() {
    console.log("Connected!");
    console.log(`Subscribing to topic '${TOPIC}'...`);
    device.subscribe(TOPIC);
});

// Reconnect handling
device.on('reconnect', () => {
    console.log('Reconnecting...');
});

// Offline handling
device.on('offline', () => {
    console.log('Went offline.');
});

// Error handling
device.on('error', (error) => {
    console.error('Error:', error);
});

// Message handling
device.on('message', (topic, payload) => {
    console.log(`Received message from topic '${topic}': ${payload.toString()}`);
});

// Keep the application running
process.on('SIGINT', function() {
    console.log("Disconnecting...");
    device.end();
    console.log("Disconnected!");
    process.exit();
});
