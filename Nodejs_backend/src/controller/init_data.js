const mongoose = require('mongoose');
const WebSocket = require('ws');
const SensorData = require('../models/sensor'); // Thay đổi đường dẫn tới model của bạn
const { broadcastUpdate } = require('../controller/websocket_con'); // Thay đổi đường dẫn tới file websocket_con.js của bạn

const ws = new WebSocket('ws://localhost:3000'); // Điều chỉnh địa chỉ và cổng tương ứng

// Function to generate a random number within a specific range
function getRandomInRange(min, max, decimalPlaces) {
  const factor = Math.pow(10, decimalPlaces);
  return Math.round((Math.random() * (max - min) + min) * factor) / factor;
}

// Function to simulate and store sensor data
async function simulateAndStoreSensorData() {
  const sensorId = 'sensor-001';
  const building = 'Blue';
  const floor = 1;
  const apartment = 101;
  const room = 'Living Room';

  // Simulate data (you can replace this with actual sensor data)
  const simulatedData = {
    sensor_id: sensorId,
    building: building,
    floor: floor,
    apartment: apartment,
    room: room,
    timestamp: new Date(),
    data: {
      type: 'temperature',
      value: getRandomInRange(0, 40, 1), // Generate a temperature value within the range [0, 40] rounded to 1 decimal place
    },
  };

  // Create a new sensor data document
  const newSensorData = new SensorData(simulatedData);

  try {
    // Save the sensor data document to the database
    await newSensorData.save();

    console.log('Simulated sensor data saved to the database.');

    // Gửi dữ liệu cập nhật qua WebSocket
    ws.send(JSON.stringify(simulatedData));
  } catch (err) {
    console.error('Error saving sensor data:', err);
  }
}

// Connect to the MongoDB database
mongoose.connect('mongodb+srv://phugia:Z50j1tmo@atlascluster.hhqailb.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB!');
  // Mở kết nối WebSocket ở đây nếu cần
  // ...

  // Simulate and store sensor data every 5 seconds (you can adjust the interval)
  setInterval(simulateAndStoreSensorData, 5000);
});

mongoose.connection.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err.message);
});
