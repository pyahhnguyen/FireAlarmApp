const JWT = require('jsonwebtoken')
const asyncHandler = require('../helper/asyncHanlde')
const { findByUserId } = require('../services/keytoken.service')
const {AuthFailureError, NotFoundError } = require('../core/error.response')

// const  HEADER = {
//     API_KEY :'x-api-key',
//     CLIENT_ID : 'x-client-id',
//     AUTHORIZATION : 'authorization',
//     REFRESHTOKEN : 'x-refresh-token'
// }

const  HEADER = {
    CLIENT_ID : 'x-client-id',
    REFRESHTOKEN : 'x-refresh-token'
}

const createTokenPair = async (payload, privateKey) => {
    try {
        // AccessToken should be signed with the private key
        const accessToken = await JWT.sign(payload, privateKey, {
            expiresIn: '2 days'
        });

        // RefreshToken typically uses the same key as AccessToken but with a longer expiration
        const refreshToken = await JWT.sign(payload, privateKey, {
            expiresIn: '7 days'
        });

        return { accessToken, refreshToken };
    } catch (error) {
        console.error("Error creating tokens:", error);
        throw error;
    }
}


const authentication = asyncHandler(async (req, res, next) => {
    //     1- check userId missing?    
    //     2- get accessToken 
    //     3- verify accessToken
    //     4- check user in dbs
    //     5- check keystore with userId 
    //     6- return next
    const userId = req.headers[HEADER.CLIENT_ID];
    if (!userId) {
        throw new AuthFailureError('User ID header missing');
    }

    const keyStore = await findByUserId(userId);
    if (!keyStore) {
        throw new NotFoundError('Key store not found for user');
    }

    const accessToken = req.headers[HEADER.AUTHORIZATION];
    const refreshToken = req.headers[HEADER.REFRESHTOKEN];
    
    try {
        // Prefer access token for authentication
        const token = accessToken || refreshToken;
        if (!token) {
            throw new AuthFailureError('No token provided');
        }

        const decodedUser = JWT.verify(token, keyStore.publicKey);
        if (userId !== decodedUser.userId) {
            throw new AuthFailureError('Token does not match user ID');
        }

        req.user = decodedUser;
        return next();
    } catch (error) {
        // Differentiate error messages based on token issues
        if (error instanceof JsonWebTokenError) {
            throw new AuthFailureError('Invalid or expired token');
        } else {
            throw new AuthFailureError('Authentication failed');
        }
    }
});

const verifyJWT = async (token, keySecret) => {
    return await JWT.verify(token, keySecret)
}
module.exports = {
    createTokenPair,
    authentication,
    verifyJWT
}