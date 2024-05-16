const AWS = require('aws-sdk');
const JWT = require('jsonwebtoken');
const setupDevice = require('../controllers/deviceModule');
const getUserTopics = require('./getUserTopics');
const { findByUserId } = require('../services/service.key.token');
const sendSensorMessage = require('../services/sqsAlertMessage.service');
const Sensor = require('../models/sensor.model');




module.exports = async (io) => {
    const device = setupDevice();
    // Log the initiation of the device setup
    console.log("Setting up device...");

    const STANDARD_VALUES = {
        'smoke': 1900, // Example standard value for temperature sensor
        'heat': 150,
        'gas': 1000,
        "flame": 1900,
        // Example standard value for humidity sensor
        // Add more sensor types and their corresponding standard values as needed
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
                await sendSensorMessage(process.env.SQS_URL, sensorData);
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
io.use(async (socket, next) => {
        // console.log("Middleware called for socket:", socket.id);
        const token = socket.handshake.query.token;
        const userId = socket.handshake.query.userId;
        if (!token) {
            console.error('Authentication failed: Token required for socket:', socket.id);
            return next(new Error('Authentication error: Token required'));
        }
        if (!userId) {
            console.error('Authentication failed: User ID required for socket:', socket.id);
            return next(new Error('Authentication error: User ID required'));
        }
        try {
            // console.log(`Finding key store for user: ${userId}`);
            const keyStore = await findByUserId(userId);
            if (!keyStore) {
                console.error(`Key store not found for user: ${userId}`);
                return next(new Error('Authentication error: Key store not found'));
            }
            JWT.verify(token, keyStore.privateKey, (err, decoded) => {
                if (err) {
                    console.error('JWT verification failed for user:', userId, 'with error:', err);
                    return next(new Error('Authentication error'));
                }
                socket.user = decoded;
                // console.log(`JWT verified successfully for user: ${userId}`);
                next();
            });
        } catch (error) {
            console.error('Authentication error for socket:', socket.id, 'with error:', error);
            next(new Error('Authentication error'));
        }
    });

    io.on('connection', async (socket) => {
        console.log(`Socket connected: ${socket.id}`);
        try {
            const topics = await getUserTopics(socket.user.userId);
            topics.forEach(topic => {
                console.log(`Subscribing to topic: ${topic}`);
                device.subscribe(topic);
                // Event listener for messages on this topic
                const messageListener = async(msgTopic, payload) => {
                    if (msgTopic === topic) { // Only emit if the message is for this topic
                        io.to(msgTopic).emit('message', payload.toString());
                    }
                    socket.join(topic);
                    socket.emit('message', payload.toString());
                    // Parse the received message
                };
                // Add the message listenev
                device.on('message', messageListener);
                // Store the message listener so we can remove it when the socket disconnects
                socket.messageListeners = socket.messageListeners || [];
                socket.messageListeners.push(messageListener);
            });
            console.log(topics)
            console.log(`Emitting subscription success to user: ${socket.user.userId}`);
            socket.emit('subscribed', topics);
        } catch (error) {
console.error('Failed to fetch topics or setup subscriptions:', error);
            socket.emit('error', 'Failed to setup topics or subscriptions');
            // socket.disconnect(true);
        }
        // Handle socket disconnection
        socket.on('disconnect', () => {
            console.log(`Socket disconnected: ${socket.id}`);
            // Remove all message event listeners associated with this socket
            if (socket.messageListeners && socket.messageListeners.length > 0) {
                socket.messageListeners.forEach(listener => {
                    device.removeListener('message', listener);
                });
                delete socket.messageListeners;
            }
        });
    });
};
