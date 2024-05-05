const ROLE_SHOP = {
  SHOP: 'SHOP',
  WRITER: 'WRITER',
  EDITOR: 'EDITOR',
  ADMIN: 'ADMIN',
}

const STATUS_CODE = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
}

const HEADER = {
  API_KEY: 'x-api-key',
  CLIENT_ID: 'x-client-id',
  AUTHORIZATION: 'authorization',
}

const REASON_STATUS_CODE = {
  FORBIDDEN: 'Bad request error',
  CONFLICT: 'Conflict error',
  CREATED: 'Created success',
  OK: 'Success',
  UNAUTHORIZED: 'Unauthorized',
  NOT_FOUND: 'Not found',
}

export { STATUS_CODE, HEADER, ROLE_SHOP, REASON_STATUS_CODE }
