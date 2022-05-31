const { validateImage } = require('./image')
const { id } = require('./id')
const { validatePost } = require('./post')
const { validateComment } = require('./comment')

module.exports = {
  validateImage,
  id,
  validatePost,
  validateComment,
}
