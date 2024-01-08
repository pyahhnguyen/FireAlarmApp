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
    info: [
        {
          mobileNo: String,
          address: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Building',
            required: true,
          },
        },
      ],
    createdAt: {
        type: Date,
        default: Date.now,
    },

});

const User = mongoose.model('User', userSchema);

module.exports = User;
