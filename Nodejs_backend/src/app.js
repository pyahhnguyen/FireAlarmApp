require("dotenv").config();
const compression = require("compression");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require("http"); // Import the 'http' module for creating an HTTP server
const { Server } = require('socket.io');
// const websocket = require('./src/sockets/socket');

const app = express();
// init middlewares
app.use(morgan("dev")); // print request logs on console
app.use(helmet()); // secure express app by setting various HTTP headers
app.use(compression()); // compress all responses
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json()); // parse application/json

// init MongoDb
require("./db/init_mongo");
// require("./middleware/sensor.middleware");
app.use('', require("./routes"));

//handling error
app.use((req, res, next) => {
    const error = new Error('Not found');
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

module.exports = { app };


