const { Post } = require('../models')
const { catchErrors, saveImage, logger } = require('../handlers')

const store = async (req, res) => {
  const { imageUrl, caption } = req.body
  const post = new Post({ imageUrl, caption, user: req.user._id })
  await post.save()
  logger.info('Nuevo post %s', post)
  res.status(201).json(post)
}

const upload = async (req, res) => {
  imageUrl = await saveImage(req.body, req.fileName)
  logger.info(`El usuario '${req.user.username}' ha subido una imagen de post ${imageUrl}`)
  res.json({ url: imageUrl })
}

const show = async (req, res) => {
  const post = await Post.findById(req.params.id)
  res.json(post)
}

module.exports = {
  store: catchErrors(store),
  upload: catchErrors(upload),
  show: catchErrors(show),
}
