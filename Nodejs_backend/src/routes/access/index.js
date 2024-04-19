const express = require('express');
const accessController = require('../../controller/accessController');
const router = express.Router();
const { authentication } = require('../../auth/authUtils');
const asyncHandler = require('../../helper/asyncHanlde');


// Signup shop
router.post('/user/signup', asyncHandler(accessController.signUp))
router.post('/user/login', asyncHandler(accessController.login))
// authentication //
router.use(authentication)
// logout
router.post('/user/logout', asyncHandler(accessController.logout))
router.post('/user/handleRefreshToken', asyncHandler(accessController.handleRefreshToken))


    
module.exports = router;