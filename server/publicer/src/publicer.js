const WebSocket = require('ws');  // This ensures WebSocket is defined in this file
const setupDevice = require('./modules/deviceModule');
const config = require('../config/config.json');

function startDeviceAndForwardMessages(wss) {
    const device = setupDevice();

    // Broadcast to all clients
    function broadcast(data) {
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data, err => {
                    if (err) {
                        console.error('Failed to send data:', err);
                    }
                });
            }
        });
    }

    // Connect to AWS IoT and subscribe to topic
    device.on('connect', function() {
        console.log('Connected to AWS IoT');
        device.subscribe(config.TOPIC); // Ensure this topic is correctly specified
    });

    // Handling incoming messages and broadcasting them
    device.on('message', function(topic, payload) {
        console.log('Message received from topic:', topic);
        broadcast(payload.toString());
    });

    // Handle errors
    device.on('error', function(error) {
        console.error('Error with IoT Device:', error);
    });

    wss.on('error', function(error) {
        console.error('WebSocket server error:', error);
    });
}

module.exports = startDeviceAndForwardMessages;
