'use strict'

const { Schema, model } = require('mongoose');

const DOCUMENT_NAME = 'HistoryMessage'
const COLLECTION_NAME = 'HistoryMessages'


// Declare the Schema of the Mongo model
var historySchema = new Schema({
    userId:
    {
        type: String,
        required: true,
    },

    topic:
    {
        type: String,
        required: true,
    },
    message:
    {
        type: String,
        required: true,
    
    },
},
    {
        collection: COLLECTION_NAME,
        timestamps: true,
    });

//Export the model
module.exports = model(DOCUMENT_NAME, historySchema);