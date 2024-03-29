import { User, Friendship } from '../models/index.js'
import { storage, logger } from '../utils/index.js'
import { ConflictError, BadRequestError, NotFoundError } from './httpErrors.js'

export const signup = async (req, res) => {
  const { email, username } = req.body
  const userExists = await User.findOne({ $or: [{ email }, { username }] })

  if (userExists) {
    logger.warn(
      `Ya existe un usuario con el mismo email ${email} o username ${username}`
    )
    throw new ConflictError(
      `Ya existe un usuario con el mismo email o username`
    )
  } else {
    let user = new User(req.body)
    user.setPassword(req.body.password)
    await user.save()

    const token = user.generateJwt()
    logger.info('Nuevo usuario registrado %s', user)

    res.status(201).json({ token, user: user.secure() })
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (!user) {
    logger.warn(`No existe un usuario con email ${email}`)
    throw new BadRequestError(`No existe un usuario con email ${email}`)
  }

  if (user.validPassword(password)) {
    const token = user.generateJwt()
    res.json({ token, user: user.secure() })
  } else {
    logger.warn(`Las credenciales son incorrectas (email: ${email})`)
    throw new BadRequestError('Las credenciales son incorrectas')
  }
}

export const whoami = async (req, res) => {
  res.json(req.user.secure())
}

export const explore = async (req, res) => {
  const following = await Friendship.find({ follower: req.user.id })
  const followingIds = following.map((friend) => friend.user)
  followingIds.push(req.user._id)

  const users = await User.find({ _id: { $nin: followingIds } }).limit(20)

  res.json(users)
}

export const show = async (req, res) => {
  const { username } = req.params
  const user = await User.findOne({ username }).select(['-hash', '-salt'])

  if (!user) {
    logger.info(`No existe un usuario con username '${username}'`)
    throw new NotFoundError(`No existe un usuario con username '${username}'`)
  }

  user.viewerFollows =
    (await Friendship.findOne({
      user: user._id,
      follower: req.user._id,
    }).count()) > 0

  res.json(user)
}

export const upload = async (req, res) => {
  const user = req.user
  imageUrl = await storage.saveImage(req.body, req.fileName)
  user.profileUrl = imageUrl
  await user.save()
  logger.info(
    `El usuario '${user.username}' ha actualizado su imagen de perfil ${imageUrl}`
  )

  res.status(201).json({ url: imageUrl })
}
