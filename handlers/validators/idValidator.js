const mongoose = require('mongoose')
const { NotFoundError } = require('../../controllers/httpErrors')

const ObjectId = mongoose.Types.ObjectId

const id = (req, res, next) => {
  const documentId = req.params.id

  if (documentId && !ObjectId.isValid(documentId)) {
    throw new NotFoundError()
  }

  next()
}

module.exports = {
  id,
}
