const setupDevice = require('../utils/deviceModule'); // Assuming deviceModule.js is in the same directory
const Sensor = require('../models/sensor.model');

// Set up the device and connect to AWS IoT Core
const device = setupDevice();
const STANDARD_VALUE = 500; // Standard value for device data
// Subscribe to the desired topic
const topicName = 'topic/#'; // Replace with your topic name
device.subscribe(topicName);
console.log(`Subscribing to topic: ${topicName}`);

const messageListener = async (topicName, payload) => {
        const message = JSON.parse(payload.toString());
        console.log(`Received message on topic ${topicName}:`, message);
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
                deviveId: message._id_,
                deviceName: message.device_name,
                model_code: message.model_code,
                deviceData: message.value,
                location: message.location,
                topic: topicName,
                status: message.status,
                warning: message.warning
            });
            await sensorData.save();
            // console.log('Message saved to database:', sensorData);
        } catch (error) {
            console.error('Error saving message to database:', error);
        }
    
};
// Add the message listener
device.on('message', messageListener);

module.exports = device; // Export the device instance if needed
