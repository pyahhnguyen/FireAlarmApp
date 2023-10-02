const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const crypto = require('crypto');
const router = express.Router();
const nodemailer = require('nodemailer');


const FireAlert = require('../models/fireAlert');
const AirQuality = require('../models/airQuality');
const User = require('../models/usermodel');


// Root routes
router.get('/', (req, res) => {
    return res.status(200).json({ 
      message: "Welcome to the lesson",
    });
  });
  

  // API để lấy tất cả dữ liệu chỉ số không khí
  router.get('/api/airqualities', async (req, res) => {
    try {
      const airQualities = await AirQuality.find();
      res.json(airQualities);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Đã xảy ra lỗi khi lấy dữ liệu chỉ số không khí từ MongoDB' });
    }
  });
  
  // API để lấy tất cả dữ liệu cảnh báo cháy
  router.get('/api/firealerts', async (req, res) => {
    try {
      const fireAlerts = await FireAlert.find();
      res.json(fireAlerts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Đã xảy ra lỗi khi lấy dữ liệu cảnh báo cháy từ MongoDB' });
    }
  });



  const sendVerificationEmail = async (email, verificationToken) => {
    // create a node mailer transporter 
    const transporter = nodemailer.createTransport({
        //configuring the service

        service: 'gmail',
        auth: {
            user:"phugiazx44@gmail.com",
            pass:"vsto cagm foui srkb"
        }
    })




    // compose the email
    const mailOptions = {
        from: 'amazon.com',
        to: email,
        subject: 'Email verification',
        text: `Please click on the link to verify your email: http://localhost:3055/verify/${verificationToken}`
    };

    // send the email
    try{
        await transporter.sendMail(mailOptions);
    } catch(error){
        console.log('Error in sending email: ', error);
    }
};
// xem laij phan nay link:https://www.youtube.com/watch?v=dfoZj7DPSAs phuts 1:10:01




// Register route
  router.post('/register',async(req, res) => {

    try{
      const {name, email, password} = req.body;

      //check if user exist
      const existingUser = await User.findOne({email});
      if(existingUser){
        return res.status(400).json({message: 'Email already registered'});
      }

      //Create a new user
      const newuser = new User({name, email, password});

      //Generate and store the verification token
      newuser.verificationToken = crypto.randomBytes(20).toString('hex');
      
      //Save the user
      await newuser.save();
  
      //Send verification to  the email user
      sendVerificationEmail(newuser.verificationToken, newuser.email);



    } catch(error){
      console.log('Error in register: ' , error);
       res.status(500).json({message: 'Registration failed'});

    }

    
    
  })



  //endpoint to verify email
  router.get('/verify/:token', async(req, res) => {
    try{
        const token = req.params.token;
        //find the user with the token
        const user = await User.findOne({verificationToken: token});
        if(!user){
            return res.status(404).json({message: 'Invalid verification token'});
        }

        //Mark the user as verified
        user.verified = true;
        user.verificationToken = undefined;

        await user.save();
        res.status(200).json({message: 'Email verified successfully'});
    } catch(error){
        console.log('Error in verification: ', error);
        res.status(500).json({message: 'Verification failed'});
    }
})


module.exports = router;
