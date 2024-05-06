const socketIo = require('socket.io');
const JWT = require('jsonwebtoken');
const setupDevice = require('../controllers/deviceModule');
const getUserTopics = require('./topicManagement');
const { findByUserId } = require('../services/service.key.token');

const historyManager = require('../services/historyMessage');

module.exports = async (io) => {
    const device = setupDevice();
    // Log the initiation of the device setup
    console.log("Setting up device...");
    io.use(async (socket, next) => {
        console.log("Middleware called for socket:", socket.id);
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
            console.log(`Finding key store for user: ${userId}`);
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
                console.log(`JWT verified successfully for user: ${userId}`);
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
                const messageListener = (msgTopic, payload) => {
                    if (msgTopic === topic) { // Only emit if the message is for this topic
                        console.log(`Received message from topic '${msgTopic}': ${payload.toString()}`);
                        // console.log(`Attempting to send message to topic '${msgTopic}' with payload '${payload}'`);
                        io.to(msgTopic).emit('message', payload.toString());
                    }
                };
                // Add the message listener
                device.on('message', messageListener);
                // Store the message listener so we can remove it when the socket disconnects
                socket.messageListeners = socket.messageListeners || [];
                socket.messageListeners.push(messageListener);
                socket.join(topic);
            });
            console.log(topics)
            console.log(`Emitting subscription success to user: ${socket.user.userId}`);
            socket.emit('subscribed', `Subscribed to topics: ${topics.join(', ')}`);
        } catch (error) {
            console.error('Failed to fetch topics or setup subscriptions:', error);
            socket.emit('error', 'Failed to setup topics or subscriptions');
            socket.disconnect(true);
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