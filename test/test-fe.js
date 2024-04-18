const AsyncStorage = require('@react-native-async-storage/async-storage').default;
const mqtt = require('react-native-mqtt');

init({
  size: 10000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  reconnect: true,
  sync: {},
});

// Initialize the MQTT Client
const client = init({
  uri: 'wss://a5kpujtmyqbrl-ats.iot.us-east-1.amazonaws.com:443/mqtt',
  clientId: 'clientId',
  auth: {
    username: 'yourAWSAccessKeyId',
    password: 'yourAWSSecretAccessKey',
  },
  tls: true,
});

// Connect to AWS IoT
client.connect()
  .then(() => {
    console.log('Connected to AWS IoT');
    // Subscribe to a topic
    client.subscribe('your/topic', 0); // 0 is the QoS level
  })
  .catch(error => {
    console.error('Connection failed', error);
  });

// Handle incoming messages
client.on('message', (topic, message) => {
  console.log(`Received message from ${topic}: ${message.toString()}`);
});

// Handle connection errors
client.on('error', (error) => {
  console.error('Connection Error:', error);
});

// Optional: Clean up before app is closed or goes to background
client.on('close', () => {
  console.log('Disconnected from AWS IoT');
});
