const { Post } = require('../models')
const { catchErrors, logger } = require('../handlers')
const { ConflictError } = require('./httpErrors')

const like = async (req, res) => {
  const post = await Post.findById(req.params.id)

  if (post.likes.includes(req.user.id)) {
    throw new ConflictError('No puedes darle like dos veces a un post')
  }

  post.likes.push(req.user.id)
  await post.save()
  logger.info(`El usuario '${req.user.username}' le dio like al post con id '${post.id}'`)

  res.status(204).json()
}

const unlike = async (req, res) => {
  const post = await Post.findById(req.params.id)
  const likes = post.likes

  if (!likes.includes(req.user.id)) {
    throw new ConflictError('No puedes quitar un like a un post que no le diste like')
  }

  const i = likes.indexOf(req.user.id)
  post.likes = likes.slice(0, i).concat(likes.slice(i + 1))
  await post.save()
  logger.info(`El usuario '${req.user.username}' quito el like del post con id '${post.id}'`)

  res.status(204).json()
}

module.exports = {
  like: catchErrors(like),
  unlike: catchErrors(unlike),
}
