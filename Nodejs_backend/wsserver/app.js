const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
require('dotenv').config();
require("./src/db/init_mongo"); // Ensure this module properly handles its own setup and errors
const websocketSetup = require('./src/sockets/socket');
const  forwardAlert = require('./src/controllers/forwardAlert');

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 5000;

// Initialize WebSocket (Socket.IO) with the server
websocketSetup(io);


// Server start and error handling
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}).on('error', (err) => {
  console.error('Server failed to start', err);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log("Caught interrupt signal");

  // Close HTTP server
  server.close(async () => {
    console.log('HTTP server closed');

    // Close MongoDB connection using Promise
    try {
      await mongoose.connection.close();
      console.log('MongoDb connection closed.');
      // After all are closed, exit:
      process.exit(0);
    } catch (err) {
      console.error('Error while closing MongoDB connection:', err);
      process.exit(1);
    }
  });
});