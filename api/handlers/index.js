const { catchErrors, notFound, productionErrors } = require('./errors')
const { logger } = require('./logger')
const { auth } = require('./authentication')

module.exports = {
  catchErrors,
  notFound,
  productionErrors,
  logger,
  auth,
}
