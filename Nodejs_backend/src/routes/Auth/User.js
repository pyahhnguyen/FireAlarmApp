const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const crypto = require('crypto');
const router = express.Router();

const User = require('../models/user');



// Function to send verification email

const sendVerificationEmail = (email, verificationToken) => {
    // create a node mailer transporter 
    const transporter = nodemailer.createTransport({
        //configuring the service

        service: 'gmail',
        auth: {
            user:"phugiazx44@gmail.com",
            pass:""
        }
    })
}

// xem laij phan nay link:https://www.youtube.com/watch?v=dfoZj7DPSAs phuts 1:10:01




// Register route
  router.post('/register',async(req, res) => {

    try{
      const {name, email, password} = req.body;

      //check if user exist
      const existingUser = await User.findOne({email});
      if(existingUser){
        return res.status(400).json({message: 'Email already exist'});
      }

      //Create a new user
      const Newuser = new User({name, email, password});

      //Generate and store the verification token
      Newuser.verificationToken = crypto.randomBytes(20).toString('hex');
      
      //Save the user
      await Newuser.save();
  
      //Send verification to  the email user
      sendVerificationEmail(Newuser.verificationToken, Newuser.email);



    } catch(error){
      console.log('Error in register: ' , error);
       res.status(500).json({message: 'Registration failed'});

    }

    
    
  })

  
module.exports = router;
