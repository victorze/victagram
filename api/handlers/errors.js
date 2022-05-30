const { logger } = require("./logger")

const catchErrors = (fn) => (req, res, next) => fn(req, res, next).catch(next)

const notFound = (req, res, next) => {
  const err = new Error('There is nothing here')
  err.status = 404
  next(err)
}

const productionErrors = (err, req, res, next) => {
  const status = err.status || 500

  if (status == 500) {
    const logMessage = `Status: ${status} | Message: ${err.message}`

    if (req.user) {
      logger.error(`${logMessage} | Username: ${req.user.username}`)
    } else {
      logger.error(logMessage)
    }
  }

  res.status(status).json({ message: err.message })
}

module.exports = {
  catchErrors,
  notFound,
  productionErrors,
}
