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

// Function to send verification email
const sendVerificationEmail = async (email, verificationToken) => {
  // create a node mailer transporter
  const transporter = nodemailer.createTransport({
    //configuring the email service
    service: "gmail",
    auth: {
      user: "phugiazx44@gmail.com",
      pass: "erzo ptrn tlcc xktl",
    },
  });


  // compose the email
  const mailOptions = {
    from: "SafeGuard.com",
    to: email,
    subject: "Email verification",
    text: `Please click on the link to verify your email: http://10.0.239.105:3056/verify/${verificationToken}`,
  };

  // send the email
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("Error in sending email: ", error);
  }
};

// xem laij phan nay link:https://www.youtube.com/watch?v=dfoZj7DPSAs 

router.post("/register", async (req, res) => {
  try {
    const { name, email, password , phone } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({email});
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Create a new user
    const newUser = new User({name, email, password, phone});

    // Generate a verification token
    newUser.verificationToken = crypto.randomBytes(16).toString("hex");
    // Save the user
    await newUser.save();

    // Send a verification email
    await sendVerificationEmail(
      newUser.email,
      newUser.verificationToken
    );

    // Return a success message
    return res.status(200).json({ message: "Registration successful" });
  } catch (err) {
    console.log("Error in register: ", err);
    res.status(500).json({ message: "Registration failed" });
  }
});

//endpoint to verify email
router.get("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token;
    //find the user with the token
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(404).json({ message: "Invalid verification token" });
    }

    //Mark the user as verified
    user.verified = true;
    user.verificationToken = undefined;

    await user.save();
    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.log("Error in verification: ", error);
    res.status(500).json({ message: "Email Verification Failed" });
  }
});


// Function to generate a secret key
const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");
  return secretKey;
};

const secretKey = generateSecretKey();

// Endpoint to login
router.post("/login", async (req, res) => {
  try {
    const { email,password } = req.body;

    // Check if user exists
    const user = await User.findOne({email});
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid  password" });
    }

    // // Check if password is correct
    // const passwordMatch = await bcrypt.compare(password, user.password);
    // if (!passwordMatch) {
    //   return res.status(401).json({ message: "Invalid email or password" });
    // }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id, email: user.email }, secretKey, { expiresIn: '7d' });

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.error("Error in login:", err);
    res.status(500).json({ message: "Login failed" });
  }
});

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
