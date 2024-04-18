const WebSocket = require('ws'); // Require the ws library

const ws = new WebSocket('ws://localhost:8080');

ws.on('message', function message(data) {
  const messageString = data.toString(); // Convert Buffer to string
  console.log('Received message:', messageString);

  // Optionally, parse the JSON string if you know it's JSON
  try {
    const messageObject = JSON.parse(messageString);
    console.log('Parsed message:', messageObject);
  } catch (error) {
    console.error('Error parsing JSON:', error);
  }
});
