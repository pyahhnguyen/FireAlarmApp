import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { useNavigation } from '@react-navigation/native';

// Action creator for successful login
export const login = (user) => {
    return async dispatch => {
        const apiUrl = Constants.expoConfig.extra.IP_HOST;
        const header = {
            "Content-Type": "application/json",
            "x-api-key": "2a06fcd170406face25783da33f0d105b8f312a7ddfdfb14d98121daa275e22328c9d9ebd3b146d650a168499f7265d862618e3c3809906d0ecfc71d598e947b",
        }
        // Make the request with error handling
        axios
            .post(`http://${apiUrl}:3056/v1/api/user/login`, user, { headers: header })
            .then((response) => {
                const responseData = response.data;
                console.log("Login Response:", responseData);
                setLoginLocal(responseData);
                // Handle successful login
                dispatch(setLoginState(responseData))
            })
            .catch((error) => {
                console.error("Login Error:", error)
                // Handle login error
                setError("Invalid email or password. Please try again.");
            });
    }
}
const setLoginLocal = async (loginData) => {
    try {
        await AsyncStorage.setItem('loginData', JSON.stringify(loginData));
    } catch (err) {
        console.log(err);
    }
};
export const setLoginState = (loginData) => {
    return {
        type: 'LOGIN',
        payload: loginData,
    };
};

// Action creator for logout
export const Logout = (userId, accessToken) => {
    return async dispatch => {
        try {
            const apiUrl = Constants.expoConfig.extra.IP_HOST;
            const headers = {
                'Content-Type': 'application/json',
                'x-api-key': '2a06fcd170406face25783da33f0d105b8f312a7ddfdfb14d98121daa275e22328c9d9ebd3b146d650a168499f7265d862618e3c3809906d0ecfc71d598e947b',
                'authorization': accessToken,
                // 'authorization':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWRkZThjZGUwMGU3YzFhYTA5MzMwZWYiLCJlbWFpbCI6ImtoYWlodW5nMDNAZ21haWwuY29tIiwiaWF0IjoxNzE2NTczNzQ4LCJleHAiOjE3MTcxNzg1NDh9.F7MnCxWwY5KTzVgiyB9CAyEd2iRrBjDa4HJh5ob3PxI',
                'x-client-id': userId,
            };
            // Make the logout request with error handling
            const response = await axios.post(`http://${apiUrl}:3056/v1/api/user/logout`, {}, { headers });
            console.log('Logout Response:', response.data);
            // Dispatch the logout action
        } catch (error) {
            console.error('Logout Error:', error);
            // Handle specific error scenarios
            if (error.response) {
                if (error.response.status === 404) {
                    console.error('404: Not Found. Check API endpoint or server availability.');
                } else {
                    console.error('API Error:', error.response.data, error.response.status);
                }
            } else {
                console.error('Network Error:', error);
            }
        }
        dispatch({ type: 'LOGOUT' });
        // Clear AsyncStorage
        await AsyncStorage.clear();
    };
};