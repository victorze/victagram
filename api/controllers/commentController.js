const { catchErrors, logger } = require("../handlers")
const { Post } = require("../models")

const store = async (req, res) => {
  const { author, message } = req.body
  const post = await Post.findById(req.params.id)

  post.comments.push({ author, message })
  const updatedPost = await post.save()
  const comment = updatedPost.comments[updatedPost.comments.length - 1]
  logger.info(`Comentario publicado en el post con id '${req.params.id}'`)

  res.status(201).json(comment)
}

module.exports = {
  store: catchErrors(store),
}
