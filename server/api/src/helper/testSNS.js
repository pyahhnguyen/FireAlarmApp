const axios = require('axios');

// Define the base URL of your server
const baseURL = 'http://localhost:3000/v1/api/';

// Function to make authenticated requests
const makeAuthenticatedRequest = async (userId, token) => {
    try {
        // Make a GET request to the createDeviceEndpoint endpoint
        const response = await axios.get('createDeviceEndpoint', {
            baseURL,
            headers: {
                'x-client-id': userId, // Include the userId in the headers
                'authorization': token // Include the access token in the headers
            }
        });
        
        console.log('Response:', response.data);
    } catch (error) {
        console.error('Error:', error.response.data);
    }
};

// Example usage
const userId = '65dde2c8e00e7c1aa09330e7'; // Replace with your actual user ID
const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWVmNDE3YTBkZTRlMmU2Nzg3NWE0NzIiLCJlbWFpbCI6InBodWdpYXp4MTRAZ21haWwuY29tIiwiaWF0IjoxNzEzNTEzMzQ0LCJleHAiOjE3MTQxMTgxNDR9.dTQ2OWnKYyhmxSHjQ3oi2yWE4OCU_AYcIsYc-BuG9Ec'; // Replace with your actual access token

makeAuthenticatedRequest(userId, accessToken);