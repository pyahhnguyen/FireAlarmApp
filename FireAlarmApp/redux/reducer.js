export const initialState = {
    isLoggedIn: false,
    userId: '',
    accessToken: '',
    refreshToken: '',
    userdata: '',
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state, //copy all previous states
                ...action.payload, // this is what we expect to get back from API call and login page input
                isLoggedIn: true, // we set this as true on login
            };
        case 'LOGOUT':
            return {
                ...state,
                initialState,
                isLoggedIn: false,
            };
        default:
            return state;
    }
}

export default userReducer;

