const momgoose = require('mongoose');

const userSchema = new momgoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email:{
        type: String,
        required: true,
        min: 6,
        max: 255,
        unique: true
    },
    password:{
        type:String,
        required: true,
        min: 6,
        max: 1024,
        unique: true

    },
    verified:{
        type: Boolean,
        default: false
    },
    verificationToken:String,

    address:[
        {
            name: String,
            mobileNo: String,
            RoomNo: String,
            street: String,
            landmark: String,
            city: String,
            country: String,
        }
    ],


});

const User = momgoose.model('User', userSchema);

module.exports = User;