const awsIot = require('aws-iot-device-sdk');
const mqtt = require('mqtt');

// Constants
const ENDPOINT = "a5kpujtmyqbrl-ats.iot.us-east-1.amazonaws.com";
const CLIENT_ID = "testClient";
const PATH_TO_CERTIFICATE = "./4555102e03b46cb31d2ad00e3d2460473c4ddfafd510d1c8a52681521d8e0432-certificate.pem.crt";
const PATH_TO_PRIVATE_KEY = "./4555102e03b46cb31d2ad00e3d2460473c4ddfafd510d1c8a52681521d8e0432-private.pem.key";
const PATH_TO_AMAZON_ROOT_CA_1 = "./AmazonRootCA1.pem";
const TOPIC = "phugia/humidity";

// Constants for MQTT Broker in Backend
const BACKEND_MQTT_BROKER_URI = "mqtt://localhost";
const BACKEND_MQTT_TOPIC = "backend/data";

// Create the device instance
const device = awsIot.device({
    keyPath: PATH_TO_PRIVATE_KEY,
    certPath: PATH_TO_CERTIFICATE,
    caPath: PATH_TO_AMAZON_ROOT_CA_1,
    clientId: CLIENT_ID,
    host: ENDPOINT
});

// MQTT client to publish to backend MQTT broker
const client = mqtt.connect(BACKEND_MQTT_BROKER_URI);

// Connect callback
device.on('connect', () => {
    console.log("Connected to AWS IoT Core");
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
    
    // Publish the processed data to the backend MQTT broker
    client.publish(BACKEND_MQTT_TOPIC, processedData);
});

// Keep the application running
process.on('SIGINT', () => {
    console.log("Disconnecting...");
    device.end();
    console.log("Disconnected!");
    process.exit();
});

