class BadRequestError extends Error {
  constructor(message) {
    super(message)
    this.message = message || 'Bad Request'
    this.status = 400
    this.name = 'BadRequest'
  }
}

class UnauthorizedError extends Error {
  constructor(message) {
    super(message)
    this.message = message || 'Unauthorized'
    this.status = 401
    this.name = 'UnauthorizedError'
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message)
    this.message = message || 'Not Found'
    this.status = 404
    this.name = 'NotFoundError'
  }
}

class ConflictError extends Error {
  constructor(message) {
    super(message)
    this.message = message || 'Conflict'
    this.status = 409
    this.name = 'ConflictError'
  }
}

module.exports = {
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
  ConflictError,
}
