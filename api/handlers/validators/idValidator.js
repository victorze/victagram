const mongoose = require('mongoose')
const { BadRequestError } = require('../../controllers/httpErrors')

const ObjectId = mongoose.Types.ObjectId

const id = (req, res, next) => {
  const documentId = req.params.id

  if (documentId && !ObjectId.isValid(documentId)) {
    throw new BadRequestError(`El id [${documentId}] suministrado en la URL no es válido`)
  }

  next()
}

module.exports = {
  id,
}
