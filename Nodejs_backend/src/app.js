const compression = require("compression");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// init middlewares
app.use(morgan("dev")); // print request logs on console
app.use(helmet()); // secure express app by setting various HTTP headers
app.use(compression()); // compress all responses
app.use(cors()); // enable CORS - Cross Origin Resource Sharing
app.use(bodyParser.json()); // parse application/json
// init MongoDb
require("./db/init_mongo");

//init routes

app.use("", require("./routes/index"));

app.use("", require("./routes/Auth/User"));
 



module.exports = app;






