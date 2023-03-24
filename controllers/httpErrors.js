export class BadRequestError extends Error {
  constructor(message) {
    super(message)
    this.message = message || 'Bad Request'
    this.status = 400
    this.name = 'BadRequest'
  }
}

export class UnauthorizedError extends Error {
  constructor(message) {
    super(message)
    this.message = message || 'Unauthorized'
    this.status = 401
    this.name = 'UnauthorizedError'
  }
}

export class NotFoundError extends Error {
  constructor(message) {
    super(message)
    this.message = message || 'Not Found'
    this.status = 404
    this.name = 'NotFoundError'
  }
}

export class ConflictError extends Error {
  constructor(message) {
    super(message)
    this.message = message || 'Conflict'
    this.status = 409
    this.name = 'ConflictError'
  }
}
