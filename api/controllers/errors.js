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

module.exports = {
  UserAlreadyExistsError,
  BadCredentialsError,
}
