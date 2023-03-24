import path from 'path'
import { fileURLToPath } from 'url'
import * as dotenv from 'dotenv'
dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const NODE_ENV = process.env.NODE_ENV
export const BASE_DIR = path.join(__dirname, '..')

export const APP_URL = process.env.APP_URL
export const PORT = process.env.PORT

export const SECRET_JWT = process.env.SECRET_JWT
export const MONGODB_URI = process.env.MONGODB_URI
