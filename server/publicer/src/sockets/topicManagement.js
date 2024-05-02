'use strict';

// Async function to get AWS IoT topics for a user
const getUserTopics = async function(userId) {
    try {
        // return [`topic/${userId}/living`, `topic/${userId}/kitchen`, `topic/${userId}/bedroom` ];
        return [`+/${userId}/#` ];
    } catch (error) {
        console.error('Failed to fetch topics:', error);
        throw error; // Rethrow or handle error appropriately
    }
}

module.exports = getUserTopics;