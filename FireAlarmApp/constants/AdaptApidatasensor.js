

const adaptApiDataToAlertHistoryFormat = (apiData) => {
    return apiData.map((item, index) => ({
        deviceId: index + 1, // Sequential ID starting from 1
        deviceType: item.device_type.charAt(0).toUpperCase() + item.device_type.slice(1) + ' Detector', // Formatting device type
        name: item.deviceName,
        ModelNo: item.model_code,
        Code: item.model_code, // Assuming the model code can be used as 'Code'
        deviceDescription: `${item.device_type.charAt(0).toUpperCase() + item.device_type.slice(1)} Detected`, // Creating a description
        deviceData: item.deviceData,
        location: item.location,
        resolveAt: item.createdAt, // Using 'createdAt' as resolve time
        status: item.status,
        triggerAt: item.createdAt // Using 'createdAt' as trigger time
    }));
};

export default adaptApiDataToAlertHistoryFormat;
