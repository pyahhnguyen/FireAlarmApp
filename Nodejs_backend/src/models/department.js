const mongoose = require("mongoose");
const User = require("./usermodel"); // Correct the import statement

// Define a schema for sensor data
const sensorDataSchema = new mongoose.Schema({
  timestamp: { type: Date, required: true },
  temperature: { type: Number, required: true },
  humidity: { type: Number, required: true },
  fireAlert: { type: Boolean, required: true },
  CO2: { type: Number, required: true },
    smoke: { type: Number, required: true },
});

// Define a schema for sensors
const sensorSchema = new mongoose.Schema({
  sensorID: { type: String, required: true },
  sensorData: [sensorDataSchema],
});

// Define a schema for rooms
const roomSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true },
  roomOwner: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  email: { type: String },
  phone: { type: String },
  location: { type: String },
  sensors: [sensorSchema],
  floorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Floor' }, // Reference to the Floor model 
});

// Define a schema for floors
const floorSchema = new mongoose.Schema({
  departmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
  floorNumber: { type: String, required: true },
  sensorDataBuckets: [
    {
      startTime: { type: Date, required: true },
      endTime: { type: Date, required: true },
      sensorData: [sensorDataSchema],
    },
  ],
});

// Define a schema for departments
const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  floors: [floorSchema],
});

// Create and export the User model
const Room = mongoose.model('Room', roomSchema);

// Create and export the Department model
const Department = mongoose.model('Department', departmentSchema);

module.exports = { Room, Department, User };