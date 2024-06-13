const initialState = {
    sensorData: {},
    alertCount: 0,
    normalCount: 0
};

const sensorReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_SENSOR_DATA':
            const newSensorData = action.payload;
            let newAlertCount = state.alertCount;
            let newNormalCount = state.normalCount;
            // Calculate the new counts
            Object.keys(newSensorData).forEach(key => {
                const newData = newSensorData[key];
                const oldData = state.sensorData[key];

                // Check if this is a new sensor or if the status has changed
                if (!oldData || newData.status !== oldData.status) {
                    if (newData.status === "Alarm") {
                        newAlertCount++;
                        if (oldData && oldData.status === "Normal") {
                            newNormalCount--;
                        }
                    } else if (newData.status === "Normal") {
                        newNormalCount++;
                        if (oldData && oldData.status === "Alarm") {
                            newAlertCount--;
                        }
                    }
                }
            });
            return {
                ...state,
                sensorData: {...state.sensorData, ...newSensorData},
                alertCount: newAlertCount,
                normalCount: newNormalCount
            };
        case 'CLEAR_SENSOR_DATA':
            return {
                ...state,
                sensorData: {},
                alertCount: 0,
                normalCount: 0
            };
        default:
            return state;
    }
};

export default sensorReducer;
