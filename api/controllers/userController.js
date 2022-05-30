const { User } = require('../models')
const { catchErrors, saveImage } = require('../handlers')
const { ConflictError, BadRequestError, NotFoundError } = require('./httpErrors')

const register = async (req, res) => {
  const userExists = await User.findOne({ email: req.body.email })

  if (userExists) {
    throw new ConflictError(`Ya existe un usuario con el email ${req.body.email}`)
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
    throw new BadRequestError(`El usuario con el email ${email} no existe`)
  }

  if (user.validPassword(password)) {
    const token = user.generateJwt()
    res.json({ token })
  } else {
    throw new BadRequestError('Las credenciales proporcionadas son incorrectas')
  }
}

const show = async (req, res) => {
  const { username } = req.params
  const user = await User.findOne({ username }).select(['-hash', '-salt'])

  if (!user) {
    throw new NotFoundError(`El usuario con username '${username}' no existe`)
  }

  res.json(user)
}

const upload = async (req, res) => {
  imageUrl = await saveImage(req.body, req.fileName)
  res.status(201).json({ url: imageUrl })
}

module.exports = {
  register: catchErrors(register),
  login: catchErrors(login),
  show: catchErrors(show),
  upload: catchErrors(upload),
}
