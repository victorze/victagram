const { User } = require('../models')
const { catchErrors, saveImage } = require('../handlers')
const { UserAlreadyExistsError, BadCredentialsError, UserDoesNotExistError } = require('./errors')

const register = async (req, res) => {
  const userExists = await User.findOne({ email: req.body.email })

  if (userExists) {
    throw new UserAlreadyExistsError()
  } else {
    const user = new User(req.body)
    user.setPassword(req.body.password)
    await user.save()
    const token = user.generateJwt()
    res.status(201).json({ token })
  }
}

const login = async (req, res) => {
  console.log(req.app.locals.basePath)
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (!user) {
    throw new BadCredentialsError(`The user with email ${email} does not exist`)
  }

  if (user.validPassword(password)) {
    const token = user.generateJwt()
    res.json({ token })
  } else {
    throw new BadCredentialsError()
  }
}

const show = async (req, res) => {
  const { username } = req.params
  const user = await User.findOne({ username }).select(['-hash', '-salt'])

  if (!user) {
    throw new UserDoesNotExistError(`The user with username '${username}' does not exist`)
  }

  res.json(user)
}

const upload = async (req, res) => {
  imageUrl = await saveImage(req.body, req.fileName)
  res.json({ url: imageUrl })
}

module.exports = {
  register: catchErrors(register),
  login: catchErrors(login),
  show: catchErrors(show),
  upload: catchErrors(upload),
}
