const WebSocket = require('ws');
require('dotenv').config();
const startDeviceAndForwardMessages = require('./src/publicer');

// Initialize WebSocket Server
const wss = new WebSocket.Server({ port: 8080 });

// Starting the device and forwarding messages
startDeviceAndForwardMessages(wss);
