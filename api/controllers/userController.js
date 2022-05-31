const { User, Friendship } = require('../models')
const { catchErrors, saveImage, logger } = require('../handlers')
const { ConflictError, BadRequestError, NotFoundError } = require('./httpErrors')

const register = async (req, res) => {
  const userExists = await User.findOne({ email: req.body.email })

  if (userExists) {
    logger.warn(`Ya existe un usuario con email ${req.body.email}`)
    throw new ConflictError(`Ya existe un usuario con email ${req.body.email}`)
  } else {
    const user = new User(req.body)
    user.setPassword(req.body.password)
    await user.save()

    const token = user.generateJwt()
    logger.info('Nuevo usuario registrado %s', user)

    res.status(201).json({ token })
  }
}

const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (!user) {
    logger.warn(`No existe un usuario con email ${email}`)
    throw new BadRequestError(`No existe un usuario con email ${email}`)
  }

  if (user.validPassword(password)) {
    const token = user.generateJwt()
    res.json({ token })
  } else {
    logger.warn(`Las credenciales son incorrectas (email: ${email})`)
    throw new BadRequestError('Las credenciales son incorrectas')
  }
}

const explore = async (req, res) => {
  const following = await Friendship.find({ follower: req.user.id })
  const followingIds = following.map((friend) => friend.user)
  followingIds.push(req.user._id)

  const users = await User.find({ _id: { $nin: followingIds }}).limit(20)

  res.json(users)
}

const show = async (req, res) => {
  const { username } = req.params
  const user = await User.findOne({ username }).select(['-hash', '-salt'])

  if (!user) {
    logger.info(`No existe un usuario con username '${username}'`)
    throw new NotFoundError(`No existe un usuario con username '${username}'`)
  }

  res.json(user)
}

const upload = async (req, res) => {
  const user = req.user
  imageUrl = await saveImage(req.body, req.fileName)
  user.profileUrl = imageUrl
  await user.save()
  logger.info(`El usuario '${user.username}' ha actualizado su imagen de perfil ${imageUrl}`)

  res.status(201).json({ url: imageUrl })
}

module.exports = {
  register: catchErrors(register),
  login: catchErrors(login),
  explore: catchErrors(explore),
  show: catchErrors(show),
  upload: catchErrors(upload),
}
