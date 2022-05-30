const jwt = require('jsonwebtoken')
const { User } = require('../models')
const { JWTAuthenticationError } = require('../controllers/errors')
const { catchErrors } = require('./errors')

const auth = async (req, res, next) => {
  if (req.header('authorization')) {
    const [, token] = req.header('authorization').split(/\s+/)

    try {
      const decoded = jwt.verify(token, process.env.SECRET_JWT)
      const user = await User.findOne({ email: decoded.email }).select(['-hash', '-salt'])

      if (user) {
        req.user = user
        next()
      } else {
        throw new JWTAuthenticationError()
      }
    } catch (err) {
      throw new JWTAuthenticationError()
    }
  } else {
    throw new JWTAuthenticationError()
  }
}

module.exports = {
  auth: catchErrors(auth),
}
