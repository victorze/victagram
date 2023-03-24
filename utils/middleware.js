import jwt from 'jsonwebtoken'
import { UnauthorizedError } from '../controllers/httpErrors.js'
import { User } from '../models/index.js'
import { logger } from './index.js'

export const requestLogger = (req, _res, next) => {
  logger.debug('Method: ' + req.method)
  logger.debug('Path:   ' + req.path)
  logger.debug('Body:   ' + JSON.stringify(req.body, null, 2))
  logger.debug('---')
  next()
}

export const notFound = (_req, _res, next) => {
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

export const auth = async (req, _res, next) => {
  if (req.header('authorization')) {
    const [, token] = req.header('authorization').split(/\s+/)

    try {
      const decoded = jwt.verify(token, process.env.SECRET_JWT)
      const user = await User.findOne({ email: decoded.email }).select([
        '-hash',
        '-salt',
      ])

      if (user) {
        req.user = user
        next()
      } else {
        throw new UnauthorizedError()
      }
    } catch (err) {
      throw new UnauthorizedError()
    }
  } else {
    throw new UnauthorizedError()
  }
}
