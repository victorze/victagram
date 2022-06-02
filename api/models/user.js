const mongoose = require('mongoose')
const crypto = require("crypto")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  profileUrl: {
    type: String,
    default: null,
  },
  bio: String,
  hash: String,
  salt: String,
}, {
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
})

userSchema.virtual('followers', {
  ref: 'Friendship',
  localField: '_id',
  foreignField: 'user',
  count: true,
})

userSchema.virtual('following', {
  ref: 'Friendship',
  localField: '_id',
  foreignField: 'follower',
  count: true,
})

function autopopulate(next) {
  this.populate('followers')
  this.populate('following')
  next()
}

userSchema.pre('find', autopopulate)
userSchema.pre('findOne', autopopulate)

userSchema.methods.secure = function (password) {
  const user = this.toObject()
  delete user.hash
  delete user.salt
  return user
}

userSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex")
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex")
}

userSchema.methods.validPassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex")
  return this.hash === hash
}

userSchema.methods.generateJwt = function () {
  const expiry = new Date()
  expiry.setDate(expiry.getDate() + 7) // + 7 days

  return jwt.sign({
    email: this.email,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000, 10), // time in seconds
  },
    process.env.SECRET_JWT,
  )
}

module.exports = mongoose.model('User', userSchema)
