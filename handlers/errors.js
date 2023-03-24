import { logger } from './logger.js'

export const catchErrors = (fn) => (req, res, next) =>
  fn(req, res, next).catch(next)

export const notFound = (req, res, next) => {
  const err = new Error('Aquí no hay nada interesante :(')
  err.status = 404
  next(err)
}

export const productionErrors = (err, req, res, next) => {
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
