const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    verified: {
        type: Boolean,
        default: false
    },
    verificationToken: String,

    phone: {
        type: String,
        // required: true,
    },

    address: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Building',
            // Remove the 'required: true' option to make it optional
    },
     

    createdAt: {
        type: Date,
        default: Date.now,
    },

});

const User = mongoose.model('User', userSchema);

module.exports = User;
