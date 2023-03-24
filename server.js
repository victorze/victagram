import * as dotenv from 'dotenv'
dotenv.config()
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import routes from './routes/index.js'
import { notFound, productionErrors, logger } from './handlers/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

mongoose.set('strictQuery', false)
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected successfully to mongodb server'))
  .catch((err) => {
    console.error(`mongoose error → ${err.message}`)
    process.exit(1)
  })

const app = express()
app.use(express.json())
app.use(express.raw({ type: 'image/*', limit: '5mb' }))
app.use(
  morgan('short', {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  })
)
app.use(express.static('public'))
app.use(express.static(path.join(__dirname, '..', 'client', 'build')))

app.use('/', routes)
app.get(/[a-z0-9]*/, (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'))
})

app.use(notFound)
app.use(productionErrors)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Starting server on port ${PORT}`)
})
