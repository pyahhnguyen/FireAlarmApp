const io = require('socket.io-client');

// Assuming your server is running locally on port 3000
const socketUrl = 'http://localhost:5000';
const userId = '65ef417a0de4e2e67875a472';  // Example User ID
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWVmNDE3YTBkZTRlMmU2Nzg3NWE0NzIiLCJlbWFpbCI6InBodWdpYXp4MTRAZ21haWwuY29tIiwiaWF0IjoxNzEzNTEzMzQ0LCJleHAiOjE3MTQxMTgxNDR9.dTQ2OWnKYyhmxSHjQ3oi2yWE4OCU_AYcIsYc-BuG9Ec';  // Example Token

const options = {
  query: { token, userId },
  transports: ['websocket'],
  forceNew: true,
};

const socket = io(socketUrl, options);

socket.on('connect', () => {
  console.log('Successfully connected to the server!');
});

socket.on('message', (message) => {
  console.log('Received message:', message);
});

socket.on('subscribed', (response) => {
  console.log('Subscription confirmation received:', response);
});

socket.on('error', (error) => {
  console.error('Error encountered:', error);
});

socket.on('disconnect', (reason) => {
  console.log('Disconnected:', reason);
});

socket.on('close', () => {
  console.log('Socket closed unexpectedly.');
});