const Sensor = require('../../../api/src/models/sensor.model');

class HistoryManager {
    async addMessage(message, topic) {
        try {
            // Parse the JSON message
            const parsedMessage = message;

            const { value, address, location, device_name, device_type, model_code, _id_ } = parsedMessage;
            const newSensor = new Sensor({
                device_type,
                deviveId: _id_, // Assuming _id_ is mapped to deviceId
                deviceName: device_name,
                model_code,
                deviceData: value,
                location,
                topic,
                status: 'normal',
                warning: 0,
            });

            const savedSensor = await newSensor.save();
            console.log('Sensor saved successfully:', savedSensor);

            return savedSensor;
        } catch (err) {
            console.error('Error adding message to history:', err.message);
            throw err;
        }
    }
    // Other methods remain unchanged...
}

module.exports = new HistoryManager();
