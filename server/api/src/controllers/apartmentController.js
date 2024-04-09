const mongoose = require('mongoose');
const Alert = require('../models/AlertModel'); // Import the Apartment model

async function getDeviceStatus(data) {
  // Check if the message contains a valid ObjectId
  if (data._id && mongoose.Types.ObjectId.isValid(data._id)) {
    console.log('Received _id: ', data._id); // Log the received _id
    try {
      // Retrieve the 'room' field from the document in MongoDB
       const document = await Alert.findOne({ apartment: new mongoose.Types.ObjectId(data._id) }).select("smokeDetector flameDetector gasDetector heatDetector -_id").orFail();
      //  .select('smokeDectector flameDectector gasDectector heatDectector - _id')
      //  .lean()
      //  .exec();

      // Log the retrieved document
      console.log('Retrieved document: ', document);

      return document;
    } catch (err) {
      console.error('Error retrieving document: ', err); // Log any errors
      throw err;
    }
  }
}

module.exports = getDeviceStatus; 