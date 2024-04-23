// historyManager.js

const historyMessageModel = require('../models/historyMessage.model');

class HistoryManager {
    async addMessage(userId, topic, message) {
        try {
            let historyEntry = await historyMessageModel.findOne({ userId, topic });
                // Create a new document if none exists for the user and topic
            historyEntry = await historyMessageModel.create({ userId, topic, message }); 

            return historyEntry; // Return the updated or newly created document
        } catch (err) {
            console.error('Error adding message to history:', err.message);
            throw err;
        }
    }

    async getHistory(userId, topic) {
        try {
            const result = await historyMessageModel.findOne({ userId, topic });
            return result ? result.messages : [];
        } catch (err) {
            console.error('Error getting history:', err.message);
            return [];
        }
    }

    async clearHistory(userId, topic) {
        try {
            await historyMessageModel.deleteOne({ userId, topic });
        } catch (err) {
            console.error('Error clearing history:', err.message);
        }
    }

    async clearUserHistory(userId) {
        try {
            await historyMessageModel.deleteMany({ userId });
        } catch (err) {
            console.error('Error clearing user history:', err.message);
        }
    }

    async clearAllHistory() {
        try {
            await historyMessageModel.deleteMany({});
        } catch (err) {
            console.error('Error clearing all history:', err.message);
        }
    }
}

module.exports = new HistoryManager();
