const { catchErrors, logger } = require("../handlers")
const { Friendship } = require("../models")

const follow = async (req, res) => {
  const friendship = await Friendship.create({ user: req.params.id, follower: req.user.id })
  logger.info(`El usuario '${req.user.username}' empieza a seguir al usuario con id '${req.params.id}'`)
  res.status(201).send(friendship)
}

module.exports = {
  follow: catchErrors(follow),
}
