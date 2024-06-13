const express = require("express");
const asyncHandler = require("../../helper/asyncHanlde");
const UserController = require("../../controller/userController");
const router = express.Router();
const { authentication } = require('../../auth/authUtils');

// authentication //
router.use(authentication)
router.get("/user/data", asyncHandler(UserController.userData));
router.put("/user/updateUserdata", asyncHandler(UserController.updateUserData));

module.exports = router;
