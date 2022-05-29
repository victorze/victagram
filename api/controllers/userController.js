const { catchErrors } = require('../handlers/errors')
const { UserExistsError } = require('./errors')

const { User } = require('../models')

const register = async (req, res) => {
  const userExists = await User.findOne({ email: req.body.email })

  if (userExists) {
    throw new UserExistsError()
  } else {
    const user = new User(req.body)
    user.setPassword(req.body.password)
    await user.save()
    const token = user.generateJwt()
    res.status(201).json({ token })
  }
}

module.exports = {
  register: catchErrors(register),
}
