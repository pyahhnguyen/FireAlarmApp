'use strict'
const {UserService} = require("../services/user.service")
const { Ok, Created, SuccessResponse} = require('../core/success.response')

class AccessController {
    
    userData = async(req, res, next) => {
      new SuccessResponse({
        metadata: await UserService.userData(req.body)
      }).send(res)
    }

    
}


module.exports = new AccessController();

