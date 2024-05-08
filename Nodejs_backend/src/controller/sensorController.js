'use strict'
const { Ok, Created, SuccessResponse } = require('../core/success.response')
const SensorService = require('../services/sensor.service')

class sensorController {
    alertProcess = async (req, res, next) => {
        new SuccessResponse({
            metadata: await SensorService.alertProcess(req.body)
        }).send(res)
    }

    history = async (req, res, next) => {
        new SuccessResponse({
            metadata: await SensorService.history(req.body)
        }).send(res)
    }

}

module.exports = new sensorController();

