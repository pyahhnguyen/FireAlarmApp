const socketIo = require('socket.io');
const JWT = require('jsonwebtoken');
const setupDevice = require('../controllers/deviceModule');
const getUserTopics = require('./getUserTopics');
const { findByUserId } = require('../services/service.key.token');

module.exports = async (io) => {
    const device = setupDevice();
    // Log the initiation of the device setup
    console.log("Setting up device...");


    io.use(async (socket, next) => {
        const token = socket.handshake.query.token;
        const userId = socket.handshake.query.userId;
    
        if (!token) {
            return next(new Error('Authentication error: Token required'));
        }
    
        if (!userId) {
            return next(new Error('Authentication error: User ID required'));
        }
    
        try {
            const keyStore = await findByUserId(userId);
            if (!keyStore) {
                return next(new Error('Authentication error: Key store not found'));
            }

            JWT.verify(token, keyStore.privateKey, (err, decoded) => {
                if (err) {
                    return next(new Error('Authentication error'));
                }
                socket.user = decoded;
                next();
            });
        } catch (error) {
            next(new Error('Authentication error'));
        }
    });

    io.on('connection', async (socket) => {
            console.log(`Socket connected: ${socket.id}`);
            
            try {
                const topics = await getUserTopics(socket.user.userId);
                console.logs(topics)
                topics.forEach(topic => {
                    device.subscribe(topic);

                    device.on('message', (topic, payload) => {
                        io.to(topic).emit('message', payload.toString());
                    });
                    socket.join(topic);
                });

                socket.emit('subscribed', `Subscribed to topics: ${topics.join(', ')}`);
            } catch (error) {
                console.error('Failed to fetch topics or setup subscriptions:', error);
                socket.emit('error', 'Failed to setup topics or subscriptions');
                socket.disconnect(true);
            }
        });
};
