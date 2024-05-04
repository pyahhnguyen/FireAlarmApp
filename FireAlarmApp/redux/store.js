import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import userReducer from './reducer';

const store = configureStore({
    reducer: {
        userReducer,
    },
});

export default store;
