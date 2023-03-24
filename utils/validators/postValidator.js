import { BadRequestError } from '../../controllers/httpErrors.js'

export const validatePost = (req, res, next) => {
  const { imageUrl, caption } = req.body

  if (!imageUrl.trim()) {
    throw new BadRequestError('Debe seleccionar una imagen')
  }

  if (!caption.trim()) {
    throw new BadRequestError('Debe ingresar un texto que describa el post')
  }

  if (caption.length > 200) {
    throw new BadRequestError('El texto no debe tener mas de 200 caracteres')
  }

  next()
}
