// // public.js
// const setupDevice = require('./deviceModule');
// const config = require('../../config/config.json');

// function startDeviceAndForwardMessages(io) {
//     const device = setupDevice((topic, payload) => {
//         console.log('Message received from topic:', topic);
//         io.sockets.emit('message', payload.toString());  // Broadcasting message to all clients
//     });

//     // Handle errors
//     device.on('error', function(error) {
//         console.error('Error with IoT Device:', error);
//     });

//     io.on('connect_error', function(error) {
//         console.error('Socket.IO server error:', error);
//     });

//     io.on('error', function(error) {
//         console.error('Socket.IO server error:', error);
//     });
// }

// module.exports = startDeviceAndForwardMessages;
