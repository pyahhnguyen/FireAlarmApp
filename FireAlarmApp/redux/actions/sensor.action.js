export const updateSensorData = (newData) => ({
    type: 'UPDATE_SENSOR_DATA',
    payload: newData
});

export const clearSensorData = () => ({
    type: 'CLEAR_SENSOR_DATA'
});
