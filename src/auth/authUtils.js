'use strict'
import JWT, { decode } from 'jsonwebtoken'
import asyncHandler from '../helpers/asyncHandler.js'
import { HEADER } from '../constants/values.constants.js'
import { AuthFailureError, NotFoundError } from '../core/error.response.js'
import KeyTokenService from '../services/keyToken.service.js'

// create token pair
const createTokenPair = async (payload, publicKey, privateKey) => {
  try {
    // accessToken
    const accessToken = await JWT.sign(payload, publicKey, {
      expiresIn: '2 days',
    })

    // refreshToken
    const refreshToken = await JWT.sign(payload, privateKey, {
      expiresIn: '7 days',
    })

    // verify token
    JWT.verify(accessToken, publicKey, (err, decode) => {
      if (err) {
        console.error(`error verify::`, err)
      } else {
        console.log(`verify decode::`, decode)
      }
    })

    return {
      accessToken,
      refreshToken,
    }
  } catch (error) {}
}

// middleware authentication for logOut
const authentication = asyncHandler(async (req, res, next) => {
  /**
   * 1 - Check userId missing?
   * 2 - get accesstoken
   * 3 - verify token
   * 4 - check user in dbs
   * 5 - check keyStore with userId
   * 6 - Ok all => return next()
   */
  // 1 - 4
  const userId = req.headers[HEADER.CLIENT_ID]
  if (!userId) throw new AuthFailureError('Invalid Request')

  // 2
  const keyStore = await KeyTokenService.findByUserId(userId)
  if (!keyStore) throw new NotFoundError('Not found key')

  // 3
  const accessToken = req.headers[HEADER.AUTHORIZATION]
  if (!accessToken) throw new AuthFailureError('Invalid Request')

  // 5
  try {
    const decodeUser = JWT.verify(accessToken, keyStore.publicKey)
    if (userId !== decodeUser.userId)
      throw new AuthFailureError('Invalid UserId')

    req.keyStore = keyStore

    // 6
    return next()
  } catch (error) {
    throw error
  }
})

const verifyJWT = async (token, keySecret) => {
  return await JWT.verify(token, keySecret)
}

export { createTokenPair, authentication, verifyJWT }
