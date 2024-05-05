'use strict'

import { HEADER } from '../constants/values.constants.js'
import { findById } from '../services/apiKey.service.js'

const apiKey = async (req, res, next) => {
  try {
    const key = req.headers[HEADER.API_KEY]?.toString()
    if (!key) {
      return res.status(403).json({
        code: 'xxx',
        message: 'Forbidden Error',
      })
    }

    //check objKey

    const objKey = await findById(key)

    if (!objKey) {
      return res.status(403).json({
        code: 'xxx',
        message: 'Forbidden Error',
      })
    }
    req.objKey = objKey

    return next()
  } catch (error) {}
}

const permission = (permission) => {
  // closure
  return (req, res, next) => {
    if (!req.objKey.permissions) {
      return res.status(403).json({
        code: 'xxx',
        message: 'Permission denied',
      })
    }

    console.log(`permissions::`, req.objKey.permissions)

    const validPermission = req.objKey.permissions.includes(permission)

    if (!validPermission) {
      return res.status(403).json({
        code: 'xxx',
        message: 'Permission denied',
      })
    }

    return next()
  }
}


export { apiKey, permission }
