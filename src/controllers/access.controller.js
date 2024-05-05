'use strict'

import { CREATED, SuccessResponse } from '../core/success.response.js'
import AccessService from '../services/access.service.js'

class AccessController {
  logIn = async (req, res, next) => {
    new SuccessResponse({
      message: 'Login success',
      metaData: await AccessService.logIn(req.body),
    }).send(res)
  }

  signUp = async (req, res, next) => {
    new CREATED({
      message: 'Register success',
      metaData: await AccessService.signUp(req.body),
      options: {
        limit: 10, //
      },
    }).send(res)
  }

  logOut = async (req, res, next) => {
    new SuccessResponse({
      message: 'Logout success',
      metaData: await AccessService.logOut(req.keyStore),
    }).send(res)
  }

  handlerRefreshToken = async (req, res, next) => {
    new SuccessResponse({
      message: 'Get token success',
      metaData: await AccessService.handlerRefreshToken(req.body.refreshToken),
    }).send(res)
  }
}

export default new AccessController()
