const JWT = require('jsonwebtoken')
const asyncHandler = require('../helper/asyncHanlde')
const { findByUserId } = require('../services/keytoken.service')
const {AuthFailureError, NotFoundError } = require('../core/error.response')

const  HEADER = {
    API_KEY :'x-api-key',
    CLIENT_ID : 'x-client-id',
    AUTHORIZATION : 'authorization',
    REFRESHTOKEN : 'x-refresh-token'
}

const createTokenPair = async (payload, publicKey, privateKey ) => {
    try{
        //accessToken
        const accessToken = await JWT.sign(payload, publicKey, {
            expiresIn: '2 days'

        })

        const refreshToken = await JWT.sign(payload, privateKey, {     
            expiresIn: '7 days'

        })

        JWT.verify( accessToken, publicKey, (err, decode) => {
            if(err){
                console.error('error verify ::', err)
            }else{
                console.log('decode verify :::', decode)    
            }
        })

        return {accessToken, refreshToken}

    }catch(error){
    }
}


//chech authentication for logout 
const authentication  = asyncHandler(async (req, res, next) => {
/*
    1- check userId missing?    
    2- get accessToken 
    3- verify accessToken
    4- check user in dbs
    5- check keystore with userId 
    6- return next
*/
    const userId = req.headers[HEADER.CLIENT_ID]
    if(!userId) throw new AuthFailureError('Invalid Request')

    //2 
    const keyStore = await findByUserId(userId)
    if(!keyStore) throw new NotFoundError('Not found Keystore')
    
   //3
    if(req.headers[HEADER.REFRESHTOKEN]) {
        try {
            const refreshToken = req.headers[HEADER.REFRESHTOKEN]
            const decodeUser = JWT.verify(refreshToken, keyStore.privateKey)
            if( userId !== decodeUser.userId) throw new AuthFailureError('Invalid Request')
            req.keyStore = keyStore
            req.user = decodeUser
            req.refreshToken = refreshToken
            return next()
        } catch (error) {
            throw error
        }          
    }

    //4 
    const accessToken = req.headers[HEADER.AUTHORIZATION]
    if(!accessToken) throw new AuthFailureError('Invalid Request')
    try {
        const decodeUser = JWT.verify(accessToken, keyStore.publicKey)
        if( userId !== decodeUser.userId) throw new AuthFailureError('Invalid Request')
        req.keyStore = keyStore
        return next()
    } catch (error) {
        throw error
    }          
}

// verify JWT
)
const verifyJWT = async (token, keySecret) => {
    return await JWT.verify(token, keySecret)
}
module.exports = {
    createTokenPair,
    authentication,
    verifyJWT
}