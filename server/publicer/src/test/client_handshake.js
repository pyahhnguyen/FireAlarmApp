    const WebSocket = require('ws'); // Require the ws library
    require('dotenv').config();
    // Example JWT token (replace this with your actual token)
    const jwtToken = process.env.JWT_TOKEN;

    // Establish WebSocket connection with JWT token in headers
    const ws = new WebSocket('ws://localhost:3003', {
        headers: {
            acceptuthorization: `Bearer ${jwtToken}`, // Include JWT token in Authorization header
            userId: '65dde8cde00e7c1aa09330ef' // Include user ID in custom header
        }
    });

    // Handle WebSocket events and messages
    ws.onopen = () => {
        console.log('WebSocket connection opened');
    };

    ws.onmessage = (event) => {
        console.log('Received message:', event.data);
    };

    ws.onerror = (error) => {
        console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
        console.log('WebSocket connection closed');
    };
