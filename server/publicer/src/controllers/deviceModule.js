// deviceModule.js
const awsIot = require('aws-iot-device-sdk');
const deviceConfig = require('../config/config.json');
const path = require('path');
require('dotenv')

function setupDevice() {
  
  const device = awsIot.device({
    keyPath: path.resolve(__dirname, process.env.PATH_TO_PRIVATE_KEY),
    certPath: path.resolve(__dirname, process.env.PATH_TO_CERTIFICATE),
    caPath: path.resolve(__dirname, process.env.PATH_TO_AMAZON_ROOT_CA_1),
    clientId: deviceConfig.CLIENT_ID,
    host: deviceConfig.ENDPOINT
  });

  device.on('connect', function() {
    console.log("Connected to AWS IoT");
  });

  device.on('reconnect', () => {
    console.log('Reconnecting...');
  });

  device.on('offline', () => {
    console.log('Went offline.');
  });

  device.on('error', (error) => {
    console.error('Error:', error);
  });

  return device;
}

module.exports = setupDevice;
