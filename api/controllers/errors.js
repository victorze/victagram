class UserExistsError extends Error {
  constructor(message) {
    super(message)
    this.message = message || 'The email is already associated with an account'
    this.status = 409
    this.name = 'UserExistsError'
  }
}

module.exports = {
  UserExistsError,
}
