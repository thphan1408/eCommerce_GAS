'use strict'

import shopModel from '../models/shop.model.js'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import KeyTokenService from './keyToken.service.js'
import { createTokenPair, verifyJWT } from '../auth/authUtils.js'
import { getInfoData } from '../utils/index.js'
import { ROLE_SHOP } from '../constants/values.constants.js'
import {
  AuthFailureError,
  BadRequestError,
  ConflictRequestError,
  ForbiddenError,
} from '../core/error.response.js'
import { findByEmail } from './shop.service.js'

class AccessService {
  /**
   * Check token
   */
  static handlerRefreshToken = async (refreshToken) => {
    const foundToken = await KeyTokenService.findByRefeshTokenUsed(refreshToken)

    if (foundToken) {
      // decode xem là user nào
      const { userId, email } = await verifyJWT(
        refreshToken,
        foundToken.privateKey,
      )

      console.log(`1---:`, { userId, email })

      // Xoá token đã sử dụng
      await KeyTokenService.deleteKeyById(userId)

      throw new ForbiddenError('Something went wrong! Please re-login')
    }

    const holderToken = await KeyTokenService.findByRefreshToken(refreshToken)
    if (!holderToken) throw new AuthFailureError('Shop not registered! -1')

    // verify token
    const { userId, email } = await verifyJWT(
      refreshToken,
      holderToken.privateKey,
    )

    console.log(`2---:`, { userId, email })

    // check userId
    const foundShop = await findByEmail({ email })
    if (!foundShop) throw new AuthFailureError('Shop not registered! -2')

    // create new token
    const tokens = await createTokenPair(
      {
        userId,
        email,
      },
      holderToken.publicKey,
      holderToken.privateKey,
    )

    // update token
    await holderToken.updateOne({
      $set: {
        refreshToken: tokens.refreshToken,
      },
      $addToSet: {
        refreshTokensUsed: refreshToken, // đã sử dụng để lấy token mới
      },
    })

    return {
      user: {
        userId,
        email,
      },
      tokens,
    }
  }

  static logOut = async (keyStore) => {
    const delKey = await KeyTokenService.removeKeyById(keyStore._id)
    console.log('delKey:', delKey)
    return delKey
  }

  /*
    1 - Check email in dbs
    2 - Match password
    3 - Create access token - refresh token and save
    4 - generate tokens
    5 - get data return login
  */
  static logIn = async ({ email, password, refreshToken = null }) => {
    // 1. check email exists
    const foundShop = await findByEmail({ email })
    if (!foundShop) throw new BadRequestError('Email not found')

    // 2. check password
    const match = bcrypt.compare(password, foundShop.password)
    if (!match) throw new AuthFailureError('Authentication error')

    // 3. create private key, public key
    const publicKey = crypto.randomBytes(64).toString('hex')
    const privateKey = crypto.randomBytes(64).toString('hex')

    // 4 - generate tokens
    const tokens = await createTokenPair(
      {
        userId: foundShop._id,
        email,
      },
      publicKey,
      privateKey,
    )

    await KeyTokenService.createKeyToken({
      userId: foundShop._id,
      refreshToken: tokens.refreshToken,
      privateKey,
      publicKey,
    })

    return {
      shop: getInfoData({
        fields: ['_id', 'name', 'email'],
        object: foundShop,
      }),
      tokens,
    }
  }

  /**
   * Sign up
   * @param {name} name
   * @param {email} email
   * @param {password} password
   * @returns {
   *  {
   *    code: '201',
   *    metaData: {
   *    shop: getInfoData({
   *      fields: ['_id', 'name', 'email'],
   *      object: newShop,
   *    }),
   *    tokens,
   *    },
   *  }
   * }
   */
  static signUp = async ({ name, email, password }) => {
    // try {
    // step 1: check email exists?
    const holderShop = await shopModel
      .findOne({
        email,
      })
      .lean() // lean() is used to convert the mongoose object to plain javascript object

    if (holderShop) {
      throw new BadRequestError('Email already exists!')
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const newShop = await shopModel.create({
      name,
      email,
      password: passwordHash,
      roles: [ROLE_SHOP.SHOP],
    })

    if (newShop) {
      // Thuật toán tạo private key, public key
      // const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
      //   modulusLength: 4096,
      //   publicKeyEncoding: {
      //     type: 'pkcs1', // public key cryptography standards 1 // pkcs8
      //     format: 'pem', // Privacy Enhanced Mail
      //   },
      //   privateKeyEncoding: {
      //     type: 'pkcs1', // public key cryptography standards 1
      //     format: 'pem', // Privacy Enhanced Mail
      //   },
      // })

      const publicKey = crypto.randomBytes(64).toString('hex')
      const privateKey = crypto.randomBytes(64).toString('hex')

      console.log({ privateKey, publicKey }) // save collection keyStore

      const keyStore = await KeyTokenService.createKeyToken({
        userId: newShop._id,
        publicKey,
        privateKey,
      })

      if (!keyStore) {
        throw new ConflictRequestError('Create keyStore failed')
      }

      // const publicKeyObject = crypto.createPublicKey(publicKeyString)

      // create token pair
      const tokens = await createTokenPair(
        {
          userId: newShop._id,
          email,
        },
        publicKey,
        privateKey,
      )

      console.log(`Create token success::`, tokens)

      return {
        code: '201',
        metaData: {
          shop: getInfoData({
            fields: ['_id', 'name', 'email'],
            object: newShop,
          }),
          tokens,
        },
      }
    }

    return {
      code: '200',
      metaData: null,
    }
    // } catch (error) {
    //   return {
    //     code: 'xxx',
    //     message: error.message,
    //     status: 'error',
    //   }
    // }
  }
}

export default AccessService
