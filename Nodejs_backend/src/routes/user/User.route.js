const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto"); 
const router = express.Router();
const nodemailer = require("nodemailer");
const User = require("../../models/user.model");
const Building = require("../../models/building.model");
const Apartment = require("../../models/apartment.model");
const Room = require("../../models/room.model");
const jwt = require("jsonwebtoken");  
const bcrypt = require("bcryptjs");



router.post("/userdata", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, secretKey);
    const useremail = user.email;

    User.findOne({ email: useremail }).then((data) => {
      return res.send({ status: "Ok", data: data });
    });
  } catch (error) {
    return res.send({ error: error });
  }
});

router.get("/userinfo", async (req, res) => {
  const { userID } = req.query;

  console.log('Received userID:', userID);

  try {
    const userInfo = await User.findById(userID);

    console.log('User Info:', userInfo);

    if (userInfo) {
      return res.send({ status: "Ok", data: userInfo });
    } else {
      return res.send({ status: "User not found" });
    }
  } catch (error) {
    console.error('Error fetching user info:', error);
    return res.status(500).send({ error: 'Internal Server Error' });
  }
});
// error 500 
router.put("/editprofile", async (req, res) => {
  const { userId, name, phone, buildingName, buildingAddress, apartmentNo, apartmentFloor } = req.body;

  try {
    // Update the user profile
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { name: name, phone: phone },
      { new: true, upsert: true }
    );

   // Update or create the Building
   const updatedBuilding = await Building.findOneAndUpdate(
    { buildingName: buildingName },
    { buildingName: buildingName,address: buildingAddress },
    { new: true, upsert: true }
  );


  const updatedApartment = await Apartment.findOneAndUpdate(
    { owner: userId, building: updatedBuilding._id },
    { apartmentNo: apartmentNo, floor: apartmentFloor },
    { new: true, upsert: true }
  );
  
    // Update the user with the new Building reference
    updatedUser.address = updatedBuilding._id;
    await updatedUser.save();
    // await updatedApartment.save();
    // await updatedBuilding.save();

    res.json({
      success: true,
      user: updatedUser,
      building: updatedBuilding,
      apartment: updatedApartment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});



module.exports = router;
