import { BadRequestError } from '../../controllers/httpErrors.js'

export const validateSignup = (req, res, next) => {
  const { fullName, email, username, password } = req.body

  if (!fullName.trim()) {
    throw new BadRequestError('Debe ingresar su nombre completo')
  }

  if (!/(.+)@(.+){2,}\.(.+){2,}/.test(email)) {
    throw new BadRequestError('Ingrese un email válido')
  }

  if (!/^[a-zA-Z0-9]+$/.test(username)) {
    throw new BadRequestError(
      'El nombre de usuario debe ser alfanúmerico y no debe contener espacios'
    )
  }

  if (password.length < 6) {
    throw new BadRequestError('La contraseña debe tener al menos 6 caracteres')
  }

  next()
}

export const validateLogin = (req, res, next) => {
  const { email } = req.body

  if (!/(.+)@(.+){2,}\.(.+){2,}/.test(email)) {
    throw new BadRequestError('Ingrese un email válido')
  }

  next()
}
