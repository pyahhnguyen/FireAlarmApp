// actions.js

import * as t from './actionTypes';
import { LoginUrl } from '../constants/Api';
import { Alert } from 'react-native';

const setLoginState = (loginData) => {
    return {
        type: t.SET_LOGIN_STATE,
        payload: loginData,
    };
};

export const login = (loginInput) => {
    const { username, password } = loginInput;
    return (dispatch) => {
        return fetch(LoginUrl, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginInput),
        })
            .then((response) => response.json())
            .then((json) => {
                if (json.msg === 'success') {
                    dispatch(setLoginState({ ...json, userId: username }));
                } else {
                    Alert.alert('Login Failed', 'Username or Password is incorrect');
                }
            })
            .catch((err) => {
                Alert.alert('Login Failed', 'Some error occurred, please retry');
                console.log(err);
            });
    };
};
