const User = require("../models/user.model");
const Apartment = require("../models/apartment.model");
const Building = require("../models/building.model");
const mongoose = require("mongoose");


const findByEmail = async ({ email, select = {
    email: 1, password:2, name: 1, roles: 1, status: 1, phone: 1 
} }) => {
    return await User.findOne({email}).select(select).lean()
}
 
class UserService {
    // get user data
    static async getData(userId) {
        try {
            const user = await User.findById(userId)
            .populate({
                path: "apartments",
                populate: {
                    path: "building",
                    model: "Building"
                }
            }); 
            if (!user) {
                throw new Error("User not found");
            }
            // Map through apartments to construct a detailed user profile with apartment and building details
            const apartmentsDetails = user.apartments.map((apartment) => ({
                apartmentNo: apartment.apartmentNo,
                buildingName: apartment.building.buildingName,
                buildingAddress: apartment.building.address,
                floor: apartment.floor,
            }));
            const userData = {
                name:  user.name,
                email: user.email,
                phone: user.phone,
                apartments: apartmentsDetails,
            };
            return userData; // Return the detailed user data
        } catch (error) {
            console.error("Failed to retrieve user:", error);
            throw error; // Re-throw the error for the caller to handle
        }
    }
    // update user data
    static async updateData(userId, { name, phone, buildingName, buildingAddress, apartmentNo, apartmentFloor }) {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const user = await User.findById(userId).session(session);
            if (!user) {
                throw new Error('User not found');
            }
            // Update user fields
            if (name) user.name = name;
            if (phone) user.phone = phone;
            await user.save({ session });
    
            // Handle Building and Apartment
            if (buildingName && buildingAddress && apartmentNo && apartmentFloor) {
                let building = await Building.findOne({ buildingName, address: buildingAddress }).session(session);
                if (!building) {
                    building = new Building({ buildingName, address: buildingAddress });
                    await building.save({ session });
                }
    
                let apartment = await Apartment.findOne({ apartmentNo, owner: userId }).session(session);
                let isNewApartment = false;
                if (apartment) {
                    apartment.floor = apartmentFloor;
                    apartment.building = building._id;
                } else {
                    apartment = new Apartment({
                        apartmentNo,
                        owner: userId,
                        building: building._id,
                        floor: apartmentFloor
                    });
                    isNewApartment = true; // Flag to add to user's apartments array
                }
                await apartment.save({ session });
    
                // Ensure the user's apartments array includes this apartment
                if (isNewApartment && !user.apartments.includes(apartment._id)) {
                    user.apartments.push(apartment._id);
                    await user.save({ session });
                }
            }
    
            await session.commitTransaction();
            session.endSession();
            return { message: 'User and related data updated successfully!' };
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            console.error('Error updating user data:', error);
            throw error;
        }
    }
    
}

module.exports = {
    findByEmail,
    UserService
}

