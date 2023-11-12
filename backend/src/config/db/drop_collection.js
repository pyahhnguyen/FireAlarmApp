const mongoose = require("mongoose");
const {
  Sensor,
  Room,
  Floor,
  Apartment,
  Building,
} = require("../../models/apartment");
const User = require("../../models/usermodel"); // Correct the import statement
// MongoDB Atlas connection string
const Connect_String =
  "mongodb+srv://phugia:Z50j1tmo@atlascluster.hhqailb.mongodb.net/?retryWrites=true&w=majority";

// Connect to your MongoDB Atlas database
mongoose.connect(Connect_String, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


async function dropCollections() {
    try {
      // Drop collections in the reverse order of their creation to avoid foreign key constraints
      await Sensor.collection.drop();
      await Room.collection.drop();
      await Apartment.collection.drop();
      await Floor.collection.drop();
      await Building.collection.drop();
      
      console.log("Collections dropped successfully.");
    } catch (error) {
      console.error("Error dropping collections:", error);
    } finally {
      // Disconnect from the database
      mongoose.disconnect();
    }
  }
  
  // Call the dropCollections function to remove the collections
  dropCollections();