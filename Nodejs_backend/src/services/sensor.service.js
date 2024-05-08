const Sensor = require('../models/sensor.model');
const setupDevice = require('../utils/deviceModule'); // Assuming deviceModule.js is in the same directory
const getUserTopics = require('../utils/getUsertopic');

const STANDARD_VALUE = 500; // Standard value for device data

class SensorService {
    constructor() {
        this.device = setupDevice();
    }
    static alertProcess = async (userId) => {
        try {
            const topics = await getUserTopics(userId);
            topics.forEach(topic => {
                console.log(`Subscribing to topic: ${topic}`);
                device.subscribe(topic);
                const messageListener = async (msgTopic, payload) => {
                    if (msgTopic === topic) { // Only process if the message is for this topic
                        const message = JSON.parse(payload.toString());
                        console.log(`Received message on topic ${msgTopic}:`, message); s
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
                                topic: msgTopic,
                                status: message.status,
                                warning: message.warning
                            });
                            await sensorData.save();
                            console.log('Message saved to database:', sensorData);
                        } catch (error) {
                            console.error('Error saving message to database:', error);
                        }
                    }
                };
                // Add the message listener
                device.on('message', messageListener);
            });
        } catch (error) {
            console.error('Failed to fetch topics or setup subscriptions:', error);
        }
    }

}


module.exports = SensorService;
