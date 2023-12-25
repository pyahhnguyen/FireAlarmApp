require("dotenv").config();
const compression = require("compression");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require("http"); // Import the 'http' module for creating an HTTP server
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app); // Create an HTTP server
const wss = new WebSocket.Server({ server }); // Create a WebSocket server


function broadcastSensorData(sensorData) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(sensorData), (error) => {
        if (error) {
          // Xử lý lỗi khi gửi dữ liệu
          console.error('Error sending data to a client:', error);
        } else {
          // Dữ liệu đã được gửi thành công
          console.log('Data sent to a client successfully');
        }
      });
    }
  });

}

// Test gửi dữ liệu qua WebSocket
wss.on("connection", (ws) => {
  console.log("WebSocket client connected");
  ws.on("message", (message) => {
    console.log(`Received_from_script: ${message}`);
    // Hoặc bạn có thể phân loại và xử lý dữ liệu cảm biến ở đây
    const sensorData = JSON.parse(message);
    broadcastSensorData(sensorData)

  });

  ws.on("close", () => {
    console.log("WebSocket client disconnected");
  });
});


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

app.use("", require("./routes/Sensor/sensor_data"));

server.listen(4000, () => console.log("Server websocket running on port 4000"))

module.exports = {server, app, wss};


