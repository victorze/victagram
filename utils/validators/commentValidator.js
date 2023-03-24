import { BadRequestError } from '../../controllers/httpErrors.js'

export const validateComment = (req, res, next) => {
  const { message } = req.body

  if (!message.trim()) {
    throw new BadRequestError('Debe ingresar un comentario')
  }

  if (message.length > 200) {
    throw new BadRequestError(
      'El comentario no debe tener mas de 200 caracteres'
    )
  }

  next()
}
