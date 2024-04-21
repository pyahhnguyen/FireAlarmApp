const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();
// MongoDB initialization (assumed to be setup in db/init_mongo)
require("./src/db/init_mongo");
const mongoose = require('mongoose');

// startDeviceAndForwardMessages = require('./src/controllers/wsPublicer')

const websocket = require('./src/sockets/socket');
// const startDeviceAndForwardMessages = require('./src/publicer');

const app = express();

const server = http.createServer(app);
// Socket.IO server attached to the same HTTP server
const io = new Server(server);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

// Initialize WebSocket (Socket.IO) with the server
websocket(io);
// startDeviceAndForwardMessages(io)


process.on('SIGINT', function() {
  console.log("Caught interrupt signal");
  
  // If you have an HTTP server:
  server.close(() => {
      console.log('HTTP server closed');
  });

  // If you are using MongoDB with Mongoose, for example:
  mongoose.connection.close(false, () => {
      console.log('MongoDb connection closed.');
  });


  // After all are closed, exit:
  process.exit(0);
});