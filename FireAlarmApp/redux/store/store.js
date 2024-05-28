import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducers/reducer';
import sensorReducer from '../reducers/sensorReducer';

const store = configureStore({

    reducer: {
        user: userReducer,  // Assigns userReducer to a slice named 'user'
        sensors: sensorReducer  // Assigns sensorReducer to a slice named 'sensors'
    }
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    //     .concat(/* other middleware here */)
});

export default store;
