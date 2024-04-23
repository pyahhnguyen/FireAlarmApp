require("dotenv").config();
const compression = require("compression");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const http = require("http");


const app = express();
const server = http.createServer(app);


// Middleware setup
app.use(morgan("dev"));  // Log every request to the console
app.use(helmet());       // Set various HTTP headers to secure your app
app.use(compression());  // Compress response data with gzip / deflate
app.use(cors());         // Enable CORS with various options
app.use(express.urlencoded({ extended: true }));  // Parse URL-encoded bodies
app.use(express.json()); // Parse JSON bodies

// Log all incoming requests
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});



// MongoDB initialization (assumed to be setup in db/init_mongo)
require("./db/init_mongo");

// Routes initialization (assumed to be defined within routes/index.js)
app.use('', require("./routes"));

// General error handling
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});


app.use((error, req, res, next) => {
    const statusCode = error.status || 500;
    return res.status(statusCode).json({
    status: 'error',
    code: statusCode,
    stack: error.stack,
    message: error.message || 'Internal Server Error'
    })
})  

module.exports = { server, app };
