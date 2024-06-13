const setupDevice = require('../utils/deviceModule'); // Assuming deviceModule.js is in the same directory
const Sensor = require('../models/sensor.model');

// Set up the device and connect to AWS IoT Core
const device = setupDevice();
// Define standard values for different sensor types
const STANDARD_VALUES = {
    'smoke': 1900, // Example standard value for temperature sensor
    'heat': 150,
    'gas': 1000,
    "flame": 1900,

};

// Subscribe to the desired topic
const topicName = 'topic/#'; // Replace with your topic name
device.subscribe(topicName);
console.log(`Subscribing to topic: ${topicName}`);
const messageListener = async (topicName, payload) => {
        const message = JSON.parse(payload.toString());
        // console.log(`Received message on topic ${topicName}:`, message);
        // Check if the device value exceeds the standard value
          // Check if the sensor type is specified in the message
    if (message.device_type && STANDARD_VALUES.hasOwnProperty(message.device_type)) {
        const STANDARD_VALUE = STANDARD_VALUES[message.device_type];
        // Check if the device value exceeds the standard value
        if (message.value > STANDARD_VALUE) {
            // Update the message with status and warning
            message.status = 'Alert';
            message.warning = 1;
            console.log('Alert! Device value exceeded standard value.');
        } else {
            // Device value is normal
            message.status = 'Normal';
            message.warning = 0;
        }
        try {
            // Save the message to the database
            const sensorData = new Sensor({
                device_type: message.device_type,
                deviceId: message._id_,
                deviceName: message.device_name,
                model_code: message.model_code,
                deviceData: message.value,
                location: message.location,
                topic: topicName,
                status: message.status,
                warning: message.warning,
                owner: message.userId 
            });
            await sensorData.save();
            console.log('Message saved to database:', sensorData);
        } catch (error) {
            console.error('Error saving message to database:', error);
        }
    } else {
        console.error('Invalid sensor type:', message.device_type);
    }
};
// Add the message listener
device.on('message', messageListener);
module.exports = device; // Export the device instance if needed
