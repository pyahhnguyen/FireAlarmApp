'use strict'
const shopModel = require('../models/user.model')

const findByEmail = async ({ email, select = {
    email: 1, password:2, name: 1, roles: 1, status: 1
} }) => {
    return await shopModel.findOne({email}).select(select).lean()
}

module.exports = {
    findByEmail
}

