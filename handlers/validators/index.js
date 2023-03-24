const { validateImage } = require('./imageValidator')
const { id } = require('./idValidator')
const { validatePost } = require('./postValidator')
const { validateComment } = require('./commentValidator')
const { validateLogin, validateSignup } = require('./userValidator')

module.exports = {
  validateImage,
  id,
  validatePost,
  validateComment,
  validateLogin,
  validateSignup,
}
