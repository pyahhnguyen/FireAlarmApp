
const mongoose = require('mongoose');
const buildingSchema = new mongoose.Schema({
    buildingName: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    // Add other building-specific fields as needed
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('Building', buildingSchema);  