// deviceModule.js
const awsIot = require('aws-iot-device-sdk');
const deviceConfig = require('../../config/config.json');

function setupDevice(onMessageReceived) {
  const device = awsIot.device({
    keyPath: process.env.PATH_TO_PRIVATE_KEY,
    certPath: process.env.PATH_TO_CERTIFICATE,
    caPath: process.env.PATH_TO_AMAZON_ROOT_CA_1,
    clientId: deviceConfig.CLIENT_ID,
    host: deviceConfig.ENDPOINT
  });

  device.on('connect', function() {
    console.log("Connected!");
    console.log(`Subscribing to topic '${deviceConfig.TOPIC}'...`);
    device.subscribe(deviceConfig.TOPIC);
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

  device.on('message', (topic, payload) => {
    console.log(`Received message from topic '${topic}': ${payload.toString()}`);
    if (onMessageReceived) {
      onMessageReceived(topic, payload);
    }
  });

  return device;
}

module.exports = setupDevice;
