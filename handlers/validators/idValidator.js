import mongoose from 'mongoose'
import { NotFoundError } from '../../controllers/httpErrors.js'

const ObjectId = mongoose.Types.ObjectId

export const id = (req, res, next) => {
  const documentId = req.params.id

  if (documentId && !ObjectId.isValid(documentId)) {
    throw new NotFoundError()
  }

  next()
}
