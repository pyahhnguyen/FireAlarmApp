require("dotenv").config();
const compression = require("compression");
const express = require("express");
const getDeviceStatus = require('./src/controllers/apartmentController');
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require("http"); // Import the 'http' module for creating an HTTP server
const socketIo = require('socket.io');
// const apiKey = require("./routes/Auth/checkAuth")

const app = express();
const server = http.createServer(app); // Create an HTTP server
const io = socketIo(server); // Create a WebSocket server
// init middlewares

app.use(morgan("dev")); // print request logs on console
app.use(helmet()); // secure express app by setting various HTTP headers
app.use(compression()); // compress all responses
app.use(bodyParser.urlencoded({
    extended: true  // Sửa từ extends thành extended
}));
app.use(bodyParser.json()); // parse application/json
// Middleware to log incoming requests
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });



io.on('connection', (socket) => {
    socket.on('message', async (message) => {
      let data;
      try {
        data = JSON.parse(message);
      } catch (error) {
        console.log(`[${new Date().toISOString()}] Invalid JSON: ${message}`);
        data = {};
      }
  
      try {
        const document = await getDeviceStatus(data);
        console.log(document);
        // Send the 'room' field back to the client
        if (document) {
          socket.emit('message', JSON.stringify(document));
        }
      } catch (err) {
        console.error(`[${new Date().toISOString()}] Error handling message: ${err}`);
      }
    socket.on('close', () => {
        console.log('Client disconnected');
      });
    });
  });
  

// init MongoDb
require("./db/init_mongo");

//init routes
app.use('', require("./routes"));

//handling error
app.use((req, res, next) => {
    const  error = new Error('Not found');
    error.status = 404;
    next(error)
})

app.use((error, req, res, next) => {
    const statusCode = error.status || 500;
    return res.status(statusCode).json({
    status: 'error',
    code: statusCode,
    stack: error.stack,
    message: error.message || 'Internal Server Error'
    })
})  

module.exports = {server, app, wss};    


