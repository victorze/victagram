const { validateImage } = require('./imageValidator')
const { id } = require('./idValidator')
const { validatePost } = require('./postValidator')
const { validateComment } = require('./commentValidator')
const { loginValidator } = require('./userValidator')

module.exports = {
  validateImage,
  id,
  validatePost,
  validateComment,
  loginValidator,
}
