'use strict'

import {
  REASON_STATUS_CODE,
  STATUS_CODE,
} from '../constants/values.constants.js'

// Khai báo class ErrorResponse kế thừa từ Error của nodejs
class ErrorResponse extends Error {
  constructor(message, status) {
    super(message)
    this.status = status
  }
}

class ConflictRequestError extends ErrorResponse {
  constructor(
    message = REASON_STATUS_CODE.CONFLICT,
    statusCode = STATUS_CODE.FORBIDDEN,
  ) {
    // constructor của class này sẽ gọi constructor của class cha
    super(message, statusCode)
  }
}

class BadRequestError extends ErrorResponse {
  constructor(
    message = REASON_STATUS_CODE.FORBIDDEN,
    statusCode = STATUS_CODE.BAD_REQUEST,
  ) {
    // constructor của class này sẽ gọi constructor của class cha
    super(message, statusCode)
  }
}

class AuthFailureError extends ErrorResponse {
  constructor(
    message = REASON_STATUS_CODE.UNAUTHORIZED,
    statusCode = STATUS_CODE.UNAUTHORIZED,
  ) {
    super(message, statusCode)
  }
}

class NotFoundError extends ErrorResponse {
  constructor(
    message = REASON_STATUS_CODE.NOT_FOUND,
    statusCode = STATUS_CODE.NOT_FOUND,
  ) {
    super(message, statusCode)
  }
}

class ForbiddenError extends ErrorResponse {
  constructor(
    message = REASON_STATUS_CODE.FORBIDDEN,
    statusCode = STATUS_CODE.FORBIDDEN,
  ) {
    super(message, statusCode)
  }
}

export {
  ConflictRequestError,
  BadRequestError,
  AuthFailureError,
  NotFoundError,
  ForbiddenError,
}
