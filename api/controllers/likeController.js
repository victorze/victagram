const { Post } = require("../models")
const { catchErrors, logger } = require("../handlers")
const { ConflictError } = require("./httpErrors")

const like = async (req, res) => {
  const post = await Post.findById(req.params.id)

  if (post.likes.includes(req.user.id)) {
    throw new ConflictError('No puedes darle like dos veces a un post')
  }

  post.likes.push(req.user.id)
  await post.save()
  logger.info(`El usuario '${req.user.username}' le dio like al post con id '${post.id}'`)

  res.status(201).json()
}

module.exports = {
  like: catchErrors(like),
}
