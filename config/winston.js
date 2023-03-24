import { createLogger, format, transports } from 'winston'
import { env } from './index.js'

export const logger = createLogger({
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.splat()
  ),
  transports: [
    new transports.File({
      filename: 'combined.log',
      level: 'info',
      format: format.json(),
    }),
    new transports.File({
      filename: 'error.log',
      level: 'error',
      format: format.json(),
    }),
  ],
})

if (env.NODE_ENV !== 'production') {
  logger.clear().add(
    new transports.Console({
      level: 'debug',
      format: format.combine(
        format.colorize(),
        format.printf(
          (info) => `${info.timestamp} ${info.level} ${info.message}`
        )
      ),
    })
  )
}

if (env.NODE_ENV == 'test') {
  logger.silent = true
}
