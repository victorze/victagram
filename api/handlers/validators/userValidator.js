const { BadRequestError } = require("../../controllers/httpErrors")

const loginValidator = (req, res, next) => {
  const { email } = req.body

  if (!/(.+)@(.+){2,}\.(.+){2,}/.test(email)) {
    throw new BadRequestError('Ingrese un email válido')
  }

  next()
}

module.exports = {
  loginValidator
}
