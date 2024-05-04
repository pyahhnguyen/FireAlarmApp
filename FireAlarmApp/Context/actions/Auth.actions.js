import jwt_decode from "jwt-decode"
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message"
import baseURL from "../../components/common/expressURL";
import { useNavigation } from "@react-navigation/native";




export const SET_CURRENT_USER = "SET_CURRENT_USER";

export const loginUser = (user, dispatch) => {
    fetch(`http://10.0.243.84:3056/v1/api/user/login`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-api-key":
                "2a06fcd170406face25783da33f0d105b8f312a7ddfdfb14d98121daa275e22328c9d9ebd3b146d650a168499f7265d862618e3c3809906d0ecfc71d598e947b",
        },
    })
        .then((res) => res.json())
        .then((data) => {
            if (data) {
                console.log(data);
                const token = data.metadata.tokens;
                const accessToken = data.metadata.tokens.accessToken;
                const refreshToken = data.metadata.tokens.refreshToken;
                const x_client_id = data.metadata.user._id;
                const userdata = data.metadata.user;
                AsyncStorage.setItem("jwt", JSON.stringify(token));
                AsyncStorage.setItem("authAccessToken", accessToken);
                AsyncStorage.setItem("x_client_id", x_client_id);
                AsyncStorage.setItem("userdata", JSON.stringify(userdata));
                AsyncStorage.setItem("refreshToken", refreshToken);
                const decoded = jwt_decode(token)
                dispatch(setCurrentUser(decoded, user))
            } else {
                logoutUser(dispatch)
            }
        })
        .catch((err) => {
            Toast.show({
                topOffset: 60,
                type: "error",
                text1: "Please provide correct credentials",
                text2: ""
            });
            logoutUser(dispatch)
        });
};

export const getUserProfile = (id) => {
    fetch(`${baseURL}users/${id}`, {
        method: "GET",
        body: JSON.stringify(user),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
    })
        .then((res) => res.json())
        .then((data) => console.log(data));
}

export const logoutUser = (dispatch) => {
    AsyncStorage.removeItem("jwt");
    dispatch(setCurrentUser({}))
}

export const setCurrentUser = (decoded, user) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded,
        userProfile: user
    }
}