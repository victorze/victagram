const mongoose = require('mongoose')
const { BadRequestError } = require('../../controllers/httpErrors')

const ObjectId = mongoose.Types.ObjectId

const validateId = (req, res, next) => {
  const { id } = req.params

  console.log({id})

  if (id && !ObjectId.isValid(id)) {
    console.log('in validate ...')
    throw new BadRequestError(`El id [${id}] suministrado en la URL no es válido`)
  }

  next()
}

module.exports = {
  validateId,
}
