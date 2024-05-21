import io from 'socket.io-client';
import Constants from "expo-constants";
import AsyncStorage from '@react-native-async-storage/async-storage';

const IP_HOST = Constants.expoConfig.extra.IP_HOST;
const SOCKET_URL = `http://${IP_HOST}:5000`;
console.log(SOCKET_URL);

export const initializeSocket = async () => {
    const logindata = await AsyncStorage.getItem("loginData");
    // console.log(logindata);
    if (!logindata) {
        console.error('Login data not found in AsyncStorage.');
        return null;
    }
    const loginData = JSON.parse(logindata);
    if (!loginData.metadata || !loginData.metadata.tokens || !loginData.metadata.user) {
        console.error('Invalid login data structure.');
        return null;
    }
    const refreshToken = loginData.metadata.tokens.refreshToken;
    const userId = loginData.metadata.user._id;

    if (!refreshToken) {
        console.error('Refresh token not found in login data.');
        return null;
    }

    const socket = io(SOCKET_URL, {
        query: { token: refreshToken, userId: userId },
        transports: ['websocket'],
        forceNew: true,
    });

    return socket;
};
