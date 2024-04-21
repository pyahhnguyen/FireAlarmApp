const io = require('socket.io-client');

// Assuming your server is running locally on port 3000
const socketUrl = 'http://localhost:8000';
const userId = '65dde8cde00e7c1aa09330ef';  // Example User ID
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWRkZThjZGUwMGU3YzFhYTA5MzMwZWYiLCJlbWFpbCI6ImtoYWlodW5nMDNAZ21haWwuY29tIiwiaWF0IjoxNzEzNjEyNzY5LCJleHAiOjE3MTQyMTc1Njl9.b8M64fZxOTAZZgP6-urS-o3T2kF3pUo6bQH6JvYZdLo';  // Example Token

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