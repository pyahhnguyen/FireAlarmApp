const mongoose = require('mongoose');
const WebSocket = require('ws');
const SensorData = require('../models/sensor'); // Thay đổi đường dẫn tới model của bạn


const ws = new WebSocket('ws://10.0.243.115:3000'); // Điều chỉnh địa chỉ và cổng tương ứng

// Function to generate a random number within a specific range
function getRandomInRange(min, max, decimalPlaces) {
  const factor = Math.pow(10, decimalPlaces);
  return Math.round((Math.random() * (max - min) + min) * factor) / factor;
}

// Function to simulate and store sensor data for multiple sensors
async function simulateAndStoreSensorData() {
  const building = 'Blue';
  const floor = 1;
  const apartment = 101;
  const room = 'Living Room';

  // List of sensors in the room
  const sensors = [
    { sensor_id: '001', type: 'temp', min: 20, max: 40, decimalPlaces: 1 },
    { sensor_id: '002', type: 'humidity', min: 60, max: 100, decimalPlaces: 1 },
    { sensor_id: '003', type: 'CO2', min: 0, max: 2000, decimalPlaces: 1 },
    { sensor_id: '004', type: 'smoke', min: 0, max: 100, decimalPlaces: 1 },
  ];

  const simulatedDataList = sensors.map((sensor) => {
    return {
      sensor_id: sensor.sensor_id,
      building: building,
      floor: floor,
      apartment: apartment,
      room: room,
      timestamp: new Date(),
      data: {
        type: sensor.type,
        value: getRandomInRange(sensor.min, sensor.max, sensor.decimalPlaces),
      },
    };
  });

  // Create a new sensor data document for each sensor
  const newSensorDataList = simulatedDataList.map((simulatedData) => new SensorData(simulatedData));

  try {
    // Save the sensor data documents to the database
    await SensorData.insertMany(newSensorDataList);
    console.log('Simulated sensor data for multiple sensors saved to the database.');
  
////
    // Gửi dữ liệu cập nhật qua WebSocket
    ws.send(JSON.stringify(simulatedDataList));
  } catch (err) {
    console.error('Error saving sensor data for multiple sensors:', err);
  }
}

// });
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
