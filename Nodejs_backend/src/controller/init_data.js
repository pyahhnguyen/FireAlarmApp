const mongoose = require("mongoose");
const {
  Sensor,
  Room,
  Floor,
  Apartment,
  Building,
} = require("../models/apartment");
const User = require("../models/usermodel"); // Correct the import statement
// MongoDB Atlas connection string
const Connect_String =
  "mongodb+srv://phugia:Z50j1tmo@atlascluster.hhqailb.mongodb.net/?retryWrites=true&w=majority";

// Connect to your MongoDB Atlas database
mongoose.connect(Connect_String, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});



// Initialize data for the building
const initializeBuildingData = async () => {
  try {
    // Define the number of floors and apartments per floor
    const numberOfFloors = 5;
    const apartmentsPerFloor = 10;

    // Create a new building
    const buildingData = {
      name: "Your Building Name",
      address: "Building Address",
    };
    const building = new Building(buildingData);

    for (let floorNumber = 1; floorNumber <= numberOfFloors; floorNumber++) {
      const floorData = {
        floor_number: floorNumber,
        apartments: [], // Initialize an empty array for apartments
      };
      const floor = new Floor(floorData);
    
      for (let apartmentNumber = 1; apartmentNumber <= apartmentsPerFloor; apartmentNumber++) {
        const apartmentData = {
          apartment_number: `A${floorNumber}${apartmentNumber}`,
          // Add other apartment data as needed
        };
        const apartment = new Apartment(apartmentData);
    
        // Link the apartment to the floor
        floor.apartments.push(apartment);
    
        await apartment.save();
      }
    
      // Link the floor to the building
      building.floors.push(floor);
      await floor.save();
    }
    await building.save();

      // Initialize data for specific apartments
      const apartmentsData = [
        {
          apartment_number: "101",
          apartment_owner: "userID1", // Replace with the actual user ID of the owner
          // Add other apartment data as needed
        },
        {
          apartment_number: "102",
          apartment_owner: "userID2", // Replace with the actual user ID of the owner
          // Add data for the next apartment
        },
      ];
  
      for (const data of apartmentsData) {
        const apartment = new Apartment(data);
  
        // Link the apartment to the appropriate floor (e.g., floor_number: 1 for the first floor)
        const floor = building.floors.find((f) => f.floor_number === 1);
        if (floor) {
          apartment.floor = floor._id;
        }
  
        await apartment.save();
      }


    console.log("Building data initialized successfully.");
  } catch (error) {
    console.error("Error initializing building data:", error);
  }
};

initializeBuildingData();
