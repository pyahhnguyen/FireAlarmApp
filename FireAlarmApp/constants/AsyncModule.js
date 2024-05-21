import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Saves data to AsyncStorage under the provided key.
 * @param {string} key - The key under which to store the data.
 * @param {object} data - The data to store.
 */
async function saveData(key, data) {
    try {
        const jsonData = JSON.stringify(data);
        await AsyncStorage.setItem(key, jsonData);
    } catch (error) {
        console.error("Failed to save data to AsyncStorage", error);
    }
}

/**
 * Loads data from AsyncStorage stored under the provided key.
 * @param {string} key - The key from which to retrieve the data.
 * @returns {object|null} - The retrieved data or null if an error occurs or the key does not exist.
 */
async function loadData(key) {
    try {
        const jsonData = await AsyncStorage.getItem(key);
        return jsonData != null ? JSON.parse(jsonData) : null;
    } catch (error) {
        console.error("Failed to load data from AsyncStorage", error);
        return null;
    }
}

/**
 * An example function demonstrating how to handle a server response by saving
 * it to storage and then retrieving it for use.
 * @param {object} data - The data received from a server response.
 */
async function handleServerResponse(data) {
    await saveData('serverData', data);
    const savedData = await loadData('serverData');
    console.log("Retrieved data:", savedData); // Use the retrieved data
}


export { saveData, loadData, handleServerResponse };
