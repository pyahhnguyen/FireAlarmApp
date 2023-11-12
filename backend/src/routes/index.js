 
 // routes/index.js
const express = require("express");
const router = express.Router();


  // Root routes
  router.get("/", (req, res) => {
    return res.status(200).json({
      message: "Welcome to the lesson",
    });
  });



  module.exports = router;
