'use strict'
const userModel = require('../models/user.model')
const { getInfoData } = require('../utils/index')


const findByEmail = async ({ email, select = {
    email: 1, password:2, name: 1, roles: 1, status: 1, phone: 1 
} }) => {
    return await userModel.findOne({email}).select(select).lean()
}

class UserService {
    static userData = async (req, res) => {
        try {
            const { id } = req.body;

            // Assuming you're using Mongoose to interact with MongoDB
            const user = await userModel.findById(id);

            if (user) {
                // Modify the response format as needed based on your user model
                return res.send({ status: "Ok", data: user });
            } else {
                return res.status(404).send({ error: "User not found" });
            }
        } catch (error) {
            console.error("Error fetching user data:", error);

            // Handle specific Mongoose error, e.g., if the provided ID is not a valid ObjectId
            if (error.name === "CastError") {
                return res.status(400).send({ error: "Invalid user ID" });
            }
            return res.status(500).send({ error: "Internal server error" });
        }
    };
}

module.exports = {
    findByEmail,
    UserService
}

// router.post("/userdata", async (req, res) => {
//     const { token } = req.body;
//     try {
//       const user = jwt.verify(token, secretKey);
//       const useremail = user.email;
  
//       User.findOne({ email: useremail }).then((data) => {
//         return res.send({ status: "Ok", data: data });
//       });
//     } catch (error) {
//       return res.send({ error: error });
//     }
//   });
  
//   router.get("/userinfo", async (req, res) => {
//     const { userID } = req.query;
  
//     console.log('Received userID:', userID);
  
//     try {
//       const userInfo = await User.findById(userID);
  
//       console.log('User Info:', userInfo);
  
//       if (userInfo) {
//         return res.send({ status: "Ok", data: userInfo });
//       } else {
//         return res.send({ status: "User not found" });
//       }
//     } catch (error) {
//       console.error('Error fetching user info:', error);
//       return res.status(500).send({ error: 'Internal Server Error' });
//     }
//   });
//   // error 500 
//   router.put("/editprofile", async (req, res) => {
//     const { userId, name, phone, buildingName, buildingAddress, apartmentNo, apartmentFloor } = req.body;
  
//     try {
//       // Update the user profile
//       const updatedUser = await User.findOneAndUpdate(
//         { _id: userId },
//         { name: name, phone: phone },
//         { new: true, upsert: true }
//       );
  
//      // Update or create the Building
//      const updatedBuilding = await Building.findOneAndUpdate(
//       { buildingName: buildingName },
//       { buildingName: buildingName,address: buildingAddress },
//       { new: true, upsert: true }
//     );
  
  
//     const updatedApartment = await Apartment.findOneAndUpdate(
//       { owner: userId, building: updatedBuilding._id },
//       { apartmentNo: apartmentNo, floor: apartmentFloor },
//       { new: true, upsert: true }
//     );
    
//       // Update the user with the new Building reference
//       updatedUser.address = updatedBuilding._id;
//       await updatedUser.save();
//       // await updatedApartment.save();
//       // await updatedBuilding.save();
  
//       res.json({
//         success: true,
//         user: updatedUser,
//         building: updatedBuilding,
//         apartment: updatedApartment,
//       });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ success: false, error: 'Internal Server Error' });
//     }
//   });
  
