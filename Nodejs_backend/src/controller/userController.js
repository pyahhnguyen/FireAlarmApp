'use strict'
const {UserService} = require("../services/user.service")
const { SuccessResponse } = require('../core/success.response')

class UserController {
  async userData(req, res, next) {
    try {
      new SuccessResponse({
        message: 'User data retrieved successfully',
        metadata: await UserService.getData(req.user.userId),
      }).send(res);
    } catch (error) {
      console.error('Error retrieving user data:', error.message, { error });
      res.status(500).json({ error: 'Server error', details: error.message });
    }
  }
  // Update user data
  async updateUserData(req, res, next) {
    try {
      new SuccessResponse({
        message: 'User data updated successfully',
        metadata: await UserService.updateData(req.user.userId, req.body),
      }).send(res);
    } catch (error) {
      console.error('Error updating user data:', error.message, { error });
      res.status(500).json({ error: 'Server error', details: error.message });
    }
  }
}
module.exports = new UserController();

