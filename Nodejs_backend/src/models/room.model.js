const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    apartment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Apartment',
        required: true,
    },
    // Add other room-specific fields as needed
    createdAt: {
        type: Date,
        default: Date.now,
    },
     
    statusRoom: {
        type: String,
        default: 'normal',
    },


    //status room 
});

export default mongoose.model('Room', roomSchema);
