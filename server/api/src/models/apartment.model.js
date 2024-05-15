const mongoose = require('mongoose');

const apartmentSchema = new mongoose.Schema({
    apartmentNo: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    building: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Building',
        required: true,
    },
    floor: {
        type: Number,
        required: true,
    },
    room : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true,
    },
    numberOfRooms: {
        type: Number,
        required: true,
    },
    statusApartment: {
        type: String,
        default: 'normal',
    },

    // Thêm các trường khác tùy theo yêu cầu của bạn
    createdAt: {
        type: Date,
        default: Date.now,
    },
});




const Apartment = mongoose.model('Apartment', apartmentSchema);

module.exports = Apartment;



// const mongoose = require('mongoose');

// const apartmentSchema = new mongoose.Schema({
//     owner: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//     },
//     location: {
//         latitude: {
//             type: Number,
//             required: true,
//         },
//         longitude: {
//             type: Number,
//             required: true,
//         },
//     },
//     // Add other apartment details as needed
// });

// const Apartment = mongoose.model('Apartment', apartmentSchema);

// module.exports = Apartment;
