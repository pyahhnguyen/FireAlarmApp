
const socketIo = require('socket.io');
const JWT = require('jsonwebtoken');
const setupDevice = require('../controllers/deviceModule');
const getUserTopics = require('./topicManagement');
const { findByUserId } = require('../services/service.key.token');

module.exports = async (httpServer) => {
    // Create HTTP server
    io = socketIo(httpServer);

    // Global listener for device messages, dispatching to rooms
    const device = setupDevice();
    device.on('message', (topic, payload) => {
        console.log(`Received message from topic '${topic}': ${payload.toString()}`);
        io.to(topic).emit('message', payload.toString());
    });

    // Handling connections
    io.on('connection', async (socket) => {
        // Handle authentication data sent from the client
        const { token, userId } = socket.handshake.query;

        if (!token || !userId) {
            // Close the connection if authentication data is missing
            console.error('Authentication error: Token or User ID is missing');
            socket.disconnect(true);
            return;
        }

        try {
            // Verify the token using your authentication mechanism
            const keyStore = await findByUserId(userId);
            const user = JWT.verify(token, keyStore.publicKey);

            // Attach user info to the socket session
            socket.user = user;

            // Fetch topics for the authenticated user
            const topics = await getUserTopics(userId);

            // Subscribe to each topic and join the corresponding Socket.IO room
            topics.forEach(topic => {
                device.subscribe(topic);
                socket.join(topic);
            });

            // Emit a confirmation message to the client
            socket.emit('subscribed', `Subscribed to topics: ${topics.join(', ')}`);
        } catch (error) {
            console.error('Authentication error:', error);
            socket.disconnect(true);
        }
    });
}

