const express = require("express");
const asyncHandler = require("../../helper/asyncHanlde");
const userController = require("../../controller/userController");
const router = express.Router();



router.post("/user/userdata", asyncHandler(userController.userData))




module.exports = router;
