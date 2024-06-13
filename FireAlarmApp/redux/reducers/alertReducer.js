const initialState = {
    alertHistory: [],
};

const alertHistoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ALERT_HISTORY':
            return {
                ...state,
                alertHistory: action.payload,
            };
        default:
            return state;
    }
};

export default alertHistoryReducer;