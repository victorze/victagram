const { Friendship } = require("../models")
const { catchErrors, logger } = require("../handlers")

const follow = async (req, res) => {
  const friendship = await Friendship.create({ user: req.params.id, follower: req.user.id })
  logger.info(`El usuario '${req.user.username}' empieza a seguir al usuario con id '${req.params.id}'`)
  res.status(201).json(friendship)
}

const unfollow = async (req, res) => {
  await Friendship.findOneAndRemove({ user: req.params.id, follower: req.user.id })
  logger.info(`El usuario '${req.user.username}' dejó de seguir al usuario con id '${req.params.id}'`)
  res.status(204).json()
}

module.exports = {
  follow: catchErrors(follow),
  unfollow: catchErrors(unfollow),
}
