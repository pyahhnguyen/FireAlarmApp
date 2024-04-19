const socketIo = require('socket.io');
const JWT = require('jsonwebtoken');
const setupDevice = require('../controllers/deviceModule');
const getUserTopics = require('./topicManagement');
const { findByUserId } = require('../services/service.key.token');

module.exports = async (httpServer) => {
    const io = socketIo(httpServer);
    const device = setupDevice();

    // Global listener for device messages, dispatching to rooms
    device.on('message', (topic, payload) => {
        console.log(`Received message from topic '${topic}': ${payload.toString()}`);
        io.to(topic).emit('message', payload.toString());
    });

    // Middleware for token verification
    io.use(async (socket, next) => {
        const token = socket.handshake.query.token;
        if (!token) {
            return next(new Error('Authentication error: Token required'));
        }

        const userId = socket.handshake.query.userId; // Assuming userID is passed along with the token
        if (!userId) {
            return next(new Error('Authentication error: User ID required'));
        }

        try {
            const keyStore = await findByUserId(userId);
            const user = JWT.verify(token, keyStore.publicKey); // Verify token with the user's public key
            socket.user = user; // Attach user info to the socket session
            next();
        } catch (error) {
            console.error('Authentication error:', error);
            next(new Error('Authentication error'));
        }
    });

    // Handling connections after successful authentication
    io.on('connection', async (socket) => {
        try {
            const topics = await getUserTopics(socket.user.userId); // Use the attached user info
            topics.forEach(topic => {
                device.subscribe(topic);  // Subscribe to each topic
                socket.join(topic);       // Join to Socket.IO room corresponding to the topic
            });
            socket.emit('subscribed', `Subscribed to topics: ${topics.join(', ')}`);
        } catch (error) {
            console.error('Failed to fetch topics or setup subscriptions:', error);
            socket.emit('error', 'Failed to setup topics or subscriptions');
            socket.disconnect(true);
        }
    });
};
