const { catchErrors, notFound, productionErrors } = require('./errors')

module.exports = {
  catchErrors,
  notFound,
  productionErrors,
  logger: require('./logger'),
}
