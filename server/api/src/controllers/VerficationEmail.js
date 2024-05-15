const nodemailer = require("nodemailer");

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


module.exports = sendVerificationEmail;

