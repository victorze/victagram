class UserAlreadyExistsError extends Error {
  constructor(message) {
    super(message)
    this.message = message || 'An account for that username/email already exists'
    this.status = 409
    this.name = 'UserAlreadyExistsError'
  }
}

class BadCredentialsError extends Error {
  constructor(message) {
    super(message)
    this.message = message || 'Bad credentials'
    this.status = 400
    this.name = 'BadCredentialsError'
  }
}

class UserDoesNotExistError extends Error {
  constructor(message) {
    super(message)
    this.message = message || 'The user does not exist'
    this.status = 404
    this.name = 'UserDoesNotExist'
  }
}

class JWTAuthenticationError extends Error {
  constructor(message) {
    super(message)
    this.message = message || 'Unauthorized'
    this.status = 401
    this.name = 'JWTAuthenticationError'
  }
}

class BadRequestError extends Error {
  constructor(message) {
    super(message)
    this.message = message || 'Bad Request'
    this.status = 400
    this.name = 'BadRequest'
  }
}

module.exports = {
  UserAlreadyExistsError,
  BadCredentialsError,
  UserDoesNotExistError,
  JWTAuthenticationError,
  BadRequestError
}
