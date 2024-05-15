const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const KeyTokenService = require("./keytoken.service");
const keytokenModel = require("../models/keytoken.model");
const { createTokenPair } = require("../auth/authUtils");
const { getInfoData } = require("../utils");
const { BadRequestError, ConflictRequestError, ForbiddenError, AuthFailureError } = require("../core/error.response");

// service ///
const {findByEmail} = require('./user.service')

const RoleUser = {
  USER: "USER",
  WRITER: "WRITER",
  EDITOR: "EDITOR",
  ADMIN: "ADMIN",
};

class AccessService {

 // hanlde refresh token
static handleRefreshToken = async ({refreshToken, user, keyStore}) => {

  const {userId, email} = user;
  if(keyStore.refreshTokensUsed.includes(refreshToken)){
    await KeyTokenService.deleteKeyByUserId(userId)
    throw new ForbiddenError('Something wrong happened, please login again !')
  }
  
  if(keyStore.refreshToken !== refreshToken) throw new AuthFailureError('user not registered !')
  const foundUser = await findByEmail({email})    
  if(!foundUser) throw new AuthFailureError('Error: user not registered !')

  // create new key pair
  const tokens = await createTokenPair({userId, email}, keyStore.publicKey, keyStore.privateKey)
 // update new key pair
  if (keyStore) {
  const filter = { refreshToken: refreshToken };
  const update = {
    $set: {
      refreshToken: tokens.refreshToken,
    },
    $addToSet: {
      refreshTokensUsed: refreshToken,
    },
  };
  await keytokenModel.updateOne(filter, update);
      // Rest of your code
      return {
        user,
        tokens,
      };
    } else {
      // Handle the case where no matching document is found
      return {
        status: "error",
        code: 404,
        message: "No document found for the given refreshToken",
      };
    }
}

  // service logout
  static logout = async( keyStore ) => {
    const  deleteKey = await KeyTokenService.removeKeyById(keyStore._id)
    console.log('delKey :::', deleteKey)
    return deleteKey
  }
  /*
  1- check eamil in dbs
  2- match password
  3- create key pair ( access token, refresh token)
  4- generate tokens
  5- get data return login 
*/

  // service login

  static login = async ({ email, password, refreshToken = null }) => {
    // 1
    const foundUser = await findByEmail({ email });
    if (!foundUser) throw new BadRequestError("Error: user not registered !");
    // 2
    const match = bcrypt.compare(password, foundUser.password);
    if (!match) throw new AuthFailureError("Authentication error");
    // 3
    const privateKey = crypto.randomBytes(64).toString("hex");
    const publicKey = crypto.randomBytes(64).toString("hex");
    // 4
    const {_id: userId } = foundUser;
    const tokens = await createTokenPair(
      { userId, email },
      publicKey,
      privateKey
    )

    await KeyTokenService.createKeyToken({
      refreshToken: tokens.refreshToken,
      publicKey,
      privateKey,
      userId
    })
    return {
      user: getInfoData({
        fileds: ["_id", "name", "email", "phone"],
        object: foundUser,
      }),
      tokens
    };
  };

  // service signup

  static signUp = async ({ name, email, password, phone }) => {
    // step1: check mail existed?
    const holderUser = await userModel.findOne({ email }).lean();
    if (holderUser) {
      throw new BadRequestError("Error: User already registered !");
    }
    const passwordHash = await bcrypt.hash(password, 10);
    // Hash password for security evetns 
    const newUser = await userModel.create({
      name,
      email,
      password: passwordHash,
      phone,
      roles: [RoleUser.USER],
    });

    // step2: create key pair
    if (newUser) {
    // created privateKey , publicKey
      //   const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
      //     modulusLength: 4096,
      //     publicKeyEncoding: {
      //       type: "pkcs1",
      //       format: "pem",
      //     },
      //     privateKeyEncoding: {
      //       type: "pkcs1",
      //       format: "pem",
      //     },
      //   });
      const privateKey = crypto.randomBytes(64).toString("hex");
      const publicKey = crypto.randomBytes(64).toString("hex");

      console.log({ privateKey, publicKey }); // save collection KeyStore
      const keyStore = await KeyTokenService.createKeyToken({
        userId: newUser._id,
        publicKey,
        privateKey,
      });

      if (!keyStore) {
        return {
          code: "xxxx",
          message: "keyStore error",
        };
      }

      //create token pair
      const tokens = await createTokenPair(
        { userId: newUser._id, email },
        publicKey,
        privateKey
      );
      // filter data response uding lodash
      return {
        // code: 201,
        // metadata: {
        user: getInfoData({
          fileds: ["_id", "name", "email", "phone"],
          object: newUser,
        }),
        tokens,
        // }
      };
    }

    return {
      code: 200,
      metadata: null,
    };
  };




}

module.exports = AccessService;
