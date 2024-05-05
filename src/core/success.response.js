'use strict'

import {
  REASON_STATUS_CODE,
  STATUS_CODE,
} from '../constants/values.constants.js'

class SuccessResponse {
  constructor({
    message,
    statusCode = STATUS_CODE.OK,
    reasonStatusCode = REASON_STATUS_CODE.OK,
    metaData = {},
  }) {
    this.message = !message ? reasonStatusCode : message
    this.status = statusCode
    this.metaData = metaData
  }

  send(res, headers = {}) {
    return res.status(this.status).json(this)
  }
}

class OK extends SuccessResponse {
  constructor({ message, metaData }) {
    super({ message, metaData })
  }
}

class CREATED extends SuccessResponse {
  constructor({
    message,
    statusCode = STATUS_CODE.CREATED,
    reasonStatusCode = REASON_STATUS_CODE.CREATED,
    metaData,
    options = {},
  }) {
    super({ message, metaData, statusCode, reasonStatusCode })
    this.options = options
  }
}

export { OK, CREATED, SuccessResponse }
