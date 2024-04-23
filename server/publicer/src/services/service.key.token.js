
const keytokenModel = require('../models/keytoken.model')
const { Types: { ObjectId } } = require('mongoose')
class KeyTokenService {

    static findByUserId = async (userId) => {
        return await keytokenModel.findOne({ user: new ObjectId(userId) });
    }


}

module.exports = KeyTokenService