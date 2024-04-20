const express = require('express');
const http = require('http');
const socketIo = require('socket.io'); // Import socket.io

require('dotenv').config();
const app = express();
const server = http.createServer(app);
const io = socketIo(server); // Create socket.io server

// Express route for serving HTML page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// WebSocket connection handler
io.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('message', (message) => {
        console.log(`Received: ${message}`);
        // Echo back the received message to the client
        socket.emit('message', `Echo: ${message}`);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
