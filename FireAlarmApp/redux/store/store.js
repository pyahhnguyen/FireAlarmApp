// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducers/reducer';
import sensorReducer from '../reducers/sensorReducer';
import alertHistoryReducer from '../reducers/alertReducer';
import alertsNotifyReducer from '../reducers/alertnotificationSlice';
import thunk from "redux-thunk";
import {applyMiddleware } from 'redux';


const store = configureStore({
    reducer: {
        user: userReducer,
        sensors: sensorReducer,
        alertHistory: alertHistoryReducer,
        alertnotification: alertsNotifyReducer, // Use the same name as in the state slice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: { warnAfter: 2000 },
        serializableCheck: { warnAfter: 2000 },
    })
});

export default store;
