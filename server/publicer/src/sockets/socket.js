const socketIo = require('socket.io');
const JWT = require('jsonwebtoken');
const setupDevice = require('../controllers/deviceModule');
const getUserTopics = require('./topicManagement');
const { findByUserId } = require('../services/service.key.token');

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
    
            console.log(`Verifying token for user: ${userId}`);
            console.log("Token:", token);
            console.log("Public Key:", keyStore.publicKey);
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
                console.log(`Fetching topics for user: ${socket.user.userId}`);
                const topics = await getUserTopics(socket.user.userId);
                console.log(`Topics fetched: ${topics.join(', ')}`);

                topics.forEach(topic => {
                    console.log(`Subscribing to topic: ${topic}`);
                    device.subscribe(topic);

                    device.on('message', (topic, payload) => {
                        console.log(`Received message from topic '${topic}': ${payload.toString()}`);
                        console.log(`Attempting to send message to topic '${topic}' with payload '${payload}'`);
                        io.to(topic).emit('message', payload.toString());
                    });
                    socket.join(topic);
                });

                console.log(`Emitting subscription success to user: ${socket.user.userId}`);
                socket.emit('subscribed', `Subscribed to topics: ${topics.join(', ')}`);
            } catch (error) {
                console.error('Failed to fetch topics or setup subscriptions:', error);
                socket.emit('error', 'Failed to setup topics or subscriptions');
                socket.disconnect(true);
            }
        });
};
