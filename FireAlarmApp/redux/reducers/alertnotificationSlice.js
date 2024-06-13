import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
    alerts: [],
};
const alertnotificationSlice = createSlice({
    name: 'alertnotification',
    initialState,
    reducers: {
        loadAlerts: (state, action) => {
            state.alerts = action.payload.slice(0, 10); // Ensure only the latest 10 alerts are loaded
        },
        addAlert: (state, action) => {
            state.alerts.unshift(action.payload);
            if (state.alerts.length > 10) {
                state.alerts.pop(); // Remove the oldest alert if more than 10
            }
        },
        deleteAlert: (state, action) => {
            state.alerts = state.alerts.filter(alert => alert.id !== action.payload);
        },
    },
});

export const { loadAlerts, addAlert, deleteAlert } = alertnotificationSlice.actions;

export const fetchAlerts = () => async dispatch => {
    try {
        const storedAlerts = await AsyncStorage.getItem('alerts');
        if (storedAlerts !== null) {
            dispatch(loadAlerts(JSON.parse(storedAlerts)));
        }
    } catch (error) {
        console.error("Failed to load alerts from storage", error);
    }
};

export const persistAlerts = (alerts) => async dispatch => {
    try {
        await AsyncStorage.setItem('alerts', JSON.stringify(alerts));
        dispatch(loadAlerts(alerts));
    } catch (error) {
        console.error("Failed to save alerts to storage", error);
    }
};

export default alertnotificationSlice.reducer;
