import io from 'socket.io-client';


const SOCKET_URL = 'http://10.0.243.231:8000';
const USER_ID = '65dde8cde00e7c1aa09330ef';
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWRkZThjZGUwMGU3YzFhYTA5MzMwZWYiLCJlbWFpbCI6ImtoYWlodW5nMDNAZ21haWwuY29tIiwiaWF0IjoxNzE1NzA5Mzc2LCJleHAiOjE3MTYzMTQxNzZ9.0KhItJ1vJ_atzNTsnXZxni4sjcSxKxA4d1tcChWCTNw';

const initializeSocket = () => {
    const socket = io(SOCKET_URL, {
        query: { token: TOKEN, userId: USER_ID },
        transports: ['websocket'],
        forceNew: true,
    });

    return socket;
};

export default initializeSocket;