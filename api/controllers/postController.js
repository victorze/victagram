
const { Post } = require('../models')
const { catchErrors, logger } = require('../handlers')

const store = async (req, res) => {
  const { imageUrl, caption } = req.body
  const post = new Post({ imageUrl, caption, user: req.user._id })
  await post.save()
  logger.info('Nuevo post %s', post)
  res.status(201).json(post)
}

module.exports = {
  store: catchErrors(store)
}
