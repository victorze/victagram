const mongoose = require('mongoose')
const crypto = require("crypto")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  profileUrl: {
    type: String,
    default: null
  },
  bio: String,
  hash: String,
  salt: String
}, {
  timestamps: true,
})

userSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString("hex")
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex")
}

userSchema.methods.validPassword = function(password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex")
  return this.hash === hash
}

userSchema.methods.generateJwt = function() {
  const expiry = new Date()
  expiry.setDate(expiry.getDate() + 7) // + 7 days

  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name: this.name,
      exp: parseInt(expiry.getTime() / 1000, 10) // time in seconds
    },
    process.env.SECRET_JWT
  )
}

module.exports = mongoose.model('User', userSchema)
