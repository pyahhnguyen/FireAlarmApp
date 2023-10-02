const momgoose = require('mongoose');

const userSchema = new momgoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true,
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