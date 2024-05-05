'use strict'

import keytokenModel from '../models/keytoken.model.js'
import mongoose from 'mongoose'

class KeyTokenService {
  static createKeyToken = async ({
    userId,
    publicKey,
    privateKey,
    refreshToken,
  }) => {
    try {
      // level 0
      // const tokens = await keytokenModel.create({
      //   user: userId,
      //   publicKey,
      //   privateKey,
      // })
      // return tokens ? tokens.publicKey : null

      // level 1
      const filter = { user: userId },
        update = { publicKey, privateKey, refreshTokensUsed: [], refreshToken },
        options = { upsert: true, new: true }

      const tokens = await keytokenModel.findOneAndUpdate(
        filter,
        update,
        options,
      )

      return tokens ? tokens.publicKey : null
    } catch (error) {
      return error
    }
  }

  static findByUserId = async (userId) => {
    const objectId = new mongoose.Types.ObjectId(userId)
    return await keytokenModel.findOne({ user: objectId }).lean()
  }

  static removeKeyById = async (id) => {
    return await keytokenModel.deleteOne(id)
  }

  static findByRefeshTokenUsed = async (refreshToken) => {
    return await keytokenModel
      .findOne({ refreshTokensUsed: refreshToken })
      .lean()
  }

  static deleteKeyById = async (userId) => {
    const objectId = new mongoose.Types.ObjectId(userId)
    return await keytokenModel.deleteOne({ user: objectId })
  }

  static findByRefreshToken = async (refreshToken) => {
    return await keytokenModel.findOne({ refreshToken })
  }
}

export default KeyTokenService
