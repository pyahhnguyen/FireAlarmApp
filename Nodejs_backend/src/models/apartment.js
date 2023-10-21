const mongoose = require("mongoose");
const User = require("./usermodel"); // Correct the import statement


const floorSchema = new mongoose.Schema({
  floor_number: { type: Number, required: true },
  apartments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Apartment' }],
  // Add other floor-related fields as needed.
});

const Floor = mongoose.model('Floor', floorSchema);


// Define Apartment schema
const apartmentSchema = new mongoose.Schema({
  apartment_number: { type: String, required: true },
  apartment_owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Use ObjectId type
  rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Room" }],
 
  
});
const Apartment = mongoose.model("Apartment", apartmentSchema);


const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sensors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Sensor" }],
  // Add other room-related fields as needed.
});


const Room = mongoose.model("Room", roomSchema);

const buildingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  floors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Floor" }],
  // Add other building-related fields as needed.
});


const Building = mongoose.model("Building", buildingSchema)

const sensorSchema = new mongoose.Schema({
  sensorType: { type: String, required: true },
  sensor_id: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }, // Add timestamp field with default value
  current_value: { type: Number, required: true },
  // Add other sensor-related fields as needed.
});

const Sensor = mongoose.model("Sensor", sensorSchema);

module.exports = { Sensor, Room, Floor, Apartment, Building };
