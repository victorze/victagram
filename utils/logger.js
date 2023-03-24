import { winston } from '../config/index.js'

export const info = winston.logger.info.bind(winston.logger)
export const warn = winston.logger.warn.bind(winston.logger)
export const error = winston.logger.error.bind(winston.logger)
export const debug = winston.logger.debug.bind(winston.logger)
