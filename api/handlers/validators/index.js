const { validateImage } = require('./imageValidator')
const { id } = require('./idValidator')
const { validatePost } = require('./postValidator')
const { validateComment } = require('./commentValidator')

module.exports = {
  validateImage,
  id,
  validatePost,
  validateComment,
}
